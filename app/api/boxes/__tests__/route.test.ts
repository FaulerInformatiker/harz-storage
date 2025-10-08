import { vi, Mock } from 'vitest';
import { GET } from '../route';
import { NextResponse } from 'next/server';

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn(),
  },
}));

describe('/api/boxes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('should return boxes data successfully', async () => {
      const mockJson = vi.fn();
      (NextResponse.json as Mock).mockReturnValue({ json: mockJson });

      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith([
        {
          id: "5m2",
          size: "5m²",
          price: 25,
          available: true,
          description: "Perfect for boxes and small items",
          icon: "📦",
          currency: "€/Monat"
        },
        {
          id: "10m2", 
          size: "10m²",
          price: 45,
          available: true,
          description: "Ideal for 1-room apartment contents",
          popular: true,
          icon: "🏠",
          currency: "€/Monat"
        },
        {
          id: "20m2",
          size: "20m²", 
          price: 80,
          available: false,
          description: "Suitable for 2-3 room apartment contents",
          icon: "🏢",
          currency: "€/Monat"
        }
      ]);
    });

    it('should handle errors and return 500 status', async () => {
      // Mock console.error to avoid test output
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
      
      // Force an error by mocking NextResponse.json to throw
      (NextResponse.json as Mock)
        .mockImplementationOnce(() => {
          throw new Error('Test error');
        })
        .mockReturnValue({ status: 500 });

      await GET();

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching boxes:', expect.any(Error));
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Failed to fetch boxes" },
        { status: 500 }
      );

      consoleSpy.mockRestore();
    });
  });
});
