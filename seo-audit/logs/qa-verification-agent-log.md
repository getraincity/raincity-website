# QA / Verification Agent — log

**Ran:** 2026-09-02 · **Phase 5** · Independent cold read

## Method

Ran by an agent with no context from the pass it was auditing. Given the audit,
the plan and the four preceding logs, and told to **verify the claims rather
than trust them** — fresh `npm run typecheck` and `npm run build`, then every
measurement taken from `.next/server/app/**.html`, `sitemap.xml` and
`git diff`, not from the logs. HTML entities decoded before counting.

That independence was worth having: it found a defect and a fabrication that
the pass's own verification had missed.

---

## Findings raised, and what happened to each

### 1. HIGH — two fictional cities still shipping. **Fixed.**

The Local SEO log claimed the `City: "Ridge Meadow"` / `City: "Tri-Cities"`
problem was closed. It was closed in `areaServed`, `serviceSchema` and
`locationSchema` — and **missed in `locationsPageSchema`'s ItemList**, which is
the hub page for the entire location cluster. Measured: 309 `City` nodes
site-wide, exactly 2 carrying a name that is not an incorporated municipality,
both on `/locations`.

It was missed because that node also carries a `url`, so it did not read as a
bare place node when `citiesOf()` was threaded through the others. The one page
whose whole job is to enumerate the service area was the one page still
publishing a place that does not exist.

**Fix:** the ItemList now keeps one entry per page (nine, matching
`numberOfItems`), but the item is a `City` for the seven entries that are one
and a `Place` with `containsPlace` for the two that are not.

Verified after fix: **312 City nodes site-wide, 0 non-municipality**, ItemList
still 9 items:

```
6  Place  Ridge Meadow -> Maple Ridge, Pitt Meadows
8  Place  Tri-Cities   -> Coquitlam, Port Coquitlam, Port Moody
```

### 2. HIGH — a fabricated operational commitment. **Fixed.**

In the closing signpost written for `/blog/three-days-of-snow`:

> "For a site that also needs year-round common-area work, **the two run on one
> contract**, in any of the communities we cover."

That asserts RainCity will bundle a winter snow agreement and a year-round
commercial agreement into a single contract. Grepped against `HEAD` — **zero
precedent** anywhere on the site, and it sits against the snow page's own
seasonal framing. It is exactly the category of claim this pass was written not
to make, and it was made by the pass itself.

**Fix:** rewritten to point at the two pages and say nothing about how they are
contracted.

> "…and the year-round side of a commercial site is common-area cleaning. Both
> are quoted for the property, in any of the communities we cover."

### 3. MEDIUM — a pricing claim promoted from one FAQ to eleven pages. **Fixed.**

`servicePage.related.body` ended: *"Booking them on one visit costs less than
booking them on two."* Not invented — the Anmore FAQ already shipped a version
of it at HEAD — but promoting an unconfirmed bundling-price claim from one
community FAQ into site-wide commercial copy is a different thing, on a site
whose `llms.txt` states that prices are not published.

**Fix:** the setup argument stands without the price claim. The sentence now
reads *"Worth knowing before a second visit is booked for something the first
one was already set up for."*

### 4. LOW — an invented fact in a code comment. **Fixed.**

The `power-washing` entry in `relatedBySlug` claimed the wrong pressure on the
wrong surface is *"the most common damage we get called out to look at"* —
company service history stated as fact. Not rendered, so no public exposure,
but it sat in the canonical content file where a later pass could lift it into
copy. Rewritten to describe the method distinction instead.

### 5. LOW — `CLAUDE.md` stale on the social links. **Fixed.**

The file still described `social` as four entries with `href: "#"` shipping
four dead icons in the footer. It has been an empty array since commit
`71dc640`; the built HTML has zero social icons. The section predates this
pass, but `CLAUDE.md` *was* edited in this pass and this was not caught.

Corrected, along with the project-overview paragraph, which still claimed 36
sitemap URLs and "four `#` links left in the footer".

### 6–8. INFO — checked and cleared, no action

- **Dangling `@id` on blog posts** (`isPartOf` → `/blog#webpage`, defined only
  on `/blog`). Correct schema.org practice — `@id` resolution is site-global,
  and "this post is part of the blog collection" is the accurate relationship.
- **`/disclaimer` and `/refund-policy` prerender with `index, follow` and no
  `<h1>`.** Confirmed never served: `next.config.ts` 301s both before
  filesystem routing. Matches the withdrawn finding T-4.
- **Hardcoded "nine"** in `"See all nine communities"` — already present
  verbatim at HEAD, not a regression, but a spot the "locations live in one
  data source" rule does not reach.

---

## Verified CORRECT — the agent's own measured numbers

| Check | Measured |
|---|---|
| `typecheck` / `build` | Both clean; 42 route entries, 39 HTML files |
| Indexable titles over 60 chars | **0** (range 40–60) |
| Indexable descriptions over 158 chars | **0** (range 137–158) |
| Duplicate titles/descriptions among indexable pages | **0** — the only duplicates are the three pages that render the 404 body |
| Sitemap URLs | **25**, and **0** of them noindexed; **0** indexable pages missing |
| JSON-LD blocks | **159**, **0** invalid |
| `WebSite` node | present on 36/39 (absent only where no schema is published at all) |
| Homepage `areaServed` | **12 City nodes, all real BC municipalities** |
| `aggregateRating` / `sameAs` / `streetAddress` | all **absent**, per CLAUDE.md |
| Internal anchors | **918**, **0 broken** |
| Service page inbound links | 11–20 each |
| Location page inbound links | 14–17 each |
| Service page overlap | max **20.2%**, mean 19.1% — *safe; the plan's own tripwire is 35%* |
| Location page overlap | max **24.3%**, mean 22.4% — *safe* |
| Pages with exactly one `<h1>` | **37/39** (the two exceptions are the 301'd stubs) |
| Skipped heading levels | **0** |
| `<img>` tags missing or with empty `alt` | **0 of 318** |

**Convention compliance — both new components pass.** No `"use client"`; copy
from `content.ts`; motion only via `Motion.tsx`; icons from the hand-rolled
`Icon.tsx`; no new dependencies. **Every Tailwind class is a whole literal
string** — the only computed class comes from the pre-existing
`shortRowOffsets()` lookup table. Class lists were diffed against
`NearbyAreas.tsx` and `LocationServices.tsx` and match. **The `max-w-prose`
trap is correctly avoided** in both files: it sits on the `Reveal` wrapper at
body font size, never on the `display-l` heading inside it.

**Fabrication check — 4 of 5 areas clean.** The agent reassembled every
`linked` block's `parts` and diffed against `HEAD`: **12 blocks total, 6
reassemble word-for-word identically to the pre-existing sentence.** The claim
that the in-prose links change no copy is verified. Five of the six new
signposts assert only facts about the website; the sixth was finding 2. All 20
rewritten meta descriptions are trims with no new claim. `llms.txt` additions
are verifiable BC geography and a caution that *reduces* fabrication risk. **No
testimonial, review count, rating, author name or publication date was added
anywhere in the diff.**

---

## What this pass cost, and what it was worth

Two findings would have shipped without an independent reader: a fictional
place in the structured data of the location hub, and an invented contracting
arrangement in the copy. Both were introduced or missed by the same work that
then verified itself, which is the argument for the cold read.

The three headline claims most likely to fail under measurement — 918 anchors
with zero broken links, zero over-length indexable metadata, zero
sitemap/noindex contradictions across 25 URLs — all verified exactly as stated.
