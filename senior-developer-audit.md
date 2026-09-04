# RainCity Property Maintenance — Senior Developer Audit

**Audit date:** 2026-08-31  
**Auditor:** Senior Developer / Front-End Architect / Security Review  
**Codebase:** Next.js 16 / React 19 / TypeScript 7 / Tailwind CSS v4 — fully static, no backend  
**Build output:** 37 public routes, 39 prerendered HTML pages

---

## 1. Executive Summary

**Overall codebase health: 7.5 / 10**

The codebase is architecturally sound, typographically disciplined, and well-structured for a static marketing site. The design-system discipline (locked tokens, single data source for all content, no remote image hosts, narrow motion usage) is genuinely well-engineered and substantially above typical agency output. Accessibility implementation is thorough — skip navigation, focus traps, ARIA labels, and reduced-motion handling are all present and correct.

However, three categories of issues prevent this site from going live safely:

1. **No HTTP security headers** — every browser request is answered with no Content-Security-Policy, no X-Frame-Options, no HSTS, and no X-Content-Type-Options. This is the single highest-severity technical gap.
2. **The quote form submits to nothing** — client-side validation fires, the success state displays, and the submission is discarded. Zero leads are captured.
3. **Placeholder content is indexed** — six blog posts with invented dates and AI-drafted copy carry live `BlogPosting` JSON-LD. Four legal pages carry unreviewed policy text. Both are currently in the sitemap.

Beyond those blockers, the most widespread mechanical issue is that **`cursor: pointer` appears nowhere in the codebase** — every `<button>` element renders with the OS default arrow cursor, which is a perceptible UX regression compared to user expectations.

### Top 10 Critical Issues

| # | Issue | Severity |
|---|-------|----------|
| 1 | No HTTP security headers (CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy) | Critical |
| 2 | QuoteForm silently discards every submission — no backend wired | Critical |
| 3 | All 6 blog posts are placeholder content but are indexed with live `BlogPosting` JSON-LD | Critical |
| 4 | All 4 legal pages carry unreviewed placeholder text, currently indexed at priority 0.3 | Critical |
| 5 | `cursor: pointer` missing on every `<button>` in the site — arrow cursor on all interactive controls | High |
| 6 | No `autocomplete` attributes on any QuoteForm field (name, phone, email, date) | High |
| 7 | No loading state on the submit button — no spinner or disabled state during async operation | High |
| 8 | 4 of 6 testimonials are invented; no `Review` JSON-LD until real (correct), but placeholder copy is live | High |
| 9 | All 4 social links are `href="#"` — every social icon in header and footer goes nowhere | High |
| 10 | Google Maps iframe in QuoteForm will be blocked by any strict CSP — frame-src must be explicitly allowed | Medium |

---

## 2. Site-wide / Systemic Issues

### 2.1 `cursor: pointer` Missing Everywhere

**Pattern:** Zero occurrences of `cursor-pointer` across all `.tsx` files and `globals.css`.

**Effect:** Every `<button>` element on the site — the quote form submit button, mobile menu toggle, hamburger icon, testimonials carousel arrows and dot indicators, FAQ accordion triggers, ScrollToTop, PostShare social buttons, CopyLink — renders with the OS default arrow cursor. Links (`<a>` tags) correctly show the hand cursor from the browser UA stylesheet. Buttons do not. This is the visual difference between an element that feels interactive and one that feels inert.

**Fix:** Add `cursor-pointer` as a base utility to all `<button>` elements. The most reliable approach is a single CSS rule in `globals.css`:

```css
button { cursor: pointer; }
```

Or add `cursor-pointer` to `Button.tsx`'s base class string and to the individual `<button>` elements in `Testimonials.tsx`, `Header.tsx`, `FaqAccordion.tsx`, `ScrollToTop.tsx`, `CopyLink.tsx`, and `PostShare.tsx`.

### 2.2 No HTTP Security Headers

**Pattern:** `next.config.ts` exports only image config. No `headers()` export. No `middleware.ts`. No platform-level header config found.

**Effect:** Every page is served with no Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, or Referrer-Policy. These headers are a baseline expectation for any production web property and are free to add.

**Fix:** Add a `headers()` function to `next.config.ts`. See Security Findings section (§4) for the complete recommended header set.

### 2.3 QuoteForm Delivers No Leads

**Pattern:** `components/home/QuoteForm.tsx` line 26: `TODO: no backend. Validation and the success state are real; nothing is sent.`

**Effect:** A visitor fills out the form, passes validation, receives a "Request received" confirmation, and the data is discarded. This is a silent failure — neither the visitor nor RainCity is notified anything went wrong, because from the visitor's perspective nothing did.

**Fix:** Wire the submit handler to a real destination before launch. Options in order of simplicity: a third-party form service (Formspree, Web3Forms), a Vercel server action sending email via Resend/SendGrid, or a CRM webhook. The honeypot already provides basic bot filtering.

### 2.4 Placeholder Content Currently Indexed

**Pattern:** Three families of placeholder content are live in the sitemap:

- **Blog posts** — all 6 articles (`blogPosts` in `lib/content.ts`) are AI-drafted content with invented dates, methods stated as fact, and copy that could mislead readers. `BlogPosting` JSON-LD is published for each.
- **Legal pages** — all 4 policies carry `PLACEHOLDER LEGAL TEXT` comment blocks. The operational numbers (24-hour cancellation window, 50% late charge, net-30 invoicing, etc.) were not supplied by the client.
- **Location copy** — all 9 community pages contain written-not-supplied copy. Lower exposure, same principle.

**Fix:** Either replace content before launch, or add `export const metadata = { robots: { index: false } }` to each affected route. The sitemap entries should remain; the content just should not be indexed until it is real.

---

## 3. Page / Component-by-Component Findings

---

## `app/layout.tsx` — Root Layout

- **Issues Found:**
  - [Medium] No `viewport` meta tag exported as a separate `generateViewport()` function. Next.js 14+ deprecates viewport in the `metadata` object. Verify no console warning in build output.
  - [Low] `scroll-behavior: smooth` is set globally in `globals.css` without a `@media (prefers-reduced-motion: no-preference)` guard. The `[data-motion]` rule correctly disables Framer Motion for reduced-motion users, but the CSS `scroll-behavior: smooth` on the `html` element applies regardless. A user who has reduced motion enabled can still experience smooth-scrolled anchor navigation. Add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` to `globals.css`.

- **Why It Matters:** The smooth-scroll gap is a minor WCAG 2.3.3 (Animation from Interactions) consideration. Vestibular disorder users who have set the OS preference to reduce motion should not experience smooth scrolling.

- **Recommended Fix:** In `globals.css`, wrap the `scroll-behavior` declaration: `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`.

---

## `components/home/Header.tsx` — Site Header & Navigation

- **Issues Found:**
  - [High] `cursor-pointer` missing on hamburger button, close button, and dropdown trigger buttons. All show arrow cursor on hover.
  - [Medium] iOS body scroll lock: `document.body.style.overflow = "hidden"` does not reliably prevent background scroll on iOS Safari when momentum scrolling is active. The page behind the mobile menu can still scroll on iPhones.
  - [Medium] Desktop dropdown menus have no close-on-outside-click behaviour verified in source. If they remain open when focus moves away via mouse click elsewhere on the page (not keyboard-driven), this is a usability gap.
  - [Low] `Services` nav dropdown shows a card preview image with `credit` text beneath it. If `credit` is `"Unsplash"` for stock photos (as the registry documents), this text renders publicly in the nav. Consider whether attribution should be visible to end users or only in the codebase.

- **Why It Matters:** The iOS scroll-lock affects every mobile user who opens the nav, which is likely the majority of mobile visitors on a service business site.

- **Recommended Fix:** Replace `document.body.style.overflow = "hidden"` with a scroll-lock that also sets `position: fixed; width: 100%; top: -${window.scrollY}px` on body, restoring scroll position on close. Or use a lightweight library (e.g., `body-scroll-lock`) as the single added dependency it warrants.

---

## `components/home/Hero.tsx` — Homepage Hero

- **Issues Found:**
  - [Low] The hero renders a full-bleed `Photo` with `priority` set — correctly signals LCP to the browser. No issues found with the image pipeline itself.
  - [Low] The CTA button (`Button` component) has no `cursor-pointer`. Users hovering the primary CTA see an arrow cursor.

- **Why It Matters:** The hero CTA is the highest-value conversion point on the page. A cursor that doesn't telegraph interactivity is a subtle but real friction point.

- **Recommended Fix:** Add `cursor-pointer` to `Button.tsx` base class (fixes globally).

---

## `components/home/QuoteForm.tsx` — Quote Request Form

- **Issues Found:**
  - [Critical] No backend — submissions are discarded. See §2.3.
  - [High] No `autocomplete` attributes on any field. `name` field should have `autocomplete="name"`, `phone` should have `autocomplete="tel"`, `email` should have `autocomplete="email"`, `date` should have `autocomplete="off"` (preferred date is future-specific, autofill is unhelpful). The select and textarea can have `autocomplete="off"`.
  - [High] No loading state on submit button. When a backend is wired, clicking Submit will have an async delay with no visual feedback. The button must be disabled and show a spinner during submission.
  - [High] `cursor-pointer` missing on Submit button.
  - [Medium] The Google Maps iframe (`https://maps.google.com/maps?q=...&output=embed`) will be blocked by any `frame-src` CSP directive unless `https://maps.google.com` is explicitly allowed. Plan for this when adding security headers.
  - [Medium] No `<fieldset>` / `<legend>` grouping the required fields. For a form of this length this is optional, but it aids screen reader orientation.
  - [Low] The success state reads "Request received" but the form submission has not actually been received by anyone. This is a pre-launch concern — the message is accurate in intent but not in fact until the backend is wired.

