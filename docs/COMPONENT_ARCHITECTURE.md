# Client-Server Component Architecture Guide

This document defines the architecture patterns for separating components into client and server parts in this Next.js application.

---

## Quick Reference

| Location | Purpose | Directive |
|----------|---------|-----------|
| `components/{page}/server/` | Static content, SEO headings, data prep | None (default) |
| `components/{page}/client/` | Animations, hooks, interactions | `"use client"` |

---

## For Developers

### When Creating New Components

1. **Start with server component** - Ask: "Can this render without React hooks or browser APIs?"
2. **Extract client parts** - Move interactive elements to `client/` subfolder
3. **Connect via imports** - Server component imports and composes client components

### File Naming Convention

```
ComponentName.tsx        → server/ComponentName.tsx
ComponentNameClient.tsx  → client/ComponentNameClient.tsx
```

### Example: Creating a "Pricing" Section

```
components/home/
├── server/Pricing.tsx          # Headings, static data
└── client/PricingClient.tsx    # Price calculator, toggle
```

```tsx
// server/Pricing.tsx
import { PricingClient } from '../client/PricingClient'
import { pricingPlans } from '@/constants/data'

export function Pricing() {
  return (
    <section>
      <h2>Flexible Pricing Plans</h2>
      <PricingClient plans={pricingPlans} />
    </section>
  )
}
```

```tsx
// client/PricingClient.tsx
"use client";
import { useState } from 'react'

export function PricingClient({ plans }) {
  const [billingCycle, setBillingCycle] = useState('monthly')
  // ... interactive UI
}
```

---

## For AI Assistants (Strict Rules)

> [!CAUTION]
> **MANDATORY**: Follow these rules exactly when modifying components.

### Rule 1: Directory Structure
```
components/
├── home/client/       # Home page client components
├── home/server/       # Home page server components  
├── about/client/      # About page client components
├── about/server/      # About page server components
├── generators/client/ # Generators page client components
├── generators/server/ # Generators page server components
└── shared/client/     # Cross-page client components
└── shared/server/     # Cross-page server components
```

### Rule 2: Import Flow (NEVER break this)
```
page.tsx → imports from → server/*.tsx → imports from → client/*.tsx
```

**CORRECT:**
```tsx
// app/page.tsx
import { Hero } from '@/components/home/server'
```

**INCORRECT:**
```tsx
// app/page.tsx
import { HeroClient } from '@/components/home/client'  // ❌ NEVER
```

### Rule 3: Server Component Rules
- NO `"use client"` directive
- NO React hooks (`useState`, `useEffect`, `useContext`, etc.)
- NO event handlers (`onClick`, `onChange`, etc.)
- NO browser APIs (`window`, `localStorage`, `document`)
- NO Framer Motion animations
- CAN import from `client/` folder
- CAN pass data as props to client components
- CAN use `children` pattern to wrap client components

### Rule 4: Client Component Rules
- MUST have `"use client"` at top of file
- MUST be in `client/` folder
- MUST NOT be imported directly by `page.tsx`
- CAN use hooks, event handlers, browser APIs
- CAN use Framer Motion
- CANNOT import server components (only receive as children)

### Rule 5: Data Handling
```tsx
// ✅ CORRECT: Static data in server, passed to client
// server/Component.tsx
import { data } from '@/constants/data'
import { ComponentClient } from '../client/ComponentClient'

export function Component() {
  return <ComponentClient items={data} />
}

// ❌ INCORRECT: Static data imported in client
// client/ComponentClient.tsx
"use client";
import { data } from '@/constants/data'  // Don't do this if avoidable
```

### Rule 6: Naming Convention
| Type | File Name | Export Name |
|------|-----------|-------------|
| Server | `Hero.tsx` | `Hero` |
| Client | `HeroClient.tsx` | `HeroClient` |

### Rule 7: Barrel Exports
Every folder MUST have an `index.ts`:

```tsx
// components/home/server/index.ts
export { Hero } from './Hero'
export { Technology } from './Technology'
// ...

// components/home/client/index.ts
export { HeroClient } from './HeroClient'
export { TechnologyClient } from './TechnologyClient'
// ...

// components/home/index.ts
export * from './server'
```

### Rule 8: SEO-Critical Elements
These MUST be in server components:
- `<h1>`, `<h2>`, `<h3>` headings
- Page title and meta description content
- Main semantic structure (`<section>`, `<article>`, `<main>`)
- Static text content

### Rule 9: Checklist Before Committing

For every component change, verify:
- [ ] Server component has NO `"use client"` 
- [ ] Server component has NO hooks
- [ ] Client component HAS `"use client"`
- [ ] Client component IS in `client/` folder
- [ ] Page imports from `server/` not `client/`
- [ ] Barrel exports updated
- [ ] No hydration errors in browser console

---

## Migration Checklist

When migrating an existing component:

1. [ ] Read current component, identify client-only code
2. [ ] Create `client/ComponentClient.tsx` with `"use client"`
3. [ ] Move hooks, event handlers, animations to client
4. [ ] Create `server/Component.tsx` (no directive)
5. [ ] Import client component in server component
6. [ ] Pass static data as props
7. [ ] Keep headings in server component
8. [ ] Update barrel exports
9. [ ] Update page imports
10. [ ] Test: `bun run dev` and check for errors
