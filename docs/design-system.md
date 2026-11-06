# `design-system.md` — Fluid Design System & Responsive Redesign

## 1. Purpose

This document defines the visual foundation, typography, fluid spacing, responsive behavior, component styling, accessibility standards, and animation rules for the existing generator rental website.

The objective is to transform the current website into a premium, modern, industrial-focused digital experience while preserving its working functionality.

The visual direction should feel:
- Premium and professionally designed.
- Minimal, confident, and contemporary.
- Industrial without looking heavy or outdated.
- Bright, warm, and visually distinctive.
- Responsive across phones, tablets, laptops, desktop monitors, and large screens.
- Smooth and interactive without unnecessary animation or performance problems.

**Core principle: Build one adaptive design system, not separate fixed designs for individual devices.**

This is a design specification for an existing website redesign. It is not permission to replace the application architecture or rebuild working features unnecessarily.

---

## 2. Mandatory Existing Website Audit

Before modifying the design, inspect the existing codebase.

Review:
- Framework, build system, routing, and project structure.
- Existing global styles, CSS variables, Tailwind configuration, or equivalent styling system.
- Typography, colors, spacing, and component conventions.
- Existing header, navigation, footer, cards, forms, buttons, and page layouts.
- Current responsive breakpoints and mobile navigation.
- Animation libraries, custom transitions, scroll effects, and interactive components.
- Images, icons, fonts, and other assets.
- Forms, API connections, authentication, analytics, SEO metadata, and third-party integrations where applicable.
- Current Git changes and any unfinished work.

Create a concise implementation plan identifying:
1. What can be reused.
2. What needs visual refinement.
3. What needs a responsive redesign.
4. What animation issues need fixing.
5. What functionality must remain unchanged.

Do not blindly replace the current CSS, delete existing components, or introduce a new framework before assessing the existing implementation.

Preserve the current functionality unless a change is necessary and justified.

---

## 3. Brand Color System — Energy Orange

Use the selected third palette as the foundation for the entire website.

### Core palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary background | Soft Ivory | `#FFF7EB` | Main page background |
| Structural color | Charcoal | `#2B2B2B` | Headings, navigation, footer, dark surfaces |
| Accent color | Power Orange | `#FF8A00` | Primary CTAs, selected highlights, interactive emphasis |

### 60/30/10 visual guideline

**60% — Soft Ivory `#FFF7EB`**

Use for the dominant page surfaces, content backgrounds, and spacious layouts.

**30% — Charcoal `#2B2B2B`**

Use for typography, structural elements, selected dark sections, navigation treatments, and contrast.

**10% — Power Orange `#FF8A00`**

Reserve for meaningful highlights, primary actions, selected states, and restrained decorative accents.

These proportions are visual guidance, not rigid calculations. Actual usage should adapt to the existing website and its content.

### Supporting neutral colors

Introduce additional neutral shades only when necessary for legibility, subtle borders, and component hierarchy.

```css
:root {
  --color-bg: #FFF7EB;
  --color-structure: #2B2B2B;
  --color-accent: #FF8A00;

  --color-surface: #FFFFFF;
  --color-surface-muted: #F4EDE2;
  --color-text-primary: #2B2B2B;
  --color-text-secondary: #625D55;
  --color-border: #DED5C8;

  --color-on-dark: #FFF7EB;
  --color-on-accent: #2B2B2B;
}
```

Validate the supporting shades against the actual design. Avoid introducing several unrelated colors that weaken the brand identity.

### Color implementation rules

- Use CSS variables or the project's equivalent central token system.
- Do not hardcode different shades of orange throughout individual components.
- Maintain readable contrast for text, buttons, and controls.
- Use dark text on the orange primary CTA by default.
- Verify the contrast of orange with white or ivory before using it for text.
- Use clear focus states and distinct hover states.
- Do not turn every card, icon, border, and heading orange.
- Do not force every page into a dark industrial theme.
- Keep the overall design light, refined, and premium.

### Example primary button

```css
.button-primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
  border: 1px solid transparent;
}
```

Use the existing component architecture where possible rather than duplicating button implementations.

---

## 4. Typography System — Manrope

**Selected typeface: Manrope**

