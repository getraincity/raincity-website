# Rechecking / Compliance Agent — log

**Ran:** 2026-09-02 · **Phase 6** · Second independent pass

## Method

A second cold reader, told to (a) confirm the five QA fixes actually landed,
(b) confirm nothing regressed, and (c) **find what both earlier passes missed**.
It walked 1,691 JSON-LD nodes and validated 429 URL and image references
against built routes and the `public/` tree.

It found three defects neither the pass nor the first QA read had caught — one
of them a regression the pass itself introduced.

---

## Part A — the five QA fixes: all five confirmed landed

**1. Fictional City nodes — confirmed gone.** 1,691 nodes walked; **zero**
`"@type":"City"` carries "Ridge Meadow" or "Tri-Cities". The 12 names now
published are exactly the real municipalities, 26 occurrences each. `/locations`
ItemList: 9 items, `numberOfItems: 9`, positions sequential; seven `City`, two
`Place` with `containsPlace`.

On the schema choice, unprompted: *"`Place` is the correct generic supertype
for an informal locality that is not incorporated. It asserts 'a place called
Tri-Cities that contains Coquitlam, Port Coquitlam and Port Moody' — which is
true — rather than 'a city called Tri-Cities', which was not."* No objection.

It also verified consistency beyond what was asked: both `ItemList` nodes have
`numberOfItems` matching actual length; all 10 `OfferCatalog` nodes carry 11
items; the 37 array-valued `areaServed` fields split 13/3/2 entries exactly as
the grouping expansion predicts.

**2. Snow-post fabrication — confirmed removed.** `"one contract"`: **0 hits**
across `lib/`, `app/`, `components/`, `CLAUDE.md`. It then verified the
*replacement's* claims rather than trusting them, against the built
`services/snow-removal-salting.html`: trigger depth ✓, route position ✓, service
log ✓. All three site-facts true. No bundling claim.

**3. Pricing claim — confirmed removed.** `"costs less than booking them on
two"`: 0 hits. Replacement carries no price or discount commitment, explicit or
implied.

**4. Invented comment — confirmed removed.** `"most common damage"`: 0 hits.

**5. `CLAUDE.md` — partially corrected.** The two points named verified against
code (`social` is `[]`; `href="#"` = **0** in built HTML; sitemap = **25**), but
a third stale section was missed. See defect 2 below.

---

## Part B — regression check: clean

| Check | Measured |
|---|---|
| `typecheck` / `build` | exit 0 / exit 0; 39 HTML files |
| Indexable titles > 60 / descriptions > 158 | **0 of 25** / **0 of 25** |
| JSON-LD blocks / parse failures | 159 / **0** |
| Sitemap `<loc>` | 25; **0** noindexed; **0** indexable pages missing |
| Internal anchors / broken | **1,465 / 0** (counting all `<a href>`, not just distinct) |
| `href="#"` | **0** |
| `<img>` / missing or empty alt | 318 / **0** |
| Exactly one `<h1>` | 37 of 39 (the two exceptions are redirect stubs) |
| Heading-level skips | **0 of 39** |
| `AggregateRating` / `Review` / `Rating` nodes | **0** |
| `BlogPosting` author = `Person` | **0 of 6** — all Organization |
| Service page overlap | max **20.3%**, mean 19.3% |
| Location page overlap | max **24.3%**, mean 22.4% |

**Headroom warning worth keeping:** the longest indexable title (60) and the
longest indexable description (158) sit exactly on their ceilings. No
violation, but zero margin — one added word on `/about`,
`/services/concrete-and-asphalt-sealing` or `/locations` trips it.

---

## Part C — three defects both earlier passes missed

### 1. DEFECT (highest) — `primaryImageOfPage` on `/about` was a 404. **Fixed.**

`lib/seo.tsx` published `primaryImageOfPage:
"https://raincitypms.com/about-section-picture.jpg"`. **That file no longer
exists.** This pass converted it to webp, updated `lib/photos.ts`, and missed
this one hardcoded string.

Of **429 URL and image references** validated across every JSON-LD block on
every page, **exactly one was broken — this one.** And it is the single image a
crawler is explicitly told is the page's principal image.

This was a regression introduced by this pass, missed by this pass's own
verification, and missed by the first QA read.

**Fix:** it now reads `photos.aboutCrew.src` from the registry. A hardcoded
path can drift from the file the page serves; the registry value cannot,
because it is the same value the page renders from. Verified after fix: **308
url/image refs checked, 0 broken**, and `/about` now references
`about-section-picture.webp`.

### 2. DEFECT — `CLAUDE.md` instructed future sessions to undo the sitemap work. **Fixed.**

The policy-pages section was left untouched by the earlier `CLAUDE.md`
correction and had gone stale in a way that actively conflicts with the code:

- It described **four** policy pages. There are two — Disclaimer and Refund
  Policy were removed and 301'd.
- It carried editing constraints for two pages that do not exist.
- Worst: *"The pages are in the sitemap at priority 0.3… If the text must not
  be indexed before review, the control is `noindex` on those routes, not
  omission from the sitemap."*

Zero of the 25 sitemap URLs is a legal page, by design — `indexing.legal`
deliberately drives **both** the route `noindex` and sitemap omission, and
`lib/seo.tsx` argues at length for exactly that. A file loaded automatically
every session was arguing against the code it documents.

