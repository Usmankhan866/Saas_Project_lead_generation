"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer, useToast } from "@/components/toast"
import { Search, Users, Star, HelpCircle, CreditCard, Edit, Trash2, Download, Plus } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface BusinessData {
  id: string
  name: string
  address: string
  phone: string
  website: string
  rating: string
  reviews: number
  category: string
  hours: string
  description: string
  selected: boolean
}

interface PeopleData {
  id: string
  name: string
  jobTitle: string
  company: string
  location: string
  email: string
  linkedin: string
  phone: string
  experience: string
  industry: string
  selected: boolean
}

interface Workflow {
  id: string
  name: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  config: any
}

export default function DashboardPage() {
  const [showModal, setShowModal] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [businesses, setBusinesses] = useState<BusinessData[]>([])
  const [people, setPeople] = useState<PeopleData[]>([])
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [editingRow, setEditingRow] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})
  const { toasts, addToast, removeToast } = useToast()
  const router = useRouter()

  const [googleBusinessForm, setGoogleBusinessForm] = useState({
    keywords: "",
    country: "",
    region: "",
    quantity: 10,
  })

  const [peopleSearchForm, setPeopleSearchForm] = useState({
    name: "",
    company: "",
    location: "",
    jobTitle: "",
    quantity: 10,
  })

  const [workflowForm, setWorkflowForm] = useState({
    name: "",
    description: "",
    config: {},
  })

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    const email = localStorage.getItem("userEmail") || "alexarawles@gmail.com"
    const name = localStorage.getItem("userName") || "Alexa Rawles"
    setUserEmail(email)
    setUserName(name)

    loadWorkflows()
    setIsLoading(false)
  }, [router])

  const loadWorkflows = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/workflows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()
      if (result.success) {
        setWorkflows(result.data)
      }
    } catch (error) {
      console.error("Failed to load workflows:", error)
    }
  }

  const handleGoogleBusinessSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/search/google-businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(googleBusinessForm),
      })

      const result = await response.json()

      if (result.success) {
        setBusinesses(result.data.businesses)
        addToast({
          type: "success",
          title: "Search Completed",
          message: result.message,
        })
        setShowModal(null)
      } else {
        addToast({
          type: "error",
          title: "Search Failed",
          message: result.message,
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePeopleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/search/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(peopleSearchForm),
      })

      const result = await response.json()

      if (result.success) {
        setPeople(result.data.people)
        addToast({
          type: "success",
          title: "Search Completed",
          message: result.message,
        })
        setShowModal(null)
      } else {
        addToast({
          type: "error",
          title: "Search Failed",
          message: result.message,
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workflowForm),
      })

      const result = await response.json()

      if (result.success) {
        setWorkflows([...workflows, result.data])
        addToast({
          type: "success",
          title: "Workflow Created",
          message: result.message,
        })
        setShowModal(null)
        setWorkflowForm({ name: "", description: "", config: {} })
      } else {
        addToast({
          type: "error",
          title: "Creation Failed",
          message: result.message,
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteWorkflow = async (workflowId: string) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setWorkflows(workflows.filter((w) => w.id !== workflowId))
        addToast({
          type: "success",
          title: "Workflow Deleted",
          message: result.message,
        })
      } else {
        addToast({
          type: "error",
          title: "Deletion Failed",
          message: result.message,
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
      })
    }
  }

  const handleSelectAll = (type: "businesses" | "people", selected: boolean) => {
    if (type === "businesses") {
      setBusinesses(businesses.map((b) => ({ ...b, selected })))
    } else {
      setPeople(people.map((p) => ({ ...p, selected })))
    }
  }

  const handleSelectItem = (type: "businesses" | "people", id: string, selected: boolean) => {
    if (type === "businesses") {
      setBusinesses(businesses.map((b) => (b.id === id ? { ...b, selected } : b)))
    } else {
      setPeople(people.map((p) => (p.id === id ? { ...p, selected } : p)))
    }
  }

  const handleEditRow = (type: "businesses" | "people", id: string) => {
    setEditingRow(id)
    const item = type === "businesses" ? businesses.find((b) => b.id === id) : people.find((p) => p.id === id)
    setEditData({ ...item })
  }

  const handleSaveEdit = (type: "businesses" | "people", id: string) => {
    if (type === "businesses") {
      setBusinesses(businesses.map((b) => (b.id === id ? { ...editData } : b)))
    } else {
      setPeople(people.map((p) => (p.id === id ? { ...editData } : p)))
    }
    setEditingRow(null)
    setEditData({})
    addToast({
      type: "success",
      title: "Row Updated",
      message: "Data has been updated successfully",
    })
  }

  const handleDeleteRow = (type: "businesses" | "people", id: string) => {
    if (type === "businesses") {
      setBusinesses(businesses.filter((b) => b.id !== id))
    } else {
      setPeople(people.filter((p) => p.id !== id))
    }
    addToast({
      type: "success",
      title: "Row Deleted",
      message: "Data has been deleted successfully",
    })
  }

  const handleExportSelected = (type: "businesses" | "people") => {
    const selectedData = type === "businesses" ? businesses.filter((b) => b.selected) : people.filter((p) => p.selected)

    if (selectedData.length === 0) {
      addToast({
        type: "error",
        title: "No Data Selected",
        message: "Please select at least one item to export",
      })
      return
    }

    // Create JSON export
    const jsonData = JSON.stringify(selectedData, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}_export_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    addToast({
      type: "success",
      title: "Export Completed",
      message: `${selectedData.length} items exported successfully`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3c3679] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/growvy-logo.png"
              alt="Growvy Logo"
              width={120}
              height={40}
              className="h-8 w-auto cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-[#3c3679] text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>13 days left</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-700">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-medium">1,250 Credits</span>
            </div>

            <HelpCircle className="w-5 h-5 text-gray-500" />

            <div className="flex items-center space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
                alt={userName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => router.push("/dashboard/profile")}
              />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{userName}</div>
                <div className="text-gray-500">{userEmail}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Start Section */}
          <section className="mb-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h1>
            <div className="grid md:grid-cols-4 gap-4">
              <Button
                onClick={() => setShowModal("google-business")}
                className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg"
              >
                <Search className="w-6 h-6" />
                <span>Fetch Google Listings</span>
              </Button>

              <Button
                onClick={() => setShowModal("people-search")}
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg bg-transparent"
              >
                <Users className="w-6 h-6" />
                <span>Fetch People</span>
              </Button>

              <Button
                onClick={() => setShowModal("create-workflow")}
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg bg-transparent"
              >
                <Plus className="w-6 h-6" />
                <span>Create Workflow</span>
              </Button>

              <Button
                onClick={() => router.push("/dashboard/payments")}
                variant="outline"
                className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg bg-transparent"
              >
                <CreditCard className="w-6 h-6" />
                <span>Buy Credits</span>
              </Button>
            </div>
          </section>

          {/* Workflows Section */}
          {workflows.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Workflows</h2>
              </div>

              <Card className="bg-white">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">Name</th>
                          <th className="text-left p-4 font-medium text-gray-900">Description</th>
                          <th className="text-left p-4 font-medium text-gray-900">Status</th>
                          <th className="text-left p-4 font-medium text-gray-900">Created</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workflows.map((workflow) => (
                          <tr key={workflow.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 text-gray-900 font-medium">{workflow.name}</td>
                            <td className="p-4 text-gray-600">{workflow.description}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  workflow.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {workflow.status}
                              </span>
                            </td>
                            <td className="p-4 text-gray-600">{new Date(workflow.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteWorkflow(workflow.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Google Business Results */}
          {businesses.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Google Business Results</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSelectAll("businesses", true)}
                    className="bg-transparent"
                  >
                    Select All
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSelectAll("businesses", false)}
                    className="bg-transparent"
                  >
                    Deselect All
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleExportSelected("businesses")}
                    className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </Button>
                </div>
              </div>

              <Card className="bg-white">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">
                            <input
                              type="checkbox"
                              onChange={(e) => handleSelectAll("businesses", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </th>
                          <th className="text-left p-4 font-medium text-gray-900">Name</th>
                          <th className="text-left p-4 font-medium text-gray-900">Address</th>
                          <th className="text-left p-4 font-medium text-gray-900">Phone</th>
                          <th className="text-left p-4 font-medium text-gray-900">Rating</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {businesses.map((business) => (
                          <tr key={business.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={business.selected}
                                onChange={(e) => handleSelectItem("businesses", business.id, e.target.checked)}
                                className="rounded border-gray-300"
                              />
                            </td>
                            <td className="p-4">
                              {editingRow === business.id ? (
                                <input
                                  type="text"
                                  value={editData.name || ""}
                                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-900 font-medium">{business.name}</div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === business.id ? (
                                <input
                                  type="text"
                                  value={editData.address || ""}
                                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-600">{business.address}</div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === business.id ? (
                                <input
                                  type="text"
                                  value={editData.phone || ""}
                                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-600">{business.phone}</div>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-gray-600">{business.rating}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {editingRow === business.id ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveEdit("businesses", business.id)}
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Save
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setEditingRow(null)}>
                                      Cancel
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleEditRow("businesses", business.id)}
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDeleteRow("businesses", business.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* People Search Results */}
          {people.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">People Search Results</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSelectAll("people", true)}
                    className="bg-transparent"
                  >
                    Select All
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSelectAll("people", false)}
                    className="bg-transparent"
                  >
                    Deselect All
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleExportSelected("people")}
                    className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </Button>
                </div>
              </div>

              <Card className="bg-white">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">
                            <input
                              type="checkbox"
                              onChange={(e) => handleSelectAll("people", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </th>
                          <th className="text-left p-4 font-medium text-gray-900">Name</th>
                          <th className="text-left p-4 font-medium text-gray-900">Job Title</th>
                          <th className="text-left p-4 font-medium text-gray-900">Company</th>
                          <th className="text-left p-4 font-medium text-gray-900">Location</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {people.map((person) => (
                          <tr key={person.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={person.selected}
                                onChange={(e) => handleSelectItem("people", person.id, e.target.checked)}
                                className="rounded border-gray-300"
                              />
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="text"
                                  value={editData.name || ""}
                                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-900 font-medium">{person.name}</div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="text"
                                  value={editData.jobTitle || ""}
                                  onChange={(e) => setEditData({ ...editData, jobTitle: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-600">{person.jobTitle}</div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="text"
                                  value={editData.company || ""}
                                  onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-600">{person.company}</div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="text"
                                  value={editData.location || ""}
                                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                              ) : (
                                <div className="text-gray-600">{person.location}</div>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {editingRow === person.id ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveEdit("people", person.id)}
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Save
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setEditingRow(null)}>
                                      Cancel
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleEditRow("people", person.id)}
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDeleteRow("people", person.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </main>

      {/* Google Business Search Modal */}
      {showModal === "google-business" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-900">Fetch Google Businesses</h3>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowModal(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <form onSubmit={handleGoogleBusinessSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords *</label>
                  <input
                    type="text"
                    value={googleBusinessForm.keywords}
                    onChange={(e) => setGoogleBusinessForm({ ...googleBusinessForm, keywords: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., restaurants, dentists, plumbers"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    value={googleBusinessForm.country}
                    onChange={(e) => setGoogleBusinessForm({ ...googleBusinessForm, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region *</label>
                  <input
                    type="text"
                    value={googleBusinessForm.region}
                    onChange={(e) => setGoogleBusinessForm({ ...googleBusinessForm, region: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., New York, California, London"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={googleBusinessForm.quantity}
                    onChange={(e) =>
                      setGoogleBusinessForm({ ...googleBusinessForm, quantity: Number.parseInt(e.target.value) || 10 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(null)}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                  >
                    {isSubmitting ? "Searching..." : "Search Businesses"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* People Search Modal */}
      {showModal === "people-search" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-900">Search People</h3>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowModal(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <form onSubmit={handlePeopleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={peopleSearchForm.name}
                    onChange={(e) => setPeopleSearchForm({ ...peopleSearchForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={peopleSearchForm.company}
                    onChange={(e) => setPeopleSearchForm({ ...peopleSearchForm, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., Google, Microsoft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={peopleSearchForm.location}
                    onChange={(e) => setPeopleSearchForm({ ...peopleSearchForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., San Francisco, New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={peopleSearchForm.jobTitle}
                    onChange={(e) => setPeopleSearchForm({ ...peopleSearchForm, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., Software Engineer, Marketing Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={peopleSearchForm.quantity}
                    onChange={(e) =>
                      setPeopleSearchForm({ ...peopleSearchForm, quantity: Number.parseInt(e.target.value) || 10 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(null)}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                  >
                    {isSubmitting ? "Searching..." : "Search People"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Workflow Modal */}
      {showModal === "create-workflow" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-900">Create Workflow</h3>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowModal(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <form onSubmit={handleCreateWorkflow} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name *</label>
                  <input
                    type="text"
                    value={workflowForm.name}
                    onChange={(e) => setWorkflowForm({ ...workflowForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., Daily Business Search"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={workflowForm.description}
                    onChange={(e) => setWorkflowForm({ ...workflowForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    rows={3}
                    placeholder="Describe what this workflow does..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Configuration (JSON)</label>
                  <textarea
                    value={JSON.stringify(workflowForm.config, null, 2)}
                    onChange={(e) => {
                      try {
                        const config = JSON.parse(e.target.value)
                        setWorkflowForm({ ...workflowForm, config })
                      } catch (error) {
                        // Invalid JSON, keep the text as is
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none font-mono text-sm"
                    rows={6}
                    placeholder='{"keywords": "restaurants", "location": "New York", "limit": 50}'
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(null)}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#3c3679] hover:bg-[#2d2a5f] text-white"
                  >
                    {isSubmitting ? "Creating..." : "Create Workflow"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
