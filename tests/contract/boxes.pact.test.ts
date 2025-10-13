import { getBoxes } from '../../lib/api';
import { vi } from 'vitest';

// Integration tests for Boxes API contract
// These tests verify the API contract without complex Pact setup
describe('Boxes API Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/boxes', () => {
    it('should return available boxes', async () => {
      // Mock successful API response
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: '1',
            size: '5m²',
            price: 25,
            description: 'Perfect for boxes and small items',
            available: true,
          },
          {
            id: '2',
            size: '10m²',
            price: 45,
            description: 'Ideal for 1-room apartment',
            available: true,
          },
          {
            id: '3',
            size: '20m²',
            price: 80,
            description: 'Great for 2-3 room apartment',
            available: false,
          },
        ],
      });
      global.fetch = mockFetch;

      const boxes = await getBoxes();

      expect(boxes).toHaveLength(3);
      expect(boxes[0]).toEqual({
        id: '1',
        size: '5m²',
        price: 25,
        description: 'Perfect for boxes and small items',
        available: true,
      });
      expect(boxes[1]).toEqual({
        id: '2',
        size: '10m²',
        price: 45,
        description: 'Ideal for 1-room apartment',
        available: true,
      });

      // Verify the API was called correctly
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/boxes',
        expect.objectContaining({
          cache: 'no-store',
        })
      );
    });

    it('should handle empty boxes response', async () => {
      // Mock empty response
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      });
      global.fetch = mockFetch;

      const boxes = await getBoxes();

      expect(boxes).toEqual([]);

      // Verify the API was called correctly
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/boxes',
        expect.objectContaining({
          cache: 'no-store',
        })
      );
    });
  });
});
