import { type NextRequest, NextResponse } from "next/server"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword, validateName } from "@/lib/validation"

// Mock user database - in production, use a real database
const users = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
  },
  {
    id: "2",
    email: "alexarawles@gmail.com",
    password: "password123",
    name: "Alexa Rawles",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    // Validate input
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    const nameError = validateName(fullName)

    if (emailError || passwordError || nameError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [
            ...(emailError ? [{ field: "email", message: emailError }] : []),
            ...(passwordError ? [{ field: "password", message: passwordError }] : []),
            ...(nameError ? [{ field: "fullName", message: nameError }] : []),
          ],
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password,
      name: fullName,
    }

    users.push(newUser)

    // Generate JWT token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
