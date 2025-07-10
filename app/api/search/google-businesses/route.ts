import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const {
      keywords,
      countries,
      includeCities,
      excludeCities,
      industries,
      excludeIndustries,
      companySizes,
      companyTypes,
      includeDescriptionKeywords,
      excludeDescriptionKeywords,
      minFollowerCount,
      limit,
    } = body

    // Validate required fields
    if (!keywords) {
      return NextResponse.json({ success: false, message: "Keywords are required" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock business data based on search criteria
    const mockBusinesses = Array.from({ length: Math.min(limit || 10, 20) }, (_, index) => ({
      id: `business_${Math.random().toString(36).substring(2, 15)}`,
      name: `${keywords.charAt(0).toUpperCase() + keywords.slice(1)} Business ${index + 1}`,
      address: `${123 + index} Main Street, ${includeCities?.[0] || "San Francisco"}, CA 94105`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      website: `https://business${index + 1}.com`,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 50,
      category: industries?.[0] || "Business Services",
      hours: "Mon-Fri 9AM-6PM",
      description: `Professional ${keywords} services in ${includeCities?.[0] || "San Francisco"}. ${includeDescriptionKeywords || "Quality service"} provider.`,
      selected: false,
    }))

    console.log("Google business search:", {
      userId: decoded.userId,
      searchParams: body,
      resultCount: mockBusinesses.length,
    })

    return NextResponse.json({
      success: true,
      message: `Found ${mockBusinesses.length} businesses matching your criteria`,
      data: {
        businesses: mockBusinesses,
        searchParams: body,
        totalResults: mockBusinesses.length,
      },
    })
  } catch (error) {
    console.error("Google business search error:", error)
    return NextResponse.json({ success: false, message: "Search failed. Please try again." }, { status: 500 })
  }
}
