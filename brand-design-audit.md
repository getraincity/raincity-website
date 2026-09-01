# RainCity Property Maintenance — Brand & Visual Design Audit

**Auditor role:** Senior Brand Designer & UI/UX Design Director  
**Audit date:** 2026-09-01  
**Scope:** Full visual, brand, and experiential design review — no code-quality or SEO findings.  
**Basis:** Source component review (all 60+ components), design-token inspection (`raincity-tokens.md`, `app/globals.css`), live browser screenshots at desktop (1280×720) and mobile (375×812) viewports.

---

## 1. Executive Summary

**Overall Visual Design Health Score: 8.2 / 10**

RainCity's website is a genuinely distinctive, premium site — not a templated WordPress theme, not a generic property-services pattern. The locked design system (`raincity-tokens.md`) is thorough and enforced: every colour, type size, spacing value, and radius is a named token. The two-face type system (Chivo display / IBM Plex Sans body) is confident and consistent. The Squeegee Edge signature appears in its four designated places and nowhere else. Motion is deliberately narrow — opacity + 16 px up, once, everything. This is a site that has had a real design pass, not just a build.

What prevents a higher score is a cluster of unfinished content states and one confirmed mobile visual failure. Several critical conversion points (the quote form, all social links) are currently non-functional. Several sections present invented copy and placeholder photography as finished content. And the hero photograph — the design's primary asset — disappears entirely on mobile.

### Top 10 Most Critical Design Issues Across the Site

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 1 | Hero photograph is completely invisible on mobile (375 px) | Critical | Homepage + all inner-page banners |
| 2 | Quote form sends nothing — primary CTA non-functional | Critical | Homepage, all service/location/closing sections |
| 3 | 8 service tile photos are hatch-pattern placeholders | Critical | 5 service pages (Painting, Snow Removal, Holiday Lights, Concrete, Landscaping) |
| 4 | All 4 social icons link to `#` in three locations | High | Header utility strip, Footer, Awards section |
| 5 | 7+ page types share the identical banner scrim gradient | High | All inner pages |
| 6 | Testimonials section presents 4 invented reviews as real | High | Homepage |
| 7 | Projects / before-after section uses illustrative (non-client) pairs | High | Homepage |
| 8 | All 4 legal pages share one photograph | Medium | /terms, /privacy-policy, /disclaimer, /refund-policy |
| 9 | `rooftops` photo reused across 3 unrelated contexts | Medium | Homepage Pillars, Locations hub hero, all 4 legal pages |
| 10 | Footer shows only 3 of 4 social icons; header and Awards show all 4 | Low | Footer vs. Header / Awards |

### Overall Brand Cohesion Impression

Strong system cohesion; incomplete content state. The colour palette is restrained and well-deployed, the typographic hierarchy is clear, and the Squeegee Edge gives the site a proprietary visual language. The brand reads as premium and local — "a specific company that works in the rain," exactly what the design brief calls for. The primary risks are not design inconsistencies but content gaps that make the site look production-ready while containing invented testimonials, placeholder photography, dead CTAs, and a non-functional lead form. These are launch blockers, not design problems to iterate on.

---

## 2. Site-Wide Design System Issues

These are patterns that recur across pages and affect the whole site's coherence.

### 2a. Banner scrim gradient is identical on every inner page
Every page below the homepage — About, Services, all 11 service slugs, Locations, all 9 location slugs, Blog, Contact, and all 4 legal pages — opens with the same CSS gradient layer: `from-navy via-navy/85 to-navy/45` (mobile) and `from-navy/95 via-navy/75 to-navy/25` (desktop). The gradient is heavy enough that on mobile, the photograph beneath it is effectively invisible. On desktop the photo reads clearly on the right side, but on mobile only a flat navy-to-muted-blue gradient is shown. A visitor navigating service to service or location to location sees the same dark gradient banner open on every click. The photograph is the differentiation, and it vanishes at 375 px.

