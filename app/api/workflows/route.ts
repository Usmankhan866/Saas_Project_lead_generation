import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// Mock workflows database
const workflows: any[] = [
  {
    id: "wf_1",
    name: "Daily Restaurant Search",
    description: "Automated search for new restaurants in target cities",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    config: {
      keywords: "restaurants",
      location: "San Francisco",
      limit: 50,
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: workflows,
    })
  } catch (error) {
    console.error("Workflows fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch workflows" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, config } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json({ success: false, message: "Workflow name is required" }, { status: 400 })
    }

    // Create new workflow
    const newWorkflow = {
      id: `wf_${Math.random().toString(36).substring(2, 15)}`,
      name,
      description: description || "",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      config: config || {},
    }

    workflows.push(newWorkflow)

    console.log("Workflow created:", { userId: decoded.userId, workflow: newWorkflow })

    return NextResponse.json({
      success: true,
      message: "Workflow created successfully",
      data: newWorkflow,
    })
  } catch (error) {
    console.error("Workflow creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create workflow" }, { status: 500 })
  }
}
