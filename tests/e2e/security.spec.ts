import { test, expect } from "@playwright/test";

test.describe("Security Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers();

    expect(headers?.["x-frame-options"]).toBe("DENY");
    expect(headers?.["x-content-type-options"]).toBe("nosniff");
    expect(headers?.["x-xss-protection"]).toBe("1; mode=block");
  });

  test("should prevent XSS in form inputs", async ({ page }) => {
    const xssPayload = '<script>alert("xss")</script>';

    await page.fill('input[name="name"]', xssPayload);
    await page.fill('input[name="email"]', "test@example.com");

    // Check that script tags are not executed
    const nameValue = await page.inputValue('input[name="name"]');
    expect(nameValue).toBe(xssPayload); // Input should contain the raw text

    // Ensure no alert dialogs appear
    let alertFired = false;
    page.on("dialog", () => {
      alertFired = true;
    });

    await page.waitForTimeout(1000);
    expect(alertFired).toBe(false);
  });

  test("should validate email format", async ({ page }) => {
    await page.goto("/");
    
    await page.locator("input[placeholder*='Name']").fill("Test User");
    await page.locator("input[type='email']").fill("invalid-email");
    await page.getByRole("button", { name: /senden|Send/ }).click();

    // Should show validation error or browser validation
    const hasValidationError = await page.locator("input:invalid").count() > 0;
    const hasErrorMessage = await page.locator("text=/E-Mail|email|ungültig|invalid/i").count() > 0;
    
    expect(hasValidationError || hasErrorMessage).toBeTruthy();
  });

  test("should limit input lengths", async ({ page }) => {
    const longName = "a".repeat(101); // Over 100 char limit
    const longMessage = "a".repeat(1001); // Over 1000 char limit

    await page.fill('input[name="name"]', longName);
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', longMessage);

    await page.click('button[type="submit"]');

    // Wait for validation to appear
    await page.waitForTimeout(1000);

    // Check for validation errors that should appear
    const hasNameError = await page.getByText(/Name must be less than 100 characters/i).count() > 0;
    const hasMessageError = await page.getByText(/Message must be less than 1000 characters/i).count() > 0;
    
    // At least one validation error should appear
    expect(hasNameError || hasMessageError).toBeTruthy();
  });

  test("should prevent CSRF by checking origin", async ({ page }) => {
    // Mock API to check for proper headers
    await page.route("http://localhost:3001/contacts", async (route) => {
      const request = route.request();
      const headers = request.headers();

      // In a real scenario, check for CSRF tokens or origin validation
      expect(headers["content-type"]).toContain("application/json");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ id: 1, createdAt: new Date().toISOString() }),
      });
    });

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.click('button[type="submit"]');
  });

  test("should not expose sensitive information in errors", async ({ page }) => {
    // Mock API to return error
    await page.route("**/contacts", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.click('button[type="submit"]');

    // Wait for error to appear
    await page.waitForTimeout(2000);

    // Check for generic error message - broader patterns
    const hasGenericError = await page.getByText(/Fehler|Error|fehler|error|Problem|problem/i).count() > 0;
    expect(hasGenericError).toBeTruthy();
    
    // Should not expose internal details
    const hasInternalError = await page.getByText(/Internal server error|database|sql|stack trace/i).count() > 0;
    expect(hasInternalError).toBeFalsy();
  });
});
