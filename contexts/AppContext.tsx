"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { AppContextType, User, Workflow, Lead, SearchParams, PaymentMethod } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

const AppContext = createContext<AppContextType | undefined>(undefined)

type AppState = {
  user: User | null
  workflows: Workflow[]
  selectedLeads: Lead[]
  isAuthenticated: boolean
  isLoading: boolean
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_WORKFLOWS"; payload: Workflow[] }
  | { type: "ADD_WORKFLOW"; payload: Workflow }
  | { type: "UPDATE_WORKFLOW"; payload: { id: string; updates: Partial<Workflow> } }
  | { type: "DELETE_WORKFLOW"; payload: string }
  | { type: "SELECT_LEAD"; payload: string }
  | { type: "UNSELECT_LEAD"; payload: string }
  | { type: "UPDATE_LEAD"; payload: { leadId: string; updates: Partial<Lead> } }
  | { type: "DELETE_LEAD"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_AUTHENTICATED"; payload: boolean }

const initialState: AppState = {
  user: null,
  workflows: [],
  selectedLeads: [],
  isAuthenticated: false,
  isLoading: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_WORKFLOWS":
      return { ...state, workflows: action.payload }
    case "ADD_WORKFLOW":
      return { ...state, workflows: [...state.workflows, action.payload] }
    case "UPDATE_WORKFLOW":
      return {
        ...state,
        workflows: state.workflows.map((w) => (w.id === action.payload.id ? { ...w, ...action.payload.updates } : w)),
      }
    case "DELETE_WORKFLOW":
      return {
        ...state,
        workflows: state.workflows.filter((w) => w.id !== action.payload),
      }
    case "SELECT_LEAD":
      const leadToSelect = state.workflows.flatMap((w) => w.leads).find((l) => l.id === action.payload)
      if (leadToSelect && !state.selectedLeads.find((l) => l.id === action.payload)) {
        return {
          ...state,
          selectedLeads: [...state.selectedLeads, { ...leadToSelect, selected: true }],
        }
      }
      return state
    case "UNSELECT_LEAD":
      return {
        ...state,
        selectedLeads: state.selectedLeads.filter((l) => l.id !== action.payload),
      }
    case "UPDATE_LEAD":
      return {
        ...state,
        workflows: state.workflows.map((w) => ({
          ...w,
          leads: w.leads.map((l) => (l.id === action.payload.leadId ? { ...l, ...action.payload.updates } : l)),
        })),
        selectedLeads: state.selectedLeads.map((l) =>
          l.id === action.payload.leadId ? { ...l, ...action.payload.updates } : l,
        ),
      }
    case "DELETE_LEAD":
      return {
        ...state,
        workflows: state.workflows.map((w) => ({
          ...w,
          leads: w.leads.filter((l) => l.id !== action.payload),
        })),
        selectedLeads: state.selectedLeads.filter((l) => l.id !== action.payload),
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedUser = localStorage.getItem("user")
        const storedWorkflows = localStorage.getItem("workflows")
        const storedAuth = localStorage.getItem("isAuthenticated")

        if (storedAuth === "true" && storedUser) {
          dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) })
          dispatch({ type: "SET_AUTHENTICATED", payload: true })
        }

        if (storedWorkflows) {
          dispatch({ type: "SET_WORKFLOWS", payload: JSON.parse(storedWorkflows) })
        }
      } catch (error) {
        console.error("Error loading stored data:", error)
      }
    }

    loadStoredData()
  }, [])

  // Save data to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
    }
  }, [state.user])

  useEffect(() => {
    localStorage.setItem("workflows", JSON.stringify(state.workflows))
  }, [state.workflows])

  useEffect(() => {
    localStorage.setItem("isAuthenticated", state.isAuthenticated.toString())
  }, [state.isAuthenticated])

  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store JWT token
      localStorage.setItem("token", data.token)

      dispatch({ type: "SET_USER", payload: data.user })
      dispatch({ type: "SET_AUTHENTICATED", payload: true })

      toast({
        title: "Success",
        description: "Logged in successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    dispatch({ type: "SET_USER", payload: null })
    dispatch({ type: "SET_AUTHENTICATED", payload: false })
    dispatch({ type: "SET_WORKFLOWS", payload: [] })

    toast({
      title: "Success",
      description: "Logged out successfully",
    })
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!state.user) return

    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Update failed")
      }

      const updatedUser = { ...state.user, ...userData }
      dispatch({ type: "SET_USER", payload: updatedUser })

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Update failed",
        variant: "destructive",
      })
    }
  }

  const createWorkflow = async (workflowData: Omit<Workflow, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(workflowData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create workflow")
      }

      dispatch({ type: "ADD_WORKFLOW", payload: data.workflow })

      toast({
        title: "Success",
        description: "Workflow created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create workflow",
        variant: "destructive",
      })
    }
  }

  const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update workflow")
      }

      dispatch({ type: "UPDATE_WORKFLOW", payload: { id, updates } })

      toast({
        title: "Success",
        description: "Workflow updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update workflow",
        variant: "destructive",
      })
    }
  }

  const deleteWorkflow = async (id: string) => {
    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to delete workflow")
      }

      dispatch({ type: "DELETE_WORKFLOW", payload: id })

      toast({
        title: "Success",
        description: "Workflow deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete workflow",
        variant: "destructive",
      })
    }
  }

  const selectLead = (leadId: string) => {
    dispatch({ type: "SELECT_LEAD", payload: leadId })
  }

  const unselectLead = (leadId: string) => {
    dispatch({ type: "UNSELECT_LEAD", payload: leadId })
  }

  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update lead")
      }

      dispatch({ type: "UPDATE_LEAD", payload: { leadId, updates } })

      toast({
        title: "Success",
        description: "Lead updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update lead",
        variant: "destructive",
      })
    }
  }

  const deleteLead = async (leadId: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to delete lead")
      }

      dispatch({ type: "DELETE_LEAD", payload: leadId })

      toast({
        title: "Success",
        description: "Lead deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete lead",
        variant: "destructive",
      })
    }
  }

  const searchLeads = async (params: SearchParams): Promise<Lead[]> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await fetch("/api/search/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Search failed")
      }

      return data.leads
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Search failed",
        variant: "destructive",
      })
      return []
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const addCredits = async (amount: number) => {
    try {
      const response = await fetch("/api/credits/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to add credits")
      }

      if (state.user) {
        dispatch({ type: "SET_USER", payload: { ...state.user, credits: state.user.credits + amount } })
      }

      toast({
        title: "Success",
        description: `${amount} credits added successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add credits",
        variant: "destructive",
      })
    }
  }

  const updatePaymentMethod = async (paymentMethod: PaymentMethod) => {
    try {
      const response = await fetch("/api/payment/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentMethod),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update payment method")
      }

      toast({
        title: "Success",
        description: "Payment method updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update payment method",
        variant: "destructive",
      })
    }
  }

  const contextValue: AppContextType = {
    ...state,
    login,
    logout,
    updateUser,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    selectLead,
    unselectLead,
    updateLead,
    deleteLead,
    searchLeads,
    addCredits,
    updatePaymentMethod,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
