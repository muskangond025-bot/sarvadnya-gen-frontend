# `components.md` — Reusable UI Components & Implementation Architecture

## 1. Purpose

This document defines the reusable UI components required for the generator rental website redesign.

It establishes component responsibilities, composition, properties, interaction states, responsive behavior, accessibility requirements, and integration rules.

The objective is to create a cohesive, production-ready website for silent generator rentals covering weddings, grand events, and industrial projects.

**This is an existing website redesign. Inspect the current component architecture before adding, replacing, or restructuring components.**

Do not rebuild functioning components unnecessarily. Reuse and improve existing components wherever practical.

---

## 2. Documentation Hierarchy

Read these files before implementing components:

- `brain.md` — Business strategy, audience, and rental requirements.
- `agent.md` — Engineering standards, auditing, and safe redesign workflow.
- `content.md` — Approved content direction, page messaging, and conversion actions.
- `design-system.md` — Energy Orange palette, Manrope typography, fluid spacing, responsiveness, and motion.
- `ui-rules.md` — Layout, interaction, accessibility, and component presentation rules.

This document defines how reusable components should be structured and work together.

If a proposed component conflicts with an existing working feature, inspect the implementation before changing it.

---

## 3. Existing Codebase Audit

Before writing components:

1. Inspect the existing framework and project structure.
2. Identify existing shared components, page sections, hooks, utilities, and styling conventions.
3. Inspect existing routing and navigation.
4. Identify working forms, APIs, validation, analytics, and integrations.
5. Review current responsive and animation implementations.
6. Identify duplicated UI that could be consolidated.
7. Check current Git changes and preserve unfinished user work.
8. Map existing components to the proposed component architecture.

Produce a concise audit and implementation plan before making substantial changes.

### Component decision rules

For every proposed component, decide whether to:

- **Reuse:** The existing component already meets requirements.
- **Improve:** The component exists but needs visual, responsive, or accessibility refinement.
- **Refactor:** Its responsibilities or implementation need restructuring.
- **Create:** No suitable component exists.
- **Remove:** It is confirmed to be unused, redundant, or demo-only and safe to remove.

Do not create a new component simply because this document lists one. The list defines functional responsibilities, not a requirement to duplicate existing architecture.

---

## 4. Component Architecture

Organise components according to their responsibilities rather than placing everything in one large page component.

Suggested conceptual structure:

```text
src/
├── components/
│   ├── layout/
│   │   ├── SiteHeader
│   │   ├── DesktopNavigation
│   │   ├── MobileNavigation
│   │   ├── SiteFooter
│   │   └── PageContainer
│   │
│   ├── ui/
│   │   ├── Button
│   │   ├── SectionHeading
│   │   ├── Container
│   │   ├── Icon
│   │   ├── Accordion
│   │   └── FormField
│   │
│   ├── home/
│   │   ├── HeroSection
│   │   ├── RentalApplications
│   │   ├── CapacityOverview
│   │   ├── WhyChooseUs
│   │   ├── RentalProcess
│   │   ├── ProjectShowcase
│   │   └── FinalCTA
│   │
│   ├── rental/
│   │   ├── ApplicationCard
│   │   ├── CapacityCard
│   │   ├── GeneratorCard
│   │   └── RentalEnquiryForm
│   │
│   └── shared/
│       ├── FAQSection
│       ├── ContactSection
│       └── ServiceAreaSection
│
├── pages/ or app/
└── styles/
```

This is an illustrative structure, not a mandatory directory layout. Follow the existing framework conventions, whether the project uses Next.js, React, another framework, or a different structure.

Do not move files merely to match this example.

---

## 5. Shared Design Foundations

All components must use the design system established in `design-system.md`.

### Brand colors

- Soft Ivory: `#FFF7EB`
- Charcoal: `#2B2B2B`
- Power Orange: `#FF8A00`

### Typography

Use Manrope throughout the interface, following the approved font-loading setup and weight hierarchy.

### Fluid layout

Use the shared fluid spacing, typography, and container tokens.

Avoid component-specific fixed widths or arbitrary spacing values when existing design tokens already solve the problem.

### Shared component requirements

Components should:
- Have one clear responsibility.
- Reuse existing design tokens.
- Support responsive layouts.
- Provide appropriate loading, error, disabled, or empty states where relevant.
- Use semantic and accessible markup.
- Avoid unnecessary state and dependencies.
- Remain easy to test and maintain.
- Work without relying on decorative animations.

---