### 2b. Social links are dead UI in three locations
`social` in `lib/content.ts` declares all four href values as `"#"`. Facebook, Instagram, X, and LinkedIn appear in the header utility strip, in the footer (3 of 4), and in the Awards section. Clicking any of them scrolls to page top. This affects brand credibility directly — social icons with no destination signal a site that has not been finished.

### 2c. 8 placeholder service tile photos across 5 services
The tile grid on five service pages contains unfilled photo slots that render as a hatched diagonal stripe (a `repeating-linear-gradient` pattern) with a descriptive caption in place of photography. These sit directly alongside fully-photographed tiles in the same three-column grid, creating an obvious visual break. Affected services: Concrete & Asphalt Sealing (2 tiles), Holiday Light Installation (3 tiles), Snow Removal & Salting (1 tile), Landscaping & Lawn Care (1 tile), Painting (1 tile).

### 2d. The `rooftops` photograph appears in three functionally unrelated contexts
The Greater Vancouver roofline image (`rooftops`) is used as:
1. The Pillars section background on the homepage
2. The Locations hub page hero
3. The hero of all four legal pages

While each use is individually justified in code comments, a visitor who reads the homepage and then clicks through to the Locations hub and then reads the Terms page encounters the same image three times across unrelated purposes. Diversifying at least one of these contexts would reduce the sense of a limited photo library.

### 2e. Quote form is non-functional
The amber "Get A Quote" CTA — the site's highest-hierarchy conversion button — appears in the header, hero, every service closing section, every location closing section, and the Pillars section. All of them anchor to `#quote`. The form validates correctly and renders a polished success state, but no data is transmitted. This is the single highest-impact launch blocker from a design-to-conversion standpoint.

---

## 3. Page-by-Page Detailed Findings

---

## Homepage (/)

**Overall Visual Impression:** The strongest page on the site — photography-forward hero with the signature diagonal cut, a well-paced sequence of seven distinct sections, and restrained motion throughout. The page earns its premium feel.

**Issues Found:**

*Color:*
- No issues. Palette usage is correct throughout: amber for CTAs only, RC-blue for labels and links, pacific for hairlines and hover states. The WhyChooseUs alternating amber/7% tint rows work as intended at low saturation.

*Typography:*
- No issues. The Chivo/Plex pairing is applied consistently. `display-xl` heading in the hero, `display-l` for section h2s, `display-s` for card titles and list heads. `body-l` for lead paragraphs, `body-s` for supporting copy. `meta` for eyebrows, captions, and utility labels.

*Spacing:*
- No issues. `py-section` on all major sections, `py-section-sm` on QuoteForm. The shorter `pb-16` on the ServiceOverview's white band (before the RC-blue trust band) is intentional and well-reasoned in code.

*Imagery:*
- **High** — Hero photograph is invisible on mobile. At 375 px the `bg-linear-to-t from-navy via-navy/80 to-navy/25` scrim covers the photo completely; only a flat navy gradient shows. The page's primary visual asset disappears at the most common screen size.
- **Medium** — The Projects (before/after) section explicitly marks itself as illustrative with a disclaimer note (`projects.illustrative = true`). The note appears, but the section reads as real client work. Visitors in the first seconds of scanning will not distinguish the disclaimer from a caption.

*CTA:*
- **Critical** — `GET A FREE QUOTE` button sends nothing. See site-wide issue 2e.
- No issues with button hierarchy or placement. Amber primary / white-outline tertiary pairing in the hero is correct.

*Motion:*
- No issues. `RevealOnLoad` on the hero (above-fold, correct — no viewport trigger needed). `Reveal` / `Stagger` on below-fold sections.

*Hierarchy:*
- No issues. Sections build logically: Hero → About teaser → Services grid → Projects → WhyChooseUs → Pillars → Testimonials → Awards → QuoteForm.

**Missing Visual Elements:**
- None. Every section has a clear visual anchor.

