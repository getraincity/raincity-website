# 00 — Current State Audit

**Site:** RainCity Property Maintenance — https://raincitypms.com
**Repo:** `getgrowthnexus/raincity-website` (origin is set; CLAUDE.md's "not yet
connected to a GitHub remote" note is stale)
**Audited:** 2026-09-02
**Build at time of audit:** `next build` → 42 prerendered pages, 0 errors,
`tsc --noEmit` clean.

---

## 0. Read this first — one premise correction

The brief for this engagement described the site as "real business — not
placeholder content." The first half is true. The second half is not, and it
changes what this pass is allowed to do.

Four bodies of copy on this site were **written for the build and have never
been confirmed by RainCity**. They are marked as such in `lib/content.ts` with
explicit `PLACEHOLDER` comment blocks, and previous passes deliberately put
`noindex` on the routes that carry them:

| Content | Where | Route status today |
|---|---|---|
| 6 blog articles | `blogPosts` | `noindex` on `/blog`, `/blog/[slug]`, `/blog/page/[page]` |
| 4 of 6 testimonials | `testimonials` | Rendered with an on-page disclaimer |
| Terms & Privacy Policy | `legalPages` | `noindex` on both |
| 9 community page bodies | `locations[].detail` | **Indexable** (noindex lifted in commit `71dc640`) |

This audit treats that as a constraint, not a defect. Nothing in Stages 2–4
invents a testimonial, a review count, an author byline, a rating, a
certification, a response time or a service radius. Where growth requires a
fact only RainCity holds, it is logged in §9 and in the final report rather
than guessed at. **The single largest ranking lever on this site is not a
technical fix — it is replacing that placeholder copy so the `noindex` can come
off.** Six blog URLs and two legal URLs are currently invisible to search by
deliberate choice.

---

## 1. Business understanding

**What the company is.** A mobile property-maintenance and exterior-cleaning
company based in New Westminster, BC, with no storefront and no walk-in
address. It travels to the property. That single fact drives most of the local
SEO shape of the site: there is no `streetAddress` to publish, so proximity
ranking depends on `areaServed`, the Google Business Profile service-area
setting, and the depth of the per-community pages.

**Verified NAP** (single source, `lib/content.ts → business`):

- Name: RainCity Property Maintenance
- Phone: `+1 604 209 3357` (`tel:+16042093357`)
- Email: `info@raincitypms.com`
- Hours: Mon–Sat 7 am – 10 pm; Sunday closed
- Base: New Westminster, BC · Region: Greater Vancouver
- Geo pin: 49.2057, −122.911

NAP is consistent everywhere because everything derives from that one object.
Header, footer, contact page, `llms.txt`, Organization schema and
ProfessionalService schema all read it. There is no second copy to drift.

**Customers.** Three distinct segments, and the copy already speaks to all
three separately: residential homeowners, strata corporations/councils, and
commercial property managers. This matters for keyword work — strata and
commercial queries are lower volume, far higher value, and much less contested
than the residential head terms.

**Services — 11**, single source `lib/content.ts → services`:
commercial-cleaning · power-washing · soft-washing ·
concrete-and-asphalt-sealing · window-cleaning · gutter-cleaning ·
roof-cleaning · painting · snow-removal-salting ·
holiday-light-installation · landscaping-lawn-care

**Locations — 9**, single source `lib/content.ts → locations`:
Anmore · Burnaby · Delta · Langley · New Westminster · Ridge Meadow · Surrey ·
Tri-Cities · Vancouver

**Voice.** Specific, unhurried, regional, faintly dry. It names conditions
("the north wall greens first", needles that fall "twelve months of the year
rather than for six weeks in October") instead of asserting benefits. It does
not use superlatives and it does not use the word "solutions." Any copy added
in this pass has to hold that line or it will read as bolted on.

### What is genuinely good and must not be touched

- **The 9 community pages.** Measured 8-gram overlap between the most similar
  pair (Burnaby vs Delta) is **24.0%**, and essentially all of that is shared
  chrome — nav, footer, quote form, the 11 service cards. The written body of
  each page is distinct: its own geography, its own three local notes, its own
  4–5 FAQs. This is the opposite of the doorway pattern and it is the site's
  best local asset.
- **The 11 service pages.** Max pairwise overlap **9.6%**. ~1,300 words each,
  six illustrated scope tiles, a process block and a real FAQ set.
- **Structured data.** Genuinely above the standard for this sector — see §5.
- **Alt text.** 288 `<img>` elements in the built HTML; **288 have alt text, 0
  are empty.** Every one is written, specific, and lives in one registry
  (`lib/photos.ts`) next to the photo it describes.
- **Single-source content architecture.** Adding a service updates the homepage
  grid, the nav dropdown, the URL, the sitemap, the OfferCatalog and all 9
  community pages at once. This is why the site has no orphan routes.

### Where it is thin

- Blog is `noindex` — the entire informational funnel is switched off.
- No service → location internal links (see §6). The link graph runs one way.
- Blog posts cannot link to anything (see §6) — the `BlogBlock` union has no
  link member.
- Proof elements are all provisional: testimonials disclaimed, before/after
  pairs disclaimed as illustrative, three homepage stats flagged unverified.

---

## 2. Technical audit — framework and routing

- **Next.js 16.3.3**, App Router, Turbopack. React 19, TypeScript 7 strict.
- **Fully static.** `next build` prerenders all 42 pages. The only dynamic
  route is `/api/contact` (the quote form's Resend handler).
- Tailwind v4 via `@tailwindcss/postcss`, theme in `app/globals.css`.
- Framer Motion is confined to `components/ui/Motion.tsx`.
- No ESLint (documented and intentional); `npm run typecheck` is the gate.

**Route inventory — 42 prerendered:**

| Group | Count | Notes |
|---|---|---|
| Core | 5 | `/`, `/about`, `/services`, `/locations`, `/contact` |
| Service detail | 11 | `/services/[slug]` |
| Location detail | 9 | `/locations/[slug]` |
| Blog | 8 | `/blog`, `/blog/page/2`, 6 posts — **all noindex** |
| Legal | 2 | `/terms`, `/privacy-policy` — **both noindex** |
| Redirect stubs | 2 | `/disclaimer`, `/refund-policy` — unreachable behind 301s; see T-4 |
| Framework | 2 | `_not-found`, `_global-error` |
| Non-HTML | 3 | `robots.txt`, `sitemap.xml`, `/api/contact` |

---

## 3. On-page state

### 3.1 H1 — clean

Every content page has **exactly one `<h1>`**. Heading hierarchy descends
properly (h1 → h2 → h3, with h4 only inside the service FAQ accordion). No
skipped levels found on any sampled page.

The two dead routes (`/disclaimer`, `/refund-policy`) render 0 h1 because they
resolve to the 404 body — they are unreachable behind redirects anyway.

### 3.2 Title tags — 9 indexable pages over the truncation limit

Google truncates around 60 characters / ~580px. Measured lengths:

| Page | Length | Status |
|---|---|---|
| `/blog/what-a-strata-schedule-covers` | 87 | Over (noindex) |
| `/services` | 80 | **Over** |
| `/services/concrete-and-asphalt-sealing` | 79 | **Over** |
| `/services/landscaping-lawn-care` | 78 | **Over** |
| `/services/holiday-light-installation` | 77 | **Over** |
| `/services/snow-removal-salting` | 77 | **Over** |
| `/` (homepage) | 76 | **Over** |
| `/locations/new-westminster` | 75 | **Over** |
| `/terms` | 74 | Over (noindex) |
| `/locations/ridge-meadow` | 72 | **Over** |
| `/locations/tri-cities` | 70 | Borderline |
| Remaining 27 | 53–69 | Acceptable |

Every title is unique and hand-written — no duplicates, no template collisions.
The issue is purely length: the tail of each of these gets replaced with an
ellipsis in the SERP, and on several the truncated part is the geo-modifier,
which is the half that earns the click.

### 3.3 Meta descriptions — 24 pages over the limit (largest on-page issue)

Google renders roughly 155–160 characters on desktop, ~120 on mobile.

| Page | Length | Over by |
|---|---|---|
| `/` | 270 | +110 |
| `/services` | 266 | +106 |
| `/locations` | 251 | +91 |
| `/about` | 229 | +69 |
| `/locations/surrey` | 225 | +65 |
| `/locations/langley` | 224 | +64 |
| `/locations/burnaby` | 217 | +57 |
| `/contact` | 216 | +56 |
| `/locations/new-westminster` | 216 | +56 |
| `/locations/delta` | 215 | +55 |
| `/locations/vancouver` | 215 | +55 |
| `/locations/tri-cities` | 210 | +50 |
| `/locations/ridge-meadow` | 205 | +45 |
| `/locations/anmore` | 201 | +41 |
| 7 blog pages | 178–205 | noindex |
| 11 service pages | 164–172 | +5 to +12 (borderline) |

**Every indexable page except the service pages exceeds the limit**, and the
homepage, `/services` and `/locations` — the three highest-priority URLs on the
site — are the three worst. On the homepage the phone number, which is the last
clause, is cut entirely. This is the single highest-leverage on-page fix
available and it costs nothing but rewriting.

Descriptions are unique across all 37 public routes. No duplicates.

### 3.4 Image alt text — pass

288/288 populated, all specific, all registry-sourced.

---

## 4. Indexing health

| Check | Result |
|---|---|
| `sitemap.xml` | Pass — 36 URLs, all resolve, generated from live arrays |
| `robots.txt` | Pass — allows `/`, disallows `/_next/` and `/api/`; 13 AI crawlers named explicitly |
| Canonical tags | Pass — every page self-canonicalises via `pageMetadata()` |
| Duplicate titles | Pass — none |
| Duplicate descriptions | Pass — none |
| Orphan pages | Pass — every route is linked from nav, footer or a card grid |
| Redirect chains | Pass — none; two single-hop 301s |
| HTTPS / mixed content | Pass — all assets self-hosted, no HTTP subresources |
| Verification file | Pass — `public/google807aab8c24a997b5.html` in place |
| `llms.txt` | Pass — present, lists every service and community URL |

**Findings:**

- **T-1 — `noindex` on 8 blog URLs.** Deliberate; blocked on real copy. The
  whole informational/AEO funnel is offline until this lifts.
- **T-2 — `noindex` on `/terms` and `/privacy-policy`.** Deliberate; blocked on
  legal review. Low SEO cost. Correct call.
- **T-3 — 8 blog URLs are in `sitemap.xml` while carrying `noindex`.** Not an
  error, but a mixed signal: the sitemap says "index this," the page header
  says "don't." Google resolves in favour of the page directive and logs the
  URLs under "Excluded by 'noindex' tag" in Coverage. Worth a deliberate
  decision rather than an accident.
- **T-4 — Two extra prerendered routes — WITHDRAWN on closer reading.**
  `app/(legal)/disclaimer/page.tsx` and `app/(legal)/refund-policy/page.tsx`
  still build, but they are not dead code: each is a two-line `redirect()` stub
  carrying a comment that says why it exists (it keeps the route resolvable for
  the type checker). The page *content* was genuinely removed; only the stubs
  remain, so the previous readiness report was accurate. `next.config.ts` 301s
  both paths at the network level before filesystem routing, so neither stub is
  ever reached. **No action.** Recorded here so a future pass does not
  re-discover them and delete something deliberate.
- **T-5 — No `WebSite` schema node.** `blogPageSchema` sets
  `isPartOf: {"@id": "…/#business"}`, pointing at the ProfessionalService node
  that only exists on the homepage. Harmless but structurally loose.
- **T-6 — No analytics of any kind.** No GA4, no GTM, no measurement snippet
  anywhere in the codebase. Confirmed by grep across `app/`, `components/`,
  `lib/`. The Privacy Policy currently states the site "runs no third-party
  analytics package" — **which is true today and would become false the moment
  GA4 is added.** These two must move together or not at all.

---

## 5. Structured data — current coverage

Rendered and verified in the built HTML:

| Type | Where |
|---|---|
| `Organization` | Every page (root layout) |
| `ProfessionalService` (LocalBusiness) | Homepage — with `geo`, `areaServed`, `openingHoursSpecification`, `hasOfferCatalog` of all 11 services |
| `AboutPage` | `/about` |
| `CollectionPage` + `ItemList` | `/services`, `/locations` |
| `Service` | Each `/services/[slug]`, plus inside both ItemLists |
| `FAQPage` | Each `/services/[slug]` **and** each `/locations/[slug]` |
| `City` + `OfferCatalog` | Each `/locations/[slug]` |
| `ContactPage` | `/contact` |
| `CollectionPage` + `Blog` | `/blog` |
| `BlogPosting` | Each post |
| `BreadcrumbList` | Every page below the root |

This is strong. `FAQPage` on all 20 service and location pages is the piece
most competitors in this sector do not have, and it is the main AEO surface
already working.

**Deliberately absent, with sound reasons documented in `lib/seo.tsx`:**

- `aggregateRating` / `Review` — testimonials are placeholder. Correct.
- `sameAs` — social URLs unknown. Correct.
- `Person` author on posts — nobody to name. Correct.
- `streetAddress` — mobile business, no storefront. Correct.
- Post list inside `blogPageSchema` — copy is placeholder. Correct.

**Genuinely missing:**

- `WebSite` (T-5).
- `HowTo` — not appropriate here; the process blocks are 3-step summaries, not
  instructions a reader follows. Correctly absent, no action.
- `Speakable` — Google has kept it in limited pilot for years. Not worth it.

---

## 6. Internal linking — the real architectural gap

Mapped from every `href` in `app/` and `components/`:

```
Home                 ──► /services, /services/[slug] x11, /locations, /blog, /about, /contact
/services            ──► /services/[slug] x11
/locations           ──► /locations/[slug] x9
/locations/[slug]    ──► all 11 /services/[slug]        <-- the one crossover
/locations/[slug]    ──► 2-3 neighbouring /locations/[slug]
/blog                ──► /blog/[slug] x6
/blog/[slug]         ──► related posts only
/services/[slug]     ──► nothing but #quote and tel:    <-- DEAD END
```

**L-1 — Service pages link to nothing.** Eleven pages carrying ~1,300 words
each — the most commercially valuable templates on the site — contain no
outbound internal link at all beyond the shared header/footer. Every in-body
CTA is `#quote` or `tel:`. A reader who lands on `/services/gutter-cleaning`
from a search has no path to the Surrey page, to a related service, or to an
article.

**L-2 — The link graph is one-directional.** `LocationServices.tsx` sends all 9
community pages → all 11 service pages. Nothing sends any service page back to
any community page. Internal link equity flows downhill into the service pages
and stops; the location pages, which are the ones that should win the "gutter
cleaning Surrey" half of the search volume, receive none of it back.

**L-3 — Blog posts structurally cannot link out.** `BlogBlock` is a closed
union of `string | subheading | list | steps | quote | photo`. There is **no
link block and no inline-link mechanism**, and `PostBody.tsx` renders
paragraphs as plain text. So six articles about moss, gutters, strata schedules
and driveway sealing cannot point at the service page that sells the work. This
is the highest-value fix in the internal-linking category, and CLAUDE.md
already prescribes exactly how to make it: add a member to the union, add a
branch in `PostBody`.

---

## 7. Core Web Vitals — risk factors visible in code

**Good:**

- Every photo goes through one `Photo` component → `next/image` with `fill`,
  correct `sizes`, blur-up placeholder, explicit `objectPosition`.
- LCP images carry `priority` + `fetchPriority="high"`.
- Animations touch only `opacity`/`transform` — CLS by construction is zero.
- Fonts self-hosted via `next/font/google` with `display: swap`.
- No third-party runtime requests of any kind. No remote image host, no
  analytics, no tag manager, no font CDN.
- `deviceSizes` capped at 1920 — no pointless 2560/3840 upscales.

**P-1 — 31.2 MB of unconverted PNG source, two of them LCP images.**

| File | Size | Used as |
|---|---|---|
| `what-we-offer-section-background.png` | 8.36 MB | registered, **not rendered** (see P-2) |
| `about-us-hero-background.png` | 8.10 MB | **`/about` LCP hero** |
| `our-services-hero-background.png` | 6.19 MB | **`/services` LCP hero** |
| `about-us-who-we-are-section-background.png` | 5.09 MB | `/about` figure |
| `about-us-our-process-section-background.png` | 3.47 MB | `/about` figure |

Every other photograph on the site is already webp — these five are the only
PNGs left, and they are 90% of `public/` by weight (31.2 MB of 54 MB). On
Vercel `next/image` converts them on demand, so the *delivered* bytes are fine
after the first request. But the first request to `/about` or `/services` pays
a cold optimizer transform on an 8 MB source, the optimizer cache churns
against them, and on any host without the Next image optimizer they ship raw.
Converting to webp at the same pixel dimensions is invisible to the design and
removes the risk entirely.

**P-2 — `what-we-offer-section-background.png` (8.36 MB) is orphaned.** It is
registered in `lib/photos.ts` under the key `servicesOffer`, but a grep for
both `servicesOffer` and `whatWeOffer` across `app/` and `components/` finds no
component reading it. It is the single largest file in the repo and nothing
renders it.

**P-3 — HSTS commented out.** Intentional and correct until the host confirms
stable HTTPS. Flagged for the launch checklist, not for this pass.

---

## 8. Analytics and Search Console

| Item | State |
|---|---|
| GSC verification file | Present — `public/google807aab8c24a997b5.html`; deploy, then verify |
| Sitemap submitted | Cannot be checked from the codebase |
| GA4 / GTM | **Absent entirely** |
| Server-side or cookieless analytics | Absent |
| Conversion tracking on the quote form | Absent |

There is currently **no way to measure anything this engagement does** beyond
Search Console's own impression and click data. That is a gap, but it is a gap
with a legal string attached: `lib/content.ts` has the Privacy Policy stating
the site "sets no advertising or tracking cookies of its own and runs no
third-party analytics package." Adding GA4 without amending that sentence
publishes a false privacy statement. The safe path is in the plan (Phase 6);
this pass will **not** add analytics unilaterally.

---

## 9. Items requiring client or external input

Carried forward from `client-action-checklist.md` and confirmed still open:

1. Legal review of `/terms` and `/privacy-policy` + client sign-off on 11
   operational numbers → lifts 2 noindex
2. Real blog copy → lifts 8 noindex, unlocks the entire informational funnel
3. Real testimonials → unlocks `aggregateRating`
4. Social profile URLs → unlocks `sameAs`
5. Google Maps Embed API key → maps currently render a text fallback
6. Resend API key → form currently falls back to `mailto:`
7. 8 service-tile photographs + 1 fleet photograph
8. Real before/after job pairs → removes the "illustrative" disclaimer
9. **Google Business Profile access** — not previously listed, and the biggest
   missing lever for a service-area business. See the Local plan.
10. Confirmation of the three homepage stats (years, properties, "100%
    satisfaction") — flagged unverified in `content.ts`

---

## 10. Prioritised finding list

| ID | Finding | Severity | Fixable in this pass |
|---|---|---|---|
| C-1 | 24 meta descriptions over the render limit, incl. the 3 top pages | **High** | Yes |
| L-1/L-2 | Service pages have zero outbound internal links; graph is one-way | **High** | Yes |
| L-3 | Blog posts structurally cannot link to services or locations | **High** | Yes |
| T-1 | 8 blog URLs noindex — informational funnel offline | **High** | No — client copy |
| C-2 | 9 title tags over the truncation limit | Medium | Yes |
| P-1 | 31 MB of PNG source, 2 of them LCP heroes | Medium | Yes |
| T-3 | noindex URLs listed in sitemap — mixed signal | Medium | Yes |
| P-2 | 8.36 MB orphaned image in `public/` | Medium | Yes |
| T-6 | No analytics at all | Medium | Needs a client decision — see plan |
| T-4 | ~~Two dead routes~~ — withdrawn; deliberate redirect stubs | — | No action |
| T-5 | No `WebSite` schema node | Low | Yes |
| T-2 | Legal pages noindex | Low | No — legal review |

---

## 11. What this audit did not find

Stated explicitly, because a report that only lists problems misrepresents the
site:

- No broken internal links. No orphan pages. No redirect chains.
- No duplicate titles or descriptions.
- No missing or empty alt text anywhere.
- No accidental `noindex` — every one is deliberate and documented.
- No thin or duplicated location pages. Max overlap 24%, essentially all
  chrome.
- No render-blocking third-party scripts, because there are no third-party
  scripts.
- No layout-shift sources.
- No schema errors, and coverage already exceeds the sector norm.

The technical foundation here is in better shape than most sites at this stage.
The growth constraint is **content that is switched off** and **internal links
that do not exist**, not a broken build.
