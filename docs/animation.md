# `animation.md` — GSAP Motion System & Awwwards-Level Interaction

## 1. Purpose

Create a premium, modern, Awwwards-inspired animation system for the **existing generator rental website**.

The motion should make the business feel reliable, technically capable, and professionally presented. Animations must support the content and rental-enquiry journey—not distract from it.

The visual direction combines:

- Refined editorial layouts and confident typography.
- Smooth GSAP timelines and carefully controlled ScrollTrigger reveals.
- Natural, lightweight movement rather than exaggerated effects.
- Selective cinematic movement for generator imagery and hero compositions.
- Responsive behavior across mobile, tablet, laptop, desktop, and intermediate screen sizes.
- Stable, accessible interactions with no layout jumps, flicker, or scroll-related bugs.

**Core principle:** Premium motion comes from timing, composition, restraint, and consistency—not from animating every element.

---

## 2. Mandatory Existing-Website Rules

Before implementing any animation:

1. Audit the current codebase, framework, routing, installed dependencies, existing animations, and page structure.
2. Inspect the actual website and identify what already works.
3. Reuse and improve existing components before creating replacements.
4. Preserve working forms, enquiry flows, integrations, navigation, route behavior, analytics, and other valid functionality.
5. Do not rebuild the site from scratch or replace its architecture merely to introduce GSAP.
6. Remove or replace existing animation code only after understanding its purpose and dependencies.
7. Do not install duplicate animation libraries if the project already has a suitable implementation.
8. Verify that animations do not interfere with form validation, sticky navigation, page transitions, anchor links, or browser history.

If the project already uses another animation system, evaluate whether GSAP can be integrated cleanly before introducing it.

---

## 3. Motion Art Direction

### Overall direction

**Premium industrial minimalism with controlled cinematic movement.**

The website should feel visually polished and technically confident, with animation quality inspired by award-winning web experiences. Take inspiration from the sophistication of professional portfolio and agency websites without copying their designs or introducing effects that do not suit a generator rental business.

Use motion to communicate:

- Reliable temporary power.
- Professional equipment and project readiness.
- Clear service categories.
- A simple rental enquiry process.
- Confidence in the business and its presentation.

### Brand design alignment

Use the existing `design-system.md` as the source of truth.

| Design element | Specification |
|---|---|
| Primary background | Soft Ivory `#FFF7EB` |
| Structural color | Charcoal `#2B2B2B` |
| Accent | Power Orange `#FF8A00` |
| Typography | Manrope |
| Animation library | GSAP |
| Scroll animation | GSAP ScrollTrigger |
| Design behavior | Fluid and responsive |
| Motion character | Smooth, restrained, deliberate |

Do not use orange as a constant glow or animated decoration. Reserve it for important actions, subtle highlights, and selected moments of emphasis.

---

## 4. Recommended Animation Stack

Use only the tools needed by the existing project.

### Core libraries

- **GSAP:** Main animation engine, tweens, easing, stagger effects, and timelines.
- **ScrollTrigger:** Viewport-based reveals and selected scroll-linked animation.
- **`gsap.matchMedia()`:** Responsive animation variations and reduced-motion preferences.
- **Existing smooth-scrolling solution:** Keep it if already integrated and stable. Do not introduce a second scrolling controller.

Official documentation:

- GSAP documentation: https://gsap.com/docs/v3/
- GSAP timelines: https://gsap.com/docs/v3/GSAP/Timeline/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Responsive motion with `gsap.matchMedia()`: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/

Use current documentation to confirm APIs and compatibility with the project's installed version.

### Installation policy

Inspect `package.json` and the lockfile first. If GSAP is not installed and is appropriate for the existing framework, install the required packages using the project's current package manager. Avoid unnecessary dependencies.

Register `ScrollTrigger` once in the appropriate shared animation module rather than repeatedly in individual components.

---

## 5. Global Motion Tokens

Centralize motion values so the entire website feels consistent.

These values are starting points, not rigid rules. Adjust them after reviewing the real layout and rendered behavior.

