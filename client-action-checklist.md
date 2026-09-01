# RainCity Property Maintenance — Client Action Checklist

**Prepared:** September 1, 2026  
**Purpose:** Items that need client (or legal) input before the site goes live.
Nothing on this list is a code problem — every one of them is either a decision
only the client can make or a sign-off that has to come from outside the build.

---

## 1. Legal Pages (two sign-offs required, not one)

Both the Privacy Policy (`/privacy-policy`) and Terms & Conditions (`/terms`)
are published on the site with `noindex` set. They will not rank in search, but
they are reachable from the footer and any external link can reach them. They
must not go live (noindex removed) until both gates below are clear.

**Gate A — Legal review**
A licensed BC lawyer or paralegal needs to read both pages. The clauses with
the most exposure are:

| Clause | Why it matters |
|---|---|
| Limitation of liability (Terms §Liability) | Sets the ceiling on what RainCity can owe a customer; if the cap is unenforceable, it falls away entirely |
| PIPA/PIPEDA rights section (Privacy §Your Rights) | States a 30-day response window — if that window is not operationally realistic, it becomes a commitment the office has to meet |
| Governing law (Terms §Governing Law) | Sets BC courts as exclusive jurisdiction; review before publishing |

**Gate B — Client confirms the operational numbers**
The following figures were written as plausible defaults. Every one of them
needs to match what the office actually does:

| Field | Current value | Where it appears |
|---|---|---|
| Cancellation window | 24 hours | Terms §Scheduling |
| Late-cancellation charge | 50% of quoted price | Terms §Scheduling |
| Deposit: cancellation terms | covered under Terms | Terms §Guarantee |
| Quote validity | 30 days | Terms §Quotes |
| Payment terms | Net-30 for commercial clients | Terms §Payment |
| Issue-reporting window | 7 days after job completion | Terms §Guarantee |
| Return-visit timeline | within 5 business days | Terms §Guarantee |
| Refund timeline | within 10 business days | Terms §Guarantee |
| Privacy request response | 30 days | Privacy §Your Rights |
| Quote-request retention | 12 months if no booking | Privacy §Retention |
| Job-record retention | 7 years | Privacy §Retention |

**Action:** Forward both pages (URLs below) to your lawyer, confirm the
operational numbers above, and report back. The noindex will be removed in the
same commit after both confirmations arrive.

- `/privacy-policy`
- `/terms`

---

## 2. Testimonials

The carousel on the homepage carries six testimonials. Only the first two came
from the client's own website; the remaining four were written to fill the
carousel and do not represent real customers. A disclaimer is displayed above
the carousel while placeholder entries are present.

**Action required before removing the disclaimer:**
- Replace the four invented testimonials with real customer reviews
- For each real review, confirm the customer's name and the service they used
- Once real reviews are in place, set `testimonials.verified: true` and
  fill in `averageRating` and `reviewCount` in `lib/content.ts` — this
  activates the Google AggregateRating schema automatically

---

## 3. Blog Posts

Six blog articles are published at `/blog/[slug]`. All six were written for the
build. The advice reads as RainCity's and is not — no one at RainCity has
confirmed the timing recommendations, method descriptions or seasonal claims.
All blog routes are set to `noindex` until this is resolved.

**Action required before removing noindex:**
- Replace each article with content the client has reviewed and approved
- Confirm any article that states a specific timing ("treat in March"), method
  ("apply at 200 psi") or fact ("moss returns in 18 months")
- Optionally: add an author (`author: { name, title }` per post in
  `lib/content.ts`) — a byline and Person schema activate automatically when
  set

**Current post titles (all placeholder):**
1. "The Fortnight Before The Rain — Your Pre-Season Exterior Checklist"
2. "Why The North Wall Greens Over First"
3. "Strata Exterior Maintenance: What Your Schedule Should Look Like"
4. "Sealing A Driveway Between Two Rainstorms"
5. "Window Cleaning in November: What Changes When The Weather Turns"
6. "Three Days Of Snow: What to Do Before, During and After"

---

## 4. Social Media Profile URLs

The footer shows four social icons (Facebook, Instagram, X, LinkedIn). Every
link currently points to `#` — clicking them goes nowhere. This is intentional:
a wrong handle would send visitors to a stranger's account under RainCity's
name, which is worse than a dead link.

**Action required:**
- Supply the actual profile URL for each network the company uses:
  - Facebook: `https://facebook.com/...`
  - Instagram: `https://instagram.com/...`
  - X (Twitter): `https://x.com/...`
  - LinkedIn: `https://linkedin.com/company/...`
- For any network RainCity does not have a presence on, confirm it should be
  removed from the footer entirely

