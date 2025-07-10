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
    } = await request.json()

    // Validate input - at least one search criteria is required
    if (
      !includeLevels?.length &&
      !includeJobFunctions?.length &&
      !includeJobTitles?.length &&
      !includeCountries?.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one search criteria is required",
          errors: [{ field: "general", message: "Please provide at least one search criteria" }],
        },
        { status: 400 },
      )
    }

    if (!totalLimit || totalLimit < 1 || totalLimit > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "Total limit must be between 1 and 1000",
          errors: [{ field: "totalLimit", message: "Total limit must be between 1 and 1000" }],
        },
        { status: 400 },
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock people data with comprehensive filtering
    const people = Array.from({ length: Math.min(totalLimit, 30) }, (_, i) => {
      const jobTitles =
        includeJobTitles.length > 0
          ? includeJobTitles
          : ["Software Engineer", "Marketing Manager", "Sales Director", "Product Manager", "Designer", "Analyst"]
      const companies = [
        "Tech Corp",
        "Innovation Inc",
        "Digital Solutions",
        "Future Systems",
        "Smart Tech",
        "Global Dynamics",
      ]
      const locations =
        includeCountries.length > 0
          ? includeCountries.map(
              (country) => `${includeCities.length > 0 ? includeCities[i % includeCities.length] : "City"}, ${country}`,
            )
          : ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA", "Chicago, IL"]

      return {
        id: `person_${i + 1}`,
        name: `${["John", "Jane", "Mike", "Sarah", "David", "Lisa", "Alex", "Emma", "Chris", "Taylor"][i % 10]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"][i % 10]}`,
        jobTitle: jobTitles[i % jobTitles.length],
        company: companies[i % companies.length],
        location: locations[i % locations.length],
        email: `person${i + 1}@example.com`,
        linkedin: `https://linkedin.com/in/person${i + 1}`,
        phone: `+1-555-${String(i + 1).padStart(3, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
        experience: `${Math.floor(Math.random() * 15) + 1} years`,
        industry: includeIndustries.length > 0 ? includeIndustries[i % includeIndustries.length] : "Technology",
        monthsInRole: Math.floor(Math.random() * (maxMonthsInRole - minMonthsInRole + 1)) + minMonthsInRole,
        totalExperiences: Math.floor(Math.random() * (maxExperiences - minExperiences + 1)) + minExperiences,
        followerCount: minFollowerCount
          ? Number.parseInt(minFollowerCount) + Math.floor(Math.random() * 1000)
          : Math.floor(Math.random() * 5000),
        selected: false,
      }
    })

    return NextResponse.json({
      success: true,
      message: `Found ${people.length} people matching your criteria`,
      data: {
        people,
        searchParams: {
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
        },
        totalFound: people.length,
      },
    })
  } catch (error) {
    console.error("People search error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
