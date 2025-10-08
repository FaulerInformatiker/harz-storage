import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display theme toggle button', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
  });

  test('should start in light mode by default', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should toggle to dark mode when clicked', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await themeToggle.click();
    
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should toggle back to light mode when clicked again', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    
    // Toggle to dark
    await themeToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Toggle back to light
    await themeToggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should persist theme preference across page reloads', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    
    // Toggle to dark mode
    await themeToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Reload page
    await page.reload();
    
    // Should still be in dark mode
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should show correct icon for current theme', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    
    // In light mode, should show moon icon (to switch to dark)
    await expect(themeToggle.locator('svg')).toBeVisible();
    
    // Toggle to dark mode
    await themeToggle.click();
    
    // In dark mode, should show sun icon (to switch to light)
    await expect(themeToggle.locator('svg')).toBeVisible();
  });

  test('should apply dark theme styles to components', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    
    // Toggle to dark mode
    await themeToggle.click();
    
    // Check that dark theme styles are applied
    const heroSection = page.locator('section').first();
    const computedStyle = await heroSection.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Should have dark background (not white)
    expect(computedStyle).not.toBe('rgb(255, 255, 255)');
  });

  test('should work with keyboard navigation', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    
    // Focus and activate with Enter key
    await themeToggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