| Token | Starting value | Purpose |
|---|---:|---|
| `motion-fast` | 0.18s | Small interactive feedback |
| `motion-ui` | 0.28s | Buttons and navigation |
| `motion-reveal` | 0.65s | Standard content reveals |
| `motion-feature` | 0.9s | Hero and prominent visuals |
| `motion-cinematic` | 1.2s | Selected large imagery |
| `stagger-tight` | 0.07s | Small groups |
| `stagger-standard` | 0.11s | Cards and related content |
| `stagger-wide` | 0.16s | Hero text sequence |
| `reveal-distance` | 20px | Standard vertical reveal |
| `reveal-distance-large` | 36px | Selected feature reveals |
| `image-scale-start` | 1.045 | Subtle image entrance |
| `image-scale-end` | 1 | Final image scale |

Use consistent easing:

- **Standard reveals:** `power2.out`
- **Hero entrance:** `power3.out`
- **Small UI interactions:** `power2.out`
- **Gentle continuous movement:** `sine.inOut`
- **Scroll-linked transformations:** usually `ease: "none"`

Avoid excessive bounce, elastic movement, overshooting, and dramatic back-easing on a professional rental website.

### Motion rules

- Prefer `transform` and `opacity` for routine movement.
- Avoid animating layout-heavy properties such as `top`, `left`, `width`, and `height` continuously.
- Animate large images carefully to avoid unnecessary repainting.
- Use `clip-path` or masks selectively, after testing browser performance.
- Do not apply blur animations to large areas unless profiling confirms they are inexpensive.
- Avoid stacking multiple transforms on the same element from unrelated animation systems.

---

## 6. Global Animation Principles

Every animation must follow these rules.

### Rule A — Reveal content quickly

Text and cards should become readable shortly after entering the viewport. Do not force visitors to scroll through long sequences before understanding the page.

### Rule B — Use one clear motion idea per section

A section may have a heading reveal, a visual entrance, or a card stagger. Do not animate every child independently.

### Rule C — Keep scroll movement proportional

Most animations should be triggered by scrolling rather than continuously controlled by it. Reserve `scrub` for visuals that genuinely benefit from direct scroll control.

### Rule D — Never hide essential content indefinitely

Content must remain accessible if JavaScript fails, GSAP fails to load, or an animation does not initialize. Avoid permanent invisible states caused by `autoAlpha: 0` or CSS hiding.

### Rule E — Avoid scroll hijacking

Keep native scrolling as the default. Do not force visitors to follow a pinned presentation or unusually long animation before they can continue.

### Rule F — Do not animate for decoration alone

Every effect must improve hierarchy, provide feedback, or support a meaningful visual transition.

---

## 7. Hero Animation — Primary Visual Experience

The hero is the most important animation sequence on the homepage.

### Recommended concept: Quiet Power Reveal

Use a strong headline, a restrained equipment photograph or verified generator visual, and a clear rental-enquiry action.

The animation should feel deliberate and premium—not like a game intro or a flashy technology demo.

### Sequence

| Time | Element | Motion |
|---|---|---|
| 0.00s | Hero container | Already in its natural layout; no blank-screen loader |
| 0.10s | Eyebrow | Fade in with a 10px upward movement |
| 0.20s | Main heading | Reveal with a 16–24px upward movement |
| 0.36s | Supporting copy | Fade in with a subtle upward movement |
| 0.48s | Primary and secondary CTAs | Fade in with a short stagger |
| 0.35–0.70s | Hero image | Subtle scale settles toward 1 |
| 0.80–1.10s | Final settling | Sequence completes without unnecessary looping |

Use overlapping timeline positions to keep the sequence compact. Do not wait for one element to finish completely before starting the next.

### Headline treatment

- Prefer a clean line-by-line reveal or a single heading fade-and-rise.
- Keep the complete heading in the document for accessibility.
- Do not split individual characters unless the typography and implementation genuinely benefit from it.
- Prevent layout shifts by reserving the final text and image dimensions.

### Hero visual

If using a real generator image:

- Start with a subtle scale of approximately `1.03–1.05`.
- Settle to `1`.
- Optionally use a very slight vertical movement.
- Preserve the equipment's natural appearance.
- Avoid fake sparks, excessive smoke, aggressive light streaks, and constant orange glow.

Use a 3D scene only if the current hardware, asset quality, and page performance support it. A well-composed photograph with excellent motion can look more premium than an unnecessary 3D scene.

---

## 8. ScrollTrigger Reveal System

Create reusable reveal patterns rather than writing unrelated animations for every section.

### Pattern A — Standard content reveal

