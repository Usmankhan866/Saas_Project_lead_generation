"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  showAuthButtons?: boolean
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken")
    const name = localStorage.getItem("userName")
    if (token && name) {
      setIsLoggedIn(true)
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    setIsLoggedIn(false)
    setUserName("")
    router.push("/")
  }

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#3c3679] text-white text-center py-2 px-4 text-sm">
        <span>🎉 Special Offer: Get 50% off your first month! </span>
        <a href="#" className="underline hover:no-underline">
          Learn More
        </a>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-[#3c3679] font-medium">
                Services
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-[#3c3679] font-medium">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#3c3679] font-medium">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#3c3679] font-medium">
                Blog
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-[#3c3679] font-medium">
                Help
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#3c3679] font-medium">
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            {showAuthButtons && (
              <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, {userName}</span>
                    <Button
                      onClick={() => router.push("/dashboard")}
                      variant="outline"
                      className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white"
                    >
                      Dashboard
                    </Button>
                    <Button onClick={handleLogout} variant="ghost" className="text-gray-700 hover:text-[#3c3679]">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => router.push("/login")}
                      variant="ghost"
                      className="text-gray-700 hover:text-[#3c3679]"
                    >
                      Log In
                    </Button>
                    <Button
                      onClick={() => router.push("/signup")}
                      className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#3c3679] hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/services"
                className="block px-3 py-2 text-gray-700 hover:text-[#3c3679] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-700 hover:text-[#3c3679] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-[#3c3679] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-[#3c3679] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/help"
                className="block px-3 py-2 text-gray-700 hover:text-[#3c3679] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Help
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-[#3c3679] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {showAuthButtons && (
                <div className="pt-4 border-t border-gray-200">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-gray-700">Welcome, {userName}</div>
                      <Button
                        onClick={() => {
                          router.push("/dashboard")
                          setIsMobileMenuOpen(false)
                        }}
                        variant="outline"
                        className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white"
                      >
                        Dashboard
                      </Button>
                      <Button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        variant="ghost"
                        className="w-full text-gray-700 hover:text-[#3c3679]"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          router.push("/login")
                          setIsMobileMenuOpen(false)
                        }}
                        variant="ghost"
                        className="w-full text-gray-700 hover:text-[#3c3679]"
                      >
                        Log In
                      </Button>
                      <Button
                        onClick={() => {
                          router.push("/signup")
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
