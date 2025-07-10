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
      case 'google-basic':
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
      
      case 'people-advanced':
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
      
      case 'business-advanced':
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
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => executeQuickStart('google-basic')}>
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
                    <p><strong>Keywords:</strong> restaurants</p>
                    <p><strong>Country:</strong> United States</p>
                    <p><strong>Region:</strong> New York</p>
                    <p><strong>Quantity:</strong> 50 results</p>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Search
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => executeQuickStart('people-advanced')}>
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
                    <p><strong>Levels:</strong> C-suite, Manager</p>
                    <p><strong>Functions:</strong> Sales, Engineering</p>
                    <p><strong>Titles:</strong> Founder, VP, CEO</p>
                    <p><strong>Company Size:</strong> 11-200 employees</p>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Search
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => executeQuickStart('business-advanced')}>
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
                    <p><strong>Industry:</strong> Software Development</p>
                    <p><strong>Size:</strong> 11-50 employees</p>
                    <p><strong>Type:</strong> Privately Held</p>
                    <p><strong>Keywords:</strong> sales, data, outbound</p>
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
                      <thea\