## 6. Global Layout Components

### 6.1 `SiteHeader`

**Purpose:** Provide brand identity, primary navigation, and access to rental enquiries.

**Responsibilities:**
- Display the existing business logo or verified wordmark.
- Render the primary navigation.
- Provide a prominent enquiry CTA.
- Support responsive navigation.
- Preserve existing route destinations.

**Suggested properties, where needed:**

```ts
type SiteHeaderProps = {
  logo?: string;
  navigation?: NavigationItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

type NavigationItem = {
  label: string;
  href: string;
};
```

Adapt the types to the actual framework and routing implementation.

**Behavior:**
- Switch to mobile navigation when available space becomes insufficient.
- Support keyboard and touch interactions.
- Close the mobile menu after appropriate navigation actions.
- Avoid layout jumps if the header is sticky.
- Respect reduced-motion preferences.

Do not hardcode new business contact information or create links to nonexistent pages.

### 6.2 `DesktopNavigation`

**Purpose:** Display the primary navigation on wider layouts.

**Responsibilities:**
- Show available routes clearly.
- Indicate the current page where appropriate.
- Support dropdowns only if needed by the actual information architecture.
- Avoid navigation collisions at intermediate widths.

Keep this component simple. Do not introduce complex mega-menus without a genuine content requirement.

### 6.3 `MobileNavigation`

**Purpose:** Provide accessible navigation on smaller screens.

**Requirements:**
- Use a properly labelled menu button.
- Expose the menu's expanded state.
- Support keyboard navigation.
- Keep menu content within the viewport.
- Avoid trapping focus unless implemented as a true modal dialog.
- Restore normal page interaction after closing.
- Ensure important links remain accessible.

Essential navigation must not depend on hover.

### 6.4 `SiteFooter`

**Purpose:** Provide supporting navigation and verified business information.

**Content may include:**
- Business description.
- Main rental services.
- Contact information.
- Verified service location.
- Relevant legal or policy links.

**Rules:**
- Use responsive columns.
- Stack content naturally on small screens.
- Avoid empty social links and placeholder addresses.
- Preserve valid existing links.
- Use charcoal and ivory treatments with restrained orange accents.

### 6.5 `PageContainer`

**Purpose:** Standardise content alignment across pages.

**Responsibilities:**
- Apply shared maximum-width and fluid gutter rules.
- Centre content consistently.
- Allow full-width sections where required.

Avoid adding nested containers that unnecessarily constrain the content.

---

## 7. General UI Components

### 7.1 `Button`

**Purpose:** Provide consistent actions across the website.

Suggested variants:
- `primary`
- `secondary`
- `outline`
- `text`

Suggested properties:

```ts
type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};
```

Include a destination property or use a separate link component when the action navigates to another page.

**Behavior:**
- Primary: Power Orange background with Charcoal text.
- Secondary: A restrained contrasting treatment.
- Outline: Clear border and readable text.
- Text: Minimal styling with a clear interactive state.

Every variant must support keyboard focus and appropriate active, disabled, and loading states.

Do not create clickable `<div>` elements as substitutes for semantic buttons or links.

Do not use a button for navigation if a link is more appropriate.

### 7.2 `SectionHeading`

**Purpose:** Standardise section introductions.

Suggested properties:

```ts
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
};
```

**Rules:**
- Use fluid typography.
- Maintain readable heading widths.
- Avoid forcing unnatural line breaks.
- Keep the heading hierarchy semantic.
- Allow the eyebrow and description to be omitted when unnecessary.
- **Eyebrow rendering (No badge pills)**: Render eyebrows as clean, unboxed typography (subtle letter-spacing/tracking), never as rounded-full pill boxes (`rounded-full bg-... px-3 py-1`) or candy capsule badges.
- **No decorative numbers**: Never render decorative watermark numerals or arbitrary counters ("01", "02") beside or behind the heading.
- **No subtext bloat**: Keep descriptions to 1–2 concise, informative sentences. Omit the description entirely if the title is self-explanatory. Never duplicate heading copy.

The component should not force every section into an identical visual layout.

### 7.3 `Container`

Use a shared container utility or component for consistent page gutters and maximum widths.

Do not create multiple container components with conflicting widths unless they serve genuinely different purposes, such as a narrow reading column versus a full-width visual section.

### 7.4 `FormField`

**Purpose:** Provide consistent, accessible form fields.

Support the field types actually required by the project, such as:
- Text input.
- Email.
- Telephone.
- Select.
- Textarea.
- Checkbox, if required.

