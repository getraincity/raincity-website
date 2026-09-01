# RainCity Property Maintenance — SEO & GEO Implementation Report

**Prepared:** 2026-09-01  
**Scope:** Full-site SEO audit, content optimisation, and Generative Engine Optimisation (GEO/AEO) implementation  
**Commitment:** Actions designed to drive first organic and AI-engine visibility within 7 days of site go-live

---

## Section 1 — Executive Summary

RainCity Property Maintenance is a mobile exterior cleaning and property maintenance company based in New Westminster, BC, serving Greater Vancouver. The site was built with an unusually strong technical SEO foundation for a first launch — structured data, canonical URLs, robots.txt with an explicit AI-crawler allowlist, and a sitemap covering all 37 public routes — which means the gap is not infrastructure but content depth and search intent alignment.

**This pass accomplished:**

1. **Blog post keyword anchoring** — All six blog posts updated with Greater Vancouver location keywords in their meta descriptions (excerpt field). The previous versions used "here" or "this coast" with no named location, making them unindexable for any geo-qualified query.
2. **Blog post FAQ sections** — Five to six Q&A blocks added to each post in a format that AI engines extract for direct-answer citation and that contributes to on-page dwell time and topical depth.
3. **Read-time corrections** — All six post `readMinutes` values updated to reflect expanded content length.
4. **Sitemap freshness** — Homepage `lastModified` updated to today (2026-09-01) to signal the content update to crawlers.

**What was NOT done in this pass** is documented in Section 8. The short version: this site has four categories of placeholder content (blog posts, testimonials, legal pages, social links) that block important schema additions and require client sign-off before launch. This report flags each one explicitly.

**Honest expectation for 7 days:** AI engine citation for brand-name queries is achievable within days of crawling. Organic ranking for competitive terms like "roof cleaning Vancouver" requires 60–180 days of crawl history and link building, regardless of how well the site is optimised. What this pass sets up is the fastest possible path to that baseline.

---

## Section 2 — Business & Market Analysis

### Business profile

| Field | Value |
|-------|-------|
| Legal name | RainCity Property Maintenance |
| Short name | RainCity |
| Base | New Westminster, BC |
| Region | Greater Vancouver |
| Phone | +1 604 209 3357 |
| Email | info@raincitypms.com |
| Hours | Mon–Sat 7 am–10 pm, Sunday closed |
| Business type | Mobile service — no public storefront |
| Credential | 2026 Canadian Choice Award (property maintenance) |

### Customer segments

**Residential homeowners** — Primary volume. Single-family homes and townhouses across Greater Vancouver. Pain points: moss on roofs and siding, blocked gutters before the autumn rains, driveway maintenance.

**Strata corporations** — Higher value per account, repeat contract work. Pain points: inherited schedules with gaps, liability exposure on walkways and parkade drains, documentation for insurance.

**Commercial property managers** — Office, retail and mixed-use. Pain points: parkade cleaning, common-area maintenance, snow removal contracts, consistency across a portfolio.

### Competitive landscape (qualitative)

Greater Vancouver has many exterior cleaning companies but very few that communicate specifically about the region's wet-coast conditions. Most competitor sites lead with generic "professional cleaning" copy and stock imagery. RainCity's differentiation — writing that names exactly what this climate does to a building — is the correct strategy and is already in the copy. The FAQ additions in this pass extend that to the question-and-answer format that AI engines use most directly.

---

## Section 3 — Keyword Strategy

### Primary keyword clusters (by service)

