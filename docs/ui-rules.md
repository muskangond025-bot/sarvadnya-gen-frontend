# `ui-rules.md` — UI Architecture, Layout & Responsive Behaviour

## 1. Purpose

This document defines the user-interface rules for redesigning the existing generator rental website.

It translates the business strategy, content strategy, and design system into practical implementation standards for page layouts, components, visual hierarchy, responsive behavior, interaction states, and animation.

The objective is to create a premium, modern, industrial-focused website that feels cohesive on every device and makes generator rental enquiries easy.

### Required documentation

Before implementing UI changes, read:

- `brain.md` — Business strategy and customer requirements.
- `agent.md` — Engineering standards and existing-site redesign workflow.
- `content.md` — Website copy, messaging, and conversion strategy.
- `design-system.md` — Colors, typography, spacing, responsiveness, motion, accessibility, and performance.

**Important:** This is an existing website redesign. Inspect and improve the current implementation instead of rebuilding working functionality without justification.

---

## 2. Core UI Principles

Every interface decision must follow these principles.

### 2.1 Clear before decorative

Customers must immediately understand that the business offers generator rentals.

Do not allow decorative imagery, 3D effects, animations, or abstract visuals to obscure the primary service message.

### 2.2 Consistent without being repetitive

Use a common visual language across pages, but give each section a layout suited to its content.

Do not make every section look like the same card grid.

### 2.3 Fluid rather than fixed

All major layouts must adapt to available space.

Prefer:
- CSS Grid and Flexbox.
- `clamp()` for fluid typography and spacing.
- `minmax()` for adaptive grids.
- Relative units for flexible dimensions.
- Content-driven heights.
- Responsive images and intrinsic sizing.

Avoid rigid widths, fixed section heights, and device-specific layouts that break at intermediate screen sizes.

### 2.4 Conversion-focused

Important actions should be visible, understandable, and easy to complete.

Prioritise:
- Requesting a quote.
- Enquiring about generator availability.
- Discussing capacity requirements.
- Contacting the business.

### 2.5 Preserve working functionality

Redesign the presentation of existing components without unnecessarily changing their behavior, routes, APIs, forms, integrations, or data structures.

### 2.6 Minimalist restraint over generic UI clutter

Eliminate cheap visual gimmicks and template artifacts that degrade editorial quality:
- **Strictly avoid badge pills, capsule lozenges, and rounded bubble tags**: Never enclose section eyebrows, categories, or status labels in rounded-full pill boxes (`rounded-full bg-orange-100 text-orange-600 px-3 py-1`). Eyebrows must be clean, unboxed typographic statements.
- **Strictly avoid decorative number text and giant watermark numerals**: Do not plaster oversized numbers ("01", "02") in the background of cards or headers. If numbering is required for an actual sequential process, style it as restrained inline typography, not as a decorative graphic.
- **Strictly avoid subtext bloat and redundant microcopy**: Eliminate filler explanations, secondary paragraphs under self-explanatory headings, and redundant helper text under buttons or labels. Every word must earn its place.

### 2.7 Zero Content Clipping: Not a Single Element Cut Off

Not a single text, design element, button, card, border, icon, or visual component may ever be cut off, clipped, or truncated unexpectedly across any screen size (from 320px mobile to 4K desktop).
- Prevent accidental text truncation, text overflow clipping, and clipped typography ascenders/descenders.
- Prevent negative margins, rigid containers, or improper `overflow: hidden` rules from clipping buttons, shadows, focus rings, or interactive edges.
- Ensure all content containers maintain proper fluid padding and gutters so that content never collides with or cuts off at the edge of the screen.

### 2.8 Absolute Visibility: Nothing Unintentionally Hidden or Invisible

Every single text, design element, button, CTA, label, icon, and structural component must be 100% visible and legible to the user.
- **No missing or invisible elements**: Nothing may remain invisible due to unresolved animation states (e.g. elements stuck at `opacity: 0` or off-screen transforms from failed GSAP/ScrollTrigger initializations).
- **No z-index or stacking context occlusion**: Foreground text, buttons, and content must never be buried behind overlays, background glows, decorative canvases, or sticky headers.
- **No low-contrast invisibility**: No text or icons may blend into backgrounds (e.g. white text on light backgrounds or dark text on dark surfaces). Contrast must strictly adhere to legibility standards.
- Essential content and functional controls must never be hidden (`display: none`) on mobile or tablet devices without an explicit, accessible, and fully visible responsive equivalent.