**Recommendations:**
1. Reduce mobile hero scrim opacity — try `from-navy via-navy/60 to-navy/15` on mobile — to let the photograph register through the gradient on smaller screens. The photo is the brand. Losing it on mobile loses the brand.
2. Wire the quote form to a server action or form endpoint before launch. Until then, the entire CTA infrastructure on the site promises a service it cannot currently deliver.
3. Replace the illustrative project pairs with real RainCity before/after photographs or clearly label the section as representative examples in the heading itself rather than in a small disclaimer note below.
4. Replace or remove placeholder testimonials before launch. The carousel is a well-designed component — it should carry real reviews.

---

## About (/about)

**Overall Visual Impression:** Clean, confident two-column layout with real photography and a clear argument. Reads as a genuine company page, not a boilerplate.

**Issues Found:**

*Imagery:*
- **Low** — The About hero photograph (`aboutHero`) uses the same left-to-right scrim as the service banners at desktop. On mobile it collapses to the bottom-up version. Photo remains partially visible at desktop; disappears on mobile.

*CTA:*
- **Low** — The About hero carries only one CTA (`Get A Quote` amber button), while service and location page heroes have two (`Get A Quote` + `Call Us Now`). The phone CTA is absent here. This is a defensible design choice for a page whose purpose is not immediate lead conversion, but it reduces the low-friction options available on a page visitors use to evaluate trust.

*Hierarchy:*
- No issues. Four sections flow well: WhoWeAre → Process → Stats → MissionVision. Each section has its own visual treatment (photo/text split, process steps, stat numbers, dark band).

**Missing Visual Elements:**
- None.

**Recommendations:**
1. Reduce mobile hero scrim opacity (same recommendation as homepage) so the roofline photograph reads on small screens.
2. Consider adding a phone CTA to the About hero — it costs one button and captures visitors in "evaluation mode" who prefer calling.

---

## Services Hub (/services)

**Overall Visual Impression:** Strong photo in the hero (technician on a solar roof, overcast sky — character and authenticity). The service grid below is the same furniture as the homepage Services section, which is the right choice.

**Issues Found:**

*Imagery:*
- **Low** — Hero photo is the clearest and most distinctive of all the inner page banners — a technician visibly at work on a roof with depth of field. This is the best-performing banner photo on the site. No issues.

*Spacing:*
- No issues. ServicesCatalogue uses the same `max-w-cards` centring and `gap-x-gap-x` / `gap-y-gap-y` spacing as the homepage grid.

*CTA:*
- **Low** — The hero carries one CTA. Adding a `Call Us Now` secondary CTA (consistent with service + location pages) would make this banner grammar fully consistent.

**Missing Visual Elements:**
- None.

**Recommendations:**
1. Add a white-outline `Call Us Now` secondary CTA to the Services hub hero to match the grammar of the service-specific pages users click into.

---

## Service Pages — Window Cleaning (/services/window-cleaning)

Window Cleaning is the design pilot — the first page written to the expanded scope tile format and all 6 of its tiles carry real photographs.

**Overall Visual Impression:** The highest-execution service page on the site. Real photography throughout, strong hero with the cleaner at work, clear overview masthead, RC-blue trust band with amber CTA, closing band with a distinct close-up frame.

**Issues Found:**

*Imagery:*
- No issues. 6/6 tiles photographed. Service card, tile grid, and closing band all use distinct frames.

*CTA:*
- No issues. Amber `Get a Free Quote` in the hero, overview, closing band, and trust band. White-outline `Call Us Now` in hero and closing band.

*Hierarchy:*
- No issues. The masthead rule (full-width hairline separating eyebrow from 5-col/6-col heading and body split) is a distinctive compositional device that makes the overview section feel designed, not assembled.

**Missing Visual Elements:**
- None.

**Recommendations:**
- None. This page sets the quality bar for the other ten.

---

## Service Pages — Pages with Placeholder Tiles

Affects: **Concrete & Asphalt Sealing**, **Painting**, **Snow Removal & Salting**, **Holiday Light Installation**, **Landscaping & Lawn Care**

**Overall Visual Impression:** Strong hero and overview, but the tile grid breaks rhythm where hatch-pattern placeholders sit alongside full photographs. The visual inconsistency is immediately obvious — the diagonal stripe reads as unfinished to any visitor.