Use Manrope as the primary typeface throughout the website for headings, paragraphs, navigation, buttons, forms, labels, and supporting text.

Official font source: https://fonts.google.com/specimen/Manrope

### Font weights

| Weight | Usage |
|---|---|
| 300 — Light | Large display headings where readability is maintained |
| 400 — Regular | Paragraphs and general content |
| 500 — Medium | Navigation, labels, and secondary emphasis |
| 600 — Semibold | Buttons, card headings, and important UI elements |
| 700 — Bold | Strong emphasis where the content requires it |

Load only the font weights that are actually needed. Prefer the project's existing font-loading method, and avoid loading duplicate font files.

### Fluid typography

Typography must scale with available space. Do not use one fixed font size for every screen.

Use CSS `clamp()` with viewport-relative sizing and sensible minimum and maximum values.

```css
:root {
  --text-display:
    clamp(2.5rem, 1.45rem + 4.2vw, 6rem);

  --text-h1:
    clamp(2.25rem, 1.45rem + 2.8vw, 4.5rem);

  --text-h2:
    clamp(1.85rem, 1.35rem + 1.8vw, 3rem);

  --text-h3:
    clamp(1.35rem, 1.1rem + 0.8vw, 2rem);

  --text-body-lg:
    clamp(1.0625rem, 1rem + 0.25vw, 1.25rem);

  --text-body: 1rem;
  --text-small: 0.875rem;
}
```

These are initial design tokens, not immutable final measurements. Validate them against actual headings, line lengths, and the existing page layouts.

### Typography rules

- Use restrained, premium heading weights.
- Avoid excessively bold headings across every section.
- Use a clear hierarchy between display headings, section headings, body copy, and labels.
- Keep body text comfortable to read on small screens.
- Apply responsive line heights and heading widths.
- Use `text-wrap: balance` for suitable headings where supported.
- Avoid forcing headings into awkward line breaks.
- Avoid letter spacing that damages readability.
- Use uppercase text sparingly for small eyebrow labels.
- Ensure long words, phone numbers, form labels, and buttons do not overflow.

Example:

```css
body {
  font-family: "Manrope", sans-serif;
  font-size: var(--text-body);
  line-height: 1.65;
  color: var(--color-text-primary);
}

h1,
h2,
h3 {
  line-height: 1.12;
  letter-spacing: -0.035em;
  font-weight: 500;
}

h1 {
  font-size: var(--text-h1);
  max-width: 16ch;
  text-wrap: balance;
}

p {
  max-width: 68ch;
}
```

Adjust heading width and letter spacing based on the actual font rendering and component layout.

---

## 5. Fluid Spacing System

**Do not treat spacing as a fixed pixel specification.**

Section padding, component gaps, card padding, and content spacing should adapt to available screen space.

Use a combination of `clamp()`, relative units, CSS Grid, Flexbox, and intrinsic sizing.

### Fluid spacing tokens

```css
:root {
  --space-1: clamp(0.25rem, 0.2rem + 0.15vw, 0.375rem);
  --space-2: clamp(0.5rem, 0.4rem + 0.25vw, 0.75rem);
  --space-3: clamp(0.75rem, 0.6rem + 0.35vw, 1rem);
  --space-4: clamp(1rem, 0.8rem + 0.5vw, 1.5rem);
  --space-5: clamp(1.25rem, 0.9rem + 0.8vw, 2rem);
  --space-6: clamp(1.5rem, 1rem + 1.2vw, 2.5rem);
  --space-7: clamp(2rem, 1.3rem + 1.8vw, 3.5rem);
  --space-8: clamp(2.5rem, 1.5rem + 2.8vw, 5rem);
  --space-9: clamp(3rem, 1.8rem + 3.5vw, 6rem);

  --page-gutter:
    clamp(1rem, 4vw, 4rem);

  --section-space:
    clamp(3.5rem, 7vw, 7.5rem);

  --content-max: 88rem;
}
```

Use these as a starting scale. Add or adjust tokens only when the existing component system needs a meaningful additional spacing level.

### Spacing rules

