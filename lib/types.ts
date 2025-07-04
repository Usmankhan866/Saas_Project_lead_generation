export interface User {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  bio?: string
  avatar?: string
  plan: "starter" | "professional" | "enterprise"
  credits: number
  subscription?: {
    id: string
    status: "active" | "canceled" | "past_due"
    currentPeriodEnd: string
  }
}

export interface Lead {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  website?: string
  location?: string
  industry?: string
  employees?: string
  rating?: number
  description?: string
  selected?: boolean
  source: "google" | "manual" | "import"
  createdAt: string
  updatedAt: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  query: string
  location: string
  industry?: string
  status: "active" | "paused" | "completed"
  leads: Lead[]
  createdAt: string
  updatedAt: string
}

export interface SearchParams {
  query: string
  location: string
  industry?: string
  limit?: number
}

export interface PaymentMethod {
  id: string
  type: "card"
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
}

export interface AppContextType {
  user: User | null
  workflows: Workflow[]
  selectedLeads: Lead[]
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  createWorkflow: (workflow: Omit<Workflow, "id" | "createdAt" | "updatedAt">) => void
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void
  deleteWorkflow: (id: string) => void
  selectLead: (leadId: string) => void
  unselectLead: (leadId: string) => void
  updateLead: (leadId: string, updates: Partial<Lead>) => void
  deleteLead: (leadId: string) => void
  searchLeads: (params: SearchParams) => Promise<Lead[]>
  addCredits: (amount: number) => Promise<void>
  updatePaymentMethod: (paymentMethod: PaymentMethod) => Promise<void>
}
