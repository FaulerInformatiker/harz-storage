import { submitContactForm } from '../api';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits contact form successfully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    };

    const result = await submitContactForm(formData);
    expect(result).toEqual({ success: true });
    expect(mockFetch).toHaveBeenCalledWith('/api/contacts', expect.any(Object));
  });

  it('handles API error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    };

    await expect(submitContactForm(formData)).rejects.toThrow('Failed to submit contact form');
  });

  it('handles network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      size: '10m²',
      message: 'Test message'
    };

    await expect(submitContactForm(formData)).rejects.toThrow('Network error');
  });
});