### 2.9 Zero Element Overlapping: Strict Prevention of Layout Collisions

No text, heading, button, card, header, icon, or visual element may ever unintentionally overlap, collide with, or stack awkwardly on top of another element across any screen size, device orientation, or browser zoom level.
- **No text collision**: Headings, paragraphs, and labels must never collide with adjacent text lines, buttons, or imagery. Line-heights (`leading`) and margins must accommodate fluid wrapping without collision.
- **No card or container overlap**: Grid items, cards, and flex containers must reflow naturally with explicit `gap` definitions; cards must never crash into or sit on top of each other.
- **No header/navigation occlusion**: Sticky headers, floating widgets, and fixed action buttons must never obscure underlying headings, form inputs, anchor targets, or content.
- **Clear breathing room**: Maintain intentional, distinct spacing between all visual elements so every component has dedicated space to be read and interacted with.

---

## 3. Global Layout Rules

### Page container

Use a shared content container for consistent alignment across sections.

```css
.container {
  width: 100%;
  max-width: 88rem;
  margin-inline: auto;
  padding-inline: var(--page-gutter);
}
```

Adapt the maximum width to the existing website where appropriate.

### Rules

- Align section content to a consistent page grid.
- Allow selected backgrounds and hero visuals to extend edge-to-edge.
- Keep reading content narrower than full-width visual sections.
- Use fluid section padding from `design-system.md`.
- Avoid arbitrary margins that differ across otherwise similar sections.
- Keep consistent spacing between section headings, descriptions, and content.
- Use natural content height instead of fixed heights wherever possible.
- Prevent images and interactive elements from creating horizontal overflow.
- Use `min-height` only where a genuine layout requirement exists.

### Visual rhythm

Create a clear rhythm between:
1. Section eyebrow or label.
2. Main heading.
3. Supporting description.
4. Main content.
5. Optional call to action.

Do not add all five elements to every section when the content does not require them.

---

## 4. Header and Navigation

### Desktop behavior

The header should communicate the brand and make important pages easy to access.

Suggested navigation structure, subject to the actual website's existing routes:

- Home
- Rental Solutions
- Applications
- About
- Contact

Use an existing fleet or capacity page in the navigation if the site genuinely provides one.

### UI rules

- Keep the header visually restrained.
- Use Manrope for all navigation text.
- Use charcoal for the primary navigation text.
- Apply the orange accent selectively to the main enquiry action or active state.
- Maintain consistent vertical alignment and horizontal spacing.
- Prevent navigation items from wrapping unpredictably.
- Ensure the logo scales appropriately without becoming too small or dominating the header.
- Preserve all valid navigation destinations.

### Sticky header

Use a sticky header only if it improves navigation without consuming excessive viewport space.

If the existing website uses one:
- Ensure it does not cover anchor-linked headings.
- Avoid abrupt changes in header height.
- Prevent layout jumps when the sticky state changes.
- Keep mobile content visible beneath it.
- Test interaction with dropdowns and mobile navigation.

### Mobile navigation

When the desktop navigation no longer fits, switch to a compact menu.

Requirements:
- Provide a clearly labelled menu control.
- Use a reliable open and close state.
- Support touch and keyboard input.
- Close the menu after navigation when appropriate.
- Provide visible focus states.
- Prevent the open menu from exceeding the viewport.
- Ensure the menu does not unintentionally block the page after closing.
- Do not depend on hover.

Do not create separate, duplicated navigation systems unless the existing architecture requires them.

---

## 5. Hero Section

The hero is the most important visual and messaging area of the homepage.

### Content hierarchy

Use the content approved in `content.md`.

**Eyebrow**

SILENT GENERATOR RENTALS | NASHIK, MAHARASHTRA

**Heading**

Reliable Power. When It Matters Most.

**Description**

Silent generator rental solutions for weddings, grand events, and industrial projects. Explore rental requirements across a 5 kVA–250 kVA capacity range and enquire about a solution suited to your application.

**Primary CTA:** Request a Quote

**Secondary CTA:** Explore Rental Solutions

### Layout rules