For paragraphs, supporting text, section headings, and small visual elements:

- Start: `top 88%`
- Initial Y movement: 16–20px
- Duration: 0.55–0.7s
- Ease: `power2.out`
- Play once when entering the viewport.

### Pattern B — Feature reveal

For a prominent equipment photograph, large feature panel, or key service visual:

- Start: `top 82%`
- Initial Y movement: 20–28px
- Duration: 0.7–0.9s
- Ease: `power3.out`
- Use a restrained image scale transition when appropriate.

### Pattern C — Card group reveal

For service or application cards:

- Start: `top 86%`
- Initial Y movement: 14–18px
- Duration: 0.55–0.7s
- Stagger: 0.08–0.12s
- Animate the group as one coordinated entrance.

**Important:** Six cards should not require six separate scroll events or a long sequence. Trigger the group when the section enters view and finish the reveal within approximately 0.9 seconds.

### Pattern D — Section transition

Use a subtle reveal on the section heading and one supporting visual. Let the rest of the content appear naturally.

Avoid repeatedly fading in entire sections if doing so makes the website feel slow or causes visible content to disappear while scrolling.

### Pattern E — Image entrance

For project imagery and equipment photographs:

- Use a small scale transition or a subtle clipping reveal.
- Avoid animating both a complex clip path and a large scale unless necessary.
- Maintain the correct aspect ratio.
- Ensure the final image is visible when animation is disabled.

### ScrollTrigger configuration principles

- Use `once: true` for standard reveal animations that should not replay on every scroll.
- Use `scrub` only for animations that should follow scroll progress.
- Avoid `pin: true` for ordinary content sections.
- Avoid unnecessary `snap`.
- Use `markers: true` only during development and remove them before production.
- Refresh scroll measurements after relevant layout changes, such as loading dynamic content or completing a major layout transition.
- Avoid duplicate ScrollTriggers when components remount.

---

## 9. Component-by-Component Motion Matrix

| Component | Animation | Trigger | Priority |
|---|---|---|---|
| Site header | Short entrance or clean static load | Page load | Medium |
| Desktop navigation | Underline or subtle color transition | Hover/focus | Medium |
| Mobile navigation | Short panel reveal | Menu toggle | High |
| Hero eyebrow | Fade and rise | Page load | High |
| Hero heading | Compact staggered reveal | Page load | High |
| Hero supporting copy | Fade and rise | Page load | High |
| Hero CTA buttons | Short staggered entrance | Page load | High |
| Hero equipment visual | Subtle scale settle | Page load | High |
| Section headings | Fade and rise | ScrollTrigger | High |
| Intro content | Compact text reveal | ScrollTrigger | Medium |
| Wedding card | Small upward reveal | Group enters view | High |
| Event card | Small upward reveal | Group enters view | High |
| Industrial card | Small upward reveal | Group enters view | High |
| Capacity overview | Heading and visual reveal | ScrollTrigger | High |
| Capacity cards | Coordinated group stagger | ScrollTrigger | Medium |
| Why Choose Us | Text and image reveal | ScrollTrigger | Medium |
| Rental process | Sequential step reveal | ScrollTrigger | High |
| Project showcase | Image reveal | ScrollTrigger | Medium |
| Service area | Simple text reveal | ScrollTrigger | Low |
| FAQ accordion | Height/content transition | User interaction | High |
| Enquiry form | Minimal entrance | ScrollTrigger | Medium |
| Form validation | Inline feedback | Form interaction | High |
| Final CTA | Heading and button reveal | ScrollTrigger | High |
| Footer | Mostly static; subtle reveal if needed | ScrollTrigger | Low |

Do not animate every component just because it appears in this table. Prioritize visible improvements and reuse the existing component structure.

---

## 10. Application Cards — Weddings, Events, Industrial

These three application cards should feel coordinated and premium.

### Entrance animation

1. The section heading appears.
2. The three cards reveal with a short stagger.
3. Each card reaches its final position quickly.
4. No card remains hidden while waiting for another scroll.

### Hover behavior

For pointer devices only:

- Image scale: approximately `1.02–1.035`.
- Transition: `0.35–0.5s`.
- Ease: `power2.out`.
- Arrow or CTA movement: a small horizontal shift of 3–5px.
- Border or accent transition: subtle and consistent with the design system.

