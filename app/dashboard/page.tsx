"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer, useToast } from "@/components/toast"
import {
  Search,
  Users,
  Star,
  HelpCircle,
  CreditCard,
  Edit,
  Trash2,
  Download,
  Plus,
  ChevronDown,
  Building,
  Zap,
} from "lucide-react"
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

  // Enhanced Google Business Form
  const [googleBusinessForm, setGoogleBusinessForm] = useState({
    keywords: "",
    countries: [] as string[],
    includeCities: [] as string[],
    excludeCities: [] as string[],
    industries: [] as string[],
    excludeIndustries: [] as string[],
    companySizes: [] as string[],
    companyTypes: [] as string[],
    includeDescriptionKeywords: "",
    excludeDescriptionKeywords: "",
    minFollowerCount: "",
    limit: 50,
  })

  // Enhanced People Search Form
  const [peopleSearchForm, setPeopleSearchForm] = useState({
    // Job Title & Role
    includeLevels: [] as string[],
    includeJobFunctions: [] as string[],
    includeJobTitles: [] as string[],
    excludeJobTitles: [] as string[],
    exactKeywordMatch: true,

    // Company Attributes
    companySizes: [] as string[],
    includeIndustries: [] as string[],
    excludeIndustries: [] as string[],
    includeDescriptionKeywords: "",
    excludeDescriptionKeywords: "",

    // Location Filters
    includeCountries: [] as string[],
    excludeCountries: [] as string[],
    includeRegions: [] as string[],
    excludeRegions: [] as string[],
    includeCities: [] as string[],
    excludeCities: [] as string[],
    includeStates: [] as string[],

    // Experience
    minMonthsInRole: 5,
    maxMonthsInRole: 24,
    minExperiences: 3,
    maxExperiences: 5,
    experienceKeywords: "",

    // Limits
    totalLimit: 50,
    limitPerCompany: 10,
    minFollowerCount: "",
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

  // Quick Start Templates
  const executeQuickStart = (template: string) => {
    switch (template) {
      case "google-basic":
        setGoogleBusinessForm({
          keywords: "restaurants",
          countries: ["United States"],
          includeCities: ["New York"],
          excludeCities: [],
          industries: [],
          excludeIndustries: [],
          companySizes: [],
          companyTypes: [],
          includeDescriptionKeywords: "",
          excludeDescriptionKeywords: "",
          minFollowerCount: "",
          limit: 50,
        })
        setShowModal("google-business")
        break

      case "people-advanced":
        setPeopleSearchForm({
          includeLevels: ["C-suite", "Manager"],
          includeJobFunctions: ["Sales", "Engineering"],
          includeJobTitles: ["Founder", "Vice President", "CEO"],
          excludeJobTitles: ["Vice", "Junior", "Intern"],
          exactKeywordMatch: true,
          companySizes: ["11–50", "51–200"],
          includeIndustries: ["Software Development"],
          excludeIndustries: [],
          includeDescriptionKeywords: "sales, data, outbound",
          excludeDescriptionKeywords: "marketing, agency",
          includeCountries: ["United States", "Canada"],
          excludeCountries: ["France", "Spain"],
          includeRegions: ["NAM", "LATAM"],
          excludeRegions: ["APAC", "EMEA"],
          includeCities: ["San Francisco", "London"],
          excludeCities: ["New York", "Paris"],
          includeStates: ["California", "Ontario"],
          minMonthsInRole: 5,
          maxMonthsInRole: 24,
          minExperiences: 3,
          maxExperiences: 5,
          experienceKeywords: "Product roadmap, manager, growth",
          totalLimit: 50,
          limitPerCompany: 10,
          minFollowerCount: "",
        })
        setShowModal("people-search")
        break

      case "business-advanced":
        setGoogleBusinessForm({
          keywords: "software companies",
          countries: ["United States"],
          includeCities: ["New York"],
          excludeCities: ["San Francisco"],
          industries: ["Software Development"],
          excludeIndustries: ["Advertising Services"],
          companySizes: ["11-50 employees"],
          companyTypes: ["Privately Held"],
          includeDescriptionKeywords: "sales, data, outbound",
          excludeDescriptionKeywords: "agency, marketing",
          minFollowerCount: "10",
          limit: 50,
        })
        setShowModal("google-business")
        break
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

  // Helper function for multi-select dropdowns
  const MultiSelectDropdown = ({
    label,
    options,
    selected,
    onChange,
    placeholder,
  }: {
    label: string
    options: string[]
    selected: string[]
    onChange: (values: string[]) => void
    placeholder: string
  }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOption = (option: string) => {
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option))
      } else {
        onChange([...selected, option])
      }
    }

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none cursor-pointer bg-white flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-gray-700">{selected.length > 0 ? `${selected.length} selected` : placeholder}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => toggleOption(option)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => {}}
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Templates</h1>

            {/* Quick Start Templates */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => executeQuickStart("google-basic")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Basic Google Search</h3>
                      <p className="text-sm text-gray-600">Quick business listings</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Keywords:</strong> restaurants
                    </p>
                    <p>
                      <strong>Country:</strong> United States
                    </p>
                    <p>
                      <strong>Region:</strong> New York
                    </p>
                    <p>
                      <strong>Quantity:</strong> 50 results
                    </p>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Search
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => executeQuickStart("people-advanced")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-600 text-white p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Advanced People Search</h3>
                      <p className="text-sm text-gray-600">Targeted professional search</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Levels:</strong> C-suite, Manager
                    </p>
                    <p>
                      <strong>Functions:</strong> Sales, Engineering
                    </p>
                    <p>
                      <strong>Titles:</strong> Founder, VP, CEO
                    </p>
                    <p>
                      <strong>Company Size:</strong> 11-200 employees
                    </p>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Search
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => executeQuickStart("business-advanced")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-600 text-white p-3 rounded-lg mr-4">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Advanced Business Search</h3>
                      <p className="text-sm text-gray-600">Detailed company filtering</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Industry:</strong> Software Development
                    </p>
                    <p>
                      <strong>Size:</strong> 11-50 employees
                    </p>
                    <p>
                      <strong>Type:</strong> Privately Held
                    </p>
                    <p>
                      <strong>Keywords:</strong> sales, data, outbound
                    </p>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Search
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Custom Search Options */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Custom Search</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setShowModal("google-business")}
                  variant="outline"
                  className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg bg-transparent"
                >
                  <Search className="w-6 h-6" />
                  <span>Custom Google Search</span>
                </Button>

                <Button
                  onClick={() => setShowModal("people-search")}
                  variant="outline"
                  className="border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white p-6 h-auto flex items-center justify-center space-x-3 text-lg bg-transparent"
                >
                  <Users className="w-6 h-6" />
                  <span>Custom People Search</span>
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
                              checked={businesses.every((b) => b.selected)}
                              onChange={(e) => handleSelectAll("businesses", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </th>
                          <th className="text-left p-4 font-medium text-gray-900">Business Name</th>
                          <th className="text-left p-4 font-medium text-gray-900">Address</th>
                          <th className="text-left p-4 font-medium text-gray-900">Phone</th>
                          <th className="text-left p-4 font-medium text-gray-900">Rating</th>
                          <th className="text-left p-4 font-medium text-gray-900">Category</th>
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
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <div>
                                  <div className="font-medium text-gray-900">{business.name}</div>
                                  <div className="text-sm text-gray-500">{business.website}</div>
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === business.id ? (
                                <input
                                  type="text"
                                  value={editData.address || ""}
                                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <span className="text-gray-600">{business.address}</span>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === business.id ? (
                                <input
                                  type="text"
                                  value={editData.phone || ""}
                                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <span className="text-gray-600">{business.phone}</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-gray-900">{business.rating}</span>
                                <span className="text-gray-500">({business.reviews})</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="text-gray-600">{business.category}</span>
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
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingRow(null)}
                                      className="text-gray-600"
                                    >
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
                              checked={people.every((p) => p.selected)}
                              onChange={(e) => handleSelectAll("people", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </th>
                          <th className="text-left p-4 font-medium text-gray-900">Name</th>
                          <th className="text-left p-4 font-medium text-gray-900">Job Title</th>
                          <th className="text-left p-4 font-medium text-gray-900">Company</th>
                          <th className="text-left p-4 font-medium text-gray-900">Location</th>
                          <th className="text-left p-4 font-medium text-gray-900">Email</th>
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
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <div className="font-medium text-gray-900">{person.name}</div>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="text"
                                  value={editData.jobTitle || ""}
                                  onChange={(e) => setEditData({ ...editData, jobTitle: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <span className="text-gray-600">{person.jobTitle}</span>
                              )}
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="text"
                                  value={editData.company || ""}
                                  onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <span className="text-gray-600">{person.company}</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className="text-gray-600">{person.location}</span>
                            </td>
                            <td className="p-4">
                              {editingRow === person.id ? (
                                <input
                                  type="email"
                                  value={editData.email || ""}
                                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                <span className="text-gray-600">{person.email}</span>
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
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingRow(null)}
                                      className="text-gray-600"
                                    >
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Google Business Search</h2>
                <Button variant="ghost" onClick={() => setShowModal(null)} className="text-gray-500">
                  ×
                </Button>
              </div>

              <form onSubmit={handleGoogleBusinessSearch} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords *</label>
                    <input
                      type="text"
                      value={googleBusinessForm.keywords}
                      onChange={(e) => setGoogleBusinessForm({ ...googleBusinessForm, keywords: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                      placeholder="e.g., restaurants, dentists, lawyers"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Limit Results</label>
                    <input
                      type="number"
                      value={googleBusinessForm.limit}
                      onChange={(e) =>
                        setGoogleBusinessForm({ ...googleBusinessForm, limit: Number.parseInt(e.target.value) || 50 })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                      min="1"
                      max="1000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <MultiSelectDropdown
                    label="Countries"
                    options={[
                      "United States",
                      "Canada",
                      "United Kingdom",
                      "Australia",
                      "Germany",
                      "France",
                      "Spain",
                      "Italy",
                    ]}
                    selected={googleBusinessForm.countries}
                    onChange={(values) => setGoogleBusinessForm({ ...googleBusinessForm, countries: values })}
                    placeholder="Select countries"
                  />

                  <MultiSelectDropdown
                    label="Industries"
                    options={[
                      "Software Development",
                      "Healthcare",
                      "Finance",
                      "Retail",
                      "Manufacturing",
                      "Education",
                      "Real Estate",
                      "Advertising Services",
                    ]}
                    selected={googleBusinessForm.industries}
                    onChange={(values) => setGoogleBusinessForm({ ...googleBusinessForm, industries: values })}
                    placeholder="Select industries"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <MultiSelectDropdown
                    label="Include Cities"
                    options={[
                      "New York",
                      "Los Angeles",
                      "Chicago",
                      "Houston",
                      "Phoenix",
                      "Philadelphia",
                      "San Antonio",
                      "San Diego",
                      "Dallas",
                      "San Jose",
                      "Austin",
                      "Jacksonville",
                      "Fort Worth",
                      "Columbus",
                      "Charlotte",
                      "San Francisco",
                      "Indianapolis",
                      "Seattle",
                      "Denver",
                      "Washington",
                    ]}
                    selected={googleBusinessForm.includeCities}
                    onChange={(values) => setGoogleBusinessForm({ ...googleBusinessForm, includeCities: values })}
                    placeholder="Select cities to include"
                  />

                  <MultiSelectDropdown
                    label="Exclude Cities"
                    options={[
                      "New York",
                      "Los Angeles",
                      "Chicago",
                      "Houston",
                      "Phoenix",
                      "Philadelphia",
                      "San Antonio",
                      "San Diego",
                      "Dallas",
                      "San Jose",
                      "Austin",
                      "Jacksonville",
                      "Fort Worth",
                      "Columbus",
                      "Charlotte",
                      "San Francisco",
                      "Indianapolis",
                      "Seattle",
                      "Denver",
                      "Washington",
                    ]}
                    selected={googleBusinessForm.excludeCities}
                    onChange={(values) => setGoogleBusinessForm({ ...googleBusinessForm, excludeCities: values })}
                    placeholder="Select cities to exclude"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <MultiSelectDropdown
                    label="Company Sizes"
                    options={[
                      "1-10 employees",
                      "11-50 employees",
                      "51-200 employees",
                      "201-500 employees",
                      "501-1000 employees",
                      "1000+ employees",
                    ]}
                    selected={googleBusinessForm.companySizes}
                    onChange={(values) => setGoogleBusinessForm({ ...googleBusinessForm, companySizes: values })}
                    placeholder="Select company sizes"
                  />

                  <MultiSelectDropdown
                    label="Company Types"
                    options={[
                      "Privately Held",
                      "Public Company",
                      "Partnership",
                      "Non-profit",
                      "Government Agency",
                      "Educational Institution",
                    ]}
                    selected={googleBusinessForm.companyTypes}
                    onChange={(values) => setGoogleBusinessForm({ ...googleBusinessForm, companyTypes: values })}
                    placeholder="Select company types"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Description Keywords</label>
                    <input
                      type="text"
                      value={googleBusinessForm.includeDescriptionKeywords}
                      onChange={(e) =>
                        setGoogleBusinessForm({ ...googleBusinessForm, includeDescriptionKeywords: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                      placeholder="e.g., sales, data, outbound"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exclude Description Keywords</label>
                    <input
                      type="text"
                      value={googleBusinessForm.excludeDescriptionKeywords}
                      onChange={(e) =>
                        setGoogleBusinessForm({ ...googleBusinessForm, excludeDescriptionKeywords: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                      placeholder="e.g., agency, marketing"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Follower Count</label>
                  <input
                    type="number"
                    value={googleBusinessForm.minFollowerCount}
                    onChange={(e) => setGoogleBusinessForm({ ...googleBusinessForm, minFollowerCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                    placeholder="e.g., 10"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowModal(null)} className="bg-transparent">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                    {isSubmitting ? "Searching..." : "Start Search"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* People Search Modal */}
      {showModal === "people-search" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">People Search</h2>
                <Button variant="ghost" onClick={() => setShowModal(null)} className="text-gray-500">
                  ×
                </Button>
              </div>

              <form onSubmit={handlePeopleSearch} className="space-y-8">
                {/* Job Title & Role Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Job Title & Role</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <MultiSelectDropdown
                      label="Include Levels"
                      options={["C-suite", "VP", "Director", "Manager", "Senior", "Mid-level", "Junior", "Entry-level"]}
                      selected={peopleSearchForm.includeLevels}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeLevels: values })}
                      placeholder="Select job levels"
                    />

                    <MultiSelectDropdown
                      label="Include Job Functions"
                      options={[
                        "Sales",
                        "Marketing",
                        "Engineering",
                        "Product",
                        "Operations",
                        "Finance",
                        "HR",
                        "Customer Success",
                      ]}
                      selected={peopleSearchForm.includeJobFunctions}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeJobFunctions: values })}
                      placeholder="Select job functions"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <MultiSelectDropdown
                      label="Include Job Titles"
                      options={[
                        "Founder",
                        "CEO",
                        "CTO",
                        "VP Sales",
                        "VP Marketing",
                        "Director",
                        "Manager",
                        "Senior Manager",
                      ]}
                      selected={peopleSearchForm.includeJobTitles}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeJobTitles: values })}
                      placeholder="Select job titles to include"
                    />

                    <MultiSelectDropdown
                      label="Exclude Job Titles"
                      options={["Vice", "Junior", "Intern", "Assistant", "Coordinator", "Analyst"]}
                      selected={peopleSearchForm.excludeJobTitles}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, excludeJobTitles: values })}
                      placeholder="Select job titles to exclude"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={peopleSearchForm.exactKeywordMatch}
                        onChange={(e) =>
                          setPeopleSearchForm({ ...peopleSearchForm, exactKeywordMatch: e.target.checked })
                        }
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Use Exact Keyword Match (only match exact job titles)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Company Attributes Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🏢 Company Attributes</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <MultiSelectDropdown
                      label="Company Sizes"
                      options={["1–10", "11–50", "51–200", "201–500", "501–1000", "1001–5000", "5000+"]}
                      selected={peopleSearchForm.companySizes}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, companySizes: values })}
                      placeholder="Select company sizes"
                    />

                    <MultiSelectDropdown
                      label="Include Industries"
                      options={[
                        "Software Development",
                        "Technology",
                        "Healthcare",
                        "Finance",
                        "Retail",
                        "Manufacturing",
                        "Education",
                        "Consulting",
                      ]}
                      selected={peopleSearchForm.includeIndustries}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeIndustries: values })}
                      placeholder="Select industries to include"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Include Description Keywords
                      </label>
                      <input
                        type="text"
                        value={peopleSearchForm.includeDescriptionKeywords}
                        onChange={(e) =>
                          setPeopleSearchForm({ ...peopleSearchForm, includeDescriptionKeywords: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        placeholder="e.g., sales, data, outbound"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exclude Description Keywords
                      </label>
                      <input
                        type="text"
                        value={peopleSearchForm.excludeDescriptionKeywords}
                        onChange={(e) =>
                          setPeopleSearchForm({ ...peopleSearchForm, excludeDescriptionKeywords: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        placeholder="e.g., marketing, agency"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Filters Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🌍 Location Filters</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <MultiSelectDropdown
                      label="Include Countries"
                      options={[
                        "United States",
                        "Canada",
                        "United Kingdom",
                        "Germany",
                        "France",
                        "Spain",
                        "Australia",
                        "Netherlands",
                      ]}
                      selected={peopleSearchForm.includeCountries}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeCountries: values })}
                      placeholder="Select countries to include"
                    />

                    <MultiSelectDropdown
                      label="Exclude Countries"
                      options={[
                        "United States",
                        "Canada",
                        "United Kingdom",
                        "Germany",
                        "France",
                        "Spain",
                        "Australia",
                        "Netherlands",
                      ]}
                      selected={peopleSearchForm.excludeCountries}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, excludeCountries: values })}
                      placeholder="Select countries to exclude"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <MultiSelectDropdown
                      label="Include Regions"
                      options={["NAM", "LATAM", "EMEA", "APAC"]}
                      selected={peopleSearchForm.includeRegions}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeRegions: values })}
                      placeholder="Select regions to include"
                    />

                    <MultiSelectDropdown
                      label="Exclude Regions"
                      options={["NAM", "LATAM", "EMEA", "APAC"]}
                      selected={peopleSearchForm.excludeRegions}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, excludeRegions: values })}
                      placeholder="Select regions to exclude"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <MultiSelectDropdown
                      label="Include Cities"
                      options={[
                        "San Francisco",
                        "New York",
                        "London",
                        "Toronto",
                        "Berlin",
                        "Paris",
                        "Sydney",
                        "Amsterdam",
                      ]}
                      selected={peopleSearchForm.includeCities}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeCities: values })}
                      placeholder="Select cities to include"
                    />

                    <MultiSelectDropdown
                      label="Exclude Cities"
                      options={[
                        "San Francisco",
                        "New York",
                        "London",
                        "Toronto",
                        "Berlin",
                        "Paris",
                        "Sydney",
                        "Amsterdam",
                      ]}
                      selected={peopleSearchForm.excludeCities}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, excludeCities: values })}
                      placeholder="Select cities to exclude"
                    />
                  </div>

                  <div className="mt-4">
                    <MultiSelectDropdown
                      label="Include States/Provinces"
                      options={["California", "New York", "Texas", "Florida", "Ontario", "Quebec", "British Columbia"]}
                      selected={peopleSearchForm.includeStates}
                      onChange={(values) => setPeopleSearchForm({ ...peopleSearchForm, includeStates: values })}
                      placeholder="Select states/provinces"
                    />
                  </div>
                </div>

                {/* Experience Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 Experience</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Months in Current Role
                      </label>
                      <input
                        type="number"
                        value={peopleSearchForm.minMonthsInRole}
                        onChange={(e) =>
                          setPeopleSearchForm({
                            ...peopleSearchForm,
                            minMonthsInRole: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Months in Current Role
                      </label>
                      <input
                        type="number"
                        value={peopleSearchForm.maxMonthsInRole}
                        onChange={(e) =>
                          setPeopleSearchForm({
                            ...peopleSearchForm,
                            maxMonthsInRole: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Number of Experiences
                      </label>
                      <input
                        type="number"
                        value={peopleSearchForm.minExperiences}
                        onChange={(e) =>
                          setPeopleSearchForm({
                            ...peopleSearchForm,
                            minExperiences: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Number of Experiences
                      </label>
                      <input
                        type="number"
                        value={peopleSearchForm.maxExperiences}
                        onChange={(e) =>
                          setPeopleSearchForm({
                            ...peopleSearchForm,
                            maxExperiences: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Keywords</label>
                    <input
                      type="text"
                      value={peopleSearchForm.experienceKeywords}
                      onChange={(e) => setPeopleSearchForm({ ...peopleSearchForm, experienceKeywords: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                      placeholder="e.g., Product roadmap, manager, growth"
                    />
                  </div>
                </div>

                {/* Limit Results Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📉 Limit Results</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Limit</label>
                      <input
                        type="number"
                        value={peopleSearchForm.totalLimit}
                        onChange={(e) =>
                          setPeopleSearchForm({
                            ...peopleSearchForm,
                            totalLimit: Number.parseInt(e.target.value) || 50,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        min="1"
                        max="1000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Limit Per Company</label>
                      <input
                        type="number"
                        value={peopleSearchForm.limitPerCompany}
                        onChange={(e) =>
                          setPeopleSearchForm({
                            ...peopleSearchForm,
                            limitPerCompany: Number.parseInt(e.target.value) || 10,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        min="1"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Follower Count</label>
                      <input
                        type="number"
                        value={peopleSearchForm.minFollowerCount}
                        onChange={(e) => setPeopleSearchForm({ ...peopleSearchForm, minFollowerCount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none"
                        placeholder="e.g., 10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowModal(null)} className="bg-transparent">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                    {isSubmitting ? "Searching..." : "Start Search"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Workflow Modal */}
      {showModal === "create-workflow" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Workflow</h2>
                <Button variant="ghost" onClick={() => setShowModal(null)} className="text-gray-500">
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
                    placeholder="Enter workflow name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={workflowForm.description}
                    onChange={(e) => setWorkflowForm({ ...workflowForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c3679] focus:border-transparent outline-none resize-none"
                    rows={3}
                    placeholder="Describe your workflow"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowModal(null)} className="bg-transparent">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                    {isSubmitting ? "Creating..." : "Create Workflow"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
