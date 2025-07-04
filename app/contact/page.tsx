"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToastContainer, useToast } from "@/components/toast"
import { Phone, Mail, MapPin } from "lucide-react"
import { useState } from "react"
import { validateEmail, validateRequired } from "@/lib/validation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toasts, addToast, removeToast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    const nameError = validateRequired(formData.fullName, "Full name")
    const emailError = validateEmail(formData.email)
    const subjectError = validateRequired(formData.subject, "Subject")
    const messageError = validateRequired(formData.message, "Message")

    if (nameError) newErrors.fullName = nameError
    if (emailError) newErrors.email = emailError
    if (subjectError) newErrors.subject = subjectError
    if (messageError) newErrors.message = messageError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      addToast({
        type: "error",
        title: "Validation Error",
        message: "Please fix the errors below",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        addToast({
          type: "success",
          title: "Message Sent",
          message: result.message,
        })

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
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
          title: "Failed to Send",
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
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Contact Hero Section */}
      <section className="bg-[#3c3679] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Contact</h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-[#d0efff] p-6 h-fit">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#3c3679] rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900 font-medium">123 456 789 10</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#3c3679] rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900 font-medium">yourname@gmail.com</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#3c3679] rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900 font-medium">Lorem Ipsum dolor sit amet</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter subject"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your message"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
