import { type NextRequest, NextResponse } from "next/server"
import { createUser, userExists } from "@/lib/users"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword, validateName } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (nameError || emailError || passwordError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [nameError, emailError, passwordError].filter(Boolean),
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    if (userExists(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
          errors: [{ field: "email", message: "Email is already registered" }],
        },
        { status: 409 },
      )
    }

    // Create user (in production, hash the password)
    const user = createUser({ name, email, password })

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful",
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
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