- Use tokens instead of repeatedly inventing unrelated spacing values.
- Keep related content closer together than unrelated sections.
- Let section padding increase gradually on wider screens.
- Reduce excessive gaps on phones.
- Avoid giant empty spaces caused by fixed section heights.
- Avoid excessive vertical scrolling caused by oversized cards or animation timing.
- Use `gap` for component spacing rather than relying on fragile margin combinations.
- Use `margin-inline: auto` for centered content.
- Use `min-width: 0` on appropriate flex and grid children to prevent overflow.
- Use intrinsic content sizing where practical.
- Avoid using viewport height as the only determinant of a section's height.

Example:

```css
.section {
  padding-block: var(--section-space);
  padding-inline: var(--page-gutter);
}

.container {
  width: 100%;
  max-width: var(--content-max);
  margin-inline: auto;
}
```

The objective is proportional spacing that remains balanced on every supported screen size.

---

## 6. Responsive Design Philosophy

Responsive behavior must be fluid and content-driven.

Do not design only for a particular iPhone, tablet, laptop, or desktop resolution. The website must adapt to the space available between those device categories as well.

### Required device coverage

| Environment | Design expectation |
|---|---|
| Small phones | Compact layouts, readable text, easy-to-use controls |
| Large phones | Improved content width without stretching elements |
| Tablets | Adaptive columns and appropriate navigation |
| Small laptops | Efficient use of vertical and horizontal space |
| Standard desktops | Balanced layouts with clear visual hierarchy |
| Large desktops | Controlled content width and proportionate spacing |
| Touch devices | Comfortable touch targets and no hover-only interactions |
| Keyboard navigation | Visible focus and logical interaction order |

### Responsive breakpoints

Use the existing project's breakpoint system if it is coherent. Otherwise, start with these general layout breakpoints:

```css
/* Base styles: small screens first */

@media (min-width: 40rem) {
  /* Wider phones and compact tablets */
}

@media (min-width: 48rem) {
  /* Tablet and intermediate layouts */
}

@media (min-width: 64rem) {
  /* Laptop and desktop layouts */
}

@media (min-width: 80rem) {
  /* Wider desktop refinements */
}
```

These breakpoints are starting points, not device-specific rules. Introduce additional breakpoints only when the content or component layout requires them.

### Responsive rules

- Build mobile-first where compatible with the existing architecture.
- Prefer `minmax()`, `auto-fit`, `auto-fill`, `min()`, `max()`, and `clamp()`.
- Use media queries for meaningful layout changes, not every small spacing adjustment.
- Do not create separate desktop and mobile versions of the entire website without a clear technical reason.
- Prevent horizontal page overflow.
- Ensure content remains usable at browser zoom and increased text sizes.
- Test both portrait and landscape orientations where relevant.
- Do not rely on hover to reveal essential content.
- Ensure mobile navigation, dropdowns, accordions, and forms are usable with touch and keyboard input.
- Avoid fixed-width cards and rigid multi-column layouts that break between breakpoints.
- Keep decorative elements from covering text or interactive controls.

### Fluid grid example

```css
.service-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: clamp(1rem, 2.5vw, 2rem);
}
```

Use this pattern where an auto-adjusting card grid suits the existing layout. Do not force it onto components that require a different composition.

---

## 7. Layout and Content Width

Establish a consistent alignment system throughout the website.

### Rules

- Use a central container for main content.
- Allow hero sections and selected backgrounds to extend full width when appropriate.
- Keep body copy at a comfortable reading width.
- Use consistent page gutters across related sections.
- Let grids adapt to content and screen size.
- Avoid stretching text and cards across very wide screens.
- Keep important CTAs visually associated with the content they belong to.
- Avoid arbitrary absolute positioning for core layout elements.

### Hero section

The hero should be visually distinctive without becoming oversized on smaller screens.

- Use a responsive heading.
- Allow the supporting paragraph to wrap naturally.
- Keep the main CTA easy to locate.
- Stack CTAs when horizontal space is insufficient.
- Ensure important content remains visible without clipping.
- Use a flexible layout for text and genuine equipment imagery.
- Do not force a fixed hero height when the content needs more space.

### Card system

Cards should share consistent internal spacing, radius, border treatment, and typography.

Use a restrained corner radius, subtle borders, and carefully selected backgrounds. Avoid unnecessary shadows, excessive gradients, and decorative effects on every card.

