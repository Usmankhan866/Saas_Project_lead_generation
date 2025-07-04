"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer, useToast } from "@/components/toast"
import { CreditCard, Check, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PaymentPlan {
  id: string
  name: string
  credits: number
  price: number
  popular?: boolean
  features: string[]
}

const paymentPlans: PaymentPlan[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 1000,
    price: 19.99,
    features: ["1,000 Credits", "Google Business Search", "Basic Support", "CSV Export"],
  },
  {
    id: "professional",
    name: "Professional",
    credits: 5000,
    price: 79.99,
    popular: true,
    features: ["5,000 Credits", "All Search Types", "Priority Support", "Advanced Export", "API Access"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 15000,
    price: 199.99,
    features: ["15,000 Credits", "Unlimited Searches", "24/7 Support", "Custom Integration", "Dedicated Manager"],
  },
]

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const { toasts, addToast, removeToast } = useToast()
  const router = useRouter()

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    const email = localStorage.getItem("userEmail") || "alexarawles@gmail.com"
    const name = localStorage.getItem("userName") || "Alexa Rawles"
    setUserEmail(email)
    setUserName(name)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPaymentForm((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentForm.cardNumber || paymentForm.cardNumber.length < 16) {
      newErrors.cardNumber = "Please enter a valid card number"
    }

    if (!paymentForm.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
      newErrors.expiryDate = "Please enter expiry date in MM/YY format"
    }

    if (!paymentForm.cvv || paymentForm.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    if (!paymentForm.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
    }

    if (!paymentForm.billingAddress.trim()) {
      newErrors.billingAddress = "Billing address is required"
    }

    if (!paymentForm.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!paymentForm.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    }

    if (!paymentForm.country.trim()) {
      newErrors.country = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSelectPlan = (plan: PaymentPlan) => {
    setSelectedPlan(plan)
    setShowPaymentForm(true)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePaymentForm() || !selectedPlan) {
      addToast({
        type: "error",
        title: "Validation Error",
        message: "Please fix the errors below",
      })
      return
    }

    setIsProcessing(true)

    try {
      const token = localStorage.getItem("authToken")

      // Step 1: Create payment intent
      const paymentIntentResponse = await fetch("/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Math.round(selectedPlan.price * 100), // Convert to cents
          currency: "usd",
          paymentType: "credits",
        }),
      })

      const paymentIntentResult = await paymentIntentResponse.json()

      if (!paymentIntentResult.success) {
        throw new Error(paymentIntentResult.message)
      }

      // Step 2: Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 3: Confirm payment
      const confirmResponse = await fetch("/api/payments/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentResult.data.id,
          paymentMethodId: `pm_${Math.random().toString(36).substr(2, 9)}`,
          billingDetails: {
            name: paymentForm.cardholderName,
            address: {
              line1: paymentForm.billingAddress,
              city: paymentForm.city,
              state: paymentForm.state,
              postal_code: paymentForm.zipCode,
              country: paymentForm.country,
            },
          },
        }),
      })

      const confirmResult = await confirmResponse.json()

      if (confirmResult.success) {
        // Store payment data in localStorage (temporary)
        const paymentData = {
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          credits: selectedPlan.credits,
          amount: selectedPlan.price,
          paymentId: confirmResult.data.id,
          date: new Date().toISOString(),
        }

        const existingPayments = JSON.parse(localStorage.getItem("payments") || "[]")
        existingPayments.push(paymentData)
        localStorage.setItem("payments", JSON.stringify(existingPayments))

        // Update user credits
        const currentCredits = Number.parseInt(localStorage.getItem("userCredits") || "1250")
        const newCredits = currentCredits + selectedPlan.credits
        localStorage.setItem("userCredits", newCredits.toString())

        addToast({
          type: "success",
          title: "Payment Successful",
          message: `${selectedPlan.credits} credits have been added to your account!`,
        })

        // Reset form and redirect
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        throw new Error(confirmResult.message)
      }
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Payment Failed",
        message: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <Image src="/images/growvy-logo.png" alt="Growvy Logo" width={120} height={40} className="h-8 w-auto" />
          </div>

          <div className="flex items-center space-x-3">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
              alt={userName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{userName}</div>
              <div className="text-gray-500">{userEmail}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {!showPaymentForm ? (
            <>
              {/* Pricing Plans */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Select the perfect plan for your business needs. All plans include access to our powerful search
                  tools.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {paymentPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative ${plan.popular ? "border-[#3c3679] border-2" : "border-gray-200"}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-[#3c3679] text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-[#3c3679] mb-1">${plan.price}</div>
                        <div className="text-gray-600">{plan.credits.toLocaleString()} credits</div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleSelectPlan(plan)}
                        className={`w-full py-3 ${
                          plan.popular
                            ? "bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        }`}
                      >
                        Select Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Payment Form */}
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Purchase</h1>
                  <div className="bg-[#d0efff] p-4 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedPlan?.name} Plan - ${selectedPlan?.price}
                    </div>
                    <div className="text-gray-600">{selectedPlan?.credits.toLocaleString()} credits</div>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-8">
                    <form onSubmit={handlePayment} className="space-y-6">
                      {/* Card Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Card Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formatCardNumber(paymentForm.cardNumber)}
                              onChange={(e) =>
                                setPaymentForm({ ...paymentForm, cardNumber: e.target.value.replace(/\s/g, "") })
                              }
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                errors.cardNumber ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formatExpiryDate(paymentForm.expiryDate)}
                                onChange={(e) =>
                                  setPaymentForm({ ...paymentForm, expiryDate: e.target.value.replace(/[^0-9]/g, "") })
                                }
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                              {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                              <input
                                type="text"
                                name="cvv"
                                value={paymentForm.cvv}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                  errors.cvv ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="123"
                                maxLength={4}
                              />
                              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              name="cardholderName"
                              value={paymentForm.cardholderName}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                errors.cardholderName ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="John Doe"
                            />
                            {errors.cardholderName && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <input
                              type="text"
                              name="billingAddress"
                              value={paymentForm.billingAddress}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                errors.billingAddress ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="123 Main Street"
                            />
                            {errors.billingAddress && (
                              <p className="mt-1 text-sm text-red-600">{errors.billingAddress}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                              <input
                                type="text"
                                name="city"
                                value={paymentForm.city}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                  errors.city ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="New York"
                              />
                              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                              <input
                                type="text"
                                name="state"
                                value={paymentForm.state}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                                placeholder="NY"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                              <input
                                type="text"
                                name="zipCode"
                                value={paymentForm.zipCode}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                  errors.zipCode ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="10001"
                              />
                              {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                              <select
                                name="country"
                                value={paymentForm.country}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none ${
                                  errors.country ? "border-red-500" : "border-gray-300"
                                }`}
                              >
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="GB">United Kingdom</option>
                                <option value="AU">Australia</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                              </select>
                              {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowPaymentForm(false)}
                          className="flex-1 bg-transparent"
                          disabled={isProcessing}
                        >
                          Back to Plans
                        </Button>
                        <Button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                        >
                          {isProcessing ? "Processing..." : `Pay $${selectedPlan?.price}`}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
