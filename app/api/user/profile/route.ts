import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function GET(request: NextRequest) {
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

    // In a real application, fetch user data from database
    const userData = {
      id: decoded.userId,
      name: "Alexa Rawles",
      email: "alexarawles@gmail.com",
      company: "Growvy Inc.",
      phone: "+1 (555) 123-4567",
      bio: "Digital marketing professional with 8+ years of experience in lead generation and business development.",
      credits: 1250,
      plan: "Pro",
      joinDate: "2024-01-15",
    }

    return NextResponse.json({
      success: true,
      data: userData,
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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
    const { name, email, company, phone, bio } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Name and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please provide a valid email address" }, { status: 400 })
    }

    // In a real application, update user data in database
    console.log("Profile update:", { userId: decoded.userId, name, email, company, phone, bio })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUserData = {
      id: decoded.userId,
      name,
      email,
      company,
      phone,
      bio,
      credits: 1250,
      plan: "Pro",
      joinDate: "2024-01-15",
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUserData,
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 })
  }
}
