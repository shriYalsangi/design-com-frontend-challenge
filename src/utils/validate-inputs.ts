export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // This regex allows for:
  // - An optional leading +
  // - Only digits and spaces in the rest of the number
  // - At least 7 digits (excluding spaces)
  // - No more than 15 digits (excluding spaces)
  const re = /^\+?[\d\s]{7,20}$/
  const digitsOnly = phone.replace(/\s/g, '')
  return re.test(phone) && digitsOnly.length >= 7 && digitsOnly.length <= 15
}