- Use a responsive two-column layout when suitable for the available width.
- Stack the content and visual naturally on narrow screens.
- Keep the headline prominent without letting it occupy the entire screen.
- Set a reasonable maximum width for the supporting paragraph.
- Keep both CTAs close to the description.
- Allow the hero height to adapt to content.
- Use genuine generator imagery or verified equipment visuals.
- Maintain sufficient contrast between text and its background.
- Avoid placing important text over visually busy imagery.

### Responsive behavior

On smaller screens:
- Reduce heading size fluidly.
- Stack the text and image when required.
- Let buttons wrap or become full-width when space is limited.
- Keep the primary action easy to locate.
- Avoid clipping the image or cutting off important text.
- Do not force the user to scroll through a large decorative animation before reaching the main message.

### Motion rules

If the hero uses an entrance animation:
- Keep the movement subtle.
- Avoid delaying access to the headline or CTA.
- Ensure content remains visible if JavaScript fails.
- Do not run multiple competing entrance animations.
- Disable or simplify nonessential motion when reduced motion is requested.

---

## 6. Section Heading System

Use a consistent heading structure throughout the site.

### Standard pattern

- Optional eyebrow.
- Section heading.
- Optional supporting paragraph.
- Main section content.

### Rules

- Use one clear H1 for the primary page heading.
- Use H2 elements for major page sections.
- Use H3 elements for meaningful subheadings and card titles.
- Do not choose HTML heading levels purely for their visual appearance.
- Use the typography tokens from `design-system.md`.
- Keep heading widths controlled to encourage natural line breaks.
- Avoid excessive uppercase headings.
- Use orange as an accent rather than making every heading orange.
- Maintain consistent spacing between headings and the content below them.

### Eyebrow and Subtext Rules (Zero Pill / Zero Bloat Standards)

- **Eyebrows must never be pill badges or capsule containers**: Never wrap an eyebrow in `rounded-full`, background chips, or pill borders. Eyebrows must always be styled as clean, unboxed typography (e.g. `text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground` or subtle orange accent).
- **No unnecessary number text or decorative counters**: Never add decorative numbers ("01", "02") to headings or section introductions unless part of a genuine, numbered sequential process.
- **Strictly eliminate redundant subtext and microcopy bloat**:
  - Do not add a supporting paragraph if the heading is already clear and self-explanatory.
  - Limit supporting descriptions to 1–2 concise, punchy sentences.
  - Avoid repeating heading text in the subtext with slight rephrasings.
- Not every section needs an eyebrow label. Use one only when it genuinely establishes context.

---

## 7. Rental Application Cards

The primary application categories are:

1. Weddings.
2. Grand Events.
3. Industrial Projects.

### Card structure

Each card may contain:
- A relevant image or restrained visual.
- A clear title.
- A concise, application-specific description.
- A descriptive link or CTA.

### Design rules

- Use a shared component for cards with the same purpose.
- Maintain consistent internal padding and typography.
- Use a restrained radius and border treatment.
- Avoid heavy shadows and excessive decoration.
- Keep descriptions concise and distinct.
- Use genuine photographs where available.
- Avoid making the entire card clickable if it contains multiple separate interactive controls.
- If the whole card is clickable, ensure it is keyboard accessible and has a clear accessible name.
- Do not add unsupported claims to make cards appear more persuasive.

### Responsive grid

Use a flexible grid that adapts to the available width.

```css
.application-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: clamp(1rem, 2.5vw, 2rem);
}
```

Validate the minimum width against actual content. Avoid squeezing several cards into narrow columns.

On phones, allow cards to stack vertically when necessary.

### Hover and touch behavior

- Use subtle hover changes on devices that support hover.
- Avoid hover-only descriptions.
- Keep all important content visible on touch devices.
- Do not make the card jump or scale excessively.
- Ensure links remain easy to tap.

---

## 8. Generator Capacity Section

This section communicates the stated 5 kVA–250 kVA range and helps visitors begin a relevant enquiry.

### UI structure

Possible content:
- Section heading.
- Short explanation of capacity selection.
- Verified capacity information, if available.
- A clear enquiry CTA.

### Rules

- Make the capacity range easy to understand.
- Use `kVA` consistently.
- Avoid displaying invented generator models or specifications.
- Do not use fake inventory counters.
- Do not suggest that every capacity is currently available.
- Avoid decorative gauges or technical dashboards that imply live equipment data when no such data exists.
- Do not automatically recommend a generator capacity from the event category alone.

