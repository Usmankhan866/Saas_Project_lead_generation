"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Star, Shield, Search, Target, Globe, Mail, Phone } from "lucide-react"
import Image from "next/image"
import AuthHeader from "@/components/AuthHeader"

export default function HomePage() {
  const features = [
    {
      icon: <Search className="h-6 w-6 text-[#3c3679]" />,
      title: "Smart Lead Discovery",
      description: "Find high-quality leads using advanced search filters and AI-powered recommendations.",
    },
    {
      icon: <Target className="h-6 w-6 text-[#3c3679]" />,
      title: "Precision Targeting",
      description: "Target your ideal customers with location, industry, and company size filters.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[#3c3679]" />,
      title: "Global Database",
      description: "Access millions of verified business contacts from around the world.",
    },
    {
      icon: <Mail className="h-6 w-6 text-[#3c3679]" />,
      title: "Email Verification",
      description: "Get verified email addresses with our advanced validation system.",
    },
    {
      icon: <Phone className="h-6 w-6 text-[#3c3679]" />,
      title: "Phone Numbers",
      description: "Access direct phone numbers for key decision makers.",
    },
    {
      icon: <Shield className="h-6 w-6 text-[#3c3679]" />,
      title: "Data Compliance",
      description: "GDPR and CCPA compliant data collection and processing.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Director",
      company: "TechCorp",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      content:
        "Growvy has transformed our lead generation process. We've seen a 300% increase in qualified leads since we started using the platform.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "StartupXYZ",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      content:
        "The accuracy of the data is impressive. We've been able to connect with decision makers directly, saving us hours of research time.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Business Development",
      company: "GrowthCo",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      content:
        "Growvy's interface is intuitive and the results are exactly what we need. It's become an essential tool for our sales team.",
      rating: 5,
    },
  ]

  const stats = [
    { number: "10M+", label: "Business Contacts" },
    { number: "50K+", label: "Happy Customers" },
    { number: "99.5%", label: "Data Accuracy" },
    { number: "24/7", label: "Support" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#d0efff] text-[#3c3679]">#1 Lead Generation Platform</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Find Your Perfect
                <span className="text-[#3c3679]"> Customers</span> Faster
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover high-quality leads with our AI-powered platform. Get verified contact information, company
                insights, and grow your business with precision targeting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8 py-4">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  14-day free trial
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/main-hero-new.png"
                alt="Lead generation dashboard"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-[#3c3679] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#d0efff] text-[#3c3679]">Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Generate Quality Leads
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to find, verify, and connect with your ideal
              customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#f0f4ff] rounded-lg flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#d0efff] text-[#3c3679]">How It Works</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Generate Leads in 3 Simple Steps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes it easy to find and connect with your ideal customers.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-1-new.png"
                  alt="Search for leads"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced search filters to find companies and contacts that match your ideal customer profile.
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-2-new.png"
                  alt="Verify contacts"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verify & Enrich</h3>
              <p className="text-gray-600">
                Get verified email addresses, phone numbers, and detailed company information for your prospects.
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-3.png"
                  alt="Connect with prospects"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect & Convert</h3>
              <p className="text-gray-600">
                Export your leads to your CRM or reach out directly to start building relationships and closing deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#d0efff] text-[#3c3679]">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Sales Teams Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their experience with Growvy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-center space-x-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
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
      <section className="py-20 bg-[#3c3679] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Supercharge Your Lead Generation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sales professionals who trust Growvy to find their perfect customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-[#3c3679] hover:bg-gray-100 px-8 py-4">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#3c3679] px-8 py-4 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm opacity-75">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
