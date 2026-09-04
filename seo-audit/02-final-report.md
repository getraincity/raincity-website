# 02 — Final Report

**RainCity Property Maintenance · SEO / AEO / GEO growth pass**
**Completed:** 2026-09-02
**Build state:** `npm run typecheck` clean · `npm run build` clean · 42 pages prerendered

---

## Read this first

Three things frame everything below.

**1. Part of this site is placeholder copy, and that shaped what could be
built.** The brief described the site as "real business — not placeholder
content." The business is real. The content is not all real: six blog articles,
four of six testimonials, and both policy pages were written for the build and
have never been confirmed by anyone at RainCity. Previous passes correctly put
`noindex` on those routes. Nothing in this pass invented a testimonial, a
review count, a rating, an author, a certification, a response time, a price or
an operational commitment. Where growth needed a fact only RainCity holds, it
is in §5 rather than guessed at.

**2. The biggest lever is not technical.** Six articles are invisible to Google
by choice, RainCity has zero published reviews while every competitor displays
hundreds, and the Google Business Profile is the single most valuable asset for
a service-area business. All three are the client's to unblock. The technical
work below is worth doing and was done thoroughly; it does not substitute for
those three.

**3. One thing was deliberately not built.** The strongest competitor runs a
60–96 page service × location matrix. The obvious move was 11 services × 9
communities = 99 pages. It was not built, and §4 says why and what would change
that.

---

## 1. What was built and changed

### Indexing and structured data

| Change | Before | After |
|---|---|---|
| Single-source `indexing` flag driving both `noindex` and sitemap inclusion | 5 route files + sitemap disagreeing | One flag; flipping it releases both halves in one edit |
| `sitemap.xml` | 36 URLs, 10 of them noindexed | **25 URLs, every one indexable** |
| `WebSite` schema node | absent | present on all 36 content pages |
| `isPartOf` on page-level nodes | 6 nodes pointing at the ProfessionalService (a business, not a website; declared only on the homepage) | all 6 repointed at the `WebSite` node |
| `areaServed` municipalities | 9, **two of them fictional** (`Ridge Meadow`, `Tri-Cities` are not incorporated places) | **12, all real** — Maple Ridge, Pitt Meadows, Coquitlam, Port Coquitlam and Port Moody now named |
| JSON-LD validity | — | **159 blocks, 0 invalid**; 308 URL/image references, 0 broken |

### On-page metadata

| | Before | After |
|---|---|---|
| Indexable pages with descriptions over ~158 chars | **24** | **0** |
| Indexable pages with titles over 60 chars | **9** | **0** |
| Worst description | `/` at 270 chars (phone number cut off the end) | `/locations` at 158 |
| Worst title | `/services` at 80 | `/services/concrete-and-asphalt-sealing` at 60 |
| Duplicate titles / descriptions | 0 | 0 |

Two template fixes did most of the work: the service title template lost the
spelled-out brand, and the location title template was replaced with a
**written** `metaTitle` per community — which is what allows the Ridge Meadow
page to say "Maple Ridge & Pitt Meadows" and the Tri-Cities page to say
"Coquitlam". Those five municipality names appeared 16–31 times each in the
page bodies and **zero times in any metadata**.

### Internal linking — the largest structural change

The eleven service pages, the most commercially valuable templates on the site,
contained **no deep internal link at all**. Eight hrefs, all top-level. A reader
arriving at `/services/gutter-cleaning` from a search for "gutter cleaning
Surrey" had nowhere to go that answered the second half of what they typed.

The header nav dropdown is not a counter-argument — it holds its children
behind client state, so those links exist in **no route's server HTML**. That is
why the gap went unnoticed.

| Change | Links added |
|---|---|
| `components/service/ServiceAreas.tsx` — all 9 communities on all 11 service pages | +110 |
| `components/service/RelatedServices.tsx` — 2–3 related services, from a written physical-adjacency map | +28 |
| `BlogBlock.linked` + `PostBody` branch, wired into all 6 posts | +30 |

