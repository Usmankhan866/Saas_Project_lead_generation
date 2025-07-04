import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, CheckCircle, Users, Target, TrendingUp, Mail, Phone, MapPin, Menu } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
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
            <a href="/" className="text-[#3c3679] underline font-medium transition-all duration-200">
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
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 lg:px-6 py-2 text-sm bg-transparent"
            >
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f8faff] to-[#e8f4ff] px-4 sm:px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 py-2 text-sm font-medium">
                  🚀 AI-Powered Lead Generation
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Your Perfect{" "}
                  <span className="text-[#3c3679] relative">
                    Customers
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#3c3679] rounded-full opacity-30"></div>
                  </span>{" "}
                  with AI
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover high-intent leads, automate outreach, and grow your business with our intelligent lead
                  generation platform. Get verified contact information and personalized insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8 py-4 text-lg font-semibold rounded-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Image
                        key={i}
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold">2,000+ businesses</div>
                    <div>trust Growvy</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/main-hero.png"
                  alt="AI-powered lead generation dashboard"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#3c3679] to-[#5a4fcf] rounded-2xl opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "50K+", label: "Active Users" },
              { icon: Target, number: "2M+", label: "Leads Generated" },
              { icon: TrendingUp, number: "300%", label: "Average ROI" },
              { icon: CheckCircle, number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f0f7ff] rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-[#3c3679]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How Growvy Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes lead generation simple and effective in just three steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Define Your Target",
                description: "Set your ideal customer criteria including industry, location, company size, and more.",
                image: "/images/how-it-work-1.png",
              },
              {
                step: "02",
                title: "AI Finds Leads",
                description:
                  "Our AI scans millions of data points to find high-intent prospects that match your criteria.",
                image: "/images/how-it-work-2.png",
              },
              {
                step: "03",
                title: "Get Verified Contacts",
                description: "Receive verified email addresses, phone numbers, and personalized outreach suggestions.",
                image: "/images/how-it-work-3.svg",
              },
            ].map((step, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-[#3c3679] text-sm font-bold mb-2">STEP {step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to find, connect, and convert your ideal customers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "AI-Powered Lead Scoring",
                  description:
                    "Our AI analyzes hundreds of signals to identify the most promising prospects for your business.",
                },
                {
                  title: "Real-time Data Verification",
                  description: "Get up-to-date contact information with our real-time verification system.",
                },
                {
                  title: "Personalized Outreach",
                  description: "Generate personalized messages based on prospect data and behavior patterns.",
                },
                {
                  title: "CRM Integration",
                  description: "Seamlessly integrate with your existing CRM and sales tools.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#3c3679]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <Image
                src="/images/mobile-solution.png"
                alt="Growvy mobile app interface"
                width={500}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of businesses that have transformed their lead generation with Growvy
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                company: "TechStart Inc.",
                content:
                  "Growvy has revolutionized our lead generation process. We've seen a 300% increase in qualified leads within just 3 months.",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
              },
              {
                name: "Michael Chen",
                role: "Sales Manager",
                company: "Growth Solutions",
                content:
                  "The AI-powered insights are incredible. We're now targeting the right prospects at the right time with personalized messages.",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
              },
              {
                name: "Emily Rodriguez",
                role: "CEO",
                company: "Digital Dynamics",
                content:
                  "The ROI has been outstanding. Growvy pays for itself within the first month through the quality leads it generates.",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3c3679]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Lead Generation?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Growvy to find their perfect customers. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#3c3679] hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#3c3679] px-8 py-4 text-lg font-semibold bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Image
                src="/images/growvy-logo.png"
                alt="Growvy Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 mb-6">
                AI-powered lead generation platform helping businesses find their perfect customers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/services" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/help" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Growvy. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