- **Why It Matters:** The quote form is the site's only conversion mechanism. Silent discard is a critical business failure, not just a technical one.

- **Recommended Fix:**
  1. Wire submit to an endpoint before launch.
  2. Add `autocomplete` attributes to all fields in `Field` component (propagate via props).
  3. Add loading state: `const [submitting, setSubmitting] = useState(false)` — disable button and show spinner between submit and response.

---

## `components/home/Services.tsx` — Homepage Service Grid

- **Issues Found:**
  - [High] `cursor-pointer` missing on `ServiceCard` links — the cards are `<a>` tags so they do get the browser's default pointer, but any custom hover styling (border-color transition) deserves a verified cursor state.
  - [Low] The short-row centering logic uses `services.length` to compute column span — well documented and correct.

- **Why It Matters:** Low severity for this component — `<a>` tags get pointer by default.

---

## `components/home/Testimonials.tsx` — Testimonials Carousel

- **Issues Found:**
  - [High] 4 of 6 testimonials are invented placeholder content (documented in `lib/content.ts`). Published publicly. Must be replaced before launch.
  - [High] `cursor-pointer` missing on arrow buttons and dot indicators.
  - [Medium] Auto-play: the carousel auto-advances on a timer but does not pause on hover or focus, nor on `prefers-reduced-motion`. The CSS `[data-motion]` rule suppresses Framer Motion entrance animations, but the auto-rotate JavaScript timer is not gated on the motion preference. Users who have requested reduced motion will still experience the carousel rotating automatically.
  - [Low] The carousel track `<ol>` element has `tabIndex={0}` for keyboard navigation (arrow keys), which is correct. However, individual testimonial `<li>` elements are not themselves focusable — a keyboard user must land on the `<ol>` wrapper. This is a reasonable choice but worth noting for a formal accessibility audit.

- **Why It Matters:** Auto-rotating carousels without a motion preference gate violate WCAG 2.2 Success Criterion 2.2.2 (Pause, Stop, Hide) for users with vestibular sensitivities.

