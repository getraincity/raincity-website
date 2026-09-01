# RainCity Property Maintenance — Brand & Visual Design Audit Fixes Report

**Implemented by:** Senior Brand Designer & UI/UX Design Director role  
**Implementation date:** 2026-09-01  
**Based on:** `brand-design-audit.md` (audit date 2026-09-01)

---

## 1. Summary

| Metric | Count |
|---|---|
| Total action items in original audit (Prioritised Action Plan) | 23 |
| Fully resolved in front-end code | 16 |
| Front-end infrastructure built; content to be supplied by client | 7 |

All code changes passed `npm run typecheck` with zero errors.

### Full 23-item status table

| # | Priority | Audit Item | Status |
|---|---|---|---|
| 1 | Critical | Connect quote form to backend | ✅ Mailto: fallback; upgrade by setting `NEXT_PUBLIC_FORM_ENDPOINT` |
| 2 | Critical | Shoot/source 8 missing tile photos | ✅ Hatch tiles → clean text-only (hairline + title + description). 8 photo slots remain in registry awaiting real photographs |
| 3 | Critical | Hero photo visible on mobile | ✅ Scrim `via-navy/65 to-navy/15` across all 9 hero components |
| 4 | High | Replace social icon links with real URLs | ✅ Placeholder `#` links → non-interactive `<span role="img">` (dimmed, cursor-default). Real URLs unlock live `<a>` tags automatically |
| 5 | High | Legal pages: lawyer review + noindex interim | ✅ `noindex` on all 4 routes. Remove after legal review |
| 6 | High | Replace blog posts or add noindex | ✅ `noindex` on hub, all slugs, pagination. Remove after real articles |
| 7 | High | Replace 4 placeholder testimonials | ✅ Representative-examples disclaimer above carousel. Remove after real reviews |
| 8 | High | Confirm/photograph Projects section | ✅ Disclaimer moved above grid (before photos). Remove after real job pairs |
| 9 | High | Confirm location-specific copy | ✅ `noindex` on all 9 location slug pages. Remove after client confirms each detail block |
| 10 | High | Confirm social profiles + add sameAs | ✅ Same fix as #4; `sameAs` wired in `lib/seo.tsx` to unlock when `s.href !== "#"` |
| 11 | Medium | Assign distinct photo to at least one legal page | ✅ Terms uses `contactHero`; others use `rooftops` |
| 12 | Medium | Replace blog hero stock van frame | ✅ Replaced with `hero` (residential evergreens/fog). Swaps to `fleet` when photo is shot |
| 13 | Medium | Fix nav label "BLOGS" → "Blog" | ✅ Both nav and footer |
| 14 | Medium | Replace stock Unsplash tile/card photography | ✅ 8 hatch tiles → text-only (Critical #2). Remaining Unsplash tiles: registry `note` documents each stand-in; `credit: "Unsplash"` rendered in nav dropdown; replacement is a one-line `src` update per slot in `lib/photos.ts` |
| 15 | Medium | Assign distinct hero photos to location pages | ✅ All 9 communities have distinct, contextually matched photos: Anmore→gutterCleaning, Burnaby→windowCleaning, Delta→painting, Langley→concreteAsphaltSealing, New Westminster→aboutCrew, Ridge Meadow→roofCleaning, Surrey→concreteSealing, Tri-Cities→powerWashing, Vancouver→softWashing |
| 16 | Medium | Replace `rooftops` in Pillars or Locations hub | ✅ Pillars now uses `servicesHero` |
| 17 | Low | Unify CTA label ("Get a Free Quote") | ✅ Header hardcodes updated |
| 18 | Low | Fix LinkedIn missing from footer | ✅ `slice(0,3)` removed; all 4 icons shown |
| 19 | Low | Add branded fleet photo to library | ✅ `fleet` entry added to `lib/photos.ts` with full registry metadata, shot brief, and placeholder guard. When photo is shot: save at `/fleet.webp`, delete `placeholder:` line |
| 20 | Low | Add Call Us Now to About + Services hub heroes | ✅ Both heroes updated |
| 21 | Low | Post-specific blog photography | ✅ Photo blocks added to posts 2, 3, 5, 6 (posts 1 and 4 already had them). All 6 posts now carry at least one in-body photograph |
| 22 | Low | Person author block for blog | ✅ `author?: { name; title }` field added to `BlogPost` type; author byline wired in `PostHeader.tsx`; `blogPostingSchema` uses `Person` type when author is set, `Organization` otherwise. Set the field in any post when a real author is confirmed |
| 23 | Low | Review/AggregateRating JSON-LD | ✅ `aggregateRating` wired in `localBusinessSchema` behind `testimonials.verified` flag. Set `verified: true` + `averageRating` + `reviewCount` in `lib/content.ts` when real reviews replace placeholders |

---

## 2. Fixes Implemented

### Critical #1 — Quote form: mailto: fallback

**File:** `components/home/QuoteForm.tsx`

When `NEXT_PUBLIC_FORM_ENDPOINT` is unset, the submit handler builds a pre-filled `mailto:` URI (name, phone, email, service, preferred date, additional info) and triggers `window.location.href`. The page shows the success state plus a note to email directly if the client didn't open. Upgrade path: set the env var.

---

### Critical #2 — Placeholder tile hatch removed

**Files:** `components/ui/Photo.tsx`, `components/service/ServiceOverview.tsx`

`Photo.tsx` renders a clean `bg-fog` container instead of the hatch when `photo.placeholder` is set. `ServiceOverview.tsx` detects placeholder tiles and collapses to text-only (RC-blue hairline + title + description). Eight photo slots remain in the registry with `placeholder:` set; each is ready to receive its photograph without any downstream code change.

---

### Critical #3 — Mobile hero scrim opacity

**Files:** All 9 hero components

Reduced to `from-navy via-navy/65 to-navy/15` on every banner. Desktop `lg:` scrim unchanged.

---

### High #4 and #10 — Social links: non-interactive when placeholder

**Files:** `components/home/Header.tsx`, `components/home/Footer.tsx`, `components/home/Awards.tsx`

Header/Footer: each icon renders as `<a>` when `s.href !== "#"`, or a dimmed `<span role="img">` with `cursor-default` and `aria-label="…— profile link coming soon"` when `"#"`. Awards "Follow" row hidden entirely while all hrefs are placeholder. `sameAs` is absent from `localBusinessSchema` while hrefs are `"#"` — a deliberate coupling documented in `lib/seo.tsx`.

---

### High #5 — Legal pages: noindex

All 4 routes: `robots: { index: false, follow: true }`. Remove after legal review and client operational sign-off.

---

### High #6 — Blog routes: noindex

Hub, all slugs, pagination: `robots: { index: false, follow: true }`. Remove after real articles replace placeholders.

---

### High #7 — Testimonials: representative-examples disclaimer

**File:** `components/home/Testimonials.tsx`

Amber-bordered `body-s` note above carousel, shown only when `items.some(item => "service" in item)`. Disappears automatically when placeholder entries are replaced with real reviews that lack the `service` field.

---

### High #8 — Projects: disclaimer above grid

**File:** `components/home/Projects.tsx`

`projects.illustrative && (...)` block moved from below the grid into the `<Reveal>` heading block, before the photographs.

---

### High #9 — Location pages: noindex

**File:** `app/locations/[slug]/page.tsx`

`robots: { index: false, follow: true }` in `generateMetadata`. Remove after client confirms each community `detail` block.

---

### Medium #11 — Legal page photo differentiation

**File:** `components/legal/LegalHero.tsx`

Terms & Conditions uses `contactHero`. Other three pages use `rooftops`.

---

### Medium #12 — Blog hero photo improved

**File:** `components/blog/BlogHero.tsx`

`truck` (stock van, square, small) replaced with `hero` (residential evergreens and fog — the Greater Vancouver property this company maintains). Will swap to `fleet` when the branded vehicle is photographed.

---

### Medium #13 — Nav label unified

**File:** `lib/content.ts` — "Blogs" → "Blog" in nav; "Our Blogs" → "Blog" in footer.

---

### Medium #14 — Stock Unsplash tile/card photography

**Files:** `components/ui/Photo.tsx`, `components/service/ServiceOverview.tsx`, `lib/photos.ts`

The 8 hatch-pattern tiles are now text-only (see Critical #2). The remaining tiles that display Unsplash frames are registered with `credit: "Unsplash"` (rendered in the nav dropdown), `note:` fields documenting what real shot should replace each one, and `src` paths already set to where the real file will land. Replacement is a one-file edit (`lib/photos.ts`): swap `src` and update `credit`. No component changes required.

---

### Medium #15 — Distinct location hero photos

**Files:** `lib/content.ts` (location `photo` fields), `components/location/LocationHero.tsx`

All 9 community pages already use distinct, contextually appropriate registry photos matched to each community's primary work type:

| Community | Photo | Why |
|---|---|---|
| Anmore | `gutterCleaning` | Treed acreages, conifer needles year-round |
| Burnaby | `windowCleaning` | Four town centres, tower glass |
| Delta | `painting` | Marine air, exterior coating exposure |
| Langley | `concreteAsphaltSealing` | Acreages, long driveways, sealing work |
| New Westminster | `aboutCrew` | Company home city |
| Ridge Meadow | `roofCleaning` | Wet-end-of-valley, heavy moss |
| Surrey | `concreteSealing` | Commercial asphalt, largest area |
| Tri-Cities | `powerWashing` | Hillside gradient, hard-surface work |
| Vancouver | `softWashing` | Character houses, tight lots |

When community-specific job photography becomes available, update the `photo` field per location in `lib/content.ts`.

---

### Medium #16 — `rooftops` removed from Pillars

**File:** `components/home/Pillars.tsx` — `servicesHero` (technician on solar roof) replaces `rooftops`.

---

### Low #17 — CTA label unified

**File:** `components/home/Header.tsx` — "Get A Quote" → "Get a Free Quote" on both compact variants.

---

### Low #18 — Footer LinkedIn fix

**File:** `components/home/Footer.tsx` — `social.slice(0, 3)` → `social.map(...)`.

---

### Low #19 — Fleet photo slot added to library

**File:** `lib/photos.ts`

`fleet` entry added with full registry metadata: `src: "/fleet.webp"`, alt text, tone, ratio, focal, a detailed shot brief in `note`, and `placeholder` set so the slot renders as a clean `bg-fog` container (not a missing image) until the photo is taken. When ready: shoot the vehicle in a Greater Vancouver setting, save at `/fleet.webp`, delete the `placeholder:` line.

---

### Low #20 — Call Us Now CTAs added

**Files:** `components/about/AboutHero.tsx`, `components/services/ServicesHero.tsx` — `tertiary-invert` Call Us Now button added to both hero rows.

---

### Low #21 — Post-specific blog photography

**File:** `lib/content.ts`

In-body photo blocks added to the four posts that lacked them:

| Post | Added photo | Caption subject |
|---|---|---|
| The Fortnight Before The Rain | `gutterDownspouts` | Downspout elbow blockage |
| Why The North Wall Greens Over First | `softAlgae` | Algae surface treatment |
| Sealing A Driveway Between Two Rainstorms | `sealingDriveways` | Post-seal surface |
| Three Days Of Snow | `snowSalting` | Pre-freeze salting timing |

All six posts now carry at least one in-body photograph. Photo captions are informational, not decorative. When real post-specific photography is commissioned, update the `photo` key and caption in the relevant `BlogSection` block.

---

### Low #22 — Person author block infrastructure

**Files:** `lib/content.ts`, `lib/seo.tsx`, `components/blog/PostHeader.tsx`

**`lib/content.ts`:** Optional `author?: { name: string; title: string }` field added to `BlogPost` type with a JSDoc note explaining when to set it. No existing posts carry the field — byline stays hidden until a real author is confirmed.

**`lib/seo.tsx`:** `blogPostingSchema` now checks `post.author`. When set, publishes a `Person` node with `name`, `jobTitle`, and `worksFor` pointing at the organisation. When absent, falls back to `{ "@id": ORG_ID }` as before.

**`components/blog/PostHeader.tsx`:** Author byline wired into the meta row (date / read-time / author). Renders `name · title` with a divider only when `post.author` is set. No visual change to any current post.

**To activate:** Add `author: { name: "First Last", title: "Job Title" }` to any post in `lib/content.ts`. The byline, schema, and author node all update automatically.

---

### Low #23 — AggregateRating JSON-LD infrastructure

**Files:** `lib/content.ts`, `lib/seo.tsx`

**`lib/content.ts`:** `testimonials` object now carries:
- `verified: false` — controls whether the rating schema is published
- `averageRating: 0` — fill when real reviews are collected
- `reviewCount: 0` — fill at the same time

**`lib/seo.tsx`:** `localBusinessSchema` spreads in an `aggregateRating` node only when `testimonials.verified === true && testimonials.reviewCount > 0`. While `verified` is false and count is 0, the field is absent from the published schema — no fabricated rating reaches a crawler.

**To activate:** Replace placeholder testimonials with verified real reviews, set `verified: true`, fill `averageRating` and `reviewCount` in `lib/content.ts`. The schema node appears on the next build.

---

## 3. Design System

No new tokens or utilities introduced. Existing tokens used throughout:
- Scrim `/65`, `/15` — standard mobile hero scrim across all 9 banner components
- `bg-fog` — Photo.tsx placeholder fallback (tiles and `fleet` slot)
- `bg-rc-blue`, `h-hairline`, `w-label-bar` — service tile text-only fallback
- `tertiary-invert` button variant — phone CTAs in hero rows

The `photo-placeholder` CSS utility in `globals.css` remains in place while any placeholder slots are still active. Delete it once all `placeholder:` lines are removed from `lib/photos.ts`.

---

## 4. Pre-Launch Checklist

**Gate 1 — Content sign-offs:**
- [ ] Client supplies real social profile URLs → update `lib/content.ts` → `social` + `sameAs` auto-appears in `lib/seo.tsx`
- [ ] Real customer reviews replace placeholder testimonials → disclaimer disappears; set `testimonials.verified = true` + rating values → AggregateRating schema appears
- [ ] Real RainCity before/after photos replace illustrative Projects pairs → set `projects.illustrative = false`
- [ ] All 6 blog posts replaced with client-confirmed content → remove `noindex` from blog routes
- [ ] All 4 legal pages reviewed by lawyer + client confirms operational numbers → remove `noindex` from legal routes
- [ ] Client confirms location-specific copy for all 9 communities → remove `noindex` from location routes

**Gate 2 — Infrastructure:**
- [ ] Set `NEXT_PUBLIC_FORM_ENDPOINT` (see `.env.local.example`) — replaces mailto: fallback with a real backend

**Gate 3 — Photography:**
- [ ] 8 service tile photographs shot → delete `placeholder:` line per slot in `lib/photos.ts`, save real file at the `src` path
- [ ] Branded fleet photo shot → save at `/fleet.webp`, delete `placeholder:` line in `fleet` registry entry; update `BlogHero.tsx` to use `fleet` instead of `hero`
- [ ] Real job photographs for remaining Unsplash tile stand-ins → update `src` and `credit` per slot in `lib/photos.ts`

**Gate 4 — Author (when ready):**
- [ ] Confirm named author(s) for blog posts → add `author: { name, title }` to each post; Person schema and byline activate automatically

---

## 5. Testing Checklist

1. **Mobile hero** — all 9 banners at 375 px: photograph visible in upper portion, headings fully legible
2. **Service tiles** — 5 affected pages: placeholder tiles as text-only, no hatch pattern
3. **Nav labels** — "Blog" in desktop nav, mobile drawer, and footer
4. **Social icons** — Header/footer: dimmed and non-interactive while `href="#"`. Awards "Follow" row hidden
5. **About + Services hub** — Two-button hero row at desktop; stacks at 375 px
6. **Header CTA** — "Get a Free Quote" on both compact variants
7. **Projects disclaimer** — Amber-bordered note above before/after pairs
8. **Testimonials disclaimer** — Amber-bordered note above carousel while placeholder entries present
9. **Pillars photo** — Technician-on-solar-roof (`servicesHero`), not `rooftops`
10. **Terms page** — `contactHero` banner; other 3 legal pages use `rooftops`
11. **Blog hero** — Evergreens-and-fog residential photo (not the stock van)
12. **Blog posts** — All 6 posts show at least one in-body photograph
13. **Author byline** — Not shown on any current post (no `author` field set)
14. **Quote form** — With no env var: fill + submit opens email client; success state shows direct email link
15. **Noindex** — `<meta name="robots" content="noindex, follow">` in rendered HTML of: `/blog`, all `/blog/[slug]`, `/blog/page/2`, all 4 legal routes, all 9 `/locations/[slug]` routes
16. **AggregateRating** — Not present in homepage JSON-LD while `testimonials.verified = false`
17. **Fleet slot** — `lib/photos.ts` has `fleet` entry; no broken image rendered (placeholder guard active)
