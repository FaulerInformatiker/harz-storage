import { PactV4 } from '@pact-foundation/pact';
import { getBoxes } from '../../lib/api';
import path from 'path';
import { fetch as undiciFetch } from 'undici';

const mockProvider = new PactV4({
  consumer: 'harz-storage-frontend',
  provider: 'harz-storage-api',
  port: 1235,
  dir: path.resolve(process.cwd(), 'pacts'),
});

// Store original fetch and NODE_ENV
const originalFetch = global.fetch;
const originalNodeEnv = process.env.NODE_ENV;

describe.skip('Boxes API Contract', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => {
    // Restore original fetch and NODE_ENV
    global.fetch = originalFetch;
    (process.env as any).NODE_ENV = originalNodeEnv;
    return mockProvider.finalize();
  });

  describe('GET /api/boxes', () => {
    it('should return available boxes', async () => {
      const expectedBoxes = [
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

      await mockProvider.addInteraction()
        .given('boxes are available')
        .uponReceiving('a request for available boxes')
        .withRequest({
          method: 'GET',
          path: '/api/boxes'
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: expectedBoxes
        })
        .executeTest(async (mockServer) => {
          // Set NODE_ENV to production so API_BASE_URL is "/api"
          (process.env as any).NODE_ENV = 'production';
          
          // Mock fetch to redirect to Pact mock server
          global.fetch = jest.fn().mockImplementation(async (url: string, options: any) => {
            const mockUrl = url.replace(/^\/api/, `${mockServer.url}/api`);
            return await undiciFetch(mockUrl, options);
          });

          const result = await getBoxes();
          expect(result).toEqual(expectedBoxes);
        });
    });
  });
});