**Result, measured from built HTML:**

| Tier | Inbound links before | After |
|---|---|---|
| Location pages | ~3–4 each | **13–16 each** |
| Service pages | ~11 each | **11–19 each** |
| Broken internal links | 0 | **0** |

The location tier — the one that should win the "service + city" half of the
search volume — was receiving nothing at all from the service tier.

### Performance

| File | Before | After |
|---|---|---|
| `about-us-hero-background` (**LCP image, /about**) | 7.72 MB PNG | 0.31 MB webp |
| `our-services-hero-background` (**LCP image, /services**) | 5.90 MB PNG | 0.14 MB webp |
| `what-we-offer-section-background` | 8.36 MB | 0.13 MB |
| `about-us-who-we-are-section-background` | 4.86 MB | 0.09 MB |
| `about-us-our-process-section-background` | 3.31 MB | 0.06 MB |
| `about-section-picture.jpg` | 0.50 MB | 0.31 MB |
| **`public/` total** | **54 MB** | **24 MB** |

Originals remain archived in `assets/`, per the project's own convention.
CLS is structurally zero and unchanged; there are still no third-party scripts
of any kind.

### AEO / GEO

- `llms.txt` now states the Tri-Cities and Ridge Meadow expansions in prose, so
  an answer engine asked "does RainCity serve Coquitlam?" can answer and cite
  the right page.
- It also now records that the blog and legal URLs are `noindex` **and** held
  out of the sitemap, and that the policy figures were written rather than
  supplied — so no AI system states them as this company's policy.
- The `WebSite` node completes the entity graph (Organization → WebSite →
  WebPage), which is what answer engines resolve before they resolve pages.
- The existing strengths were left alone because they are genuinely good: **111
  question-and-answer pairs marked up as `FAQPage` across all 20 service and
  location pages**, and a `robots.txt` that names 13 AI crawlers explicitly
  rather than leaving them to the wildcard.

### Guardrail improvement

`check-layout.mjs` measured only `#overview-heading`. It now measures all three
of the service template's variable headings — because the first draft of the
new band's heading wrapped to four lines at 375px against the template's
documented two-line rule, and only a manual measurement caught it. The script
that is supposed to catch that now does.

---

### Verification — two independent passes, and what they caught

Two agents with no context from the work audited it and were told to verify
claims rather than trust them. Between them they raised **eight defects, all
eight fixed**, plus one wording nit (also fixed), two items escalated to the
client, and a set of categories they checked and explicitly cleared. That is
the part of this engagement worth reading, because three of these would
otherwise have shipped.

| # | Found by | Issue | Outcome |
|---|---|---|---|
| 1 | QA | `/locations` ItemList still published `City: "Ridge Meadow"` and `City: "Tri-Cities"` — the fix had been threaded through three other schema functions and missed here | **Fixed** — groupings now `Place` + `containsPlace` |
| 2 | QA | A signpost written in this pass claimed a snow contract and a commercial contract "run on one contract" — an invented operational commitment with zero precedent on the site | **Fixed** |
| 3 | Compliance | `primaryImageOfPage` on `/about` pointed at `about-section-picture.jpg` — **a file this pass had deleted during the webp conversion.** The only broken reference among 429 checked | **Fixed** — now reads the registry, so it cannot drift again |
| 4 | Compliance | `CLAUDE.md`'s policy section described four pages where two exist, and instructed future sessions to add the legal pages *back* to the sitemap — the opposite of what the code deliberately does | **Fixed** |
| 5 | Compliance | A blog signpost claimed the roof cleaning page sets out "what moves the price". It does not — scope and method only | **Fixed** |
| 6 | QA | "Booking them on one visit costs less than booking them on two" — a bundling-price claim promoted from one community FAQ to eleven pages of commercial copy | **Fixed** |
| 7 | QA | A code comment stated company service history as fact | **Fixed** |
| 8 | QA | `CLAUDE.md` stale on the `social` array and the sitemap count | **Fixed** |

