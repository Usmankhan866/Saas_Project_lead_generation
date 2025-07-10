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
      includeLevels,
      includeJobFunctions,
      includeJobTitles,
      excludeJobTitles,
      exactKeywordMatch,
      companySizes,
      includeIndustries,
      excludeIndustries,
      includeDescriptionKeywords,
      excludeDescriptionKeywords,
      includeCountries,
      excludeCountries,
      includeRegions,
      excludeRegions,
      includeCities,
      excludeCities,
      includeStates,
      minMonthsInRole,
      maxMonthsInRole,
      minExperiences,
      maxExperiences,
      experienceKeywords,
      totalLimit,
      limitPerCompany,
      minFollowerCount,
    } = body

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Generate mock people data based on search criteria
    const jobTitles = includeJobTitles?.length > 0 ? includeJobTitles : ["CEO", "VP Sales", "Manager", "Founder"]
    const companies = ["TechCorp", "DataSoft", "SalesForce Inc", "GrowthCo", "InnovateLab"]
    const locations = includeCities?.length > 0 ? includeCities : ["San Francisco", "New York", "London"]

    const mockPeople = Array.from({ length: Math.min(totalLimit || 10, 25) }, (_, index) => ({
      id: `person_${Math.random().toString(36).substring(2, 15)}`,
      name: `${["John", "Jane", "Michael", "Sarah", "David", "Emily"][index % 6]} ${["Smith", "Johnson", "Williams", "Brown", "Jones"][index % 5]}`,
      jobTitle: jobTitles[index % jobTitles.length],
      company: companies[index % companies.length],
      location: `${locations[index % locations.length]}, ${includeCountries?.[0] || "United States"}`,
      email: `person${index + 1}@${companies[index % companies.length].toLowerCase().replace(/\s+/g, "")}.com`,
      linkedin: `https://linkedin.com/in/person${index + 1}`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      experience: `${Math.floor(Math.random() * 10) + 3} years`,
      industry: includeIndustries?.[0] || "Software Development",
      selected: false,
    }))

    console.log("People search:", {
      userId: decoded.userId,
      searchParams: body,
      resultCount: mockPeople.length,
    })

    return NextResponse.json({
      success: true,
      message: `Found ${mockPeople.length} people matching your criteria`,
      data: {
        people: mockPeople,
        searchParams: body,
        totalResults: mockPeople.length,
      },
    })
  } catch (error) {
    console.error("People search error:", error)
    return NextResponse.json({ success: false, message: "Search failed. Please try again." }, { status: 500 })
  }
}