Keep the card's text, button, and overall layout stable. Avoid dramatic tilting, floating cards, excessive shadows, and cursor-following effects.

### Touch behavior

- Do not rely on hover to expose essential information.
- Keep all text and actions available by default.
- Do not use sticky hover states.
- Preserve normal tap behavior.

---

## 11. Capacity Overview — 5 kVA to 250 kVA

The capacity section should communicate the rental range without making unsupported claims about individual generator availability.

### Recommended motion

- Reveal the heading and introductory text.
- Introduce a visual range indicator or a simple capacity presentation if it suits the existing design.
- Use one subtle progression effect, not multiple competing effects.
- If capacity values animate numerically, keep the actual value available to screen readers and avoid repeatedly counting every time the section enters view.

Do not create animated counters for fleet size, customer numbers, years of experience, or generator availability unless those values are verified.

**Technical rule:** Capacity must not be automatically recommended based only on labels such as “wedding” or “industrial.” Any sizing interaction must account for actual connected loads and relevant electrical requirements.

---

## 12. Rental Process Animation

If the existing page has a rental-process section, use a short, coordinated sequence.

Example steps:

1. Share your requirements.
2. Discuss suitable capacity and project needs.
3. Confirm availability and rental details.
4. Coordinate the next steps.

Only publish this sequence if it accurately represents the business's real process.

### Animation direction

- Reveal the section heading.
- Bring the steps into view with a short stagger.
- Optionally animate a thin connecting line on desktop if the layout already supports it.
- Keep the complete process visible without requiring additional scrolling.
- On mobile, use a simple vertical list with no pinned sequence.

Do not create a multi-screen scroll-controlled process that makes a short explanation feel like a long presentation.

---

## 13. Navigation, Buttons, and Micro-interactions

Micro-interactions should feel immediate and precise.

### Buttons

- Use CSS transitions for basic color, border, and background changes.
- Transition duration: approximately `0.18–0.28s`.
- A tiny arrow shift is acceptable.
- Do not move the entire button dramatically on hover.
- Keep focus-visible states clear.
- Maintain the chosen orange button treatment and verify text contrast.

Use GSAP only when a button interaction genuinely requires a coordinated sequence. Do not create a GSAP timeline for every ordinary hover.

### Navigation

- Use a subtle underline or accent transition.
- Keep active-route indication visible.
- Ensure keyboard focus and hover states both work.
- Avoid full-screen animated navigation unless it is necessary for the existing design.

### FAQ accordion

- Use the existing accessible accordion implementation where available.
- Animate content expansion only when it can be done without clipping or breaking layout.
- Respect reduced-motion preferences.
- Preserve keyboard operation and accurate `aria-expanded` state.

### Form feedback

- Display validation messages clearly.
- Use a short opacity transition if appropriate.
- Do not shake the whole form or rely on color alone to communicate errors.
- Never delay form submission, validation, or error feedback for a decorative animation.

---

## 14. Scroll-Linked and Cinematic Effects

Use these selectively.

### Allowed where justified

- A subtle hero image parallax.
- A short image clipping reveal.
- A restrained line-drawing effect.
- A limited scroll-linked visual transformation.
- A small background position shift behind a prominent image.

### Constraints

- Keep parallax movement small, typically around 8–20px.
- Use one primary scroll-linked effect per major section at most.
- Do not animate large background surfaces continuously.
- Do not make text move independently in ways that reduce readability.
- Do not pin long sections merely to demonstrate GSAP.
- Never introduce horizontal overflow.
- Disable or simplify complex effects on touch devices when appropriate.

A cinematic effect is justified only if it adds meaning and does not slow down the rental-enquiry journey.

---

## 15. GSAP Implementation Pattern

Use a reusable pattern adapted to the project's framework. The following example illustrates the intended implementation style; it is not a mandate to create a new framework or replace working code.

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reveal = (element) => {
  const ctx = gsap.context(() => {
    const targets = element.querySelectorAll("[data-reveal]");

    gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        y: 18,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      }
    );
  }, element);

  return () => ctx.revert();
};
```

Adapt lifecycle management to the framework. In React, initialize animations inside an appropriate effect or GSAP context hook and return cleanup. Do not invoke this function without ensuring that its lifecycle is managed correctly.

### Implementation requirements

- Scope selectors to the relevant component.
- Avoid broad global selectors that accidentally animate unrelated elements.
- Clean up GSAP contexts and ScrollTriggers when components unmount.
- Avoid initializing the same animation multiple times.
- Ensure the animation setup is safe with React Strict Mode if the project uses React.
- Handle dynamic content and route changes where relevant.
- Use semantic markup and data attributes for animation targets.
- Keep core layout and content visible if animation initialization fails.

---

## 16. Timeline Example — Hero Entrance

A single timeline should coordinate related hero elements. Use overlap to keep the sequence fast and polished.

```js
const tl = gsap.timeline({
  defaults: {
    ease: "power3.out",
  },
});

