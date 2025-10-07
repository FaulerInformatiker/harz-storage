import { PactV4 } from '@pact-foundation/pact';
import { submitContactForm } from '../../lib/api';
import path from 'path';
import { like, term } from '@pact-foundation/pact/src/dsl/matchers';

const mockProvider = new PactV4({
  consumer: 'harz-storage-frontend',
  provider: 'harz-storage-api',
  port: 1234,
  dir: path.resolve(process.cwd(), 'pacts'),
});

// Store original fetch and NODE_ENV
const originalFetch = global.fetch;
const originalNodeEnv = process.env.NODE_ENV;

describe.skip('Contacts API Contract', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => {
    // Restore original fetch and NODE_ENV
    global.fetch = originalFetch;
    (process.env as any).NODE_ENV = originalNodeEnv;
    return mockProvider.finalize();
  });

  describe('POST /api/contacts', () => {
    it('should create a contact successfully', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        size: '10m²',
        message: 'I need storage space'
      };

      await mockProvider.addInteraction()
        .given('contact can be created')
        .uponReceiving('a request to create a contact')
        .withRequest({
          method: 'POST',
          path: '/api/contacts',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            ...contactData,
            createdAt: term({
              matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z',
              generate: '2025-10-05T11:32:16.503Z'
            })
          }
        })
        .willRespondWith({
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            id: like('12345'),
            ...contactData,
            createdAt: term({
              matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z',
              generate: '2025-10-05T11:32:16.503Z'
            })
          }
        })
        .executeTest(async (mockServer) => {
          // Set NODE_ENV to production so API_BASE_URL is "/api"
          (process.env as any).NODE_ENV = 'production';
          
          // Mock fetch to redirect to Pact mock server
          global.fetch = jest.fn().mockImplementation(async (url: string, options?: any) => {
            const mockUrl = url.replace(/^\/api/, `${mockServer.url}/api`);
            try {
              const response = await originalFetch(mockUrl, options);
              return response;
            } catch (error) {
              console.error('Fetch error:', error);
              throw error;
            }
          });

          const result = await submitContactForm(contactData);
          expect(result).toHaveProperty('id');
          expect(result).toHaveProperty('createdAt');
          expect(result.name).toBe(contactData.name);
          expect(result.email).toBe(contactData.email);
        });
    });
  });
});
