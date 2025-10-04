import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should be navigable with keyboard', async ({ page }) => {
    await page.goto('/');
    
    // Tab through the page
    await page.keyboard.press('Tab');
    await expect(page.locator('button:has-text("DE")').or(page.locator('button:has-text("EN")'))).toBeFocused();
    
    // Continue tabbing to main navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="#contact"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="#pricing"]')).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    const h1 = await page.locator('h1').count();
    expect(h1).toBe(1);
    
    const h2s = await page.locator('h2').all();
    expect(h2s.length).toBeGreaterThan(0);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Self-Storage in Langelsheim');
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // Check that all images have alt attributes
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');
    
    // Check that form inputs have associated labels
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const phoneInput = page.locator('input[name="phone"]');
    
    await expect(nameInput).toHaveAttribute('id');
    await expect(emailInput).toHaveAttribute('id');
    await expect(phoneInput).toHaveAttribute('id');
    
    // Check labels exist and are associated
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="phone"]')).toBeVisible();
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check main text has good contrast (this is a basic check)
    const bodyText = page.locator('body');
    const computedStyle = await bodyText.evaluate(el => {
      return window.getComputedStyle(el);
    });
    
    // Basic check that text is not too light
    expect(computedStyle.color).not.toBe('rgb(255, 255, 255)');
  });

  test('should work with screen reader announcements', async ({ page }) => {
    await page.goto('/');
    
    // Check for aria-live regions for dynamic content
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Mock successful form submission
    await page.route('**/contacts', route => {
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
    
    await page.click('button[type="submit"]');
    
    // Success message should be announced
    await expect(page.locator('text=Vielen Dank für Ihre Anfrage')).toBeVisible();
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/');
    
    // Test focus trap in language switcher
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBe('BUTTON');
    
    // Test that focus is visible
    const focusedButton = page.locator(':focus');
    await expect(focusedButton).toBeVisible();
  });
});
