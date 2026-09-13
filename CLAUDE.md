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

Concretely, as of the AEO/GEO pass: `next build` prerenders 52 HTML pages
plus `robots.txt` and `sitemap.xml`. Four of those are not public routes — the
framework's own `_not-found` and `_global-error`, and the `/disclaimer` and
`/refund-policy` redirect stubs — leaving 48 public pages. Four more are the
`/blog/page/N` archive pages, which resolve, are linked, and are deliberately
`noindex` (see "The archive pager is noindex" below), leaving 44 indexable.

**The sitemap lists 42 of them.** `indexing.blog` (see "One flag decides what
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

### Testimonials — two, both real

The four invented entries were removed rather than replaced. Details and the
reasoning are under "Four testimonials were removed, not replaced" below. The
standing rule is unchanged and is the important part:

**Never invent a testimonial, a star rating or a review count.** Do not add
`Review` or `AggregateRating` JSON-LD from anything other than a real review
platform. `lib/seo.tsx` gates the rating on `verified && reviewCount > 0` and
both halves have to be earned.

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
of the site already claims — the badge in `awards`, the "Satisfaction
guaranteed on every job" trust point in `servicePage`, "Every job guaranteed"
on the painting service. It is written with a redo as the first remedy and a
refund second. Narrowing it in review means revisiting those claims in the same
pass, and `/refund-policy` now redirects here, so this section is the only
thing backing them.

(The before-and-after clause that used to be the Disclaimer's restated
`projects.disclaimer`. That page is gone; the disclaimer rendered above the
homepage Projects grid is now the only place that claim lives, and it comes off
when `projects.illustrative` goes false.)

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

Three of the eleven service pages carry the client's own photographs: Window
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

The other eight pages are illustrated with frames that came from Unsplash,
one chosen per slot against the shot brief that used to be that slot's
`placeholder` string. They are downloaded, not hot-linked: the original sits
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

**Eight slots are still `placeholder`,** and they are all the same kind of
thing: process documentation that stock does not contain. A timestamped
service log on a tailgate, two sealer test squares on one slab, a layout
sketch held against a frontage, labelled light coils going into a bin, a
caulk bead being tooled, an oil spot being degreased, tied debris bags on a
drive, a mid-season light repair in the rain. No search finds these. They get
taken on a job or they get made.

The registry's own header comment carries the same account at the point of
use. Keep the two in step.

### The social links are placeholders

`social` in `lib/content.ts` is now an **empty array**, and the footer
therefore renders no social icons at all. It carried four entries — Facebook,
Instagram, X, LinkedIn — with every `href` set to `"#"`, until commit `71dc640`
emptied it: four icons that go nowhere read as broken, and a guessed handle is
worse still, because it points visitors at a stranger's account under
RainCity's name. The client has not supplied the real profile URLs.

Before launch, add an entry per network the company actually uses, with its
real URL. `sameAs` is deliberately absent from the LocalBusiness JSON-LD while
the array is empty — add it in the same pass that fills the array, not before.

Raise this at launch alongside the testimonials, the policy pages and the
blog. It is the smallest of the four and the quickest to close.

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
that catches people: `QuoteForm` sits directly below and already embeds a map
queried on the base city, so a map in this section would be the second New
Westminster map inside one screen.

**`travelValue` — "None, anywhere in the service area" — is not confirmed by
the client, and it is the fifth launch item.** The policy is already published,
in the "Is it cheaper because you are based here?" answer on
`/locations/new-westminster`, but that is one answer at the foot of one page.
This promotes it to a ruled fact directly above the quote form. A published
pricing policy the office does not hold to on the phone is worse than none,
which is the standing rule on the legal pages and does not change here. Raise
it with the testimonials, the policy pages, the blog and `social`.

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
eleven services. It is fine as atmosphere on `/blog`. It used to be the
New Westminster photo on `/locations` and that community's hero; on 2026-09-13
it was replaced there by `aboutHomeGround` (Pier Park), and Surrey's 550px
`concreteSealing` hero — stretched 2.6x at desktop — by `powerParkades`.
Both came out of an image audit of all nine community pages at 1x, 2x and 3x.

### /about also carries Founders and Partnerships, and one of them is empty

Both added at the client's request. `founders` and `partnerships` in
`lib/content.ts` hold the data; `components/about/Founders.tsx` and
`components/about/Partnerships.tsx` hold the reasoning.

**Both render `null` when their arrays are empty, and Founders is empty
today.** That is the `social` arrangement — an empty array and no section,
rather than a section full of stand-ins — and it means neither has to be
commented out of `app/about/page.tsx` and then remembered later.

**The gated section broke the page's colour rhythm in a way that only showed in
one of its two states, and that is the thing to remember here.** The sequence
was designed as Stats (Fog) → Founders (White) → Partnerships (Fog) → the cut,
which is correct — but with Founders rendering nothing, Stats and Partnerships
became two Fog bands touching. Partnerships is therefore **White**, its logo
tiles are Fog so they stay visible (marks use `mix-blend-multiply` so
Capilano's white-ground JPEG doesn't show as a box), and `SectionEdge` now runs
`from="bg-white"` because that section is what it cuts out of in either state.
Any future gated section needs its grounds checked in both states, not just the
filled one.

**Founders is one person — Glevin Wilson — and is still missing what it needs
to publish.** The client first wrote "Glevin and Wilson", which reads as two
names and was built as two until they were asked; it is one founder. Still
outstanding: role, bio, and a portrait. One spelling trap is recorded at the
constant and repeated here because it looks like a typo and is not — **the name
is Glevin**, confirmed by the client, even though the LinkedIn profile they
supplied is
`linkedin.com/in/andglavin`. Do not "correct" it to Glavin. LinkedIn answers
automated requests with HTTP 999, so the profile cannot be read to check.

**Partnerships was redesigned on 2026-09-13 until the client approved the
direction.** Current form: **partner cards built on the service card's
anatomy**, at the client's request — a Fog visual panel holding the logo with
the blue corner notch, then sector tag (`PartnerGroup.tag`), `display-s` name,
a two-line `body-s` blurb (`Partner.blurb`) and "Visit Site →" for linked
partners. 3x3 at `lg` (a row per sector), two across with the ninth centred on
tablet, one column on phones. **Blurbs describe the organisation from its own
site or the public record, never the relationship**; SA Cleaning and CFOne
carry "full details to follow" placeholders until the client supplies
something verifiable. **4px corners
(`--radius-card` in `globals.css`) are the site's only card radius** — the
client asked for a slight softening here; do not spread it without asking.
Rejected along the way, each recorded in the component: a ruled register with
96px marks (logos louder than the heading), a strip of small nameless tiles
("a pencil drawing without colours"), and 16px-rounded sector panels holding
tiles (messy nesting, too round). The per-group `layout` field, the
`PartnerCarousel` component and the per-partner `accent` stripes were all
removed. Do not bring back a carousel for a handful of marks. Seven partners carry logo files (sourced from their own
sites or Wikimedia, recorded on each `logo` entry, and **needing the client's
written permission before launch**); CFOne and SA Cleaning have none and render
their name as the mark. `Partner.logo` is optional so files drop in one at a
time. Logos go under `public/partners/`, not `photos.ts`: that registry is for
photography and its tone, ratio and focal fields mean nothing for a wordmark.

Two things about that section are **not settled and should not be published
without the client confirming them**:

1. **Every group says "partners", on the client's instruction.** Asked what
   these organisations are, they said the companies are trade partners, that
   RainCity also works at some of their sites, and that because those are
   separate businesses the relationship to publish is the partnership rather
   than the customer one. Keep it that way — "client" asserts a commercial
   engagement about a named third party and would need each of them to agree
   to it being published. The three groups split by sector, not relationship;
   the relationship is the same across all nine.
2. **"CFOne" and "CFIB" were sent as "cfone" and "cfib".** CFIB is almost
   certainly the Canadian Federation of Independent Business and CFOne most
   likely the Canadian Armed Forces community programme, but "almost certainly"
   is not the standard for printing an organisation's name on a client's site.

**The `Property management` group is empty on purpose.** The client asked to
"put just some property management companies for now". Inventing those would
put identifiable third parties on this page as customers of a company they may
never have engaged, in a market small enough that both sides would recognise
it. That is a false endorsement, not placeholder copy, and it is the one
instruction in that message that was not carried out. Same rule governs logos.

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

Two lists do **not** derive and must be updated by hand alongside it:

1. `quoteForm.serviceOptions` in `lib/content.ts` — a deliberately short
   six-option dropdown, not the full catalogue
2. `public/llms.txt` — a static file

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
  originals are in `assets/` as always. `og-default.png` is the one deliberate
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

`testimonials.items` carries two reviews, both real, both from the client's own
homepage. The other four were invented to fill the carousel and are gone, on the
client's confirmation that only those two are genuine. The on-page disclaimer
went with them, along with the condition that gated it — which tested whether a
review carried a `service` field, a proxy for "is a placeholder" that would have
put the disclaimer back over the first real review that happened to have one.

`verified` is now `true` and means what it says. **No rating is published**:
`localBusinessSchema` requires `verified && reviewCount > 0`, and the count is
still zero because no review platform is connected. Set the count and the
average together, from a real source, or not at all.

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

`LocationServices` puts all eleven service links on all nine community pages.
Nothing pointed back until `components/service/ServiceAreas.tsx` landed: the
built HTML of a service page contained eight internal hrefs, all top-level, on
the eleven pages most likely to be a search entry point. `RelatedServices`
beside it adds the sideways links, from `relatedBySlug` in `content.ts` — a
written map, because the adjacency that matters is physical (the ladder is
already at the gutter; a slab is washed before it is sealed) and no ordering of
the `services` array encodes that.

**The header's dropdowns are not internal links.** `Header` holds its children
behind `openMenu` state, so the eleven service and nine community links exist
in no route's server HTML. Anything a crawler is meant to follow has to be in a
section. This is the thing that made the gap invisible for so long.

### Headings on the service template are measured, not eyeballed

`servicePage.areas.heading` is one fixed string across all eleven pages, and it
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

### `sameAs` is wired and waiting

`organizationSchema` and `localBusinessSchema` both spread a `sameAsField`
derived from `social` in content.ts. It stays **absent** while that array is
empty, because an empty `sameAs: []` is a published claim to have no profiles
anywhere. Filling `social` lights it up on both nodes with no second edit here.

This is the site's largest remaining gap and it is client-blocked: the entity
is asserted by one domain and corroborated by nothing. The Google Business
Profile URL is the one that matters most.

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
