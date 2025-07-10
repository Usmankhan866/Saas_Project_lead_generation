export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

// In-memory user storage (in production, use a real database)
const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    password: "password123",
    createdAt: new Date().toISOString(),
  },
]

export function findUserByEmail(email: string): User | null {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

export function userExists(email: string): boolean {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase())
}
