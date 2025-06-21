"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Instagram, Linkedin, Facebook, X, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function HelpPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const helpArticles = [
    {
      title: "Getting Started",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Basics",
    },
    {
      title: "Prompt Writing Guide",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Advanced",
    },
    {
      title: "Lead Generation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Features",
    },
    {
      title: "Data Analytics",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Analytics",
    },
    {
      title: "Team Collaboration",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Collaboration",
    },
    {
      title: "Account Management",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Account",
    },
  ]

  const faqs = [
    {
      question: "How do I get started with Growvy's lead generation tools?",
      answer:
        "Getting started with Growvy is simple. First, sign up for an account and choose your plan. Then, define your target audience using our advanced filtering options. Our AI will automatically start identifying and qualifying prospects that match your ideal customer profile. You can begin outreach immediately with our personalized messaging tools.",
    },
    {
      question: "What types of data can I extract using the website scraping feature?",
      answer:
        "Our website scraping tool can extract various types of business data including contact information, company details, social media profiles, business descriptions, location data, and more. The tool handles JavaScript-rendered sites and dynamic content while maintaining GDPR compliance and data accuracy.",
    },
    {
      question: "How accurate is the AI-powered research and personalization?",
      answer:
        "Our AI research engine maintains over 95% accuracy by cross-referencing multiple premium databases and using advanced pattern recognition. The personalization feature analyzes individual communication styles, industry trends, and behavioral patterns to create highly relevant, contextual messages that significantly improve response rates.",
    },
    {
      question: "Can I integrate Growvy with my existing CRM system?",
      answer:
        "Yes, Growvy integrates seamlessly with popular CRM systems including Salesforce, HubSpot, Pipedrive, and many others. Our integration allows for automatic data synchronization, lead scoring updates, and workflow automation to streamline your sales process.",
    },
    {
      question: "What support options are available if I need help?",
      answer:
        "We offer comprehensive support including 24/7 chat support, email assistance, video tutorials, detailed documentation, and for Enterprise customers, dedicated account managers. Our support team is trained to help with both technical issues and strategic guidance for maximizing your results.",
    },
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
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
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Service
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
            <a href="#" className="text-[#3c3679] underline font-medium transition-all duration-200">
              Help
            </a>
            <a
              href="/blog"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Blog
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 lg:px-6 py-2 text-sm">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 lg:px-6 py-2 text-sm"
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
                Service
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
              <a href="#" className="text-[#3c3679] underline font-medium transition-all duration-200">
                Help
              </a>
              <a
                href="/blog"
                className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
              >
                Blog
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Help Hero Section */}
      <section className="bg-[#3c3679] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Help Page</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of Growvy's powerful features
          </p>
        </div>
      </section>

      {/* Help Articles Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpArticles.map((article, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#3c3679] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.description}</p>
                    <Button
                      variant="outline"
                      className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white text-sm"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find quick answers to common questions about Growvy</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8 py-3">Contact Now</Button>
              <Button
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white px-8 py-3"
              >
                Book a Demo Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you succeed with Growvy.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="bg-[#d0efff] p-6 text-center">
              <CardContent className="p-0">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
                <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white text-sm">Start Chat</Button>
              </CardContent>
            </Card>
            <Card className="bg-[#d0efff] p-6 text-center">
              <CardContent className="p-0">
                <div className="text-2xl mb-3">📧</div>
                <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
                <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white text-sm">Send Email</Button>
              </CardContent>
            </Card>
            <Card className="bg-[#d0efff] p-6 text-center">
              <CardContent className="p-0">
                <div className="text-2xl mb-3">📞</div>
                <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-4">Speak directly with our experts</p>
                <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white text-sm">Call Now</Button>
              </CardContent>
            </Card>
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
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li>+1234567890</li>
                <li>email@example.com</li>
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
            <p>
              All right reserved © 2025, Develop by{" "}
              <a
                href="https://uk-developer.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors underline"
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
