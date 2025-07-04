import { Instagram, Linkedin, Facebook, X } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
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
                  Services
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
                  Blog
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
  )
}
