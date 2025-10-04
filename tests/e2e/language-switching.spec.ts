import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('should switch between German and English', async ({ page }) => {
    await page.goto('/');
    
    // Check default German content
    await expect(page.getByRole('heading', { name: /Self-Storage in Langelsheim/ })).toBeVisible();
    
    // Switch to English using more specific selector
    await page.locator('.flex.space-x-1 button:has-text("EN")').click();
    
    // Check English content appears - use the actual subtitle text
    await expect(page.getByText(/Flexible, secure storage units from 5m²/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Request Storage Now' })).toBeVisible();
    
    // Switch back to German
    await page.locator('.flex.space-x-1 button:has-text("DE")').click();
    
    // Check German content returns
    await expect(page.getByText(/Flexible, sichere Lagerboxen ab 5m²/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Jetzt Box anfragen' })).toBeVisible();
  });

  test('should maintain language across sections', async ({ page }) => {
    await page.goto('/');
    
    // Switch to English
    await page.locator('.flex.space-x-1 button:has-text("EN")').click();
    
    // Check multiple sections have English content
    await expect(page.getByRole('heading', { name: /Why HarzStorage/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Sizes & Prices/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /How It Works/ })).toBeVisible();
  });
});