Cards must adapt to their contents rather than forcing every item into a rigid height.

Use equal-height grid rows where they improve visual consistency, while preserving readable content and accessible controls.

### Anti-Clutter Design Rules (Zero Badge Pills, Zero Capsules, Zero Subtext Bloat)

To maintain an Awwwards-level, high-end industrial engineering aesthetic:
- **No badge pills or capsule tags**: Never wrap section eyebrows, status indicators, or category tags in `rounded-full` pill boxes (`rounded-full bg-orange-100 text-orange-600 px-3 py-1`). Eyebrows must be clean, unboxed typography with subtle tracking.
- **No decorative numbers**: Never place oversized watermark numerals ("01", "02") in card backgrounds or section headers. Numbering is reserved strictly for genuine sequential workflows and rendered with understated inline typography.
- **No subtext bloat**: Eliminate filler explanations, secondary subtitles, and redundant microcopy under buttons or headings. Keep supporting descriptions to 1–2 crisp, high-signal sentences. Omit descriptions entirely when headings are self-explanatory.
- **Clean specification metadata**: Present generator technical attributes (kVA, fuel type, phase, canopy) as clean typographic lines or structured key-value tables, never as a cluttered cloud of colored pill tags.
- **Zero clipping rule**: Not a single text, design element, button, card, or border may ever be cut off or clipped across any device or screen width.
- **Absolute visibility rule**: Every text element, design asset, and button must remain 100% visible and legible. Nothing may be hidden by failed animation opacities, z-index overlays, or poor color contrast.
- **Zero overlapping rule**: No text, button, card, heading, or navigation element may unintentionally collide or overlap with adjacent content across any screen size or browser zoom level.

---

## 8. Component Design Standards

Use the existing reusable components when possible. Improve their styling centrally instead of introducing duplicate implementations.

### Buttons

- Establish consistent primary, secondary, and text-button styles.
- Use orange for the primary action.
- Use charcoal and ivory for supporting actions where appropriate.
- Provide hover, focus-visible, active, disabled, and loading states when relevant.
- Keep text readable and avoid clipped labels.
- Use flexible horizontal padding.
- Provide comfortable touch targets; aim for approximately 44 × 44 CSS pixels for primary interactive targets where practical.
- Ensure the button performs the action its label promises.

### Navigation

- Maintain clear visual hierarchy.
- Make mobile navigation fully functional.
- Ensure menus can be opened and closed with a keyboard and touch.
- Provide visible focus indicators.
- Prevent navigation items from overflowing at intermediate widths.
- Avoid scroll-lock or menu state bugs.
- Preserve existing routes and navigation destinations.

### Forms

- Use explicit labels and clear input states.
- Support keyboard navigation and appropriate autocomplete.
- Provide helpful validation messages.
- Make errors distinguishable without relying on color alone.
- Ensure focused inputs remain visible when the mobile keyboard opens.
- Preserve existing form integrations and backend submission behavior.

### Images

- Prefer genuine generator and project imagery.
- Use appropriate `object-fit` and `object-position`.
- Define aspect ratios when they improve layout stability.
- Reserve image space to reduce layout shifts.
- Use responsive image sizes and modern formats where the existing pipeline supports them.
- Avoid loading unnecessarily large assets on mobile.
- Provide meaningful alt text for informative images and empty alt text for purely decorative images.

### Icons

- Use a consistent icon library or the existing icon system.
- Keep stroke weight and visual size consistent.
- Avoid mixing unrelated icon styles.
- Give icon-only interactive controls accessible names.
- Do not use icons as substitutes for important explanatory content.

---

## 9. Animation and Motion System

Animations are part of the redesign and must be reviewed, implemented, and tested as part of the overall design system.

The objective is premium, purposeful motion with smooth transitions and reliable behavior across devices.

**No animation should be allowed to break navigation, content visibility, scrolling, forms, or page performance.**

### Motion principles

- Prioritise clarity over spectacle.
- Use animation to reveal hierarchy, communicate state, or add subtle depth.
- Keep movement controlled and natural.
- Avoid unnecessary animation on every element.
- Do not add effects simply to make the website appear more advanced.
- Preserve immediate access to essential content and controls.
- Prefer short, intentional transitions over long, scroll-heavy sequences.

