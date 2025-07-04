import { type NextRequest, NextResponse } from "next/server"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword } from "@/lib/validation"
import { findUserByCredentials } from "@/lib/users"

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
          errors: [
            ...(emailError ? [{ field: "email", message: emailError }] : []),
            ...(passwordError ? [{ field: "password", message: passwordError }] : []),
          ],
        },
        { status: 400 },
      )
    }

    // Find user with credentials
    const user = findUserByCredentials(email, password)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password. Please check your credentials and try again.",
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
          email: user.email,
          name: user.name,
        },
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
