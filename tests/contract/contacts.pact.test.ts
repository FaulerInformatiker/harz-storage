import { submitContactForm } from '../../lib/api';
import { vi } from 'vitest';

// Integration tests for Contacts API contract
// These tests verify the API contract without complex Pact setup
describe('Contacts API Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/contacts', () => {
    it('should create a contact successfully', async () => {
      // Mock successful API response matching actual API return type
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+49123456789',
          size: '10m²',
          message: 'I need storage space',
          createdAt: '2025-10-13T19:30:00.000Z',
        }),
      });
      global.fetch = mockFetch;

      const result = await submitContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+49123456789',
        size: '10m²',
        message: 'I need storage space',
      });

      expect(result.id).toBe(1);
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.createdAt).toBeDefined();
      
      // Verify the API was called with correct parameters
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/contacts',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"name":"John Doe"'),
        })
      );
    });

    it('should handle validation errors', async () => {
      // Mock validation error response
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
      });
      global.fetch = mockFetch;

      await expect(
        submitContactForm({
          name: '',
          email: 'invalid-email',
          phone: '',
          size: '',
          message: '',
        })
      ).rejects.toThrow('Failed to submit contact form');

      // Verify the API was called with invalid data
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/contacts',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"email":"invalid-email"'),
        })
      );
    });
  });
});
