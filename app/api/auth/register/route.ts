import { type NextRequest, NextResponse } from "next/server"
import { createUser, findUserByEmail } from "@/lib/users"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword, validateName } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (nameError || emailError || passwordError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: {
            name: nameError,
            email: emailError,
            password: passwordError,
          },
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user (in production, hash the password)
    const newUser = createUser({
      name,
      email,
      password, // In production, use bcrypt to hash this
    })

    // Generate JWT token
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })

    // Return success response
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
