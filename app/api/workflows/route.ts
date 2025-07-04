import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// Mock workflows database
const workflows = [
  {
    id: "1",
    name: "Google Business Search",
    description: "Search for local businesses on Google",
    userId: "1",
    status: "active",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    config: {
      keywords: "restaurants",
      location: "New York",
      limit: 50,
    },
  },
  {
    id: "2",
    name: "People Search",
    description: "Find people profiles",
    userId: "1",
    status: "draft",
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
    config: {
      name: "John Doe",
      company: "Tech Corp",
      location: "California",
    },
  },
]

export async function GET(request: NextRequest) {
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

    // Filter workflows by user
    const userWorkflows = workflows.filter((w) => w.userId === payload.userId)

    return NextResponse.json({
      success: true,
      data: userWorkflows,
    })
  } catch (error) {
    console.error("Get workflows error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

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

    const { name, description, config } = await request.json()

    if (!name || !config) {
      return NextResponse.json({ success: false, message: "Name and config are required" }, { status: 400 })
    }

    const newWorkflow = {
      id: (workflows.length + 1).toString(),
      name,
      description: description || "",
      userId: payload.userId,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      config,
    }

    workflows.push(newWorkflow)

    return NextResponse.json({
      success: true,
      message: "Workflow created successfully",
      data: newWorkflow,
    })
  } catch (error) {
    console.error("Create workflow error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
