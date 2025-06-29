"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  HelpCircle,
  Zap,
  Users,
  CreditCard,
  Settings,
} from "lucide-react"
import AuthHeader from "@/components/AuthHeader"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn the basics of using Growvy",
      articles: 12,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Lead Generation",
      description: "Master the art of finding quality leads",
      articles: 18,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Billing & Plans",
      description: "Manage your subscription and billing",
      articles: 8,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Account Settings",
      description: "Customize your account preferences",
      articles: 15,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const popularArticles = [
    {
      title: "How to create your first lead search",
      category: "Getting Started",
      readTime: "3 min read",
      views: "2.1k views",
    },
    {
      title: "Understanding search filters and criteria",
      category: "Lead Generation",
      readTime: "5 min read",
      views: "1.8k views",
    },
    {
      title: "Exporting leads to your CRM",
      category: "Integrations",
      readTime: "4 min read",
      views: "1.5k views",
    },
    {
      title: "Managing your credit usage",
      category: "Billing & Plans",
      readTime: "2 min read",
      views: "1.2k views",
    },
  ]

  const faqs = [
    {
      question: "How accurate is the lead data?",
      answer:
        "Our lead data is sourced from multiple verified databases and is updated regularly. We maintain an accuracy rate of over 95% for contact information and business details.",
    },
    {
      question: "Can I integrate Growvy with my existing CRM?",
      answer:
        "Yes! Growvy integrates with popular CRMs including Salesforce, HubSpot, Pipedrive, and many others. You can also export data in various formats like CSV, Excel, and JSON.",
    },
    {
      question: "What happens if I exceed my monthly credit limit?",
      answer:
        "If you exceed your monthly credit limit, you can purchase additional credits or upgrade to a higher plan. Your account won't be suspended, but you'll need more credits to continue searching.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial for new users with 50 free credits to test our platform. No credit card required to start your trial.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="help" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to your questions, learn how to use Growvy effectively, or get in touch with our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <BookOpen className="h-12 w-12 text-[#3c3679] mx-auto mb-4" />
              <CardTitle className="mb-2">Browse Articles</CardTitle>
              <CardDescription>Explore our comprehensive knowledge base</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <MessageCircle className="h-12 w-12 text-[#3c3679] mx-auto mb-4" />
              <CardTitle className="mb-2">Contact Support</CardTitle>
              <CardDescription>Get help from our expert support team</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Video className="h-12 w-12 text-[#3c3679] mx-auto mb-4" />
              <CardTitle className="mb-2">Video Tutorials</CardTitle>
              <CardDescription>Watch step-by-step video guides</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{category.articles} articles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">{article.category}</Badge>
                        <span>{article.readTime}</span>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <FileText className="h-6 w-6 text-gray-400 ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <HelpCircle className="h-16 w-16 text-[#3c3679] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you get the most out of Growvy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#3c3679] hover:bg-[#2d2a5f]">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
            <Button size="lg" variant="outline">
              <Video className="mr-2 h-5 w-5" />
              Schedule a Demo
            </Button>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>Average response time: 2 hours</p>
            <p>Support available: Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
        </div>
      </div>
    </div>
  )
}
