import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock lead data
const generateMockLeads = (query: string, location: string, industry?: string) => {
  const companies = [
    "TechCorp Solutions",
    "Digital Marketing Pro",
    "Green Energy Systems",
    "Healthcare Plus",
    "Finance First",
    "Retail Revolution",
    "Food & Beverage Co",
    "Construction Kings",
    "Education Excellence",
    "Travel Adventures",
  ]

  const industries = [
    "Technology",
    "Marketing",
    "Energy",
    "Healthcare",
    "Finance",
    "Retail",
    "Food",
    "Construction",
    "Education",
    "Travel",
  ]
  const locations = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Chicago, IL"]

  return Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
    id: `lead-${Date.now()}-${i}`,
    name: companies[Math.floor(Math.random() * companies.length)],
    email: `contact@${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(/\s+/g, "")}.com`,
    phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    website: `${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(/\s+/g, "")}.com`,
    location: locations[Math.floor(Math.random() * locations.length)],
    industry: industry || industries[Math.floor(Math.random() * industries.length)],
    employees: ["1-10", "11-50", "51-200", "201-500", "500+"][Math.floor(Math.random() * 5)],
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    description: `Leading ${industry || "business"} company specializing in ${query}`,
    source: "google" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Authorization token required" }, { status: 401 })
    }

    // Verify JWT token
    jwt.verify(token, JWT_SECRET)

    const { query, location, industry, limit = 10 } = await request.json()

    if (!query || !location) {
      return NextResponse.json({ message: "Query and location are required" }, { status: 400 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const leads = generateMockLeads(query, location, industry).slice(0, limit)

    return NextResponse.json({
      leads,
      total: leads.length,
      query,
      location,
      industry,
    })
  } catch (error) {
    console.error("Search leads error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
