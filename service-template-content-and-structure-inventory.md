# RainCity Service Page Template — Content & Structure Inventory

**Source analyzed:** https://raincitypms.com/window-cleaning/
**Purpose:** This is the shared Elementor template used for all individual service pages (Office Cleaning, Commercial Cleaning, Window Cleaning, Roof Cleaning, Gutter Cleaning, Asphalt Washing, Power Washing, Snow Removal & Salting, Driveway Sealing, Concrete Sealing, Holiday Light Installation, Landscaping & Lawn Care). Window Cleaning is used as the representative example.

**Header nav & footer:** Confirmed identical to the homepage (same logo, same nav menu with dropdowns for Services and Locations, same "Get A Quote" button, same footer columns, social links, contact info, hours, and legal links). Per your instruction, these are **not detailed below** since they don't differ from the homepage — they are fixed/global template elements, not part of the per-service content.

---

## 1. Hero Section

**Position:** Top of page, immediately below header nav.

**Text content (verbatim):**
- Eyebrow label: "RAINCITY PROPERTY MAINTENANCE"
- H1: "Crystal Clear Window Cleaning Services"
- Body copy: "Restore clarity and shine to your property with RainCity's professional window cleaning services. We clean windows on homes, storefronts, offices, and multi-storey buildings."
- Button 1: "Get a Free Quote" (links to /get-in-touch/)
- Button 2: "Call Us Now" (tel: link)

**Purpose:** Immediately identifies which service the page is about, states the core value proposition, and gives two conversion paths (form quote or direct call) above the fold.

**Non-text elements:** No image/graphic elements were captured in the page's text/markup extraction beyond the two CTA buttons (a phone-call button and a quote-request button). No hero photo or background image element was present in the extracted content — if the live design shows a background image, it is implemented as a CSS background rather than an `<img>` element, so it is not confirmed here.

**Per-service variable vs. fixed:**
- **Variable:** Eyebrow label pattern stays the company name (fixed), but H1 and body copy are fully service-specific text, rewritten per service.
- **Fixed:** Button labels/structure ("Get a Free Quote" / "Call Us Now"), the two-CTA layout pattern, and the destination links (same quote page and phone number every time).

---

## 2. Service Overview Section

**Position:** Second section, directly below hero.

**Text content (verbatim):**
- Eyebrow label: "OUR SERVICE"
- H2: "Expert Window Cleaning in New Westminster & Greater Vancouver"
- Body copy: "Clean windows significantly improve your property's appearance and allow more natural light inside. Our streak-free window cleaning technique ensures spotless results."
- Subhead: "What's Included:"
- Bulleted list:
  - Residential & commercial window cleaning
  - Interior and exterior window cleaning
  - Screen & frame cleaning
  - Skylight cleaning
  - Hard water stain removal
  - Multi-storey building window cleaning
- Button: "Book Your Window Cleaning Today" (links to /get-in-touch/)
- Subhead: "Why Choose RainCity?"
- Bulleted list:
  - Fully licensed & insured
  - Serving Greater Vancouver since 2018
  - Residential, commercial & strata
  - Free, no-obligation quotes
  - 100% satisfaction guaranteed
- Line: "Have questions? Call us:"
- Phone link: "+1 604 209 3357"

**Purpose:** Provides the substantive service description and scope (what the customer is actually buying), builds trust/credibility, and offers a second, mid-page conversion point plus a low-friction "just call us" fallback.

**Non-text elements:** No photo, video, or form elements were present in the extracted content for this section — it's copy and list content plus two contact CTAs (button + phone link).

**Per-service variable vs. fixed:**
- **Variable:** H2 headline (service name + location phrase), body copy paragraph, the entire "What's Included" bullet list (specific to window cleaning — will list different tasks on each service page), and the CTA button label (references the specific service, e.g. "Book Your Window Cleaning Today").
- **Fixed/repeated:** "OUR SERVICE" eyebrow label; the entire "Why Choose RainCity?" block (headline + 5 bullets) — generic company trust points, not service-specific, so almost certainly identical across every service page; "Have questions? Call us:" line and phone number.

---

## 3. How It Works Section

**Position:** Third section, below Service Overview.

**Text content (verbatim):**
- Eyebrow label: "HOW IT WORKS"
- H2: "Our Simple 3-Step Process"
- Step 01 — "Request a Free Quote" — "Contact us online or by phone for a free quote tailored to your needs."
- Step 02 — "We Schedule & Arrive" — "We book a time that works for you and arrive on time with all equipment ready."
- Step 03 — "Enjoy the Results" — "Sit back and enjoy exceptional results. We guarantee your satisfaction every time."

**Purpose:** Reduces friction/uncertainty by explaining the customer journey in three simple, generic steps, reinforcing ease and reliability before the final ask.

**Non-text elements:** Numbered step indicators (01/02/03) function as the only non-text/graphic element; no photos, icons content, or media were present in the extracted text beyond these numerals.

**Per-service variable vs. fixed:**
- **Fixed/repeated in full:** Nothing here references window cleaning or any specific service — headline, all three step titles, and all three step descriptions are generic and will be identical on every service page.

---

## 4. Final CTA Section

**Position:** Bottom of page, above footer.

**Text content (verbatim):**
- H2: "Ready for Professional Window Cleaning?"
- Body copy: "Get a free quote today. Serving New Westminster and all of Greater Vancouver."
- Button: "Get Your Free Quote" (links to /get-in-touch/)
- Phone link: "+1 604 209 3357"

**Purpose:** Final conversion push before the visitor leaves the page/reaches the footer — restates the offer and gives one more chance to act via quote form or phone.

**Non-text elements:** A secondary/watermark company logo image appears in this section (linked back to the homepage). No other photo, video, or form elements were present in the extracted content.

**Per-service variable vs. fixed:**
- **Variable:** H2 headline references the specific service ("Ready for Professional Window Cleaning?").
- **Fixed/repeated:** Body copy line (location-only, not service-specific — will likely repeat verbatim), button label "Get Your Free Quote," the logo image, and the phone link.

---

## Summary: Per-Service Variable vs. Fixed Content

| Element | Status |
|---|---|
| Hero H1 | Variable (service name/headline) |
| Hero body copy | Variable |
| Hero CTA buttons (labels/links) | Fixed |
| "OUR SERVICE" eyebrow | Fixed |
| Service Overview H2 | Variable |
| Service Overview body copy | Variable |
| "What's Included" list (all items) | Variable |
| Service Overview CTA button label | Variable (references service name) |
| "Why Choose RainCity?" block (full) | Fixed |
| "Have questions? Call us" + phone | Fixed |
| "HOW IT WORKS" section (full: eyebrow, H2, all 3 steps) | Fixed |
| Final CTA H2 | Variable (references service name) |
| Final CTA body copy | Fixed |
| Final CTA button + logo + phone | Fixed |
| Header nav | Fixed (identical to homepage) |
| Footer | Fixed (identical to homepage) |

**Note on photos/media:** The text-based extraction used for this inventory did not surface any `<img>`-based photo content within the four body sections (only two logo images: one in the header, one in the Final CTA section). If the live template includes per-service photography, it is most likely implemented as a CSS background image rather than an `<img>` tag, and so would need a separate visual/DOM check to confirm and catalog — this inventory only reports what was verifiable in the extracted text/markup.
