import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TranslationProvider } from '../../lib/TranslationContext';
import Contact from '../Contact';
import * as api from '../../lib/api';

vi.mock('../../lib/api');
const mockSubmitContactForm = api.submitContactForm as ReturnType<typeof vi.fn>;

const ContactWithProvider = () => (
  <TranslationProvider>
    <Contact />
  </TranslationProvider>
);

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form', () => {
    render(<ContactWithProvider />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    mockSubmitContactForm.mockResolvedValue({ 
      id: 1, 
      name: 'Test User',
      email: 'test@example.com', 
      phone: '123456789',
      size: '10m²',
      message: 'Test message',
      createdAt: '2023-01-01T00:00:00.000Z'
    });
    render(<ContactWithProvider />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/telefon/i), { target: { value: '123456789' } });
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }));

    await waitFor(() => {
      expect(screen.getByText(/vielen dank/i)).toBeInTheDocument();
    });
  });

  it('handles form submission error', async () => {
    mockSubmitContactForm.mockRejectedValue(new Error('API Error'));
    render(<ContactWithProvider />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }));

    await waitFor(() => {
      expect(screen.getByText(/fehler/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    mockSubmitContactForm.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ 
      id: 1, 
      name: 'Test User',
      email: 'test@example.com', 
      phone: '123456789',
      size: '10m²',
      message: 'Test message',
      createdAt: '2023-01-01T00:00:00.000Z'
    }), 100)));
    render(<ContactWithProvider />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /anfrage senden/i }));

    expect(screen.getByText(/wird gesendet/i)).toBeInTheDocument();
  });
});
