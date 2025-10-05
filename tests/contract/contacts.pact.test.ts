import { Pact } from '@pact-foundation/pact';
import { submitContactForm } from '../../lib/api';
import path from 'path';

const mockProvider = new Pact({
  consumer: 'harz-storage-frontend',
  provider: 'harz-storage-api',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO',
});

// Store original fetch
const originalFetch = global.fetch;

describe('Contacts API Contract', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => {
    // Restore original fetch
    global.fetch = originalFetch;
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

      await mockProvider.addInteraction({
        state: 'contact can be created',
        uponReceiving: 'a request to create a contact',
        withRequest: {
          method: 'POST',
          path: '/api/contacts',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            ...contactData,
            createdAt: '2025-10-05T11:32:16.503Z'
          }
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            id: '12345',
            ...contactData,
            createdAt: '2025-10-05T11:32:16.503Z'
          }
        }
      });

      // Mock fetch to redirect to Pact mock server
      global.fetch = jest.fn().mockImplementation((url: string, options: any) => {
        const mockUrl = url.replace(/^\/api/, `http://localhost:1234/api`);
        return originalFetch(mockUrl, options);
      });

      const result = await submitContactForm(contactData);
      expect(result).toEqual({ success: true });
    });
  });
});
