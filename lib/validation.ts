export function validateEmail(email: string): string | null {
  if (!email) {
    return "Email is required"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }

  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long"
  }

  return null
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`
  }
  return null
}

export function validateName(name: string): string | null {
  if (!name || name.trim() === "") {
    return "Name is required"
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long"
  }

  return null
}

export function validatePhone(phone: string): string | null {
  if (!phone) {
    return "Phone number is required"
  }

  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
    return "Please enter a valid phone number"
  }

  return null
}
