# RainCity Property Maintenance — Website

## Project overview

Ground-up rebuild of the RainCity Property Maintenance website, replacing an
existing WordPress site with a static Next.js build. RainCity is a mobile
property-maintenance and exterior-cleaning company based in New Westminster,
BC, serving Greater Vancouver — residential homeowners, strata corporations
and commercial property managers.

Currently a single-page homepage (`app/page.tsx`) composed of section
components. The nav and footer link to `/about`, `/services`,
`/services/[slug]`, `/locations`, `/blog` and the policy pages; those routes
are planned, not built. The sitemap and JSON-LD already anticipate them.

## Tech stack

- **Next.js 16** (App Router, Turbopack) — fully static, `next build`
  prerenders every route
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — config lives in
  `app/globals.css` (`@theme`), not a `tailwind.config.js`
- **Framer Motion 13** — only through `components/ui/Motion.tsx`
- **Icons are hand-rolled** in `components/ui/Icon.tsx`. There is no
  icon library dependency — do not add `lucide-react` or any other; match the
  existing inline-SVG pattern instead.
- **Photography** — a mix of client-supplied images in `public/services/` and
  Unsplash images pulled through the `unsplash()` helper in `lib/photos.ts`.
  Every photo is declared once in `photos.ts` with alt text, dominant tone,
  aspect ratio and focal point; components reference it by `PhotoKey`.
- **Playwright** (dev dependency) drives the `shot-*.mjs` screenshot scripts in
  the project root, used to review sections at 375 / 768 / 1440.

Commands: `npm run dev`, `npm run build`, `npm run lint`. Preview via
`.claude/launch.json`.

## Design tokens

**`raincity-tokens.md` is the single source of truth for all colour, type,
spacing and radius.** It is marked LOCKED and approved — do not change a token
value without the user's explicit sign-off, and do not introduce a colour,
font size or spacing value that isn't in it. `app/globals.css` implements
those tokens as Tailwind theme variables; read the markdown first, then use
the corresponding utility (`text-navy`, `bg-fog`, `display-l`, `py-section`,
`px-edge`, etc.) rather than an arbitrary value.

## Established conventions

### Photography-forward, never templated

The design leans on real photographs and restraint, not on decoration. Avoid
the patterns that mark a page as AI-generated boilerplate:

- No `01 / 02 / 03` step markers or numbered badges unless the order genuinely
  carries meaning
- No cookie-cutter three-icon feature rows, no default stock-hero layout
- No gradient-blob backgrounds, no emoji as iconography
- Cards carry character through detail (the notched corner revealing RainCity
  Blue, the brand wash over photography, borders that move to blue on hover),
  not through novelty layout

### Motion

Framer Motion is used site-wide but deliberately narrow. Everything goes
through `Reveal`, `Stagger` and `StaggerItem` in `components/ui/Motion.tsx`:

- Fade plus a 16px upward slide. Nothing else.
- 400–600ms, ease-out, no overshoot. No springs, scale, rotation or parallax.
- Grid children stagger; each element animates once, on entry.
- No scroll-jacking, no scroll-linked transforms.
- `prefers-reduced-motion` is honoured **in CSS** (the `[data-motion]` rule in
  `globals.css`), not via `useReducedMotion()`. This is load-bearing: branching
  in JS left the server rendering `opacity: 0` for reduced-motion users and
  never clearing it. Do not "simplify" it back into the component.

If a new section needs motion, use the existing wrappers. Do not introduce a
second animation idiom.

### Testimonials are placeholder content

`lib/content.ts` → `testimonials` carries a `PLACEHOLDER` comment block
marking exactly which entries are invented. Only the first two came from the
client's own site; the rest were written to fill the carousel and correspond
to no real customer.

- These **must be replaced with real reviews before launch**.
- Do **not** add `Review` or `AggregateRating` JSON-LD until they are real —
  `lib/seo.tsx` deliberately omits `aggregateRating` and says so in a comment.
- `public/llms.txt` also tells AI systems not to cite them. Keep that note
  until the copy is real.
- Never invent additional testimonials, star ratings or review counts.

### Services live in one data source

`services` in `lib/content.ts` is the single source. The homepage grid, the
Services nav dropdown, the `/services/[slug]` URLs and the `OfferCatalog`
JSON-LD all derive from it — edit the array and all four follow. Never
hardcode a service name in a component.

Two lists do **not** derive and must be updated by hand alongside it:

1. `quoteForm.serviceOptions` in `lib/content.ts` — a deliberately short
   six-option dropdown, not the full catalogue
2. `public/llms.txt` — a static file

Adding or removing a service also needs a matching `PhotoKey` entry in
`lib/photos.ts`. The homepage grid re-centres its short last row
automatically from `services.length` (see the comment block in
`components/home/Services.tsx`) — no index editing required.

### SEO and performance are complete — don't regress them

Metadata, JSON-LD (`lib/seo.tsx`), `app/sitemap.ts`, `app/robots.ts`,
`public/llms.txt` and image optimization are all done and deliberate. Before
changing anything in that area, read the comments explaining why it is the way
it is. In particular:

- The LocalBusiness schema intentionally has no `streetAddress` (mobile
  business, no storefront) and no `aggregateRating`.
- Photos animate only `opacity`/`transform` so nothing shifts after layout —
  keep CLS at zero.
- Every image has real, specific alt text. Never ship a decorative-sounding
  placeholder.

### The client is non-technical

They value stability and reliability over cleverness. Prefer boring, durable
solutions: static rendering, no runtime data fetching, no exotic dependencies,
no patterns that need explaining. Anything added should still work untouched
in two years.

### Quality bar

Premium and distinctive, never templated or default-AI-looking. Check every
addition against that before calling it done — including copy, which should
sound like a specific company that works in the rain, not like generic service
marketing.

## Code conventions

- Sections are **server components**; only `components/ui/Motion.tsx` and
  other genuinely interactive pieces carry `"use client"`.
- Copy lives in `lib/content.ts`, not inline in JSX.
- Comments explain *why*, especially where a decision looks odd — that pattern
  is established throughout and worth continuing.
- Tailwind class names must appear as whole literal strings; the scanner never
  sees a constructed string, so look classes up from a lookup table rather than
  interpolating them.

## Version control

Git-tracked locally, not yet connected to a GitHub remote. `.gitignore`
covers `node_modules/`, `.next/`, `*.tsbuildinfo`, the usual build output, and
the loose screenshot PNGs the `shot-*.mjs` scripts write to the project root.