If verified equipment data exists, present it in a structured, accessible list or grid.

If exact fleet details are not available, use a simple capacity overview and an enquiry action rather than a fictional fleet interface.

### Optional capacity enquiry controls

If an existing or approved enquiry form includes capacity selection:
- Include an option such as "Not sure yet."
- Do not require customers to understand electrical sizing before enquiring.
- Keep selection controls usable on mobile.
- Make clear that availability and suitability must be confirmed.

---

## 9. Why Choose Us Section

Use this section to communicate genuine reasons for considering the service.

### UI rules

- Limit the section to a small number of useful points.
- Use clear headings and concise supporting text.
- Prefer verified business capabilities over generic promises.
- Use restrained icons only when they improve comprehension.
- Avoid filling the section with fake statistics, awards, ratings, or testimonials.
- Do not use multiple identical cards if a simpler layout communicates the content better.

If verified service advantages are not yet available, prioritise the rental process, capacity range, or customer preparation guidance instead of inventing differentiators.

---

## 10. Rental Process Section

Present the customer journey as a simple sequence.

### Suggested steps

**01 — Share Your Requirements**

The customer provides the application, location, dates, and known power requirements.

**02 — Discuss the Power Requirement**

The relevant capacity and application details are reviewed.

**03 — Confirm Availability and Quotation**

The customer discusses availability, pricing, and the applicable rental arrangements with the business.

### UI rules

- Use a clear reading order.
- Use numbered steps only where numbering helps.
- Keep step descriptions short.
- On desktop, steps may appear horizontally if they remain readable.
- On mobile, stack steps vertically.
- Avoid complicated scroll-triggered timelines.
- Do not make the process dependent on animation.
- Do not claim instant booking or automatic confirmation unless implemented.

The process must be updated if the actual business workflow differs.

---

## 11. Image and Project Showcase

### Purpose

Use visuals to help visitors understand the type of equipment and rental applications offered.

### Rules

- Prefer authentic equipment photographs.
- Use verified project images only.
- Preserve the subject's important details when cropping.
- Use consistent aspect ratios within a gallery.
- Use responsive image sizing.
- Reserve image space to prevent layout shifts.
- Avoid stock images that misrepresent the actual fleet or completed work.
- Do not display fictional project titles or client names.

### Layout behavior

Use a gallery or editorial image arrangement only when genuine imagery supports it.

Do not force a complicated masonry grid if a simpler, responsive grid works better.

If a gallery opens a lightbox:
- Provide an accessible close control.
- Support keyboard operation.
- Prevent background interaction when the modal requires it.
- Restore focus when closing.
- Keep the image within the viewport.
- Ensure it works on touch devices.

If no genuine project imagery exists, use an appropriate equipment or application section instead.

---

## 12. Service Area Section

### Suggested heading

Generator Rental in Nashik and Maharashtra

### UI rules

- Clearly identify Nashik as the primary location.
- Describe additional coverage only when verified.
- Avoid fake map pins, addresses, or local offices.
- Use a real map only when it provides useful, accurate location information.
- Keep the section compact and readable.
- Provide a clear service availability enquiry action.

Do not add a decorative interactive map if the business has no verified location data to display.

---

## 13. Testimonials and Trust Elements

Only display genuine, authorised, and verifiable customer proof.

### Rules

- Do not invent customer names, companies, testimonials, ratings, or logos.
- Do not use placeholder reviews on the production website.
- Do not fabricate client counts or years of experience.
- Do not create a testimonial carousel solely to fill space.
- Use a simple, readable layout when real testimonials exist.
- Preserve attribution and permission requirements.

If there is no verified proof, remove the empty testimonial section or replace it with useful information about the rental process and requirements.

---

## 14. FAQ Component

### Layout

Use an accessible accordion or a straightforward list of questions and answers.

### Rules

- Keep question labels concise.
- Make the interactive state clear.
- Support keyboard activation.
- Use appropriate button semantics and expanded-state attributes.
- Ensure answer content remains readable on narrow screens.
- Avoid large animated height changes that cause scrolling problems.
- Avoid excessive motion when opening and closing answers.
- Do not hide essential pricing or service conditions inside confusing interactions.

Use the FAQ content from `content.md` and verify all operational answers against the actual business.

