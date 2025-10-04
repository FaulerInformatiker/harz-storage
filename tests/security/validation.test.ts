import {
  validateEmail,
  validatePhone,
  validateContactForm,
  sanitizeInput,
} from "../../lib/validation";

describe("Security Validation", () => {
  describe("Email Validation", () => {
    test("should validate correct email formats", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
    });

    test("should reject invalid email formats", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("test@")).toBe(false);
      expect(validateEmail("@domain.com")).toBe(false);
      expect(validateEmail("test@domain")).toBe(false);
    });

    test("should reject overly long emails", () => {
      const longEmail = "a".repeat(250) + "@domain.com";
      expect(validateEmail(longEmail)).toBe(false);
    });
  });

  describe("Phone Validation", () => {
    test("should validate correct phone formats", () => {
      expect(validatePhone("0123456789")).toBe(true);
      expect(validatePhone("+49 123 456789")).toBe(true);
      expect(validatePhone("(0123) 456-789")).toBe(true);
    });

    test("should reject invalid phone formats", () => {
      expect(validatePhone("abc123")).toBe(false);
      expect(validatePhone("123")).toBe(false);
      expect(validatePhone("12345678901234567890")).toBe(false);
    });
  });

  describe("Input Sanitization", () => {
    test("should sanitize XSS attempts", () => {
      const maliciousInput = '<script>alert("xss")</script>Hello';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).not.toContain("<script>");
      expect(sanitized).toContain("Hello");
    });

    test("should trim whitespace", () => {
      expect(sanitizeInput("  test  ")).toBe("test");
    });

    test("should handle HTML entities", () => {
      const input = '<img src="x" onerror="alert(1)">';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain("onerror");
    });
  });

  describe("Contact Form Validation", () => {
    test("should validate complete valid form", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "0123456789",
        size: "10m²",
        message: "Test message",
      };
      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("should reject form with missing required fields", () => {
      const invalidData = {
        name: "",
        email: "invalid-email",
        phone: "123",
        message: "a".repeat(1001),
      };
      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test("should reject overly long inputs", () => {
      const invalidData = {
        name: "a".repeat(101),
        email: "test@example.com",
        message: "a".repeat(1001),
      };
      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Name must be less than 100 characters");
      expect(result.errors).toContain(
        "Message must be less than 1000 characters",
      );
    });
  });
});
