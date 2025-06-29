"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, TrendingUp, Users, Target, Zap } from "lucide-react"
import AuthHeader from "@/components/AuthHeader"
import Image from "next/image"
import { useState } from "react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPost = {
    title: "The Ultimate Guide to B2B Lead Generation in 2024",
    excerpt:
      "Discover the latest strategies, tools, and techniques that top-performing sales teams use to generate high-quality leads and drive revenue growth.",
    author: "Sarah Johnson",
    date: "January 15, 2024",
    readTime: "12 min read",
    category: "Lead Generation",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
    slug: "ultimate-guide-b2b-lead-generation-2024",
  }

  const blogPosts = [
    {
      title: "How AI is Revolutionizing Sales Prospecting",
      excerpt:
        "Explore how artificial intelligence is transforming the way sales teams identify, qualify, and engage with potential customers.",
      author: "Michael Chen",
      date: "January 12, 2024",
      readTime: "8 min read",
      category: "AI & Technology",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      slug: "ai-revolutionizing-sales-prospecting",
    },
    {
      title: "5 Common Lead Generation Mistakes to Avoid",
      excerpt:
        "Learn about the most frequent pitfalls in lead generation and how to avoid them to maximize your conversion rates.",
      author: "Emily Rodriguez",
      date: "January 10, 2024",
      readTime: "6 min read",
      category: "Best Practices",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      slug: "common-lead-generation-mistakes",
    },
    {
      title: "Building a High-Converting Landing Page",
      excerpt:
        "Step-by-step guide to creating landing pages that convert visitors into qualified leads for your business.",
      author: "David Kim",
      date: "January 8, 2024",
      readTime: "10 min read",
      category: "Conversion Optimization",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      slug: "building-high-converting-landing-page",
    },
    {
      title: "The Psychology of B2B Buying Decisions",
      excerpt:
        "Understanding the psychological factors that influence B2B purchasing decisions and how to leverage them in your sales process.",
      author: "Sarah Johnson",
      date: "January 5, 2024",
      readTime: "9 min read",
      category: "Sales Psychology",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      slug: "psychology-b2b-buying-decisions",
    },
    {
      title: "Email Outreach That Actually Gets Responses",
      excerpt:
        "Proven templates and strategies for crafting cold emails that prospects actually want to read and respond to.",
      author: "Michael Chen",
      date: "January 3, 2024",
      readTime: "7 min read",
      category: "Email Marketing",
      image:
        "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      slug: "email-outreach-gets-responses",
    },
    {
      title: "Data-Driven Sales: Using Analytics to Close More Deals",
      excerpt: "How to leverage data and analytics to optimize your sales process and improve your closing rates.",
      author: "Emily Rodriguez",
      date: "December 28, 2023",
      readTime: "11 min read",
      category: "Sales Analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      slug: "data-driven-sales-analytics",
    },
  ]

  const categories = [
    { name: "Lead Generation", count: 15, icon: <Target className="h-4 w-4" /> },
    { name: "Sales Strategy", count: 12, icon: <TrendingUp className="h-4 w-4" /> },
    { name: "AI & Technology", count: 8, icon: <Zap className="h-4 w-4" /> },
    { name: "Best Practices", count: 10, icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="blog" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Growvy Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Insights, strategies, and tips to help you master lead generation and grow your business.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <Card className="mb-12 overflow-hidden">
              <div className="relative">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-[#3c3679] text-white">Featured</Badge>
              </div>
              <CardContent className="p-8">
                <Badge variant="outline" className="mb-4">
                  {featuredPost.category}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f]">Read More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        {category.icon}
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get the latest insights delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Enter your email" />
                  <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f]">Subscribe</Button>
                  <p className="text-xs text-gray-500">No spam. Unsubscribe at any time.</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex space-x-3">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{post.title}</h4>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
