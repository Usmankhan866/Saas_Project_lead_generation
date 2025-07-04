import { type NextRequest, NextResponse } from "next/server"
import { validateEmail, validateRequired } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, subject, message } = await request.json()

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

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would save this to a database or send an email
    console.log("Contact form submission:", { fullName, email, subject, message })

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "Failed to send message. Please try again." }, { status: 500 })
  }
}