tl.from("[data-hero-eyebrow]", {
  autoAlpha: 0,
  y: 10,
  duration: 0.45,
})
.from(
  "[data-hero-title]",
  {
    autoAlpha: 0,
    y: 22,
    duration: 0.7,
  },
  "-=0.25"
)
.from(
  "[data-hero-copy]",
  {
    autoAlpha: 0,
    y: 14,
    duration: 0.55,
  },
  "-=0.35"
)
.from(
  "[data-hero-actions]",
  {
    autoAlpha: 0,
    y: 10,
    duration: 0.45,
  },
  "-=0.25"
);
```

Adjust selectors to match the real component structure.

Do not hide essential content in CSS before this timeline runs. Provide a visible fallback so that failed JavaScript, delayed assets, or disabled animation never leave the hero blank.

---

## 17. Responsive Motion System

The design must adapt fluidly to phones, tablets, laptops, desktops, and intermediate viewport sizes.

Use `gsap.matchMedia()` to apply and clean up different animation setups when the viewport or motion preference changes.

### Desktop

- Full hero sequence.
- Subtle image movement.
- Small card hover effects on suitable pointer devices.
- Selective parallax where justified.
- Slightly richer transitions if performance remains stable.

### Tablet

- Reduce the number of simultaneous effects.
- Shorten stagger sequences when several cards share the viewport.
- Keep image transformations subtle.
- Avoid pinning if it complicates normal scrolling.

### Mobile

- Prioritize immediate content visibility.
- Use short fades and small vertical reveals.
- Disable complex parallax and nonessential scroll-linked effects.
- Do not require hover.
- Avoid long stagger sequences and pinned sections.
- Preserve native touch scrolling and browser controls.

### Reduced motion

Use the `prefers-reduced-motion` media preference.

When reduced motion is requested:

- Disable nonessential parallax, continuous movement, and elaborate scroll-linked effects.
- Remove unnecessary delays and stagger sequences.
- Make essential content immediately visible.
- Keep functional transitions short or remove them when appropriate.
- Preserve the meaning and usability of every section.

Example responsive setup:

```js
const mm = gsap.matchMedia();

mm.add(
  {
    desktop: "(min-width: 64rem)",
    compact: "(max-width: 63.999rem)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { desktop, compact, reduceMotion } =
      context.conditions;

    if (reduceMotion) {
      // Keep content visible and skip nonessential motion.
      return;
    }

    if (desktop) {
      // Set up desktop-only motion where justified.
    }

    if (compact) {
      // Use simpler mobile/tablet motion.
    }
  }
);

