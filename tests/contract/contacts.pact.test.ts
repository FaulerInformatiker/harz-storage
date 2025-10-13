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
      // Mock successful API response
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Contact form submitted successfully',
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

      expect(result.success).toBe(true);
      expect(result.message).toBe('Contact form submitted successfully');
      
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
        json: async () => ({
          success: false,
          message: 'Validation failed',
          errors: {
            name: 'Name is required',
            email: 'Invalid email format',
          },
        }),
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
