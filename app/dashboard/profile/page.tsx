"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer, useToast } from "@/components/toast"
import { User, Mail, Building, Phone, FileText, CreditCard, Shield, Settings } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  company: string
  phone: string
  bio: string
  credits: number
  plan: string
  joinDate: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    bio: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toasts, addToast, removeToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    fetchProfile()
  }, [router])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setProfile(result.data)
        setFormData({
          name: result.data.name,
          email: result.data.email,
          company: result.data.company,
          phone: result.data.phone,
          bio: result.data.bio,
        })
      } else {
        addToast({
          type: "error",
          title: "Error",
          message: "Failed to load profile",
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setProfile(result.data)
        setIsEditing(false)

        // Update localStorage
        localStorage.setItem("userName", result.data.name)
        localStorage.setItem("userEmail", result.data.email)

        addToast({
          type: "success",
          title: "Profile Updated",
          message: result.message,
        })
      } else {
        addToast({
          type: "error",
          title: "Update Failed",
          message: result.message,
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Something went wrong",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        company: profile.company,
        phone: profile.phone,
        bio: profile.bio,
      })
    }
    setIsEditing(false)
    setErrors({})
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3c3679] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-8 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                      alt={profile.name}
                      width={150}
                      height={150}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#3c3679] text-white px-4 py-2 rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span className="font-medium">{profile.credits} Credits</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Plan:</strong> {profile.plan}
                      </p>
                      <p>
                        <strong>Member since:</strong> {new Date(profile.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => router.push("/dashboard/payments")}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Buy Credits
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleCancel} className="bg-transparent">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                              errors.name ? "border-red-300" : "border-gray-300"
                            }`}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profile.name}</p>
                        )}
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                              errors.email ? "border-red-300" : "border-gray-300"
                            }`}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profile.email}</p>
                        )}
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Building className="w-4 h-4 inline mr-1" />
                          Company
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profile.company || "Not specified"}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profile.phone || "Not specified"}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profile.bio || "No bio provided"}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
