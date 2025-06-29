"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, you'd validate credentials
    if (email && password) {
      // Store auth state (in real app, use proper auth)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", email.split("@")[0] || "User")

      // Trigger storage event for other components to update
      window.dispatchEvent(new Event("storage"))

      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16">
          <div className="max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="mb-12">
              <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-10 w-auto" />
            </div>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#3c3679] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="text-center">
                  <a href="#" className="text-[#3c3679] hover:underline text-sm">
                    Forget Password
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3 text-lg font-semibold"
                >
                  Log In
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
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1000&q=80"
            alt="Professional businesswoman working on laptop in modern office"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
