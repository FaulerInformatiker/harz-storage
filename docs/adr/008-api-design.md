# ADR-008: API Design and Architecture

## Status
Accepted

## Context
We need API endpoints for:
- Contact form submissions
- Box size and pricing information
- Form validation and error handling
- Type-safe request/response handling
- Mock data for development
- Integration testing capabilities

## Decision
We will use **Next.js API Routes** with **TypeScript interfaces** and **JSON Server** for development mocking.

### Key Technologies:
- **Next.js API Routes** - Serverless API endpoints
- **TypeScript** - Type-safe API contracts
- **JSON Server** - Development mock API
- **Zod** (future) - Runtime validation
- **Custom validation** - Input sanitization

### Key Dependencies:
- Next.js built-in API routes
- `json-server@1.0.0-beta.3` - Mock API server
- Custom TypeScript interfaces
- Built-in Next.js request/response handling

## Alternatives Considered
1. **Express.js** - Separate server, more complex deployment
2. **Fastify** - Good performance but additional complexity
3. **tRPC** - Type-safe but overkill for simple APIs
4. **GraphQL** - Too complex for our simple data needs
5. **External API service** - Vendor dependency and costs

## Consequences

### Positive:
- Seamless integration with Next.js application
- Serverless deployment capabilities
- Type-safe API contracts with TypeScript
- Easy development with mock server
- Built-in request/response handling
- Simple deployment and scaling
- No additional server infrastructure needed
- Easy testing with supertest-style approaches

### Negative:
- Limited to Next.js ecosystem
- Cold start latency in serverless environments
- Less control over server configuration
- Limited middleware ecosystem compared to Express
- Vendor lock-in to Vercel for optimal performance

### Technical Impact:
- API routes co-located with frontend code
- Shared TypeScript interfaces between client/server
- Development mock server for offline development
- Built-in CORS and security headers
- Easy integration testing
- Automatic API route optimization

### API Structure:
```
app/api/
├── contacts/
│   ├── route.ts          # POST /api/contacts
│   └── __tests__/
│       └── route.test.ts # API route tests
└── boxes/
    ├── route.ts          # GET /api/boxes
    └── __tests__/
        └── route.test.ts # API route tests
```

### Type Safety:
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  size: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Development Workflow:
- Mock API server for development: `npm run mock-api`
- Full development with mocks: `npm run dev:full`
- API route testing: `npm run test`
- Contract testing with Pact for external APIs
