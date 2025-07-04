import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// Mock payment confirmation - replace with actual Stripe webhook in production
export async function POST(request: NextRequest) {
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

    const { paymentIntentId, paymentMethodId, billingDetails } = await request.json()

    if (!paymentIntentId || !paymentMethodId) {
      return NextResponse.json({ success: false, message: "Missing payment details" }, { status: 400 })
    }

    // Mock payment confirmation
    const confirmedPayment = {
      id: paymentIntentId,
      status: "succeeded",
      amount: 2000, // $20.00 in cents
      currency: "usd",
      paymentMethod: paymentMethodId,
      billingDetails,
      userId: payload.userId,
      confirmedAt: Date.now(),
    }

    // In production, you would:
    // 1. Confirm the payment with Stripe
    // 2. Update user's credits/subscription in database
    // 3. Send confirmation email

    return NextResponse.json({
      success: true,
      message: "Payment confirmed successfully",
      data: confirmedPayment,
    })
  } catch (error) {
    console.error("Payment confirmation error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
