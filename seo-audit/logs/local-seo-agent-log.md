# Local SEO Agent — log

**Ran:** 2026-09-02 · **Phase 4**

---

## 1. The one substantive change: two fictional cities removed from the schema

**Problem found while verifying, not in the original audit.** Every piece of
structured data on this site derived `areaServed` from `locations[].name`, and
two of those nine names are not places:

```json
{ "@type": "City", "name": "Ridge Meadow" }
{ "@type": "City", "name": "Tri-Cities" }
```

Neither is an incorporated municipality. Neither is on a map. A crawler asked
to resolve `City: "Ridge Meadow"` resolves nothing — and this appeared in
`localBusinessSchema.areaServed` on the homepage, in `serviceSchema` on all
eleven service pages, and in `locationSchema` on the community pages. For a
service-area business with no street address, `areaServed` is doing most of the
proximity work, so two of nine entries resolving to nothing is not cosmetic.

Meanwhile the page copy names the real municipalities **16 to 31 times each**.
The prose was right and the markup was wrong.

**Change.** Added an optional `municipalities?: readonly string[]` to
`Location`, set on the two grouping entries only (seven municipalities leave it
unset). `citiesOf()` in `lib/seo.tsx` expands it; `areaServed` flat-maps over
it and `locationSchema` unwraps the single-entry case rather than publishing a
one-element array.

**Effect** — `areaServed` on the homepage LocalBusiness node:

| Before (9, two fictional) | After (12, all real) |
|---|---|
| Anmore, Burnaby, Delta, Langley, New Westminster, **Ridge Meadow**, Surrey, **Tri-Cities**, Vancouver | Anmore, Burnaby, Delta, Langley, New Westminster, **Maple Ridge, Pitt Meadows**, Surrey, **Coquitlam, Port Coquitlam, Port Moody**, Vancouver |

The display name was deliberately **not** changed. "Maple Ridge & Pitt Meadows"
on a card, in the nav and in nine breadcrumb trails is a layout problem, and
the grouping is how the company actually talks about the area. This is the
markup catching up with the prose, not a new claim about coverage.

---

## 2. NAP consistency — verified, no change needed

Everything derives from one `business` object in `lib/content.ts`. Header,
footer, `/contact`, `llms.txt`, `organizationSchema` and `localBusinessSchema`
all read it. There is no second copy to drift.

| Field | Value |
|---|---|
| Name | RainCity Property Maintenance |
| Phone | +1 604 209 3357 |
| Email | info@raincitypms.com |
| Hours | Mon–Sat 7 am – 10 pm; Sunday closed |
| Base | New Westminster, BC · Geo 49.2057, −122.911 |

`openingHoursSpecification` omits Sunday rather than publishing `00:00–00:00`,
which is the common way to accidentally publish "open all day". Correct as
found.

---

## 3. `llms.txt` refreshed

The one file on this site that does not derive from `content.ts`. Three edits:

- **Added the grouping expansion in plain language** — so an answer engine
  asked "does RainCity serve Coquitlam?" or "…Pitt Meadows?" can answer yes and
  cite the right page. This is the same fix as §1, in the channel that reads
  prose rather than JSON-LD.
- **Blog note updated** to say the eight URLs are `noindex` *and* held out of
  `sitemap.xml`, and what lifts that.
- **Added a legal-pages note** — `/terms` and `/privacy-policy` are reachable
  but unreviewed, and several figures in them (cancellation window, quote
  validity, payment and retention periods) were written as plausible defaults
  rather than supplied. An AI system must not state any of them as this
  company's policy.

---

## 4. Still blocked on the client — cannot be resolved from the codebase

| Item | Unlocks |
|---|---|
| **Google Business Profile** — claim/verify as a *service-area* business, hide the address, list the nine communities so they match `areaServed` exactly | For a mobile business with no storefront this is plausibly worth more than the entire website |
| **Reviews** — every competitor displays a count; RainCity displays none | 20 reviews activates `aggregateRating`, which is already wired and gated on `testimonials.verified` |
| **Social profile URLs** | `sameAs` on the LocalBusiness node — deliberately absent while unknown |
| **GBP services list** — all 11, named identically to the site | Service-match in the local pack |
| **Citations** — BBB, HomeStars, Yelp Canada, Yellow Pages CA, Nextdoor, same NAP every time | Local trust signals |

The single most common local-SEO own goal is a phone number on the GBP that
differs from the one on the site. The site's number is above; match it exactly.

---

## Files changed

`lib/content.ts` (`municipalities` field + two entries) ·
`lib/seo.tsx` (`citiesOf`, `areaServed`, `locationSchema`) · `public/llms.txt`
