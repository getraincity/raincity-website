# RainCity Property Maintenance — Full SEO Audit

**Prepared:** 2026-08-31  
**Scope:** All 37 public routes across the raincitypms.com static Next.js build  
**Basis:** Codebase analysis only — no live traffic, no Search Console data  

---

## 1. Executive Summary

**Overall Site Health Score: 68 / 100**

The technical foundation is genuinely strong: clean URL structure, correct canonical tags, well-structured JSON-LD across every route, a self-hosted image stack, static pre-rendering, explicit AI-crawler allowlisting, and a thoughtful keyword distribution strategy that deliberately avoids cannibalisation between the homepage, /services, /about, /locations and /blog. These are not defaults — they represent deliberate, well-documented architecture decisions.

The primary problems are concentrated in three areas:

1. **Meta descriptions are systematically too long on the six highest-priority pages** — the homepage, /about, /services, /locations, /contact and /blog all exceed 160 characters, meaning Google will truncate every one in the SERP. These are the pages that generate the most impressions and click-throughs, so this is the audit's highest-ROI fix.

2. **Pre-launch content has been indexed without `noindex` protection** — six placeholder blog posts and four unreviewed legal pages are live, in the sitemap, and carrying structured data that asserts they are real content. This is an integrity and E-E-A-T risk that cannot be deferred.

3. **E-E-A-T signals are systematically thin** — no named authors, no verified reviews, no Google Business Profile integration, no social profiles, and About page statistics that are unverified marketing claims presented as facts. For a local service business competing in the 2026 Google environment, these are the signals that separate a page that ranks from one that does not.

### Top 10 Critical Issues

| # | Issue | Severity | Affected Pages |
|---|-------|----------|----------------|
| 1 | Homepage meta description is ~268 characters — will be cut at ~155 in Google | Critical | Homepage |
| 2 | 5 of 6 top-priority pages have meta descriptions over 160 chars | Critical | /about, /services, /locations, /contact, /blog |
| 3 | 6 placeholder blog posts are indexed, in sitemap, with BlogPosting schema — no noindex | Critical | 6 blog posts |
| 4 | 4 unreviewed legal pages live, indexed, in sitemap — no noindex | Critical | /terms, /privacy-policy, /disclaimer, /refund-policy |
| 5 | No Google Business Profile integration — no map embed, no GBP link, no `sameAs` in schema | High | Site-wide |
| 6 | Social links are all `href="#"` — ships broken icon row in footer | High | Site-wide |
| 7 | Blog posts have no author byline or named author — weak E-E-A-T for advice content | High | 6 blog posts |
| 8 | Service H1s on 4 pages exclude the primary keyword from the heading | High | 4 service pages |
| 9 | "Ridge Meadow" slug/name should be "Ridge Meadows" — incorrect place name hurts local search | High | /locations/ridge-meadow |
| 10 | About page statistics ("1K+ properties", "100% satisfaction") are unverified claims marked up as facts | Medium | /about |

---

## 2. Site-Wide Issues

### 2.1 Meta Description Length — Systematic Overrun

The six highest-priority pages all have meta descriptions far above Google's ~155-character display threshold. The homepage description is 268 characters — nearly double. These descriptions are not "wasted" (the copy is good), but they will be truncated mid-clause in every SERP result, which breaks the click signal.

**Affected pages and approximate lengths:**
- Homepage: ~268 chars  
- /about: ~194 chars  
- /services: ~211 chars  
- /locations: ~198 chars  
- /contact: ~213 chars  
- /blog: ~183 chars  

The 11 service detail pages and 9 location detail pages have well-controlled meta descriptions (most are 160–168 chars — borderline but acceptable). The legal pages are also reasonable.

**Fix:** Each of the six homepage-area pages needs a rewritten description of 140–155 characters that preserves the keyword and CTA while fitting the window.

---

### 2.2 Placeholder Content Indexed Without Protection

Three categories of content are live and indexed despite being explicitly flagged in the codebase as placeholder:

**Blog posts (6 pages):** Every post in `blogPosts` is labelled `PLACEHOLDER BLOG CONTENT` in the codebase and in `public/llms.txt`. The copy was written to build and test the template, not to represent RainCity's expertise or advice. Each post now has a URL, a publication date, and BlogPosting structured data — but the content is invented. A Google quality rater or a Helpful Content evaluation that finds invented advice with no named author and an org-as-author schema is a liability, not just a gap.

**Legal pages (4 pages):** The Terms, Privacy Policy, Disclaimer and Refund Policy are all labelled `PLACEHOLDER LEGAL TEXT` in the codebase. Specific commitments in these pages (24-hour cancellation window, 50% late-cancellation charge, net-30 invoicing, 7-day issue-reporting window) have never been confirmed by the client. An indexed refund policy that the office does not enforce is a business liability.

**Testimonials (on homepage and /services):** The testimonial carousel includes invented reviews. These are correctly not marked up as Review/AggregateRating schema, but they are public and a reader who cites them as real customer reviews has been misled.

**Fix:** Add `robots: { index: false }` to all blog post pages and all four legal pages immediately. Remove after the content is replaced/reviewed. The `noindex` control is noted in CLAUDE.md as the right answer here; it has not been applied.

---

### 2.3 E-E-A-T Signals — Systematic Gap

Google's Helpful Content system and AI engine answer selection both weight Experience, Expertise, Authoritativeness, and Trustworthiness. For a local exterior cleaning company, the primary trust signals are:

| Signal | Current Status |
|--------|---------------|
| Named author/expert on blog posts | Missing — Organisation as author only |
| Verified customer reviews | Missing — all placeholder |
| Google Business Profile link | Missing — no `sameAs` in schema, no GBP embed |
| Social media presence | Missing — all links are `#` |
| Business registration / licence number | Missing — not in schema or pages |
| Phone number in schema | Present ✓ |
| Email in schema | Present ✓ |
| Hours in schema | Present ✓ |
| Award claims | 2026 Canadian Choice Award in llms.txt — not in schema or About page body |

The award is a notable missed opportunity: it is mentioned in `llms.txt` but not on the About page, not in the Organization schema, and not in any JSON-LD. Adding it to the About page and schema would be an immediate, verifiable trust signal.

---

### 2.4 Google Business Profile — Not Integrated

There is no GBP embed, no GBP link, and `sameAs` is deliberately absent from the LocalBusiness schema while social links are `#`. This is correctly documented in the codebase. However, a GBP profile is the single highest-value local SEO asset a service business can hold, and its absence from the website means:

- No Reviews showing in the knowledge panel
- No Q&A surface
- No "Book" or "Request Quote" button from Maps
- No local pack eligibility signal reinforced by the website

GBP and social profile URLs should be the first things collected from the client, and both the schema and the footer icons should be filled before launch.

---

### 2.5 "Ridge Meadow" Spelling

The community "Ridge Meadow" is filed as `slug: "ridge-meadow"` and displayed as "Ridge Meadow" throughout. The correct and commonly searched name is **Ridge Meadows** (referring to Maple Ridge and Pitt Meadows). This affects:
- The URL `/locations/ridge-meadow`
- The title tag: "Property Maintenance in Ridge Meadow, BC | RainCity Property Maintenance"
- The meta description
- All nine instances of the name in navigation and content

A searcher typing "property maintenance ridge meadows BC" will not find this page as readily as they would if the slug and name matched. The codebase notes this was carried from the client's own site and suggests raising it with them. It should be corrected before launch.

---

### 2.6 Social Links Are Dead (`href="#"`)

All four footer social icons (Facebook, Instagram, X, LinkedIn) link to `#`. This ships a footer with four icons that go nowhere, which:
- Reads as a broken site to any visitor who clicks them
- Provides no `sameAs` signals to Google's Knowledge Graph
- Prevents AI engines from linking the business entity to its social profiles

This is documented in the codebase as a known gap. It must be resolved before launch — either with real profile URLs or by removing the icons for networks RainCity does not use.

---

### 2.7 Schema Architecture — Generally Strong, Minor Gaps

The schema architecture is sophisticated and deliberately constructed. Key strengths:
- Stable `@id` for Organization and Business nodes — consistent across all pages
- `areaServed` is a shared constant — cannot drift between pages
- FAQPage on all 11 service pages and all 9 location pages
- BreadcrumbList on all secondary pages
- `ProfessionalService` (not bare `LocalBusiness`) on homepage
- No fabricated `aggregateRating` (correctly omitted while reviews are placeholder)

Minor gaps:
- No `logo` property in the `ProfessionalService` node on the homepage (it is on `Organization` but not on `ProfessionalService`)
- Blog `dateModified` equals `datePublished` — this is honest (nothing tracks revisions) but Google may deprioritise content that never signals an update
- No `priceRange` or `currenciesAccepted` in the business schema (not critical for a quote-based business)

---

### 2.8 Sitemap Coverage

The sitemap covers 36 of the 37 public routes. `/blog/page/2` is deliberately omitted — this is correct (pagination pages should not be in the sitemap when they have a canonical entry point at `/blog`). All other pages are present.

`lastModified` dates are realistic rather than set to today's build date on every deploy — this is a quality signal and should be maintained.

---

### 2.9 Internal Linking

The site has strong internal linking via the navigation (services dropdown, locations dropdown), breadcrumbs on every secondary page, and the "Nearby Areas" section on location pages. Service pages do not link to related location pages, and location pages do not link to individual service detail pages — they link to `/services` (the catalogue) rather than directly to `window-cleaning` or `roof-cleaning`. 

Adding contextual cross-links (e.g., the Burnaby strata FAQ answer linking to `/services/commercial-cleaning`) would strengthen topical authority and improve crawl depth.

---

## 3. Page-by-Page Detailed Audit

---

## / (Homepage)

