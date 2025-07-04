export interface ValidationError {
  field: string
  message: string
}

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return "Email is required"
  if (!emailRegex.test(email)) return "Please enter a valid email address"
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required"
  if (password.length < 6) return "Password must be at least 6 characters long"
  return null
}

export function validateName(name: string): string | null {
  if (!name) return "Name is required"
  if (name.length < 2) return "Name must be at least 2 characters long"
  return null
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") return `${fieldName} is required`
  return null
}

export function validateForm(
  data: Record<string, string>,
  rules: Record<string, (value: string) => string | null>,
): ValidationError[] {
  const errors: ValidationError[] = []

  Object.entries(rules).forEach(([field, validator]) => {
    const error = validator(data[field] || "")
    if (error) {
      errors.push({ field, message: error })
    }
  })

  return errors
}
