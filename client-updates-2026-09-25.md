# Client updates — 2026-09-25

Source: the client's feedback doc (Google Docs, "Feedback RainCity"), Wilson's
portrait sent on WhatsApp, and Touseef's instructions and answers the same day.
The previous round is `client-updates-2026-09-23.md`.

## Done

### Homepage
- [x] **Before & after uses the client's real work** — 16 photos, 8 jobs
  (two balconies, garden benches, glass patio cover, roof, siding, paver
  path, stone wall and entry). Side-by-side pairs, 4 shown plus "Show More
  Projects". Stock pairs and the "illustrative" disclaimer removed. Each card
  links to its service.
- [x] **Memberships & Partnerships — all six logos from the client**:
  - New West Spotlight: the client's file, replacing the Facebook badge.
  - **Zensurance**: *not* "Zen Insurance". The client's logo is Zensurance's
    wordmark, so the entry was corrected; the logo is the SVG from
    zensurance.com and the card links there.
  - **Hello Gubby**: *not* "Hello Gabby". The client's logo is Hello Gubby's
    rabbit (hellogubby.ai, a Vancouver AI front desk). Corrected, the wrong
    company's logo file deleted, and the logo taken at 2x from their site.
  - Tri-Cities Business Networking Group: the client's file (border
    trimmed). There's still no website, so there's no link.
- [x] **Footer hours → Mon – Sat: 9 am – 5 pm, closed Sunday.** Changed
  everywhere the hours appear: the footer, the hero, the contact page, both
  "What are your hours?" FAQs, the Google structured data and llms.txt.

### About
- [x] **By the numbers rebuilt** ("looks funny, something missing"): it now
  has a heading and a line of context, a sentence under each figure, and the
  real Google rating (5.0 from 17) as a fourth figure with a link.
- [x] **Founders**:
  - Wilson's photo added, with the role *Quality Control Inspector / Site
    Supervisor*.
  - Glevin is spelled as the client writes it, with the role *Operations
    Coordinator / Office Administrator*.
  - Both bios describe what each person does.
  - Glevin's photo is still to come; the card keeps its navy "G" plate until
    it arrives.
- [x] **Our Process photo** → the client's photo of the surface cleaner in
  the parkade.
- [x] **Memberships row** added under Our Affiliates & Partnerships (Touseef's
  choice). CFIB appears only once on the page.

### Services
- [x] **"See the Work Up Close" gallery on every service page.**
  - Clicking a project opens a photo viewer: arrow keys or the previous/next buttons,
    thumbnails, Esc or a click outside to close.
  - Real projects already on Balcony Cleaning (2), Power Washing (4), Window
    Cleaning (1) and Roof Cleaning (1). Every other service shows three "Project
    Photos Coming Soon" placeholders.

### Locations
- [x] **Missing picture fixed** on /locations (Coverage) and on all nine
  community pages ("On the Map"). There is still no Google Maps key, so these
  show a photograph of the region: the Fraser at the Port Mann Bridge, with
  Burnaby behind. The map comes back automatically if a key is ever added.
- [x] Content double-checked ("just make sure all contents are good"): the
  community pages carry no old hours, no old travel or minimum wording, and
  no broken links.

## Still needed from the client
1. **Glevin's photo** (portrait, face visible; any size, larger is better).
2. **Wilson's original photo file**: the WhatsApp copy is 480x550 and looks
   soft on high-resolution screens.
3. **Project photos for the other eight services**: before and after of the
   same job, ideally from the same spot. More photos of the eight jobs
   already up can go in their viewers too.
4. A larger Tri-Cities Business Networking Group logo, if one exists.
5. From earlier rounds and still open: the policy pages' legal review, the
   placeholder blog posts, and the "Off The Clock" community content.

## Verified (production build)
- Typecheck is clean. 53 pages build, and 1,286 internal links have 0 broken.
- No page scrolls sideways at 320, 375, 768 or 1440 px.
- 27 key pages return 200 with no console errors (apart from the documented
  Bing pixel) and valid JSON-LD.
- `check-layout` passes on all 12 service pages, now including the gallery
  heading.
- "Show more" and the photo viewer were tested with the keyboard and the
  mouse at 1440 and 375 px: 40/40 checks pass.
- No content from `content.ts` leaks into the client JS bundles.