**Fix:** section rewritten — two pages not four, the guarantee constraint
repointed at Terms §07 (which is what `/refund-policy` now redirects to), and
the sitemap paragraph replaced with an explicit *"do not 'fix' this by adding
them back"* and the reasoning.

### 3. DEFECT — a signpost claimed something untrue about the site. **Fixed.**

In `/blog/moss-isnt-the-problem`: *"The scope, the method and **what moves the
price** are set out on the roof cleaning page."* The agent searched the built
page: scope ✓, method ✓, but **no pricing-factors content** — zero hits for
size, storey, square, depends, varies, factors. The only price copy is the
sitewide line about pricing the property in front of us, which is the opposite
of setting out what moves a price.

One third of the sentence was false about the site's own content — failing
exactly the standard the snow signpost had just been held to.

**Fix:** now reads *"The scope and the method are set out on the…"*.

### 4. NIT — `/services` description said "one crew". **Fixed.**

Crew counts are on CLAUDE.md's banned list, and the snow page says "crews"
plural. Changed to "one company".

---

## Flagged for the client — not fixed, because they are not ours to decide

**A. The blog FAQ answers carry hard operational commitments.** Pre-existing at
HEAD and covered by the blanket PLACEHOLDER disclosure, but neither earlier
pass enumerated them, and they are far more specific than "placeholder prose"
suggests. In `three-days-of-snow` alone: *"in practice before seven in the
morning"* (a response-time commitment), *"Two centimetres is the standard
starting point"*, *"Contracts are priced per event rather than per pass"*,
*"costs more in a mild winter and considerably less in a heavy one"* (pricing),
*"guarantees the crew capacity"*, and *"Most commercial and strata clients take
the contract"* (a claim about the customer base). All six are on the banned
list. The route is `noindex` and publishes no FAQPage schema, so none of it is
machine-readable — **but the copy is publicly reachable today.** This sharpens
the blog item on the client list: it is not only unconfirmed advice, it is
unconfirmed commitments.

**B. The `/locations/ridge-meadow` H1 is still "Ridge Meadow".** The title now
says "Maple Ridge & Pitt Meadows" and the schema names the real municipalities,
precisely because — per the code comment — nobody searches "Ridge Meadow". The
H1 and the breadcrumb still carry it. Changing `location.name` cascades into
the nav, four card grids, nine breadcrumb trails and every `City` node, so it
was deliberately left. Worth re-taking as a decision, with the client, rather
than treating as settled.

---

## Categories checked and explicitly cleared

- **Open Graph / Twitter.** All 5 required OG properties on **38 of 39** pages
  (the exception is `_global-error`, which has no metadata by design). **Zero**
  pages where `og:title` ≠ `<title>`, `og:description` ≠ description, or
  `og:url` ≠ canonical. `og:type` = website ×32, article ×6 — exactly the six
  posts. All 7 distinct `og:image` files verified present on disk.
- **Canonicals.** All absolute, https, self-referential. **Zero trailing-slash
  inconsistencies.**
- **Doc shell.** `charset` 39/39. `viewport` 39/39, identical. `lang="en-CA"`
  36/39 (the 3 without publish no metadata).
- **Breadcrumbs.** 34 pages carry one; **0 problems** — every crumb URL
  resolves, every terminal crumb matches the page's own path, positions
  sequential.
- **`llms.txt`.** 28 URLs, **0 broken**. Exactly 11 service and 9 location URLs,
  matching `services.length` and `locations.length`. No reference to the
  removed `/disclaimer` or `/refund-policy`.
- **`robots.txt`.** Agrees with reality. `Disallow: /api/` correctly covers the
  dynamic `/api/contact`, and no `Disallow` shadows a `noindex` — which would
  stop the crawler ever seeing it.
- **Sitemap hygiene.** Well-formed; 25 `lastmod`, **none in the future**.
- **Guarantee claims.** Chased because the site publishes "100% Satisfaction
  Guaranteed" ×2 and similar ×6 while the Refund Policy was deleted. `/terms`
  §07 "Our Workmanship Guarantee" now carries it and `/refund-policy` redirects
  there. **Claims are backed** — though the backing page is itself `noindex`
  pending legal review.
- **Duplicate IDs / dangling ARIA.** **0 pages** with duplicate `id`; **0**
  dangling `aria-labelledby` or `aria-describedby`.
- **New components' accessibility.** Both `aria-labelledby` targets exist and
  are unique. Link accessible names descriptive, never bare "View" or "Learn
  more". Icons `aria-hidden`. `RelatedServices` was specifically checked for
  non-`<li>` children in its `<ul>` — it has none. One observation, not a
  defect: card focus state is a 1px border colour change identical to hover —
  satisfies WCAG 2.1 SC 2.4.7 but thin against 2.2 SC 2.4.11. Consistent with
  the whole site, so a system-wide question, not a regression.
- **`/disclaimer` and `/refund-policy` prerendering with `index, follow`.**
  Flagged, then cleared: `next.config.ts` 301s both before filesystem routing,
  so the HTML never renders.

---

## Post-fix verification

Re-run after all four fixes: **39 pages · 918 distinct internal anchors, 0
broken · 318 images, 0 without alt · 159 JSON-LD blocks, 0 invalid · 312 City
nodes, 0 fictional · 308 JSON-LD url/image refs, 0 broken · 0 pages without
exactly one h1 · 0 over-length indexable titles or descriptions · sitemap 25
URLs.** `typecheck` and `build` clean.
