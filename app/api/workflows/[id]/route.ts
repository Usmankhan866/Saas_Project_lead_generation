import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// Mock workflows database (shared with parent route)
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const workflowId = params.id

    // Find workflow
    const workflowIndex = workflows.findIndex((w) => w.id === workflowId)
    if (workflowIndex === -1) {
      return NextResponse.json({ success: false, message: "Workflow not found" }, { status: 404 })
    }

    // Remove workflow
    const deletedWorkflow = workflows.splice(workflowIndex, 1)[0]

    console.log("Workflow deleted:", { userId: decoded.userId, workflowId })

    return NextResponse.json({
      success: true,
      message: "Workflow deleted successfully",
      data: deletedWorkflow,
    })
  } catch (error) {
    console.error("Workflow deletion error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete workflow" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const workflowId = params.id
    const body = await request.json()
    const { name, description, config, status } = body

    // Find workflow
    const workflowIndex = workflows.findIndex((w) => w.id === workflowId)
    if (workflowIndex === -1) {
      return NextResponse.json({ success: false, message: "Workflow not found" }, { status: 404 })
    }

    // Update workflow
    const updatedWorkflow = {
      ...workflows[workflowIndex],
      name: name || workflows[workflowIndex].name,
      description: description !== undefined ? description : workflows[workflowIndex].description,
      config: config || workflows[workflowIndex].config,
      status: status || workflows[workflowIndex].status,
      updatedAt: new Date().toISOString(),
    }

    workflows[workflowIndex] = updatedWorkflow

    console.log("Workflow updated:", { userId: decoded.userId, workflowId, updates: body })

    return NextResponse.json({
      success: true,
      message: "Workflow updated successfully",
      data: updatedWorkflow,
    })
  } catch (error) {
    console.error("Workflow update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update workflow" }, { status: 500 })
  }
}
