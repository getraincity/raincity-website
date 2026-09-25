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
- [x] **Office hours → Mon – Sat, 8 am – 4 pm, closed Sunday** (final
  correction, later the same day; 9–5 before that). Changed everywhere the
  hours appear: the footer, the hero, the contact page, both FAQs, the Google
  structured data and llms.txt. They are always called **Office Hours**,
  never "work" or "working" hours, on the client's request.

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
  - Glevin's photo added (sent later the same day). It came as a circle on
    black, so its edge was softened into a square dark studio-style frame to
    sit in the same card shape as Wilson's.
- [x] **Our Process photo** → the client's photo of the surface cleaner in
  the parkade.
- [x] ~~Memberships row added under Our Affiliates & Partnerships~~ —
  removed again later the same day at the client's request: the homepage
  already shows the memberships, so /about carries only its nine partners.

### Follow-up round (later on 2026-09-25)
- [x] **Logos bigger in their boxes**, on the homepage and /about: each logo
  is now sized to cover about the same area, so the less-wide ones (New
  West Spotlight, Hello Gubby, Tri-Cities, the square crests) grow instead
  of sitting small in the middle. New West Spotlight went from about 108x48
  to 176x82 on desktop. The Hello Gubby and Tri-Cities files had their
  white margins trimmed.
- [x] **The phone number opens WhatsApp**, with the WhatsApp logo beside it,
  everywhere the number is shown: the top bar, the mobile menu, the footer,
  the contact page, the quote form, and the buttons at the end of each
  service, location and about section. The "Call Us Now" buttons (which
  don't print the number) still make a phone call, so calling is one tap
  away too.
- [x] **Memberships & Partnerships removed from /about** (see above).
- [ ] **Crystal Clear Cleans' clean logo**: the picture didn't come through;
  waiting for it to be resent.

### Services
- [x] **"See the Work Up Close" gallery on every service page.**
  - Clicking a project opens a photo viewer: arrow keys or the previous/next buttons,
    thumbnails, Esc or a click outside to close.
  - **Three columns on every service page.** Real projects on Balcony
    Cleaning (2), Power Washing (4), Window Cleaning (1) and Roof Cleaning (1)
    come first. Labelled example photos then fill each row to three
    (Balcony +1, Window +2, Roof +2, Power Washing +2, which gives two full
    rows). As real job photos arrive, they replace the examples one by one.
  - **No placeholders anywhere** (later the same day). The other eight
    services show three example photos each under "What This Work Looks
    Like", labelled as example photos and not RainCity jobs. They are
    free-licence stock photos. Photos from other companies' websites were not
    used: they belong to those companies, and showing them as RainCity's work
    would mislead customers. Each service's examples disappear automatically
    once its first real job photos are added.

### Locations
- [x] **Missing picture fixed** on /locations (Coverage) and on all nine
  community pages ("On the Map"). There is still no Google Maps key, so these
  show a photograph of the region: the Fraser at the Port Mann Bridge, with
  Burnaby behind. The map comes back automatically if a key is ever added.
- [x] Content double-checked ("just make sure all contents are good"): the
  community pages carry no old hours, no old travel or minimum wording, and
  no broken links.

## Still needed from the client
1. **The founders' original photo files**: Wilson's WhatsApp copy is 480x550
   and Glevin's is 340x490 (already cut to a circle), and both look soft on
   high-resolution screens. The uncropped originals would fix both.
2. **Project photos for the other eight services**: before and after of the
   same job, ideally from the same spot. More photos of the eight jobs
   already up can go in their viewers too.
3. A larger Tri-Cities Business Networking Group logo, if one exists.
4. From earlier rounds and still open: the policy pages' legal review, the
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