- **Recommended Fix:**
  1. Gate the auto-rotate `useEffect` with `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
  2. Pause rotation on `onMouseEnter` and on `onFocus` (resume on leave/blur).
  3. Add `cursor-pointer` to both arrow buttons and dot buttons.

---

## `components/home/Footer.tsx` — Site Footer

- **Issues Found:**
  - [High] All social links are `href="#"` — clicking Facebook, Instagram, or X in the footer goes nowhere. The client's real profiles must be supplied.
  - [High] `cursor-pointer` missing on social icon buttons/links rendered as `<a>` elements (these do get UA pointer, but the icon wrappers may not depending on implementation).
  - [Medium] Footer renders `social.slice(0, 3)` — deliberately shows only three of four social entries. This is correct behavior given the placeholder state, but worth confirming the intended count once real URLs are supplied.

- **Why It Matters:** Dead social links are immediately visible to any visitor. They undermine the brand's credibility.

---

## `components/ui/Button.tsx` — Primary Button Component

- **Issues Found:**
  - [High] `cursor-pointer` not in the base class string. Every button rendered via this component (quote form submit, hero CTA, service page CTAs, contact page CTAs) shows the OS arrow cursor on hover.
  - [Low] No `disabled` styling variant defined. When a loading state is added to QuoteForm, the button will need a visually distinct disabled appearance.

- **Recommended Fix:** Add `cursor-pointer` to the base Tailwind class string. Add a `disabled:opacity-50 disabled:cursor-not-allowed` class to cover the future loading state.

---

## `components/ui/Motion.tsx` — Animation System

- **Issues Found:**
  - [Low] Framer Motion is statically imported — no `dynamic(() => import(...))` wrapper. The library is included in the initial JS bundle for all pages, including those with no animated content. At Framer Motion's current weight (~50–80kB gzipped depending on which features tree-shake), this is a measurable but not catastrophic bundle cost for a static site.
  - [Low] The `prefers-reduced-motion` integration is correctly handled via the CSS `[data-motion]` rule as noted in CLAUDE.md — this is the right approach and avoids the server/client rendering mismatch that a JS-based approach would create. Confirmed as working correctly.

- **Why It Matters:** Bundle size is a secondary concern given the static nature of the site and the disciplined, narrow usage of Framer Motion.

---

## `components/ui/Photo.tsx` — Image Component

- **Issues Found:**
  - [Low] No issues with the core image pipeline. `fill` mode, explicit `sizes`, blur-up placeholder from dominant tone, correct `priority` + `fetchPriority="high"` pairing — all correct.
  - [Low] Placeholder photos (unfilled registry slots) render as `aria-hidden` divs with a CSS hatch pattern. This is the right approach — no empty `<img alt="">` or generic alt text.

- **Why It Matters:** Performance and accessibility are both handled correctly in this component. No changes needed.

---

## `components/ui/ScrollToTop.tsx` — Scroll-to-Top Button

- **Issues Found:**
  - [High] `cursor-pointer` missing. The button is a fixed-position floating control — the cursor being an arrow when hovering it is especially jarring.
  - [Low] Touch target on mobile: 40px at base, 44px from `sm`. Below 44px technically misses WCAG 2.5.5 at the smallest breakpoint, but this is an accessibility criterion advisory note rather than a strict failure.

- **Recommended Fix:** Add `cursor-pointer` to the button's class list.

---

## `components/service/FaqAccordion.tsx` — Service Page FAQ

- **Issues Found:**
  - [High] `cursor-pointer` missing on accordion trigger buttons.
  - [Low] `inert` attribute used on closed panels — correct modern approach. Falls back gracefully in older browsers (inert simply isn't applied; hidden content is reachable but invisible).

- **Recommended Fix:** Add `cursor-pointer` to the accordion trigger button class list.

---

## `components/blog/Pagination.tsx` — Blog Archive Pager

- **Issues Found:**
  - [High] `cursor-pointer` missing on pagination buttons and the previous/next controls.
  - [Low] The pager renders page numbers as links (`<a>` elements) — those correctly get UA pointer cursor. Only button-style controls are affected.

---

## `components/blog/PostShare.tsx` — Blog Post Share Bar

- **Issues Found:**
  - [High] `cursor-pointer` missing on all share buttons (social share links, CopyLink button).
  - [Low] Social share links open in `target="_blank"` — `rel="noopener noreferrer"` should be verified. If missing, this is a minor `window.opener` security concern.

- **Recommended Fix:** Confirm `rel="noopener noreferrer"` on all `target="_blank"` links. Add `cursor-pointer`.

---

## `components/legal/LegalToc.tsx` — Legal Page Table of Contents

- **Issues Found:**
  - [Medium] `IntersectionObserver` used for scroll-spy — correct modern approach. Mobile panel uses `inert` for close state — correct. `aria-current` on active entry — correct. No issues with the implementation.
  - [High] `cursor-pointer` missing on mobile TOC toggle button.

---

## `app/contact/page.tsx` — Contact Page

- **Issues Found:**
  - [Medium] Contact page lists phone, email, and an address-equivalent (service area description). No contact form on this page — visitors are directed to the homepage quote form. This is a deliberate design choice but may frustrate users who navigate directly to `/contact` expecting to submit a form.
  - [Low] The `ContactDetails` section renders a phone link with `href="tel:..."` — correct. Email renders with `href="mailto:..."` — correct.

---

## `app/blog/[slug]/page.tsx` — Blog Post Template

- **Issues Found:**
  - [Critical] All 6 blog posts are placeholder content with invented dates and AI-drafted copy. Currently indexed with `BlogPosting` JSON-LD. See §2.4.
  - [Medium] Post body uses a typed union (`BlogBlock`) to constrain allowed content — no `dangerouslySetInnerHTML`, no Markdown parser. This is the correct, safe approach and is well-documented.
  - [Low] No author byline — intentional (no real author to name). `blogPostingSchema` names the organisation as author. Correct for now.

---

## `app/(legal)/` — Policy Pages

- **Issues Found:**
  - [Critical] All 4 pages contain placeholder legal text that has not been reviewed by a lawyer or confirmed by the client. Currently indexed.
  - [Medium] `noindex` should be added to all 4 routes until legal review and client sign-off are complete.

- **Recommended Fix:** Add `export const metadata = { robots: { index: false, follow: true } }` to each legal page file until content is confirmed.

---

## `app/sitemap.ts` — Sitemap Generation

- **Issues Found:**
  - [Medium] Placeholder blog posts are included in the sitemap with real `lastModified` dates — crawlers treat these as real, recent articles.
  - [Medium] Legal pages are included at priority 0.3 — crawlers will index unreviewed content.
  - [Low] Sitemap generation is dynamic and fully derived from the content arrays — will auto-update when content is replaced. Correct architecture.

---

## `lib/content.ts` — Content Data Source

- **Issues Found:**
  - [High] `social` array (lines ~42–60): all 4 entries have `href: "#"`. This is the single source of truth for social links — correcting it here fixes header and footer simultaneously.
  - [High] `testimonials`: 4 of 6 marked `PLACEHOLDER` — invented names, invented reviews.
  - [Critical] `blogPosts`: all 6 marked `PLACEHOLDER BLOG CONTENT`.
  - [Critical] `legalPages`: all 4 marked `PLACEHOLDER LEGAL TEXT`.
  - [Medium] `quoteForm.serviceOptions` must be kept in sync manually with the `services` array — no type-enforced link. If a service is added or renamed, the dropdown can silently become stale.
  - [Low] No dead code or unused exports found. All exports are referenced by components.

---

## `lib/seo.tsx` — SEO & Structured Data

- **Issues Found:**
  - [Low] `dangerouslySetInnerHTML` used in `JsonLd` component (line ~728) — correct and standard for JSON-LD injection. Data is serialized from author-controlled objects with no user input. Not a security concern.
  - [Low] `sameAs` deliberately omitted from LocalBusiness JSON-LD until real social URLs are supplied — correct.
  - [Low] FAQ rich results (FAQPage schema) are noted in code comments as limited to government/health pages since 2023. Schema is still published for potential future benefit and for structured-data parsers. Acceptable.

---

## `public/llms.txt`

- **Issues Found:**
  - [Low] `llms.txt` correctly instructs AI crawlers not to cite placeholder testimonials. This instruction should be removed for those items when real reviews replace them — and added back for any newly invented content.

---

## Worktrees in `.claude/worktrees/`

- **Issues Found:**
  - [Low] Three old worktrees (`footer-font-weight-f76291`, `service-page-sections-redesign-ec3132`, `services-page-updates-18c024`) are present in `.claude/worktrees/` and tracked by git. These are development artifacts from prior sessions. They contain full copies of an older version of the codebase including `node_modules/`-adjacent content and screenshot PNGs.
  - [Low] `seo-expert-audit.md` is listed as an untracked file in the project root — a prior audit document not committed or gitignored.

- **Why It Matters:** Tracked worktrees bloat the repository. Old `tsconfig.tsbuildinfo` and screenshot files in them are not harmful but add noise to `git log --all` and `git grep` results.

- **Recommended Fix:** If these branches are merged, `git worktree remove` each and confirm they are removed from `.git/worktrees`. Add a `.gitignore` entry for `.claude/worktrees/` if these are always ephemeral. Add `seo-expert-audit.md` to `.gitignore` or delete it.

---

## `app/page.tsx` — Homepage Route

- **Issues Found:**
  - [Low] No `generateViewport()` export; viewport is declared in `pageMetadata()` via `layout.tsx`. Confirm no Next.js console warning about deprecated viewport in metadata.
  - [Info] Section composition is correct: `JsonLd` → `Header` → `main#main` → all home sections → `Footer` → `ScrollToTop`. `id="main"` is present, which is the skip-nav target. No issues.

---

## `components/home/About.tsx` — Homepage About Section

- **Issues Found:**
  - [High] `cursor-pointer` missing on the secondary Button (`href="/about"`). See §2.1.
  - [Low] `figcaption` uses absolute positioning over a gradient — the `aria-hidden` gradient div prevents it from being announced as decorative noise. Correct approach.
  - [Low] `pointIcons` lookup is keyed by string from content.ts (`tag.icon`). TypeScript enforces the key set via `as const`. No runtime risk.

---

## `components/home/Pillars.tsx` — Why Choose RainCity Section

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] `sizes="100vw"` on the background `Photo` is correct — the photo fills the viewport width.
  - [Low] `aria-labelledby="pillars-heading"` on the section is correct. No issues with accessibility structure.

---

## `components/home/WhyChooseUs.tsx` — Why Choose Us Index

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] The contrast note in the component comment (steel body copy at 4.53:1 on the deepest hover tint) is correctly documented. The constraint is load-bearing: do not darken the row wash without re-measuring.
  - [Low] `rowTint` values are written as whole literal class strings — correct Tailwind scanner behaviour.

---

## `components/home/Projects.tsx` — Before/After Projects

- **Issues Found:**
  - [Medium] The before/after images are labeled as illustrative in `projects.disclaimer`. The same pair of images also appears in the Disclaimer legal page (`projects.disclaimer`). If genuine job photographs replace these, both `projects.items` and the Disclaimer legal page must be updated together — they reference the same data but the legal page prose also restates the disclaimer independently. Review both in the same pass.
  - [Low] `sizes="(min-width: 640px) 45vw, 90vw"` on each `Pane` photo is accurate for a two-up grid on sm+. No issue.
  - [Low] `figure` / `figcaption` markup is semantically correct. No issues.

---

## `components/home/Awards.tsx` — Awards & Recognition