### Motion tokens

```css
:root {
  --motion-fast: 160ms;
  --motion-standard: 240ms;
  --motion-emphasis: 400ms;

  --ease-standard: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
}
```

These are baseline values. Select duration and easing based on the actual interaction rather than applying the same animation everywhere.

### Suitable animation patterns

**1. Button interaction**

Use a subtle color transition and small visual response on hover and active states. Avoid large movement or exaggerated scaling.

**2. Card interaction**

Use restrained border, shadow, or transform changes where they help communicate interactivity. On touch devices, essential content must remain visible without hover.

**3. Section entrance**

Use subtle opacity and short-distance movement when content enters the viewport. Keep the movement small and avoid delaying important information.

**4. Image reveal**

Use a restrained mask or opacity transition only if it improves the presentation and does not cause clipping or layout shifts.

**5. Navigation**

Use short transitions for dropdowns and mobile menus. Opening and closing must remain reliable even during rapid interaction.

**6. Decorative industrial motion**

If the existing design includes a generator-related 3D object, fluid background, or other ambient visual, keep it lightweight and secondary to the content. Ensure it does not obscure text, block pointer events, or interfere with scrolling.

### Animation implementation requirements

- Inspect existing animation libraries and utilities before introducing dependencies.
- Reuse existing GSAP, Framer Motion, CSS transitions, or other libraries when appropriate.
- Do not introduce multiple animation libraries for overlapping tasks without a clear need.
- Animate opacity and transforms where possible instead of continuously animating layout dimensions.
- Use `IntersectionObserver` for scroll-triggered effects where suitable.
- Avoid excessive event listeners, repeated layout calculations, and unnecessary React renders.
- Clean up observers, event listeners, animation contexts, and timelines when components unmount.
- Prevent duplicate animation triggers during route changes or component remounts.
- Avoid animations that leave elements permanently invisible when JavaScript fails.
- Ensure content remains available when animation initialization fails.
- Do not use scroll hijacking.
- Do not make ordinary content dependent on long scroll distances.
- Avoid rapid flashing, excessive parallax, and distracting continuous motion.

### Reduced motion

Respect the user's system-level reduced-motion preference.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Treat this as a baseline, not a substitute for reviewing JavaScript animations, smooth-scrolling libraries, video backgrounds, or WebGL motion separately.

For JavaScript-driven animation, detect the preference and disable or simplify nonessential motion. Ensure important content and state changes remain understandable.

### Mobile motion

- Reduce unnecessary decorative movement on low-powered devices.
- Avoid effects that cause jank during touch scrolling.
- Do not assume that touch devices can hover.
- Prevent animated elements from extending beyond the viewport.
- Keep primary actions responsive even while decorative animation is running.
- Avoid using continuous animation when a static visual provides the same benefit.

### Animation quality target

Aim for a smooth experience under normal supported conditions, ideally around 60 frames per second where practical. This is a performance target, not a guarantee for every device.

Do not sacrifice usability, battery life, accessibility, or stability to achieve a visual effect.

---

## 10. Accessibility and Usability

Follow WCAG 2.2 AA as the accessibility target wherever applicable.

### Requirements

- Use semantic HTML.
- Maintain sufficient text and interface contrast.
- Ensure interactive elements have visible focus states.
- Support keyboard navigation.
- Provide accessible labels and names.
- Use correct heading order.
- Make form errors identifiable and understandable.
- Avoid conveying information through color alone.
- Respect reduced-motion preferences.
- Ensure touch targets are sufficiently large and appropriately spaced.
- Preserve meaningful reading order across responsive layouts.
- Do not hide essential content behind hover-only interactions.
- Ensure menus, modals, and accordions support appropriate keyboard behavior.

Run automated accessibility checks where available, then manually inspect keyboard operation and important user journeys.

---

## 11. Performance and Stability

The redesigned website should remain fast and reliable across devices and network conditions.

### Performance rules

