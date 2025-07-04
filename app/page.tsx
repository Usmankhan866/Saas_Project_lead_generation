"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  Quote,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Shield,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Component() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const testimonialScrollRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Olivia Green",
      role: "Marketing Director",
      company: "TechCorp Solutions",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Sales Manager",
      company: "Digital Dynamics",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      company: "Johnson & Associates",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 5,
    },
    {
      name: "David Wilson",
      role: "Growth Strategist",
      company: "Scale Ventures",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "VP of Sales",
      company: "InnovateLab",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 4,
    },
    {
      name: "James Brown",
      role: "Founder & CEO",
      company: "StartupHub",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Followed by some bogus content. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      rating: 5,
    },
  ]

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialScrollRef.current) {
      const scrollAmount = 420
      const currentScroll = testimonialScrollRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      testimonialScrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3),
    )
  }

  const visibleTestimonials = testimonials.slice(currentTestimonial * 3, currentTestimonial * 3 + 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-6 sm:px-8 py-3 flex items-center justify-center gap-2">
                Contact Now
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 bg-transparent"
              >
                Book a Demo Today
              </Button>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg p-3 w-fit border border-gray-200">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
                <span className="text-gray-700 text-sm">Rated 4.9 out of 1200 reviews</span>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <Image
              src="/images/main-hero-new.png"
              alt="Professional woman with laptop showing lead generation analytics"
              width={600}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#3c3679] text-white p-4 sm:p-6">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-white rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">
                        Super useful and easy to with over 100+ customizations!
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-16">How it Works?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/how-it-work-1-new.png"
                  alt="Professional woman presenting analytics and data visualization"
                  width={300}
                  height={300}
                  className="mx-auto rounded-lg object-cover w-full max-w-[300px]"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Analyze & Report</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Get comprehensive analytics and detailed reports to track your lead generation performance.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/how-it-work-2-new.png"
                  alt="AI-powered research and automation with chatbot assistance"
                  width={300}
                  height={300}
                  className="mx-auto rounded-lg object-cover w-full max-w-[300px]"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">AI Research & Personalize</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                AI researches and personalizes each lead for you — instantly and accurately.
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="mb-6">
                <Image
                  src="/images/how-it-work-3.svg"
                  alt="Mobile integration and workflow optimization"
                  width={300}
                  height={300}
                  className="mx-auto rounded-lg object-cover w-full max-w-[300px]"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Mobile & Integration</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Access your leads anywhere with our mobile solution and seamless integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Growvy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide cutting-edge solutions that deliver real results for your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3c3679] transition-colors duration-300">
                <Shield className="w-8 h-8 text-[#3c3679] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">99.9% Data Accuracy</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced verification systems ensure the highest quality data with real-time validation and
                continuous updates.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3c3679] transition-colors duration-300">
                <Zap className="w-8 h-8 text-[#3c3679] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get qualified leads in minutes, not hours. Our AI-powered system processes thousands of prospects
                instantly.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3c3679] transition-colors duration-300">
                <Users className="w-8 h-8 text-[#3c3679] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is available around the clock to help you maximize your lead generation
                success.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3c3679] transition-colors duration-300">
                <TrendingUp className="w-8 h-8 text-[#3c3679] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven ROI Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Our clients see an average 300% increase in qualified leads and 150% improvement in conversion rates.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3c3679] transition-colors duration-300">
                <CheckCircle className="w-8 h-8 text-[#3c3679] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">GDPR Compliant</h3>
              <p className="text-gray-600 leading-relaxed">
                Full compliance with data protection regulations ensures your business stays secure and legally
                protected.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3c3679] transition-colors duration-300">
                <Award className="w-8 h-8 text-[#3c3679] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Recognition</h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted by 10,000+ businesses and recognized as a leader in AI-powered lead generation solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="px-4 sm:px-6 py-16 bg-[#3c3679] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Success by the Numbers</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Real results from businesses that trust Growvy to power their growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg font-semibold mb-2">Active Users</div>
              <p className="text-white/80 text-sm">Businesses worldwide trust our platform</p>
            </div>

            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">2M+</div>
              <div className="text-lg font-semibold mb-2">Leads Generated</div>
              <p className="text-white/80 text-sm">High-quality prospects delivered monthly</p>
            </div>

            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">300%</div>
              <div className="text-lg font-semibold mb-2">Average ROI Increase</div>
              <p className="text-white/80 text-sm">Return on investment for our clients</p>
            </div>

            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-lg font-semibold mb-2">Uptime Guarantee</div>
              <p className="text-white/80 text-sm">Reliable service you can count on</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Thousands of Successful Businesses?</h3>
              <p className="text-white/80 mb-6 text-lg">
                Start your free trial today and experience the power of AI-driven lead generation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#3c3679] hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#3c3679] px-8 py-3 text-lg font-medium bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-16">Featured Section</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Lead Generation Automation", icon: "📊" },
              { title: "Website Scraping", icon: "🌐" },
              { title: "AI Powered Research", icon: "🤖" },
              { title: "Data Enrichment", icon: "📈" },
              { title: "AI Personalization", icon: "⚡" },
              { title: "Verified Emails and Phone Numbers", icon: "✅" },
            ].map((feature, i) => (
              <Card key={i} className="bg-[#3c3679] text-white p-4 sm:p-6 relative">
                <CardContent className="p-0">
                  <div className="absolute top-4 right-4">
                    <ArrowUp className="w-5 h-5" />
                  </div>
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Testimonials Section - Matching the Image Design */}
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
