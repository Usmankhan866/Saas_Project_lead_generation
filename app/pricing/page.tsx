"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, Menu, Instagram, Linkedin, Facebook } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function PricingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
          <div className="flex items-center space-x-2">
            <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-8 w-auto" />
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
            <a href="/pricing" className="text-[#3c3679] underline font-medium transition-all duration-200">
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

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-6 py-2 text-sm font-medium">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white px-6 py-2 text-sm font-medium"
            >
              Log In
            </Button>
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
              <a href="/pricing" className="text-[#3c3679] underline font-medium transition-all duration-200">
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
          </div>
        )}
      </header>

      {/* Pricing Hero Section */}
      <section className="bg-gradient-to-r from-[#3c3679] to-[#2d2a5f] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free and scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <Card className="bg-white border border-gray-200 p-6 relative h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$19</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>1.2k Credits/Year</option>
                  </select>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                  <p className="text-gray-600 text-sm mb-4">Unleash the power of automation.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Multi-step Zaps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">3 Premium Apps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">2 Users team</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white mt-auto">Choose plan</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan - MOST POPULAR (Middle) */}
            <Card className="bg-[#3c3679] text-white p-6 relative h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#2d2a5f] text-white px-4 py-1 rounded-full text-xs font-medium">MOST POPULAR</div>
              </div>
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-3xl font-bold">$89</span>
                    <span className="text-white/80 text-sm">/month</span>
                  </div>
                  <select className="w-full p-2 border border-white/20 rounded text-sm bg-transparent text-white">
                    <option className="text-gray-900">10.5k Credits/Year</option>
                  </select>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-white/80 text-sm mb-4">Automation plus enterprise-grade features.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Multi-step Zap</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Unlimited Premium</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Unlimited Users Team</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Advanced Admin</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Custom Data Retention</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-white text-[#3c3679] hover:bg-gray-100 mt-auto">Choose plan</Button>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card className="bg-white border border-gray-200 p-6 relative h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$54</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>3.5k Credits/Year</option>
                  </select>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
                  <p className="text-gray-600 text-sm mb-4">Advanced tools to take your work to the next level.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Multi-step Zaps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Unlimited Premium</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">50 Users team</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Shared Workspace</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white mt-auto">Choose plan</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 sm:px-6 ">
        <div className="max-w-6xl mx-auto ">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Feature comparison table</h2>
          <div className="bg-[#d0efff] rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-6 font-medium text-gray-900"></th>
                    <th className="text-center p-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Starter</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          $20 <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Enterprise</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          $200 <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Growth</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          $100 <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">All limited links</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Own analytics platform</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Chat support</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Number of users</td>
                    <td className="p-4 text-center text-gray-700">1 user</td>
                    <td className="p-4 text-center text-gray-700">Unlimited</td>
                    <td className="p-4 text-center text-gray-700">3 users</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Optimize hashtags</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Account manager</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Number of articles</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Satisfaction guaranteed</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className=" flex justify-end   border-t border-gray-200 p-6">
              <div
                className="grid grid-cols-3 gap-4
               "
              >
                <div className="text-center">
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8">Choose plan</Button>
                </div>
                <div className="text-center">
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8">Choose plan</Button>
                </div>
                <div className="text-center">
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8">Choose plan</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}

      {/* Footer */}
      <footer className="bg-[#3c3679] text-white px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/images/growvy-logo.png"
                  alt="Growvy Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                AI-powered lead generation platform helping businesses scale their sales pipeline with intelligent
                automation.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/" className="hover:text-gray-300 transition-colors flex items-center">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-300 transition-colors flex items-center">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-gray-300 transition-colors flex items-center">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-300 transition-colors flex items-center">
                    About
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-gray-300 transition-colors flex items-center">
                    Help
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-300 transition-colors flex items-center">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <span>📞 +1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <span>✉️ hello@growvy.com</span>
                </li>
                <li className="flex items-center">
                  <span>📍 San Francisco, CA</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm">
            <p className="text-white/80">
              © 2025 Growvy. All rights reserved. Developed by{" "}
              <a
                href="https://uk-developer.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors underline font-medium"
              >
                UsmanKhan
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
