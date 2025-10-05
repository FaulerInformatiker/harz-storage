import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display all main sections", async ({ page }) => {
    await page.goto("/");

    // Hero section - use first occurrence
    await expect(page.getByText(/Langelsheim/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Box anfragen|Request/ })).toBeVisible();

    // Advantages section
    await expect(page.getByText(/24\/7 Zugang|24\/7 Access/)).toBeVisible();

    // Pricing section
    await expect(page.getByText(/25€/)).toBeVisible();

    // Contact section
    await expect(page.getByText(/Kontakt|Contact/).first()).toBeVisible();
    await expect(page.locator("input[placeholder*='Name']")).toBeVisible();
  });

  test("should have working contact form", async ({ page }) => {
    await page.goto("/");

    // Fill out form using specific selectors
    await page.locator("input[placeholder*='Name']").fill("Test User");
    await page.locator("input[type='email']").fill("test@example.com");
    await page.locator("input[placeholder*='Telefon']").fill("123456789");
    await page.locator("select").selectOption("5m²");
    await page.locator("textarea").fill("Test message");

    // Submit form
    await page.getByRole("button", { name: /senden|Send/ }).click();

    // Check for response
    await expect(page.locator("body")).toContainText(/wird gesendet|sending|erfolgreich|success/, { timeout: 10000 });
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check mobile layout
    await expect(page.getByText(/Langelsheim/)).toBeVisible();
    await expect(page.getByText("DE")).toBeVisible();

    // Check pricing section is accessible
    await page.getByText(/25€/).scrollIntoViewIfNeeded();
    await expect(page.getByText(/25€/)).toBeInViewport();
  });
});
