import { validateContactForm, sanitizeInput } from '../validation'

describe('validateContactForm', () => {
  it('should validate valid form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    }
    
    const result = validateContactForm(validData)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should reject empty name', () => {
    const invalidData = {
      name: '',
      email: 'john@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    }
    
    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Name ist erforderlich')
  })

  it('should reject invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    }
    
    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Gültige E-Mail-Adresse ist erforderlich')
  })

  it('should reject invalid phone number', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: 'abc',
      size: '10m²',
      message: 'Test message'
    }
    
    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Gültige Telefonnummer ist erforderlich')
  })
})

describe('sanitizeInput', () => {
  it('should remove HTML tags', () => {
    const input = '<script>alert("xss")</script>Hello'
    const result = sanitizeInput(input)
    expect(result).toBe('Hello')
  })

  it('should trim whitespace', () => {
    const input = '  Hello World  '
    const result = sanitizeInput(input)
    expect(result).toBe('Hello World')
  })

  it('should handle empty input', () => {
    const result = sanitizeInput('')
    expect(result).toBe('')
  })
})
