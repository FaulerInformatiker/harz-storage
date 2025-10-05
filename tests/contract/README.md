# Contract Testing

This directory contains contract tests using [Pact](https://pact.io/) to ensure API compatibility between the frontend and backend services.

## Overview

Contract testing verifies that the API contracts between consumer (frontend) and provider (backend) are maintained. This prevents breaking changes and ensures reliable integration.

## Test Structure

- `contacts.pact.test.ts` - Tests for the contacts API endpoints
- `boxes.pact.test.ts` - Tests for the boxes API endpoints

## Running Contract Tests

```bash
# Run all contract tests
npm run test:contract

# Publish contracts to Pact Broker (requires PACT_BROKER_BASE_URL)
npm run test:contract:publish
```

## Test Coverage

### Contacts API (`/api/contacts`)
- ✅ POST - Create contact successfully
- ✅ POST - Handle validation errors

### Boxes API (`/api/boxes`)
- ✅ GET - Return available boxes
- ✅ GET - Handle server errors

## Contract Verification

The generated Pact files in `/pacts` directory define the expected API behavior:
- Request/response formats
- Status codes
- Headers
- Error handling

These contracts should be verified by the backend service to ensure compatibility.
