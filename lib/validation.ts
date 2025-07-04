export function validateEmail(email: string): string | null {
  if (!email) {
    return "Email is required"
  }

  if (email.length < 3) {
    return "Email must be at least 3 characters long"
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

export function validateName(name: string): string | null {
  if (!name) {
    return "Name is required"
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters long"
  }

  if (name.length > 50) {
    return "Name must be less than 50 characters"
  }

  return null
}

export function validateMessage(message: string): string | null {
  if (!message) {
    return "Message is required"
  }

  if (message.length < 10) {
    return "Message must be at least 10 characters long"
  }

  if (message.length > 1000) {
    return "Message must be less than 1000 characters"
  }

  return null
}

export function validatePhone(phone: string): string | null {
  if (!phone) {
    return null // Phone is optional
  }

  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
    return "Please enter a valid phone number"
  }

  return null
}
