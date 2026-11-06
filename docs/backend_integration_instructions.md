# Backend API Integration Instructions for Frontend

> [!CAUTION]
> ## ⚠️ CRITICAL: BACKEND MODIFICATION POLICY
> 
> **THE BACKEND MUST NOT BE CHANGED WITHOUT EXPLICIT USER APPROVAL.**
> 
> If you need to modify any file in `sarvadnya-generators-backend/`:
> 1. **STOP** — Do not proceed
> 2. **INFORM** — Explain what change is needed and why
> 3. **WAIT** — Get explicit user approval
> 4. **PROCEED** — Only after user confirms

---

## 1. Environment Setup

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
```

---

## 2. Getting Type Declarations from Backend

### Step 1: Locate Backend Feature

```
sarvadnya-generators-backend/src/features/
├── product/         ← Products, Categories, Pricing
├── booking/         ← Bookings, Rental items
├── user/            ← User profiles
├── employee/        ← Staff management
└── [feature]/       ← Other features
```

### Step 2: Find Response Interface

Each API file contains a response interface:

```typescript
// Backend file: features/[feature]/apis/[endpoint].ts

interface ResponseTypeName {  // ← Copy this
  id: string;
  ...
}
```

### Step 3: Copy to Frontend

```
sarvadnya-generators-frontend/src/lib/api/types.ts
```

---

## 3. Discovering API Endpoints

### Method 1: Feature Index File

Check `src/features/[feature]/index.ts` for all routes.

### Method 2: Individual API Files

Each file in `apis/` folder shows:
- **Route path** — `router.get('/path', handler)`
- **Validation** — Zod schema for params
- **Auth requirement** — `requireAuth` middleware
- **Response type** — Interface definition

### Method 3: Test with cURL

```bash
# Public endpoint
curl http://localhost:8000/api/[feature]/[path]

# Authenticated endpoint
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/[feature]/[path]
```

---

## 4. Backend Response Format

All responses follow this structure:

```typescript
// Success
{
  "success": true,
  "message": "Description",
  "data": T | T[],
  "pagination"?: { page, limit, total, totalPages, hasNext, hasPrev }
}

// Error
{
  "success": false,
  "message": "Error description",
  "error": "Details"
}
```

---

## 5. Creating API Client Functions

```typescript
// src/lib/api/[feature].ts

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getItems<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<BackendResponse<T>> {
  const searchParams = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
  }
  
  const url = `${BACKEND_URL}/api/${endpoint}?${searchParams}`;
  const response = await fetch(url);
  
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
```

---

## 6. Authenticated Requests

```typescript
import { createClient } from '@/lib/supabase/client';

async function fetchWithAuth<T>(endpoint: string): Promise<T> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.access_token && { 
        'Authorization': `Bearer ${session.access_token}` 
      }),
    },
  });
  
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
```

---

## 7. Common Issues

| Issue | Solution |
|-------|----------|
| CORS error | Backend already configured; check URL |
| 401 on public endpoint | Verify no `requireAuth` in route |
| Type mismatch | Re-copy interface from backend |
| Empty response | Check backend filter conditions |

---

## 8. Recommended Structure

```
src/lib/api/
├── index.ts          # Barrel exports
├── types.ts          # All interfaces
├── products.ts       # Product endpoints
├── bookings.ts       # Booking endpoints
└── [feature].ts      # Other features

src/hooks/
├── useProducts.ts
├── useBookings.ts
└── use[Feature].ts
```

---

## 9. Integration Checklist

- [ ] Find API file in `backend/src/features/*/apis/`
- [ ] Check auth requirement (`requireAuth`)
- [ ] Copy response interface to frontend types
- [ ] Create fetch function in `src/lib/api/`
- [ ] Create React hook if needed
- [ ] Handle loading and error states
- [ ] Test via Network tab
