"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HelpPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const helpArticles = [
    {
      title: "Getting Started",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Basics",
    },
    {
      title: "Prompt Writing Guide",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Advanced",
    },
    {
      title: "Lead Generation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Features",
    },
    {
      title: "Data Analytics",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Analytics",
    },
    {
      title: "Team Collaboration",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Collaboration",
    },
    {
      title: "Account Management",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Account",
    },
  ]

  const faqs = [
    {
      question: "How do I get started with Growvy's lead generation tools?",
      answer:
        "Getting started with Growvy is simple. First, sign up for an account and choose your plan. Then, define your target audience using our advanced filtering options. Our AI will automatically start identifying and qualifying prospects that match your ideal customer profile. You can begin outreach immediately with our personalized messaging tools.",
    },
    {
      question: "What types of data can I extract using the website scraping feature?",
      answer:
        "Our website scraping tool can extract various types of business data including contact information, company details, social media profiles, business descriptions, location data, and more. The tool handles JavaScript-rendered sites and dynamic content while maintaining GDPR compliance and data accuracy.",
    },
    {
      question: "How accurate is the AI-powered research and personalization?",
      answer:
        "Our AI research engine maintains over 95% accuracy by cross-referencing multiple premium databases and using advanced pattern recognition. The personalization feature analyzes individual communication styles, industry trends, and behavioral patterns to create highly relevant, contextual messages that significantly improve response rates.",
    },
    {
      question: "Can I integrate Growvy with my existing CRM system?",
      answer:
        "Yes, Growvy integrates seamlessly with popular CRM systems including Salesforce, HubSpot, Pipedrive, and many others. Our integration allows for automatic data synchronization, lead scoring updates, and workflow automation to streamline your sales process.",
    },
    {
      question: "What support options are available if I need help?",
      answer:
        "We offer comprehensive support including 24/7 chat support, email assistance, video tutorials, detailed documentation, and for Enterprise customers, dedicated account managers. Our support team is trained to help with both technical issues and strategic guidance for maximizing your results.",
    },
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600">Find answers to common questions and get support</p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#3c3679] text-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="mb-4">Can't find what you're looking for? Our support team is here to help.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:support@growvy.com"
                  className="bg-white text-[#3c3679] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center"
                >
                  Email Support
                </a>
                <a
                  href="#"
                  className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-[#3c3679] transition-colors text-center"
                >
                  Live Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
