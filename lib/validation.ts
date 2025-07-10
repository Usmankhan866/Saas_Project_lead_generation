export interface ValidationError {
  field: string
  message: string
}

export function validateEmail(email: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return { field: "email", message: "Email is required" }
  }
  if (!emailRegex.test(email)) {
    return { field: "email", message: "Please enter a valid email address" }
  }
  return null
}

export function validatePassword(password: string): ValidationError | null {
  if (!password) {
    return { field: "password", message: "Password is required" }
  }
  if (password.length < 6) {
    return { field: "password", message: "Password must be at least 6 characters long" }
  }
  return null
}

export function validateName(name: string): ValidationError | null {
  if (!name) {
    return { field: "name", message: "Name is required" }
  }
  if (name.length < 2) {
    return { field: "name", message: "Name must be at least 2 characters long" }
  }
  return null
}

export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || value.trim() === "") {
    return { field: fieldName, message: `${fieldName} is required` }
  }
  return null
}