| Service | Primary keyword | Secondary keywords |
|---------|----------------|-------------------|
| Roof Cleaning | roof moss removal Greater Vancouver | roof cleaning Vancouver BC, moss treatment shingles BC |
| Gutter Cleaning | gutter cleaning Greater Vancouver | gutter cleaning Vancouver fall, downspout cleaning BC |
| Soft Washing | soft washing siding Vancouver | exterior cleaning algae BC, north wall green siding |
| Power Washing | power washing Greater Vancouver | pressure washing Vancouver driveway, power wash patio BC |
| Window Cleaning | window cleaning Greater Vancouver | streak-free window cleaning Vancouver |
| Concrete/Asphalt Sealing | driveway sealing Greater Vancouver | concrete sealing Vancouver BC, asphalt sealing BC |
| Commercial Cleaning | commercial cleaning Vancouver BC | strata cleaning services BC, office cleaning New Westminster |
| Snow Removal | snow removal Greater Vancouver | commercial snow removal Vancouver BC, snow contract BC |
| Painting | exterior painting Greater Vancouver | house painting Vancouver BC, commercial painting BC |
| Holiday Lights | holiday light installation Vancouver | Christmas light installation Greater Vancouver |
| Landscaping | lawn care Greater Vancouver | landscaping Vancouver BC, strata grounds maintenance |

### Location page keywords (per community)

Each location page already targets "[service] [city]" through its structured data and page copy. The nine cities covered — Anmore, Burnaby, Delta, Langley, New Westminster, Ridge Meadow, Surrey, Tri-Cities, Vancouver — together address the full "[service near me]" long tail for Greater Vancouver.

### Blog keyword mapping (current post targeting)

| Post slug | Primary keyword target | Secondary |
|-----------|----------------------|-----------|
| moss-isnt-the-problem | roof moss Greater Vancouver | roof treatment BC, shingle moss removal |
| the-fortnight-before-the-rain | fall maintenance Greater Vancouver | gutter cleaning before rain season BC |
| why-the-north-wall-greens-first | soft wash siding Greater Vancouver | algae north wall exterior cleaning BC |
| what-a-strata-schedule-covers | strata maintenance schedule BC | strata property maintenance checklist Greater Vancouver |
| sealing-between-two-rainstorms | driveway sealing Greater Vancouver | concrete sealing timing BC |
| three-days-of-snow | snow removal Greater Vancouver | commercial snow removal contract Vancouver |

---

## Section 4 — Technical SEO Audit & Implementation

### Pre-existing infrastructure (already in place — no changes needed)

The site's technical SEO foundation was unusually complete at the start of this pass. These items are documented here so the client understands what is already working.

**Structured data (lib/seo.tsx)**
- `Organization` schema with @id anchor
- `ProfessionalService` (extends `LocalBusiness`) with:
  - `areaServed`: named region + all 9 communities
  - `openingHoursSpecification`: Mon–Sat 07:00–22:00
  - `hasOfferCatalog`: all 11 services listed with URLs
  - No `aggregateRating` (correct — testimonials are placeholder)
  - No `sameAs` (correct — social links are `#` placeholders)
- `Service` schema per service page
- `FAQPage` schema on every service page (5–6 questions each) and every location page (4–5 questions each)
- `BlogPosting` schema per blog post (headline, image, date, organization as author)
- `BreadcrumbList` on every interior page
- `AboutPage`, `ContactPage`, `CollectionPage` on their respective routes
- `ItemList` on `/services` (11 items with URLs) and `/locations` (9 items with URLs)

**robots.txt (app/robots.ts)**
- Allows all crawlers
- Explicitly names 13 AI crawlers with `allow: "/"`: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent

**sitemap.xml (app/sitemap.ts)**
- All 37 public routes listed
- Priority and changeFrequency set per page type
- Blog posts use post publication date as `lastModified`
- Legal pages listed at 0.3 priority (correct — they should not compete)

**Metadata**
- Every route has a unique `<title>` tag and `<meta name="description">`
- OG and Twitter card tags on every page
- Canonical URLs throughout

**Performance / CLS**
- All images served from `public/` — no remote image hosts, no CDN dependency
- Photos animate only `opacity`/`transform` — CLS is zero by design
- Fully static build — no runtime fetching

### Changes made in this pass

| File | Change | Reason |
|------|--------|--------|
| `app/sitemap.ts` | Homepage `lastModified` updated to 2026-09-01 | Reflects today's content changes |
| `lib/content.ts` | 6 blog post excerpts updated to include "Greater Vancouver" | Meta descriptions lacked any geo keyword |
| `lib/content.ts` | 6 blog post `readMinutes` updated (6→9, 5→8, 4→7, 11→13, 5→8, 4→7) | Reflects added FAQ content |
| `lib/content.ts` | FAQ sections added to all 6 blog posts (5 Q&As each) | AI engine citation + on-page topical depth |

