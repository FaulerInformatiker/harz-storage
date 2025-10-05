import { test, expect } from "@playwright/test";

test.describe("Language Switching", () => {
  test("should switch between German and English", async ({ page }) => {
    await page.goto("/");

    // Check default German content
    await expect(page.getByText(/Self-Storage.*Langelsheim/)).toBeVisible();
    await expect(page.getByText('Größen & Preise')).toBeVisible();

    // Switch to English - use first EN button
    await page.getByRole("button", { name: "EN" }).first().click();
    await page.waitForTimeout(1000);

    // Check English content appears
    await expect(page.getByText('Sizes & Prices')).toBeVisible();
    await expect(page.getByText('How it works')).toBeVisible();

    // Switch back to German
    await page.getByRole("button", { name: "DE" }).first().click();
    await page.waitForTimeout(1000);

    // Check German content returns
    await expect(page.getByText('Größen & Preise')).toBeVisible();
    await expect(page.getByText('So funktioniert\'s')).toBeVisible();
  });

  test("should maintain language across sections", async ({ page }) => {
    await page.goto("/");

    // Switch to English
    await page.getByRole("button", { name: "EN" }).first().click();
    await page.waitForTimeout(1000);

    // Check multiple sections have English content
    await expect(page.getByText(/Sizes.*Prices|Pricing/).first()).toBeVisible();
    await expect(page.getByText(/How.*works|How it works/i).first()).toBeVisible();
    await expect(page.getByText(/Contact.*Request|Contact|Request/i).first()).toBeVisible();
    await expect(page.getByText(/Security/i).first()).toBeVisible();
  });
});
