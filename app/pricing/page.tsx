import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses and startups",
    features: [
      { name: "500 searches per month", included: true },
      { name: "Basic filtering options", included: true },
      { name: "CSV export", included: true },
      { name: "Email support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "API access", included: false },
      { name: "Custom workflows", included: false },
      { name: "Priority support", included: false },
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "Ideal for growing businesses and sales teams",
    features: [
      { name: "2,500 searches per month", included: true },
      { name: "Advanced filtering options", included: true },
      { name: "Multiple export formats", included: true },
      { name: "Priority email support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Basic API access", included: true },
      { name: "Custom workflows", included: false },
      { name: "Phone support", included: false },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations with advanced needs",
    features: [
      { name: "10,000 searches per month", included: true },
      { name: "All filtering options", included: true },
      { name: "All export formats", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Full API access", included: true },
      { name: "Custom workflows", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white border-2 relative ${
                  plan.popular ? "border-[#3c3679] shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#3c3679] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                        : "border border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I exceed my search limit?</h3>
                <p className="text-gray-600">
                  You can purchase additional searches or upgrade to a higher plan. We'll notify you when you're
                  approaching your limit.
                </p>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer custom enterprise solutions?</h3>
                <p className="text-gray-600">
                  Yes, we offer custom solutions for large enterprises with specific requirements. Contact our sales
                  team for more information.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-6">
              Contact our sales team to discuss custom pricing and features for your specific needs.
            </p>
            <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">Contact Sales</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
