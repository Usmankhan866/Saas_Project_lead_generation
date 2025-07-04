// Simple in-memory user storage for demo purposes
// In production, use a real database
interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: Date
}

// Mock users database
const users: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    createdAt: new Date(),
  },
  {
    id: "2",
    email: "alexarawles@gmail.com",
    password: "password123",
    name: "Alexa Rawles",
    createdAt: new Date(),
  },
]

export function findUserByEmail(email: string): User | null {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
}

export function findUserById(id: string): User | null {
  return users.find((user) => user.id === id) || null
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  users.push(newUser)
  return newUser
}

export function updateUser(id: string, updates: Partial<Omit<User, "id" | "createdAt">>): User | null {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  users[userIndex] = { ...users[userIndex], ...updates }
  return users[userIndex]
}

export function getAllUsers(): User[] {
  return users
}

// Helper function to check if email already exists
export function emailExists(email: string): boolean {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase())
}