**Issues Found:**

*Imagery:*
- **Critical** — Placeholder tiles (2 in Concrete/Asphalt, 3 in Holiday Lights, 1 in Painting, 1 in Snow Removal, 1 in Landscaping) render as a repeating grey diagonal stripe with a text caption where photographs should be. On a three-up grid, a hatch tile adjacent to two photographed tiles reads as a broken image, not as placeholder content.

Specific unfilled slots:
- **Concrete & Asphalt Sealing**: "Oil spot being degreased" · "Two sealer test squares on one slab"
- **Holiday Light Installation**: "Layout sketch held against frontage" · "Mid-season light repair in rain" · "Labelled coils going into bin"
- **Painting**: "Caulk bead tooled into siding-to-trim joint"
- **Snow Removal & Salting**: "Timestamped service log on a tailgate"
- **Landscaping & Lawn Care**: "Tied debris bags on a drive"

*Hierarchy:*
- **Medium** — The uneven photo fill on Concrete & Asphalt Sealing (5 out of 6 tiles photographed, 1 placeholder) and Snow Removal (5 out of 6) creates lopsided visual weight in those grids. The first row is fully photographed; the missing frame appears in a conspicuous position.

**Missing Visual Elements:**
- 8 tile photographs across 5 service pages. These are the most visually impactful content gap on the site.

**Recommendations:**
1. Either shoot the 8 listed frames on a job before launch, or collapse the affected tiles to text-only (title + description, no photo slot) rather than rendering the hatch placeholder. A clean mist-background tile with a title and body reads as intentional; a diagonal stripe reads as broken.
2. For Holiday Light Installation in particular — 3 of its tiles are placeholders — consider temporarily reducing the tile count to 3 fully-photographed tiles rather than showing 6 with half unshot.

---

## Service Pages — Commercial Cleaning, Power Washing, Soft Washing, Gutter Cleaning, Roof Cleaning (/services/[slug])

All five of these pages have complete tile photography sets (6-7 tiles each, all photographed).

**Overall Visual Impression:** Consistent and strong. The tile grid alternates mist / amber-10% / fog backgrounds in a left-to-right-then-repeat pattern, creating a gentle visual rhythm. The RC-blue trust band grounds each page on the same colour before the quote form.

**Issues Found:**

*Imagery:*
- **Low** — The tile photographs on these pages were sourced from stock libraries (Unsplash) rather than from RainCity's own job documentation. Several are close matches to the shot briefs; several are described in the code registry as "stand-ins." The design notes on each photo document the gaps honestly, but a visitor sees them as the real thing.

*Brand:*
- **Low** — These five pages share one photograph each in their hero banner. The visual differentiation between, say, Power Washing (siding photo) and Soft Washing (different siding photo) is subtle. A visitor who navigates between them may not register that they are on a different service page. The breadcrumb and H1 are the primary differentiators.

**Missing Visual Elements:**
- None technically missing, but the stock nature of the imagery is a future gap to close with real job photography.

**Recommendations:**
1. Prioritise replacing Unsplash frames with real job photography, beginning with the hero card images (visible in nav dropdowns and the service grid).

---

## Locations Hub (/locations)

**Overall Visual Impression:** Consistent with the other inner pages. The `rooftops` photo in the hero is well-chosen — it says "Greater Vancouver" rather than showing specific work.

**Issues Found:**

*Imagery:*
- **Low** — The `rooftops` photo is shared with the Pillars section on the homepage. A user who scrolls the homepage then navigates to /locations sees the same image in a different context.

*Hierarchy:*
- No issues. The coverage map, grid of location cards, and service area description read in logical order.

**Missing Visual Elements:**
- None.

**Recommendations:**
- Assign the Locations hub a distinct photograph (perhaps a street-level shot of a Greater Vancouver neighbourhood) to differentiate it from the Pillars section's use of `rooftops`.

---

## Location Pages — All 9 Communities (/locations/[slug])

Covers: Anmore, Burnaby, Delta, Langley, New Westminster, Ridge Meadow, Surrey, Tri-Cities, Vancouver

