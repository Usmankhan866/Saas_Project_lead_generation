export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

// Mock database - in production, this would be a real database
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In production, this would be hashed
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456", // In production, this would be hashed
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
  if (userIndex === -1) {
    return null
  }

  users[userIndex] = { ...users[userIndex], ...updates }
  return users[userIndex]
}

export function deleteUser(id: string): boolean {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    return false
  }

  users.splice(userIndex, 1)
  return true
}

export function getAllUsers(): User[] {
  return users
}
