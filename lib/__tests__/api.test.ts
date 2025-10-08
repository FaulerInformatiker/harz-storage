import { vi } from 'vitest';
import { submitContactForm, getBoxes } from '../api';

global.fetch = vi.fn();
const mockFetch = fetch as ReturnType<typeof vi.fn>;

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitContactForm', () => {
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

      await expect(submitContactForm(formData)).rejects.toThrow('Failed to submit contact form');
    });
  });

  describe('getBoxes', () => {
    it('fetches boxes successfully', async () => {
      const mockBoxes = [
        {
          id: '5m2',
          size: '5m²',
          price: 25,
          available: true,
          description: 'Perfect for boxes and small items',
          icon: '📦',
          currency: '€/Monat'
        }
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockBoxes,
      } as Response);

      const result = await getBoxes();
      expect(result).toEqual(mockBoxes);
      expect(mockFetch).toHaveBeenCalledWith('/api/boxes', expect.objectContaining({
        cache: 'no-store'
      }));
    });

    it('handles fetch error', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(getBoxes()).rejects.toThrow('Failed to fetch boxes');
    });
  });
});