// Call mm.revert() during the owning component's cleanup.
```

This is a conceptual example. Integrate it into the appropriate lifecycle and use the actual breakpoints defined in `design-system.md`.

---

## 18. Performance and Stability Requirements

Aim for smooth motion on typical supported devices. Do not claim a guaranteed frame rate without measuring it.

### Required practices

- Animate `transform` and `opacity` wherever practical.
- Avoid expensive continuous filters, large blur effects, and full-screen animated canvases unless justified.
- Keep hero imagery optimized and reserve its layout dimensions.
- Avoid loading a heavy animation bundle before it is needed when code splitting is practical.
- Prevent layout shifts during text and image reveals.
- Do not initialize duplicate event listeners or ScrollTriggers.
- Clean up animations during component unmount and route transitions.
- Verify that sticky elements, dropdowns, modals, and forms remain functional.
- Test ScrollTrigger measurements after font loading and relevant dynamic layout changes.
- Avoid running multiple smooth-scroll systems simultaneously.

Use browser performance tools to identify actual bottlenecks instead of assuming an animation is smooth because it looks correct on one desktop.

### Common bugs to prevent

- Content stays invisible after a failed animation setup.
- ScrollTrigger positions become incorrect after responsive layout changes.
- Cards animate repeatedly because components remount.
- Hero animations replay unexpectedly after route transitions.
- Images cause layout jumps.
- Mobile scrolling becomes sticky or unresponsive.
- Animated text clips descenders or wraps differently during animation.
- Fixed or pinned sections create excess whitespace.
- Hover animations interfere with touch interactions.
- Timelines continue running after their components unmount.

---

## 19. Accessibility Requirements

- Use semantic HTML and maintain the correct heading hierarchy.
- Keep animated content available to assistive technology.
- Never use animation as the only way to communicate information.
- Preserve keyboard navigation and visible focus states.
- Do not animate focus indicators in ways that reduce visibility.
- Respect `prefers-reduced-motion`.
- Avoid flashing effects and rapid repetitive movement.
- Ensure interactive controls remain operable while animations run.
- Do not delay important error messages, confirmations, or form feedback.

Accessibility is part of the motion implementation, not a final optional enhancement.

---

## 20. Testing and Validation

Test the completed redesign at minimum across:

- Small mobile screens.
- Standard mobile screens.
- Tablet portrait and landscape.
- Laptop screens.
- Desktop screens.
- Wide desktop screens.
- Intermediate widths where cards and headings change layout.

### Functional checks

- [ ] The homepage works with animations enabled.
- [ ] The page remains usable with reduced motion enabled.
- [ ] Essential content remains visible if JavaScript animation setup fails.
- [ ] No unexpected horizontal scrolling appears.
- [ ] No hero content is clipped.
- [ ] No blank sections or invisible cards remain.
- [ ] Navigation and route changes work.
- [ ] Rental enquiry forms remain functional.
- [ ] Validation messages and submission states work.
- [ ] FAQ accordions remain accessible.
- [ ] Images load without causing layout shifts.
- [ ] Animations are cleaned up on unmount.
- [ ] No duplicate timelines or ScrollTriggers are created.
- [ ] No console errors or animation-related warnings remain.
- [ ] Touch interactions do not depend on hover.
- [ ] Animation timing feels consistent throughout the website.

### Final visual review

Review the full page at normal scrolling speed, not only by jumping between sections.

Check that:

- The hero is engaging but not slow.
- Sections reveal without demanding excessive scrolling.
- Card groups animate as a single visual unit.
- The Energy Orange accent remains purposeful.
- Motion reinforces the content hierarchy.
- The rental enquiry CTA stays easy to find and use.
- Mobile motion is simpler, not merely a smaller desktop animation.

---

## 21. Implementation Order

Follow this order to minimize regressions.

1. Audit the existing animation setup and dependencies.
2. Identify the highest-value animation improvements.
3. Establish shared motion tokens and reusable reveal utilities.
4. Implement and test the hero timeline.
5. Add section-heading and content reveals.
6. Add compact application-card and capacity-section reveals.
7. Add process and showcase motion where useful.
8. Refine buttons, navigation, accordions, and form feedback.
9. Implement responsive and reduced-motion behavior.
10. Validate layout stability, performance, accessibility, and functionality.
11. Remove debugging markers and temporary animation code.
12. Report exactly what was implemented, what was preserved, and what remains incomplete.

Do not animate every page or component before validating the first shared pattern. Build a reliable system, test it, and then reuse it consistently.

---

## 22. Definition of Done

The animation work is complete when:

- GSAP and ScrollTrigger are integrated cleanly with the existing application.
- The hero has a polished, compact entrance sequence.
- Scroll reveals are consistent and do not create excessive scrolling.
- Application cards and important visuals have refined movement.
- Buttons, navigation, FAQs, and forms remain fully functional.
- Animations respond appropriately to screen size and reduced-motion preferences.
- Essential content remains visible if animation code fails.
- No unnecessary architecture changes or regressions have been introduced.
- The page has been checked on mobile, tablet, and desktop.
- No known animation-related console errors remain.
- The final implementation is documented honestly.

**Final direction:** Build a website that feels premium through precise movement, strong typography, confident imagery, and excellent timing. Use GSAP timelines where sequencing matters and ScrollTrigger where scroll-based entry genuinely helps. Preserve what works, improve what is weak, and make every animation serve the visitor's understanding or rental-enquiry journey.

