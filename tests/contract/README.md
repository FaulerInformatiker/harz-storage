# Contract Testing

This directory contains contract tests using [Pact](https://pact.io/) to ensure API compatibility between the frontend and backend services.

## ⚠️ IMPORTANT: Contract Testing Rules

**READ FIRST**: [Contract Testing Rules & Guidelines](../../docs/CONTRACT_TESTING_RULES.md)

**Key Rule**: Contract tests represent external API expectations and **MUST NOT be changed** to fix application bugs. If a contract test fails, fix the application code to match the contract.

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
