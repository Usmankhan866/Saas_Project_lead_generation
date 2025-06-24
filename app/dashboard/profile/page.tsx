"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, CreditCard, DollarSign, Settings, LogOut, Mail } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("isAuthenticated")
    if (!isAuth) {
      router.push("/login")
      return
    }

    // Get user data
    const email = localStorage.getItem("userEmail") || "alexarawles@gmail.com"
    const name = localStorage.getItem("userName") || "Alexa Rawles"
    setUserEmail(email)
    setUserName(name)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
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
                    defaultValue={userName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none">
                    <option>Select Country</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3">Save Changes</Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">{userEmail}</div>
                    <div className="text-sm text-gray-500">1 month ago</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-8 w-auto" />
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
              className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white"
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
