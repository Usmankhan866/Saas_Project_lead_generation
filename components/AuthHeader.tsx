"use client"

import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface AuthHeaderProps {
  currentPage?: string
}

export default function AuthHeader({ currentPage }: AuthHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      name: "Lead Generation Automation",
      description:
        "Growvy helps you discover relevant, high-intent leads based on industry, location, and filters you choose.",
      highlighted: true,
    },
    {
      name: "Website Scrapping",
      description: "Extract valuable data from websites automatically",
      highlighted: false,
    },
    {
      name: "AI Powered Research",
      description: "Leverage AI to conduct comprehensive market research",
      highlighted: false,
    },
    {
      name: "Data Enrichment",
      description: "Enhance your existing data with additional insights",
      highlighted: false,
    },
    {
      name: "AI Personalization",
      description: "Create personalized experiences using AI technology",
      highlighted: false,
    },
    {
      name: "Verified Emails & Phone Numbers",
      description: "Get accurate contact information for your leads",
      highlighted: false,
    },
  ]

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated")
      const email = localStorage.getItem("userEmail") || ""
      const name = localStorage.getItem("userName") || ""

      setIsAuthenticated(!!isAuth)
      setUserEmail(email)
      setUserName(name)
    }

    checkAuth()

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [])

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleProfileClick = () => {
    router.push("/dashboard/profile")
  }

  const isActivePage = (page: string) => {
    return currentPage === page
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/growvy-logo.png"
            alt="Growvy Logo"
            width={120}
            height={40}
            className="h-8 sm:h-10 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="/"
            className={`font-medium transition-all duration-200 ${
              isActivePage("home") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
            }`}
          >
            Home
          </a>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className={`font-medium transition-all duration-200 flex items-center gap-1 ${
                isActivePage("services")
                  ? "text-[#3c3679] underline"
                  : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Services Dropdown Menu */}
            {isServicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="grid grid-cols-2 h-[400px]">
                  {/* Left Side - Featured Service */}
                  <div className="p-8 bg-gray-50 flex flex-col justify-between">
                    <div>
                      <div className="mb-6">
                        <Image
                          src="/images/services-dropdown-hero.png"
                          alt="Lead Generation Automation"
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Lead Generation Automation</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Growvy helps you discover relevant, high-intent leads based on industry, location, and filters
                        you choose.
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Services List */}
                  <div className="p-6">
                    <div className="space-y-1">
                      {services.map((service, index) => (
                        <a
                          key={index}
                          href="/services"
                          className={`block px-4 py-3 rounded-lg transition-colors ${
                            service.highlighted
                              ? "bg-[#d0efff] text-[#3c3679] font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {service.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-6 py-2">Learn more</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="/pricing"
            className={`font-medium transition-all duration-200 ${
              isActivePage("pricing")
                ? "text-[#3c3679] underline"
                : "text-gray-700 hover:text-[#3c3679] hover:underline"
            }`}
          >
            Pricing
          </a>
          <a
            href="/about"
            className={`font-medium transition-all duration-200 ${
              isActivePage("about") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
            }`}
          >
            About
          </a>
          <a
            href="/help"
            className={`font-medium transition-all duration-200 ${
              isActivePage("help") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
            }`}
          >
            Help
          </a>
          <a
            href="/blog"
            className={`font-medium transition-all duration-200 ${
              isActivePage("blog") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
            }`}
          >
            Blog
          </a>
          <a
            href="/contact"
            className={`font-medium transition-all duration-200 ${
              isActivePage("contact")
                ? "text-[#3c3679] underline"
                : "text-gray-700 hover:text-[#3c3679] hover:underline"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden sm:flex items-center space-x-3">
          {isAuthenticated ? (
            // Logged in user profile
            <div
              onClick={handleProfileClick}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
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
          ) : (
            // Login/Signup buttons
            <>
              <Button asChild className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 lg:px-6 py-2 text-sm">
                <a href="/signup">Sign Up</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 lg:px-6 py-2 text-sm bg-transparent"
              >
                <a href="/login">Log In</a>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
          <nav className="flex flex-col space-y-4 pt-4">
            <a
              href="/"
              className={`font-medium transition-all duration-200 ${
                isActivePage("home") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Home
            </a>
            <a
              href="/services"
              className={`font-medium transition-all duration-200 ${
                isActivePage("services")
                  ? "text-[#3c3679] underline"
                  : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Services
            </a>
            <a
              href="/pricing"
              className={`font-medium transition-all duration-200 ${
                isActivePage("pricing")
                  ? "text-[#3c3679] underline"
                  : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Pricing
            </a>
            <a
              href="/about"
              className={`font-medium transition-all duration-200 ${
                isActivePage("about")
                  ? "text-[#3c3679] underline"
                  : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              About
            </a>
            <a
              href="/help"
              className={`font-medium transition-all duration-200 ${
                isActivePage("help") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Help
            </a>
            <a
              href="/blog"
              className={`font-medium transition-all duration-200 ${
                isActivePage("blog") ? "text-[#3c3679] underline" : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Blog
            </a>
            <a
              href="/contact"
              className={`font-medium transition-all duration-200 ${
                isActivePage("contact")
                  ? "text-[#3c3679] underline"
                  : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              Contact
            </a>

            {/* Mobile Auth Section */}
            <div className="flex flex-col sm:hidden space-y-2 pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <div
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                >
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
              ) : (
                <>
                  <Button asChild className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-6 py-2 text-sm">
                    <a href="/signup">Sign Up</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm bg-transparent"
                  >
                    <a href="/login">Log In</a>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
