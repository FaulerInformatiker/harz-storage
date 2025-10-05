# API Implementation Guidelines

## Overview
This document defines the standards and patterns for implementing APIs in the HarzStorage application.

## Architecture

### Environment Switching
```typescript
const API_BASE_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:3001"  // Mock API server
  : "/api";                  // Next.js API routes
```

### File Structure
```
lib/
  api.ts                 # Main API functions and interfaces
app/api/
  [entity]/
    route.ts            # Next.js API route handlers
mock-api/
  db.json               # Mock data for development
```

## Implementation Rules

### 1. TypeScript Interfaces
- **MUST** define interfaces for all data structures
- **MUST** export interfaces for component usage
- **SHOULD** use descriptive names (Entity + suffix)

```typescript
export interface ContactFormData {
  name: string;
  email: string;
  // ... other fields
}

export interface ContactSubmission extends ContactFormData {
  id: number;
  createdAt: string;
}
```

### 2. Function Naming Convention
- **GET**: `get[Entity]s()` or `fetch[Entity]s()`
- **POST**: `submit[Entity]()` or `create[Entity]()`
- **PUT**: `update[Entity]()`
- **DELETE**: `delete[Entity]()`

```typescript
// ✅ Good
export async function getBoxes(): Promise<Box[]>
export async function submitContactForm(data: ContactFormData): Promise<ContactSubmission>

// ❌ Bad
export async function fetchData(): Promise<any>
export async function postForm(data: any): Promise<any>
```

### 3. Error Handling
All API functions **MUST** include proper error handling:

```typescript
export async function getBoxes(): Promise<Box[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/boxes`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch boxes");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching boxes:", error);
    throw new Error("Failed to fetch boxes");
  }
}
```

### 4. API Route Implementation
Next.js API routes **MUST** follow this pattern:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Your logic here
    const data = [...];
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Descriptive error message" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Process data
    const result = { id: "...", ...data, createdAt: new Date().toISOString() };
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Descriptive error message" },
      { status: 500 }
    );
  }
}
```

### 5. Mock Data Alignment
Mock API data **MUST** match production API structure:

```json
// mock-api/db.json
{
  "boxes": [
    {
      "id": "5m2",
      "size": "5m²",
      "price": 25,
      "available": true,
      "description": "Perfect for boxes and small items"
    }
  ]
}
```

### 6. Response Formats

#### Success Responses
```typescript
// Simple data return
return NextResponse.json(boxes);

// With metadata (if needed)
return NextResponse.json({
  data: boxes,
  total: boxes.length,
  timestamp: new Date().toISOString()
});
```

#### Error Responses
```typescript
return NextResponse.json(
  { error: "Descriptive error message" },
  { status: 500 }
);
```

### 7. Caching Strategy
```typescript
// For dynamic data (availability, etc.)
const response = await fetch(`${API_BASE_URL}/boxes`, {
  cache: 'no-store'
});

// For static data
const response = await fetch(`${API_BASE_URL}/static-data`);
```

## Usage Examples

### Component Usage
```typescript
import { getBoxes, submitContactForm, type Box, type ContactFormData } from "@/lib/api";

// In component
const [boxes, setBoxes] = useState<Box[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadBoxes = async () => {
    try {
      const data = await getBoxes();
      setBoxes(data);
    } catch (error) {
      console.error("Failed to load boxes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  loadBoxes();
}, []);
```

### Form Submission
```typescript
const handleSubmit = async (formData: ContactFormData) => {
  try {
    setLoading(true);
    const result = await submitContactForm(formData);
    setSuccess(true);
    console.log("Submitted:", result);
  } catch (error) {
    setError("Failed to submit form");
  } finally {
    setLoading(false);
  }
};
```

## Testing

### Development Testing
1. Start mock API: `npm run mock-api`
2. Start dev server: `npm run dev`
3. Test endpoints at `http://localhost:3001/[entity]`

### Production Testing
1. Build application: `npm run build`
2. Start production server: `npm run start`
3. Test endpoints at `http://localhost:3000/api/[entity]`

## Security Considerations

1. **Input Validation**: Always validate input data
2. **Sanitization**: Sanitize user inputs before processing
3. **Error Messages**: Don't expose sensitive information in error messages
4. **Rate Limiting**: Consider implementing rate limiting for production
5. **CORS**: Configure CORS appropriately for production

## Migration Guide

When adding new APIs:

1. Define TypeScript interface in `lib/api.ts`
2. Implement API function with proper error handling
3. Create Next.js API route in `app/api/[entity]/route.ts`
4. Add mock data to `mock-api/db.json`
5. Test both development and production environments
6. Update this documentation

## Common Patterns

### Pagination
```typescript
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export async function getBoxes(page = 1, limit = 10): Promise<PaginatedResponse<Box>> {
  // Implementation
}
```

### Filtering
```typescript
export interface BoxFilters {
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
}

export async function getBoxes(filters?: BoxFilters): Promise<Box[]> {
  // Implementation
}
```