Three of these — 2, 5 and 6 — are claims this pass itself introduced or
promoted, on a project whose central rule is that nothing about the world may
be invented. They were caught because somebody who had not written them read
them. That is the argument for the independent pass, and it is the honest
account of how this work went.

Issue 3 is the one that mattered technically: a regression created by the
image conversion, missed by the conversion's own checks and by the first
reviewer.

**Post-fix state, measured from the build:**

| Check | Result |
|---|---|
| `typecheck` / `build` | clean / clean, 39 HTML pages |
| Internal anchors / broken | 918 / **0** |
| JSON-LD blocks / invalid | 159 / **0** |
| JSON-LD URL + image references / broken | 308 / **0** |
| `City` nodes / non-municipalities | 312 / **0** |
| Images / missing or empty alt | 318 / **0** |
| Pages without exactly one `<h1>` | **0** |
| Indexable titles > 60 chars | **0** |
| Indexable descriptions > 158 chars | **0** |
| Sitemap URLs / any noindexed | 25 / **0** |
| Heading-level skips | **0** |
| Duplicate `id` / dangling ARIA targets | **0** / **0** |
| Service-page overlap (max / mean) | 20.3% / 19.3% |
| Location-page overlap (max / mean) | 24.3% / 22.4% |

**One headroom note for whoever edits next:** the longest indexable title (60)
and the longest indexable description (158) sit exactly on their ceilings.
Adding a word to `/about`, `/services/concrete-and-asphalt-sealing` or
`/locations` trips the limit.

---

## 2. Keyword coverage achieved vs plan

| Plan item | Status |
|---|---|
| Six-tier intent map, per-service and per-location keyword assignment | **Done** — plan §1.3, §1.4 |
| No two pages bidding on the same string | **Done** — verified; each service owns its term × region, each community its term × city |
| Five missing municipality names captured (Coquitlam, Port Coquitlam, Port Moody, Maple Ridge, Pitt Meadows) | **Done** — now in titles, descriptions, `areaServed` and `llms.txt` |
| Tier B (service × region) landing pages optimised | **Done** — titles, descriptions, +138 outbound links |
| Tier A (service × city) landing pages strengthened | **Done** — 4× increase in inbound internal links |
| Tier D (informational) | **Blocked** — the blog is `noindex`. Machinery built; copy is the client's |
| Tier E (strata / commercial) | **Partially** — captured in metadata and the `commercial-cleaning` adjacency; the FAQ depth that would win it needs client-confirmed answers |
| Search volume figures | **Not produced, deliberately** — no keyword tool access on this account, and invented volumes get quoted as measurements |

