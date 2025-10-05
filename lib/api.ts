/**
 * API Implementation Rules & Guidelines
 * ====================================
 * 
 * 1. ENVIRONMENT SWITCHING
 *    - Development: Uses mock-api server (localhost:3001)
 *    - Production: Uses Next.js API routes (/api/*)
 *    - Automatic switching via NODE_ENV
 * 
 * 2. ERROR HANDLING
 *    - All API functions must use try-catch blocks
 *    - Throw descriptive Error objects
 *    - API routes return { error: string } with 500 status on failure
 * 
 * 3. INTERFACE REQUIREMENTS
 *    - All data structures must have TypeScript interfaces
 *    - Interfaces must be exported for component usage
 *    - Use consistent naming: Entity + optional suffix (e.g., Box, ContactFormData)
 * 
 * 4. FUNCTION NAMING
 *    - GET operations: get[Entity]s() or fetch[Entity]s()
 *    - POST operations: submit[Entity]() or create[Entity]()
 *    - PUT operations: update[Entity]()
 *    - DELETE operations: delete[Entity]()
 * 
 * 5. API ROUTE STRUCTURE
 *    - Routes: /api/[entity]/route.ts
 *    - Export named functions: GET, POST, PUT, DELETE
 *    - Use NextResponse.json() for responses
 *    - Include error handling with console.error()
 * 
 * 6. MOCK DATA ALIGNMENT
 *    - mock-api/db.json must match production API responses
 *    - Use same data structure in both environments
 *    - Keep mock data realistic and up-to-date
 * 
 * 7. RESPONSE FORMAT
 *    - Success: Return data directly or { data: [...] }
 *    - Error: { error: "Error message" } with appropriate HTTP status
 *    - Include timestamps where relevant (createdAt, updatedAt)
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  size: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: number;
  createdAt: string;
}

export interface Box {
  id: string;
  size: string;
  price: number;
  available: boolean;
  description: string;
  popular?: boolean;
  icon?: string;
  currency?: string;
}

const API_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "/api";

/**
 * Submit contact form data
 * @param data - Contact form data
 * @returns Promise<ContactSubmission> - Submitted data with ID and timestamp
 * @throws Error if submission fails
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactSubmission> {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit contact form");
    }

    return response.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw new Error("Failed to submit contact form");
  }
}

/**
 * Fetch available storage boxes
 * @returns Promise<Box[]> - Array of available boxes
 * @throws Error if fetch fails
 */
export async function getBoxes(): Promise<Box[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/boxes`, {
      cache: 'no-store' // Always fetch fresh data for availability
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch boxes");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching boxes:", error);
    throw new Error("Failed to fetch boxes");
  }
}
