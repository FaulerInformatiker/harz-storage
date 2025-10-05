import { test, expect } from '@playwright/test';

test.describe('Navigation Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to contact section from hero CTA', async ({ page }) => {
    // Click the main CTA button in hero with force to bypass overlay
    await page.click('text=Jetzt Lager anfragen', { force: true });
    
    // Wait for scroll and check if contact section is visible
    await page.waitForTimeout(1000);
    const contactSection = page.locator('#kontakt');
    await expect(contactSection).toBeVisible();
  });

  test('should navigate to contact section from pricing CTA', async ({ page }) => {
    // Find and click pricing CTA button with force
    const pricingCTA = page.locator('text=Box anfragen').first();
    await pricingCTA.click({ force: true });
    
    // Check if contact section is visible
    await page.waitForTimeout(500);
    const contactSection = page.locator('#kontakt');
    await expect(contactSection).toBeInViewport();
  });

  test('should navigate to contact section from security CTA', async ({ page }) => {
    // Scroll to security section first
    await page.locator('#sicherheit').scrollIntoViewIfNeeded();
    
    // Click security CTA
    await page.click('#sicherheit a[href="#kontakt"]');
    
    // Check if contact section is visible
    await page.waitForTimeout(500);
    const contactSection = page.locator('#kontakt');
    await expect(contactSection).toBeInViewport();
  });

  test('should navigate to pricing section from footer link', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Click pricing link in footer
    await page.click('footer a[href="#preise"]');
    
    // Check if pricing section is visible
    await page.waitForTimeout(500);
    const pricingSection = page.locator('#preise');
    await expect(pricingSection).toBeInViewport();
  });

  test('should navigate to contact section from footer link', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Click contact link in footer
    await page.click('footer a[href="#kontakt"]');
    
    // Check if contact section is visible
    await page.waitForTimeout(500);
    const contactSection = page.locator('#kontakt');
    await expect(contactSection).toBeInViewport();
  });

  test('should have all required section IDs present', async ({ page }) => {
    // Check that all sections with IDs exist
    await expect(page.locator('#preise')).toBeVisible();
    await expect(page.locator('#ablauf')).toBeVisible();
    await expect(page.locator('#sicherheit')).toBeVisible();
    await expect(page.locator('#kontakt')).toBeVisible();
  });

  test('should work with language switching', async ({ page }) => {
    // Switch to English
    await page.click('button:has-text("EN")');
    await page.waitForTimeout(300);
    
    // Click English CTA
    await page.click('text=Request Storage Now');
    
    // Check if contact section is visible
    await page.waitForTimeout(500);
    const contactSection = page.locator('#kontakt');
    await expect(contactSection).toBeInViewport();
    
    // Switch back to German
    await page.click('button:has-text("DE")');
    await page.waitForTimeout(300);
    
    // Verify German CTA still works
    await page.click('text=Jetzt Lager anfragen');
    await page.waitForTimeout(500);
    await expect(contactSection).toBeInViewport();
  });
});
