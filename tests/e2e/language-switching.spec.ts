import { test, expect } from "@playwright/test";

test.describe("Language Switching", () => {
  test("should switch between German and English", async ({ page }) => {
    await page.goto("/");

    // Check default German content
    await expect(page.getByText(/Langelsheim/).first()).toBeVisible();

    // Switch to English - use first EN button
    await page.getByRole("button", { name: "EN" }).first().click();

    // Check English content appears
    await expect(page.getByText(/secure storage units|sichere Lager/)).toBeVisible();

    // Switch back to German
    await page.getByRole("button", { name: "DE" }).first().click();

    // Check German content returns
    await expect(page.getByText(/sichere Lager|Lagerboxen/)).toBeVisible();
  });

  test("should maintain language across sections", async ({ page }) => {
    await page.goto("/");

    // Switch to English
    await page.getByRole("button", { name: "EN" }).first().click();

    // Check multiple sections have English content - use first occurrence
    await expect(page.getByText(/Why HarzStorage|Warum HarzStorage/).first()).toBeVisible();
    await expect(page.getByText(/Sizes|Preise/).first()).toBeVisible();
    await expect(page.getByText(/How It Works|So funktioniert/).first()).toBeVisible();
  });
});
