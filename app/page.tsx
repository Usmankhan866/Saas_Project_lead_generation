import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Star, Users, Target, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Grow Your Business with
                  <span className="text-blue-600"> Smart Data</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover qualified leads, analyze market trends, and accelerate your business growth with our
                  comprehensive business intelligence platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
                    Schedule Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Free 14-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  No credit card required
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/main-hero-new.png"
                alt="Business Growth Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to grow your business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need to identify opportunities, connect
              with prospects, and drive sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lead Generation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find and connect with qualified prospects using our advanced search and filtering capabilities. Build
                  targeted lists of potential customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get deep insights into market trends, competitor analysis, and industry opportunities to make informed
                  business decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your performance, measure ROI, and optimize your strategies with comprehensive analytics and
                  reporting tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
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
                  className="mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600">
                Use our powerful search tools to find businesses and contacts that match your ideal customer profile.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-2-new.png"
                  alt="Analyze and Filter"
                  width={300}
                  height={200}
                  className="mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analyze & Filter</h3>
              <p className="text-gray-600">
                Apply advanced filters and analyze data to identify the most promising opportunities for your business.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <Image
                  src="/images/how-it-work-3.svg"
                  alt="Connect and Grow"
                  width={300}
                  height={200}
                  className="mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect & Grow</h3>
              <p className="text-gray-600">
                Export your leads, integrate with your CRM, and start building meaningful relationships that drive
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by thousands of businesses</h2>
            <p className="text-xl text-gray-600">See what our customers have to say about their success with Growvy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Growvy has transformed how we find and connect with potential clients. Our lead generation has
                  increased by 300% since we started using the platform."
                </p>
                <div className="flex items-center">
                  <Image
                    src="/images/testimonial-design.png"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">CEO, TechStart Inc.</div>
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
                <p className="text-gray-600 mb-6 italic">
                  "The market intelligence features are incredible. We now make data-driven decisions that have
                  significantly improved our business strategy and ROI."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80"
                    alt="Michael Chen"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-sm text-gray-600">Marketing Director, GrowthCo</div>
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
                <p className="text-gray-600 mb-6 italic">
                  "Easy to use, powerful features, and excellent customer support. Growvy has become an essential tool
                  for our sales and marketing teams."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80"
                    alt="Emily Rodriguez"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                    <div className="text-sm text-gray-600">VP Sales, ScaleUp Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to accelerate your business growth?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses that trust Growvy to find their next customers and drive sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
