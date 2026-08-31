# RainCity Property Maintenance — Website

## Project overview

Ground-up rebuild of the RainCity Property Maintenance website, replacing an
existing WordPress site with a static Next.js build. RainCity is a mobile
property-maintenance and exterior-cleaning company based in New Westminster,
BC, serving Greater Vancouver — residential homeowners, strata corporations
and commercial property managers.

The homepage (`app/page.tsx`) is composed of section components, and the
routes below it have been landing one at a time: `/about`, `/services`,
`/services/[slug]`, `/locations`, `/contact`, the four policy pages, `/blog`
(with `/blog/page/[page]` for the archive pager), `/blog/[slug]` and
`/locations/[slug]` for the nine communities all resolve. Every route the
site links to now exists, and the two omissions that were held while
`/locations/[slug]` did not — the nine sitemap entries, and the `url` on each
item of the `locationsPageSchema` ItemList — were lifted in the same commit
as that template.

Concretely, as of the production-readiness pass: `next build` prerenders 39
HTML pages plus `robots.txt` and `sitemap.xml`. Two of those pages are the
framework's own `_not-found` and `_global-error`, leaving 37 public routes.
The sitemap lists 36 of them — the difference is `/blog/page/2`, which is
deliberately omitted so the archive keeps a single canonical entry point.
Every internal `href` in the built HTML resolves to a built route; the only
`#` links left are the four social icons in the footer, which are placeholders
(see below).

## Tech stack

- **Next.js 16** (App Router, Turbopack) — fully static, `next build`
  prerenders every route
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — config lives in
  `app/globals.css` (`@theme`), not a `tailwind.config.js`
- **Framer Motion 13** — only through `components/ui/Motion.tsx`
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

### Motion

Framer Motion is used site-wide but deliberately narrow. Everything goes
through `Reveal`, `Stagger` and `StaggerItem` in `components/ui/Motion.tsx`:

- Fade plus a 16px upward slide. Nothing else.
- 400–600ms, ease-out, no overshoot. No springs, scale, rotation or parallax.
- Grid children stagger; each element animates once, on entry.
- No scroll-jacking, no scroll-linked transforms.
- `prefers-reduced-motion` is honoured **in CSS** (the `[data-motion]` rule in
  `globals.css`), not via `useReducedMotion()`. This is load-bearing: branching
  in JS left the server rendering `opacity: 0` for reduced-motion users and
  never clearing it. Do not "simplify" it back into the component.

If a new section needs motion, use the existing wrappers. Do not introduce a
second animation idiom.

### Testimonials are placeholder content

`lib/content.ts` → `testimonials` carries a `PLACEHOLDER` comment block
marking exactly which entries are invented. Only the first two came from the
client's own site; the rest were written to fill the carousel and correspond
to no real customer.

- These **must be replaced with real reviews before launch**.
- Do **not** add `Review` or `AggregateRating` JSON-LD until they are real —
  `lib/seo.tsx` deliberately omits `aggregateRating` and says so in a comment.
- `public/llms.txt` also tells AI systems not to cite them. Keep that note
  until the copy is real.
- Never invent additional testimonials, star ratings or review counts.

### The four policy pages are unreviewed placeholder text

`lib/content.ts` → `legalPages` carries the Terms & Conditions, Privacy
Policy, Disclaimer and Refund Policy, each opening with a `PLACEHOLDER LEGAL
TEXT` comment block. All of it was drafted to read as standard BC
service-business policy copy. **None of it has been reviewed by a lawyer or a
paralegal, and it must not go live until it has been.**

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

Two constraints on editing this copy:

- The Refund Policy must stay consistent with the satisfaction guarantee the
  rest of the site already claims — the badge in `awards`, the "Satisfaction
  guaranteed on every job" trust point in `servicePage`, "Every job
  guaranteed" on the painting service. It is written as a workmanship
  guarantee with a redo as the first remedy. Narrowing it in review means
  revisiting those claims in the same pass.
- The Disclaimer's before-and-after clause restates `projects.disclaimer`. If
  genuine RainCity job pairs replace the illustrative ones, both change
  together.

The pages are in the sitemap at priority 0.3 because they resolve and the
footer links to all four, so a crawler reaches them regardless. If the text
must not be indexed before review, the control is `noindex` on those routes,
not omission from the sitemap.

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

`social` in `lib/content.ts` carries four entries — Facebook, Instagram, X,
LinkedIn — and every `href` is `"#"`. They are rendered in the footer, so the
built site currently ships four icons that go nowhere. The client has not
supplied the real profile URLs and they must not be guessed: a wrong handle
points visitors at a stranger's account under RainCity's name.

Before launch, either fill in the four real URLs or delete the entries for
networks the company does not use. `sameAs` is deliberately absent from the
LocalBusiness JSON-LD while these are `"#"` — add it in the same pass that
fills them in, not before.

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

## Version control

Git-tracked locally, not yet connected to a GitHub remote. `.gitignore`
covers `node_modules/`, `.next/`, `*.tsbuildinfo`, the usual build output, and
the loose screenshot PNGs the `shot-*.mjs` scripts write to the project root.