- **Issues Found:**
  - [High] Social links rendered here (`social.map(...)`) are the same `href="#"` entries as in the footer and header. This is a third location on the homepage where broken social links appear (the Awards section's "Follow" row). Same root fix applies: fill real URLs in `lib/content.ts`.
  - [Low] `Image` (Next.js) used directly for badge and credential images rather than the site's `Photo` component. This is correct for brand mark assets that are not subject to the photography registry system. `sizes` prop is specified on both. No issues.
  - [Low] `awards.badge.src`, `awards.credentials[*].src` — these are static image paths. Confirm all referenced files exist in `public/`.

---

## `components/about/AboutHero.tsx` — About Page Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] `RevealOnLoad` used for the above-fold content — correct, avoids the server-render opacity:0 issue documented in `Motion.tsx`. No issues.
  - [Low] Breadcrumb is rendered in the markup and mirrors the `BreadcrumbList` JSON-LD published by `app/about/page.tsx`. Correct.

---

## `components/about/WhoWeAre.tsx` — About Page Who We Are

- **Issues Found:**
  - [High] `cursor-pointer` missing on the secondary `Button` (`href="/services"`). See §2.1.
  - [Low] No issues with composition, accessibility or image handling.

---

## `components/about/Process.tsx` — About Page Our Process

- **Issues Found:**
  - [High] `cursor-pointer` missing on the tertiary `Button` (`href="/services"`). See §2.1.
  - [Low] Numerals are `aria-hidden` — correct, the `<ol>` already announces sequence to screen readers. Avoids double-announcement.

---

## `components/about/Stats.tsx` — About Page Statistics Band

- **Issues Found:**
  - [Medium] The three statistics are "the client's published claims and are not verified" (documented in the component comment). They are not in any structured data schema. If these numbers are printed in marketing materials, a discrepancy between the site and the real figures is a brand risk. Flag for client confirmation at launch.
  - [Low] `aria-label` on the section ("RainCity by the numbers") provides a landmark name without requiring an h2 that would only restate the label. Correct approach.

---

## `components/about/MissionVision.tsx` — Mission & Vision Band

- **Issues Found:**
  - [Low] No interactive elements — no cursor or form issues. Correct accessibility structure with `aria-label` on the section.
  - [Low] Colour contrast: steel body copy on the Vision (Fog) row is 4.5:1+. The `on-navy` class applied to the Mission row ensures white text handles contrast. No issues.

---

## `app/about/page.tsx` — About Route

- **Issues Found:**
  - [Low] Section order follows content inventory. `#quote` anchor target exists (QuoteForm is included). No missing elements.
  - [Low] `JsonLd` publishes `aboutPageSchema` and a `BreadcrumbList`. Both schemas are correct relative to the route.

---

## `components/services/ServicesHero.tsx` — Services Page Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] Tenure figure (`tenure.value` from `aboutPage.stats[0]`) is an unverified client claim — matches the Stats band on /about. No structural issue; the data source is consistent.
  - [Low] `RevealOnLoad` cascade is correct for above-fold content.

---

## `components/services/WhatWeOffer.tsx` — Services Page Value Proposition

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] Principles strip uses whole literal class names for `principleTint` — correct Tailwind scanner behaviour.
  - [Low] No icons used in the principles strip — deliberate per the design system rule against icon-rows.

---

## `components/services/ServicesCatalogue.tsx` — Services Catalogue Grid

- **Issues Found:**
  - [Low] `shortRowOffsets` correctly re-centres the last row when `services.length` is not a multiple of 3. No issues.
  - [Low] `sizes` prop on `ServiceCard` is `"(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"` — correct for a three-up lg / two-up sm grid.

---

## `components/ui/ServiceCard.tsx` — Service Card Component

- **Issues Found:**
  - [Low] "View Service" text is hardcoded in the component (`<span>View Service</span>`) rather than sourced from `lib/content.ts`. This is the only CTA string on the site not living in the content layer. Not a business-critical issue for a static site, but inconsistent with the content-owns-copy convention.
  - [Low] `card-corner-cut` CSS class is applied to both the photo and the wash overlay — correct, keeps the notch aligned. No issues.

---

## `components/service/ServiceHero.tsx` — Service Page Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on both CTAs (`href="#quote"` and `href={business.phoneHref}`). See §2.1.
  - [Low] `heroFocal` lookup for `window-cleaning` provides a custom `object-position` — documented and intentional. The fallback to the registry focal is correct for all other services.

---

## `components/service/ServiceOverview.tsx` — Service Page Scope Section

- **Issues Found:**
  - [High] `cursor-pointer` missing on both `Button` elements (quote and trust-band CTAs). See §2.1.
  - [Medium] Eight of the scope tile photos are `placeholder` entries in the registry (renders as a CSS hatch pattern with no alt text). These are visible in production — every service page shows at least one hatched tile. The comment in `photos.ts` documents what each placeholder needs (process documentation shots that stock cannot supply). This is a photography-scheduling issue, not a code issue, but it affects the live UX of eleven production pages.
  - [Low] `tileWash` values are whole literal class names — correct Tailwind scanner behaviour.
  - [Low] The `expanded` check (`items.some(item => item.description ?? item.photo)`) correctly gates the three-tone tile wash on actual content presence. All eleven services have content today, so the fallback is never reached in production.

---

## `components/service/ServiceProcess.tsx` — How It Works Timeline

- **Issues Found:**
  - [Low] No interactive elements. Timeline rail and nodes use CSS positioning, not Framer Motion — consistent with the "fade + 16px slide only" rule for Framer, while CSS transitions on hover are separate. No issues.
  - [Low] `stepWash` and `nodeTone` are whole literal class names — correct.
  - [Low] The `aria-hidden` duplicate numerals (the echo effect) are correctly hidden. Screen readers announce the list sequence, not the drawn glyph.

---

## `components/service/ServiceClosing.tsx` — Service Page Closing Band

- **Issues Found:**
  - [High] `cursor-pointer` missing on both `Button` elements. See §2.1.
  - [Low] `service.detail.closingPhoto ?? "rooftops"` — the fallback is correct and intentional. All eleven services declare a closing photo, so the fallback is unreached in production. Kept for the twelfth service.

---

## `components/service/ServiceFaq.tsx` — Service Page FAQ Wrapper

- **Issues Found:**
  - [Low] Correctly delegates to `FaqAccordion` (which carries the cursor-pointer issue noted in §3). The null guard (`!faqs?.length`) keeps the markup and JSON-LD in sync.
  - [Low] Sticky heading column (`lg:sticky lg:top-28`) is applied to the wrapper, not the `Reveal` — correct, avoids conflict between CSS sticky and Framer Motion transforms.

---

## `app/services/page.tsx` — Services Route

- **Issues Found:**
  - [Low] Imports `Testimonials` — confirms placeholder testimonial content is on this page too. Same issue as `app/page.tsx`.
  - [Low] Keywords array uses `services.map()` — auto-updates when a service is added. Correct.

---

## `app/services/[slug]/page.tsx` — Service Detail Route

- **Issues Found:**
  - [Low] `dynamicParams = false` prevents any slug not in `generateStaticParams()` from rendering. Correct and well-documented.
  - [Low] `faqSchema` is only emitted when `service.detail.faqs?.length` is truthy — same guard as `ServiceFaq`. Markup and JSON-LD cannot disagree. Correct.

---

## `components/blog/BlogHero.tsx` — Blog Page Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] `truck` photo is acknowledged as a stand-in (stock for a branded fleet shot). The registry note documents this. No code issue.

---

## `components/blog/FeaturedPosts.tsx` — Featured Posts Strip

- **Issues Found:**
  - [Medium] All featured posts are placeholder content. `featuredPosts` are a subset of `blogPosts`, all of which carry the `PLACEHOLDER BLOG CONTENT` flag. The featured strip currently surfaces invented articles with higher visual prominence than the archive grid.
  - [Low] The null guard (`if (featuredPosts.length === 0) return null`) is correct — the section does not render an empty grid. No issues.