**Requirements:**
- Visible label.
- Optional helper text.
- Required-state indication.
- Accessible error message.
- Appropriate autocomplete and input types.
- Clear focus and disabled states.

Connect validation to the existing form system rather than creating an independent validation architecture without need.

### 7.5 `Accordion`

**Purpose:** Display FAQs and other expandable information.

**Requirements:**
- Use a real button for each trigger.
- Expose expanded state accessibly.
- Support keyboard activation.
- Keep answers readable at all widths.
- Avoid excessive height animation.
- Ensure content remains available with reduced motion.

Use native disclosure elements if they fit the existing implementation and accessibility requirements.

### 7.6 `Icon`

**Purpose:** Standardise icon usage.

Reuse the project's existing icon library where possible.

Requirements:
- Consistent visual weight and sizing.
- Accessible names for interactive icon-only controls.
- Decorative icons hidden from assistive technology where appropriate.
- No dependence on an icon to communicate essential information without supporting text.

Avoid introducing a new icon library for a small number of icons when the project already has a suitable one.

---

## 8. Homepage Components

### 8.1 `HeroSection`

**Purpose:** Communicate the main generator rental offer and encourage an enquiry.

**Content direction:**

Eyebrow: `SILENT GENERATOR RENTALS | NASHIK, MAHARASHTRA`

Heading: `Reliable Power. When It Matters Most.`

Description: `Silent generator rental solutions for weddings, grand events, and industrial projects. Explore rental requirements across a 5 kVA–250 kVA capacity range and enquire about a solution suited to your application.`

Primary CTA: `Request a Quote`

Secondary CTA: `Explore Rental Solutions`

**Responsibilities:**
- Render the primary heading.
- Render supporting copy.
- Display primary and secondary actions.
- Display genuine equipment imagery or an appropriate verified visual.
- Maintain a fluid responsive composition.

**Rules:**
- Avoid fixed hero heights that clip content.
- Stack content and imagery naturally on small screens.
- Keep CTA controls usable while animations run.
- Avoid heavy animation that delays the primary message.
- Preserve the correct CTA destinations.

Keep copy in the project's content layer or existing data structure where appropriate, rather than duplicating it across several components.

### 8.2 `RentalApplications`

**Purpose:** Introduce the three principal rental application categories.

**Categories:**
- Weddings.
- Grand Events.
- Industrial Projects.

**Responsibilities:**
- Render a responsive collection of application cards.
- Provide application-specific descriptions.
- Link to existing relevant pages or a suitable enquiry action.

**Rules:**
- Do not link to nonexistent pages.
- Use genuine imagery.
- Avoid making unsupported service promises.
- Keep all essential card content visible on touch devices.

### 8.3 `ApplicationCard`

**Purpose:** Represent an individual application category.

Suggested properties:

```ts
type ApplicationCardProps = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  actionLabel?: string;
};
```

The exact interface should match the existing architecture.

**Behavior:**
- Display an optional image.
- Render the title and concise description.
- Render a CTA only when a valid action exists.
- Support responsive card sizing.
- Use restrained hover behavior.
- Remain usable without animation.

Avoid redundant nesting of clickable links and buttons.

### 8.4 `CapacityOverview`

**Purpose:** Explain the 5 kVA–250 kVA generator rental range.

**Responsibilities:**
- Present the verified capacity range.
- Explain that suitability depends on actual power requirements.
- Guide customers toward a rental enquiry.

**Rules:**
- Do not invent inventory, models, live availability, or prices.
- Do not imply every capacity is always available.
- Do not automatically assign a capacity based on event category.
- Allow customers to enquire without knowing the required capacity.

### 8.5 `CapacityCard`

Use only if the business has verified capacity-specific information worth presenting.

Possible properties:

```ts
type CapacityCardProps = {
  capacityLabel: string;
  description?: string;
  specifications?: VerifiedSpecification[];
  enquiryHref?: string;
};
```

Specifications must come from verified equipment data.

If the existing business information does not support a meaningful capacity-card grid, do not create one simply to fill space. A simpler capacity overview may be better.

### 8.6 `WhyChooseUs`

**Purpose:** Explain genuine business strengths.

**Responsibilities:**
- Display a small set of verified benefits.
- Keep descriptions concise.
- Support an adaptable grid or editorial layout.

Do not hardcode fictional metrics, years of experience, awards, customer counts, or guarantees.

If business differentiators are unconfirmed, omit them until verified.

