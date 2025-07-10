import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/users"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [emailError, passwordError].filter(Boolean),
        },
        { status: 400 },
      )
    }

    // Find user
    const user = findUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Check password (in production, use bcrypt)
    if (user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
