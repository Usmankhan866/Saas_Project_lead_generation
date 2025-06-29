"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Users, Building, Crown } from "lucide-react"
import AuthHeader from "@/components/AuthHeader"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "per month",
      description: "Perfect for individuals and small businesses getting started",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "100 lead searches per month",
        "Basic contact information",
        "Email support",
        "Standard data accuracy",
        "Export to CSV",
        "Basic analytics",
      ],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "Ideal for growing businesses and sales teams",
      icon: <Users className="h-6 w-6" />,
      features: [
        "500 lead searches per month",
        "Enhanced contact details",
        "Phone numbers & emails",
        "Priority support",
        "Advanced filtering",
        "CRM integrations",
        "Team collaboration",
        "Custom exports",
        "Detailed analytics",
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "per month",
      description: "For large organizations with advanced needs",
      icon: <Building className="h-6 w-6" />,
      features: [
        "2,000 lead searches per month",
        "Premium data enrichment",
        "Verified contact information",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced team management",
        "White-label options",
        "API access",
        "Custom reporting",
        "SLA guarantee",
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ]

  const features = [
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "High-Quality Data",
      description: "Access to verified and up-to-date business information",
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized search engine",
    },
    {
      icon: <Users className="h-5 w-5 text-green-500" />,
      title: "Team Collaboration",
      description: "Share leads and collaborate with your team members",
    },
    {
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      title: "Premium Support",
      description: "Get help when you need it with our expert support team",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="pricing" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-[#3c3679] shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#3c3679] text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${plan.popular ? "bg-[#3c3679] text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <CardDescription className="mt-4 text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "bg-[#3c3679] hover:bg-[#2d2a5f] text-white" : ""}`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Growvy?</h2>
            <p className="text-lg text-gray-600">Everything you need to supercharge your lead generation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white rounded-full shadow-sm">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens to unused credits?</h3>
              <p className="text-gray-600">
                Unused credits roll over to the next month for up to 3 months, giving you flexibility in your usage.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all new subscriptions. No questions asked.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes, we offer a 14-day free trial for the Professional plan with full access to all features.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#3c3679] text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using Growvy to find their perfect leads
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#3c3679] hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#3c3679] bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
