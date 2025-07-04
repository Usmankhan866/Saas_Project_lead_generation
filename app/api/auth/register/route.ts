import { type NextRequest, NextResponse } from "next/server"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword, validateName } from "@/lib/validation"
import { findUserByEmail, addUser } from "@/lib/users"

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
          errors: [
            ...(nameError ? [{ field: "name", message: nameError }] : []),
            ...(emailError ? [{ field: "email", message: emailError }] : []),
            ...(passwordError ? [{ field: "password", message: passwordError }] : []),
          ],
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists. Please use a different email or try logging in.",
        },
        { status: 409 },
      )
    }

    // Create new user
    const newUser = addUser({ name, email, password })

    // Generate JWT token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
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
