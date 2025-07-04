"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Pricing Hero Section */}
      <section className="bg-gradient-to-r from-[#3c3679] to-[#2d2a5f] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free and scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <Card className="bg-white border border-gray-200 p-6 relative h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$19</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>1.2k Credits/Year</option>
                  </select>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                  <p className="text-gray-600 text-sm mb-4">Unleash the power of automation.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Multi-step Zaps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">3 Premium Apps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">2 Users team</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white mt-auto">Choose plan</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan - MOST POPULAR (Middle) */}
            <Card className="bg-[#3c3679] text-white p-6 relative h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#2d2a5f] text-white px-4 py-1 rounded-full text-xs font-medium">MOST POPULAR</div>
              </div>
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-3xl font-bold">$89</span>
                    <span className="text-white/80 text-sm">/month</span>
                  </div>
                  <select className="w-full p-2 border border-white/20 rounded text-sm bg-transparent text-white">
                    <option className="text-gray-900">10.5k Credits/Year</option>
                  </select>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-white/80 text-sm mb-4">Automation plus enterprise-grade features.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Multi-step Zap</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Unlimited Premium</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Unlimited Users Team</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Advanced Admin</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Custom Data Retention</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-white text-[#3c3679] hover:bg-gray-100 mt-auto">Choose plan</Button>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card className="bg-white border border-gray-200 p-6 relative h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$54</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>3.5k Credits/Year</option>
                  </select>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
                  <p className="text-gray-600 text-sm mb-4">Advanced tools to take your work to the next level.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Multi-step Zaps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Unlimited Premium</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">50 Users team</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Shared Workspace</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white mt-auto">Choose plan</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 sm:px-6 ">
        <div className="max-w-6xl mx-auto ">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Feature comparison table</h2>
          <div className="bg-[#d0efff] rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-6 font-medium text-gray-900"></th>
                    <th className="text-center p-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Starter</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          $20 <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Enterprise</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          $200 <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Growth</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          $100 <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">All limited links</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Own analytics platform</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Chat support</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Number of users</td>
                    <td className="p-4 text-center text-gray-700">1 user</td>
                    <td className="p-4 text-center text-gray-700">Unlimited</td>
                    <td className="p-4 text-center text-gray-700">3 users</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Optimize hashtags</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Account manager</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">Number of articles</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Satisfaction guaranteed</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className=" flex justify-end   border-t border-gray-200 p-6">
              <div
                className="grid grid-cols-3 gap-4
               "
              >
                <div className="text-center">
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8">Choose plan</Button>
                </div>
                <div className="text-center">
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8">Choose plan</Button>
                </div>
                <div className="text-center">
                  <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8">Choose plan</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}

      {/* Footer */}
      <Footer />
    </div>
  )
}
