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
    } = await request.json()

    // Validate required fields
    if (!keywords) {
      return NextResponse.json(
        {
          success: false,
          message: "Keywords are required",
          errors: [{ field: "keywords", message: "Please provide search keywords" }],
        },
        { status: 400 },
      )
    }

    if (!limit || limit < 1 || limit > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "Limit must be between 1 and 1000",
          errors: [{ field: "limit", message: "Limit must be between 1 and 1000" }],
        },
        { status: 400 },
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock business data with enhanced filtering
    const businesses = Array.from({ length: Math.min(limit, 25) }, (_, i) => ({
      id: `business_${i + 1}`,
      name: `${keywords} Business ${i + 1}`,
      address: `${includeCities.length > 0 ? includeCities[i % includeCities.length] : "New York"}, ${countries.length > 0 ? countries[0] : "United States"}`,
      phone: `+1-555-${String(i + 1).padStart(3, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      website: `https://business${i + 1}.com`,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 10,
      category: industries.length > 0 ? industries[i % industries.length] : "Business Services",
      hours: "9:00 AM - 6:00 PM",
      description: `Professional ${keywords} services. ${includeDescriptionKeywords}`,
      selected: false,
    }))

    return NextResponse.json({
      success: true,
      message: `Found ${businesses.length} businesses matching your criteria`,
      data: {
        businesses,
        searchParams: {
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
        },
        totalFound: businesses.length,
      },
    })
  } catch (error) {
    console.error("Business search error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
