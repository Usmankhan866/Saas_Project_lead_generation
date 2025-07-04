"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToastContainer, useToast } from "@/components/toast"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { validateEmail, validatePassword } from "@/lib/validation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toasts, addToast, removeToast } = useToast()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Store auth data
        localStorage.setItem("authToken", result.data.token)
        localStorage.setItem("userEmail", result.data.user.email)
        localStorage.setItem("userName", result.data.user.name)

        addToast({
          type: "success",
          title: "Login Successful",
          message: "Welcome back!",
        })

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
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
          title: "Login Failed",
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
      <Header showAuthButtons={false} />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16">
          <div className="max-w-md mx-auto w-full">
            {/* Login Form */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-[#3c3679] mb-8">Log In</h1>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#3c3679] mb-2">
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

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#3c3679] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="text-center">
                  <a href="#" className="text-[#3c3679] hover:underline text-sm">
                    Forget Password
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Not Registered Yet? </span>
                  <a href="/signup" className="text-[#3c3679] hover:underline font-medium">
                    Sign Up
                  </a>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 flex items-center justify-center gap-3 bg-transparent"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block relative">
          <Image
            src="/images/login-signup-hero.png"
            alt="Professional woman working on laptop"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