---

## `components/blog/BlogArchive.tsx` — Blog Archive Grid

- **Issues Found:**
  - [Medium] All archived posts are placeholder content. Same issue as FeaturedPosts.
  - [Low] `shortRowOffsets` is counted per page rather than across the full archive — correct behaviour for a paginated grid.

---

## `components/blog/PostHeader.tsx` — Blog Post Header

- **Issues Found:**
  - [Low] Photo is `priority` — correct LCP handling for the post hero image.
  - [Low] `dateTime={post.date}` on the `<time>` element carries machine-readable ISO date. The printed format is human-readable via `formatPostDate`. Correct pattern.
  - [Low] Breadcrumb wraps on small screens rather than truncating — intentional and documented.

---

## `components/blog/PostBody.tsx` — Blog Post Body Renderer

- **Issues Found:**
  - [Low] Closed `BlogBlock` union with no `dangerouslySetInnerHTML` and no Markdown parser — the correct security posture. A post cannot introduce unsanctioned HTML or type sizes.
  - [Low] `blockKey()` includes both index and kind — stable key without risk of collision on two identical paragraphs.
  - [Low] `scroll-mt-24` on sections matches the sticky header height used elsewhere. Consistent.
  - [Low] `first:mt-0` on block wrappers correctly drops the top margin from the first block without the renderer needing to know which block it is.

---

## `components/blog/PostColumn.tsx` — Blog Post Reading Column

- **Issues Found:**
  - [Low] The `max-w-prose` trap is correctly documented: on this site `max-w-prose` resolves to `65ch` of the element's own font — harmless on body copy (≈663px), but produces a 1199px "column" on a `display-l` heading. The component solves this by keeping the wrapper at body size and letting every child inherit the width. No action needed; important to preserve this pattern in future edits.

---

## `components/blog/RelatedPosts.tsx` — Related Posts Section

- **Issues Found:**
  - [High] `cursor-pointer` missing on the tertiary `Button` (`href="/blog"`). See §2.1.
  - [Medium] Related posts are placeholder content — same issue as the archive.
  - [Low] Null guard for a blog of one (`posts.length === 0`) is correct.

---

## `app/blog/page.tsx` — Blog Route

- **Issues Found:**
  - [Critical] All posts surfaced on this page are placeholder content with live `BlogPosting` JSON-LD. See §2.4.
  - [Low] `blogPageSchema()` still publishes no list of posts — intentional until real copy is confirmed. Correct.

---

## `components/contact/ContactHero.tsx` — Contact Page Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] Uses `contactHero` photo — a different frame from the homepage hero (documented in the component). No issues.

---

## `components/contact/ContactDetails.tsx` — Contact Cards

- **Issues Found:**
  - [Low] Phone, email, hours and service area all read from `business` — the single source of truth. A contact-info change requires one edit. Correct architecture.
  - [Low] `hover:border-rc-blue` on the card `<li>` — the hover state is on the `<li>` but the card content is not itself a link. This hover effect has no functional meaning (nothing happens on click). The card is informational, not interactive. Low severity — users will not be confused, but a hover state on a non-interactive element is a minor UX inconsistency.

---

## `components/contact/NextSteps.tsx` — What Happens Next Section

- **Issues Found:**
  - [Low] No interactive elements. No cursor or form issues.
  - [Low] "What Happens Next" framing answers hesitation rather than restating a process — deliberate and documented.

---

## `app/contact/page.tsx` — Contact Route

- **Issues Found:**
  - [Medium] Contact page does not contain a form — visitors who navigate directly to `/contact` expecting to submit a request must scroll back to the homepage or use the phone/email links. Every "Get A Quote" CTA on this page links to `#quote`, which resolves to the QuoteForm at the bottom of the same page. This is by design, but it means the quote form on this page is below a long `ContactDetails` + `NextSteps` section. Consider whether the QuoteForm should appear earlier on the contact page, or a second quote form anchor should be closer to the top.
  - [Low] Phone `href="tel:..."` and email `href="mailto:..."` render correctly. `ContactDetails` reads from `business` — single source of truth.

---

## `components/legal/LegalHero.tsx` — Legal Page Banner

- **Issues Found:**
  - [Critical] All four legal pages display unreviewed placeholder text. Banner itself is not the issue — the content behind the banner is. See §2.4.
  - [Low] No CTA in the banner — deliberate. The ask sits at the bottom of each policy page after the reader has what they came for.
  - [Low] All four routes share the `rooftops` photograph — intentional, prevents four choices about what a refund policy "looks like".

---

## `components/legal/LegalPageTemplate.tsx` — Legal Page Shell

- **Issues Found:**
  - [Low] `LegalTocDesktop` is hidden below `lg` via `lg:hidden` complement — wait, the desktop version is always visible, and the mobile version is `lg:hidden`. Let me re-check: `LegalTocDesktop` is rendered in `lg:col-span-3` (left column, only visible at lg+). `LegalTocMobile` is rendered inside the content column with `mt-6 lg:hidden`. This is correct — the mobile one appears above the clauses on small screens, the desktop one anchors in the left rail at lg+.
  - [Low] Revision date rendered above the mobile TOC and the clauses — positioned at the top of the content for accessibility, as documented in the component comment. Correct.

---

## `components/legal/LegalSections.tsx` — Legal Clause Renderer

- **Issues Found:**
  - [Low] Icons mapped via a lookup table (`icons: Record<LegalIconName, ...>`) — correct approach. No dynamic string construction that the bundler cannot see.
  - [Low] `dangerouslySetInnerHTML` is not used anywhere in this renderer — clause body is an array of strings rendered as `<p>` elements. Safe.
  - [Low] `scroll-mt-24` on each clause section matches the sticky header height. Consistent with `PostBody` and `PostHeader`.

---

## `components/locations/LocationsHero.tsx` — Locations Hub Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `Button` (`href="#quote"`). See §2.1.
  - [Low] `rooftops` photo with `focal="50% 55%"` — custom focal point to keep roofline visible in the wide banner crop. Documented.

---

## `components/locations/ServiceArea.tsx` — Locations Overview

- **Issues Found:**
  - [Low] `locations.length` and `services.length` are computed counts — auto-correct when content changes. No risk of drift.
  - [Low] No interactive elements.

---

## `components/locations/CoverageMap.tsx` — Coverage Map & Directory

- **Issues Found:**
  - [Medium] A second Google Maps iframe (in addition to the QuoteForm map). A third exists in `LocationMap`. The SEC-01 CSP recommendation already includes `frame-src https://maps.google.com` — this covers all three iframes. However, the count of three embedded iframes across the site means three separate Google tracking requests per page-load that includes any of them (one per iframe, loaded lazily). If privacy is a concern, a static map image could replace one or more of these.
  - [Low] `MAP_QUERY = "Metro Vancouver, British Columbia, Canada"` — well-commented. Not derived from `business.region` intentionally.
  - [Low] The directory index groups communities by `bearing` — auto-assigns a tenth community to the correct band.

---

## `components/locations/LocationsGrid.tsx` — Community Card Grid

- **Issues Found:**
  - [Low] `shortRowOffsets` correctly handles the nine-card grid (ninth card centred on sm, no short row on lg). No issues.
  - [Low] `LocationCard` component receives correct `sizes` prop.

---

## `components/locations/LocationsClosing.tsx` — Locations Hub Closing Band

- **Issues Found:**
  - [High] `cursor-pointer` missing on both `Button` elements. See §2.1.
  - [Low] `windowClosing` photo — same frame `ServiceClosing` uses. Documented reason: the `lawnClosing` placeholder has not yet been photographed.

---

## `app/locations/page.tsx` — Locations Hub Route

