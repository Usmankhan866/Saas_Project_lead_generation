"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  showAuthButtons?: boolean
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const name = localStorage.getItem("userName")
    setIsAuthenticated(!!token)
    setUserName(name || "")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    setIsAuthenticated(false)
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/growvy-logo.png"
            alt="Growvy Logo"
            width={120}
            height={40}
            className="h-8 sm:h-10 w-auto cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="/"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/services"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            Services
          </a>
          <a
            href="/pricing"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            Pricing
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            About
          </a>
          <a
            href="/help"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            Help
          </a>
          <a
            href="/blog"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            Blog
          </a>
          <a
            href="/contact"
            className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
          >
            Contact
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        {showAuthButtons && (
          <div className="hidden sm:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                >
                  Dashboard
                </Button>
                <div className="flex items-center space-x-2">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
                    alt={userName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    onClick={() => router.push("/dashboard/profile")}
                  />
                  <Button onClick={handleLogout} variant="ghost" size="sm">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                >
                  Log In
                </Button>
                <Button onClick={() => router.push("/signup")} className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
          <nav className="flex flex-col space-y-4 pt-4">
            <a
              href="/"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Services
            </a>
            <a
              href="/pricing"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Pricing
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              About
            </a>
            <a
              href="/help"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Help
            </a>
            <a
              href="/blog"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Contact
            </a>
            {showAuthButtons && !isAuthenticated && (
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                >
                  Log In
                </Button>
                <Button onClick={() => router.push("/signup")} className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