**What was NOT achieved against the plan, stated plainly:** the FAQ depth
target (8–10 per service page, against the competitor's 14) was not met. It
stands at 6. Adding four more per service means writing answers about method,
timing and pricing that nobody at RainCity has confirmed — which is the one
thing this pass was not willing to do. It is the largest content opportunity
left after the blog.

---

## 3. Search Console readiness — exactly what you must do by hand

I have no access to the GSC dashboard. This is the full manual list, in order.

### Before anything: deploy

None of the below works until the current build is live. The verification file
is already in place and ships at
`https://raincitypms.com/google807aab8c24a997b5.html`.

### Step by step

1. **Add the property.** Prefer a **Domain property** if you have DNS access —
   it covers www/non-www and http/https in one. Otherwise URL-prefix, verified
   with the HTML file above.
2. **Submit the sitemap:** `https://raincitypms.com/sitemap.xml`.
   **Superseded by §8: the blog was published after this checklist was
   written, so the correct figure is now 32 URLs, not 25** (the blog index
   and its six posts are in; the two policy pages are still held). If it says
   36, the build did not deploy.
3. **Request indexing**, roughly 10/day (the quota is daily, per property), in
   this order:
   - Day 1: `/`, `/services`, `/locations`, `/contact`, `/about`
   - Day 2–3: the 11 `/services/*` pages
   - Day 4–5: the 9 `/locations/*` pages
4. **Day 3–7, check Coverage:**
   - *Excluded by 'noindex' tag* — should be **empty**. The blog and legal URLs
     are no longer in the sitemap, so they should not appear here at all. If
     they do, the sitemap change did not deploy.
   - *Page with redirect* — should list only `/disclaimer` and
     `/refund-policy`. Expected and correct.
   - *Discovered – currently not indexed* — normal on a new property. If a
     location page is still here at day 21, it needs more depth, not more
     links.
   - **Duplicate without user-selected canonical** — the one to watch. It
     should not name location pages. Measured overlap between the two most
     similar community pages is 24%, essentially all shared chrome.
5. **Enhancements tab, week 1–2.** FAQ and Breadcrumb reports should populate.
   **Zero FAQ items after two weeks means the JSON-LD did not deploy** —
   validate at `search.google.com/test/rich-results`.
6. **Core Web Vitals.** "Insufficient field data" is normal below a traffic
   threshold. Use PageSpeed Insights lab data meanwhile; re-check `/about` and
   `/services` after this deploy — those two carried the 8 MB and 6 MB hero
   images.
7. **Bing Webmaster Tools.** Import the GSC property. Five minutes, and it also
   feeds ChatGPT's search index — a GEO channel, not just a Bing one.

---

## 4. The service × location matrix — deliberately not built

The strongest competitor in this market runs 12 locations × 4–8 nested service
pages, ~6,500 words each, 14 FAQs, and displays 291 reviews. The obvious
response is 11 × 9 = 99 pages.

**It was not built, and I would push back on building it now.** That matrix
works for them because each page carries real differentiated substance and real
review proof. RainCity currently has neither: six unconfirmed testimonials and
no publishable review count. Ninety-nine pages generated in one pass from a
template with the city name swapped is the textbook doorway-page pattern —
precisely what Google's Helpful Content system targets, and precisely what this
build has refused from the start. It would put 99 thin URLs on a domain whose
existing 20 commercial pages are genuinely good, and dilute them.

**The conditions under which to build it** (plan §2.3, in full):

- **Tranche 1 is 12 pages, not 99** — 4 highest-intent services × the 3 largest
  markets, at `/services/[service]/[city]`.
- **Entry condition:** ≥20 published Google reviews, so the pages can carry
  proof.
- **Per-page bar:** ≥800 words that would be *false* if the city name were
  swapped — local building stock, local access constraint, two FAQs specific to
  that city's bylaws or conditions, one named local job.
- **Automated gate:** extend `check-unique.mjs` to fail the build above 35%
  pairwise overlap.
- Do not start Tranche 2 until Tranche 1 is indexed and ranking.

If the client will not supply that substance, **do not build it.** Nine
excellent location pages beat ninety-nine thin ones.

---

## 5. What needs your input, or the client's

Ordered by impact on results.

### Blocking real growth

| # | Item | Unlocks | Who |
|---|---|---|---|
| 1 | **Google Business Profile** — claim/verify as a *service-area* business, hide the address, list the 9 communities to match `areaServed`, add all 11 services named identically to the site | For a mobile business this is plausibly worth more than the entire website | Client |
| 2 | **Reviews.** Every competitor displays a count; RainCity displays none. Ask on every completed job, with a direct link | 20 reviews activates `aggregateRating`, already wired and gated on `testimonials.verified` | Client |
| 3 | **Confirm the six blog articles** (or commission replacements). Then flip `indexing.blog` to `true` in `lib/seo.tsx` — one line releases 3 route files and 8 sitemap entries | The entire informational funnel, and the AI-citation channel with it | Client |

### Needed, lower urgency

| # | Item | Note |
|---|---|---|
| 4 | **Legal review of `/terms` and `/privacy-policy`** + client sign-off on 11 operational numbers (cancellation window, quote validity, net-30, retention periods…) | Then flip `indexing.legal`. See `client-action-checklist.md` §1 for the full list |
| 5 | **Analytics decision.** Nothing measures anything today. GA4 was **not** added because the Privacy Policy states the site "runs no third-party analytics package" — true today, false the moment GA4 lands, on a page already awaiting legal review. Recommendation: a cookieless package (Plausible or Vercel Analytics) in the same commit that amends that sentence — no cookie banner, no PIPEDA consent question | Your call |
| 6 | **Social profile URLs** | Activates `sameAs` on the LocalBusiness node |
| 7 | **Google Maps Embed API key** | Maps currently render a clean text fallback |
| 8 | **Resend API key** | Quote form currently falls back to `mailto:` |
| 9 | **Confirm the three homepage stats** (5+ years, 1K+ properties, 100% satisfaction) — flagged unverified in `content.ts` | "100% customer satisfaction" is an absolute claim about outcomes |
| 10 | **8 service-tile photographs + 1 fleet photo + real before/after pairs** | One shoot also serves the Google Business Profile |
| 11 | **HSTS** — uncomment in `next.config.ts` once the host confirms HTTPS is stable | Enabling it early bricks the domain for returning visitors until `max-age` expires |
| 12 | **FAQ depth** — 4 more per service page, client-confirmed | Largest remaining content opportunity after the blog |

### Two items the compliance pass surfaced that were not on any earlier list

**A. The blog FAQ answers are not just unconfirmed advice — they are
unconfirmed commitments.** This is pre-existing copy, covered by the blanket
placeholder disclosure, but nobody had enumerated it. In `three-days-of-snow`
alone: *"in practice before seven in the morning"* (a response-time
commitment), *"Two centimetres is the standard starting point"*, *"Contracts
are priced per event rather than per pass"*, *"costs more in a mild winter and
considerably less in a heavy one"* (pricing), *"guarantees the crew capacity"*,
and *"Most commercial and strata clients take the contract"* (a claim about the
customer base). All six are categories CLAUDE.md bans inventing.

The route is `noindex` and publishes no FAQPage schema, so none of it is
machine-readable — **but the copy is publicly reachable today.** If any of
these numbers is wrong, it is wrong in public. This raises the blog from
"replace before launch" to "read before launch".

**B. The `/locations/ridge-meadow` H1 still reads "Ridge Meadow".** The title
now says "Maple Ridge & Pitt Meadows" and the schema names both real
municipalities, precisely because nobody searches the grouping name. The H1 —
the strongest on-page signal — and the breadcrumb still carry it. Changing
`location.name` cascades into the nav, four card grids, nine breadcrumb trails
and every `City` node, so it was deliberately left rather than changed
unilaterally. **Worth a decision with the client:** rename the display to
"Maple Ridge & Pitt Meadows" (and "Tri-Cities" likewise), or accept that the
title and the H1 target different terms.

---

## 6. Honest expected impact

Written so it can be forwarded to the client as-is.

### First 14 days — indexing signals, not rankings

Anyone promising rankings in 14 days is selling something.

| Signal | Expected | Where |
|---|---|---|
| Property verified | Day 1 | GSC |
| Sitemap read, 25 URLs discovered | Day 1–3 | Sitemaps |
| 20–25 URLs indexed | Day 7–14 | Pages |
| Impressions appear — brand and long-tail | Day 7–14 | Performance |
| FAQ + Breadcrumb enhancements populate | Day 7–14 | Enhancements |
| Crawl requests rise, then settle | Day 3–14 | Crawl stats |
| Clicks | **Low single digits. This is normal.** | Performance |

**A realistic day-14 statement:** *"The site is fully indexed, Google is reading
all our structured data, and we're appearing in search results for long-tail
and brand queries. Competitive rankings come next."*

### 1–3 months

Long-tail and low-competition local terms start ranking — "gutter cleaning
Anmore", "pressure washing New Westminster". Location pages begin ranking for
their city + service terms; the 4× increase in internal links to that tier is
what should show up here first. First organic quote-form submissions. If the
Google Business Profile is claimed and gathering reviews, local-pack
impressions will likely exceed organic in this sector.

### 3–6 months

Competitive terms — "pressure washing Surrey", "gutter cleaning Burnaby" —
reach page 1 **if** the review gap closes and the blog goes live. Blog posts
start earning informational impressions and AI-answer citations, **only if the
`noindex` is lifted**. Enough data by then to decide the matrix from evidence
rather than guesswork.

### What will hold this back

1. Six articles invisible to Google by choice.
2. Zero published reviews against competitors showing hundreds.
3. The Google Business Profile, if unclaimed.

None is a code problem. All three are the client's to unblock, and they matter
more than anything in §1.

---

## 7. Next growth cycle

1. **Weeks 1–2** — Deploy. Verify GSC. Submit sitemap. Request indexing.
   Claim the GBP. Start asking for reviews on every job.
2. **Weeks 2–4** — Confirm or replace the blog copy; flip `indexing.blog`.
   Legal review on the two policy pages; flip `indexing.legal`. Decide on
   analytics and amend the Privacy Policy in the same commit.
3. **Month 2** — Read GSC. Which location pages are indexed and impressing?
   Which service terms show up at all? Buy real keyword volumes and attach them
   to the plan's keyword map.
4. **Month 3** — FAQ depth pass on the service pages, with client-confirmed
   answers. Add the post list to `blogPageSchema` (its own note says real copy
   is now the only condition left).
5. **Month 4+** — Only if ≥20 reviews are live and the client will supply local
   substance: matrix Tranche 1, 12 pages, with the overlap gate in place first.

---

## Appendix — files

**Working files:** `seo-audit/00-current-state.md` (audit),
`01-master-seo-plan.md` (plan), this report, and `logs/` — one per agent role:
`research-agent-log.md`, `technical-seo-agent-log.md`,
`onpage-metadata-agent-log.md`, `content-writer-agent-log.md`,
`local-seo-agent-log.md`, `qa-verification-agent-log.md`,
`compliance-recheck-agent-log.md`. The last two carry the independently
measured numbers and the eight issues they raised.

**Durable conventions** were mirrored into `CLAUDE.md` so the next session
inherits them: the `indexing` flag, the two-way link graph and why the nav
dropdown does not count, the measured heading rule, the metadata character
ceilings, the two non-municipalities, and how `BlogBlock` is meant to grow.

**Code changed:** `lib/content.ts`, `lib/seo.tsx`, `lib/photos.ts`,
`app/sitemap.ts`, `app/layout.tsx`, 8 route files, `components/blog/PostBody.tsx`,
`check-layout.mjs`, `public/llms.txt`, 6 images in `public/`.
**New:** `components/service/ServiceAreas.tsx`,
`components/service/RelatedServices.tsx`.

---

## 8. Addendum — the two client blockers named in §5 were resolved, and the
performance pass ran

This section documents what changed after 2026-09-02, in the same session,
on the client's explicit instruction not to wait for the pending reviews.
**The figures above (25 sitemap URLs, "blog is `noindex`", the testimonial
count) are the record of what was true at the time this report was written —
left as-is rather than edited in place, so the report stays an honest
snapshot.** The current numbers are in `CLAUDE.md`, which is kept live.

### The two blockers named above

- **Testimonials.** The client confirmed only the first two entries in
  `testimonials.items` are real. The other four — the ones flagged throughout
  this report as unconfirmed — were deleted rather than held pending review.
  `verified` is `true`; `reviewCount` stays `0` until a review platform is
  connected, so no rating publishes. See "Four testimonials were removed, not
  replaced" in `CLAUDE.md`.
- **Blog.** The client authorised publication without waiting for a line-by-
  line confirmation, on the condition that no article state an operational
  commitment nobody had actually made. Ten sentences across all six posts were
  rewritten on that basis — a completion time, a trigger depth, a pricing
  model, a capacity guarantee, a duration range, a claim about commercial
  clients — before `indexing.blog` moved to `true`. The sitemap carries 32
  URLs now, not 25: the blog index and its six posts, still minus the two
  policy pages, which remain `noindex` pending actual legal review — that one
  was not waived. See "The blog is published" in `CLAUDE.md`.

Both changes mean §5's "what only the client can unblock" table has two fewer
rows than it did on 2026-09-02. The Google Business Profile and the review
count are still outstanding and still the client's alone.

### Performance

The brief also asked for a 90+ PageSpeed Insights score on mobile. Baseline
at the start of this pass was **86** (`/`, mobile, Lighthouse 13.4.1,
simulated throttling), the entire gap sitting in LCP at 4.1s while TBT (80ms)
and CLS (0) were already clean. Three changes closed most of it:

1. **`framer-motion` removed.** `components/ui/Motion.tsx` re-implements the
   same four exports (`Reveal`, `RevealOnLoad`, `Stagger`, `StaggerItem`) as
   CSS `@keyframes` plus one shared `IntersectionObserver`, cutting 38 KB
   gzipped of JavaScript that was buying a fade and a 16px slide. See "Motion
   is CSS. There is no animation library." in `CLAUDE.md`.
2. **AVIF added ahead of WebP**, with an explicit `qualities: [68, 75]` ladder
   in `next.config.ts` (Next 16 requires the values be declared before
   `PhotoFrame` can request one). Measured on this site's own photographs,
   AVIF lands roughly 45% smaller than the WebP it replaces at the sizes
   actually served.
3. **A favicon.** `/favicon.ico` and `app/icon.svg` did not exist; every page
   load produced a console 404 for `/favicon.ico`, which Lighthouse counts
   directly against Best Practices. Both files render the same mark
   `components/ui/Logo.tsx` already uses in the header — the plate cut at 12°
   in RainCity Blue, the Pacific Blue hairline — at the locked token colours,
   nothing new. Best Practices went from 96 to 100 on every page checked.

Measured after all three landed, mobile, mobile-emulated, simulated
throttling, `next build && next start` on port 3100:

| Page | Performance | Accessibility | Best Practices | SEO | LCP |
|---|---|---|---|---|---|
| `/` (home) | **90** | 100 | 100 | 100 | 3.4s |
| `/about` | **92** | 100 | 100 | 100 | 3.1s |
| `/locations/surrey` | **91** | 100 | 100 | 100 | 3.3s |
| `/services/gutter-cleaning` | **89** | 100 | 100 | 100 | 3.5s |

Three of the four representative pages clear 90; the service-page template —
checked here as the pattern shared by all eleven services — holds at 89
across two repeat runs, one point under, with every other category maxed.
The remaining LCP time on that template is not image loading (LCP discovery
scores 1: `fetchpriority=high`, discoverable in the initial document, never
lazy) — it is roughly 2.1s of `elementRenderDelay`, traced to Style & Layout
work (838ms of the 1.9s main-thread total) rather than script. That cost
tracks with the page's actual DOM: eleven service-scope tiles, the nine
`ServiceAreas` community links and the `RelatedServices` block added earlier
in this same pass for internal link equity. Stripping that content would
likely close the last point — and would undo work this same report argues for
elsewhere. Left as is, on the view that a real content trade-off should be a
decision this report surfaces, not one a lab score makes unilaterally.

**PageSpeed Insights itself was not run** — it scores from Chrome UX Report
field data plus its own lab pass on Google's infrastructure, and this
environment has no path to it. The numbers above are the closest local proxy
(same Lighthouse engine, same mobile throttling model) and should track
PSI's lab score closely; field data will differ once the site has enough
traffic to populate CrUX. Full reports for all four pages are in
`seo-audit/lighthouse/`.

**Build state:** `npm run typecheck` clean, `npm run build` clean, 44 pages
prerendered (up from 42 at the top of this report — `app/icon.svg` and
`app/favicon.ico` are new routes; no page count changed).
