import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { validateRequired } from "@/lib/validation"

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

    const { keywords, country, region, quantity } = await request.json()

    // Validate input
    const keywordsError = validateRequired(keywords, "Keywords")
    const countryError = validateRequired(country, "Country")
    const regionError = validateRequired(region, "Region")

    if (keywordsError || countryError || regionError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [
            ...(keywordsError ? [{ field: "keywords", message: keywordsError }] : []),
            ...(countryError ? [{ field: "country", message: countryError }] : []),
            ...(regionError ? [{ field: "region", message: regionError }] : []),
          ],
        },
        { status: 400 },
      )
    }

    if (!quantity || quantity < 1 || quantity > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "Quantity must be between 1 and 1000",
          errors: [{ field: "quantity", message: "Quantity must be between 1 and 1000" }],
        },
        { status: 400 },
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock Google business data
    const businesses = Array.from({ length: Math.min(quantity, 50) }, (_, i) => ({
      id: `business_${i + 1}`,
      name: `${keywords} Business ${i + 1}`,
      address: `${i + 1} Main St, ${region}, ${country}`,
      phone: `+1-555-${String(i + 1).padStart(3, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      website: `https://business${i + 1}.com`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 10,
      category: keywords,
      hours: "9:00 AM - 6:00 PM",
      description: `A great ${keywords} business in ${region}`,
      selected: false,
    }))

    return NextResponse.json({
      success: true,
      message: `Found ${businesses.length} businesses`,
      data: {
        businesses,
        searchParams: { keywords, country, region, quantity },
        totalFound: businesses.length,
      },
    })
  } catch (error) {
    console.error("Google business search error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
