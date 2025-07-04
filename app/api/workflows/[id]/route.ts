import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// Mock workflows database (same as above)
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const workflow = workflows.find((w) => w.id === params.id && w.userId === payload.userId)

    if (!workflow) {
      return NextResponse.json({ success: false, message: "Workflow not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: workflow,
    })
  } catch (error) {
    console.error("Get workflow error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { name, description, config, status } = await request.json()

    const workflowIndex = workflows.findIndex((w) => w.id === params.id && w.userId === payload.userId)

    if (workflowIndex === -1) {
      return NextResponse.json({ success: false, message: "Workflow not found" }, { status: 404 })
    }

    workflows[workflowIndex] = {
      ...workflows[workflowIndex],
      name: name || workflows[workflowIndex].name,
      description: description !== undefined ? description : workflows[workflowIndex].description,
      config: config || workflows[workflowIndex].config,
      status: status || workflows[workflowIndex].status,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Workflow updated successfully",
      data: workflows[workflowIndex],
    })
  } catch (error) {
    console.error("Update workflow error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const workflowIndex = workflows.findIndex((w) => w.id === params.id && w.userId === payload.userId)

    if (workflowIndex === -1) {
      return NextResponse.json({ success: false, message: "Workflow not found" }, { status: 404 })
    }

    workflows.splice(workflowIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Workflow deleted successfully",
    })
  } catch (error) {
    console.error("Delete workflow error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
