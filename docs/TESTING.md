# Testing Documentation

## Overview

The HarzStorage project uses a comprehensive testing strategy with Jest for unit tests and Playwright for E2E tests.

## Test Structure

```
app/__tests__/          # Jest Unit Tests
tests/e2e/             # Playwright E2E Tests
mock-api/              # JSON Server Mock Data
jest.config.js         # Jest configuration
playwright.config.ts   # Playwright configuration
```

## Unit Testing (Jest + React Testing Library)

### Configuration

- **Framework**: Jest with Next.js integration
- **Testing Library**: React Testing Library
- **Environment**: jsdom
- **Coverage**: 70% minimum threshold

### Running Tests

```bash
# Run all unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Files

- `app/__tests__/page.test.tsx` - Homepage component tests

### Example Test

```typescript
import { render, screen } from '@testing-library/react'
import { TranslationProvider } from '../../lib/TranslationContext'
import Home from '../page'

const renderWithProvider = () => {
  return render(
    <TranslationProvider>
      <Home />
    </TranslationProvider>
  )
}

test('renders hero section', () => {
  renderWithProvider()
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toBeInTheDocument()
})
```

### Coverage Requirements

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## E2E Testing (Playwright)

### Configuration

- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, Safari
- **Viewport**: Desktop and mobile
- **Parallel**: 5 workers

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Show report
npx playwright show-report
```

### Test Suites

#### Homepage Tests (`homepage.spec.ts`)

- Main sections loading
- Contact form functionality
- Mobile responsiveness

#### Language Switching (`language-switching.spec.ts`)

- German/English toggle
- Language persistence
- Translation accuracy

#### Contact Form API (`contact-form.spec.ts`)

- Form submission with API
- Loading states
- Success/error handling

### Example E2E Test

```typescript
import { test, expect } from "@playwright/test";

test("should load homepage", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Self-Storage in Langelsheim/,
    }),
  ).toBeVisible();
});
```

## Mock Server Testing

### Setup

```bash
# Start mock server
npm run mock-api

# Mock server runs on http://localhost:3001
```

### Mock Data

File: `mock-api/db.json`

```json
{
  "contacts": [],
  "submissions": [
    {
      "id": 1,
      "name": "Max Mustermann",
      "email": "max@example.com",
      "phone": "0123456789",
      "size": "10m²",
      "message": "Test message",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### API Mocking in Tests

```typescript
// Mock API response in Playwright
await page.route("http://localhost:3001/contacts", async (route) => {
  await route.fulfill({
    status: 201,
    contentType: "application/json",
    body: JSON.stringify({
      id: 1,
      createdAt: new Date().toISOString(),
    }),
  });
});
```

## Translation Testing

### Context Provider

All components using translations must be wrapped in `TranslationProvider`:

```typescript
const renderWithProvider = () => {
  return render(
    <TranslationProvider>
      <Component />
    </TranslationProvider>
  )
}
```

### Language Switching Tests

```typescript
test("should switch languages", async ({ page }) => {
  await page.goto("/");

  // Switch to English
  await page.click('[data-testid="language-toggle"]');

  await expect(page.getByText("Self-Storage in Langelsheim")).toBeVisible();
});
```

## Test Best Practices

### Unit Tests

- Test component behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Mock external dependencies
- Test error states and edge cases

### E2E Tests

- Test user workflows end-to-end
- Use data-testid for complex selectors
- Test on multiple viewports
- Mock external APIs consistently

### General

- Keep tests focused and isolated
- Use descriptive test names
- Maintain test data separately
- Run tests in CI/CD pipeline

## Debugging Tests

### Jest

```bash
# Debug specific test
npm test -- --testNamePattern="test name"

# Verbose output
npm test -- --verbose
```

### Playwright

```bash
# Debug mode
npx playwright test --debug

# Headed mode
npx playwright test --headed

# Trace viewer
npx playwright show-trace trace.zip
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run Unit Tests
  run: npm test

- name: Start Mock Server
  run: npm run mock-api &

- name: Run E2E Tests
  run: npx playwright test
```

### Test Reports

- Jest coverage reports in `coverage/`
- Playwright HTML reports in `playwright-report/`
- Test artifacts in `test-results/`