- Avoid adding dependencies without a clear benefit.
- Load only required font weights.
- Use optimized, responsive images.
- Lazy-load below-the-fold images when appropriate.
- Do not lazy-load the main above-the-fold image if it is the page's important Largest Contentful Paint element.
- Reserve image and media dimensions to prevent layout shifts.
- Avoid excessive JavaScript for simple interactions.
- Keep animation work lightweight.
- Avoid unnecessary state updates and repeated component rendering.
- Reduce large bundles and unused dependencies where safely possible.
- Preserve existing caching, routing, and deployment behavior.

Use Core Web Vitals as measurable performance indicators. Aim for good results at the 75th percentile when real-user data is available:

- LCP: 2.5 seconds or less.
- INP: 200 milliseconds or less.
- CLS: 0.1 or less.

Treat these as performance goals, not assumed results. Measure before and after implementation.

---

## 12. Responsive and Visual Testing

Do not declare the redesign complete after checking only one desktop screen.

Test representative widths throughout the full responsive range, including narrow phones, large phones, tablets, laptops, standard desktops, and wide monitors.

### Test checklist

- [ ] No unintended horizontal page overflow.
- [ ] Headings wrap naturally without clipping.
- [ ] Paragraphs remain readable at all widths.
- [ ] Cards rearrange without awkward gaps or compression.
- [ ] Images retain suitable crops and aspect ratios.
- [ ] Navigation works with mouse, touch, and keyboard.
- [ ] Buttons remain visible and easy to use.
- [ ] Forms remain usable when the mobile keyboard opens.
- [ ] Modal and dropdown content fits within the viewport.
- [ ] Footer columns adapt naturally.
- [ ] Zoom and increased text sizes do not hide essential content.
- [ ] Animation remains stable during scrolling and route changes.
- [ ] Reduced-motion settings are respected.
- [ ] No console errors or broken asset requests are introduced.
- [ ] Existing links, forms, routes, and integrations still work.

Use browser resizing and, where available, real-device or browser device emulation. Test intermediate widths, not only predefined breakpoint values.

---

## 13. Redesign Implementation Workflow

Implement the design system in controlled stages.

### Phase 1 — Audit

Inspect the existing project and identify current design tokens, responsive issues, component conventions, and animation problems.

### Phase 2 — Establish design tokens

Introduce the Energy Orange palette, Manrope typography, fluid spacing, layout widths, and motion tokens using the project's existing styling approach.

### Phase 3 — Refine shared components

Update the shared header, navigation, buttons, cards, forms, typography, and footer first. Avoid duplicating styles across pages.

### Phase 4 — Redesign existing pages

Apply the shared system to the existing pages while preserving routes, valid content, and functionality.

Use `brain.md` for business context, `agent.md` for engineering and redesign rules, and `content.md` for the content strategy.

### Phase 5 — Responsive refinement

Test and correct fluid sizing, wrapping, grid transitions, image behavior, and touch interactions across the full screen-size range.

### Phase 6 — Animation integration

Audit existing motion before adding effects. Implement purposeful animations, remove broken or redundant motion, and respect reduced-motion settings.

### Phase 7 — Verification

Run the project's available linting, type checks, builds, tests, and browser checks. Test key customer journeys and review console errors.

Do not claim that a check passed unless it was actually run.

### Phase 8 — Final review

Compare the redesigned experience against the existing site and confirm that the new design improves consistency, responsiveness, readability, performance, and usability without unnecessary regressions.

---

## 14. Definition of Done

The design-system implementation is complete when:

- The selected Energy Orange palette is applied consistently.
- Manrope is implemented throughout the website.
- Typography and spacing adapt fluidly.
- Layouts respond appropriately to phones, tablets, laptops, and desktop screens.
- Components share a consistent visual language.
- No major viewport introduces unintended overflow or broken layout.
- Navigation, forms, routes, and existing integrations remain functional.
- Animations behave reliably and do not interfere with content or interaction.
- Reduced-motion preferences are respected.
- Accessibility and performance have been reviewed.
- Available build, test, and browser checks have been completed and their results documented.
- Remaining limitations are explicitly reported rather than hidden.

## Final Principle

**Create a fluid, consistent, premium design system that adapts to the user—not a collection of fixed layouts that merely fit different screens. Redesign what needs improvement, preserve what already works, and verify every significant change.**