- **Current Title Tag:** `Property Maintenance & Exterior Cleaning in Greater Vancouver | RainCity`
- **Current Meta Description:** "RainCity Property Maintenance provides year-round pressure washing, window and gutter cleaning, roof and driveway care, snow removal and landscaping for homes, stratas and businesses in New Westminster and across Greater Vancouver. Call +1 604 209 3357 for a free quote." (~268 chars — **truncated in SERP**)
- **Target Keyword:** `property maintenance Greater Vancouver` / `exterior cleaning New Westminster`
- **Issues Found:**
  - **Critical** — Meta description is 268 characters; Google truncates at ~155. The phone number call-to-action at the end is invisible to most searchers.
  - **High** — No H1 verified from code (component-level, not from this audit's source data); ensure the homepage hero has exactly one H1 and it contains the primary keyword.
  - **Medium** — Testimonials section carries invented reviews. Not schema-marked, but visible to quality evaluators.
  - **Medium** — The "5+ years", "1,000+ properties serviced" and "100% satisfaction" stats (from About component rendered on homepage) are unverified marketing claims.
  - **Low** — Title is 72 characters. Acceptable but could be tightened to give more keyword room.
  - **Low** — No `sameAs` on LocalBusiness schema — correct for now, but blocks Knowledge Panel completeness.
- **Recommendations:**
  1. Rewrite meta description to 140–155 characters. Lead with the primary geographic + service term, close with a strong CTA. Move the phone number to a visible page element rather than the description.
  2. Audit the Hero component to confirm there is exactly one H1 tag on the page and it contains "Greater Vancouver" + service term.
  3. Replace placeholder testimonials before launch, then add `aggregateRating` to the LocalBusiness schema.
  4. Add the 2026 Canadian Choice Award to the page body and to the Organization schema's `award` property.
  5. When social profiles are collected, add them to `sameAs` in `localBusinessSchema`.
- **Suggested Title Tag:** `Property Maintenance & Exterior Cleaning in Greater Vancouver | RainCity`  *(keep — it's good)*
- **Suggested Meta Description:** `Year-round exterior cleaning for homes, stratas and businesses in New Westminster and Greater Vancouver. Pressure washing, windows, gutters, roofs and more. Free quotes.` (~175 chars — still slightly long; trim to 155)  
  Final target: `Year-round exterior cleaning for homes, stratas and businesses across Greater Vancouver. Pressure washing, gutters, roofs, windows and more — free quote.` (155 chars)
- **Schema Recommendations:** Add `award` to Organization schema once GBP is connected and the award is verified. Add `sameAs` array when social profiles are confirmed.
- **Local SEO Notes:** This is the primary local landing page. Without a GBP link and verified reviews, local pack placement is weaker than it could be.
- **AI Engine Optimization Notes:** The FAQ on service pages is the primary AI citation surface; the homepage itself has no FAQ structure. Consider adding a 3–4 item FAQ block to the homepage covering "what is RainCity", "where do you serve" and "how does a free quote work" — these are the queries AI systems answer from a business homepage.

---

## /about

- **Current Title Tag:** `About RainCity | Property Maintenance in New Westminster, BC`
- **Current Meta Description:** "RainCity Property Maintenance is a mobile property maintenance and exterior cleaning company based in New Westminster, BC. Meet the team, read our mission, and see the three-step process behind every job across Greater Vancouver." (~194 chars — **truncated in SERP**)
- **Target Keyword:** `property maintenance company New Westminster` / `exterior cleaning company Greater Vancouver`
- **Issues Found:**
  - **Critical** — Meta description is 194 characters; will be cut at ~155.
  - **Medium** — Stats section ("5+ years", "1K+ properties serviced", "100% satisfaction") presents unverified claims as factual figures. These could attract a Google quality or accuracy evaluation.
  - **Medium** — The 2026 Canadian Choice Award is mentioned in `llms.txt` but not visible on the About page. This is a missed authority signal.
  - **Medium** — `aboutPageSchema` correctly omits the stats (good) but also omits the award.
  - **Low** — No FAQ on this page; the process section (3 steps) is informational but not structured as Q&A.
- **Recommendations:**
  1. Rewrite meta description to 140–155 characters. Focus on the company's location, track record and differentiators.
  2. Add the award to the About page body as a verifiable claim with a date and source.
  3. Either add a disclaimer to the stats ("as of [year]") or replace them with verifiable figures before launch.
  4. Add `award` to the `Organization` schema node in `lib/seo.tsx`.
- **Suggested Title Tag:** `About RainCity | Property Maintenance in New Westminster, BC` *(keep)*
- **Suggested Meta Description:** `RainCity is a mobile property maintenance and exterior cleaning company based in New Westminster, BC — licensed, insured and working across Greater Vancouver. Meet the team.` (172 chars — trim slightly)
- **Schema Recommendations:** Add `award` property to Organization schema. Consider adding `foundingDate` if known.
- **Local SEO Notes:** About page is a key E-E-A-T signal for local searches. The three-step process is good credibility content; the unverified stats undercut it.
- **AI Engine Optimization Notes:** AI systems that answer "who is RainCity" will pull from this page. Ensure the mission and service area are in the first two paragraphs, clearly stated.

---

## /services

- **Current Title Tag:** `Our Services | Exterior Cleaning & Property Maintenance in Greater Vancouver`
- **Current Meta Description:** "Pressure and soft washing, window, gutter and roof cleaning, concrete and asphalt sealing, painting, snow removal, holiday lights and landscaping — the full range of RainCity Property Maintenance services for homes, stratas and businesses across Greater Vancouver." (~211 chars — **truncated in SERP**)
- **Target Keyword:** `exterior cleaning services Greater Vancouver` / `property maintenance services New Westminster`
- **Issues Found:**
  - **Critical** — Meta description is 211 characters; truncated in SERP.
  - **High** — Title starts with "Our Services" — a weak, non-keyword prefix. The valuable real estate in a title tag is the first 30–40 characters.
  - **Medium** — The CollectionPage schema correctly lists all 11 services with URLs, but the `name` field on the schema (`"Services | RainCity Property Maintenance"`) doesn't match the actual title tag.
  - **Low** — No FAQ section on this page; a "What services do you offer?" FAQ block would add AEO value.
- **Recommendations:**
  1. Rewrite title to lead with the service category: `Exterior Cleaning & Property Maintenance Services in Greater Vancouver | RainCity`
  2. Rewrite meta description to 140–155 characters. Lead with the service range, close with the geography.
  3. Update `name` in `servicesPageSchema` to match the new title for consistency.
- **Suggested Title Tag:** `Exterior Cleaning & Property Maintenance Services in Greater Vancouver | RainCity` (79 chars — slightly long; trim to `Exterior Cleaning & Property Maintenance | Greater Vancouver | RainCity`)
- **Suggested Meta Description:** `The full RainCity catalogue: pressure washing, soft washing, window and gutter cleaning, roof care, sealing, painting, snow removal and landscaping across Greater Vancouver.` (172 chars — trim to 155)
- **Schema Recommendations:** Ensure `servicesPageSchema.name` stays in sync with the published title tag.
- **Local SEO Notes:** This is the primary commercial landing page for service-category searches. Its title tag and meta description are the first conversion touchpoints.
- **AI Engine Optimization Notes:** The services list on this page is well-structured for AI extraction. Consider adding a visible introductory paragraph that names all 11 services explicitly.

---

## /services/commercial-cleaning

- **Current Title Tag:** `Commercial Cleaning | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Commercial cleaning in New Westminster and across Greater Vancouver. Offices, retail and strata common areas cleaned to a written scope, on the cycle your building needs." (168 chars — borderline, may truncate)
- **Target Keyword:** `commercial cleaning Greater Vancouver` / `commercial cleaning New Westminster`
- **Issues Found:**
  - **Medium** — Meta description is 168 chars — at the boundary. Aim for 155.
  - **Medium** — H1 is "Commercial Cleaning on Your Building's Schedule" — keyword is present, good.
  - **Low** — FAQ schema is published and all 6 questions are strong. Google no longer shows FAQ accordions for cleaning companies in the SERP (noted in codebase), but FAQPage is still machine-readable for AI engines.
  - **Low** — No breadcrumb displayed to the user in the Hero (schema breadcrumb exists in JSON-LD; confirm the visual trail is also rendered).
- **Recommendations:**
  1. Trim meta description to ~150 chars: "Commercial cleaning in New Westminster and Greater Vancouver. Offices, retail and strata common areas, on a written scope and cycle your building actually needs."
  2. Verify H1 is rendered as a single H1 tag (not in a Hero component that uses a heading class on a `<div>`).
  3. Add a contextual link from the FAQ answer about strata documentation to `/locations/burnaby` or `/locations/new-westminster` for cross-linking authority.
- **Suggested Title Tag:** `Commercial Cleaning | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Commercial cleaning in New Westminster and Greater Vancouver — offices, retail and strata common areas on a written scope and the cycle your building needs. Free quotes." (165 chars — trim 10 more)
- **Schema Recommendations:** FAQPage is correctly implemented. Verify the FAQ `about` field points to the Service `@id`.
- **Local SEO Notes:** The service page's `areaServed` covers the whole region. Consider adding a contextual sentence mentioning strata work in Burnaby and office cleaning in Vancouver to capture those modifier terms.
- **AI Engine Optimization Notes:** FAQs cover the key pre-booking questions. The answer to "How is a commercial cleaning contract priced?" is an excellent extractable answer for AI overviews.

---

## /services/power-washing

- **Current Title Tag:** `Power Washing | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Pressure washing across Greater Vancouver for driveways, patios, siding and parkades. Pressure and tip matched to the surface, tested first, finished even edge to edge." (167 chars — borderline)
- **Target Keyword:** `power washing Greater Vancouver` / `pressure washing Vancouver`
- **Issues Found:**
  - **Medium** — Title uses "Power Washing" but meta description uses "Pressure washing" — inconsistent keyword signal.
  - **Medium** — H1 is "Power Washing That Takes the Winter Off" — keyword is present, good.
  - **Medium** — Meta description uses "Pressure washing" in the first word, but the service slug is `power-washing`. Both terms are used by consumers; consider which has higher search volume in the Vancouver market.
  - **Low** — Meta description is 167 chars — trim to 155.
- **Recommendations:**
  1. Decide on "power washing" vs "pressure washing" as the primary term and make title, H1, description and URL consistent. In Greater Vancouver, "pressure washing" is marginally more common in search. If keeping "power washing" in the URL (for consistency with existing links), at minimum ensure the meta description leads with "power washing" to match the title.
  2. Trim meta to: "Power washing across Greater Vancouver for driveways, patios, siding and parkades — pressure set to the surface, tested before we start, finished edge to edge." (159 chars)
- **Suggested Title Tag:** `Power Washing | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Power washing across Greater Vancouver — driveways, siding, patios and parkades. Pressure set to what the surface can take, tested first, finished even edge to edge." (165 chars)
- **Schema Recommendations:** FAQPage is correctly implemented with strong answers.
- **Local SEO Notes:** The "How often does a driveway need washing here?" FAQ is an excellent local-intent answer. It could also be a featured snippet candidate.
- **AI Engine Optimization Notes:** The Q&A on "power washing vs soft washing" is citation-ready. The answer is concise, accurate, and directly answers a high-frequency comparison query.

---

## /services/soft-washing

- **Current Title Tag:** `Soft Washing | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Soft washing across Greater Vancouver for roofs, stucco, painted siding and cedar. Low pressure only, with moss and algae killed at the root instead of blasted off." (163 chars — trim slightly)
- **Target Keyword:** `soft washing Greater Vancouver` / `soft washing roofs Vancouver`
- **Issues Found:**
  - **Medium** — H1 "Soft Washing for Surfaces That Can't Take Pressure" — keyword present, good.
  - **Low** — Meta description 163 chars — minor trim needed.
  - **Low** — "What actually is soft washing?" FAQ is an excellent definitional answer for AI systems.
- **Recommendations:**
  1. Trim meta to: "Soft washing across Greater Vancouver for roofs, stucco, painted siding and cedar. Low pressure, with moss and algae killed at the root — not blasted off." (153 chars)
- **Suggested Title Tag:** `Soft Washing | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Soft washing across Greater Vancouver for roofs, stucco, painted siding and cedar. Low pressure only — moss and algae killed at the root, not blasted off." (153 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "How long does a soft wash last?" is a strong structured-data answer.
- **Local SEO Notes:** North-facing walls and cedar siding are specifically Greater Vancouver concerns. The local climate context in the overview and FAQs strengthens local relevance.
- **AI Engine Optimization Notes:** The definitional FAQ ("What actually is soft washing?") is ideal for AI engine extraction. It is concise, accurate, and answers a high-frequency query.

---

## /services/concrete-and-asphalt-sealing

- **Current Title Tag:** `Concrete and Asphalt Sealing | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Concrete and asphalt sealing across Greater Vancouver. Cracks routed and filled, oil degreased, the slab dried and metered, then sealed against water, salt and frost." (166 chars — trim slightly)
- **Target Keyword:** `concrete and asphalt sealing Greater Vancouver` / `driveway sealing Vancouver BC`
- **Issues Found:**
  - **High** — H1 is "Sealing That Buys a Driveway Years" — **does not contain the primary keyword** ("concrete", "asphalt", or "sealing" as a standalone service term). A searcher comparing this result in a SERP cannot confirm from the heading that this page is about what they searched for.
  - **Medium** — Meta description is 166 chars — borderline.
  - **Low** — The keyword "driveway sealing" appears in content but not in the title or H1.
- **Recommendations:**
  1. **Change H1** to include the service keyword. Suggested: "Concrete and Asphalt Sealing That Buys Your Driveway Years" — preserves the voice, adds the keyword.
  2. Trim meta to 155 chars.
- **Suggested Title Tag:** `Concrete and Asphalt Sealing | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Concrete and asphalt sealing across Greater Vancouver. Cracks routed and filled, surface degreased and dried, then sealed against water, salt and frost." (151 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "How often should a driveway be resealed?" is citation-ready.
- **Local SEO Notes:** "Sealing before the first frost" and "Greater Vancouver climate" mentions are strong local signals. The Langley location page is the best cross-link target (longer sealing windows).
- **AI Engine Optimization Notes:** The FAQ on crack repair vs. coverage is a strong answer for "does driveway sealant fix cracks?" queries.

---

## /services/window-cleaning

- **Current Title Tag:** `Window Cleaning | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Streak-free interior and exterior window cleaning across Greater Vancouver — glass, frames, sills, tracks and screens, on homes, storefronts and multi-storey buildings." (166 chars — borderline)
- **Target Keyword:** `window cleaning Greater Vancouver` / `window cleaning New Westminster`
- **Issues Found:**
  - **High** — H1 is "Windows Worth Looking Through" — **does not contain the keyword "window cleaning"**. Someone landing from a "window cleaning" search needs keyword confirmation in the H1.
  - **Medium** — Meta description is 166 chars — trim slightly.
  - **Low** — This is the most photography-complete service page (real client photos). An explicit mention of "our own photographs" or client-supplied context would reinforce E-E-A-T.
- **Recommendations:**
  1. **Change H1** to include the keyword. Suggested: "Window Cleaning Worth Looking Through" — adds the keyword, retains the voice.
  2. Trim meta to 155 chars: "Streak-free window cleaning across Greater Vancouver — glass, frames, sills, tracks and screens on homes, storefronts and multi-storey buildings."
- **Suggested Title Tag:** `Window Cleaning | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Streak-free interior and exterior window cleaning across Greater Vancouver — glass, frames, sills, tracks and screens on homes, storefronts and multi-storey buildings." (165 chars — trim 10)
- **Schema Recommendations:** FAQPage correctly implemented with strong practical answers.
- **Local SEO Notes:** The FAQ on "How often in Greater Vancouver?" is a strong local-intent signal. The five-storey water-fed pole limit is a factual claim that should be consistent with any GBP listing.
- **AI Engine Optimization Notes:** "What happens if it rains right after you clean?" — this is a high-frequency anxiety question with a strong, extractable answer here.

---

## /services/gutter-cleaning

- **Current Title Tag:** `Gutter Cleaning | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Gutter cleaning across Greater Vancouver — every run cleared by hand, debris bagged and removed, downspouts flushed and augered, then flow-tested before we leave." (163 chars — trim slightly)
- **Target Keyword:** `gutter cleaning Greater Vancouver` / `gutter cleaning New Westminster`
- **Issues Found:**
  - **Medium** — H1 "Gutter Cleaning Before the Rain Finds a Way In" — keyword present, well-formed.
  - **Low** — Meta description 163 chars — minor trim.
  - **Low** — "Do you repair gutters as well as clean them?" FAQ answer is clear about scope boundaries — good.
- **Recommendations:**
  1. Trim meta: "Gutter cleaning across Greater Vancouver — every run cleared by hand, debris taken away, downspouts flushed and augered, flow-tested before we leave." (149 chars)
- **Suggested Title Tag:** `Gutter Cleaning | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Gutter cleaning across Greater Vancouver — every run cleared by hand, debris taken away, downspouts flushed and augered, then flow-tested before we leave." (153 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "How often do gutters need clearing in Greater Vancouver?" is an ideal local FAQ answer.
- **Local SEO Notes:** The "twice a year for most properties here" answer with seasonal timing is a strong local expertise signal.
- **AI Engine Optimization Notes:** The flow-test distinction is a clear differentiator — AI engines recommending gutter services may cite the specific process.

---

## /services/roof-cleaning

- **Current Title Tag:** `Roof Cleaning | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Roof moss removal across Greater Vancouver. Shingle, tile and metal roofs treated at low pressure — no lance, no lost granules — with valleys and gutters cleared after." (166 chars — borderline)
- **Target Keyword:** `roof cleaning Greater Vancouver` / `roof moss removal Vancouver`
- **Issues Found:**
  - **Medium** — H1 "Roof Cleaning That Doesn't Cost You Shingles" — keyword present, good.
  - **Medium** — Meta description says "Roof moss removal" in position 1 but the page title says "Roof Cleaning" — minor inconsistency.
  - **Low** — Meta description 166 chars — trim slightly.
- **Recommendations:**
  1. Align meta description opener with title: "Roof cleaning across Greater Vancouver — shingle, tile and metal roofs treated at low pressure, no lance, no lost granules. Valleys and gutters cleared after."
- **Suggested Title Tag:** `Roof Cleaning | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Roof cleaning across Greater Vancouver — shingle, tile and metal roofs treated at low pressure. No lance, no lost granules, valleys and gutters cleared after." (157 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "Why not just pressure wash it?" is citation-ready for the "roof cleaning vs pressure washing" comparison query.
- **Local SEO Notes:** The "3-5 years" regrowth estimate for Greater Vancouver roofs is a specific, useful local fact. The coastal climate framing throughout is strong local SEO content.
- **AI Engine Optimization Notes:** "Will cleaning damage my shingles?" is the primary anxiety question for this service. The answer is precise, referenced to the mechanism (granule loss), and citation-ready.

---

## /services/painting

- **Current Title Tag:** `Painting | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Interior and exterior painting across Greater Vancouver. Surfaces washed, scraped, filled, caulked and primed before the finish coats, so the work holds on a wet coast." (166 chars — borderline)
- **Target Keyword:** `painting Greater Vancouver` / `interior exterior painting New Westminster`
- **Issues Found:**
  - **Medium** — H1 "Painting, Prepped Properly First" — keyword present, though "Painting" alone is a very broad keyword. Could be "Interior and Exterior Painting, Prepped Properly First".
  - **Low** — Meta description 166 chars — minor trim.
  - **Low** — "what time of year can you paint outside here?" FAQ is a strong local-intent answer.
- **Recommendations:**
  1. Consider expanding H1 to "Painting — Interior and Exterior, Prepped Properly First" to capture the modifier terms.
  2. Trim meta to 155 chars.
- **Suggested Title Tag:** `Painting | RainCity Property Maintenance, Greater Vancouver` *(keep or expand to "Interior & Exterior Painting | ...")*
- **Suggested Meta Description:** "Interior and exterior painting across Greater Vancouver. Surfaces washed, scraped, filled, caulked and primed before the finish coats — work that holds on a wet coast." (166 chars — trim 11)
- **Schema Recommendations:** FAQPage correctly implemented.
- **Local SEO Notes:** "On this coast a coating fails from underneath" is a strong localised authority statement.
- **AI Engine Optimization Notes:** "How long does an exterior repaint last in this climate?" is a high-value FAQ for a location-specific answer.

---

## /services/snow-removal-salting

- **Current Title Tag:** `Snow Removal & Salting | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Snow removal and salting across Greater Vancouver. Driveways, walkways, strata lots and commercial entrances cleared at trigger depth, salted, and logged for your insurer." (170 chars — **too long**)
- **Target Keyword:** `snow removal Greater Vancouver` / `snow removal New Westminster BC`
- **Issues Found:**
  - **High** — H1 is "Snow Cleared Before the First Arrival" — **does not contain the keyword "snow removal"**. The service slug and title use "Snow Removal & Salting" but the H1 drops both terms.
  - **High** — Meta description is 170 chars — clearly over the limit.
- **Recommendations:**
  1. **Change H1** to include the keyword: "Snow Removal and Salting — Cleared Before the First Arrival" or "Snow Removal Finished Before the First Car Turns In".
  2. Rewrite meta to 155 chars: "Snow removal and salting across Greater Vancouver — driveways, walkways, strata lots and commercial entrances cleared at trigger depth and logged."
- **Suggested Title Tag:** `Snow Removal & Salting | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Snow removal and salting across Greater Vancouver — driveways, strata lots and commercial entrances cleared at trigger depth, salted and logged for your insurer." (160 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "When do I need to book snow service?" is a high-value seasonal FAQ.
- **Local SEO Notes:** Greater Vancouver snow is a rare event but high-anxiety search moment. The "before the season, not during it" answer and "two centimetre trigger depth" are excellent local specifics.
- **AI Engine Optimization Notes:** "What is a trigger depth, and who sets it?" is a unique, citation-ready answer that no generic snow removal page provides.

---

## /services/holiday-light-installation

- **Current Title Tag:** `Holiday Light Installation | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Holiday light installation across Greater Vancouver. Rooflines, porches and trees measured, clipped and powered safely, serviced all season and taken down in January." (165 chars — borderline)
- **Target Keyword:** `holiday light installation Greater Vancouver` / `Christmas light installation Vancouver`
- **Issues Found:**
  - **Medium** — H1 "Holiday Lights, Without the Ladder" — keyword present ("Holiday Lights"), though "Holiday Light Installation" (the fuller keyword) is absent.
  - **Low** — Meta description 165 chars — minor trim needed.
  - **Low** — The URL uses "holiday-light-installation" which is correct for broad-term targeting. "Christmas light installation" is a higher-search-volume term in November–December but is seasonal and limits year-round relevance.
- **Recommendations:**
  1. Consider expanding H1 to "Holiday Light Installation, Without the Ladder" to include the fuller keyword.
  2. Trim meta to 155 chars.
- **Suggested Title Tag:** `Holiday Light Installation | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Holiday light installation across Greater Vancouver — rooflines, porches and trees measured, clipped and powered safely, serviced all season, taken down in January." (162 chars — trim 7)
- **Schema Recommendations:** FAQPage correctly implemented. "When should I book, and when do you install?" is citation-ready.
- **Local SEO Notes:** "Book from September" is a strong local seasonal signal — coastal windstorm mention grounds the service in geography.
- **AI Engine Optimization Notes:** "How are the lights attached — will it damage my roof or gutters?" addresses a specific anxiety; the answer is precise and extractable.

---

## /services/landscaping-lawn-care

- **Current Title Tag:** `Landscaping & Lawn Care | RainCity Property Maintenance, Greater Vancouver`
- **Current Meta Description:** "Landscaping and lawn care across Greater Vancouver — mowing at the right height, bed edging, pruning in season, and cleanups for homes, strata grounds and frontages." (164 chars — borderline)
- **Target Keyword:** `landscaping Greater Vancouver` / `lawn care New Westminster BC`
- **Issues Found:**
  - **High** — H1 is "Grounds That Stay Looked After" — **does not contain the keywords "landscaping" or "lawn care"**. A searcher landing from "lawn care Greater Vancouver" cannot confirm the page relevance from the heading.
  - **Low** — Meta description 164 chars — trim.
- **Recommendations:**
  1. **Change H1** to include the keyword: "Landscaping and Lawn Care — Grounds That Stay Looked After" or "Landscaping & Lawn Care on a Reliable Schedule".
  2. Trim meta to 155 chars.
- **Suggested Title Tag:** `Landscaping & Lawn Care | RainCity Property Maintenance, Greater Vancouver` *(keep)*
- **Suggested Meta Description:** "Landscaping and lawn care across Greater Vancouver — mowing, bed edging, pruning in season and seasonal cleanups for homes, strata grounds and frontages." (152 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "How often should the lawn be cut in Greater Vancouver?" is a strong local-intent answer.
- **Local SEO Notes:** "Weekly from April to about the end of June" with the monthly winter rhythm is a strong Greater Vancouver-specific schedule.
- **AI Engine Optimization Notes:** The moss-in-lawn FAQ is particularly useful — it correctly identifies moss as a symptom, not a disease, which is the kind of expert differentiation AI engines surface.

---

## /locations

- **Current Title Tag:** `Service Areas | Property Maintenance Across Greater Vancouver`
- **Current Meta Description:** "RainCity Property Maintenance is mobile, based in New Westminster and working in 9 communities across Greater Vancouver — Anmore, Burnaby, Delta, Langley, New Westminster, Ridge Meadow, Surrey, Tri-Cities, Vancouver. Find yours and get a free quote." (~198 chars — **truncated in SERP**)
- **Target Keyword:** `property maintenance Greater Vancouver` / `exterior cleaning service area Vancouver`
- **Issues Found:**
  - **Critical** — Meta description is ~198 characters; truncated in SERP, likely mid-list.
  - **Medium** — "Ridge Meadow" in the meta description and throughout — should be "Ridge Meadows".
  - **Medium** — Title "Service Areas" is a generic label. Consider leading with the value term.
  - **Low** — The locationsPageSchema `itemListOrder` is set to "ItemListUnordered" but the page description says "alphabetical" — minor schema/reality mismatch (alphabetical is a sequence, but the schema avoids asserting a ranking, which is correct).
- **Recommendations:**
  1. Rewrite meta description to 140–155 chars, listing the communities or leading with the geographic claim.
  2. Correct "Ridge Meadow" to "Ridge Meadows" throughout.
  3. Consider retitling to "Greater Vancouver Service Areas | Property Maintenance | RainCity".
- **Suggested Title Tag:** `Greater Vancouver Service Areas | Property Maintenance | RainCity` (64 chars)
- **Suggested Meta Description:** "RainCity is mobile — based in New Westminster and serving 9 communities across Greater Vancouver, including Burnaby, Surrey, Langley, Vancouver and more. Free quotes." (163 chars — trim 8)
- **Schema Recommendations:** The `locationsPageSchema` is well-constructed. Consider adding `serviceArea` to the CollectionPage node.
- **Local SEO Notes:** This is the hub page for local search. Each community link is the primary discovery path for city-specific queries. Ensure the community card copy is visible to crawlers (not JS-hidden).
- **AI Engine Optimization Notes:** The coverage map section is a strong structured signal of service area. AI systems looking for "does RainCity serve [city]" will find the answer here.

---

## /locations/anmore

- **Current Title Tag:** `Property Maintenance in Anmore, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Anmore, BC — gutters, roofs, windows and driveways on the village's treed acreage lots. Free written quotes from RainCity, based in New Westminster." (192 chars — **too long**)
- **Target Keyword:** `property maintenance Anmore BC` / `exterior cleaning Anmore BC`
- **Issues Found:**
  - **High** — Meta description is 192 characters — truncated in SERP.
  - **Medium** — H1 is "Working On Anmore's Acreages" — does not include "property maintenance" or "Anmore" as a standalone place-name claim at the start. This is a creative heading but reduces keyword confirmation.
  - **Medium** — "Ridge Meadow" in the nearby links should be "Ridge Meadows".
  - **Low** — The photo used for Anmore is `gutterCleaning` — a generic gutter photo, not Anmore-specific. Alt text correctly describes the frame rather than claiming it was taken in Anmore.
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in Anmore, BC — gutters, roofs, windows and driveways on the village's treed acreage lots. Free written quotes from RainCity."
  2. Consider H1: "Property Maintenance in Anmore: Working On the Acreages"
- **Suggested Title Tag:** `Property Maintenance in Anmore, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in Anmore, BC — gutters, roofs, windows and driveways on the village's treed acreage lots. Free written quotes from RainCity." (146 chars)
- **Schema Recommendations:** The Service schema with `areaServed` narrowed to Anmore is the correct approach. FAQPage is correctly implemented.
- **Local SEO Notes:** "Conifer needles all year, not a six-week leaf drop" — this is genuinely Anmore-specific local content. Strong doorway-page avoidance.
- **AI Engine Optimization Notes:** "Will you come out to Anmore for a single job?" is a high-intent FAQ that directly converts searchers wondering about service availability.

---

## /locations/burnaby

- **Current Title Tag:** `Property Maintenance in Burnaby, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Burnaby, BC — strata common areas, parkades, high glass and single-family homes across Metrotown, Brentwood, Lougheed and the Heights. Free written quotes from RainCity." (213 chars — **too long**)
- **Target Keyword:** `property maintenance Burnaby BC` / `strata cleaning Burnaby`
- **Issues Found:**
  - **High** — Meta description is 213 characters — severely truncated.
  - **Medium** — H1 "One City, Four Town Centres" — does not include "Burnaby" or "property maintenance". Evocative but loses keyword signal.
  - **Low** — Photo used: `windowCleaning` — generic; appropriate until real community photos are available.
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in Burnaby, BC — strata common areas, parkades, mid-rise glass and single-family homes across Metrotown, Brentwood, Lougheed and the Heights."
  2. Consider H1: "Property Maintenance in Burnaby: One City, Four Town Centres"
- **Suggested Title Tag:** `Property Maintenance in Burnaby, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in Burnaby — strata common areas, parkades, high glass and single-family homes across Metrotown, Brentwood, Lougheed and the Heights. Free quotes." (164 chars — trim 9)
- **Schema Recommendations:** FAQPage correctly implemented. "Do you wash parkades and common-area hard surfaces?" is a high-value commercial intent FAQ.
- **Local SEO Notes:** Metrotown, Brentwood, Lougheed and the Heights are named — this is strong local geo-targeting. Burnaby Mountain weather distinction adds local depth.
- **AI Engine Optimization Notes:** "Can you reach the glass on a low-rise or mid-rise building?" answers a key commercial strata query precisely.

---

## /locations/delta

- **Current Title Tag:** `Property Maintenance in Delta, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Delta, BC — Ladner, Tsawwassen and North Delta. Salt-film window cleaning, siding soft-washing, exterior painting and driveway work. Free written quotes from RainCity." (211 chars — **too long**)
- **Target Keyword:** `property maintenance Delta BC` / `exterior cleaning Tsawwassen`
- **Issues Found:**
  - **High** — Meta description is 211 characters — severely truncated.
  - **Medium** — H1 "Three Communities, One Exposure" — does not include "Delta" or "property maintenance".
  - **Low** — Photo used: `painting` — thematic but generic.
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in Delta, BC — Ladner, Tsawwassen and North Delta. Salt-film cleaning, siding washing, painting and driveway work. Free written quotes."
  2. Consider H1: "Property Maintenance in Delta: Three Communities, One Exposure"
- **Suggested Title Tag:** `Property Maintenance in Delta, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in Delta, BC — Ladner, Tsawwassen and North Delta. Salt-film cleaning, siding washing, painting and driveway work. Free written quotes." (155 chars)
- **Schema Recommendations:** FAQPage correctly implemented. "Is Delta far enough out to cost more?" directly addresses a searcher concern and is citation-ready.
- **Local SEO Notes:** "Salt film on glass and on painted siding" is a Delta-specific observation that is checkable and unique. Marine air context differentiates this from template content.
- **AI Engine Optimization Notes:** "Does being near the water change how often things need doing?" is a strong AEO answer for marine/coastal property queries.

---

## /locations/langley

- **Current Title Tag:** `Property Maintenance in Langley, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Langley, BC — driveway and lot sealing, pressure washing, gutters and roofs across Willoughby, Walnut Grove, Fort Langley, Brookswood and Aldergrove. Free quotes from RainCity." (220 chars — **too long**)
- **Target Keyword:** `property maintenance Langley BC` / `driveway sealing Langley`
- **Issues Found:**
  - **High** — Meta description is 220 characters — severely truncated.
  - **Medium** — H1 "Acreages, Subdivisions And A Longer Dry Window" — creative and specific, but omits "Langley" and "property maintenance".
  - **Low** — Photo used: `concreteAsphaltSealing` — thematic match (Langley leads with sealing content).
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in Langley, BC — sealing, power washing, gutters and roofs across Willoughby, Walnut Grove, Fort Langley, Brookswood and Aldergrove."
  2. Consider H1: "Property Maintenance in Langley: Acreages, Subdivisions and a Longer Dry Window"
- **Suggested Title Tag:** `Property Maintenance in Langley, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in Langley, BC — sealing, power washing, gutters and roofs across Willoughby, Walnut Grove, Fort Langley, Brookswood and Aldergrove. Free quotes." (163 chars — trim 8)
- **Schema Recommendations:** FAQPage correctly implemented. "Do you do snow clearing and salting in Langley?" is a high-value seasonal FAQ.
- **Local SEO Notes:** Naming six specific Langley communities is strong local geo-targeting. The inland climate distinction is a genuine and verifiable differentiator.
- **AI Engine Optimization Notes:** "When is the right time to seal a driveway out here?" is a strong local-intent answer that AI systems may prefer over generic sealing advice.

---

## /locations/new-westminster

- **Current Title Tag:** `Property Maintenance in New Westminster, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in New Westminster, BC — RainCity's home city. Heritage window and gutter work on the hill, strata care Uptown, at the Quay and in Queensborough. Free written quotes." (208 chars — **too long**)
- **Target Keyword:** `property maintenance New Westminster BC` / `exterior cleaning New Westminster`
- **Issues Found:**
  - **High** — Meta description is 208 characters — severely truncated.
  - **Medium** — H1 "The City The Truck Loads In" — evocative but omits "New Westminster" and "property maintenance".
  - **Low** — Photo: `aboutCrew` — the home city page appropriately uses the most personal photograph.
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in New Westminster, BC — RainCity's home city. Heritage windows and gutters on the hill, strata care at the Quay and in Queensborough."
  2. Consider H1: "Property Maintenance in New Westminster: The City the Truck Loads In"
- **Suggested Title Tag:** `Property Maintenance in New Westminster, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in New Westminster, BC — RainCity's home city. Heritage windows, gutters and strata care across Queen's Park, the Quay, Sapperton and Queensborough." (167 chars — trim 12)
- **Schema Recommendations:** FAQPage correctly implemented. "Can you clean original heritage windows without damaging them?" is a highly specific and citation-ready local FAQ.
- **Local SEO Notes:** This is the highest-value local page — the base city. "Queen's Park, Glenbrooke, Brow of the Hill, Uptown, the Quay, Sapperton, Queensborough" naming is strong hyperlocal content.
- **AI Engine Optimization Notes:** The heritage/boxed gutter FAQs are uniquely local — no generic window-cleaning page contains this content.

---

## /locations/ridge-meadow

- **Current Title Tag:** `Property Maintenance in Ridge Meadow, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Maple Ridge and Pitt Meadows, BC — roof moss treatment, soft washing and gutter clearing at the wettest end of the valley. Free written quotes from RainCity." (202 chars — **too long**)
- **Target Keyword:** `property maintenance Maple Ridge BC` / `property maintenance Pitt Meadows BC`
- **Issues Found:**
  - **Critical** — The place name "Ridge Meadow" is incorrect. The community is "Ridge Meadows" (Maple Ridge + Pitt Meadows). This misspelling appears in the title tag, the URL slug, and throughout the page. Searchers looking for "Ridge Meadows" or "Maple Ridge" property maintenance may not find this page.
  - **High** — Meta description is 202 characters — truncated.
  - **Medium** — H1 "The Wet End Of The Valley" — no place name, no service term.
  - **Medium** — The title says "Ridge Meadow, BC" but the meta description correctly says "Maple Ridge and Pitt Meadows, BC" — inconsistency within the page.
- **Recommendations:**
  1. **Fix the slug**: Raise with client. If they approve, change `slug: "ridge-meadow"` to `"ridge-meadows"` and update all references including the sitemap, navigation, and location page links. This is a URL change and will require a 301 redirect if the old URL has been shared.
  2. Rewrite title: "Property Maintenance in Maple Ridge and Pitt Meadows, BC | RainCity"
  3. Rewrite meta to 155 chars.
  4. Update H1 to include place names.
- **Suggested Title Tag:** `Property Maintenance in Maple Ridge & Pitt Meadows, BC | RainCity`
- **Suggested Meta Description:** "Property maintenance in Maple Ridge and Pitt Meadows, BC — roof moss treatment, soft washing and gutter clearing at the wettest end of the valley. Free written quotes." (165 chars — trim 10)
- **Schema Recommendations:** FAQPage correctly implemented with strong local context.
- **Local SEO Notes:** "The wettest ground we cover — moss is a condition, not an event" is the strongest single local statement on any location page. This differentiation is compelling and searchable.
- **AI Engine Optimization Notes:** "How often does a treed property here need the roof treated?" would be a valuable additional FAQ targeting the specific local condition.

---

## /locations/surrey

- **Current Title Tag:** `Property Maintenance in Surrey, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Surrey, BC — parking lot sealing, commercial pressure washing, strata common areas and residential exterior cleaning from City Centre to South Surrey. Free quotes from RainCity." (220 chars — **severely truncated**)
- **Target Keyword:** `property maintenance Surrey BC` / `commercial cleaning Surrey BC`
- **Issues Found:**
  - **High** — Meta description is 220 characters — the longest of any location page. Will be cut before "from City Centre" in Google.
  - **Medium** — H1 "Six Town Centres And A Lot Of Asphalt" — does not include "Surrey" or "property maintenance". Strong voice, weak keyword signal.
  - **Low** — Photo used: `concreteSealing` — thematic (Surrey leads with commercial sealing content); appropriate for now.
  - **Low** — Surrey's five FAQs are well-constructed: "Which parts of Surrey do you cover?", commercial lots, after-hours commercial work, strata complexes, and South Surrey coverage. All are citation-ready.
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in Surrey, BC — parking lot sealing, commercial pressure washing, strata complexes and residential exterior work across all six town centres. Free quotes."
  2. Consider H1: "Property Maintenance in Surrey: Six Town Centres and a Lot of Asphalt"
- **Suggested Title Tag:** `Property Maintenance in Surrey, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in Surrey, BC — parking lot sealing, commercial washing, strata complexes and residential exterior work across all six town centres. Free quotes." (163 chars — trim 8)
- **Schema Recommendations:** FAQPage correctly implemented. "Do you seal commercial parking lots?" is the highest-value commercial FAQ on any location page — it directly targets facilities managers.
- **Local SEO Notes:** Surrey is the largest single area the site covers. "The densest concentration of lot and loading-bay work" is a differentiated claim. The six named town centres (City Centre, Guildford, Fleetwood, Newton, Cloverdale, South Surrey) provide hyperlocal targeting depth.
- **AI Engine Optimization Notes:** "Which parts of Surrey do you cover?" — the answer explicitly names all six town centres and states no travel charge, which is exactly what an AI system answering "does RainCity cover South Surrey?" needs to find.

---

## /locations/tri-cities

- **Current Title Tag:** `Property Maintenance in Tri-Cities, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in the Tri-Cities, BC — Coquitlam, Port Coquitlam and Port Moody. Moss removal, pressure washing, gutters and strata common areas. Free written quotes from RainCity." (208 chars — **truncated in SERP**)
- **Target Keyword:** `property maintenance Coquitlam BC` / `property maintenance Port Coquitlam BC` / `property maintenance Port Moody`
- **Issues Found:**
  - **High** — Meta description is 208 characters — severely truncated. Will be cut before "Free written quotes" in Google.
  - **High** — "Tri-Cities" is a colloquial grouping. Searchers are more likely to query by individual municipality name ("property maintenance Coquitlam", "gutter cleaning Port Moody"). The title should name the three cities.
  - **Medium** — H1 "Three Cities, And A Lot Of Gradient" — does not include any of the three city names or "property maintenance". The gradient framing is distinctive but loses keyword confirmation.
  - **Low** — Photo: `powerWashing` — thematic (the page leads with moss/pressure washing for hillside lots); appropriate.
  - **Low** — "Anmore sits immediately above Port Moody and has a page of its own" — this is a helpful cross-link statement in the FAQ that actively directs searchers to the right page.
- **Recommendations:**
  1. Rewrite title: `Property Maintenance in Coquitlam & the Tri-Cities, BC | RainCity` (names the primary city while retaining the grouping term)
  2. Trim meta to 155 chars, naming all three cities: "Property maintenance in Coquitlam, Port Coquitlam and Port Moody — moss removal, pressure washing, gutters and strata common areas on the hillside lots and flats. Free quotes."
  3. Update H1 to include at least one city name: "Property Maintenance in the Tri-Cities: Three Cities, A Lot of Gradient"
- **Suggested Title Tag:** `Property Maintenance in Coquitlam & the Tri-Cities, BC | RainCity`
- **Suggested Meta Description:** "Property maintenance in Coquitlam, Port Coquitlam and Port Moody — moss removal, pressure washing, gutters and strata work on hillside lots and river flats. Free written quotes." (177 chars — trim 22)
- **Schema Recommendations:** FAQPage correctly implemented with five well-formed questions. "Is winter different up on the plateaus?" is uniquely local and citation-ready.
- **Local SEO Notes:** "Burke Mountain and Westwood hold snow the flats have lost" is a verifiable local distinction that separates this page from generic content. Individual municipality names in the intro and FAQs are essential for city-specific searches.
- **AI Engine Optimization Notes:** "Which cities does this cover?" — the answer explicitly names Coquitlam, Port Coquitlam and Port Moody, which is the exact data an AI engine needs to cite when answering "does RainCity serve Port Moody". The FAQ cross-link to Anmore is a strong directional signal for that community's specific queries.

---

## /locations/vancouver

- **Current Title Tag:** `Property Maintenance in Vancouver, BC | RainCity Property Maintenance`
- **Current Meta Description:** "Exterior cleaning and property maintenance in Vancouver, BC — character-home window and gutter work, soft washing, and mid-rise strata common areas on the east side and the west. Free written quotes from RainCity." (214 chars — **severely truncated**)
- **Target Keyword:** `property maintenance Vancouver BC` / `exterior cleaning Vancouver` / `window cleaning Vancouver character home`
- **Issues Found:**
  - **High** — Meta description is 214 characters — severely truncated. "Free written quotes from RainCity" — the CTA — is cut off entirely.
  - **High** — Vancouver is the highest-volume local search market in the region. This page warrants priority attention to both meta description and H1 keyword placement.
  - **Medium** — H1 "The Tightest Lots We Work On" — does not include "Vancouver" or "property maintenance". The access framing is an excellent differentiator, but loses keyword signal.
  - **Low** — Photo: `softWashing` — appropriate (the page's service emphasis is on surfaces unsuitable for pressure washing on constrained Vancouver lots).
  - **Low** — Kitsilano, Dunbar, Mount Pleasant, Cambie, Main and the West End are named explicitly in the body — strong hyperlocal geo-targeting.
- **Recommendations:**
  1. Rewrite meta to 155 chars: "Property maintenance in Vancouver, BC — character homes, laneways and mid-rise strata on the east and west sides. Windows, gutters, soft washing and exterior care. Free quotes."
  2. Update H1: "Property Maintenance in Vancouver: The Tightest Lots We Work On" — adds the city name while keeping the distinctive framing.
  3. The character-house and laneway content is strong — ensure it is in the first 100 words visible to crawlers (it is in the body block, which should be server-rendered).
- **Suggested Title Tag:** `Property Maintenance in Vancouver, BC | RainCity Property Maintenance` *(keep)*
- **Suggested Meta Description:** "Property maintenance in Vancouver, BC — character homes, laneways and mid-rise strata on the east and west sides. Windows, gutters, soft washing and exterior care. Free quotes." (175 chars — trim 20)
- **Schema Recommendations:** FAQPage correctly implemented with five well-formed questions. "There is no driveway and no parking. Can you still do the job?" is a uniquely Vancouver FAQ that directly addresses the site's most common access barrier.
- **Local SEO Notes:** Vancouver is the most competitive local search market this site targets. The character-house, laneway and heritage-glazing framing are the strongest differentiators from template content. The six named neighbourhoods (Kitsilano, Dunbar, Mount Pleasant, Cambie, Main, West End) provide valuable hyperlocal signals.
- **AI Engine Optimization Notes:** "Can you clean original wood windows without wrecking them?" is an expert-level FAQ with a specific, precise answer about technique. It is exactly the kind of content an AI engine surfaces for "heritage window cleaning Vancouver". The five-storey pole-work answer correctly states the physical limit — a factual, verifiable claim AI engines can cite with confidence.

---

## /blog

- **Current Title Tag:** `Blog | Property Maintenance Advice for Greater Vancouver`
- **Current Meta Description:** "Seasonal timing, the maintenance that pays for itself and advice specific to Greater Vancouver — notes from RainCity Property Maintenance, a mobile exterior-cleaning crew based in New Westminster, BC." (~183 chars — **truncated in SERP**)
- **Target Keyword:** `property maintenance tips Greater Vancouver` / `exterior cleaning advice BC`
- **Issues Found:**
  - **Critical** — Meta description is ~183 characters — truncated.
  - **High** — All 6 blog posts are placeholder content and currently indexed without `noindex`. The blog index page draws searchers to this placeholder content.
  - **Medium** — Title starts with "Blog |" — a generic, weak prefix. Consider "Property Maintenance Advice for Greater Vancouver | RainCity Blog".
  - **Medium** — No `itemListElement` in the Blog schema (intentionally withheld while copy is placeholder — correct, but should be added when real posts land).
  - **Medium** — Featured strip shows the same two posts on every archive page visit — no personalisation is possible in static rendering.
- **Recommendations:**
  1. Add `noindex` to all 6 blog post pages immediately.
  2. Rewrite meta to 155 chars: "Seasonal timing, practical advice and notes from a Greater Vancouver exterior-cleaning crew — the maintenance that pays for itself in this climate."
  3. Retitle: "Property Maintenance Advice for Greater Vancouver | RainCity Blog"
- **Suggested Title Tag:** `Property Maintenance Advice for Greater Vancouver | RainCity Blog`
- **Suggested Meta Description:** "Seasonal timing, practical advice and notes from a Greater Vancouver exterior-cleaning crew — the maintenance that pays for itself in this climate." (145 chars)
- **Schema Recommendations:** Add `blogPost` ItemList to `blogPageSchema` when real posts replace the placeholder content.
- **Local SEO Notes:** The blog's informational terms are correctly separated from the commercial terms on /services and the city terms on /locations.
- **AI Engine Optimization Notes:** The featured articles ("Moss Isn't The Problem" and "The Fortnight Before The Rain") are high-quality, quotable content — but they are placeholder and must not be cited. Until replaced, `noindex` prevents AI training and citation.

---

## /blog/page/2

- **Current Title Tag:** `Blog, Page 2 | Property Maintenance Advice for Greater Vancouver`
- **Current Meta Description:** "Page 2 of the RainCity Property Maintenance archive — seasonal timing, maintenance advice and notes from the work across Greater Vancouver." (~137 chars — acceptable)
- **Target Keyword:** *(Pagination page — no primary keyword target)*
- **Issues Found:**
  - **Medium** — This page is deliberately excluded from the sitemap (correct). However, if placeholder blog posts are indexed, this archive page may be reached by crawlers via the pager.
  - **Low** — Title "Blog, Page 2" — the comma format is unusual. "Blog — Page 2" or "Page 2 | Blog | ..." would be cleaner.
- **Recommendations:**
  1. If blog post pages are noindexed, this page's crawl value drops. Consider adding `noindex` to archive pages while content is placeholder.
  2. When real posts land, ensure `rel="prev"` and `rel="next"` are present if using pagination SEO signals (though Next.js App Router handles this through canonical).
- **Suggested Title Tag:** `Property Maintenance Advice for Greater Vancouver — Page 2 | RainCity`
- **Suggested Meta Description:** Keep as-is (137 chars — within limit).
- **Schema Recommendations:** `blogPageSchema(2)` correctly generates a separate node at the page 2 URL.
- **Local SEO Notes:** N/A — pagination page.
- **AI Engine Optimization Notes:** N/A — pagination page.

---

## /blog/moss-isnt-the-problem

- **Current Title Tag:** `Moss Isn't The Problem. What It Holds Is. | Roof Care | RainCity`
- **Current Meta Description:** "A green roof looks bad long before it is bad. What actually shortens a shingle's life is the water the moss keeps against it, day after day, right through a coast winter." (167 chars — borderline)
- **Target Keyword:** `roof moss damage shingles` / `moss on roof Greater Vancouver`
- **Issues Found:**
  - **Critical** — This is placeholder content. It is indexed, in the sitemap, and has BlogPosting structured data. Add `noindex` immediately.
  - **High** — No author byline or named expert — serious E-E-A-T gap for health/property advice.
  - **High** — Organisation-as-author in BlogPosting schema is honest but weak as an E-E-A-T signal.
  - **Medium** — Meta description is 167 chars — borderline.
  - **Medium** — Title with double pipes (`| Roof Care | RainCity`) — unusual format. Google may rewrite it.
  - **Low** — The article is genuinely well-written and quotable — the main issue is authorship and confirmation status, not quality.
- **Recommendations:**
  1. Add `noindex` to this route immediately.
  2. When real content replaces it: add an author byline and a Person node in BlogPosting schema.
  3. Normalise title format: "Moss Isn't The Problem — What It Holds Is | Roof Care | RainCity"
  4. Trim meta to 155 chars.
- **Suggested Title Tag:** *(After real content lands)* `Moss Isn't The Problem — What It Holds Is | RainCity Roof Care`
- **Suggested Meta Description:** "A green roof looks bad before it is bad. What shortens a shingle's life is the water moss keeps against it through a coast winter — and what to do about it." (154 chars)
- **Schema Recommendations:** When real content lands — add Person author node, add `wordCount`, consider `speakable` markup.
- **Local SEO Notes:** "Right through a coast winter" and "Greater Vancouver" mentions are strong local signals once the content is confirmed.
- **AI Engine Optimization Notes:** The pull quote ("A roof does not fail because something grew on it. It fails because it never got the chance to dry.") is a strong citation candidate — but only once the content is confirmed real.

---

## /blog/the-fortnight-before-the-rain

- **Current Title Tag:** `The Fortnight Before The Rain Sets In | Seasonal | RainCity`
- **Current Meta Description:** "Late September is the cheapest two weeks of the year to own a building here. Everything booked after the first real storm costs more, takes longer, and usually involves a ladder in the wet." (188 chars — **too long**)
- **Target Keyword:** `autumn maintenance checklist Vancouver` / `pre-rain gutter cleaning BC`
- **Issues Found:**
  - **Critical** — Placeholder content — add `noindex` immediately.
  - **High** — No author byline.
  - **High** — Meta description is 188 characters — severely truncated.
- **Recommendations:**
  1. Add `noindex`.
  2. After real content: trim meta to 155 chars, add author.
- **Suggested Title Tag:** `The Fortnight Before The Rain Sets In | Seasonal Maintenance | RainCity`
- **Suggested Meta Description:** "Late September is the cheapest two weeks of the year to own a building in Greater Vancouver. Everything booked after the first storm costs more and involves a wet ladder." (167 chars — trim 12)
- **Schema Recommendations:** Same as other blog posts.
- **Local SEO Notes:** "Late September into the first week of October" — this highly specific local seasonal window is citation-ready for AI systems answering "when should I clean my gutters in Vancouver".
- **AI Engine Optimization Notes:** The closing point about a blocked downspout leading to fascia and drywall damage is a strong consequence-framing statement.

---

## /blog/why-the-north-wall-greens-first

- **Current Title Tag:** `Why The North Wall Greens Over First | Exterior Cleaning | RainCity`
- **Current Meta Description:** "Same house, same siding, same year — and one elevation is green while the other is fine. It is not the paint. It is how long that wall stays wet after it rains." (160 chars — borderline)
- **Target Keyword:** `north wall algae siding Vancouver` / `algae siding soft wash Greater Vancouver`
- **Issues Found:**
  - **Critical** — Placeholder content — add `noindex` immediately.
  - **High** — No author byline.
  - **Low** — Meta description is exactly 160 chars — Google may or may not truncate. Trim to 155 for safety.
- **Recommendations:**
  1. Add `noindex`.
  2. After real content: trim meta slightly, add author.
- **Suggested Title Tag:** `Why The North Wall Greens Over First | Exterior Cleaning | RainCity` *(keep once confirmed real)*
- **Suggested Meta Description:** "Same house, same siding, same year — one elevation green, the other fine. It is not the paint. It is how long that wall stays wet after it rains." (143 chars)
- **Schema Recommendations:** Same as other blog posts.
- **Local SEO Notes:** "From October to April" and "Greater Vancouver" context is strong local specificity.
- **AI Engine Optimization Notes:** "That is why the green line usually stops exactly where the shade does" is a precise, citable observation.

---

## /blog/what-a-strata-schedule-covers

- **Current Title Tag:** `What A Strata Maintenance Schedule Actually Covers | Strata & Commercial | RainCity`
- **Current Meta Description:** "Councils usually inherit a schedule rather than write one. Here is what belongs on it, what is almost always missing, and which line items are worth an argument at the AGM." (169 chars — **too long**)
- **Target Keyword:** `strata maintenance schedule BC` / `strata property maintenance checklist`
- **Issues Found:**
  - **Critical** — Placeholder content — add `noindex` immediately.
  - **High** — No author byline. This is the most authoritative post on the blog — strata councils specifically would benefit from a named author with credentials.
  - **High** — Meta description is 169 characters — truncated.
  - **Medium** — This is the site's longest and most structured post (11-minute read, multiple H3s, ordered lists, pull quote, photograph in body). If this content were confirmed real, it would be the blog's strongest E-E-A-T asset.
- **Recommendations:**
  1. Add `noindex`.
  2. After real content: add author with strata experience, trim meta to 155 chars.
- **Suggested Title Tag:** `What A Strata Maintenance Schedule Actually Covers | RainCity`
- **Suggested Meta Description:** "Councils usually inherit a schedule rather than write one. Here is what belongs on it, what is almost always missing and which line items are worth an argument at the AGM." (168 chars — trim 13)
- **Schema Recommendations:** This post is a candidate for `HowTo` schema in addition to BlogPosting — the "Reading a schedule you inherited" section is a clear step-by-step process.
- **Local SEO Notes:** BC-specific strata law and AGM context are strong local signals.
- **AI Engine Optimization Notes:** The three-rhythm model (fixed cycle, seasonal pair, conditional work) is a citable framework that no generic strata page provides.

---

## /blog/sealing-between-two-rainstorms

- **Current Title Tag:** `Sealing A Driveway Between Two Rainstorms | Hard Surfaces | RainCity`
- **Current Meta Description:** "Sealer needs a dry surface and a dry forecast, which is a narrow ask on this coast. The window is real, though, and it is wider than most people assume." (150 chars — acceptable)
- **Target Keyword:** `driveway sealing Vancouver` / `when to seal driveway Greater Vancouver`
- **Issues Found:**
  - **Critical** — Placeholder content — add `noindex` immediately.
  - **High** — No author byline.
  - **Low** — This is the shortest post on the site (5-minute read, 3 short sections). When real content lands, consider expanding to match search intent for "when to seal a driveway in Vancouver".
- **Recommendations:**
  1. Add `noindex`.
  2. After real content: expand to 800+ words, add FAQ section, add author.
- **Suggested Title Tag:** `Sealing A Driveway Between Two Rainstorms | RainCity` *(keep once confirmed real)*
- **Suggested Meta Description:** Keep as-is (150 chars — within limit).
- **Schema Recommendations:** Same as other blog posts.
- **Local SEO Notes:** "Between May and September" timing for Greater Vancouver is a directly answerable local query.
- **AI Engine Optimization Notes:** "Sealed on a sensible cycle, the same slab lasts years longer" is a citable benefit statement.

---

## /blog/three-days-of-snow

- **Current Title Tag:** `Three Days Of Snow, And They All Matter | Seasonal | RainCity`
- **Current Meta Description:** "Greater Vancouver gets a handful of days a year that genuinely need clearing. The trouble is that nobody knows which ones, which is why the contract matters more than the shovel." (175 chars — **too long**)
- **Target Keyword:** `snow removal Vancouver contract` / `seasonal snow service Greater Vancouver`
- **Issues Found:**
  - **Critical** — Placeholder content — add `noindex` immediately.
  - **High** — No author byline.
  - **High** — Meta description is 175 characters — truncated.
- **Recommendations:**
  1. Add `noindex`.
  2. After real content: trim meta to 155 chars, add author.
- **Suggested Title Tag:** `Three Days Of Snow, And They All Matter | RainCity`
- **Suggested Meta Description:** "Greater Vancouver gets a handful of snow days a year that genuinely need clearing. Nobody knows which ones — which is why the seasonal contract matters more than the shovel." (169 chars — trim 14)
- **Schema Recommendations:** Same as other blog posts.
- **Local SEO Notes:** The "city that gets snow three times a year" framing is locally accurate and citation-ready.
- **AI Engine Optimization Notes:** "Applied after the ice has bonded, it is mostly grit. Applied before, it stops the bond forming at all." — this is a precise, citable fact about de-icing timing.

---

## /contact

- **Current Title Tag:** `Contact RainCity | Free Quotes in New Westminster, BC`
- **Current Meta Description:** "Call, email or request a free quote from RainCity Property Maintenance — mobile property maintenance and exterior cleaning based in New Westminster, BC, serving Greater Vancouver. No obligation, no pushy follow-up." (~213 chars — **truncated in SERP**)
- **Target Keyword:** `contact property maintenance company New Westminster` / `free quote exterior cleaning Greater Vancouver`
- **Issues Found:**
  - **Critical** — Meta description is ~213 characters — severely truncated. "No obligation, no pushy follow-up" — the strongest CTA on the page — will be cut off.
  - **Medium** — Breadcrumb in JSON-LD uses "Get In Touch" as the crumb name rather than "Contact" — inconsistency with the URL and the page title.
  - **Low** — No FAQ on this page. "How long does a quote take?" and "Do I need to be home for the quote?" would add AEO value.
  - **Low** — The contact page schema uses `ContactPage` — correct type and correctly implemented.
- **Recommendations:**
  1. Rewrite meta to 140–155 chars: "Call, email or get a free written quote from RainCity — mobile property maintenance and exterior cleaning in New Westminster and Greater Vancouver. No obligation."
  2. Fix breadcrumb crumb: change `name: "Get In Touch"` to `name: "Contact"` in `breadcrumbSchema` call in `app/contact/page.tsx`.
  3. Add a simple FAQ section (3 questions) to the contact page to improve AEO signals.
- **Suggested Title Tag:** `Contact RainCity | Free Quotes in New Westminster, BC` *(keep)*
- **Suggested Meta Description:** "Call, email or get a free written quote from RainCity — mobile property maintenance and exterior cleaning in New Westminster and Greater Vancouver. No obligation." (160 chars — trim 5)
- **Schema Recommendations:** Breadcrumb label correction. Consider adding `speakable` markup to the phone number and email sections for voice search.
- **Local SEO Notes:** "Based in New Westminster, serving Greater Vancouver" NAP-reinforcement is good. Ensure the phone number is consistently formatted across this page and all schema — it is.
- **AI Engine Optimization Notes:** The contact page is a frequent AI citation target for "how to contact RainCity". The schema is correct; the content is clear.

---

## /terms (Terms & Conditions)

- **Current Title Tag:** `Terms & Conditions | RainCity Property Maintenance, New Westminster BC`
- **Current Meta Description:** "The terms governing quotes, scheduling, cancellation, payment and liability for RainCity Property Maintenance work across Greater Vancouver, under BC law." (152 chars — acceptable)
- **Target Keyword:** *(Legal page — low search intent; not a primary keyword target)*
- **Issues Found:**
  - **Critical** — This is unreviewed placeholder legal text. The page is indexed, in the sitemap at priority 0.3, and linked from the footer. Specific operational commitments (24-hour cancellation window, 50% charge, net-30 invoicing) have not been confirmed by the client. Add `noindex` until reviewed by a lawyer and confirmed by the client.
  - **Medium** — The `updatedISO: "2026-08-31"` date is the build date, not an actual review date. Once the legal review is complete, this date should reflect the date of actual legal approval.
- **Recommendations:**
  1. Add `noindex` to all four legal pages immediately.
  2. After legal review: remove `noindex`, update `updatedISO` to the review date.
- **Suggested Title Tag:** `Terms & Conditions | RainCity Property Maintenance, New Westminster BC` *(keep)*
- **Suggested Meta Description:** Keep as-is (152 chars).
- **Schema Recommendations:** No schema beyond the page metadata needed here.
- **Local SEO Notes:** N/A — legal pages are not search landing targets.
- **AI Engine Optimization Notes:** AI engines may cite legal page content as representing RainCity's actual policies. Until the content is legally reviewed, `noindex` prevents this.

---

## /privacy-policy (Privacy Policy)

- **Current Title Tag:** *(Follows same pattern as terms)*
- **Current Meta Description:** *(~150 chars estimated — acceptable)*
- **Target Keyword:** *(Legal page — not a primary keyword target)*
- **Issues Found:**
  - **Critical** — Unreviewed placeholder legal text — add `noindex` immediately.
  - **Medium** — The Privacy Policy describes form-handling for the quote form, but the form has no live backend yet (noted in the codebase). The policy describes an intended path, not a live system.
  - **Medium** — No named privacy officer (PIPA requires one to be designated).
- **Recommendations:**
  1. Add `noindex`.
  2. After backend is implemented and form is live, update the Privacy Policy to reflect the actual data handling.
  3. Designate a named privacy officer before publishing.
- **Schema Recommendations:** N/A
- **Local SEO Notes:** N/A
- **AI Engine Optimization Notes:** Same concern as /terms.

---

## /disclaimer

- **Current Title Tag:** *(Follows same pattern as terms)*
- **Current Meta Description:** *(~150 chars estimated — acceptable)*
- **Issues Found:**
  - **Critical** — Unreviewed placeholder legal text — add `noindex` immediately.
  - **Medium** — The Disclaimer's before-and-after clause references `projects.disclaimer` — must stay consistent with any project photography on the homepage.
- **Recommendations:**
  1. Add `noindex`.
  2. If genuine RainCity before/after photography is added, update both the Disclaimer and the homepage `projects.disclaimer` reference in the same commit.
- **Schema Recommendations:** N/A
- **Local SEO Notes:** N/A

---

## /refund-policy (Refund Policy)

- **Current Title Tag:** *(Follows same pattern as terms)*
- **Current Meta Description:** *(~150 chars estimated — acceptable)*
- **Issues Found:**
  - **Critical** — Unreviewed placeholder legal text — add `noindex` immediately.
  - **Critical** — The Refund Policy must stay consistent with the satisfaction guarantee claims elsewhere on the site (homepage Awards section, /services/[slug] trust points, the "Every job guaranteed" language on the Painting service). If the legal review narrows the guarantee, the marketing claims must change in the same pass.
- **Recommendations:**
  1. Add `noindex`.
  2. Legal review must confirm the refund policy is consistent with the satisfaction guarantee.
- **Schema Recommendations:** N/A
- **Local SEO Notes:** N/A
- **AI Engine Optimization Notes:** AI engines that read the refund policy as representing real customer rights are a liability risk if the content is placeholder.

---

## 4. Prioritized Action Plan

### Critical — Fix Before Launch

- [ ] **Add `noindex` to all 6 blog post pages** (`/blog/moss-isnt-the-problem`, `/blog/the-fortnight-before-the-rain`, `/blog/why-the-north-wall-greens-first`, `/blog/what-a-strata-schedule-covers`, `/blog/sealing-between-two-rainstorms`, `/blog/three-days-of-snow`) — add `robots: { index: false }` in each `generateMetadata` call
- [ ] **Add `noindex` to all 4 legal pages** (`/terms`, `/privacy-policy`, `/disclaimer`, `/refund-policy`) — same mechanism
- [ ] **Rewrite homepage meta description to ≤155 chars** — current 268 chars is the site's highest-priority SERP fix
- [ ] **Rewrite /about meta description to ≤155 chars** — currently ~194 chars
- [ ] **Rewrite /services meta description to ≤155 chars** — currently ~211 chars
- [ ] **Rewrite /locations meta description to ≤155 chars** — currently ~198 chars
- [ ] **Rewrite /contact meta description to ≤155 chars** — currently ~213 chars
- [ ] **Rewrite /blog meta description to ≤155 chars** — currently ~183 chars

### High — Fix Before Launch

- [ ] **Get real social profile URLs from client** — fill footer icons or delete placeholder icons for networks not in use; add `sameAs` to `localBusinessSchema` simultaneously
- [ ] **Fix "Ridge Meadow" → "Ridge Meadows"** — update slug, URL, title, meta, H1, content and sitemap; add 301 redirect if the old URL has been shared; confirm with client first
- [ ] **Fix service H1s on 4 pages to include the primary keyword:**
  - `/services/concrete-and-asphalt-sealing`: "Sealing That Buys a Driveway Years" → "Concrete and Asphalt Sealing That Buys Your Driveway Years"
  - `/services/window-cleaning`: "Windows Worth Looking Through" → "Window Cleaning Worth Looking Through"
  - `/services/snow-removal-salting`: "Snow Cleared Before the First Arrival" → "Snow Removal — Cleared Before the First Arrival"
  - `/services/landscaping-lawn-care`: "Grounds That Stay Looked After" → "Landscaping & Lawn Care — Grounds That Stay Looked After"
- [ ] **Rewrite title for /services page** — "Our Services | …" → "Exterior Cleaning & Property Maintenance Services in Greater Vancouver | RainCity"
- [ ] **Set up Google Business Profile** — collect profile URL from client, link from website, add `sameAs` to schema, embed GBP map or link on Contact page
- [ ] **Add H1 keyword fixes for all 9 location pages** — each H1 should include the city name and "property maintenance"; current H1s are creative but lose keyword confirmation
- [ ] **Rewrite all 9 location page meta descriptions to ≤155 chars** — all currently 192–220 chars
- [ ] **Fix breadcrumb label on /contact** — change `name: "Get In Touch"` to `name: "Contact"` in the `breadcrumbSchema` call

### Medium — Fix Before Launch

- [ ] **Replace placeholder testimonials with real verified reviews** — then add `aggregateRating` to `localBusinessSchema` in `lib/seo.tsx`
- [ ] **Add the 2026 Canadian Choice Award to the About page** — add to body copy and to `organizationSchema` as `award` property
- [ ] **Add context or disclaimer to About page stats** — "5+ years", "1K+ properties", "100% satisfaction" need either verification or a qualifier
- [ ] **Retitle the blog** — "Blog | Property Maintenance Advice…" → "Property Maintenance Advice for Greater Vancouver | RainCity Blog"
- [ ] **Align power-washing terminology** — decide between "power washing" and "pressure washing" as the primary keyword and make title, H1 and meta consistent; update meta to lead with chosen term
- [ ] **Fix Tri-Cities page title** — "Property Maintenance in Tri-Cities, BC" should name the three municipalities; suggested: "Property Maintenance in Coquitlam & the Tri-Cities, BC | RainCity"
- [ ] **Add contextual cross-links** — service page FAQ answers should link to relevant location pages (e.g., commercial cleaning FAQ → Burnaby location page; sealing FAQ → Langley location page) and vice versa
- [ ] **Confirm H1 tags are rendered as semantic `<h1>` elements** — not as styled `<div>` or `<p>` tags in Hero components; run `next build` output through HTML validator
- [ ] **Add FAQ block to homepage** — 3–4 questions about "what is RainCity", "where do you serve" and "how does a free quote work" would improve AEO and FAQ schema coverage on the most-visited page
- [ ] **Add FAQ block to /contact page** — "How long does a quote take?", "Do I need to be home?" and "What is your service area?" would help conversion and AEO signals

### Low — Post-Launch Improvements

- [ ] **Add author bylines to blog posts** — when real posts land, add a Person node to BlogPosting schema with the author's name, role and appropriate credentials
- [ ] **Add `award` property to Organization schema** once the 2026 Canadian Choice Award is verified and the About page references it
- [ ] **Update blog post meta descriptions** — several blog posts have descriptions over 160 chars; review and trim each when real content replaces placeholders
- [ ] **Normalise blog post title format** — replace double-pipe (`| Category | RainCity`) with single-pipe or dash; Google may rewrite; aim for: `Post Title | RainCity`
- [ ] **Add real community photographs to all 9 location pages** — current photos are generic service frames from the service page registry; nine genuine location photographs would strengthen both visual distinctiveness and E-E-A-T
- [ ] **Add `speakable` markup to Contact page** — phone number and hours sections are prime candidates for voice-search answers
- [ ] **Review `services` page title tag length** — 79 chars, slightly over the recommended 60-65; could be trimmed to "Exterior Cleaning & Property Maintenance | Greater Vancouver | RainCity"
- [ ] **Review `power-washing` vs `pressure-washing` search volume** — use Google Search Console or Keyword Planner after launch to confirm which term drives more impressions and adjust if needed
- [ ] **Consider expanding thin blog posts** — `/blog/sealing-between-two-rainstorms` (5-min read, 3 sections) and `/blog/the-fortnight-before-the-rain` (5-min, 3 sections) are below typical ranking length for their target queries once real content replaces placeholders
- [ ] **Add `llms.txt` entry for the 2026 award** — once verified, add to the Credentials section
- [ ] **Add `/blog/page/2` noindex** while blog content is placeholder — consistent with the individual post noindex treatment
- [ ] **Monitor for `dateModified` staleness** — once a post is published and later updated, ensure `dateModified` is updated in `content.ts`; currently it equals `datePublished` which is correct for new posts but will grow stale over time
- [ ] **Replace the `QuoteForm` placeholder backend** — the form currently has no live backend (noted in codebase); until it is wired up, the Privacy Policy's form-handling description is describing an intended system, not a live one

---

*End of audit. This document covers all 37 public routes and reflects findings based solely on the codebase as of 2026-08-31. No live analytics, Search Console data or competitor analysis has been used.*
