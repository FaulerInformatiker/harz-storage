# API Documentation

## Overview

The HarzStorage website uses a REST API for contact form submissions with environment-based configuration for development and production.

## Environment Configuration

### Development
- **Base URL**: `http://localhost:3001`
- **Mock Server**: JSON Server
- **Port**: 3001

### Production
- **Base URL**: `/api`
- **Real API**: Production endpoints

## Endpoints

### POST /contacts

Submit a contact form inquiry.

**Request Body:**
```typescript
interface ContactFormData {
  name: string        // Required: Customer name
  email: string       // Required: Customer email
  phone: string       // Optional: Customer phone
  size: string        // Optional: Requested storage size
  message: string     // Optional: Additional message
}
```

**Response:**
```typescript
interface ContactSubmission {
  id: number
  name: string
  email: string
  phone: string
  size: string
  message: string
  createdAt: string   // ISO timestamp
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3001/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max Mustermann",
    "email": "max@example.com",
    "phone": "0123456789",
    "size": "10m²",
    "message": "Ich interessiere mich für eine Lagerbox."
  }'
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "0123456789",
  "size": "10m²",
  "message": "Ich interessiere mich für eine Lagerbox.",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Error Handling

### Client-Side
- Form validation before submission
- Loading states during API calls
- User-friendly error messages
- Automatic form reset on success

### Server-Side
- HTTP status codes
- JSON error responses
- Request validation

**Error Response Format:**
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Mock Server Setup

### Installation
```bash
npm install --save-dev json-server
```

### Configuration
File: `mock-api/db.json`
```json
{
  "contacts": [],
  "submissions": []
}
```

### Scripts
```bash
# Start mock server
npm run mock-api

# Start development with mock server
npm run dev:full
```

## API Service Usage

### Import
```typescript
import { submitContactForm, type ContactFormData } from '../lib/api'
```

### Implementation
```typescript
const handleSubmit = async (formData: ContactFormData) => {
  try {
    const result = await submitContactForm(formData)
    console.log('Submission successful:', result)
  } catch (error) {
    console.error('Submission failed:', error)
  }
}
```

## Testing

### Unit Tests
Mock API calls in Jest tests:
```typescript
jest.mock('../lib/api', () => ({
  submitContactForm: jest.fn()
}))
```

### E2E Tests
Mock API responses in Playwright:
```typescript
await page.route('http://localhost:3001/contacts', async route => {
  await route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify({ id: 1, createdAt: new Date().toISOString() })
  })
})
```

## Security Considerations

- Input validation on both client and server
- CSRF protection for production API
- Rate limiting for form submissions
- Email validation and sanitization
- XSS prevention through React
