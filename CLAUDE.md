# RainCity Property Maintenance — Website

## Project overview

Ground-up rebuild of the RainCity Property Maintenance website, replacing an
existing WordPress site with a static Next.js build. RainCity is a mobile
property-maintenance and exterior-cleaning company based in New Westminster,
BC, serving Greater Vancouver — residential homeowners, strata corporations
and commercial property managers.

The homepage (`app/page.tsx`) is composed of section components, and the
routes below it have been landing one at a time: `/about`, `/services`,
`/services/[slug]`, `/locations`, `/contact`, the two policy pages, `/blog`
(with `/blog/page/[page]` for the archive pager), `/blog/[slug]` and
`/locations/[slug]` for the nine communities all resolve. Every route the
site links to now exists, and the two omissions that were held while
`/locations/[slug]` did not — the nine sitemap entries, and the `url` on each
item of the `locationsPageSchema` ItemList — were lifted in the same commit
as that template.

Concretely, as of the 2026-09-23 content pass (which added
`/services/balcony-cleaning`): `next build` prerenders 53 HTML pages
plus `robots.txt` and `sitemap.xml`. Four of those are not public routes — the
framework's own `_not-found` and `_global-error`, and the `/disclaimer` and
`/refund-policy` redirect stubs — leaving 49 public pages. Four more are the
`/blog/page/N` archive pages, which resolve, are linked, and are deliberately
`noindex` (see "The archive pager is noindex" below), leaving 45 indexable.