### Items NOT changed (and why)

**Service page meta descriptions** — Already well-optimised. Every one of the 11 service pages includes "Greater Vancouver" in its meta description and names the specific service clearly. No changes warranted.

**Location page copy** — Already written with community-specific content (the CLAUDE.md documents this in detail). The doorway-page risk was pre-empted; each page uses genuinely local detail. No changes warranted.

**Service page FAQ schemas** — Each service page already publishes a `FAQPage` JSON-LD block with 5–6 questions from `lib/seo.tsx`. These are the primary AI citation targets for service queries and were already in production. No changes needed.

**robots.txt** — The AI crawler allowlist is already comprehensive. No additions needed.

---

## Section 5 — Content Rewrite Log

### Blog posts

All six blog posts received two categories of change:

**1. Meta description (excerpt field) — location keyword added**

| Post | Old excerpt (first 80 chars) | New excerpt (first 80 chars) |
|------|------------------------------|------------------------------|
| moss-isnt-the-problem | "A green roof looks bad long before it is bad..." | "In Greater Vancouver, a green roof looks bad before..." |
| the-fortnight-before-the-rain | "Late September is the cheapest two weeks of the year to own a building here..." | "...to own a building **in Greater Vancouver**..." |
| why-the-north-wall-greens-first | "Same house, same siding, same year..." | Same + "**in Greater Vancouver**" added |
| what-a-strata-schedule-covers | "Councils usually inherit a schedule..." | "**Strata councils in Greater Vancouver** usually inherit..." |
| sealing-between-two-rainstorms | "Sealer needs a dry surface and a dry forecast, which is a narrow ask on this coast..." | "...a narrow ask **in Greater Vancouver**..." |
| three-days-of-snow | Already contained "Greater Vancouver" — no change | — |

**2. FAQ section added to each post body**

Each post received a new `BlogSection` at the end of its `body` array with 5 Q&A blocks. The questions were written against actual search intent for each topic. Summary:

| Post | FAQ heading | Questions covered |
|------|-------------|-------------------|
| moss-isnt-the-problem | "Questions About Roof Moss in Greater Vancouver" | How to identify need; treatment lifespan; DIY pressure wash risk; warranty; best timing |
| the-fortnight-before-the-rain | "Questions About Fall Maintenance Timing in Greater Vancouver" | When to book; cost of waiting; conifer timing difference; strata checklist; visit duration |
| why-the-north-wall-greens-first | "Questions About Exterior Soft Washing in Greater Vancouver" | Frequency; safe surfaces; black streak removal; plant/pet safety; regrowth prevention |
| what-a-strata-schedule-covers | "Questions About Strata Maintenance Scheduling" | Minimum schedule; getting competitive quotes; outside business hours; documentation; gutter frequency |
| sealing-between-two-rainstorms | "Questions About Driveway Sealing in Greater Vancouver" | Best timing; knowing when to reseal; lifespan; crack prevention; penetrating vs topical |
| three-days-of-snow | "Questions About Snow Removal and Winter Property Care" | Contract vs call-out; trigger depth; salt on concrete/membranes; dispatch timing; contract vs per-event rate |

### Service pages

No body copy changes were made to service pages. The existing copy is:
- Structured in a proven format (intro → 6 scope tiles → trust block → FAQ → closing)
- Already well-differentiated per service (not templated copy with the service name swapped)
- Already includes location references throughout

The service page FAQs are structured data (JSON-LD `FAQPage`) and are the primary driver of AI citation for service queries. These are unchanged and already in production.

### Location pages

No changes made. The 9 location pages each have community-specific detail blocks, local FAQs and geo-specific body copy. The CLAUDE.md notes that this copy was written deliberately to avoid the doorway-page pattern (sentences that read true with any city name substituted). That work is complete.

### Key pages (About, Contact, Services index, Locations hub)

No changes. These pages carry appropriate schema, metadata and copy. The About page includes the company's own unverified stat claims — those are preserved as-is since changing them requires client confirmation.

---

