import { vi } from 'vitest';
import { POST } from '../route';
import { NextResponse } from 'next/server';

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn(),
  },
}));

describe('/api/contacts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST', () => {
    const mockContactData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+49123456789',
      size: '10m²',
      message: 'I need storage space'
    };

    it('should create contact submission successfully', async () => {
      const mockRequest = {
        json: vi.fn().mockResolvedValue(mockContactData)
      } as unknown as Request;

      // Mock Math.random for consistent ID
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
      const mockDate = vi.spyOn(Date.prototype, 'toISOString').mockReturnValue('2023-01-01T00:00:00.000Z');

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith({
        id: '4fzzzxjyl',
        ...mockContactData,
        createdAt: '2023-01-01T00:00:00.000Z'
      });

      mockRandom.mockRestore();
      mockDate.mockRestore();
    });

    it('should handle invalid JSON and return 500 status', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
      
      const mockRequest = {
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
      } as unknown as Request;

      await POST(mockRequest);

      expect(consoleSpy).toHaveBeenCalledWith('Error submitting contact form:', expect.any(Error));
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Failed to submit contact form" },
        { status: 500 }
      );

      consoleSpy.mockRestore();
    });

    it('should handle request.json() failure', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
      
      const mockRequest = {
        json: vi.fn().mockImplementation(() => {
          throw new Error('Request parsing failed');
        })
      } as unknown as Request;

      await POST(mockRequest);

      expect(consoleSpy).toHaveBeenCalledWith('Error submitting contact form:', expect.any(Error));
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Failed to submit contact form" },
        { status: 500 }
      );

      consoleSpy.mockRestore();
    });
  });
});