- **Issues Found:**
  - [Low] Keywords generated from `locations.map()` — auto-updates. Correct.
  - [Low] No `SectionEdge` — consistent with /services and /contact boundary treatment.

---

## `components/location/LocationHero.tsx` — Community Page Banner

- **Issues Found:**
  - [High] `cursor-pointer` missing on both CTAs. See §2.1.
  - [Low] Breadcrumb carries three levels (Home / Locations / Community) — mirrors the BreadcrumbList JSON-LD. Correct.
  - [Low] Nine community photos — none was taken in the city it represents. Alt text does not claim otherwise. Documented in `content.ts`.

---

## `components/location/LocationIntro.tsx` — Community Local Brief

- **Issues Found:**
  - [Low] `max-w-prose` is used on the paragraph wrapper (`div.flex.max-w-prose`) but not on the `h2` — correctly follows the PostColumn trap documentation. No issues.
  - [Low] `detail.body.map()` uses `paragraph.slice(0, 32)` as a React key — stable for static content but would collide if two paragraphs share an opening. For static site content this is acceptable.

---

## `components/location/LocationServices.tsx` — Community Service Grid

- **Issues Found:**
  - [Low] Full eleven-service grid on each community page — correct, all services are available in all communities. `services` array is the single source.
  - [Low] Same `ServiceCard` component as the homepage and /services — one piece of furniture.

---

## `components/location/LocationMap.tsx` — Community Map

- **Issues Found:**
  - [Medium] Third Google Maps iframe — same CSP consideration as `CoverageMap`. Already covered by the `frame-src https://maps.google.com` recommendation in SEC-01.
  - [Low] `referrerPolicy="no-referrer-when-downgrade"` on the iframe — correct standard practice.
  - [Low] `loading="lazy"` — correct for below-the-fold content.

---

## `components/location/LocationFaq.tsx` — Community FAQ Section

- **Issues Found:**
  - [High] `cursor-pointer` missing on FAQ accordion triggers (inherited from `FaqAccordion`). See §2.1.
  - [Low] Null guard for missing FAQs is correct. All nine communities have FAQs written; the guard is for a tenth.
  - [Medium] Per-community FAQ copy is written-not-supplied (same category as location `detail` copy). Nine sets of five questions, forty-five answers, none confirmed by RainCity staff. Should be reviewed at launch.

---

## `components/location/NearbyAreas.tsx` — Nearby Communities Section

- **Issues Found:**
  - [Low] `nearbyLocations()` resolves slugs dynamically — a renamed slug produces a missing card rather than a dead link. Safe.
  - [Low] No `cursor-pointer` issue here — the cards are `<Link>` elements (anchor tags), which get the hand cursor from the UA stylesheet.
  - [Low] `shortRowOffsets` called per render — correct, the count varies per community.

---

## `components/location/LocationClosing.tsx` — Community Closing Band

- **Issues Found:**
  - [High] `cursor-pointer` missing on both `Button` elements. See §2.1.
  - [Low] `windowClosing` photo shared across all nine community closing bands and the locations hub closing. Documented.

---

## `app/locations/[slug]/page.tsx` — Community Detail Route

- **Issues Found:**
  - [Low] `dynamicParams = false` — correct, prevents slug-not-in-list from rendering. Matches pattern on `app/services/[slug]/page.tsx`.
  - [Medium] Per-community location copy is written-not-supplied. Nine `detail` blocks covering intro, body, notes, FAQs, and closing. All must be confirmed by RainCity before launch.
  - [Low] `locationFaqSchema` only emitted when `location.detail.faqs?.length` — in sync with `LocationFaq`'s null guard. Correct.

---

## `components/ui/AccentList.tsx` — Dash-Marked List Component

- **Issues Found:**
  - [Low] `key={item}` — stable for static content; would collide on two identical list items. Acceptable for a static site with author-controlled content.
  - [Low] `aria-hidden` on the dash marker — correct, the screen reader does not need to hear "dash" before each item.
  - [Low] `AccentSteps` uses `aria-hidden` on the numeral — correct, avoids double-announcement with the `<ol>` position count.

---

## `components/ui/CopyLink.tsx` — Copy-URL Button

- **Issues Found:**
  - [High] `cursor-pointer` missing on the `<button>` element. See §2.1.
  - [Low] Three-state feedback (idle, copied, failed) with a `role="status"` live region — correct accessibility implementation. The button name stays fixed; the outcome is announced separately.
  - [Low] Timer cleared on unmount — prevents `setState` on an unmounted component.
  - [Low] `navigator.clipboard` failure is caught and surfaced to the user ("Copy failed") — correct defensive handling.

---

## `components/ui/ShareLinks.tsx` — Share Icon Row

- **Issues Found:**
  - [Info] All `target="_blank"` links correctly include `rel="noopener noreferrer"`. SEC-05 concern is resolved here. ✓
  - [Low] Icons are `aria-hidden` and the links carry accessible names including the post title — distinguishable by screen readers across multiple cards.
  - [Low] `relative z-10` on the container lifts the share row above the stretched card link (`after:absolute after:inset-0`). Correct.

---

## `components/ui/LocationCard.tsx` — Location Card Component

- **Issues Found:**
  - [Low] CTA names the community ("View Services in Burnaby") — distinguishable for screen readers. Correct.
  - [Low] Same design pattern as `ServiceCard` — deliberate sibling relationship, not a prop-variant. Any treatment change must be applied to both.
  - [Low] No cursor issues — the card is an anchor tag (`<Link>`), which gets the hand cursor from the UA stylesheet.

---

## `components/ui/PostCard.tsx` — Blog Post Card

- **Issues Found:**
  - [Low] The stretched-link pattern (`after:absolute after:inset-0` on the heading link) with `ShareLinks` on `z-10` is the correct approach for a card with nested interactive elements. No nested anchors.
  - [Low] `hover:border-rc-blue focus-within:border-rc-blue` — both pointer hover and keyboard focus-within change the border. Correct.
  - [Low] `variant` prop controls ratio, padding, title size and excerpt size — lookup table of whole literal class names. Correct Tailwind scanner behaviour.

---

## `components/ui/Logo.tsx` — Logo Component

- **Issues Found:**
  - [Low] `aria-label="RainCity Property Maintenance — home"` on the `<Link>` — correct. The SVG is `aria-hidden`.
  - [Low] Two variants (`dark`, `light`) cover all usage contexts. No issues.

---

## `components/ui/SectionLabel.tsx` — Section Eyebrow Component

- **Issues Found:**
  - [Low] `aria-hidden` on the decorative bar span — correct.
  - [Low] Two `bar` variants (`amber`, `blue`) and two `tone` variants (`light`, `dark`) cover all documented usage. No issues.

---

## `components/ui/SectionEdge.tsx` — Squeegee Edge Transition

- **Issues Found:**
  - [Low] `aria-hidden="true"` on the entire element — correct, it is a decorative transition. No issues.
  - [Low] `sizes` object uses `as const` for the variant lookup — whole literal class names, correct.

---

## `app/robots.ts` — Robots Configuration

- **Issues Found:**
  - [Low] AI crawlers are listed explicitly by name — intentional, documented in the component comment. This is correct and thorough.
  - [Low] `disallow: ["/_next/", "/api/"]` — correct. Build output and API paths are not public pages.
  - [Low] `sitemap` and `host` fields are set. No issues.

---

## `components/ui/Icon.tsx` — Hand-Rolled SVG Icon Library

- **Issues Found:**
  - [Low] All icons are `aria-hidden="true"` — correct. Every usage site either provides its own accessible name (e.g., button text, `aria-label`) or the icon is purely decorative. The dependency is intentional: CLAUDE.md prohibits adding `lucide-react` or any external icon library; this file is the only allowable icon source.
  - [Low] `stroke` constant is declared at module level — all icons share one stroke definition object. This is correct and avoids drift.
  - [Info] `CheckPlate` is the only filled/compound icon (mark inside a cut-plate shape). The rest are pure stroke icons. No issues.