---

## 15. Quote and Contact Forms

The enquiry form is a core conversion component.

### Recommended information

- Name.
- Contact details.
- Rental application.
- Required location.
- Required date or period.
- Approximate capacity, if known.
- Equipment or load details.
- Additional message.

Use only the fields required by the actual workflow. Do not overwhelm users with unnecessary questions.

### Layout rules

- Use a clear form heading.
- Group related fields logically.
- Use labels rather than relying only on placeholders.
- Provide helpful validation messages.
- Distinguish required and optional fields.
- Use appropriate input types and autocomplete.
- Keep submit buttons visually prominent.
- Ensure the form adapts to one-column layouts on narrow screens.
- Prevent validation messages from overlapping other fields.
- Make loading, success, and error states accessible.

### Functional rules

- Preserve the existing form backend and integrations.
- Do not replace a functioning form with a decorative mockup.
- Do not report success before the server confirms successful submission.
- Prevent accidental duplicate submissions when appropriate.
- Preserve user input when a submission fails, where feasible.
- Never imply that submitting a form confirms a reservation.

---

## 16. Button and Interaction Rules

Create a consistent interaction system.

### Primary button

- Power Orange background.
- Charcoal text.
- Clear, concise action label.
- Comfortable touch target.
- Visible keyboard focus.
- Subtle hover and active states.

### Secondary button

Use a suitable charcoal, outlined, or neutral treatment based on the surrounding surface.

### Text links

Use descriptive labels and a visible interactive state.

### All interactive elements must provide

- Default state.
- Hover state where supported.
- Keyboard focus state.
- Active state where relevant.
- Disabled state where applicable.
- Loading state where applicable.

Avoid:
- Fake buttons with no action.
- `href="#"` placeholders.
- Empty navigation links.
- Controls that only work with a mouse.
- Excessive scaling or bouncing.
- Hover states that reduce text contrast.

---

## 17. Elimination of Visual Clutter: Strict Ban on Badge Pills, Capsule Lozenges, Decorative Numbers & Subtext Bloat

To maintain a premium, editorial, and authentic industrial engineering aesthetic, the website must strictly avoid the clichés of generic web templates, component libraries, and AI-generated SaaS themes.

### 17.1 Ban on badge pills and capsule lozenges

- **Never wrap eyebrows, categories, or status labels in pill containers**: Do not use `rounded-full` pill badges (`<span className="rounded-full bg-orange-100 text-orange-600 px-3 py-1">`).
- **Why**: Pill containers and candy capsules look like consumer SaaS widgets or cheap marketing templates. They disrupt typography, clutter visual rhythm, and diminish the industrial authority of a heavy equipment rental business.
- **Approved styling**: Eyebrows must always be clean, unboxed typographic statements (e.g. `text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground` or subtle orange accent) sitting directly on the canvas without background pill boxes, borders, or rounded containers.
- **Filter and selection controls**: If interactive filter controls are required (e.g. generator capacity filters), style them as clean, restrained controls with subtle geometry (`rounded-md` or `rounded-sm`), never bubbly `rounded-full` pills.

### 17.2 Ban on unnecessary number text and watermark counters

- **No oversized decorative watermark numbers**: Never plaster giant, low-opacity background numerals (`text-8xl opacity-10 font-bold 01`) behind section headings, cards, or hero layouts.
- **No arbitrary numbering on non-sequential content**: Never prefix non-sequential items with "01", "02", "03" (e.g. Weddings, Grand Events, and Industrial Projects are distinct categories, not sequential steps).
- **No decorative counter badges or fake metric lozenges**: Avoid adding decorative "#1", "24/7", or numbered index badges.
- **Strictly functional numbering only**: Numbering is permitted exclusively when representing an actual, chronological sequential procedure (e.g. the 3-step rental journey). Even then, render numbers as restrained, understated inline text (`01.` or `Step 1`), never as floating graphic elements or badge pills.

### 17.3 Ban on subtext bloat and redundant microcopy