**Overall Visual Impression:** Visually consistent and correctly templated — each community page opens on its own photo, carries its own intro, FAQ and closing copy. The template discipline is strong. Visual differentiation between communities rests on photography and copy only; no structural variation exists between them.

**Issues Found:**

*Brand:*
- **Medium** — All nine pages open with a banner that is structurally identical to every service page banner (same gradient, same layout, same CTA pair). Without reading the breadcrumb or H1, the pages are visually interchangeable at the banner level. This is an inherent risk of a consistent template, but at 9 community pages + 11 service pages, the accumulated sameness of all 20 pages having the identical opening treatment is notable.
- **Medium** — The per-community copy (intro paragraph, FAQ answers, local notes) was written for this build and has not been confirmed by the client. The pages appear factually specific but are invented. This is the same risk as the blog posts and testimonials.

*Imagery:*
- **Low** — None of the nine community photos was taken in its named city (noted in code). Alt text does not claim otherwise, which is correct, but a Burnaby resident who knows the skyline may notice the mismatch.

**Missing Visual Elements:**
- None — each community page has a photo, intro, services grid, FAQ, and closing band.

**Recommendations:**
1. Prioritise replacing location hero photos with photographs taken in or near the named communities. For a service company, local recognition in the imagery directly supports local trust signals.
2. Have the client confirm or correct the community-specific copy before launch.

---

## Blog Hub (/blog)

**Overall Visual Impression:** The blog hero heading "NOTES FROM THE WET COAST" is the most characterful heading on the entire site — two lines, genuine personality, says something the other page names don't. The section label ("From the Field") reinforces the voice.

**Issues Found:**

*Imagery:*
- **Medium** — The hero photo is a van-at-the-kerb stock frame described in code as "a stand-in twice over — stock standing in for the branded truck, and its source is squarer and smaller than the other banner frames." The crop is held slightly high to keep the van in frame. This shows in the screenshot: the photo feels less resolved than the service-page frames taken on location.

*Brand:*
- **Medium** — All six blog articles are placeholder copy: titles, dates, read times, and body content were written for the build. They appear at real URLs with real dates and appear in the sitemap. A search engine or visitor arrives at content that no person at RainCity has written or confirmed.
- **Low** — The nav label for this section reads "BLOGS" (plural, uppercase, in the nav bar). The page heading is "Blog" (singular). The inconsistency in naming is small but noticeable.

**Missing Visual Elements:**
- None structurally, but the post cards display no author attribution (by design — no byline until a real author exists), no reading progress indicator, and no category tags. These are appropriate omissions for the current state but will need to be addressed when real content arrives.

**Recommendations:**
1. Replace all six placeholder blog posts with client-confirmed content before launch. Until then, consider adding `noindex` to the blog routes.
2. Fix the nav label from "BLOGS" to "BLOG" to match the page identity.
3. Commission the branded fleet photo to replace the stock van frame in the blog hero.

---

## Blog Post Pages (/blog/[slug])

**Overall Visual Impression:** Clean, well-constrained editorial layout. The `max-w-prose` column for body copy and the `PostColumn` wrapper discipline keep the reading measure tight. Section labels, pull quotes, and captioned photos are all built into the `BlogBlock` type union.

**Issues Found:**

*Typography:*
- **Low** — Blog posts currently contain no author byline (correct — no real author yet). The absence is handled gracefully (no empty field), but the post header will need to evolve when real authors are named.

*Brand:*
- **Medium** — Same placeholder content concern as the Blog hub. The copy reads with authority and specificity ("moss treatment should be booked in September") but none of it has been confirmed by the company. Publishing these as finished articles with real dates is a trust liability.

**Missing Visual Elements:**
- No post-specific photography in the current placeholder posts. A captioned photo within a post body would improve visual rhythm on longer articles.

**Recommendations:**
1. Same as Blog hub: replace all six posts with real content before launch or add `noindex`.
2. When real authors exist, add the `Person` author block to both the byline and `BlogPosting` JSON-LD in the same pass.

---

