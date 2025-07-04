// Mock user database - in production, use a real database
const users: Array<{
  id: string
  email: string
  password: string
  name: string
  createdAt: string
}> = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "alexarawles@gmail.com",
    password: "password123",
    name: "Alexa Rawles",
    createdAt: new Date().toISOString(),
  },
]

export function getAllUsers() {
  return users
}

export function findUserByEmail(email: string) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function findUserByCredentials(email: string, password: string) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)
}

export function addUser(userData: {
  email: string
  password: string
  name: string
}) {
  const newUser = {
    id: (users.length + 1).toString(),
    email: userData.email.toLowerCase(),
    password: userData.password,
    name: userData.name,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

export function updateUser(
  id: string,
  updates: Partial<{
    email: string
    password: string
    name: string
  }>,
) {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates }
    return users[userIndex]
  }
  return null
}