**The sitemap lists 43 of them.** `indexing.blog` (see "One flag decides what
is indexed" below) moved from `false` to `true` in the SEO growth pass, so the
blog index and its posts are in `sitemap.xml` and off `noindex`. The archive
has since grown from six articles to sixteen, so that is seventeen URLs. The two policy pages are still `noindex` and still absent, awaiting the
legal review `indexing.legal` is gated on. `/blog/page/2` is separately and
permanently omitted so the archive keeps a single canonical entry point.

Every internal `href` in the built HTML resolves to a built route — zero
broken, verified from the build on every pass. There are no `#` placeholder
links left anywhere: `social` is an empty array and the footer renders no
social icons at all (see below).

The site does now link out, which it did not before. See "Outbound citations"
below — eight of them, all to primary sources, all from article bodies.

## Tech stack

- **Next.js 16** (App Router, Turbopack) — fully static, `next build`
  prerenders every route
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — config lives in
  `app/globals.css` (`@theme`), not a `tailwind.config.js`
- **No animation library.** Motion is CSS keyframes plus one
  `IntersectionObserver`, all of it behind `components/ui/Motion.tsx`.
  `framer-motion` was removed in the performance pass — see "Motion is CSS"
  below.
- **Icons are hand-rolled** in `components/ui/Icon.tsx`. There is no
  icon library dependency — do not add `lucide-react` or any other; match the
  existing inline-SVG pattern instead.
- **Photography** — **every image is served from `public/`. Nothing is
  fetched from a third-party host at runtime**, and `next.config.ts`
  deliberately declares no `remotePatterns` so it stays that way. Photos were
  previously hot-linked from Unsplash through an `unsplash()` helper; that
  helper is gone, along with the image preconnect that used to sit in
  `app/layout.tsx`. Re-adding a remote host means a page can go blank because
  somebody else's CDN changed — treat it as a decision, not a detail.
  Every photo is declared once in `photos.ts` with alt text, dominant tone,
  aspect ratio and focal point; components reference it by `PhotoKey`.
  Originals live in `assets/`, which is tracked but never served — the files
  under `public/` are the converted, sized copies.
- **Playwright** (dev dependency) drives the review scripts in the project
  root. Three families, all pointed at a running dev server and all safe to
  re-run:
  - `shot-*.mjs` — section and page captures at 375 / 768 / 1440.
    `shot-part.mjs` writes into `shots/`; the rest write to the project root.
    `capture-screenshot.mjs` is the homepage full-page capture, which no
    `shot-*` script covers.
  - `check-*.mjs` — guardrails over the service pages: HTTP status, console
    errors and JSON-LD (`check-pages`), H2 line count and horizontal overflow
    (`check-layout`), and duplicate-phrase detection across the per-service
    copy (`check-unique`). The last one is the automated form of the
    doorway-page test documented under Locations below — keep it.
  - `measure-*.mjs` — rendered line counts used when editing service copy to
    a target measure.

  Their PNG output is gitignored and disposable; the scripts are not.

Commands: `npm run dev`, `npm run build`, `npm run typecheck`. Preview via
`.claude/launch.json`.

There is no ESLint in this project — no config, no dependency. `next lint`
was removed in Next.js 16, so the `lint` script inherited from
`create-next-app` had silently become `next lint` → "no such directory" and
was never running anything. It is now `typecheck`, which runs `tsc --noEmit`
against the strict config and is the real correctness gate here. Adding
ESLint is a reasonable future call; just do it deliberately rather than
assuming `npm run lint` ever worked.

## Design tokens

**`raincity-tokens.md` is the single source of truth for all colour, type,
spacing and radius.** It is marked LOCKED and approved — do not change a token
value without the user's explicit sign-off, and do not introduce a colour,
font size or spacing value that isn't in it. `app/globals.css` implements
those tokens as Tailwind theme variables; read the markdown first, then use
the corresponding utility (`text-navy`, `bg-fog`, `display-l`, `py-section`,
`px-edge`, etc.) rather than an arbitrary value.

## Established conventions

### Photography-forward, never templated

The design leans on real photographs and restraint, not on decoration. Avoid
the patterns that mark a page as AI-generated boilerplate:

- No `01 / 02 / 03` step markers or numbered badges unless the order genuinely
  carries meaning
- No cookie-cutter three-icon feature rows, no default stock-hero layout
- No gradient-blob backgrounds, no emoji as iconography
- Cards carry character through detail (the notched corner revealing RainCity
  Blue, the brand wash over photography, borders that move to blue on hover),
  not through novelty layout

### The logo is the client's own, in the site's colours

Since 2026-09-23 the logo is the client's supplied identity — RAINCITY over
PROPERTY MAINTENANCE with an open maple-leaf outline growing out of the Y —
replacing the interim mark (a 12° cut RainCity Blue plate beside "RAINCITY" in
Chivo). The Squeegee Edge is untouched everywhere else; only the logo stopped
using it.

- **Rebuilt, not traced.** The client could only supply a 250x160 PNG on
  white. The type was identified as Montserrat (Medium over SemiBold) and
  fitted to the PNG; the leaf was redrawn from its pixels. The result is
  outlines in `components/ui/LogoSprite.tsx` — no Montserrat download, and
  the site's faces are still Chivo and Plex. Do not hand-edit the path data.
- **Defined once per page.** `LogoSprite` renders in `app/layout.tsx`; each
  `<Logo />` draws it through `<use>`. Inlining the ~5 KB of paths per
  instance would repeat it four times a page and ship it in `HeaderClient`'s
  bundle.
- **The drawing is the client's; the colours are the site's.** The supplied
  file is one indigo (#10176D) that is not a token. On navy (every placement
  today) the wordmark is white and the leaf Pacific Blue, echoing the
  squeegee hairline; on light it is Harbour Navy with a RainCity Blue leaf.
  Do not add the indigo to the palette. It lives in the exports in `assets/`
  (`raincity-logo.svg`, `-reversed.svg`, `-transparent.png`, `-supplied.png`)
  for the client's print use.
- **44px tall, everywhere.** That is the header bar's content height, so the
  bar stayed 64px. Tightest fit is 1024px, where 26px separates logo and nav.
- **Favicon, Apple icon, social card followed.** `app/icon.svg`,
  `app/favicon.ico` (16/32/48) and `app/apple-icon.png` are the wordmark's R,
  white on navy — the leaf is dropped below 64px, where it reads as noise.
  The card was renamed `og-default.png` → `og-card.png` so platforms that
  cache by URL fetch the new logo; rename again whenever it changes.

### The 2026-09-23 content pass — what changed and the rules it left

The client's homepage feedback, tracked item by item in
`client-updates-2026-09-23.md` (and the follow-up round in
`client-updates-2026-09-25.md`, whose corrections are folded in below). Five
things in it outlive the pass:

- **Hours, minimum job size and travel are client-confirmed facts, worded
  once.** **Office hours**, Monday to Saturday, 8am–4pm, closed Sunday
  (`business.hours`, `openingHoursSpecification` in `lib/seo.tsx`, the two
  "What are your office hours?" answers in `pageFaqs`, and `llms.txt` — all
  four must match). The client's final word on 2026-09-25, after 7am–10pm and
  then 9–5 were both corrected. **They are office hours and are always
  labelled so** (`business.hours.label`): the client asked that the site
  never say "work" or "working" hours, which read as when jobs happen and
  confused people. Minimum job
  usually $120, depending on the job. Travel included in the price; a travel
  fee may apply to an on-site visit, by location. These replaced "no travel
  charge and no minimum job size", which was stated on nine pages — six
  community FAQs, `/locations`, the homepage and `/about` Home Ground — and a
  "no charge for coming out" line on `/contact`. **Change them everywhere or
  nowhere**; a reader comparing two pages should never find two policies. The
  $120 is the only price on the site and it is the client's.
- **Balcony Cleaning is the twelfth service** — hand washing with no spills on
  condos and apartments, a standard pressure wash on houses. Its one
  operational claim (nothing goes over the edge onto the unit below) is the
  client's "no spills". Photographs are Unsplash, noted per slot in
  `photos.ts`; none is a RainCity job.
- **The homepage navy band is the blog now.** `Pillars` ("Built on Quality")
  became `LatestWork` ("Explore Our Latest Work"), showing `latestPosts(3)`.
  It updates itself on every new post — so **a new post must not use a
  placeholder photo**, or the placeholder lands on the homepage. The gutter
  post was moved off `gutterDebris` for exactly that reason;
  `twenty-eight-days-before-sealing` still sits on `sealingPrep`, a
  placeholder, and would surface if it were ever re-dated.
- **Memberships & Partnerships replaced four stock badges** on the homepage
  Awards section, as `PartnerCard`s with each organisation's original logo
  (the logos-always rule under the /about section below). **All six show
  since 2026-09-25**, when the client supplied logos in the feedback doc: New
  West Spotlight, CFIB, WorkSafeBC, **Zensurance**, **Hello Gubby** and the
  Tri-Cities Business Networking Group. Two of those corrected guesses made
  from misspelled names: "Zeninsurance" had been recorded as Zen Insurance
  Inc. (Calgary), and "Hello Gabby" as the unrelated hellogabby.com — the
  client's own logo files are Zensurance's wordmark and Hello Gubby's rabbit
  (hellogubby.ai, a Vancouver AI front desk). **Match the name to the logo the
  client sends, not the other way round.** **They are on the homepage only.**
  For one round they also rendered on /about under the partner cards; the
  client had that row removed the same day, as a repeat of the homepage.
  **Logos are sized to equal area** (`PartnerCard.tsx`, since 2026-09-25,
  when the client said they looked small in their boxes): width is `--mark`
  x the square root of the file's aspect ratio, so every logo file must be
  trimmed to its ink and its `logo.width`/`height` must be its true size.
  WorkSafeBC's
  blurb is the one sentence WorkSafeBC permits, word for word; its terms also
  restrict employers' use of the logo, which Touseef was told and chose to
  show anyway, taking responsibility — so the logo carries no link.
- **The quote form's right column is a photograph, not a map.** No Maps API
  key was ever issued, so it rendered a grey text line on every page. Downtown
  New Westminster (`quoteNewWestminster`) everywhere except `/about`, which
  passes `rooftops`. **`LocationMap` and `CoverageMap` got the same fix on
  2026-09-25** (the client's "location pages still hv missing picture"):
  with no key they show `regionPortMann` — the Fraser at the Port Mann Bridge
  with Burnaby behind — under a scrim caption naming the place, via
  `RegionPhoto` in `CoverageMap.tsx`. They still render the iframe if a key is
  ever set, so issuing one brings the maps back with no code change.

### Project photography is real, and one list feeds two places

Since 2026-09-25 (`client-updates-2026-09-25.md`), `projects.items` in
`content.ts` holds **eight RainCity jobs from the client's own photos**, each a
before and an after, and it is the single source for both places they show:

- **Homepage "See The RainCity Difference"** — every job as a side-by-side
  pair (never a wipe slider: the framing differs before and after), four on
  load and the rest behind "Show More Projects" (`ShowMoreList`, which only
  toggles `hidden` — all eight are in the HTML). The stock pairs and their
  "illustrative" disclaimer are gone.
- **"See the Work Up Close" on every service page** (`ServiceGallery`,
  requested as "a section to put some pictures for each project… click for
  more pictures"). A service shows the jobs whose `service` is its slug;
  clicking one opens a native `<dialog>` viewer with every photo of the job.
  Real work today on Balcony Cleaning, Power Washing, Window Cleaning and
  Roof Cleaning. **Every page shows full rows of three** (the client's
  request): real jobs first, then labelled examples top the row up to the
  next multiple of `serviceGallery.perRow`, and the body switches to
  `bodyMixed`. **Add a job by adding an entry** — an example steps aside for
  it automatically; `more` takes extra photos for the viewer.
- **Examples are labelled stock, never "projects".** The eight services with
  no real job show three each under their own heading.
  The client asked for no empty boxes and first suggested taking photos from
  other (American) cleaning companies' websites. That was declined: another
  company's copyrighted photo presented as RainCity's own job is both
  infringement and a false claim to customers. Touseef chose instead three
  free-licence Unsplash photos per service (`serviceGallery.examples`, the
  `example*` block in `photos.ts`), under "What to Expect — What This Work
  Looks Like", a body saying they are not RainCity jobs, and an "Example
  photo" / "Not a RainCity job" tag on every card and in the viewer. **The
  labelling is the condition of using them.** The two modes never mix: a
  service's examples disappear the day it gets its first real job. Never
  lift an example into `projects.items` or onto the homepage, and never
  source gallery photos from another business's website.

Rules that come with them: every frame is served square (the originals mix
orientations); captions describe only what the photo shows — no street,
customer or date; and two crops are deliberate — the phone-app "Before/After"
stickers were cut off the glass-canopy pair, and the house number was cut off
the entry-pillars photo. Keep doing both. `check-layout.mjs` now measures
`#gallery-heading`.

### Motion — the design rules

These are the rules about how motion *looks*. How it is implemented is under
"Motion is CSS. There is no animation library." further down; the vocabulary
below did not change when the library was removed.

- Fade plus a 16px upward slide. Nothing else.
- 400–600ms, ease-out, no overshoot. No springs, scale, rotation or parallax.
- Grid children stagger; each element animates once, on entry.
- No scroll-jacking, no scroll-linked transforms.
- `prefers-reduced-motion` is honoured **in CSS** (the `[data-motion]` rule in
  `globals.css`), never by branching in JS. This is load-bearing: the JS
  branch left the server rendering `opacity: 0` for reduced-motion users and
  never clearing it — the exact users who asked for less motion got a blank
  page. A stylesheet rule cannot desynchronise from the server, and it holds
  when the JavaScript never arrives at all.

Everything goes through `Reveal`, `RevealOnLoad`, `Stagger` and `StaggerItem`.
If a new section needs motion, use those. Do not introduce a second idiom, and
do not add a library back.

### Testimonials — fourteen, all real

Twelve Google reviews (added 2026-09-23, copied word for word from the Google
Business Profile, read signed in) and the two from the client's original
homepage. Four of the sixteen readable Google reviews are left out on purpose —
an owner reply with no review text, a truncated one, a probable duplicate
reviewer, and a username whose text runs almost sentence for sentence with
another shown review; the reasons are on `testimonials.items`. The
four invented entries were removed long ago and are not coming back — see
"Four testimonials were removed, not replaced" below. The standing rule is the
important part:

**Never invent a testimonial, a star rating or a review count.** Copy reviews
verbatim, customer typos included; shorten names to first name and last
initial; never add a city, a date or a service the review itself does not
state (Google gives only "5 months ago", so no date is printed).

**Reading them needs a signed-in Google session** — signed out, Maps shows
three. With one, the Reviews tab lazy-loads about ten, and re-sorting and the
topic filters surface the rest. New reviews go in the same way, verbatim.

**The rating is shown to visitors, not marked up.** `testimonials.google`
holds "5.0 from 17, September 2026" and the section prints it with a link to
the listing. `averageRating` / `reviewCount` stay 0 *on purpose*, which keeps
`aggregateRating` out of the LocalBusiness JSON-LD: a business marking up its
own reviews on its own site is "self-serving" under Google's review-snippet
rules — never shown as stars, and exposed to a manual action. The reasoning is
on those fields and at the gate in `lib/seo.tsx`. Update the count and the
month together when more reviews are added.

**Cards are equal height with no dead space, by clamping, not stretching.**
Every quote is held to five lines and always takes five lines' room
(`review-clamp` in `globals.css`, using the `lh` unit); longer reviews end in an
ellipsis and open with "Read more", which appears only where the quote is
measurably cut off at the current width. The track is `items-start`, so an
opened card grows alone. The full review text stays in the HTML. Stretching to
the tallest card — the previous approach — padded every short review with
blank space, which the client rejected.

**`relative` on each carousel card is load-bearing.** The star rating's
`sr-only` label is absolutely positioned; without a positioned ancestor inside
the scroll track it escaped the track's clipping and widened the homepage by
~270px on phones. Any absolutely positioned child of a scroll container needs
the same containment.

### The two policy pages are unreviewed placeholder text

**There are two, not four.** `lib/content.ts` → `legalPages` carries Terms &
Conditions and Privacy Policy. The Disclaimer and Refund Policy were removed;
`next.config.ts` 301s `/disclaimer` → `/` and `/refund-policy` → `/terms`, and
the two files still under `app/(legal)/` are `redirect()` stubs that exist so
the routes stay resolvable to the type checker. Do not delete them and do not
mistake them for pages.

Both remaining pages open with a `PLACEHOLDER LEGAL TEXT` comment block. The
copy was drafted to read as standard BC service-business policy. **None of it
has been reviewed by a lawyer or a paralegal, and it must not go live until it
has been.**

Raise this with the user at launch, unprompted. Two separate sign-offs are
needed and they are not the same thing:

1. **Legal review.** Limitation of liability, the PIPA/PIPEDA rights section
   and the governing-law clause carry the real exposure.
2. **The client confirming the operational numbers.** The 24-hour
   cancellation window, the 50% late-cancellation charge, 30-day quote
   validity, net-30 invoicing, the 7-day issue-reporting window, and the
   12-month / 7-year retention split are all plausible defaults that were
   written, not supplied. A published window the office does not enforce is
   worse than none.

One constraint on editing this copy. The **workmanship guarantee, now Section
07 of `/terms`**, must stay consistent with the satisfaction guarantee the rest
of the site already claims — the "Satisfaction
guaranteed on every job" trust point in `servicePage`, "Every job guaranteed"
on the painting service. It is written with a redo as the first remedy and a
refund second. Narrowing it in review means revisiting those claims in the same
pass, and `/refund-policy` now redirects here, so this section is the only
thing backing them.

(The before-and-after clause that used to be the Disclaimer's restated
`projects.disclaimer`. That page is gone, and since 2026-09-25 the homepage
pairs are RainCity's own jobs, so `projects.illustrative` is false and the
disclaimer no longer renders anywhere.)

**Both routes are `noindex` and both are absent from `sitemap.xml`, and that
is deliberate — do not "fix" it by adding them back.** An earlier version of
this file argued that a resolving page belongs in the sitemap and that
`noindex` is the only control needed. That was half right and it is not what
the code does now: listing a URL in the sitemap is an assertion that it is
canonical content to be indexed, and pairing that with `noindex` on the page
is the site contradicting itself in the one report that should be signal.
`indexing.legal` in `lib/seo.tsx` drives both halves from one flag; flip it
when the legal review lands and the pages return to the sitemap and lose the
`noindex` together. The reasoning is written out at that constant.

### The blog posts are placeholder content

`lib/content.ts` → `blogPosts` carries sixteen articles. **The first six are
placeholder** and sit under a `PLACEHOLDER BLOG CONTENT` comment block; the ten
added in the AEO/GEO pass are a different kind of thing and are described under
"The ten researched articles" below. Titles, excerpts, dates, read times and body copy were
all written for the build. The advice reads as this company's and is not —
nobody at RainCity has said any of it, and several posts state timing and
method as fact (when moss treatment should be booked, what belongs on a strata
schedule, how a sealer window works). **Replace it before launch, and have the
client confirm anything that survives.** Raise this at launch alongside the
testimonials and the policy pages.

Three refusals went with it. The `/blog/[slug]` template lifted two of them
and the third stands:

- **No author field and no byline — still true.** A real person's name on
  copy they did not write is a worse placeholder than an invented date.
  `blogPostingSchema` names the *organisation* as author, which is true of
  any page on this domain and asserts nothing about a person. Add the field,
  the byline and a `Person` author together, when there is somebody to name.
- **`BlogPosting` JSON-LD — lifted.** Each post page publishes its own
  headline, image, date and author. `blogPageSchema` still publishes no list
  of the posts; the note in `lib/seo.tsx` says what lifts that (real copy,
  and nothing else now).
- **Sitemap entries — lifted.** One entry per post, generated from
  `blogPosts`. `/blog/page/N` is still deliberately absent — the pager links
  those and one archive should have one canonical entry point.

That leaves the thing to raise at launch: a crawler is now told these six
articles are real, at real URLs, with real dates, and the copy under that
markup is invented. Either it is replaced and confirmed before launch, or
the route gets `noindex` — the same answer the policy pages get. Deleting the
markup again is not the answer; the URLs resolve.

Never invent additional posts, author names or publication dates.

### Where the service photography actually comes from

Three of the twelve service pages carry the client's own photographs: Window
Cleaning, Commercial Cleaning and Power Washing. Their source PNGs sit flat
in `assets/`, named for the shot rather than for the slot they fill — the
same way the Window Cleaning originals have always been filed there, and the
reason `assets/` has no subdirectories. They are supplied at 2560x1600 for
the six scope tiles and 3200x1290 for the closing band, and are converted to
webp at **1600x1000** and **1920x774** under `public/services/<service>/`.
Match those numbers if more arrive — the whole set shares them.

Nothing reads `assets/` at build time; it is the archive the served files
were made from. The mapping from a source name to the slot it became lives
in the `src` path on that slot's registry entry, not in the filename.

The other nine pages are illustrated with frames that came from Unsplash,
one chosen per slot against the shot brief that used to be that slot's
`placeholder` string (Balcony Cleaning, added later, had no briefs — its seven
frames were chosen against its own tile copy, and every one has a full set). They are downloaded, not hot-linked: the original sits
in `assets/` and the served webp at the path the registry declares, exactly
like the supplied sets.
Two things follow, and both matter more than they look:

- **The brief is preserved in every `note`, along with what the chosen frame
  does and does not show.** Some are close. Several carry only half of what
  the tile beside them claims — a condition shot where the tile describes a
  method, a finished surface where it describes the work. A few are frank
  stand-ins. The notes say which is which, in those words. Do not read a
  filled slot as a settled one without reading its note.
- **`credit` is `"Unsplash"`, not a photographer's name.** The licence does
  not require attribution and the names were not verifiable from the search
  pages, so none was invented. Look them up per photo if the client wants
  credits. Note that `credit` is rendered — the Services nav dropdown prints
  it under the preview image — though only ever for a service's own card
  photo, never for these tile frames.

**No service tile is text-only any more (2026-09-25).** Eight slots used to
be `placeholder` — process shots stock does not contain (a service log on a
tailgate, sealer test squares, a layout sketch, labelled coils going into a
bin, a caulk bead, an oil spot being degreased, bagged debris, a mid-season
repair). `ServiceOverview` rendered them as text-only tiles, and the client
read those, beside photographed neighbours, as **missing pictures** on five
service pages (and on the `twenty-eight-days-before-sealing` post, which
shares `sealingPrep`). They were filled that day with the nearest free-licence
Unsplash frame; each note records the Unsplash ID and which half of the brief
the frame carries. **Rule: never leave a tile, gallery card or post without a
photograph** — a stand-in with an honest note beats a gap. When the crew shoots
the real thing, give it a new filename (the image cache keys on path). The
only `placeholder` left in `photos.ts` is `fleet`, which nothing renders.

The registry's own header comment carries the same account at the point of
use. Keep the two in step.

### Social links: Google is in, the rest are still missing

`social` in `lib/content.ts` carries **one entry: the Google Business
Profile** (2026-09-23), as the listing's permanent CID link
(`maps.google.com/?cid=…`) rather than the share.google link it was supplied
as, which resolves through a search page. It renders a Google "G" in the header
strip, the footer and the Awards "Follow" row, and it turns on `sameAs`.

It carried four `"#"` entries until commit `71dc640` emptied it: icons that go
nowhere read as broken, and a guessed handle points visitors at a stranger's
account under RainCity's name. That rule stands — **add Facebook, Instagram and
the rest only with their real URLs**; their icons already exist in `Icon.tsx`.

**The printed phone number opens WhatsApp (client request, 2026-09-25).**
Every place the number itself is shown links to `business.whatsappHref`
(`wa.me`) with the `WhatsApp` icon beside it and `business.whatsappLabel` as
its accessible name; the "Call Us Now" buttons, which print no number, stay
`tel:`, so a visitor can still call. The icon is the site's one mark in a
non-token colour (WhatsApp green, reasoning on it in `Icon.tsx`) — do not
spread that colour. `telephone` in the structured data is unchanged.
`Button` renders any `https://` href as a new-tab anchor for this.

**The street address stays off the site — decided by Touseef, 2026-09-23.**
The Google listing shows one (828 Agnes St, New Westminster, in Westminster
Towers); this site shows none and its LocalBusiness data has no
`streetAddress`, as a mobile business with no storefront. Asked, Touseef said
there is no need to show it. Do not add it. (If local-SEO consistency ever
matters more, the lever is hiding the address on the Google listing, which a
service-area business can do — not publishing it here.)

### /about carries a Home Ground section, and one line in it is unconfirmed

Added at the client's request ("about local to New West"), and **redesigned
on 2026-09-13** after the client rejected three versions. **It is now built to
the `WhoWeAre.tsx` template, on the client's explicit instruction** — same
grid, heading size, 1:1 photo with navy-scrim caption, secondary button, and
copy held to the template's character counts. Keep the two in step. Deliberate
differences: Fog ground (White neighbours both sides), "Our Home" set under an
amber `<mark>` highlighter at the client's request (the second decorative use
of amber on the site, after the Why Choose Us row wash — keep it at two), and
the button goes to `/locations`. The three-fact list is gone; the derived base
and community count live in the caption. It sits between
`Process` and `QuoteForm`, and the reasoning for the copy is on
`aboutPage.local` in `lib/content.ts` while the reasoning for the layout is on
`components/about/HomeGround.tsx`. Read both before editing it — four obvious
treatments are ruled out on that page in particular, and the fourth is the one
that catches people: `QuoteForm` sits directly below and carries its own "Where
we work" photograph, so a map or a second SkyBridge frame here would repeat it
inside one screen. (On `/about` only, the form is passed `photo="rooftops"` for
exactly that reason — Home Ground already shows the bridge.)

**The travel line is now the client's, not ours.** It used to say "nothing
added for the distance" — an unconfirmed no-travel-charge policy, and the fifth
launch item. On 2026-09-23 the client supplied the real policy: travel is
included in the price of a job, a travel fee may apply to an on-site visit
depending on location, and the minimum job size is usually $120. Home Ground
now says "travel built into the price", and the same two facts are worded the
same way in every FAQ that states them — see "Hours, minimum job size and
travel" below. That launch item is closed.

Everything else in the section restates copy the site already publishes — the
moss releasing gradually is the Soft Washing FAQ, the sealer window is the
`twenty-eight-days-before-sealing` article, the paintable season is the
Painting FAQ, and the hill above the Fraser is the New Westminster location
copy. Both derived facts derive: `business.base`, and a count off `locations`.

**The photograph is `aboutHomeGround`, and since 2026-09-13 it really is New
Westminster:** Westminster Pier Park's boardwalk with the SkyBridge and the
Pattullo arch behind (Unsplash `jI-L9NbH_fw`, free licence). The client asked
for a picture that reads as this city at a glance. An earlier search concluded
the stock pools had nothing usable; searching Unsplash for
"new-westminster-bc" and reading each photo's API `location` found eight
tagged frames, two strong. **Verify by eye, not by tag** — one earlier
"New Westminster" result was Edinburgh, and most of these carry the city's
default coordinates rather than a pinned spot. The alternates are recorded on
the registry entry. The previous frame (a Victoria street) is still in
`assets/` and `public/about-home-ground.webp`, unreferenced.

Two frames were ruled out along the way and the reasons outlive this section.
`rooftops` is the `/locations` hub hero, doing this same "here is the place"
job one page over. And **`aboutCrew` shows a crew *re-roofing* a house** —
laying underlay, stripped shingles bagged below — which is not one of the
twelve services. It is fine as atmosphere on `/blog`. It used to be the
New Westminster photo on `/locations` and that community's hero; on 2026-09-13
it was replaced there by `aboutHomeGround` (Pier Park), and Surrey's 550px
`concreteSealing` hero — stretched 2.6x at desktop — by `powerParkades`.
Both came out of an image audit of all nine community pages at 1x, 2x and 3x.

### /about: Founders, Partnerships and Supporting Our Community

All three at the client's request. `founders`, `partnerships` and
`aboutPage.community` in `lib/content.ts` hold the data; the components in
`components/about/` hold the reasoning.

**Every partner, affiliate and membership shows its original logo — never a
name-only card.** A standing instruction from Touseef (2026-09-23): people
recognise these organisations by their marks, RainCity is their official
partner, and he carries responsibility for using them. So `Partnerships.tsx`,
`localPartnersFor` and the homepage memberships in `Awards.tsx` all filter on
`logo`: an organisation without a file waits in `content.ts` and appears the day
one is added. Fetch each logo from the organisation's own site and check it by
eye; if two organisations could match a name, ask which — do not guess.

**Founders is two people: Wilson and Glevin.** "Glevin" is the client's own
spelling in the 2026-09-25 feedback doc, confirmed by Touseef that day; it was
"Glavin" from 2026-09-23 (an earlier answer, and a LinkedIn handle). The
founder's spelling wins over any handle. **Roles are the client's, word for
word**: Wilson — Quality Control Inspector / Site Supervisor; Glevin —
Operations Coordinator / Office Administrator. The bios describe those jobs
(asked for as "some description of what they do"), tie them to what the site
already publishes, and say nothing personal and use no pronouns; replace them
with the founders' own words when they come. **Both portraits are in** and
both are small — Wilson's 480x550 from WhatsApp, Glevin's 340x490 supplied as
a circle on black, feathered into a square low-key frame (method on
`founderGlevin` in `photos.ts`). Ask for the originals. The 4:5 navy plate with
the initial still covers any founder without `photo`.

**By the numbers was rebuilt on 2026-09-25** after the client said it "looks
funny, something is missing": a heading and a line on the left, four white
tiles on the right — the three client figures, each with a sentence restating
a confirmed fact, plus the real Google rating read from `testimonials.google`.
None of the four is in the structured data (reasons on `Stats.tsx`).

**Grounds: Stats (Fog) → Founders (White) → Partnerships (Fog) → the cut**,
restored now that Founders always renders (Partnerships had been White only
while Founders was empty). `SectionEdge` runs `from="bg-fog"`. Both sections
still return `null` on an empty array — if Founders ever did, Partnerships
would sit Fog-on-Fog under Stats, so check both states before changing either.

**Partnerships — "Our Affiliates & Partnerships"**, with the client's blurb.
Partner cards built on the service card's anatomy (logo panel with the blue
corner notch, sector tag, name, two-line blurb, "Visit Site →"), 3x3 at `lg`.
All nine carry their current logos, taken from their own sites on 2026-09-23:
the three universities' **real logos replaced the Wikipedia coats of arms**
that were there (the client called them wrong); **S&A Cleaning Group**
(sacleaninggroup.ca — the client's "SA Cleaning") and **CFOne** (the Canadian
Armed Forces community card, CFMWS) are identified, linked and have logos.
**Crystal Clear Cleans** carries the client's own lockup since 2026-09-25
(house, diamond and script, from the feedback doc), cleaned off its salmon
square and halftone dots onto transparent — not the site-icon diamond it
used before. The homepage's memberships do not repeat here (removed 2026-09-25, at the
client's request) — see the Memberships bullet above.
**Blurbs describe the organisation, never the relationship.** 4px corners
(`--radius-card`) are the site's only card radius — do not spread it. Do not
bring back a carousel. Logos live in `public/partners/`, not `photos.ts`.

Every group says "partners", on the client's instruction — never "client",
which would assert a commercial engagement about a named third party. **The
`Property management` group is empty on purpose**: the client asked for "just
some property management companies for now", and inventing them would be a
false endorsement of identifiable businesses. It stays empty until real names
arrive.

**Supporting Our Community** is a published offer: special pricing for
seniors, people with disabilities, single parents, veterans, healthcare
workers, first responders and teachers — the client's words, with their
disclaimer ("Valid on select residential services…"), which goes up with the
offer or not at all. No discount size is stated because none was given. It is
the page's one RainCity Blue band, between Process and Home Ground.

### Community pages carry Off The Clock and Local Partners, and the first is placeholder

Added to `/locations/[slug]` on 2026-09-13 at the client's request ("companies
we work with locally or voluntary, with some local events pictures"), after
the map: `LocationCommunity` (Fog), then `LocationPartners` (White), then
`NearbyAreas`, which moved to Fog with White plates so the grounds alternate.

**Off The Clock is placeholder content with stock photography, written on the
client's explicit instruction so the design could be reviewed finished.** The
events and places are real and were checked (Hyack, Blues + Roots, Cloverdale
Rodeo, Sun Festival, Cranberry Festival, Pitt Meadows Day, Haney Farmers
Market, Golden Spike Days, the Great Canadian Shoreline Cleanup); **RainCity's
part in every one of them is assumed.** The client says real phone photos
exist. Before launch each entry is confirmed, replaced or deleted, and the
photos swapped — a named festival on a business's site reads as "we were
there". This is the sixth launch item; raise it with the others. The banner
on `communityBySlug` in `content.ts` carries the detail, the nine frames are
the community block in `photos.ts`, and `locationPage.community.illustrative`
prints "Photographs are illustrative" until it goes false. Entries never claim
a sponsorship or an organiser relationship, and `when` is never a year.

**Local Partners invents nothing.** `localPartnersFor` reads `Partner.local`
— each partner's *own* published service area or campus list (checked on
their sites) — and the card eyebrow says so ("Cleaning · Serves Burnaby").
National partners fill a short row as "Across Canada". Partners with no
checkable reach are left off. The card is `components/ui/PartnerCard.tsx`,
shared with /about so the two cannot drift; the 1-2-3 panel tints and the
linked-card hover deepen live there.

