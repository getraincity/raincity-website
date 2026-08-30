# RainCity Locations Page — Content \& Structure Inventory

**Source analyzed:** https://raincitypms.com/anmore/ (used as the definitive shared template for all `/\[location]/` pages)
**Scope:** Content and structure only — no design, layout, or visual commentary included.

\---

## Header Nav \& Footer

Compared directly against the homepage (https://raincitypms.com/) — **both are identical in content and structure to the homepage** (same logo, same top bar phone/email, same primary nav with the same Services and Locations dropdown items, same "Get A Quote" header CTA, and an identical footer: tagline, social icons, Contact Info, Open Hours, Quick Links, Additional Links, copyright line). Per your instructions, these are omitted from the detailed inventory below since they don't differ from the homepage. They should be treated as **fixed, sitewide content** — not part of the per-location template variation.

One nav note relevant to content structure: the "Locations" dropdown lists all 9 locations (Anmore, Burnaby, Delta, Langley, New Westminster, Ridge Meadow, Surrey, Tri-Cities, Vancouver), but only "Anmore" is a live link — the other 8 currently point to `#`.

\---

## Section 1 — Hero / Location Intro Banner

**Position:** 1 (top of page, directly under header)

**Text content (verbatim):**

* Eyebrow label: "RAIN CITY PROPERTY MAINTENANCE"
* Headline (H2): "Property Care Across Anmore"
* Body copy: "RainCity Property Maintenance is dedicated to protecting and revitalizing properties throughout Anmore with our premium exterior cleaning, professional sealing, and comprehensive janitorial services. Our fully insured, highly skilled technicians bring reliable, detail-oriented, and customized care to both local homeowners and business managers across the community."
* Button: "Get A Quote" (links to `#`)

**Purpose:** Above-the-fold introduction that establishes "we serve \[this city]" immediately, states the core service categories, and drives a first quote request.

**Non-text elements:** One photo (exterior/pressure-washing themed image).

**Variable vs. Fixed:**

* **Variable:** "Anmore" — appears twice (headline + body copy). This is the only location-specific substitution in this section.
* **Fixed:** Eyebrow label, entire body paragraph structure/wording (aside from the city name), and CTA button label/behavior are identical template elements repeated on every location page.

\---

## Section 2 — Premium Service Standards (3-item feature strip)

**Position:** 2

**Text content (verbatim):**

* Eyebrow label: "Premium Service Standards"
* Feature 1 — Heading: "Certified Care Experts" / Body: "Trained and certified technicians deliver safe, professional service on every project. Reliable workmanship with consistently high-quality results."
* Feature 2 — Heading: "Advanced Cleaning Systems" / Body: "We use industrial-grade equipment and eco-safe solutions for deeper, more effective cleaning. Ensures durability, safety, and superior surface restoration."
* Feature 3 — Heading: "On-Time Service Delivery" / Body: "Fast and well-organized scheduling with efficient on-site execution. Ensures durability, safety, and superior surface restoration."

*(Note: Features 2 and 3 share the identical closing sentence — "Ensures durability, safety, and superior surface restoration." — appears to be reused/copy-pasted rather than unique copy.)*

**Purpose:** Quick trust/credibility bar reinforcing certification, equipment quality, and reliability before the services list.

**Non-text elements:** Each of the 3 items has an accompanying icon (icon graphics only — no photos).

**Variable vs. Fixed:** 100% **fixed** — no location references at all. Identical across every location page.

\---

## Section 3 — Services Grid

**Position:** 3

**Text content (verbatim):**

* Eyebrow label: "Our Services"
* Headline (H2): "Certified Exterior Washing Solutions in Anmore"
* 9 service cards, each with a title and one line of body copy:

  1. **Office cleaning** — "Office cleaning for spotless, healthy spaces. Book now for a fresh and productive work environment today!"
  2. **Commercial cleaning** — "Commercial cleaning for spotless, healthy spaces. Book now for a fresh and productive work environment today!"
  3. **Power washing** — "Power washing for spotless, healthy surfaces. Book now for a fresh and well-maintained property exterior today!"
  4. **Asphalt washing** — "Asphalt washing for spotless, healthy surfaces. Book now for a fresh and well-maintained property exterior today!"
  5. **Concrete sealing** — "Concrete sealing for strong, protected surfaces. Book now to enhance durability and long-lasting performance today!"
  6. **Driveway sealing** — "Driveway sealing for strong, protected surfaces. Book now to enhance durability and long-lasting performance today!"
  7. **Window cleaning** — "Window cleaning for crystal-clear, spotless glass. Book now for brighter views and a clean, polished finish today!"
  8. **Gutter cleaning** — "Gutter cleaning for clear, efficient drainage. Book now to protect your property from water damage today!"
  9. **Roof cleaning** — "Roof cleaning for a clean and damage-free surface. Book now to protect your home and extend roof life today!"
* Button: "Explore Our Services" (links to `#`)

**Purpose:** Service catalog overview, each card presumably intended to link to its respective service page.

**Non-text elements:** One photo per service card (9 photos total).

**Content anomaly to flag:** This grid only shows **9 of the 12 services** listed in the main nav / homepage (missing: Snow Removal \& Salting, Holiday Light Installation, Landscaping \& Lawn Care). Also, several card titles/paragraphs link out to an unrelated staging domain (`mediumvioletred-newt-586622.hostingersite.com`) instead of `raincitypms.com` service pages (seen on "Office cleaning," "Commercial cleaning," and "Asphalt washing"); the other 6 cards have no link at all in the current markup. This looks like leftover placeholder/staging links rather than intentional content.

**Variable vs. Fixed:**

* **Variable:** "Anmore" in the H2 headline only.
* **Fixed:** Eyebrow, all 9 service titles/descriptions, and CTA — identical wording to the homepage's own services section (the homepage section header is "Our Professional Property Maintenance Services" instead, but the individual card copy is word-for-word the same).

\---

## Section 4 — Value Proposition ("Effortless Home Exterior Restorations")

**Position:** 4

**Text content (verbatim):**

* Sub-label: "Uncompromising Quality Standards"
* Headline (H2): "Effortless Home Exterior Restorations"
* Intro body: "Relax while our dedicated property maintenance professionals arrive right on schedule for your appointment. Enjoy the peace of mind that comes with a beautifully maintained."  *(sentence appears cut off/incomplete — no object after "maintained")*
* Sub-block 1 — Heading: "Why Partner With RainCity Property Maintenance?" / Body: "We take immense pride in delivering comprehensive property care solutions tailored to your exact needs. Our expert team utilizes highly effective, industry-approved cleaning and protection techniques to keep your premises meticulously maintained year-round."
* Sub-block 2 — Heading: "Tailored Care for Your Busy Schedule" / Body: "Life gets busy, and property needs can change unexpectedly, which is why RainCity is always ready to adapt. Whether you need to reschedule, skip a session, or adjust your maintenance plan, we offer total flexibility."

**Purpose:** Mid-page "why choose us" reassurance block covering reliability, expertise, and scheduling flexibility.

**Non-text elements:** One photo associated with this section.

**Variable vs. Fixed:** 100% **fixed** — no location references. Identical across every location page. (Not present on the homepage in this form — this appears to be a section unique to the location-page template.)

\---

## Section 5 — Locations Tab/List Widget (placeholder content)

**Position:** 5

**Text content (verbatim):**

* Heading: "This is the heading"
* Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
* List of 9 city names, appears to function as tabs/links: Anmore, Burnaby, Delta, Langley, New Westminster, Ridge Meadow, Surrey, Tri-Cities, Vancouver

**Purpose:** Appears to be intended as a locations selector/directory widget (likely a tabbed component meant to show different content per city), but is currently unfinished.

**Content anomaly to flag:** The heading and body copy are unedited **Lorem ipsum placeholder text** — this section has not been populated with real content on the live page.

**Non-text elements:** One photo appears adjacent to this block in the page markup (exact association is approximate due to how the page was extracted).

**Variable vs. Fixed:** The city list itself is a **fixed, sitewide list** (same 9 cities, same order, repeated on every location page). The heading/body are placeholder and, once written, would presumably also be fixed/generic rather than per-location.

\---

## Section 6 — Local SEO Copy Block ("RainCity Proudly Serves \[Location]!")

**Position:** 6

**Text content (verbatim):**

* Headline (H2): "RainCity Proudly Serves Anmore!"
* Paragraph 1: "RainCity Property Maintenance is dedicated to protecting and revitalizing properties throughout Anmore with our premium exterior cleaning, professional sealing, and comprehensive janitorial services. Our fully insured, highly skilled technicians bring reliable, detail-oriented, and customized care to both local homeowners and business managers across the community." *(identical to the Section 1 hero paragraph — reused verbatim)*
* Paragraph 2: "Whether your property requires a powerful seasonal deep clean, proactive preventative maintenance like driveway sealing, or routine commercial office sanitization, our team is equipped to fit perfectly into your schedule without forcing you into restrictive contracts. While we are deeply committed to servicing our clients in Anmore, our specialized mobile units also deliver exceptional property care across Port Moody, Coquitlam, Port Coquitlam, Burnaby, Vancouver, New Westminster, Surrey, Langley, Maple Ridge, and Pitt Meadows."
* Button: "Contact Us Today" (links to `#`)

**Purpose:** This is the page's primary local/SEO-oriented content block — reinforces the city name multiple times and names the surrounding service area, which is the main differentiator between location pages.

**Non-text elements:** A horizontal divider; no image in this section.

**Variable vs. Fixed:**

* **Variable:** Headline ("...Serves Anmore!"), "throughout Anmore" and "servicing our clients in Anmore" in the body, and — most importantly — the list of surrounding communities ("Port Moody, Coquitlam, Port Coquitlam, Burnaby, Vancouver, New Westminster, Surrey, Langley, Maple Ridge, and Pitt Meadows"). This surrounding-area list is genuinely Anmore-specific geography and should change per location page.
* **Fixed:** Paragraph 1 is boilerplate reused word-for-word from the hero section; the sentence structure of Paragraph 2 aside from the city/area names is templated.

\---

## Section 7 — Quote Request Form

**Position:** 7

**Text content (verbatim):**

* Heading: "Request a Free Quote"
* Form fields:

  * Full Name (text input)
  * Phone Number (text input)
  * Email (text input)
  * Address (text input)
  * Choose a Service (dropdown) — options: Pressure Washing, Window Cleaning, Gutter Cleaning, Driveway Sealing, Roof Cleaning, Other
  * Preferred Date (date input)
  * Additional Information (text area)
* Buttons: "Get a Quote" (submit), "Book Now"

**Purpose:** Primary lead-capture form for the page.

**Non-text elements:** Full form UI (7 fields + 2 buttons as listed above). No map or file upload elements present.

**Variable vs. Fixed:** 100% **fixed** — identical field set and labels to the form on the homepage. No location-specific fields (e.g., no pre-filled or hidden "location" field visible in the rendered content).

\---

## Section 8 — Closing CTA ("Book a Professional Property Care in \[Location]")

**Position:** 8 (bottom of page, before footer)

**Text content (verbatim):**

* Headline (H2): "Book a Professional Property Care in Anmore"
* Body 1: "Ready to elevate your property's appearance in Anmore? Simply fill out our quick form to request a free estimate or schedule your premium maintenance services. Our fully insured team handles everything with clear communication."
* Body 2: "From specialized surface sealing and power washing to commercial janitorial cleaning, we keep the entire process effortless and stress-free from start to finish."

**Purpose:** Final closing pitch/reminder to use the form above, restating the city name once more for local relevance and SEO.

**Non-text elements:** A horizontal divider and one photo.

**Variable vs. Fixed:**

* **Variable:** "Anmore" — appears twice (headline + first line of Body 1).
* **Fixed:** Both body paragraphs otherwise, aside from the city name substitution.

\---

## Map / Gallery Check

No embedded map (e.g., Google Maps iframe) and no photo gallery component were found anywhere on this page.

\---

## Summary: Per-Location Variable Content vs. Fixed Template Content

**Variable (changes per location):**

* City name "Anmore" — appears in: hero headline, hero body copy, services-grid headline, local SEO headline, local SEO body (x2), closing-CTA headline, closing-CTA body, and page `<title>`/meta.
* The list of surrounding/nearby service communities in Section 6, Paragraph 2 (this is the one piece of copy that is substantively different information per location, not just a name swap).
* Presumably the Locations-dropdown "current page" state and the city tab list in Section 5 (once populated) would highlight/relate to the current location, though this can't be confirmed since Section 5 is still placeholder text.

**Fixed (identical across every location page, including this one and the homepage where noted):**

* Full header nav and footer.
* Section 2 (Premium Service Standards) — entirely generic, no edits needed.
* Section 3's 9 service card titles/descriptions and CTA button.
* Section 4 (Effortless Home Exterior Restorations) — entirely generic.
* Section 5's Lorem ipsum placeholder heading/body and the 9-city list itself.
* Section 6, Paragraph 1 (duplicated verbatim from the hero).
* Section 7, the entire quote form (fields, labels, dropdown options, buttons).
* Section 8's body copy structure aside from the city name.
* All CTA button labels ("Get A Quote," "Explore Our Services," "Contact Us Today," "Get a Quote," "Book Now").

**Open items worth flagging to the client/dev team (content/structure, not design):**

1. Section 5 still contains unedited Lorem ipsum placeholder copy.
2. Services grid (Section 3) is missing 3 of the 12 site-wide services (Snow Removal \& Salting, Holiday Light Installation, Landscaping \& Lawn Care).
3. Several service card links in Section 3 point to an unrelated staging/hosting domain rather than the live site's service pages; most other cards have no link at all.
4. Multiple CTA buttons across the page (`Get A Quote` in hero, `Explore Our Services`, `Contact Us Today`, `Book Now`) currently link to `#` rather than a real destination or confirmed modal trigger.
5. The Locations dropdown in the nav only has a working link for Anmore; the other 8 cities point to `#`, consistent with the fact that (per your note) this is the only location page live/checked so far.

