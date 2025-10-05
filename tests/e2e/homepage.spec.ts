import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display all main sections", async ({ page }) => {
    await page.goto("/");

    // Hero section - check for actual text that exists
    await expect(page.getByText(/Langelsheim/).first()).toBeVisible();
    await expect(page.getByText(/Jetzt Lager anfragen/).first()).toBeVisible();

    // Advantages section
    await expect(page.getByText(/24\/7 Zugang|24\/7 Access/).first()).toBeVisible();

    // Pricing section - check for pricing content
    await expect(page.getByText(/25€/).first()).toBeVisible();

    // Contact section
    await expect(page.getByText(/Kontakt|Contact/).first()).toBeVisible();
    await expect(page.locator("input[placeholder*='Name']")).toBeVisible();
  });

  test("should have working contact form", async ({ page }) => {
    await page.goto("/");

    // Mock successful API response
    await page.route("**/contacts", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          name: "Test User",
          email: "test@example.com",
          createdAt: new Date().toISOString(),
        }),
      });
    });

    // Fill out form using specific selectors
    await page.locator("input[placeholder*='Name']").fill("Test User");
    await page.locator("input[type='email']").fill("test@example.com");
    await page.locator("input[type='tel']").fill("123456789");
    await page.locator("select").selectOption("5m²");
    await page.locator("textarea").fill("Test message");

    // Submit form
    await page.getByRole("button", { name: /senden|Send/ }).click();

    // Check for success message with flexible matching
    const hasSuccess = await page.getByText(/vielen dank|thank you|success|erfolgreich/i).waitFor({ timeout: 10000 }).then(() => true).catch(() => false);
    expect(hasSuccess).toBeTruthy();
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check mobile layout
    await expect(page.getByText(/Langelsheim/).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "DE" }).first()).toBeVisible();

    // Check pricing section is accessible
    await page.getByText(/25€/).first().scrollIntoViewIfNeeded();
    await expect(page.getByText(/25€/).first()).toBeInViewport();
  });
});
