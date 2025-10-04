import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Contact from '../Contact'
import { TranslationProvider } from '../../lib/TranslationContext'
import * as api from '../../lib/api'

// Mock the API module
vi.mock('../../lib/api')

const renderWithProvider = () => {
  return render(
    <TranslationProvider>
      <Contact />
    </TranslationProvider>
  )
}

describe('Contact Component', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders contact form with all fields', () => {
    renderWithProvider()
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefonnummer/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/boxgröße/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nachricht/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /anfrage senden/i })).toBeInTheDocument()
  })

  it('renders contact information', () => {
    renderWithProvider()
    
    expect(screen.getByText('HarzStorage')).toBeInTheDocument()
    expect(screen.getByText('38685 Langelsheim')).toBeInTheDocument()
    expect(screen.getByText('+49 (0) 5326 123456')).toBeInTheDocument()
    expect(screen.getByText('info@harzstorage.de')).toBeInTheDocument()
  })

  it('submits form successfully', async () => {
    const mockSubmit = vi.mocked(api.submitContactForm)
    mockSubmit.mockResolvedValueOnce({ success: true })

    renderWithProvider()
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        size: '',
        message: ''
      })
    })
  })

  it('shows validation errors for empty required fields', async () => {
    renderWithProvider()
    
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }))

    await waitFor(() => {
      expect(screen.getByText(/name ist erforderlich/i)).toBeInTheDocument()
      expect(screen.getByText(/e-mail-adresse ist erforderlich/i)).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    const mockSubmit = vi.mocked(api.submitContactForm)
    mockSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    renderWithProvider()
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }))

    expect(screen.getByText(/wird gesendet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /wird gesendet/i })).toBeDisabled()
  })

  it('shows error message on submission failure', async () => {
    const mockSubmit = vi.mocked(api.submitContactForm)
    mockSubmit.mockRejectedValueOnce(new Error('Network error'))

    renderWithProvider()
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }))

    await waitFor(() => {
      expect(screen.getByText(/fehler beim senden/i)).toBeInTheDocument()
    })
  })
})