## Blog Archive Pagination (/blog/page/[page])

Currently generates one route: `/blog/page/2` (six posts, two per page, with the featured strip suppressed).

**Overall Visual Impression:** Renders the same `BlogHero` banner, `BlogArchive` grid at page 2, and `QuoteForm` as the Blog hub — but without the two large featured-post cards that appear at the top of page 1. The visual grammar is identical; the only structural difference is the absence of the featured strip.

**Issues Found:**

*Brand:*
- **Low** — The page currently carries real metadata (`Blog, Page 2 | …`) and its own canonical URL, but the content beneath is the same placeholder blog posts as page 1, just the second half of the list. A crawler or visitor arriving here sees invented article summaries at a paginated URL that signals an active, growing archive. The same `noindex` or content-replacement recommendation that applies to `/blog` applies here.

*Hierarchy:*
- **Low** — The removal of the featured strip is correct editorial logic (a reader who is on page 2 has already seen the featured cards), but the transition from page 1 (with the large featured cards) to page 2 (without them) shifts the visual density abruptly. The gap will be obvious once real photography fills the featured cards but the grid cards remain smaller. No structural fix needed now, but it should be reviewed when real content is published.

*Motion / Color / Typography / Spacing / CTA:*
- No issues. All inherited from the Blog hub template, and all are correct there.

**Missing Visual Elements:**
- None beyond what is already noted for the Blog hub.

**Recommendations:**
1. Same as Blog hub: add `noindex` to this route until real content replaces the placeholder posts, so the paginated archive does not add a second indexed entry point for invented articles.
2. Review the visual step-change between page 1 (featured cards + grid) and page 2 (grid only) once real photography is in place — the shift in card scale may need a brief heading or visual separator to orient returning visitors.

---

## Contact (/contact)

**Overall Visual Impression:** Well-structured two-column layout (form + Google Maps embed). The map answers the "do you cover me?" question directly. The form field design (fog bg, 1 px line border, RC-blue labels, amber-ink error states) is tidy and on-system.

**Issues Found:**

*CTA:*
- **Critical** — The quote form on this page is the same non-functional component used sitewide. The form UI is polished but the backend is unconnected (TODO in code).

*Imagery:*
- **Low** — The contact hero photo (`contactHero`) is described in code as "lighter and foggier than the homepage hero frame so the two don't read as the same photo bookending the site." This is a good editorial decision. The photo is the foggy Greater Vancouver houses frame.

*Hierarchy:*
- No issues. The ContactHero → ContactDetails → QuoteForm → NextSteps sequence reads logically.

**Missing Visual Elements:**
- None.

**Recommendations:**
1. Wire the form to a server action or third-party form endpoint (Formspree, Resend, etc.) as the launch gate.
2. The Google Maps embed uses a plain `q=New+Westminster` query, not a pinned address. This is correct for a mobile business. No change needed.

---

## Legal Pages (/terms, /privacy-policy, /disclaimer, /refund-policy)

**Overall Visual Impression:** Appropriately restrained. The shorter hero (`py-section-sm`) signals "utility page, not a service page." The table of contents sidebar aids navigation on long documents. No CTA in the hero (correct — see code comment).

**Issues Found:**

*Imagery:*
- **Medium** — All four legal pages share the `rooftops` photo. Any visitor who reads more than one policy page sees the same banner four times. While the design rationale is sound (one photo that is "equally true of every page"), the pages feel visually identical at a glance.

*Brand:*
- **Critical** — All four policy pages contain unreviewed, unconfirmed placeholder legal text. The CLAUDE.md is explicit: these need a lawyer's review and the client's confirmation of operational numbers before launch. Specific exposure: the 24-hour cancellation window, 50% late-cancellation charge, 30-day quote validity, net-30 invoicing, and 7-day issue-reporting window are all written defaults, not supplied facts.

*Typography:*
- No issues. The LegalSections component renders `body` text at comfortable measure inside `max-w-prose`. Section headings use `display-s`.

**Missing Visual Elements:**
- None.

