"use client"
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
              className="text-gray-\
