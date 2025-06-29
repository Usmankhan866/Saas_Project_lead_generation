"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Zap, Award, ArrowRight, CheckCircle } from "lucide-react"
import AuthHeader from "@/components/AuthHeader"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "1M+", label: "Leads Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8 text-[#3c3679]" />,
      title: "Precision",
      description: "We deliver accurate, high-quality leads that match your exact criteria and business needs.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#3c3679]" />,
      title: "Speed",
      description: "Get results in seconds, not hours. Our platform is built for efficiency and rapid deployment.",
    },
    {
      icon: <Users className="h-8 w-8 text-[#3c3679]" />,
      title: "Partnership",
      description: "We're not just a service provider - we're your growth partner, invested in your success.",
    },
    {
      icon: <Award className="h-8 w-8 text-[#3c3679]" />,
      title: "Excellence",
      description: "We maintain the highest standards in data quality, customer service, and platform reliability.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Former VP of Sales at TechCorp with 15+ years in B2B lead generation",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Ex-Google engineer specializing in data systems and machine learning",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Customer success expert with a passion for helping businesses grow",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Product strategist focused on creating intuitive, powerful tools for sales teams",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize lead generation",
    },
    {
      year: "2021",
      title: "First 1,000 Customers",
      description: "Reached our first major milestone with rapid growth",
    },
    {
      year: "2022",
      title: "Series A Funding",
      description: "Raised $10M to accelerate product development",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched AI-powered lead scoring and personalization",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to serve customers in 50+ countries",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="about" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <Badge className="mb-4 bg-[#d0efff] text-[#3c3679]">About Growvy</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            We're Building the Future of
            <span className="text-[#3c3679]"> Lead Generation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Founded in 2020, Growvy has helped thousands of businesses discover and connect with their ideal customers
            through intelligent lead generation and data-driven insights.
          </p>
          <Button size="lg" className="bg-[#3c3679] hover:bg-[#2d2a5f]">
            Join Our Mission
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-gray-50 rounded-2xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-[#3c3679] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe that every business deserves access to high-quality leads and the tools to grow. Our mission is
              to democratize lead generation by making it accessible, affordable, and incredibly effective for
              businesses of all sizes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-gray-700">Democratize access to quality business data</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-gray-700">Empower businesses to grow faster</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-gray-700">Build lasting partnerships with our customers</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Team collaboration"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we build products, serve customers, and grow as a
              company.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're a diverse team of entrepreneurs, engineers, and growth experts united by our passion for helping
              businesses succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#3c3679] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="py-16 bg-gray-50 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small startup to a leading platform, here are the key milestones in our growth story.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <div className="bg-[#3c3679] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow With Us?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses that trust Growvy to help them find and connect with their ideal customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#3c3679] hover:bg-gray-100">
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#3c3679] bg-transparent"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
