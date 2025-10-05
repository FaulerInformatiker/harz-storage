import { test, expect } from "@playwright/test";

test.describe("Contact Form API", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API response
    await page.route("http://localhost:3001/contacts", async (route) => {
      if (route.request().method() === "POST") {
        const postData = route.request().postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            id: 1,
            ...postData,
            createdAt: new Date().toISOString(),
          }),
        });
      }
    });
  });

  test("should submit contact form successfully", async ({ page }) => {
    await page.goto("/");

    // Handle the alert dialog
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Vielen Dank für Ihre Anfrage!");
      await dialog.accept();
    });

    // Fill out the contact form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0123456789");
    await page.selectOption('select[name="size"]', "10m²");
    await page.fill(
      'textarea[name="message"]',
      "Test message for storage inquiry",
    );

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait a moment for the form to process
    await page.waitForTimeout(1000);

    // Verify form is reset
    await expect(page.locator('input[name="name"]')).toHaveValue("");
    await expect(page.locator('input[name="email"]')).toHaveValue("");
  });

  test("should show loading state during submission", async ({ page }) => {
    // Add shorter delay to API response to catch loading state
    await page.route("http://localhost:3001/contacts", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ id: 1, createdAt: new Date().toISOString() }),
      });
    });

    await page.goto("/");

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");

    // Click submit and immediately check for loading state
    const submitPromise = page.click('button[type="submit"]');
    
    // Check for any loading indicator - button text change or disabled state
    const hasLoadingText = await page.locator('button:has-text("Wird gesendet"), button:has-text("gesendet"), button[disabled]').waitFor({ timeout: 2000 }).then(() => true).catch(() => false);
    
    await submitPromise;
    
    // At least one loading indicator should have appeared
    expect(hasLoadingText).toBeTruthy();
  });
});
