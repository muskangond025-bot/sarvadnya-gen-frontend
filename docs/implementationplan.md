# Hero Component SEO Optimization

Restructure the Hero component to maximize server-side rendering for better SEO while preserving Framer Motion animations.

## Key Insight: Framer Motion Limitations

Framer Motion is **client-only** - it requires browser APIs and cannot run on the server. However, we can:

1. **Server-render all static content** (text, images, meta)
2. **Client-render only animation wrappers**
3. **Use CSS animations for simple effects** (server-compatible)

## Proposed Architecture

```
Hero.tsx (Server Component - no "use client")
├── HeroContent.tsx (Server) → Static text, SEO-critical h1, p tags
├── HeroStats.tsx (Server) → Static statistics
├── HeroImage.tsx (Server) → Static image with badges
├── HeroCTAs.tsx (Server) → Static buttons
│
└── Client-only wrappers:
    ├── PowerLines.tsx (Client) → SVG animations
    └── AnimatedWrapper.tsx (Client) → Optional fade-in effects
```

---

## Proposed Changes

### Hero Component

#### [MODIFY] [Hero.tsx](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx)

1. **Remove** `"use client"` from main Hero component
2. **Extract** [PowerLines](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx#36-128) to a separate client component file
3. **Keep** [HeroContent](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx#129-177), [HeroStats](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx#178-204), [HeroCTAs](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx#205-221), [HeroImage](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx#222-250) as inline server functions (no framer-motion)
4. **Import** [PowerLines](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/Hero.tsx#36-128) client component dynamically

---

#### [NEW] [PowerLines.tsx](file:///home/om_patil/Desktop/Codes/Avhad%20projects/sarvadnya-generators-frontend/src/components/sections/Hero/PowerLines.tsx)

Client component containing the PowerLines SVG animation (the only part needing Framer Motion).

---

## SEO Benefits

| Before | After |
|--------|-------|
| Full JS bundle for hero | Only PowerLines JS |
| No initial HTML for crawlers | Full static HTML |
| ~15KB JS for hero section | ~3KB JS (PowerLines only) |
| FCP delayed by hydration | Instant FCP |

---

## Verification Plan

### Visual Verification
1. Run `bun run dev`
2. Open http://localhost:3000
3. Verify Hero section renders correctly with:
   - All text visible
   - Stats visible
   - Buttons working
   - PowerLines animation running

### SSR Verification
1. View page source (Ctrl+U in browser)
2. Confirm hero text content is present in raw HTML:
   - "Power Your World with Premium Generator Rentals"
   - "5000+", "98%", "24/7"
   - "Explore Generators" button text
3. This proves content is server-rendered (SEO-visible)

