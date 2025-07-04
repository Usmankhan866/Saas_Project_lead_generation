"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, ArrowRight, Users, Building, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#3c3679] to-[#2d2a5f] text-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Grow Your Business with
                <span className="block text-[#d0efff]">Smart Data Solutions</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-lg">
                Access millions of business listings and contact information to fuel your growth. Get the data you need
                to reach your ideal customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push("/signup")}
                  size="lg"
                  className="bg-white text-[#3c3679] hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={() => router.push("/pricing")}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#3c3679] font-semibold px-8 py-4 text-lg bg-transparent"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/main-hero-new.png"
                alt="Business Growth Illustration"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and data you need to identify, connect, and convert your
              ideal prospects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#3c3679] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Search</h3>
                <p className="text-gray-600">
                  Find exactly what you're looking for with our advanced search algorithms and comprehensive database.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#3c3679] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Intelligence</h3>
                <p className="text-gray-600">
                  Access detailed business information including contact details, reviews, and operational data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#3c3679] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">People Discovery</h3>
                <p className="text-gray-600">
                  Connect with key decision makers and build your professional network with accurate contact
                  information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-1-new.png"
                  alt="Search and Discover"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600">
                Use our powerful search tools to find businesses and people that match your criteria.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-2-new.png"
                  alt="Filter and Refine"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Filter & Refine</h3>
              <p className="text-gray-600">
                Narrow down your results with advanced filters to find exactly what you need.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-3.svg"
                  alt="Export and Connect"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#3c3679] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Export & Connect</h3>
              <p className="text-gray-600">
                Export your data and start connecting with your prospects to grow your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers who trust Growvy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Growvy has transformed how we find and connect with potential clients. The data quality is
                  exceptional and the platform is incredibly easy to use."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="John Smith"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">John Smith</div>
                    <div className="text-gray-600 text-sm">Sales Director, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The ROI we've seen since using Growvy is incredible. We've increased our lead generation by 300% in
                  just three months."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Sarah Johnson"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-gray-600 text-sm">Marketing Manager, GrowthCo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Finally, a platform that delivers accurate, up-to-date business information. Growvy has become an
                  essential tool for our sales team."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Mike Davis"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Mike Davis</div>
                    <div className="text-gray-600 text-sm">CEO, StartupXYZ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3c3679] text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Growvy to find and connect with their ideal customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/signup")}
              size="lg"
              className="bg-white text-[#3c3679] hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => router.push("/contact")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#3c3679] font-semibold px-8 py-4 text-lg bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
