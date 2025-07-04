import { type NextRequest, NextResponse } from "next/server"
import { validateEmail, validateRequired } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, subject, message } = body

    // Validate input
    const nameError = validateRequired(fullName, "Full name")
    const emailError = validateEmail(email)
    const subjectError = validateRequired(subject, "Subject")
    const messageError = validateRequired(message, "Message")

    if (nameError || emailError || subjectError || messageError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: [
            ...(nameError ? [{ field: "fullName", message: nameError }] : []),
            ...(emailError ? [{ field: "email", message: emailError }] : []),
            ...(subjectError ? [{ field: "subject", message: subjectError }] : []),
            ...(messageError ? [{ field: "message", message: messageError }] : []),
          ],
        },
        { status: 400 },
      )
    }

    // In a real application, you would:
    // 1. Save the message to a database
    // 2. Send an email notification
    // 3. Add to a CRM system

    console.log("Contact form submission:", {
      fullName,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We will get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
