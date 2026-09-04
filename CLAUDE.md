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

Concretely, as of the SEO growth pass: `next build` prerenders 39 HTML pages
plus `robots.txt` and `sitemap.xml`. Four of those are not public routes — the
framework's own `_not-found` and `_global-error`, and the `/disclaimer` and
`/refund-policy` redirect stubs — leaving 35 public pages.

**The sitemap lists 32 of them.** `indexing.blog` (see "One flag decides what
is indexed" below) moved from `false` to `true` in the SEO growth pass, so the
blog index and its six posts are back in `sitemap.xml` and off `noindex` —
seven URLs, up from the 25 the sitemap carried while the whole section was
held. The two policy pages are still `noindex` and still absent, awaiting the
legal review `indexing.legal` is gated on. `/blog/page/2` is separately and
permanently omitted so the archive keeps a single canonical entry point.

Every internal `href` in the built HTML resolves to a built route — 1,465
anchor tags, zero broken, verified from the build (the count moved up from
the growth pass's 918 once `ServiceAreas` and `RelatedServices` landed on
every service page and the blog's `linked` blocks shipped). There are no `#`
placeholder links left anywhere: `social` is an empty array and the footer
renders no social icons at all (see below).

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

`lib/content.ts` → `blogPosts` carries six articles under a `PLACEHOLDER BLOG
CONTENT` comment block. Titles, excerpts, dates, read times and body copy were
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

## Version control

Git-tracked, with `origin` at `getgrowthnexus/raincity-website`. `.gitignore`
covers `node_modules/`, `.next/`, `*.tsbuildinfo`, the usual build output, and
the loose screenshot PNGs the `shot-*.mjs` scripts write to the project root.

---

## Cross-account memory (Notion)

This project also has a page in Touseef's Notion "🧠 Claude Brain — Growth Nexus" workspace, in the **Projects** database: https://app.notion.com/p/3ce14a4c95a3815cadfaf1672ab825ae

That Notion page is the cross-account memory for this project (status, decisions, open items) and survives even if Touseef switches Claude accounts — this file is the fast, local, per-repo memory Claude Code loads automatically every session. Keep both current: when something durable changes here, mirror the summary to the Notion page too (and vice versa). Also check 👤 Profile & Preferences on that same Notion workspace for how Touseef wants Claude to work with him generally (skills/plugins first, Opus for planning vs Sonnet for execution, understand before acting, tolerate Roman Urdu).