### 8.7 `RentalProcess`

**Purpose:** Explain the rental enquiry journey.

Suggested steps:
1. Share Your Requirements.
2. Discuss the Power Requirement.
3. Confirm Availability and Quotation.

**Responsibilities:**
- Display steps in a clear sequence.
- Use semantic headings.
- Adapt from horizontal to vertical layouts where necessary.

Do not suggest that form submission automatically reserves a generator.

### 8.8 `ProjectShowcase`

**Purpose:** Present genuine equipment photographs or verified rental projects.

**Responsibilities:**
- Render images with appropriate responsive sizing.
- Provide accurate captions where available.
- Preserve image aspect ratios where appropriate.
- Support accessible gallery interaction if implemented.

Do not fabricate project records, customer names, or image captions.

If there is no genuine portfolio, use an equipment gallery or an applications section instead.

### 8.9 `FinalCTA`

**Purpose:** Provide a clear final enquiry opportunity.

Suggested heading: `Planning an Event or Project?`

Suggested supporting copy: `Tell us what you need to power, where the generator will be used, and when you need it. We can discuss the relevant rental requirements and availability for your application.`

Primary CTA: `Request a Quote`

Use the existing enquiry route, form, or contact action. Do not create a second unrelated enquiry flow if a suitable one already exists.

---

## 9. Rental and Contact Components

### 9.1 `RentalEnquiryForm`

**Purpose:** Collect the information required to understand a potential rental request.

Recommended fields, adjusted to the actual workflow:
- Full name.
- Phone number.
- Email address, if required.
- Rental application.
- Required location.
- Required date or rental period.
- Approximate capacity, if known.
- Equipment or load details.
- Additional message.

**Suggested properties:**

```ts
type RentalEnquiryFormProps = {
  initialApplication?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};
```

Treat this as an architectural example. Use the existing form submission contract and error-handling conventions.

**Requirements:**
- Use accessible labels and validation.
- Preserve form data on failure where feasible.
- Prevent accidental duplicate submissions.
- Provide loading, success, and failure states.
- Avoid exposing sensitive information in client-side logs.
- Preserve existing backend/API integrations.
- Never show a success state before the submission succeeds.

Do not add props that duplicate state already managed by an existing form library or data layer.

### 9.2 `ContactSection`

**Purpose:** Present verified contact information and a direct enquiry route.

**Responsibilities:**
- Display the contact options supported by the existing business.
- Link phone numbers using appropriate telephone links.
- Link email addresses using appropriate email links.
- Provide the main enquiry CTA.

Never invent contact details.

### 9.3 `ServiceAreaSection`

**Purpose:** Explain where the service operates.

Use Nashik as the identified primary location and describe broader Maharashtra coverage only according to actual availability.

A map should be included only when it provides useful and accurate location information.

Do not display fake offices or unsupported service-area claims.

### 9.4 `FAQSection`

**Purpose:** Organise frequently asked rental questions.

**Responsibilities:**
- Render verified questions and answers.
- Use the shared `Accordion` component where appropriate.
- Maintain semantic heading hierarchy.
- Ensure answers remain readable on mobile.
- Avoid invented prices, service guarantees, or operational policies.

Store repeated FAQ content in a suitable data structure when it improves maintainability.

### 9.5 `TestimonialSection`

Use this component only if genuine, authorised customer testimonials are available.

**Requirements:**
- Preserve accurate attribution.
- Use real review content.
- Avoid fabricated ratings or customer logos.
- Do not create a carousel unless it improves access to a meaningful collection of testimonials.

If no verified testimonials exist, omit the section or replace it with useful business information.

---

## 10. Data and Content Separation

Keep content separate from presentation where this makes the application easier to maintain.

For example, application cards may use a data structure such as:

```ts
type RentalApplication = {
  id: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
};
```

Use stable identifiers for repeated components.

### Rules

- Do not duplicate the same copy in multiple files unnecessarily.
- Keep business details in one appropriate source of truth.
- Use typed data where supported by the existing framework.
- Do not put confidential configuration or API secrets into public component data.
- Do not use hardcoded placeholder data as if it were production information.
- Do not invent missing data to satisfy a component's props.

If information is unknown, handle it intentionally by omitting the optional content or asking for confirmation.

---

## 11. Component State and Interaction

Use local state for genuinely local UI behavior and existing shared state or form infrastructure for application-level behavior.

### Examples

- Mobile navigation: open or closed.
- Accordion: expanded or collapsed.
- Form: idle, submitting, success, or error.
- Modal: open or closed.