**Recommendations:**
1. Complete legal review and client operational confirmation before these pages go live. Add `noindex` to all four routes in the interim if the site launches before review is complete.
2. Consider assigning a distinct photograph to at least one of the four policy pages (e.g., a crew-at-work frame for Terms, the rooftops for Privacy) to reduce visual monotony across the policy section.

---

## 4. Design System Recommendations

The design system as implemented is strong. These recommendations are refinements, not rebuilds.

### 4a. Colour Roles (as-built, confirmed correct)

| Token | Role | Status |
|---|---|---|
| `#1A5FA8` RC-Blue | Rules, labels, links, service card notch, secondary buttons | ✅ Correct |
| `#0C2740` Navy | Headlines, header, footer, overlays, photo scrims | ✅ Correct |
| `#3D8FD4` Pacific | Hover, active nav, icon-on-navy, squeegee hairline | ✅ Correct |
| `#F5A314` Amber | Primary CTAs only (+ section label bars, award badge) | ✅ Correct |
| `#EEF2F6` Fog | Alternating sections, form fields, card backgrounds | ✅ Correct |
| `#5D6E7E` Steel | Body copy, captions, dividers | ✅ Correct |

**One refinement needed:** The mobile hero scrim opacity should be reduced (see Recommendation 4b).

### 4b. Mobile Scrim Opacity Fix

Current mobile hero gradient: `from-navy via-navy/80 to-navy/25`  
Recommended: `from-navy via-navy/65 to-navy/15`

This preserves legibility of the text (navy is still heavy at the base) while allowing the photograph to register through the upper portion of the frame. All text in the hero sits in the lower half, so reducing the top-end opacity does not affect readability.

### 4c. Type Scale (as-built, confirmed correct)

| Token | Usage | Notes |
|---|---|---|
| `display-xl` clamp(40–76px) | H1 hero headings | ✅ All hero h1s |
| `display-l` clamp(30–52px) | Section h2s | ✅ Consistent |
| `display-m` clamp(24–34px) | Sub-section h2s | ✅ QuoteForm heading, trust band |
| `display-s` 20px | Card titles, list heads, CTA labels | ✅ Consistent |
| `overline` 13px | Section labels (eyebrow text) | ✅ All SectionLabel instances |
| `body-l` 19px | Hero paragraphs, section leads | ✅ Correct usage |
| `body` / `body-s` 17 / 15px | Supporting copy | ✅ Consistent |
| `meta` 13px | Utility text, breadcrumbs, captions | ✅ Correct |

No changes recommended.

### 4d. Spacing (as-built, confirmed correct)

Section padding: `py-section` (clamp 56–128px) on main sections, `py-section-sm` (clamp 56–96px) on utility sections (QuoteForm, legal hero). Consistent throughout. No arbitrary values observed.

### 4e. Button Styles (as-built, confirmed correct)

| Variant | Background | Border | Text | Hover | Used for |
|---|---|---|---|---|---|
| `primary` | Amber | 2px amber | Navy | Navy bg, amber text | All primary CTAs |
| `secondary` | RC-blue | 2px rc-blue | White | Pacific bg | Section secondary CTAs |
| `tertiary` | Transparent | 2px navy | Navy | Navy fill | Less common |
| `tertiary-invert` | Transparent | 2px white | White | White fill, navy text | Hero secondary ("Call Us Now") |

**One gap:** The CTA label "Get A Quote" vs "Get A Free Quote" varies between contexts (header compact size vs hero). This is not a visual inconsistency (different contexts justify different label lengths) but unifying the label would sharpen the conversion message.

### 4f. Squeegee Edge (as-built, confirmed)

Used in: homepage hero (diagonal cut), logo mark (34 px cut), section transitions (navy ↔ white at 12°), before/after slider handle. Not used anywhere else. This constraint is well-maintained and should remain.

### 4g. Motion (as-built, confirmed correct)

Single vocabulary: opacity 0→1 + translateY 16→0, 500ms ease-out `[0.22, 0.61, 0.36, 1]`, once. `Reveal` for blocks, `Stagger`/`StaggerItem` for grids. No springs, scale, rotation, or parallax. `prefers-reduced-motion` honoured in CSS via `[data-motion]` attribute rather than in JS. No changes recommended.

