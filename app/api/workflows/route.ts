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
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }

    const workflowData = await request.json()

    const workflow = {
      id: `workflow-${Date.now()}`,
      ...workflowData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      workflow,
      message: "Workflow created successfully",
    })
  } catch (error) {
    console.error("Create workflow error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Authorization token required" }, { status: 401 })
    }

    // Verify JWT token
    jwt.verify(token, JWT_SECRET)

    // In production, fetch workflows from database
    const workflows = []

    return NextResponse.json({ workflows })
  } catch (error) {
    console.error("Get workflows error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
