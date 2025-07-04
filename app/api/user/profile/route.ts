import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { validateName } from "@/lib/validation"

// Mock user database
const users = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    gender: "",
    language: "English",
    country: "",
  },
  {
    id: "2",
    email: "alexarawles@gmail.com",
    password: "password123",
    name: "Alexa Rawles",
    gender: "Female",
    language: "English",
    country: "United States",
  },
]

export async function GET(request: NextRequest) {
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

    const user = users.find((u) => u.id === payload.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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

    const { name, gender, language, country } = await request.json()

    // Validate input
    const nameError = validateName(name)
    if (nameError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [{ field: "name", message: nameError }],
        },
        { status: 400 },
      )
    }

    // Find and update user
    const userIndex = users.findIndex((u) => u.id === payload.userId)
    if (userIndex === -1) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      gender: gender || "",
      language: language || "English",
      country: country || "",
    }

    const { password, ...userWithoutPassword } = users[userIndex]
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: userWithoutPassword,
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
