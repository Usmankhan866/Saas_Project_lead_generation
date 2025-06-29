import AuthHeader from "@/components/AuthHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="pricing" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f8faff] to-[#e8f4ff] px-4 sm:px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 py-2 text-sm font-medium mb-6">
            💰 Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-[#3c3679]">Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. No hidden fees, no long-term contracts.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for small businesses getting started",
                features: [
                  "Up to 500 leads per month",
                  "Basic lead scoring",
                  "Email support",
                  "CRM integration",
                  "Basic analytics",
                ],
                popular: false,
                cta: "Start Free Trial",
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                description: "Ideal for growing businesses",
                features: [
                  "Up to 2,000 leads per month",
                  "Advanced lead scoring",
                  "Priority support",
                  "Advanced CRM integration",
                  "Detailed analytics",
                  "AI personalization",
                  "Custom filters",
                ],
                popular: true,
                cta: "Start Free Trial",
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                description: "For large organizations with complex needs",
                features: [
                  "Unlimited leads",
                  "Custom AI models",
                  "Dedicated support",
                  "White-label options",
                  "Advanced integrations",
                  "Custom reporting",
                  "API access",
                  "Team collaboration",
                ],
                popular: false,
                cta: "Contact Sales",
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-[#3c3679] border-2" : "border-gray-200"} shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#3c3679] text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#3c3679] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-[#3c3679] hover:bg-[#2d2a5f] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing and plans</p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Can I change my plan at any time?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to get started.",
              },
              {
                question: "What happens if I exceed my lead limit?",
                answer:
                  "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional leads as needed.",
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer:
                  "Yes, we work with enterprise clients to create custom solutions that meet their specific needs. Contact our sales team for more information.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3c3679]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Growvy to transform their lead generation.
          </p>
          <Button className="bg-white text-[#3c3679] hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
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
