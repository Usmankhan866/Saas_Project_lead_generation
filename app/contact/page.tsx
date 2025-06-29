"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Linkedin, Facebook, X, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import AuthHeader from "@/components/AuthHeader"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <AuthHeader currentPage="contact" />

      {/* Contact Hero Section */}
      <section className="bg-[#3c3679] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Contact</h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-[#d0efff] p-6 h-fit">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#3c3679] rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900 font-medium">123 456 789 10</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#3c3679] rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900 font-medium">yourname@gmail.com</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#3c3679] rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900 font-medium">Lorem Ipsum dolor sit amet</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none resize-none"
                  ></textarea>
                </div>

                <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3 text-lg font-semibold">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3c3679] text-white px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/images/growvy-logo.png"
                  alt="Growvy Logo"
                  width={120}
                  height={40}
                  className="h-6 sm:h-8 w-auto brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-gray-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-300 transition-colors">
                    Service
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-gray-300 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-300 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-gray-300 transition-colors">
                    Help
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-300 transition-colors">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-300 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li>+12345678976</li>
                <li>emailhere@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Get in touch</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm">
            <p>Copyright Reserved | 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
