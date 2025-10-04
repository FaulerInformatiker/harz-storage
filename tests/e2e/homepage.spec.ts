import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display all main sections", async ({ page }) => {
    await page.goto("/");

    // Hero section
    await expect(
      page.getByRole("heading", { name: /LAGER RAUM in Langelsheim/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Jetzt Lager anfragen/ }),
    ).toBeVisible();

    // Advantages section
    await expect(
      page.getByRole("heading", { name: /Warum HarzStorage/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "24/7 Zugang" }),
    ).toBeVisible();

    // Pricing section
    await expect(
      page.getByRole("heading", { name: /Größen & Preise/ }),
    ).toBeVisible();
    await expect(page.getByText("25€/Monat", { exact: true })).toBeVisible();

    // Contact section
    await expect(
      page.getByRole("heading", { name: /Kontakt & Anfrage/ }),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Name/ })).toBeVisible();
  });

  test("should have working contact form", async ({ page }) => {
    await page.goto("/");

    // Scroll to contact form
    await page
      .getByRole("heading", { name: /KONTAKT & ANFRAGE/ })
      .scrollIntoViewIfNeeded();

    // Fill out form
    await page.getByRole("textbox", { name: /Name/ }).fill("Test User");
    await page
      .getByRole("textbox", { name: /E-Mail/ })
      .fill("test@example.com");
    await page
      .getByRole("textbox", { name: /Telefonnummer/ })
      .fill("123456789");
    await page
      .getByRole("combobox", { name: /Gewünschte Boxgröße/ })
      .selectOption("5m²");
    await page.getByRole("textbox", { name: /Nachricht/ }).fill("Test message");

    // Submit form (will show alert in current implementation)
    await page.getByRole("button", { name: /Anfrage senden/ }).click();

    // Check for alert
    page.on("dialog", (dialog) => dialog.accept());
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check mobile layout
    await expect(
      page.getByRole("heading", { name: /LAGER RAUM in Langelsheim/ }),
    ).toBeVisible();
    await expect(
      page.locator('.flex.space-x-1 button:has-text("DE")'),
    ).toBeVisible();

    // Check navigation works on mobile
    await page.getByRole("link", { name: /Preise ansehen/ }).click();
    await expect(
      page.getByRole("heading", { name: /Größen & Preise/ }),
    ).toBeInViewport();
  });
});
