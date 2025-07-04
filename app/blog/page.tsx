"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Instagram, Linkedin, Facebook, X, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState(9)

  const featuredPost = {
    title: "Collaboration to Develop Coffee and Beverage Industry Expertise in Indonesia",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
    readTime: "4 Min",
    date: "August 19, 2022",
    category: "Industry Insights",
    excerpt:
      "Exploring how AI-powered solutions are revolutionizing the coffee and beverage industry through strategic partnerships and innovative approaches to market development.",
    slug: "coffee-industry-collaboration",
  }

  const blogPosts = [
    {
      title: "Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS Marketing Managers",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Artificial Intelligence",
      date: "Oct 18",
      readTime: "10 min read",
      excerpt:
        "Learn how to leverage AI tools while maintaining your unique voice and perspective in content creation.",
      slug: "mastering-chatgpt-blog-creation",
    },
    {
      title: "The Future of Lead Generation with Machine Learning",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Artificial Intelligence",
      date: "Oct 15",
      readTime: "8 min read",
      excerpt:
        "Discover how machine learning algorithms are transforming the way businesses identify and qualify potential customers.",
      slug: "ai-powered-research",
    },
    {
      title: "Automating Customer Outreach: Best Practices and Tools",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Automation",
      date: "Oct 12",
      readTime: "12 min read",
      excerpt:
        "A comprehensive guide to automating your customer outreach while maintaining personalization and authenticity.",
      slug: "automating-customer-outreach",
    },
    {
      title: "Data Privacy in AI-Powered Business Solutions",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Data Privacy",
      date: "Oct 10",
      readTime: "7 min read",
      excerpt: "Understanding GDPR compliance and data protection in modern AI-driven business applications.",
      slug: "data-privacy-ai-solutions",
    },
    {
      title: "Building Effective Sales Funnels with AI Analytics",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Sales Strategy",
      date: "Oct 8",
      readTime: "9 min read",
      excerpt: "How to use AI analytics to optimize your sales funnel and improve conversion rates at every stage.",
      slug: "ai-sales-funnels",
    },
    {
      title: "The Role of Natural Language Processing in Customer Service",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Customer Service",
      date: "Oct 5",
      readTime: "11 min read",
      excerpt: "Exploring how NLP technologies are revolutionizing customer support and communication.",
      slug: "nlp-customer-service",
    },
    {
      title: "Scaling Your Business with Intelligent Automation",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Business Growth",
      date: "Oct 3",
      readTime: "6 min read",
      excerpt:
        "Learn how intelligent automation can help your business scale efficiently while reducing operational costs.",
      slug: "intelligent-automation-scaling",
    },
    {
      title: "Predictive Analytics for Market Research and Insights",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Market Research",
      date: "Sep 30",
      readTime: "13 min read",
      excerpt:
        "Harness the power of predictive analytics to gain deeper market insights and make data-driven decisions.",
      slug: "predictive-analytics-market-research",
    },
    {
      title: "Ethical AI: Responsible Implementation in Business",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Ethics",
      date: "Sep 28",
      readTime: "10 min read",
      excerpt:
        "A guide to implementing AI solutions responsibly while considering ethical implications and societal impact.",
      slug: "ethical-ai-implementation",
    },
    {
      title: "Integrating AI Tools into Your Existing Workflow",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Workflow Optimization",
      date: "Sep 25",
      readTime: "8 min read",
      excerpt: "Step-by-step guide to seamlessly integrate AI tools into your current business processes.",
      slug: "ai-workflow-integration",
    },
    {
      title: "The Economics of AI: ROI and Cost-Benefit Analysis",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Business Economics",
      date: "Sep 22",
      readTime: "14 min read",
      excerpt: "Understanding the financial implications and return on investment when implementing AI solutions.",
      slug: "ai-economics-roi",
    },
    {
      title: "Voice Technology and Conversational AI in Business",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Voice Technology",
      date: "Sep 20",
      readTime: "9 min read",
      excerpt: "Exploring the potential of voice technology and conversational AI in modern business applications.",
      slug: "voice-technology-business",
    },
  ]

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, blogPosts.length))
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Artificial Intelligence": "bg-blue-100 text-blue-800",
      Automation: "bg-green-100 text-green-800",
      "Data Privacy": "bg-red-100 text-red-800",
      "Sales Strategy": "bg-purple-100 text-purple-800",
      "Customer Service": "bg-yellow-100 text-yellow-800",
      "Business Growth": "bg-indigo-100 text-indigo-800",
      "Market Research": "bg-pink-100 text-pink-800",
      Ethics: "bg-gray-100 text-gray-800",
      "Workflow Optimization": "bg-orange-100 text-orange-800",
      "Business Economics": "bg-teal-100 text-teal-800",
      "Voice Technology": "bg-cyan-100 text-cyan-800",
      "Industry Insights": "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
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
            <a
              href="/help"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Help
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
            >
              Contact
            </a>
            <a href="#" className="text-[#3c3679] underline font-medium transition-all duration-200">
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
              <a
                href="/help"
                className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
              >
                Help
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-[#3c3679] hover:underline font-medium transition-all duration-200"
              >
                Contact
              </a>
              <a href="#" className="text-[#3c3679] underline font-medium transition-all duration-200">
                Blog
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Blog Hero Section */}
      <section className="bg-[#3c3679] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Blogs</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in AI-powered business solutions
          </p>
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#3c3679] text-white px-3 py-1 rounded-full text-xs font-medium">Featured</span>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredPost.category)}`}
                    >
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{featuredPost.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{featuredPost.excerpt}</p>
                  <Button asChild className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white w-fit">
                    <a href={`/blog/${featuredPost.slug}`}>Read More</a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, visiblePosts).map((post, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <a href={`/blog/${post.slug}`} className="block">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight hover:text-[#3c3679] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < blogPosts.length && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMorePosts}
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white px-8 py-3"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 px-4 sm:px-6 bg-[#d0efff]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest insights on AI, automation, and business growth delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
            />
            <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-6 py-3">Subscribe</Button>
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
