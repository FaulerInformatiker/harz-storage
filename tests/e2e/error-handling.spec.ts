import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation error messages
    await expect(page.locator('text=Name ist erforderlich')).toBeVisible();
    await expect(page.locator('text=E-Mail-Adresse ist erforderlich')).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Gültige E-Mail-Adresse ist erforderlich')).toBeVisible();
  });

  test('should handle API failure gracefully', async ({ page }) => {
    // Mock API to return error
    await page.route('**/contacts', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.goto('/');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Fehler beim Senden der Anfrage')).toBeVisible();
  });

  test('should handle network failure', async ({ page }) => {
    // Mock network failure
    await page.route('**/contacts', route => {
      route.abort('failed');
    });

    await page.goto('/');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Fehler beim Senden der Anfrage')).toBeVisible();
  });

  test('should clear errors when user starts typing', async ({ page }) => {
    await page.goto('/');
    
    // Submit empty form to show errors
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Name ist erforderlich')).toBeVisible();
    
    // Start typing in name field
    await page.fill('input[name="name"]', 'T');
    
    // Error should disappear
    await expect(page.locator('text=Name ist erforderlich')).not.toBeVisible();
  });
});