### The post template

`/blog/[slug]` renders `post.body`, which is a list of `BlogSection`s, each an
h2 and a list of `BlogBlock`s. `BlogBlock` is a closed union — a bare string
is a paragraph, and the five tagged shapes are a subheading, a list, an
ordered sequence, a pull quote and a captioned photograph. There is no HTML
string field and no Markdown parser anywhere in the path, and there should
not be: it is what stops a post introducing a type size or a list marker the
design system has not ruled on. Adding an element means adding a member to
the union in `content.ts` and a branch in `PostBody`, and both are
reviewable.

One trap, documented at length in `components/blog/PostColumn.tsx` and worth
knowing before touching any page: **`max-w-prose` is not the
`--container-prose` token.** Tailwind ships it as a static utility meaning
`65ch`, which wins over the theme value — so the measure is 65 characters of
whichever font it lands on. On body copy that is 663px, near enough that
nothing has ever shown it. On a `display-l` heading it is 1199px. Never put
`max-w-prose` on a heading; wrap the heading in `PostColumn` (or any element
left at the body font size) instead.

### Services live in one data source

`services` in `lib/content.ts` is the single source. The homepage grid, the
Services nav dropdown, the `/services/[slug]` URLs and the `OfferCatalog`
JSON-LD all derive from it — edit the array and all four follow. Never
hardcode a service name in a component.

