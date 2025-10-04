import { submitContactForm } from '../api'

// Mock fetch globally
global.fetch = vi.fn()

describe('submitContactForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should submit form data successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ id: 1, success: true })
    }
    
    ;(fetch as any).mockResolvedValueOnce(mockResponse)

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    }

    const result = await submitContactForm(formData)
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/contacts'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
    )
    
    expect(result).toEqual({ id: 1, success: true })
  })

  it('should throw error on failed request', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    }
    
    ;(fetch as any).mockResolvedValueOnce(mockResponse)

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    }

    await expect(submitContactForm(formData)).rejects.toThrow('HTTP error! status: 500')
  })

  it('should throw error on network failure', async () => {
    ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    }

    await expect(submitContactForm(formData)).rejects.toThrow('Network error')
  })
})
