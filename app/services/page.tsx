"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, X, Menu, Instagram, Linkedin, Facebook, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ServicesPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const testimonials = [
    {
      name: "Olivia Green",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 4,
    },
    {
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 4,
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 3) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 3 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = testimonials.slice(currentTestimonial, currentTestimonial + 3)

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
            <a href="/services" className="text-[#3c3679] underline font-medium transition-all duration-200">
              Service
            </a>
            <a
              href="/pricing"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Pricing
            </a>
            <a
              href="#"
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
              <a href="#" className="text-[#3c3679] underline font-medium transition-all duration-200">
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

      {/* Services Hero Section */}
      <section className="bg-[#3c3679] text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Explore our Services</h1>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
            Discover our comprehensive suite of AI-powered solutions designed to accelerate your business growth
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Service 1 - Lead Generation Automation */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d0efff] rounded-full flex items-center justify-center">
                  <span className="text-[#3c3679] font-bold text-sm">01</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Lead Generation Automation</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Transform your sales pipeline with our intelligent lead generation system. Our AI-powered platform
                  automatically identifies and qualifies high-potential prospects, saving you countless hours of manual
                  research while delivering superior results.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Leverage advanced algorithms to discover leads that match your ideal customer profile. Our system
                  analyzes millions of data points to ensure you're targeting the right prospects at the right time,
                  increasing your conversion rates by up to 300%.
                </p>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Real-time prospect identification</li>
                    <li>• Advanced filtering and segmentation</li>
                    <li>• Automated lead scoring and qualification</li>
                    <li>• Integration with popular CRM systems</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="Lead Generation Network Visualization"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Service 2 - Website Scraping */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="Website Scraping Data Visualization"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d0efff] rounded-full flex items-center justify-center">
                  <span className="text-[#3c3679] font-bold text-sm">02</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Website Scraping</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Extract valuable business intelligence from any website with our sophisticated scraping technology.
                  Our platform handles complex JavaScript-rendered sites, dynamic content, and anti-bot measures while
                  maintaining complete data accuracy and compliance.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Scale your data collection efforts without the technical complexity. Our robust infrastructure
                  processes millions of pages daily, delivering structured, clean data ready for immediate use in your
                  business operations and decision-making processes.
                </p>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• JavaScript and SPA support</li>
                    <li>• Anti-detection and proxy rotation</li>
                    <li>• Real-time data extraction</li>
                    <li>• Custom data formatting and export</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Service 3 - AI Powered Research */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d0efff] rounded-full flex items-center justify-center">
                  <span className="text-[#3c3679] font-bold text-sm">03</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">AI Powered Research</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Revolutionize your research process with cutting-edge artificial intelligence. Our AI research
                  assistant analyzes vast amounts of data from multiple sources, providing comprehensive insights and
                  actionable intelligence in minutes rather than hours.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  From market analysis to competitor research, our AI engine processes complex information patterns and
                  delivers detailed reports with key findings, trends, and recommendations tailored to your specific
                  business needs and objectives.
                </p>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Multi-source data aggregation</li>
                    <li>• Intelligent pattern recognition</li>
                    <li>• Automated report generation</li>
                    <li>• Custom research parameters</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="AI Powered Research Technology"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Service 4 - Data Enrichment */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="Data Enrichment Business Analytics"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d0efff] rounded-full flex items-center justify-center">
                  <span className="text-[#3c3679] font-bold text-sm">04</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Data Enrichment</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Enhance your existing data with comprehensive business intelligence. Our enrichment service adds
                  missing contact information, company details, social profiles, and behavioral insights to transform
                  incomplete records into actionable customer profiles.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Improve data quality and completeness with our advanced matching algorithms. We cross-reference
                  multiple premium databases to ensure accuracy while maintaining GDPR compliance and data privacy
                  standards throughout the enrichment process.
                </p>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Contact information completion</li>
                    <li>• Company and industry data</li>
                    <li>• Social media profile matching</li>
                    <li>• Data quality scoring and validation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Service 5 - AI Personalization */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d0efff] rounded-full flex items-center justify-center">
                  <span className="text-[#3c3679] font-bold text-sm">05</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">AI Personalization</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Create highly personalized outreach campaigns that resonate with your prospects. Our AI analyzes
                  individual preferences, communication styles, and behavioral patterns to craft messages that feel
                  genuinely personal and drive higher engagement rates.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Move beyond generic templates with intelligent content generation. Our system creates unique,
                  contextually relevant messages for each prospect, incorporating their industry, role, recent
                  activities, and pain points to maximize response rates and conversion potential.
                </p>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Dynamic content generation</li>
                    <li>• Behavioral pattern analysis</li>
                    <li>• Multi-channel personalization</li>
                    <li>• A/B testing and optimization</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="AI Personalization Interface"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Service 6 - Verified Emails and Phone Numbers */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="Verified Contact Information Workspace"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d0efff] rounded-full flex items-center justify-center">
                  <span className="text-[#3c3679] font-bold text-sm">06</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Verified Emails and Phone Numbers</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Access the most accurate and up-to-date contact information available. Our verification system uses
                  multiple validation methods and real-time checks to ensure every email and phone number in your
                  database is current, active, and deliverable.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Protect your sender reputation and improve campaign performance with our comprehensive verification
                  process. We eliminate bounces, reduce spam complaints, and ensure your messages reach the intended
                  recipients, maximizing your outreach effectiveness.
                </p>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Real-time email verification</li>
                    <li>• Phone number validation and formatting</li>
                    <li>• Deliverability scoring</li>
                    <li>• Bulk verification processing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-White">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Testimonials</h2>
          </div>

          {/* Testimonial Cards Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Testimonial Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {visibleTestimonials.map((testimonial, i) => (
                <div key={i} className="relative">
                  <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative">
                    {/* Purple Quote Icon */}
                    <div className="absolute -top-4 right-6">
                      <div className="w-12 h-12 bg-[#3c3679] rounded-full flex items-center justify-center shadow-lg">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <CardContent className="p-0">
                      {/* Profile Section */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                          {/* Star Rating */}
                          <div className="flex space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <div className="mt-4">
                        <p className="text-gray-700 leading-relaxed text-sm">{testimonial.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentTestimonial ? "bg-[#3c3679]" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial set ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none resize-none"
              ></textarea>
            </div>
            <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white py-3 text-lg font-semibold">
              Submit
            </Button>
          </form>
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