- **No filler subtext under self-explanatory headings**: If a section or card heading clearly communicates its topic, do not force a secondary paragraph beneath it merely to fill space.
- **Strictly limit supporting copy to 1–2 sentences**: Any description that accompanies a heading or card must be concise, punchy, and informative. Delete filler words and generic marketing fluff.
- **No button microcopy clutter**: Do not place redundant microcopy under action buttons (e.g. "Takes only 2 minutes", "100% free consultation", "Click to explore"). Keep the button label clear and self-sufficient.
- **Eliminate multi-layer repetition**: Do not stack eyebrow + heading + subtitle + paragraph + bullet points that all rephrase the exact same point. Keep visual hierarchy disciplined: either [Eyebrow + Heading] or [Heading + Brief Description].

### 17.4 Quiet cards and structured specifications

- Do not float colorful pill tags or badges on card corners.
- Display generator attributes (capacity, fuel type, phase, canopy type) as clean typographic metadata lines (e.g. `125 kVA · Silent Diesel · 3-Phase · Nashik & MH`) or structured key-value pairs, never as an unreadable cloud of colored pill tags.

---

## 18. Footer

The footer should provide useful navigation and contact information without becoming visually overloaded.

### Potential content

- Verified business name and description.
- Main rental service links.
- Application links.
- Relevant contact details.
- Verified service area.
- Useful legal or policy links, if applicable.

### Rules

- Use charcoal as a structural surface where appropriate.
- Use ivory for readable text.
- Use orange selectively for links or important actions.
- Maintain consistent spacing and alignment.
- Stack columns naturally on mobile.
- Prevent long contact details from overflowing.
- Use only verified addresses, phone numbers, email addresses, and social links.
- Do not include empty social icons or nonfunctional footer links.

---

## 19. Responsive Behavior Rules

The interface must adapt continuously to the available screen width.

### Small phones

- Stack complex layouts.
- Use fluid but readable typography.
- Keep important CTAs visible.
- Avoid narrow multi-column cards.
- Prevent image cropping from hiding important content.
- Ensure forms are comfortable to complete.
- Avoid fixed-width containers.

### Tablets

- Adjust column counts according to available width.
- Keep spacing proportionate.
- Prevent desktop navigation from becoming compressed.
- Reflow cards and forms naturally.

### Laptops

- Maintain balanced content width.
- Avoid excessive whitespace.
- Keep important content and actions within a comfortable viewport.
- Ensure headers and navigation fit without collisions.

### Desktop and wide screens

- Use a controlled maximum content width.
- Increase spacing gradually.
- Avoid stretching paragraphs and cards across the entire screen.
- Keep layouts balanced rather than simply enlarging every element.

### General requirements

- Test widths between breakpoints.
- Test landscape and portrait orientations where relevant.
- Support browser zoom and text enlargement.
- Use `min-width: 0` on appropriate grid and flex children.
- Avoid fixed heights for content-heavy sections.
- Prevent horizontal overflow at page and component level.
- Respect safe areas on supported mobile devices where necessary.

Do not assume that one breakpoint configuration will automatically solve every component's layout.

---

## 20. Animation and Scroll Behavior

Motion should reinforce the interface rather than dominate it.

### Allowed patterns

- Subtle button transitions.
- Restrained card interactions.
- Short section entrance animations.
- Gentle image reveals.
- Simple menu and accordion transitions.
- Lightweight decorative movement when it serves a clear visual purpose.

### Rules

- Inspect existing animations before adding new ones.
- Reuse existing animation infrastructure when appropriate.
- Do not create redundant timelines.
- Avoid excessive scroll-based reveals.
- Avoid scroll hijacking.
- Do not delay essential content.
- Keep interactive controls usable during animations.
- Clean up animation instances and event listeners.
- Respect reduced-motion preferences.
- Avoid continuous background effects that interfere with performance.
- Provide a graceful static fallback if an animation fails.

### Error prevention

Test for:
- Console errors.
- Animation initialization failures.
- Elements remaining hidden after route changes.
- Duplicate animations after remounting.
- Broken scroll positions.
- Layout shifts.
- Touch interactions that trigger unexpected movement.
- Animation conflicts with modals, menus, or page transitions.

A visual effect should be removed or simplified if it creates instability.

---

## 21. Accessibility Requirements

Target WCAG 2.2 AA where applicable.

- Use semantic HTML.
- Maintain sufficient contrast.
- Provide visible focus indicators.
- Ensure logical keyboard navigation.
- Use accessible names for icon-only controls.
- Label all form inputs.
- Provide understandable validation feedback.
- Support reduced motion.
- Do not use color as the only signal.
- Avoid hover-only content.
- Maintain logical reading order.
- Ensure modal and menu focus behavior is correct.
- Respect user zoom and text-size preferences.

