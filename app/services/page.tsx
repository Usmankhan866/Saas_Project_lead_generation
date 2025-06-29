import AuthHeader from "@/components/AuthHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Zap, Target, Users, BarChart3, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <AuthHeader currentPage="services" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f8faff] to-[#e8f4ff] px-4 sm:px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-[#d0efff] text-[#3c3679] hover:bg-[#b8e6ff] px-4 py-2 text-sm font-medium mb-6">
            🎯 Complete Lead Generation Suite
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#3c3679]">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive AI-powered solutions to help you find, connect, and convert your ideal customers
          </p>
          <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white px-8 py-4 text-lg font-semibold">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Target,
                title: "Lead Generation Automation",
                description:
                  "Discover relevant, high-intent leads based on industry, location, and custom filters you choose.",
                features: [
                  "AI-powered prospect identification",
                  "Advanced filtering options",
                  "Real-time lead scoring",
                  "Automated lead qualification",
                ],
                image: "/images/how-it-work-1-new.png",
              },
              {
                icon: Zap,
                title: "Website Scrapping",
                description:
                  "Extract valuable data from websites automatically with our intelligent scraping technology.",
                features: [
                  "Automated data extraction",
                  "Real-time website monitoring",
                  "Custom scraping rules",
                  "Data validation & cleaning",
                ],
                image: "/images/how-it-work-2-new.png",
              },
              {
                icon: BarChart3,
                title: "AI Powered Research",
                description:
                  "Leverage artificial intelligence to conduct comprehensive market research and competitor analysis.",
                features: [
                  "Market trend analysis",
                  "Competitor intelligence",
                  "Industry insights",
                  "Predictive analytics",
                ],
                image: "/images/how-it-work-3.svg",
              },
              {
                icon: Users,
                title: "Data Enrichment",
                description: "Enhance your existing customer data with additional insights and contact information.",
                features: [
                  "Contact information enrichment",
                  "Company data enhancement",
                  "Social media profiles",
                  "Behavioral insights",
                ],
                image: "/images/mobile-solution.png",
              },
            ].map((service, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#f0f7ff] rounded-lg">
                      <service.icon className="w-6 h-6 text-[#3c3679]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#3c3679] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete your lead generation toolkit with these powerful add-on services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI Personalization",
                description:
                  "Create personalized experiences and messages using advanced AI technology to increase engagement and conversion rates.",
                features: [
                  "Personalized email campaigns",
                  "Dynamic content generation",
                  "Behavioral targeting",
                  "A/B testing optimization",
                ],
              },
              {
                title: "Verified Emails & Phone Numbers",
                description:
                  "Get accurate, up-to-date contact information for your leads with our real-time verification system.",
                features: [
                  "Email verification",
                  "Phone number validation",
                  "Real-time updates",
                  "Bounce rate reduction",
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#3c3679] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we deliver exceptional results for your business
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We analyze your business goals and target audience to create a customized strategy.",
              },
              {
                step: "02",
                title: "Setup",
                description: "Our team configures the AI systems and integrates with your existing tools.",
              },
              {
                step: "03",
                title: "Execution",
                description: "We launch your campaigns and begin generating high-quality leads for your business.",
              },
              {
                step: "04",
                title: "Optimization",
                description: "Continuous monitoring and optimization to improve performance and ROI.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#3c3679] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
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
            Let's discuss how our services can help you achieve your lead generation goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#3c3679] hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#3c3679] px-8 py-4 text-lg font-semibold bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
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
