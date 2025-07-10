"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, ChevronLeft, ChevronRight, Mail } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const teamScrollRef = useRef<HTMLDivElement>(null)

  const teamMembers = [
    {
      name: "Sarah Aleah",
      role: "Chief Creative Officer",
      department: "Creative & Design",
      bio: "Leading creative vision with 10+ years in digital marketing and brand strategy.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#",
      email: "sarah@growvy.com",
    },
    {
      name: "Jonathan Leon",
      role: "Chief Talent Officer",
      department: "Human Resources",
      bio: "Building exceptional teams and fostering company culture for sustainable growth.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#",
      email: "jonathan@growvy.com",
    },
    {
      name: "Dean Johanes",
      role: "Chief Marketing Officer",
      department: "Marketing & Growth",
      bio: "Driving growth strategies and market expansion with data-driven marketing approaches.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#",
      email: "dean@growvy.com",
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Technology Officer",
      department: "Engineering & AI",
      bio: "Leading technical innovation and AI development to revolutionize lead generation.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#",
      email: "emily@growvy.com",
    },
    {
      name: "Michael Chen",
      role: "Chief Operations Officer",
      department: "Operations & Strategy",
      bio: "Optimizing operations and scaling processes to deliver exceptional customer experiences.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#",
      email: "michael@growvy.com",
    },
    {
      name: "Lisa Thompson",
      role: "Chief Financial Officer",
      department: "Finance & Analytics",
      bio: "Managing financial strategy and business intelligence to drive sustainable growth.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#",
      email: "lisa@growvy.com",
    },
  ]

  const scrollTeam = (direction: "left" | "right") => {
    if (teamScrollRef.current) {
      const scrollAmount = 350
      const currentScroll = teamScrollRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      teamScrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Growvy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to help businesses grow by providing powerful tools for lead generation and business
              intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, Growvy emerged from the need to simplify and streamline the process of finding and
                connecting with potential customers and business partners.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of experienced developers and business professionals recognized that traditional lead
                generation methods were time-consuming, expensive, and often ineffective.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of businesses worldwide, helping them discover new opportunities and grow
                their customer base through intelligent data-driven solutions.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize access to business intelligence and make lead generation accessible, affordable, and
                effective for businesses of all sizes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-[#3c3679] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">10K+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Active Users</h3>
              <p className="text-gray-600">Businesses trust our platform</p>
            </div>
            <div className="text-center">
              <div className="bg-[#3c3679] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1M+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leads Generated</h3>
              <p className="text-gray-600">Quality leads delivered</p>
            </div>
            <div className="text-center">
              <div className="bg-[#3c3679] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">99%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Uptime</h3>
              <p className="text-gray-600">Reliable service guarantee</p>
            </div>
          </div>

          {/* Mission Statement Section */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Mission statement</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      At Growvy, our mission is simple: Empower local businesses with cutting-edge tools to find quality
                      leads and connect with their ideal customers—without spending hours on manual outreach.
                    </p>
                    <p>
                      We believe that every business, regardless of size, deserves access to the same growth engines
                      that large corporations use, but in a way that's affordable, scalable, and easy to use.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                      alt="Team collaboration and strategy meeting"
                      width={500}
                      height={350}
                      className="w-full h-auto rounded-lg object-cover shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Background Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
                      alt="Business professional looking at city skyline"
                      width={500}
                      height={350}
                      className="w-full h-auto rounded-lg object-cover shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Company background</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Growvy was born out of a real need. After working with dozens of local businesses, we saw how
                      outdated and time-consuming traditional lead generation could be. Most tools were built for
                      enterprise use—not for the local entrepreneur juggling 10 other tasks.
                    </p>
                    <p>
                      So we built Growvy—a smarter, AI-driven outreach platform focused specifically on the local
                      business ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Professional Team Section */}
          <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experienced professionals dedicated to revolutionizing how businesses generate and nurture leads
                </p>
              </div>

              {/* Professional Team Cards with Navigation */}
              <div className="relative">
                {/* Navigation Buttons */}
                <button
                  onClick={() => scrollTeam("left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-10 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200"
                  aria-label="Previous team members"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                  onClick={() => scrollTeam("right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-10 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200"
                  aria-label="Next team members"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Team Cards Container */}
                <div
                  ref={teamScrollRef}
                  className="flex overflow-x-auto gap-8 pb-6 scrollbar-hide scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex-shrink-0 w-80">
                      <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full group">
                        <CardContent className="p-8">
                          {/* Profile Image */}
                          <div className="relative mb-6">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-[#3c3679] transition-all duration-300">
                              <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              <div className="w-6 h-6 bg-[#3c3679] rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Member Info */}
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-[#3c3679] font-semibold text-sm mb-1">{member.role}</p>
                            <p className="text-gray-500 text-xs uppercase tracking-wide">{member.department}</p>
                          </div>

                          {/* Bio */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">{member.bio}</p>

                          {/* Contact Info */}
                          <div className="space-y-3 border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-center space-x-4">
                              <a
                                href={member.linkedin}
                                className="w-8 h-8 bg-gray-100 hover:bg-[#3c3679] rounded-full flex items-center justify-center transition-colors group"
                              >
                                <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-white" />
                              </a>
                              <a
                                href={`mailto:${member.email}`}
                                className="w-8 h-8 bg-gray-100 hover:bg-[#3c3679] rounded-full flex items-center justify-center transition-colors group"
                              >
                                <Mail className="w-4 h-4 text-gray-600 group-hover:text-white" />
                              </a>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">{member.email}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Scroll Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                  {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gray-300 hover:bg-[#3c3679] transition-colors cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 px-4 sm:px-6 bg-[#d0efff]">
            <div className="max-w-7xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-[#3c3679] mb-2">240%</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">Company Growth</div>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing</p>
                  </CardContent>
                </Card>
                <Card className="bg-white p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-[#3c3679] mb-2">175+</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">Team Members</div>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing</p>
                  </CardContent>
                </Card>
                <Card className="bg-white p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-[#3c3679] mb-2">625+</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">Active Projects</div>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing</p>
                  </CardContent>
                </Card>
                <Card className="bg-white p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-[#3c3679] mb-2">99%</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">Customer Satisfaction</div>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Our Values</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Innovation</h3>
                  <p className="text-gray-600">
                    We constantly push the boundaries of what's possible with AI and automation to deliver cutting-edge
                    solutions.
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Partnership</h3>
                  <p className="text-gray-600">
                    We believe in building long-term relationships with our clients, becoming true partners in their
                    growth journey.
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#d0efff] rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Efficiency</h3>
                  <p className="text-gray-600">
                    We're obsessed with helping businesses save time and resources while achieving better results.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="px-4 sm:px-6 py-16 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Get In Touch</h2>
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
