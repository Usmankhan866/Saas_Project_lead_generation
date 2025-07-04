"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer, useToast } from "@/components/toast"
import { User, CreditCard, DollarSign, Settings, LogOut, Mail } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { validateName } from "@/lib/validation"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toasts, addToast, removeToast } = useToast()
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    name: "",
    gender: "",
    language: "English",
    country: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    // Get user data
    const email = localStorage.getItem("userEmail") || "alexarawles@gmail.com"
    const name = localStorage.getItem("userName") || "Alexa Rawles"
    setUserEmail(email)
    setUserName(name)

    // Load profile data
    loadProfileData(token)
  }, [router])

  const loadProfileData = async (token: string) => {
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setProfileData({
          name: result.data.name || "",
          gender: result.data.gender || "",
          language: result.data.language || "English",
          country: result.data.country || "",
        })
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    const nameError = validateName(profileData.name)
    if (nameError) newErrors.name = nameError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      addToast({
        type: "error",
        title: "Validation Error",
        message: "Please fix the errors below",
      })
      return
    }

    setIsUpdating(true)
    const token = localStorage.getItem("authToken")

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })

      const result = await response.json()

      if (result.success) {
        // Update local storage
        localStorage.setItem("userName", profileData.name)
        setUserName(profileData.name)

        addToast({
          type: "success",
          title: "Profile Updated",
          message: "Your profile has been updated successfully",
        })
      } else {
        if (result.errors) {
          const newErrors: Record<string, string> = {}
          result.errors.forEach((error: any) => {
            newErrors[error.field] = error.message
          })
          setErrors(newErrors)
        }

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
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    name="language"
                    value={profileData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={isUpdating}
                  className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">{userEmail}</div>
                    <div className="text-sm text-gray-500">1 month ago</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Update Email
                </Button>
              </div>
            </div>
          </div>
        )

      case "credits":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Credit Wallet Section</h2>
              <p className="text-gray-600">You have 1,250 credits left</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Credit Usage</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#d0efff] border-l-4 border-l-[#3c3679]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">700 credits</div>
                    <div className="text-gray-700">Google Listings</div>
                  </CardContent>
                </Card>

                <Card className="bg-[#d0efff] border-l-4 border-l-[#3c3679]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">350 credits</div>
                    <div className="text-gray-700">People Search</div>
                  </CardContent>
                </Card>

                <Card className="bg-[#d0efff] border-l-4 border-l-[#3c3679]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">200 credits</div>
                    <div className="text-gray-700">Business Scraping</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3">Purchase More Credits</Button>
          </div>
        )

      case "billing":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Billing Info</h2>

            <div className="flex space-x-4 mb-6">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                stripe
              </div>
              <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                PP
              </div>
              <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                MC
              </div>
              <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                GP
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card holder name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3">Continue</Button>
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>

            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>

              <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3">Save Changes</Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3c3679] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
          <div className="flex items-center space-x-2">
            <Image
              src="/images/growvy-logo.png"
              alt="Growvy Logo"
              width={120}
              height={40}
              className="h-8 w-auto cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-[#3c3679] font-medium">
              Home
            </a>
            <a href="/services" className="text-gray-700 hover:text-[#3c3679] font-medium">
              Service
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-[#3c3679] font-medium">
              Pricing
            </a>
            <a href="/about" className="text-gray-700 hover:text-[#3c3679] font-medium">
              About
            </a>
            <a href="/help" className="text-gray-700 hover:text-[#3c3679] font-medium">
              Help
            </a>
            <a href="/blog" className="text-gray-700 hover:text-[#3c3679] font-medium">
              Blog
            </a>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-[#d0efff] min-h-screen">
          {/* User Profile Section */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
                alt={userName}
                width={60}
                height={60}
                className="w-15 h-15 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-gray-900">{userName}</div>
                <div className="text-sm text-gray-600">{userEmail}</div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
            >
              Change photo
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                activeSection === "profile" ? "bg-white text-[#3c3679]" : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">User Profile</span>
            </button>

            <button
              onClick={() => setActiveSection("credits")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                activeSection === "credits" ? "bg-white text-[#3c3679]" : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Credit Wallet Section</span>
            </button>

            <button
              onClick={() => setActiveSection("billing")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                activeSection === "billing" ? "bg-white text-[#3c3679]" : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Billing Info</span>
            </button>

            <button
              onClick={() => setActiveSection("security")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                activeSection === "security" ? "bg-white text-[#3c3679]" : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Security Settings</span>
            </button>
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-0 w-80 p-6">
            <button
              onClick={handleLogout}
              className="w-full bg-[#3c3679] text-white p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#2d2a5f] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  )
}
