import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const { name, company, location, jobTitle, quantity } = await request.json()

    // Validate input - at least one field is required
    if (!name && !company && !location && !jobTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one search field is required",
          errors: [{ field: "general", message: "Please provide at least one search criteria" }],
        },
        { status: 400 },
      )
    }

    if (!quantity || quantity < 1 || quantity > 500) {
      return NextResponse.json(
        {
          success: false,
          message: "Quantity must be between 1 and 500",
          errors: [{ field: "quantity", message: "Quantity must be between 1 and 500" }],
        },
        { status: 400 },
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock people data
    const people = Array.from({ length: Math.min(quantity, 30) }, (_, i) => ({
      id: `person_${i + 1}`,
      name:
        name ||
        `${["John", "Jane", "Mike", "Sarah", "David", "Lisa"][i % 6]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"][i % 6]}`,
      jobTitle:
        jobTitle ||
        ["Software Engineer", "Marketing Manager", "Sales Director", "Product Manager", "Designer", "Analyst"][i % 6],
      company:
        company ||
        ["Tech Corp", "Innovation Inc", "Digital Solutions", "Future Systems", "Smart Tech", "Global Dynamics"][i % 6],
      location:
        location ||
        ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA", "Chicago, IL"][i % 6],
      email: `person${i + 1}@example.com`,
      linkedin: `https://linkedin.com/in/person${i + 1}`,
      phone: `+1-555-${String(i + 1).padStart(3, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      experience: `${Math.floor(Math.random() * 15) + 1} years`,
      industry: ["Technology", "Marketing", "Sales", "Finance", "Healthcare", "Education"][i % 6],
      selected: false,
    }))

    return NextResponse.json({
      success: true,
      message: `Found ${people.length} people`,
      data: {
        people,
        searchParams: { name, company, location, jobTitle, quantity },
        totalFound: people.length,
      },
    })
  } catch (error) {
    console.error("People search error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