Once the real URLs are in `lib/content.ts → social[].href`, the icons become
live links and the `sameAs` array in the LocalBusiness schema activates
automatically.

---

## 5. Location-Specific Copy

Nine community pages (`/locations/[slug]`) carry introductory paragraphs, local
notes, FAQ answers and closing lines written for the build. The geography is
checkable; no operational commitments (response times, crew counts, schedules)
were invented. All nine routes are set to `noindex` until the client has
reviewed the copy.

**Action required:**
- Read each community page and confirm the copy is accurate and consistent with
  how RainCity actually operates in that area
- Correct any sentence that doesn't match the client's experience or coverage

**Communities to review:**
Anmore · Burnaby · Delta · Langley · New Westminster · Ridge Meadows ·
Surrey · Tri-Cities · Vancouver

---

## 6. Photography — Eight Missing Service Tile Slots

Eight service-page image tiles currently display as text-only panels (grey
background with title and description). These are holding slots for photographs
that need to be taken on real jobs. The registry entry for each slot includes a
shot brief explaining what the photograph should show.

**Action required (photography, not code):**
Jobs to photograph:

| Service | Slot | What the brief calls for |
|---|---|---|
| Gutter Cleaning | Scope tile | Timestamped service log on a tailgate |
| Christmas Lights | Scope tile | Labelled light coils going into a bin |
| Caulking & Sealing | Scope tile | Caulk bead being tooled |
| Concrete & Asphalt Sealing | Scope tile | Two sealer test squares on one slab |
| Pressure Washing | Scope tile | Oil spot being degreased |
| Soft Washing | Scope tile | Mid-season light repair in the rain |
| Snow & Ice | Scope tile | Tied debris bags on a drive |
| Landscaping | Scope tile | Layout sketch held against a frontage |

Once a photograph is ready: save the webp at the `src` path shown in
`lib/photos.ts` for that slot and delete its `placeholder:` line. No other code
changes are required.

---

## 7. Branded Fleet Photograph

`lib/photos.ts` has a `fleet` registry slot ready — alt text, aspect ratio, and
shot brief already set. No image exists yet; the slot renders as a clean grey
panel wherever it is used. The blog hero currently uses a residential
evergreens-and-fog photograph as a stand-in and will swap to `fleet`
automatically when the real photo is taken.

**Action required:**
- Photograph a RainCity vehicle in a recognisable Greater Vancouver setting
- Save the result as `/public/fleet.webp` (1600×1000 px, webp format)
- Delete the `placeholder:` line from the `fleet` entry in `lib/photos.ts`

---

## 8. Quote Form — Resend Setup

The quote form sends submissions to `raincitypms@gmail.com` through Resend, a
transactional email service. The code is complete. The service needs to be
configured before form submissions will arrive in the inbox.

**Steps (takes about 15 minutes):**
1. Create a free Resend account at https://resend.com (free tier: 100 emails/day)
2. Go to **Domains → Add Domain** and add `raincitypms.com`
3. Add the DNS records Resend displays to the domain's DNS host
4. Go to **API Keys → Create API Key** and copy the key
5. In the hosting environment (e.g. Vercel), set:
   - `NEXT_PUBLIC_FORM_ENDPOINT=/api/contact`
   - `RESEND_API_KEY=<the key from step 4>`
   - `RESEND_FROM_EMAIL=noreply@raincitypms.com`
6. Redeploy and send a test submission through the form

Until these are set, the form falls back to opening the visitor's email client
with a pre-filled draft — functional, but not ideal for mobile users.

---

## 9. Before/After Project Photography

The homepage Projects section carries illustrative before/after pairs (not
actual RainCity jobs). A disclaimer is shown above the grid while
`projects.illustrative` is `true` in `lib/content.ts`.

**Action required:**
- Supply real before/after photograph pairs from completed RainCity jobs
- Replace the illustrative pairs in `lib/content.ts → projects.items`
- Set `projects.illustrative: false` to remove the disclaimer

---

## Summary

| # | Category | Blocking launch? | Who acts |
|---|---|---|---|
| 1 | Legal page review + operational numbers | Yes (noindex until done) | Lawyer + client |
| 2 | Replace placeholder testimonials | No (disclaimer shown) | Client |
| 3 | Replace placeholder blog posts | Yes (noindex until done) | Client |
| 4 | Social media profile URLs | No (icons disabled) | Client |
| 5 | Confirm location copy | Yes (noindex until done) | Client |
| 6 | 8 service tile photographs | No (text-only tiles shown) | Client/photographer |
| 7 | Branded fleet photograph | No (stand-in shown) | Client/photographer |
| 8 | Resend email configuration | No (mailto: fallback active) | Client (hosting) |
| 9 | Real before/after job photography | No (disclaimer shown) | Client/photographer |
