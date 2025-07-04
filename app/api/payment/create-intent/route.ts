import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Authorization token required" }, { status: 401 })
    }

    // Verify JWT token
    jwt.verify(token, JWT_SECRET)

    const { amount, currency = "usd" } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Valid amount is required" }, { status: 400 })
    }

    // In production, create Stripe payment intent
    // For now, return mock client secret
    const clientSecret = `pi_mock_${Date.now()}_secret_mock`

    return NextResponse.json({
      clientSecret,
      amount,
      currency,
    })
  } catch (error) {
    console.error("Create payment intent error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