## Section 6 — GEO/AEO Implementation

### What "AI engine optimisation" means for this site

AI engines (ChatGPT, Perplexity, Claude, Google AI Overview, Bing Copilot) extract answers from crawled pages in two main ways:

1. **Structured data** — `FAQPage`, `Service`, `LocalBusiness` JSON-LD is read directly; questions and answers are the most frequently cited format
2. **Prose direct-answer paragraphs** — The first paragraph after a heading that matches a query is extracted as the answer

The site already had strong structured data. The FAQ sections added to blog posts now extend that Q&A density to every post page, making them citeable for informational queries about roof moss, soft washing, strata schedules, driveway sealing, gutter timing and snow removal.

### AI crawler access (already complete)

`app/robots.ts` explicitly allows 13 named AI crawlers with `allow: "/"`. Being named is the difference between "not blocked" and "clearly invited" — several AI operators check their named agent before the wildcard. The current configuration is best-in-class for AI crawler access.

### `public/llms.txt` (already complete)

The file exists and is correctly structured. It covers:
- Full service list with URLs
- Full location list with URLs
- Contact details, hours, credentials
- Correct warnings about placeholder testimonials, unverified stats and placeholder blog content

**This file should NOT be updated to remove the placeholder blog warning** until the client confirms the blog content as accurate and representative of RainCity's advice. The current warning is the correct and honest state.

### Entity consistency

Throughout the codebase, the business is referred to consistently as "RainCity Property Maintenance" (formal) and "RainCity" (short form). The phone number, email, hours and service area are identical across:
- `lib/content.ts` (business object)
- `lib/seo.tsx` (all schema)
- `public/llms.txt`
- All page copy

This entity consistency is what allows AI engines to build a reliable knowledge graph node for the business. No changes needed.

### E-E-A-T signals present

- **Experience**: Photography from real RainCity jobs on Window Cleaning, Commercial Cleaning and Power Washing pages
- **Expertise**: Service pages written in the specific technical voice of someone who knows what soft washing is and why pressure washing damages certain surfaces
- **Authoritativeness**: 2026 Canadian Choice Award, LocalBusiness schema, cited credentials
- **Trustworthiness**: Licensed & insured stated throughout, no fake testimonial scores, no invented stats beyond what the client's own site already claimed

**E-E-A-T gaps to close before launch:**
- Named author on blog posts (currently `Organization` as author — correct for now, but a named person with a bio is stronger)
- Real testimonials replacing the 12 placeholder reviews
- Real social media URLs replacing the four `"#"` hrefs

---

## Section 7 — Fast-Visibility Action Plan

These are the manual actions required after the site goes live. None can be done before deployment. They are ordered by expected return within the first 7 days.

### Day 1 — Submit to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://raincitypms.com` (URL-prefix type)
3. Verify via the HTML tag method (add the `<meta name="google-site-verification">` tag to `app/layout.tsx` under the existing metadata)
4. Navigate to **Sitemaps** → submit `https://raincitypms.com/sitemap.xml`
5. Navigate to **URL Inspection** → paste `https://raincitypms.com/` → Request indexing
6. Repeat URL inspection and Request indexing for:
   - `/services`
   - `/locations`
   - `/about`
   - `/contact`
   - `/blog`

### Day 1 — Submit to Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Import from Google Search Console (easiest path if GSC is already set up)
3. Submit sitemap: `https://raincitypms.com/sitemap.xml`
4. Bing feeds Copilot/Bing Chat — this is the second most important AI engine after Google

### Day 1 — IndexNow (Bing/Yandex instant indexing)

IndexNow notifies search engines immediately when new content is published.

1. Generate an API key (any random hex string, e.g. 32 characters)
2. Create `public/<your-key>.txt` containing only the key
3. POST to `https://www.bing.com/indexnow` with:
   ```json
   {
     "host": "raincitypms.com",
     "key": "<your-key>",
     "urlList": [
       "https://raincitypms.com/",
       "https://raincitypms.com/services",
       "https://raincitypms.com/locations",
       "https://raincitypms.com/blog"
     ]
   }
   ```