---

## 5. Prioritised Action Plan

### CRITICAL — Required before any public traffic

- [ ] **Connect the quote form to a backend.** Server action, Formspree, Resend, or equivalent. Every amber "Get A Quote" button on the site is currently a dead end for leads.
- [ ] **Shoot or source the 8 missing service tile photos** (Concrete/Asphalt ×2, Holiday Lights ×3, Painting ×1, Snow Removal ×1, Landscaping ×1). If photography is delayed, collapse affected tiles to text-only rather than rendering hatch placeholders.
- [ ] **Hero photograph must be visible on mobile.** Reduce mobile scrim opacity to `from-navy via-navy/65 to-navy/15` (or equivalent) on all page heroes. The photo is the brand.

### HIGH — Required before public launch

- [ ] **Replace all 4 social icon links with real profile URLs**, or remove the entries for networks the company does not use. Three separate placements of dead UI (header, footer, awards) undermine credibility.
- [ ] **Have legal pages reviewed by a lawyer** and the client confirm all operational numbers (cancellation windows, charges, timelines). Add `noindex` to all four policy routes in the interim.
- [ ] **Replace all 6 blog posts with client-confirmed content** or add `noindex` to all blog routes. Content is currently indexed at real URLs with invented dates.
- [ ] **Replace the 4 placeholder testimonials** with real customer reviews. Remove the service attribution from the remaining 2 real reviews unless it can be verified.
- [ ] **Confirm or photograph the Projects section** with real RainCity before/after pairs. The illustrative disclaimer exists but does not protect the brand from appearing to misrepresent its portfolio.
- [ ] **Have the client confirm location-specific copy** for all 9 community pages. The geography is correct; the company voice and local knowledge have not been verified.
- [ ] **Have the client confirm social media profiles** and fill `sameAs` in LocalBusiness JSON-LD at the same time.

### MEDIUM — First iteration post-launch

- [ ] **Assign a distinct photo** to at least one legal page, or commission a new frame for the legal section, to reduce the visual monotony of four identical banners.
- [ ] **Replace the blog hero's stock van frame** with a photograph of RainCity's actual fleet once the vehicle wrap is complete.
- [ ] **Fix the nav label** from "BLOGS" to "BLOG" to match the page identity.
- [ ] **Replace stock Unsplash tile and card photography** with real job frames, starting with the three service pages that have client-supplied photos as a template (Window Cleaning, Commercial Cleaning, Power Washing).
- [ ] **Assign distinct hero photos** to location pages that were not photographed in their named community, as real job documentation becomes available.
- [ ] **Replace the `rooftops` photo** in either the Pillars section (homepage) or the Locations hub hero, so the image no longer appears in 3 unrelated contexts across the site.

### LOW — Post-launch polish

- [ ] **Unify the CTA label** between "Get A Quote" (header) and "Get A Free Quote" (hero) for a consistent conversion message across all placements.
- [ ] **Audit LinkedIn's absence from the footer** (currently `social.slice(0, 3)` cuts LinkedIn from the footer but shows it in header and awards). Decide whether to include all 4 everywhere or remove LinkedIn from the other two locations.
- [ ] **Add a branded fleet photo** to the overall photo library for future use across the blog, about, and other sections.
- [ ] **Consider adding a `Call Us Now` CTA** to the About page hero and Services hub hero to fully align their grammar with the service and location page heroes.
- [ ] **Add post-specific photography** to blog articles once real content is written, to improve visual rhythm on longer posts.
- [ ] **When real authors are named**, add the `Person` author block to the blog post byline and `BlogPosting` JSON-LD simultaneously.
- [ ] **When real customer reviews are in place**, add `Review` and `AggregateRating` JSON-LD to the `lib/seo.tsx` schema (currently intentionally omitted per the code comment).

---

*This document is an audit only. No design or code changes have been made. All recommendations await further instructions.*
