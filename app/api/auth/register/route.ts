import { type NextRequest, NextResponse } from "next/server"
import { createUser, emailExists } from "@/lib/users"
import { signToken } from "@/lib/jwt"
import { validateEmail, validatePassword, validateName } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log("Registration attempt for:", email)

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
    if (emailExists(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
          errors: [{ field: "email", message: "Email already registered" }],
        },
        { status: 409 },
      )
    }

    // Create new user (in production, hash the password)
    const newUser = createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // In production, hash this password
    })

    // Generate JWT token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })

    console.log("Registration successful for:", email)

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
