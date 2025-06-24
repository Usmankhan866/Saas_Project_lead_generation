"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Building2, Users, Home, Star, HelpCircle, CreditCard } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false)
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

  const recentSearches = [
    { name: "Name here", lastModified: "10 May 2025", owner: "Alexa Rawles" },
    { name: "Name here", lastModified: "10 May 2025", owner: "Alexa Rawles" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-8 w-auto" />
          </div>

          <div className="flex items-center space-x-4">
            {/* Trial Badge */}
            <div className="bg-[#3c3679] text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>13 days left</span>
            </div>

            {/* Credits */}
            <div className="flex items-center space-x-2 text-gray-700">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-medium">Credits</span>
            </div>

            {/* Help */}
            <HelpCircle className="w-5 h-5 text-gray-500" />

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
                alt={userName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{userName}</div>
                <div className="text-gray-500">{userEmail}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Start Section */}
          <section className="mb-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h1>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={() => setShowModal(true)}
                className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg"
              >
                <Search className="w-6 h-6" />
                <span>Fetch Google Listings</span>
              </Button>

              <Button
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg"
              >
                <Building2 className="w-6 h-6" />
                <span>Fetch Businesses</span>
              </Button>

              <Button
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg"
              >
                <Users className="w-6 h-6" />
                <span>Fetch People</span>
              </Button>
            </div>
          </section>

          {/* Recent Searches */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">Your Recent Searches</h2>
              </div>
              <Search className="w-5 h-5 text-gray-500" />
            </div>

            <Card className="bg-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">Name</th>
                        <th className="text-left p-4 font-medium text-gray-900">Last Modified</th>
                        <th className="text-left p-4 font-medium text-gray-900">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSearches.map((search, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 text-gray-900">{search.name}</td>
                          <td className="p-4 text-gray-600">{search.lastModified}</td>
                          <td className="p-4 text-gray-600">{search.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-900">Fetch Google Listings</h3>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none">
                      <option>Select Country</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none">
                      <option>Select Region</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    />
                  </div>

                  <Button className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">Preview</Button>
                </div>

                {/* Preview Table */}
                <div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-900">Keywords</th>
                          <th className="text-left p-3 font-medium text-gray-900">Country</th>
                          <th className="text-left p-3 font-medium text-gray-900">Region</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 9 }).map((_, i) => (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="p-3 text-gray-600">Keywords</td>
                            <td className="p-3 text-gray-600">Country</td>
                            <td className="p-3 text-gray-600">Region</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Button className="w-full mt-4 bg-[#3c3679] hover:bg-[#2d2a5f] text-white">Import</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