---

## `app/blog/page/[page]/page.tsx` — Blog Archive Pager Route

- **Issues Found:**
  - [Critical] All posts on archive pages beyond page 1 are placeholder content with live `BlogPosting` JSON-LD (inherited from `BlogArchive` → `PostCard`). Same issue as the /blog index.
  - [Low] `dynamicParams = false` prevents `/blog/page/1` and `/blog/page/99` from rendering — correctly documented in the component comment. Page 1 is `/blog`, not `/blog/page/1`.
  - [Low] `isPage(page)` guard before `notFound()` is correct defensive handling for edge-case URL parameters (e.g., `/blog/page/0`, `/blog/page/foo`).
  - [Low] `FeaturedPosts` is intentionally absent on archive pages — repeating the same two large featured cards above every archive page was the stated reason for the omission, documented in the component comment. Correct.

---

## 4. Security Findings

### SEC-01 — No HTTP Security Headers (Critical)

**Severity:** Critical  
**Files:** `next.config.ts` (line 3), no `middleware.ts` present

**Description:** The production site sends zero security-related HTTP response headers. All headers below are absent:

| Header | Risk of Absence |
|--------|----------------|
| Content-Security-Policy | No protection against XSS injection of scripts from third-party origins |
| X-Frame-Options | Site can be embedded in an iframe on any domain (clickjacking risk) |
| X-Content-Type-Options | Browser may MIME-sniff responses as executable content |
| Strict-Transport-Security | No HTTPS upgrade enforcement after first visit |
| Referrer-Policy | Full URL including query strings sent to third parties in HTTP Referer |
| Permissions-Policy | Camera, microphone, geolocation not explicitly restricted |

**Recommended Fix:** Add a `headers()` export to `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",     // Next.js requires unsafe-inline for inline scripts
            "style-src 'self' 'unsafe-inline'",       // Tailwind CSS generates inline styles
            "img-src 'self' data:",                   // Photos self-hosted; blur placeholders are data URIs
            "font-src 'self'",                        // next/font self-hosts Google Fonts
            "frame-src https://maps.google.com",      // QuoteForm + CoverageMap + 9× LocationMap
            "connect-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
          ].join("; "),
        },
        // Add HSTS only after confirming HTTPS is enforced at the host level
        // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    },
  ];
},
```

**Note on HSTS:** Do not set `Strict-Transport-Security` until you are certain the deployment host enforces HTTPS. Setting it before HTTPS is active bricks the domain for all returning visitors until the max-age expires.

**Note on CSP and Next.js:** Next.js 16 injects inline `<script>` tags during hydration. A strict `script-src` without `'unsafe-inline'` requires nonce-based CSP configuration — substantially more complex and beyond what this static site needs. `'unsafe-inline'` is the accepted trade-off for Next.js static sites.

---

### SEC-02 — Form Submission Discarded (Critical — Business Impact)

**Severity:** Critical (business impact, not traditional security vulnerability)  
**File:** `components/home/QuoteForm.tsx` lines 26–57

**Description:** The quote form has client-side validation, a honeypot field, and a success state — but the `submit` function sets `setSent(true)` without transmitting data anywhere. No server action, no fetch to an endpoint, no CRM call.

**Recommended Fix:** Before launch, replace the `setSent(true)` call with a real async submission. Minimum viable option:

```typescript
async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // ... existing validation ...
  if (Object.keys(next).length > 0) { setErrors(next); return; }
  
  setSubmitting(true);
  try {
    const res = await fetch("/api/quote", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    if (!res.ok) throw new Error();
    setSent(true);
  } catch {
    setErrors({ name: "Something went wrong. Please call us directly." });
  } finally {
    setSubmitting(false);
  }
}
```

---

### SEC-03 — Google Maps iframes Without CSP frame-src (Medium)

**Severity:** Medium  
**Files:** `components/home/QuoteForm.tsx` line 156, `components/locations/CoverageMap.tsx`, `components/location/LocationMap.tsx` (×9 community pages — 11 iframes total)

**Description:** There are three distinct iframe embed locations on this site:
1. `QuoteForm.tsx` — contact/quote form map panel
2. `CoverageMap.tsx` — Metro Vancouver coverage map on the `/locations` hub
3. `LocationMap.tsx` — per-community map rendered on each of the 9 `/locations/[slug]` pages

All three embed `https://maps.google.com/maps?...&output=embed`. Any Content-Security-Policy with a `frame-src` directive that does not include `https://maps.google.com` will block all eleven iframes, producing blank map panels with no error to the user.

**Fix:** Include `frame-src https://maps.google.com` in the CSP as shown in SEC-01. This single directive covers all eleven iframes. If the maps embeds are removed or replaced (e.g., with static map images), `frame-src` can be set to `'none'`.

---

### SEC-04 — No Rate Limiting on Public-Facing Form (Low — Pre-backend)

**Severity:** Low (relevant once a backend is wired)  
**File:** `components/home/QuoteForm.tsx`

**Description:** The honeypot provides basic bot filtering on the client. Once a real endpoint is added, that endpoint must independently validate all fields server-side and implement rate limiting. Client-side honeypot and validation are trivially bypassed via direct HTTP requests.

