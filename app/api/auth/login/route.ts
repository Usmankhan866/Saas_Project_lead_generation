import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/users"
import { signToken } from "@/lib/jwt"
import { validateEmail, validateRequired } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    const emailError = validateEmail(email)
    const passwordError = validateRequired(password, "Password")

    if (emailError || passwordError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [
            ...(emailError ? [{ field: "email", message: emailError }] : []),
            ...(passwordError ? [{ field: "password", message: passwordError }] : []),
          ],
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

    // Check password (in production, use bcrypt to compare hashed passwords)
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
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
