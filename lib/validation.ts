export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): boolean {
  // Safe email regex pattern
  const emailRegex =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validatePhone(phone: string): boolean {
  // Safe phone regex pattern
  // eslint-disable-next-line security/detect-unsafe-regex
  const phoneRegex = /^[+]?[0-9\s\-()]{7,15}$/;
  return phoneRegex.test(phone);
}

export function sanitizeInput(input: string): string {
  // Basic sanitization without DOMPurify for SSR compatibility
  return input
    .trim()
    // eslint-disable-next-line security/detect-unsafe-regex
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    // eslint-disable-next-line security/detect-unsafe-regex
    .replace(/on\w+\s*=/gi, "");
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  size?: string;
  message?: string;
}): ValidationResult {
  const errors: string[] = [];

  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  if (data.name && data.name.length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  // Optional fields validation
  if (data.phone && !validatePhone(data.phone)) {
    errors.push("Invalid phone number format");
  }

  if (data.message && data.message.length > 1000) {
    errors.push("Message must be less than 1000 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
