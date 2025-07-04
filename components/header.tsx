"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface HeaderProps {
  showAuthButtons?: boolean
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")

    if (token && email) {
      setIsAuthenticated(true)
      setUserEmail(email)
      setUserName(name || "User")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    setIsAuthenticated(false)
    router.push("/")
  }

  const isActivePage = (path: string) => {
    return pathname === path
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/help", label: "Help" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-50">
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-medium transition-all duration-200 ${
                isActivePage(link.href)
                  ? "text-[#3c3679] underline"
                  : "text-gray-700 hover:text-[#3c3679] hover:underline"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden sm:flex items-center space-x-3">
          {showAuthButtons && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
                      alt={userName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      onClick={() => router.push("/dashboard/profile")}
                    />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{userName}</div>
                      <div className="text-gray-500">{userEmail}</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 lg:px-6 py-2 text-sm"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 lg:px-6 py-2 text-sm bg-transparent"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => router.push("/signup")}
                    className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 lg:px-6 py-2 text-sm"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => router.push("/login")}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 lg:px-6 py-2 text-sm"
                  >
                    Log In
                  </Button>
                </>
              )}
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-200 ${
                  isActivePage(link.href)
                    ? "text-[#3c3679] underline"
                    : "text-gray-700 hover:text-[#3c3679] hover:underline"
                }`}
              >
                {link.label}
              </a>
            ))}

            {showAuthButtons && (
              <div className="flex flex-col sm:hidden space-y-2 pt-4">
                {isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-6 py-2 text-sm"
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm bg-transparent"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => router.push("/signup")}
                      className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-6 py-2 text-sm"
                    >
                      Sign Up
                    </Button>
                    <Button
                      onClick={() => router.push("/login")}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm"
                    >
                      Log In
                    </Button>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