### Rules

- Avoid duplicated sources of truth.
- Avoid unnecessary global state.
- Keep components predictable.
- Use stable keys for repeated elements.
- Clean up event listeners and subscriptions.
- Avoid state updates after a component has unmounted.
- Preserve existing router and data-fetching conventions.
- Handle asynchronous errors properly.
- Do not simulate server results in production components.

A component should not require a global state library if ordinary local state is sufficient.

---

## 12. Responsive Component Behavior

Every component must be evaluated at small, medium, and large widths.

### Requirements

- Fluid typography and spacing.
- Flexible widths and content-driven heights.
- Responsive image handling.
- Natural card reflow.
- Accessible touch targets.
- No clipped controls.
- No unintended horizontal overflow.
- Logical reading order.
- Working keyboard navigation.
- Appropriate handling of landscape orientation and browser zoom.

Do not assume a component is responsive merely because it uses a percentage width.

Test actual content at intermediate widths, including long headings, error messages, and longer CTA labels.

Use the existing breakpoint and design token system from `design-system.md`.

---

## 13. Component Animation Standards

All animated components must follow `design-system.md` and `ui-rules.md`.

### Rules

- Prefer simple CSS transitions for straightforward interactions.
- Reuse the project's existing animation library when suitable.
- Avoid multiple animation systems for overlapping tasks.
- Avoid unnecessary scroll-triggered movement.
- Do not delay essential content or actions.
- Respect reduced-motion preferences.
- Clean up animation instances and event listeners.
- Avoid animation logic that leaves components invisible after a failure.
- Prevent duplicate triggers during route changes and remounts.
- Keep decorative animation independent of core component functionality.

Animation is optional for most components. A clean static implementation is preferable to a fragile effect.

---

## 14. Accessibility Requirements

Every shared component must be accessible in its context.

Requirements include:
- Semantic HTML.
- Visible focus indicators.
- Keyboard-operable controls.
- Accessible names for icon-only buttons.
- Correct heading hierarchy.
- Explicit form labels.
- Understandable validation feedback.
- Accessible expanded and collapsed states.
- Appropriate modal focus behavior.
- Reduced-motion support.
- Sufficient contrast.

Use automated accessibility testing where available, followed by manual keyboard testing.

---

## 15. Testing and Validation

After implementation, test the components individually and in their actual page contexts.

### Required checks

- [ ] Header and navigation work at every relevant viewport.
- [ ] All component links and CTAs have valid destinations.
- [ ] Cards reflow without overflow.
- [ ] Hero content remains visible.
- [ ] Capacity information is accurate.
- [ ] Enquiry form submission and error handling work.
- [ ] FAQ accordions support keyboard interaction.
- [ ] Images use appropriate responsive sizing.
- [ ] Empty and loading states are handled where relevant.
- [ ] Animations do not interfere with controls or scrolling.
- [ ] Reduced-motion settings are respected.
- [ ] No duplicate React keys or obvious console errors.
- [ ] No unnecessary duplicate components are introduced.
- [ ] Existing routes and integrations remain functional.
- [ ] Available lint, type, build, and test checks pass.

Do not claim that a test passed unless it was actually executed.

---

## 16. Implementation Order

Follow this sequence:

1. Audit the existing components and architecture.
2. Map current components to the proposed responsibilities.
3. Establish or reuse shared design tokens.
4. Refine layout components and common UI primitives.
5. Improve the hero and rental application sections.
6. Refine capacity, process, gallery, and trust components.
7. Update enquiry, contact, and FAQ components.
8. Apply responsive behavior consistently.
9. Review animations and interaction states.
10. Test components within the full existing website.
11. Document any missing business data and remaining limitations.

Do not build every proposed component independently before checking what already exists.

---

## 17. Definition of Done

The component redesign is complete when:

- Shared components are consistent and maintainable.
- Each component has a clear responsibility.
- Existing functionality is preserved.
- No unnecessary duplicate architecture has been introduced.
- Layouts adapt across supported screen sizes.
- Forms, links, navigation, and interactions work correctly.
- Animations are reliable and nonessential to functionality.
- Accessibility and performance have been reviewed.
- Available verification checks have been completed.
- Unknown business information has not been fabricated.
- Remaining issues and unverified features are reported honestly.

## Final Principle

**Build only the components the website needs. Reuse what works, improve what is weak, keep the design fluid, and verify every component in the context of the complete website.**

