export interface ContactFormData {
  name: string
  email: string
  phone: string
  size: string
  message: string
}

export interface ContactSubmission extends ContactFormData {
  id: number
  createdAt: string
}

const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001' 
  : '/api'

export async function submitContactForm(data: ContactFormData): Promise<ContactSubmission> {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      createdAt: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to submit contact form')
  }

  return response.json()
}
