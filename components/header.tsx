"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  showAuthButtons?: boolean
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

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
    window.location.href = "/"
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/growvy-logo.png" alt="Growvy" width={120} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#3c3679] transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-[#3c3679] transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#3c3679] transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#3c3679] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#3c3679] transition-colors">
              Contact
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-[#3c3679] transition-colors">
              Help
            </Link>
          </nav>

          {/* Auth Buttons */}
          {showAuthButtons && (
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {userName}</span>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#3c3679] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-[#3c3679] transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-[#3c3679] transition-colors">
                Services
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-[#3c3679] transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#3c3679] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#3c3679] transition-colors">
                Contact
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-[#3c3679] transition-colors">
                Help
              </Link>

              {showAuthButtons && (
                <div className="pt-4 border-t space-y-2">
                  {isLoggedIn ? (
                    <>
                      <p className="text-gray-700">Welcome, {userName}</p>
                      <Link href="/dashboard" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                        >
                          Log In
                        </Button>
                      </Link>
                      <Link href="/signup" className="block">
                        <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