Accessibility must be tested, not assumed from visual appearance alone.

---

## 22. Performance Requirements

- Avoid unnecessary packages and heavy effects.
- Use responsive images and appropriate compression.
- Load fonts efficiently.
- Avoid layout shifts from images, embeds, and animations.
- Keep interactive JavaScript lightweight.
- Avoid excessive event listeners and component re-renders.
- Lazy-load appropriate below-the-fold media.
- Do not lazy-load critical hero imagery indiscriminately.
- Keep decorative visuals from blocking pointer events.
- Preserve existing caching and deployment behavior.

Where measurement is available, use Core Web Vitals as performance indicators. Do not claim performance improvements without testing.

---

## 23. Existing Code and Component Rules

Before creating a new component, check whether an appropriate one already exists.

### Requirements

- Reuse suitable shared components.
- Update common styles centrally.
- Keep component responsibilities clear.
- Avoid duplicating the same UI across pages.
- Preserve valid props, data flows, and API contracts.
- Avoid unnecessary framework or library changes.
- Remove confirmed dead or demo UI carefully.
- Do not remove legitimate tests, fixtures, or development utilities merely because they are not visible to website visitors.
- Avoid changing environment variables or deployment settings unless required and understood.

If a component needs a major structural change, verify every place where it is used.

---

## 24. UI Verification Checklist

Before completing the redesign, verify:

- [ ] The site communicates generator rental services clearly.
- [ ] The Energy Orange palette is applied consistently.
- [ ] Manrope typography is used throughout.
- [ ] Spacing and typography adapt fluidly.
- [ ] Zero badge pills, capsule tags, or rounded-full chips used for eyebrows or labels.
- [ ] Eyebrows are styled as clean, unboxed typography with refined tracking.
- [ ] No unnecessary decorative number text or giant watermark numerals (`01`, `02`) behind sections.
- [ ] Non-sequential items are not arbitrarily numbered.
- [ ] No subtext bloat: redundant microcopy, filler helper text, and wordy explanations eliminated.
- [ ] Zero content clipping: Not a single text, design, button, card, or border is cut off on any screen size.
- [ ] Absolute visibility: Every text, design, and button is 100% visible; nothing is hidden, stuck at opacity 0, or obscured by z-index/contrast.
- [ ] Zero element overlapping: No text, cards, buttons, or navigation elements collide or unintentionally overlap.
- [ ] The header and mobile navigation work.
- [ ] Hero content and CTAs remain visible across devices.
- [ ] Application cards adapt without overflow.
- [ ] Capacity information remains accurate.
- [ ] Forms preserve their real submission functionality.
- [ ] FAQs and dropdowns work with keyboard and touch.
- [ ] Images load correctly and use appropriate responsive behavior.
- [ ] All links and buttons perform their intended actions.
- [ ] Animations do not hide content or break interaction.
- [ ] Reduced-motion preferences are respected.
- [ ] Keyboard focus is visible.
- [ ] No unintended horizontal scrolling occurs.
- [ ] No obvious layout collisions appear at intermediate widths.
- [ ] No new console errors or broken assets are present.
- [ ] Existing routes and integrations remain functional.
- [ ] Available build, lint, type, and test checks have been run.
- [ ] Any unresolved issues are documented honestly.

---

## 25. Implementation Order

Follow this sequence:

1. Inspect the existing project and identify reusable components.
2. Review `design-system.md` and establish shared tokens.
3. Update global typography, spacing, and layout foundations.
4. Refine the header, navigation, buttons, and shared UI (ensuring zero pill capsules and zero decorative clutter).
5. Redesign the hero and main application sections.
6. Refine capacity information, process sections, FAQs, forms, and footer.
7. Apply fluid responsive behavior across all existing pages.
8. Audit and repair existing animation behavior.
9. Test interactions, accessibility, performance, and functionality.
10. Report completed work, test results, and remaining issues.

Do not apply a new style to every page before checking that the shared foundations work correctly.

## Final Principle

**Every component must have a clear purpose, every layout must adapt to its available space, every interaction must work, and every animation must earn its place. Preserve what works, improve what is weak, and test the complete responsive experience before declaring the redesign finished.**