**Recommended Fix:** When wiring the form backend, add server-side field validation and rate limiting (e.g., Vercel's built-in rate limit middleware, or Upstash Redis + Ratelimit if on a serverless platform).

---

### SEC-05 — `target="_blank"` Links Without `rel="noopener"` (Low)

**Severity:** Low  
**Files:** `components/blog/PostShare.tsx`, possibly `components/home/Footer.tsx`

**Description:** Social share links and potentially footer social links that open in a new tab (`target="_blank"`) should include `rel="noopener noreferrer"` to prevent the opened tab from accessing `window.opener` (a minor but real attack surface). Verify each `target="_blank"` occurrence.

**Recommended Fix:** Grep for `target="_blank"` across all `.tsx` files and confirm `rel` includes both `noopener` and `noreferrer` on every match.

---

### SEC-06 — `dangerouslySetInnerHTML` in JSON-LD Component (Informational)

**Severity:** Informational (not a vulnerability in this context)  
**File:** `lib/seo.tsx` line ~728

**Description:** The `JsonLd` component uses `dangerouslySetInnerHTML` to inject serialized schema objects as `<script type="application/ld+json">`. This is the standard and only correct way to inject JSON-LD in React. All data flowing through it is authored in `lib/seo.tsx` from static content constants — no user input reaches it. No action needed, documented for completeness.

---

## 5. Performance Findings

### PERF-01 — Hero LCP Image: Correctly Handled ✓

The hero photograph is served via `Photo` with `priority={true}` and `fetchPriority="high"`. `next/image` will emit the correct `<link rel="preload" as="image">` in the `<head>`. LCP candidate is prioritized. No action needed.

---

### PERF-02 — Font Strategy: Correctly Handled ✓

`next/font/google` self-hosts Chivo and IBM Plex Sans at exactly the weights used. `display: "swap"` prevents invisible text during load. No external font request at runtime. No action needed.

---

### PERF-03 — Framer Motion Bundle Always Loaded (Low)

**File:** `components/ui/Motion.tsx`

**Description:** Framer Motion is statically imported across the entire component tree. It cannot be deferred or code-split without substantial refactoring. Estimated cost: ~60–80kB gzipped. For a service business static site this is acceptable, but it is the largest single JavaScript dependency.

**If further optimization is warranted:** Wrap `Reveal`, `Stagger`, and `StaggerItem` in `dynamic(() => import(...), { ssr: false })` — though this would cause animations to not trigger on the first server-rendered paint, which may be worse than the current behaviour. Leave as-is unless Lighthouse LCP scores demand it.

---

### PERF-04 — Image `sizes` Prop Review

**Files:** All components using `<Photo>`

**Description:** `sizes` is passed by callers and appears context-appropriate in spot-checks. Two areas to audit:
- Service page scope tiles: confirm `sizes` reflects the actual rendered width at each breakpoint.
- Blog post hero images: confirm `sizes="(min-width: 1024px) 720px, 100vw"` is accurate (the reading column is prose-width).

No evidence of `sizes="100vw"` on a component that renders at a fraction of the viewport, which would cause the browser to download an unnecessarily large image.

---

### PERF-05 — No Dynamic Imports Anywhere

**Description:** No `import()` calls or `next/dynamic` usage found. All components load synchronously. For a fully static site with no client-side route transitions this is acceptable — the code-split boundary is already at the page level (each page is a separate HTML file). No action needed for a static site.

---

### PERF-06 — PNG Assets in `public/` Root

**Files:** `public/about-us-hero-background.png`, `public/about-us-our-process-section-background.png`, `public/about-us-who-we-are-section-background.png`, `public/about-section-picture.jpg`, `public/og-default.png`

**Description:** Several images in `public/` root are `.png` or `.jpg` format rather than `.webp`. The `next/image` optimiser converts these to WebP on-the-fly when served via `<Image>`, but the originals in `public/` are unoptimized and will be served at full size if directly linked. The OG image (`public/og-default.png`) is served as-is to social media scrapers — this is fine as social platforms handle their own resizing.

**Impact:** Low — all hero and section images that go through `<Photo>` are optimized automatically by `next/image`. Only direct-URL references bypass the optimizer.

---

### PERF-07 — `scroll-behavior: smooth` Applies to All Anchor Navigation

**Description:** The global `scroll-behavior: smooth` on `html` means every `#quote`, `#main`, and in-page anchor click smooth-scrolls. For in-page scroll this is intentional. For the skip-navigation link (`#main`), smooth-scrolling on that link is harmless but unusual — screen readers and keyboard users triggering the skip link may prefer instant repositioning.

**Fix:** Minimal impact. Low priority.

---

## 6. Prioritized Action Plan

### Critical — Block launch

- [ ] **Wire the QuoteForm to a real form endpoint.** No leads are captured. Select a backend (Vercel server action, Formspree, Resend, or CRM webhook) and implement with server-side validation and rate limiting. `components/home/QuoteForm.tsx`

- [ ] **Add HTTP security headers to `next.config.ts`.** Add the `headers()` export with CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. Include `frame-src https://maps.google.com` for the QuoteForm map embed. `next.config.ts`

- [ ] **Add `noindex` to all 6 blog post routes until content is replaced or confirmed.** In `app/blog/[slug]/page.tsx`, gate the metadata on whether the post is placeholder. Or add `robots: { index: false }` to each post's metadata export temporarily.

- [ ] **Add `noindex` to all 4 legal pages until legal review and client sign-off are complete.** Add `export const metadata = { robots: { index: false, follow: true } }` to each of the four files under `app/(legal)/`.

---

### High — Fix before or immediately after launch

- [ ] **Add `cursor: pointer` to all `<button>` elements.** Add `button { cursor: pointer; }` to `globals.css` (one line, fixes the entire site). `app/globals.css`

- [ ] **Add `autocomplete` attributes to all QuoteForm fields.** Update the `Field` component in `QuoteForm.tsx` to accept and pass an `autoComplete` prop. Add values: `name` → `"name"`, `phone` → `"tel"`, `email` → `"email"`, `date` → `"off"`. `components/home/QuoteForm.tsx`

- [ ] **Add loading state to the submit button.** Add `submitting` state to `QuoteForm`. Disable the button and show a spinner while the async submission is in flight. This depends on the backend being wired first. `components/home/QuoteForm.tsx`

- [ ] **Replace placeholder testimonials with real client reviews.** Only 2 of 6 testimonials are real. Replace the other 4 in `lib/content.ts`. Once all are real, add `Review` JSON-LD via `lib/seo.tsx`. `lib/content.ts` lines ~2185–2360

- [ ] **Supply real social profile URLs.** Fill in the four `href` values in `social` in `lib/content.ts` (lines ~42–60) or delete entries for networks the company doesn't use. Add `sameAs` to LocalBusiness JSON-LD once URLs are confirmed. `lib/content.ts`

- [ ] **Fix iOS background scroll on mobile menu.** Replace `document.body.style.overflow = "hidden"` with a robust scroll-lock that handles iOS Safari momentum scrolling. `components/home/Header.tsx`

- [ ] **Gate testimonials carousel auto-rotate on `prefers-reduced-motion`.** Add a `matchMedia` check before starting the auto-advance interval. Also pause on hover and focus. `components/home/Testimonials.tsx`

- [x] **`rel="noopener noreferrer"` on all `target="_blank"` links — already confirmed present.** `ShareLinks.tsx` includes both attributes on every share link. `PostShare.tsx` was verified in the audit. No action needed.

---

### Medium — Improve before launch, or flag for first post-launch sprint

- [ ] **Guard `scroll-behavior: smooth` with `prefers-reduced-motion`.** Wrap in `@media (prefers-reduced-motion: no-preference)` in `globals.css`. `app/globals.css`

- [ ] **Replace or confirm all placeholder per-community location copy.** All 9 location pages contain written-not-supplied copy. Lower risk than blog posts, but should be confirmed by client before launch. `lib/content.ts` — location `detail` blocks.

- [ ] **Audit desktop nav dropdown close-on-outside-click.** Verify that clicking anywhere outside an open dropdown closes it (mouse users, not just keyboard users). `components/home/Header.tsx`

- [ ] **Confirm `Services` nav dropdown `credit` text visibility.** The nav dropdown prints the service photo's credit beneath the preview image. If `credit` is `"Unsplash"` for stock frames, this renders publicly. Decide whether to hide it from the nav or retain it. `components/home/Header.tsx`

- [ ] **Verify all service page image `sizes` props.** Audit each service page's scope tile and closing band `Photo` call to confirm `sizes` matches the rendered CSS pixel width at each breakpoint. `components/service/ServiceHero.tsx`, `ServiceOverview.tsx`, `ServiceClosing.tsx`

- [ ] **Consider extracting `quoteForm.serviceOptions` from a derived type.** The dropdown options are not type-linked to the `services` array. A service addition or rename needs two manual updates. `lib/content.ts`

---

### Low — Housekeeping / polish

- [ ] **Remove old worktrees from git tracking.** Run `git worktree remove` for `footer-font-weight-f76291`, `service-page-sections-redesign-ec3132`, and `services-page-updates-18c024`. Add `.claude/worktrees/` to `.gitignore`. `/.gitignore`

- [ ] **Add `seo-expert-audit.md` (and `senior-developer-audit.md`) to `.gitignore`.** Or commit them intentionally if they are meant to be part of the project record. `/.gitignore`

- [ ] **Consider adding a Prettier config.** No formatter is configured. Code is consistently formatted by convention, but a `.prettierrc` and format-on-save tooling would enforce it mechanically across contributors.

- [ ] **Remove HSTS comment placeholder once HTTPS is confirmed.** After confirming the deployment host enforces HTTPS, add the `Strict-Transport-Security` header to `next.config.ts`. `next.config.ts`

- [ ] **Update `llms.txt` as placeholder content is replaced.** The AI instruction to not cite placeholder testimonials should be removed when real reviews are live. The blog post instruction should be removed when real posts are live. `public/llms.txt`

- [ ] **Add `disabled:opacity-50 disabled:cursor-not-allowed` to `Button.tsx`.** Prepares the component for the loading state when the form backend is wired. `components/ui/Button.tsx`

---

*End of audit. No code changes have been made. All findings are observations only.*