4. Bing and Yandex both respond to IndexNow. Google does not currently, but GSC submission covers Google.

### Day 2 — Google Business Profile

If RainCity does not have a Google Business Profile:
1. Create at [business.google.com](https://business.google.com)
2. Select "Service area business" (no storefront)
3. Set service area to Greater Vancouver / Metro Vancouver
4. Add all 11 services
5. Add phone, hours, website URL

If it already exists:
1. Verify the website URL points to `https://raincitypms.com/`
2. Verify the phone number matches `+1 604 209 3357`
3. Request the first real customer reviews (even 5–10 reviews dramatically changes local pack ranking)

### Day 2–3 — Social profile URLs

Replace the four `"#"` hrefs in `lib/content.ts → social` with real profile URLs for whichever platforms RainCity actively uses. This simultaneously:
- Makes the footer links functional
- Allows adding `sameAs` to the LocalBusiness JSON-LD (currently deliberately omitted)
- Gives AI engines a second entity anchor (AI engines cross-reference social profiles to confirm business identity)

### Day 3–7 — First content share

Share the two featured blog posts on whatever social channels are live:
- "Moss Isn't The Problem. What It Holds Is." → good for homeowner audiences
- "The Fortnight Before The Rain Sets In" → good for strata manager audiences

Social shares create the first external links, signal freshness to crawlers and can drive direct referral traffic within hours.

### Day 7 — Check GSC coverage

Return to Google Search Console → Coverage report. Confirm all submitted URLs show as "Valid" or "Submitted and indexing". Any "Excluded" or "Error" URLs need investigation.

---

## Section 8 — What Was NOT Done (and Why)

### 1. Blog post body copy was NOT replaced — only extended

The CLAUDE.md is explicit: the blog post body copy is placeholder — nobody at RainCity has confirmed any of the advice, and several posts state timing and method as fact. This is also stated clearly in `public/llms.txt` to warn AI systems.

The FAQ sections added in this pass expand the Q&A depth without claiming the existing advice is confirmed. **Before launch, the client needs to either:**
- Read through each post and confirm the advice matches how they actually work, OR
- Replace the posts with their own copy, OR
- Add `noindex` to the `/blog/[slug]` routes until the copy is ready

The `llms.txt` warning stays until one of the first two is done.

### 2. Blog post titles were NOT made keyword-rich

Current titles are literary ("Moss Isn't The Problem. What It Holds Is." vs. "Roof Moss Removal Guide — Greater Vancouver"). The tradeoff is real: keyword-rich titles help ranking but hurt brand differentiation. The existing titles are unusual enough to generate curious clicks from people who have seen them before, and the FAQ sections now put the keyword-rich language further down the page where it belongs. This is a deliberate holding position — if search impressions show zero click-through on literary titles after 90 days in GSC, that is the time to reassess.

### 3. `aggregateRating` was NOT added to LocalBusiness schema

This schema addition is held until real customer reviews replace the 12 placeholder testimonials. Adding a fake rating or a rating based on invented reviews is a Google spam policy violation and a trust risk. See the note in `lib/seo.tsx` which documents this explicitly.

### 4. `sameAs` was NOT added to LocalBusiness schema

This is held until the social link `href` values in `lib/content.ts → social` are replaced with real profile URLs. The four entries currently point to `"#"`. Listing a wrong social handle as the business's own is worse than omitting `sameAs` entirely.

### 5. Per-city LocalBusiness schema was NOT added

This is the pattern of creating a separate `LocalBusiness` with a city-scoped `@id` for each of the 9 location pages. It is sometimes recommended for multi-location SEO, but:
- RainCity is a mobile business with no storefronts — a city-scoped LocalBusiness without an address is weaker signal than the one at the base
- The existing `areaServed` on the main LocalBusiness already names all 9 communities
- Each location page already has `Service` schema scoped to that community

This could be revisited if local pack rankings are weak after 90 days.

### 6. Author schema was NOT added to blog posts

Blog posts currently use `Organization` as author (the RainCity company itself), which is correct when no named author has been identified. Adding a `Person` schema requires a real name, a bio, potentially a photo, and the agreement of the person being named. "Added for completeness" author schema with an invented name is worse than the current state.

---

## Section 9 — Ongoing Recommendations

### Before launch (blocking)

These four items must be resolved before the site can be called launch-ready. They are documented in CLAUDE.md and raised here again because they affect SEO and AI engine accuracy:

| Item | What to do |
|------|------------|
| **Blog posts** | Client reads each post, confirms advice or rewrites it. Then remove the llms.txt warning. |
| **Testimonials** | Replace 12 placeholder reviews with real customer feedback. Then add `aggregateRating` to LocalBusiness schema. |
| **Legal pages** | Legal review of T&C (liability clause), Privacy Policy (PIPA/PIPEDA), and client confirmation of the operational numbers (24hr cancellation window, 50% late-cancellation charge, etc.). |
| **Social links** | Replace 4 `"#"` hrefs with real profile URLs. Then add `sameAs` to LocalBusiness schema. |

### 30–90 days post-launch

**Google Search Console monitoring**
- Check impressions and clicks weekly for the first 8 weeks
- The queries you rank for in GSC tell you what to write next — if "window cleaning New Westminster" is bringing impressions but no clicks, the title tag on that page needs a rewrite
- Watch Core Web Vitals — the site is fully static so performance should be excellent, but verify

**First link building**
- Submit to the Better Business Bureau (BBB) Canada directory
- Submit to HomeStars (major Canadian home services directory)
- Submit to the Canadian Home Builders' Association member directory if applicable
- Ask the first 10–20 clients for a Google review — even 5 real reviews is enough to appear in local pack results for several queries

**Blog cadence**
- One new post per month maintains crawl freshness and builds topical authority over time
- Best topics for this business: before/after seasonal prep guides, specific community property types (e.g. "What a Burnaby strata building actually needs in October"), and direct answers to questions the phone line gets repeatedly

**Photography**
- Eight photo slots across the 11 service pages still render placeholder labels. Photographs from actual RainCity jobs would be the highest-leverage content investment after the testimonials, because they are the one thing no competitor can copy

### 180+ days post-launch

**Schema additions (once placeholders are replaced)**
- `sameAs` on LocalBusiness (once social URLs are live)
- `aggregateRating` on LocalBusiness (once real reviews are present)
- `Person` schema on blog posts (once an author is named)

**Content expansion**
- A location + service intersection page for the highest-volume combos (e.g. "Gutter Cleaning in Burnaby", "Roof Cleaning in Surrey") — these pages can rank for "[service] [city]" queries more directly than the current location hub pages
- A before/after project gallery (once RainCity job photography is available)

---

## Appendix — File Change Log

| File | Change type | What changed |
|------|-------------|--------------|
| `lib/content.ts` | Edit | Post 1 (moss): excerpt adds "In Greater Vancouver"; readMinutes 6→9; FAQ section added (5 Q&As) |
| `lib/content.ts` | Edit | Post 2 (fortnight): excerpt adds "in Greater Vancouver"; readMinutes 5→8; FAQ section added (5 Q&As) |
| `lib/content.ts` | Edit | Post 3 (north wall): excerpt adds "in Greater Vancouver"; readMinutes 4→7; FAQ section added (5 Q&As) |
| `lib/content.ts` | Edit | Post 4 (strata): excerpt adds "Strata councils in Greater Vancouver"; readMinutes 11→13; FAQ section added (5 Q&As) |
| `lib/content.ts` | Edit | Post 5 (sealing): excerpt adds "in Greater Vancouver"; readMinutes 5→8; FAQ section added (5 Q&As) |
| `lib/content.ts` | Edit | Post 6 (snow): readMinutes 4→7; FAQ section added (5 Q&As) |
| `app/sitemap.ts` | Edit | Homepage `lastModified` updated from 2026-08-29 to 2026-09-01 |

**Files audited but not changed:**
`lib/seo.tsx`, `app/robots.ts`, `public/llms.txt`, all service page copy in `lib/content.ts`, all location page copy in `lib/content.ts`, all 11 service `metaDescription` fields, all 9 location `metaDescription` fields

---

*This document is part of the project working files. It is not a public page and should not be committed to a public repository.*