One list does **not** derive and must be updated by hand alongside it:
`public/llms.txt`, a static file. (`quoteForm.serviceOptions` used to be the
second — a hand-kept six-option dropdown. Since 2026-09-23 it is every service
title plus "Other", derived, at the client's request.)

Adding or removing a service also needs a matching `PhotoKey` entry in
`lib/photos.ts`. The homepage grid re-centres its short last row
automatically from `services.length` (see the comment block in
`components/home/Services.tsx`) — no index editing required.

### Locations live in one data source too

`locations` in `lib/content.ts` is the same arrangement one level over. The
nav dropdown, `/locations` (its coverage index and its card grid), the nine
`/locations/[slug]` pages, their sitemap entries, the `areaServed` in every
piece of structured data and the ItemList on the hub page all derive from it.
Each record carries a `detail` block holding that community's own page copy,
exactly as each service carries one — so a tenth community cannot ship with
an empty page, because the compiler refuses the record.

`public/llms.txt` is again the one list that does not derive, and it now
carries a URL per community as well as per service.

**The per-community copy is written, not supplied.** Every intro paragraph,
local note, FAQ answer and closing line in `detail` was written for this
build. The geography in it is checkable and nothing in it invents an
operational commitment — no response times, no crew counts, no "we are in
your area on Tuesdays" — and the answers that describe method restate what
the service pages already say. It still reads as RainCity's own local
knowledge and nobody at RainCity has confirmed it, so it belongs in the same
launch conversation as the testimonials, the policy pages and the blog. It is
a smaller exposure than those — a wrong sentence about Tsawwassen is an
error, not a fabricated endorsement — but it is the same kind of thing.

The one hard rule when editing it: **if a sentence would still read true with
a different city's name in it, it is the wrong sentence.** Nine pages sharing
one paragraph with a proper noun swapped is the doorway-page pattern, it was
flagged as the risk on this route before a line was written, and the whole
`detail` block exists to avoid it.

### SEO and performance are complete — don't regress them

Metadata, JSON-LD (`lib/seo.tsx`), `app/sitemap.ts`, `app/robots.ts`,
`public/llms.txt` and image optimization are all done and deliberate. Before
changing anything in that area, read the comments explaining why it is the way
it is. In particular:

- The LocalBusiness schema intentionally has no `streetAddress` (mobile
  business, no storefront) and no `aggregateRating`.
- Photos animate only `opacity`/`transform` so nothing shifts after layout —
  keep CLS at zero.
- Every image has real, specific alt text. Never ship a decorative-sounding
  placeholder.
- **Every photograph in `public/` is webp.** The five PNGs that were there —
  31 MB between them, two of them the LCP hero on `/about` and `/services` —
  were converted in the SEO pass and `public/` went from 54 MB to 24 MB. The
  originals are in `assets/` as always. `og-card.png` is the one deliberate
  exception: some social scrapers still do not take webp.

"Complete" was true of the areas this heading names and was never true of the
whole of SEO. The pass documented in `seo-audit/` found the metadata lengths
(24 descriptions past the render limit), the one-way link graph, two fictional
cities in `areaServed`, and a sitemap that contradicted its own routes. The
sections below carry what changed and the rules that came out of it.

### The client is non-technical

They value stability and reliability over cleverness. Prefer boring, durable
solutions: static rendering, no runtime data fetching, no exotic dependencies,
no patterns that need explaining. Anything added should still work untouched
in two years.

### Quality bar

Premium and distinctive, never templated or default-AI-looking. Check every
addition against that before calling it done — including copy, which should
sound like a specific company that works in the rain, not like generic service
marketing.

## Code conventions

- Sections are **server components**; only `components/ui/Motion.tsx` and
  other genuinely interactive pieces carry `"use client"`.
- Copy lives in `lib/content.ts`, not inline in JSX.
- Comments explain *why*, especially where a decision looks odd — that pattern
  is established throughout and worth continuing.
- Tailwind class names must appear as whole literal strings; the scanner never
  sees a constructed string, so look classes up from a lookup table rather than
  interpolating them.

### No client component may import a value from `content.ts` or `photos.ts`

**This is the invariant most likely to regress, and it costs 107 KB gzipped on
every page when it does.**

`nav` in `content.ts` is built from `services.map(...)` and
`locations.map(...)`. So a `"use client"` file that imports `nav` — or
`quoteForm`, or `testimonials`, or any single value — drags the whole module in
with it: every service scope block, every location FAQ, every blog article.
That copy is already in the server-rendered HTML, so it was being shipped twice,
and the second copy was 328 KB raw of JavaScript the browser had to parse.

The fix, and the pattern to follow: **a server component reads the data and
passes plain serialisable props to a small client component.** `Header` →
`HeaderClient`, `QuoteForm` → `QuoteFormClient`, `Testimonials` →
`TestimonialsCarousel`, `Photo` → `PhotoFrame`. Push the `"use client"`
boundary as far down as it will go.

- `import type { ... }` is fine — type imports are erased at compile time.
- Do **not** solve it by copying data into a second module. Services and
  locations live in one source; that rule has not moved.
- `photos.ts` is imported by exactly one component (`Photo`), which resolves a
  key to `{src, alt, ratio, focal, blurDataURL}` and hands that to `PhotoFrame`.

To check, build and grep the client chunks for copy that should only exist on
the server:

```
for f in .next/static/chunks/*.js; do grep -qa "Anmore is a village" "$f" && echo "LEAK: $f"; done
```

### Motion is CSS. There is no animation library.

`framer-motion` was removed — 38 KB gzipped for a vocabulary that is one
sentence long. `components/ui/Motion.tsx` keeps the same four exports with the
same names, props and semantics (`Reveal`, `RevealOnLoad`, `Stagger`,
`StaggerItem`), implemented as `@keyframes rc-reveal` in `globals.css` plus one
module-scope `IntersectionObserver`. Do not reintroduce a library; add to the
CSS.

Two rules the implementation is built around, both load-bearing:

- **Nothing is hidden in the server HTML.** There is no `opacity: 0` in any
  prerendered page. An element is armed by JS only if it is currently below the
  trigger line, which means content the reader can already see is never hidden
  and then faded. If the JavaScript never runs, everything is visible — which
  is the same guarantee the `<noscript>` block and the `[data-motion]`
  reduced-motion rule in `globals.css` were written for.
- **Only `opacity` and `transform` animate**, and the keyframe ends at
  `transform: none` with `backwards` fill rather than `forwards`. `forwards`
  left a permanent identity matrix on every revealed element, which silently
  makes it a containing block for fixed and absolute descendants.

The known behavioural difference from the library version: an element already
on screen when the observer initialises does not animate. That is the deliberate
price of never hiding visible content.

### The blog is published

`indexing.blog` is `true`. The six articles are indexed, in the sitemap, and
carry `BlogPosting` markup with a `blogPost` list on the index.

Before that flag moved, ten sentences were rewritten across all six posts.
Indexing an article turns every sentence in it into a published position of the
company, and the FAQ answers were carrying commitments nobody had confirmed: a
completion time, a trigger depth, a pricing model, a capacity guarantee, a
visit-duration range, and a claim about what most commercial clients buy. **Do
the same audit before publishing any new post** — a number in an article is a
number the office has to hold to on the phone.

Excerpts are the route's meta description as well as the card copy, so they are
held to 150–158 characters like every other description on the site. The post
title template is `{title} | RainCity` and has to stay under 60.

Still true: no author, no byline, organisation-as-author in the markup. See the
banner on `blogPosts`.

### Four testimonials were removed, not replaced

`testimonials.items` carried two reviews, both real, both from the client's own
homepage (three verbatim Google reviews were added beside them on 2026-09-23).
The other four were invented to fill the carousel and are gone, on the client's
confirmation that only those two were genuine. The on-page disclaimer
went with them, along with the condition that gated it — which tested whether a
review carried a `service` field, a proxy for "is a placeholder" that would have
put the disclaimer back over the first real review that happened to have one.

`verified` is `true` and means what it says. **No rating is published in the
structured data, deliberately** — the real Google figures are shown on the page
instead; see "Testimonials — five, all real" above for why the count stays 0.

### One flag decides what is indexed

`indexing` in `lib/seo.tsx` is the only place that decides whether a route
group is published to search. Two groups are held back — `blog` (six
placeholder articles) and `legal` (awaiting review) — and each flag drives both
halves of the hold: `searchDirectives()` puts `noindex` on the route, and
`app/sitemap.ts` reads the same boolean to leave the URLs out.

It is one flag because it used to be two unrelated edits that disagreed. Eight
blog URLs sat in `sitemap.xml` while the routes themselves carried `noindex` —
the sitemap asserting "canonical content, index this" against a page header
saying the opposite, which lands them in Search Console's "Excluded by
'noindex' tag" report and nowhere useful. Flip the flag when the condition
named on it has actually been met, and both halves move together.

`follow: true` stays on a held route on purpose: the page is out of the index
but its links still pass, so the blog→service links below work today.

### The link graph runs both ways now, and the nav does not count

`LocationServices` puts all twelve service links on all nine community pages.
Nothing pointed back until `components/service/ServiceAreas.tsx` landed: the
built HTML of a service page contained eight internal hrefs, all top-level, on
the twelve pages most likely to be a search entry point. `RelatedServices`
beside it adds the sideways links, from `relatedBySlug` in `content.ts` — a
written map, because the adjacency that matters is physical (the ladder is
already at the gutter; a slab is washed before it is sealed) and no ordering of
the `services` array encodes that.

**The header's dropdowns are not internal links.** `Header` holds its children
behind `openMenu` state, so the twelve service and nine community links exist
in no route's server HTML. Anything a crawler is meant to follow has to be in a
section. This is the thing that made the gap invisible for so long.

### Headings on the service template are measured, not eyeballed

`servicePage.areas.heading` is one fixed string across all twelve pages, and it
is fixed because `{service.title} Across Greater Vancouver` was measured at
375px in `display-l` and wrapped to three lines on six services and four on
Concrete and Asphalt Sealing — against the two-line rule `overviewHeading`
states. Every shorter suffix behaved the same way; the service names are too
long for that type size plus a region.

`check-layout.mjs` now measures all three of the template's variable headings
(`#overview-heading`, `#areas-heading`, `#related-heading`) rather than the
first alone, which is how that draft nearly shipped. Add a heading to this
template and add it to that script in the same commit.

### Metadata has hard numbers

**Titles 60 characters or under. Descriptions 150–158.** Both were measured
from the built HTML and both were being missed: 24 pages had descriptions over
the render limit, the homepage at 270, and nine titles ran past 60.

- Service titles come from one template in `app/services/[slug]/page.tsx`.
- Location titles are **written** per community on `LocationDetail.metaTitle`,
  beside the `metaDescription` that was already there. Written rather than
  templated because two of the nine slugs are groupings and the template could
  never name Coquitlam on the page that covers Coquitlam.
- The six `blogPosts[].excerpt` values are the last set still over the ceiling.
  They are deliberately left alone — the copy they summarise is placeholder and
  is being replaced whole. Hold the replacement to 150–158.

Never put a phone number at the end of a meta description. It is the first
thing truncated, and `tel:` links and the `telephone` field already carry it.

### Two of the nine communities are not municipalities

`Tri-Cities` and `Ridge Meadow` are groupings. `{"@type":"City","name":"Ridge
Meadow"}` asks a crawler to resolve a place that does not exist, and that
appeared in `areaServed` on every page carrying it. The optional
`municipalities` field on `Location` holds the real names for those two;
`citiesOf()` in `lib/seo.tsx` expands it, so `areaServed` now names twelve real
municipalities instead of nine with two fictions among them.

The **display** name is unchanged on purpose — "Maple Ridge & Pitt Meadows" on
a card, in the nav and in nine breadcrumb trails is a layout problem, and the
grouping is how the company talks about the area. `llms.txt` states the
expansion in prose for the same reason the schema does.

### `BlogBlock` grew a seventh member, and that is how it is meant to grow

`linked` is a paragraph whose sentence is split into parts — strings are prose,
objects are anchors. It exists because six articles about moss, gutters, strata
schedules and driveway sealing could not point at the service that does the
work: the union had no link in any shape, and there is deliberately no Markdown
parser in the path.

Adding it was one member in `content.ts` and one branch in `PostBody.tsx`,
which is the extension route this file already prescribed. Keep it that way —
an HTML string field would let a post introduce a type size the design system
has not ruled on, which is the whole reason the body is data.

`href` is internal only. Nothing on this site links out, and an external link
from an article is a decision about who this company sends readers to, not
something a content array should do quietly.

### The SEO working files

`seo-audit/` holds the audit (`00-current-state.md`), the growth plan
(`01-master-seo-plan.md`), the final report (`02-final-report.md`) and per-agent
logs under `logs/`. Read `01` before proposing service × location pages: the
market pattern is a 60–96 page matrix and this project deliberately has not
built one, for reasons that are written down there along with the conditions
under which it should be.

## The AEO/GEO pass

What changed, and the rules that came out of it. Read this before touching
`app/robots.ts`, the hero headings, or `blogPosts`.

### robots.txt must never disallow `/_next/`

It did, and it was the single most damaging line on the site. On this stack
that one prefix covers `/_next/image` — the URL **every photograph is served
from**, 294 references on the homepage alone — plus the stylesheet, the client
JS and both woff2 faces under `/_next/static/`.

Two consequences, both silent: no image on this site could be crawled, so none
could appear in image search; and Googlebot, which renders with a headless
browser, was being served a page it could not style or script. The layout being
judged was not the layout that shipped.

Only `/api/` is disallowed now. Nothing under `/_next/` can be indexed *as a
page* regardless — the chunks are not HTML and the image endpoint answers with
an image content type — so allowing the fetch costs nothing. The reasoning is
written out at the constant. **Do not put it back.**

### The archive pager is noindex

`/blog/page/N` carries `robots: { index: false, follow: true }`, set
unconditionally rather than through `searchDirectives`.

It used to read `searchDirectives(indexing.blog)`, which was right only while
the blog was held back. The moment that flag went true the pager inherited
`index, follow` and started contradicting `app/sitemap.ts`, which deliberately
omits every `/blog/page/N` so the archive keeps one canonical entry point. The
document a crawler found on resolving that disagreement was a few hundred words
of card copy already published on `/blog`.

`follow` stays on: the post links on those pages are the only path to the older
half of the archive. And it is deliberately **not** driven by `indexing.blog` —
that flag is about whether the articles are fit to publish, this is about an
archive having one entry point, which is true either way.

### Headings carry their keywords on a second line

Every `display-xl` page heading is now two lines: the name at `display-xl`, and
a `display-m` `<span className="block">` under it inside the same `h1`.

The heading on `/locations/burnaby` was the word "Burnaby" and nothing else —
the strongest on-page signal on the nine pages most likely to be entered on
"exterior cleaning Burnaby", carrying no service term at all. Same on the
service template ("Roof Cleaning"), the homepage, and both hubs.

A `span` inside the `h1` rather than a sibling `h2`, because the point is that
the heading *text* carries the terms; a sibling would leave the `h1` saying
exactly what it said before. The copy is in `content.ts` —
`locationPage.hero.h1Sub`, `servicePage.hero.h1Sub`,
`servicesPage.hero.headingSub`, `locationsPage.hero.headingSub`.

This also resolves the constraint recorded against `servicePage.areas.heading`:
the one-line form `{service.title} Across Greater Vancouver` was measured at
375px and wrapped to three and four lines. Splitting it puts the long half on
its own line at a smaller size, where the wrap is fine. Verified at 375px on
the worst case, Tri-Cities, which runs to three lines and still reads.

The two grouped locations print their real municipalities here —
`h1SubGrouped` plus `listMunicipalities` in `LocationHero` — because "Ridge
Meadow" is a name nobody searches. The display name is still unchanged.

### Metadata numbers are met, not aspired to

**All 34 indexable pages sit inside 150–158 characters.** They did not before:
28 of 35 were under, averaging 143. The blog excerpts are held to the same band
and the post title template `{title} | RainCity` keeps every title under 60.

The four `/blog/page/N` descriptions sit at 139 and are the deliberate
exception — they are `noindex`, so the band buys nothing there.

### Outbound citations

`BlogBlock.linked` grew an `external?: boolean` on its anchor shape. Rendered
as a plain `<a target="_blank" rel="noopener">` — deliberately **without**
`nofollow`, because a citation the company stands behind is what a followed
link is for.

The old rule said `href` is internal because an external link is a decision
about who this company sends a reader to. That reasoning is intact; the answer
changed. Across thirty-five pages this site cited nothing, which for a company
publishing advice on strata obligations, roof method and winter salting reads
as unsupported to a reader and uncorroborated to the systems deciding what to
quote.

**The bar is a primary source and only a primary source** — the regulator, the
statute, the standards body, the meteorological record. Not a competitor, not a
supplier, not a blog that also says the thing. Every URL in the file was
checked to resolve before it was written. A dead one should be removed, not
redirected to something approximate.

Currently eight, across: `vancouver.ca` (snow bylaw), `www2.gov.bc.ca` (strata
depreciation reports), `asphaltroofing.org` (ARMA on pressure washing shingle),
`worksafebc.com` (fall protection at 3 m), `climate.weather.gc.ca` (climate
normals).

### Structured Q&A is the site's strongest AEO asset — 217 pairs

Up from 111. Three sources, and two of them are new:

- **Service and location templates** — declared in `detail.faqs`. Unchanged.
- **Blog posts** — *derived*, not declared. `postFaqs` in `lib/blog.ts` lifts
  the pairs out of the article's own body: a `subheading` block whose text ends
  in a question mark, followed by the plain-string paragraphs under it. A
  second `faqs` array beside the prose would be the first thing to drift.
  Two rules are deliberately strict — the question mark, because not every
  subheading is a question; and plain strings only, because a list or a
  photograph flattened into an answer reads wrongly out of context.
- **The five pages above the templates** — homepage, both hubs, `/about`,
  `/contact` — declared in `pageFaqs` in `content.ts` and rendered by
  `components/ui/PageFaq.tsx`. These were the pages a broad question actually
  lands on and they had nothing machine-readable on them.

Every one of these publishes `FAQPage`, and every caller checks for an empty
array first: an `FAQPage` with no questions is a page claiming to be something
it is not.

**`pageFaqs` is copy, not configuration.** One rule was applied writing it and
should be applied to any edit: *an answer may restate what the site already
says and may not invent what it does not.* No response times, no prices, no
crew sizes, no booking windows — those are exactly the kinds of sentence the
blog compliance pass had to strip, and a reassuring answer is where they creep
back in.

### The ten researched articles

Ten posts were added to `blogPosts` and they are **not** placeholder in the way
the original six are. Every factual claim is either verifiable public
information with the citation in the paragraph, or a restatement of something
this site already says. None states a price, a response time, a crew size or a
completion window.

What still needs the client, and should be raised with the other launch items:
they are published under the company's name and nobody at RainCity has read
them. The advice is defensible; the *positioning* is the client's call.

Slugs: `what-changes-a-gutter-quote`, `soft-washing-or-pressure-washing`,
`who-clears-the-sidewalk`, `what-a-strata-budgets-outside`,
`how-often-gutters-need-doing`, `what-makes-a-window-quote-different`,
`twenty-eight-days-before-sealing`, `what-should-be-in-writing`,
`three-metres`, `the-exterior-year`.

Still no author and no byline on any of the sixteen. That rule has not moved.

`readMinutes` across all sixteen was recalibrated to roughly 200 words per
minute. The original six were set near 85 wpm — a 775-word article claiming
nine minutes — and mixing the two conventions on one index would have read as
a bug. Compute it from the body rather than estimating it.

### `sameAs` is live, with the Google Business Profile

`organizationSchema` and `localBusinessSchema` both spread a `sameAsField`
derived from `social` in content.ts. Since 2026-09-23 it carries the Google
Business Profile, so both nodes now name the listing — which closes what was
the site's largest gap: the entity was asserted by one domain and corroborated
by nothing. Each further profile added to `social` joins it with no edit here.
It would go **absent** again if the array were emptied, because an empty
`sameAs: []` is a published claim to have no profiles anywhere.

Also added to the Organization, all derived so they cannot drift:
`description`, `areaServed`, `knowsAbout` (from `services`), `contactPoint`;
and `currenciesAccepted` / `knowsLanguage` on the business node.

Four recommended LocalBusiness fields stay absent because nobody has supplied
them — `priceRange`, `aggregateRating`, `foundingDate`, `numberOfEmployees`.
The rule at that constant is the standing one: structured data may restate what
the site already says and may not invent what it does not.

### Images: one asset gap left

`next.config.ts` sets `minimumCacheTTL` to 30 days. The optimiser derives its
cache header from the upstream file and `public/` is served `max-age=0`, so
every optimised variant was revalidated on every repeat visit — thirteen
conditional round trips on a service page. The trade-off is stated at the
constant: these URLs key on source path, not content hash, so **replacing a
photo at the same filename leaves returning visitors on the old one for up to
a month.** Change the filename instead; it is one line in `photos.ts`.

The gap: `public/services/commercial-cleaning.webp` is **600x400** and is the
LCP hero of `/services/commercial-cleaning`, upscaled roughly 2.4x on a
full-bleed banner. It is the client's own photograph supplied at thumbnail
size, and every larger commercial image is already assigned to a scope tile, so
swapping it would either duplicate a photo on the page or weaken the card.
**Ask the client for the original at 2560x1600.** Do not fix it by reusing a
tile.

### What the audit tools get wrong here

Worth knowing before acting on one. A generic crawler will report the
photography as unoptimised because it measures the source file in `public/`.
Nobody downloads that file: `hero.webp` is 742 KB on disk and the browser
receives **17.5 KB of AVIF** at 640px, 113 KB at 1920px. The whole homepage,
all assets included, is 385 KB over 26 requests, with CLS at 0 and TTFB near
60 ms.

There is no image weight problem on this site. Chasing one costs quality.

## Analytics, and telling Bing when a page changes

Two separate things, added in the same pass at the client's request. Neither is
a secret, and both fail silently when they fail, which is the reason for the
length of what follows.

### Google Analytics 4 — and the CSP line that makes it work

`GA_MEASUREMENT_ID` in `app/layout.tsx` is `G-SJE51YKEFY`, declared once and
used twice (loader URL, `config` call) so the two cannot disagree. It loads
through `next/script` at `afterInteractive`, alongside Microsoft Clarity, rather
than inline "immediately after `<head>`" as Google's copy-paste instructions
say — that wording is for a hand-authored page with no script loader, and
putting a third-party script in front of the LCP render would cost the number
analytics exists to measure.

**The load-bearing part is not the tag, it is `next.config.ts`.** This site
sends a strict `Content-Security-Policy`, so a pasted snippet does nothing at
all until its hosts are allowed, and there is no error anybody sees on a
production build. GA4 needs three directives, not one:

- `script-src` → `https://www.googletagmanager.com`, for `gtag.js`. Missing
  this, nothing loads.
- `connect-src` → `https://*.google-analytics.com`, and the wildcard is
  required rather than tidier: a Canadian property collects to
  `region1.google-analytics.com`, not the `www` host the docs quote. Missing
  this is the worse failure of the two, because the tag loads, Realtime shows
  a user, and every event after that is dropped.
- `img-src` → the same hosts, for the pixel fallback gtag uses when the page is
  unloading.

**Any future analytics, ads or tag-manager snippet gets its hosts added in the
same commit as the snippet.** That rule exists because the opposite already
happened here: `*.clarity.ms` was in `script-src` and `connect-src` but never
in `img-src`, so `c.clarity.ms/c.gif` had been refused on every page load since
Clarity landed, and it was found only because adding GA4 meant reading the
console on a production build. Clarity's actual telemetry was never affected —
that goes to `t.clarity.ms` over `connect-src` — so session replay and heatmaps
have been recording correctly the whole time. Only the ID-sync pixel was blocked.

**One CSP error survives on purpose and is not a bug to fix.**
`c.clarity.ms/c.gif` redirects to `c.bing.com` to sync the Clarity ID with a
Bing advertising ID, and CSP is enforced on the redirect target. `c.bing.com`
is deliberately absent, for the same reason `stats.g.doubleclick.net` is absent
from `connect-src`: an ad host is a new vendor for visitor data to reach, which
is the client's decision and not something to open in order to quiet a console
warning. If the client asks for Google Signals or the Clarity/Bing Ads
integration, that is when those hosts go in.

**No route-change handler, and that is verified rather than assumed.** App
Router navigations do not reload the document, so the usual worry is one
page_view per session. GA4's Enhanced Measurement watches History API changes
itself; a client-side navigation from `/` to `/services` was measured on a
production build sending a second `page_view` with the new `dl`. Keeping it out
means no `usePathname` client boundary, which keeps the no-client-imports
invariant intact. If pageview counts ever look like one-per-session, check
Enhanced Measurement in Admin → Data streams before writing a handler.

### IndexNow — `npm run indexnow`

`indexnow.mjs` submits URLs to Bing and the other participating engines so a
changed page is fetched now rather than at the next crawl. Run it **after** a
deploy is live:

```
npm run indexnow                 every URL in the live sitemap
npm run indexnow -- --dry-run    preflight only
npm run indexnow -- --url /about --url /services/roof-cleaning
```

**The key is public by design.** IndexNow verifies ownership by having the key
served from the domain, so `public/b4fb95fcf3d843bfb3a53c9040b9b56e.txt` is
committed and published on purpose. The script reads the key out of that served
file rather than repeating it, so filename, contents and submitted key cannot
drift; rotating the key is one file rename, and the script refuses to run if it
finds two key files, because a stale one still being served hides a half-done
rotation.

**The Bing Webmaster Tools OAuth client ID and secret are a different thing and
are not in this repository.** They are for an application reading a Webmaster
Tools account; IndexNow needs no authentication at all. Do not add them.

**What it submits comes off the live sitemap, deliberately.** A second list of
URLs would be the first thing to drift, and drift means submitting a `noindex`
URL or a 404 — the two failures `app/sitemap.ts` is written to avoid. Reading
the live sitemap means this script cannot disagree with the `indexing` flags or
with what is actually deployed, and a route held back by a flag is never
submitted with no second condition to remember.

**Google does not participate in IndexNow.** Bing, Yandex, Seznam, Naver and
DuckDuckGo do, and `api.indexnow.org` fans one submission out to all of them.
Google's Indexing API takes JobPosting and BroadcastEvent only, so for this site
Google stays sitemap plus Search Console. There is no "Google IndexNow" to add.

**And there is no sitemap ping to add either.** The obvious-looking substitute
is `GET /ping?sitemap=...`, which is still in a decade of blog posts and in
plenty of deploy scripts. Both endpoints are gone, measured on 2026-09-09
rather than assumed: Google's answers **404**, Bing's answers **410 Gone** —
the status code for "deliberately not coming back". Bing replaced it with
IndexNow, which is why `indexnow.mjs` exists. Adding a ping would be a request
that fails on every run, and the failure would read as the script being broken.

Google's side is already wired as far as it can be: `sitemap.xml` is declared in
`robots.txt` (`app/robots.ts`), and `public/google807aab8c24a997b5.html` is the
Search Console verification. There is no way to *push* a change to Google. That
asymmetry with Bing is a fact about the two companies, not a gap to close.

**A 202 is not proof of anything.** The endpoint answers `202 Accepted` to a GET
carrying a key that has never existed anywhere; validation happens later and out
of band. The real check is the key file being reachable, which the script does
itself before submitting and refuses to continue without.

It is a command rather than a `postbuild` hook because a build hook fires on
preview builds and on builds that never go live, each one asserting that a
production URL has changed. Wiring it into CI later is fine — it needs no
secret.

## Version control

Git-tracked, with `origin` at `getgrowthnexus/raincity-website`. `.gitignore`
covers `node_modules/`, `.next/`, `*.tsbuildinfo`, the usual build output, and
the loose screenshot PNGs the `shot-*.mjs` scripts write to the project root.

---

## Cross-account memory (Notion)

This project also has a page in Touseef's Notion "🧠 Claude Brain — Growth Nexus" workspace, in the **Projects** database: https://app.notion.com/p/3ce14a4c95a3815cadfaf1672ab825ae

That Notion page is the cross-account memory for this project (status, decisions, open items) and survives even if Touseef switches Claude accounts — this file is the fast, local, per-repo memory Claude Code loads automatically every session. Keep both current: when something durable changes here, mirror the summary to the Notion page too (and vice versa). Also check 👤 Profile & Preferences on that same Notion workspace for how Touseef wants Claude to work with him generally (skills/plugins first, Opus for planning vs Sonnet for execution, understand before acting, tolerate Roman Urdu).
