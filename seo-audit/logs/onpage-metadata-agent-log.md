# On-Page & Metadata Agent — log

**Ran:** 2026-09-02 · **Phases 2 and 3** · Gate: `typecheck` + `build` clean after every change.

---

## Phase 2 — titles and descriptions

### The problem, measured

Measured from the built HTML, not from source:

- **24 pages had meta descriptions over the ~158-character render limit.** The
  three worst were the three highest-priority URLs on the site: `/` at 270,
  `/services` at 266, `/locations` at 251.
- **9 indexable pages had titles over 60 characters.**

On the homepage the last clause was the phone number, which meant the phone
number was the first thing Google cut.

### Result

| | Before | After |
|---|---|---|
| Indexable pages with over-length descriptions | 24 | **0** |
| Indexable pages with over-length titles | 9 | **0** |
| Longest indexable title | 80 (`/services`) | **60** (`/services/concrete-and-asphalt-sealing`) |
| Longest indexable description | 270 (`/`) | **158** (`/locations`) |
| Duplicate titles / descriptions | 0 | **0** (unchanged) |

### The two template fixes that did most of the work

**Service titles.** `${title} | ${shortName} Property Maintenance, ${region}`
→ `${title} in ${region} | ${shortName}`. One template edit; all 11 titles fell
from 59–79 to 40–60, keyword first, brand last where it can be cut without
losing the query match.

**Location titles.** The template was
`Property Maintenance in ${name}, BC | ${business.name}` — the brand twice, 75
characters on New Westminster, and structurally incapable of naming Coquitlam
on the page that covers Coquitlam. Replaced with a **written** `metaTitle` on
`LocationDetail`, one per community, mirroring the `metaDescription` field
already there. All nine are now 49–55 characters.

Two of those nine are the point:

- `Ridge Meadow` → **"Maple Ridge & Pitt Meadows Exterior Cleaning | RainCity"**
- `Tri-Cities` → **"Tri-Cities Exterior Cleaning, Coquitlam BC | RainCity"**

Those five municipality names appeared 16–31 times each in the page bodies and
zero times in the metadata. Nobody searches "Ridge Meadow".

### Descriptions rewritten

All nine location descriptions (194–223 → 139–149), all eleven service
descriptions (162–171 → 140–155, trims only — the copy was already good), and
`/`, `/services`, `/locations`, `/about`, `/contact`, `/blog`.

The phone number was removed from the homepage description. It is already a
`tel:` link on the page and the `telephone` field in the LocalBusiness markup;
in a meta description it earned nothing and guaranteed it was cut.

### Not rewritten, on purpose

**The six blog post descriptions (178–205).** They are taken from `excerpt`,
which also renders on the cards, and the copy they summarise is placeholder
being replaced whole. Rewriting a summary of a draft is work that gets thrown
away. The **150–158 ceiling is now documented on the `excerpt` field itself**
so the replacement copy is held to it.

---

## Phase 3 — internal linking

### The problem, measured from built HTML

```
/services/[slug]  ──►  nothing.  Eight hrefs, all top-level.
```

The eleven most commercially valuable pages on the site contained **no deep
internal link at all**. Every in-body CTA was `#quote` or `tel:`. A reader who
arrived at `/services/gutter-cleaning` from a search for "gutter cleaning
Surrey" had nowhere to go that answered the second half of what they typed.

**The header nav is not a counter-argument, and is why this went unseen.**
`Header` holds its dropdown children behind `openMenu` state, so the eleven
service links and nine community links **exist in no route's server HTML**.
Confirmed by grepping every built page.

### Three changes

**1. `components/service/ServiceAreas.tsx`** — the mirror of the existing
`LocationServices`. All nine communities as plates (not photo cards — the
reader has just passed six photographed scope tiles; same reasoning
`NearbyAreas` documents), plus a link to the hub. Sits in the exact slot
`NearbyAreas` occupies on the community template, so the two templates now have
the same shape in the same order. **+110 links.**

**2. `components/service/RelatedServices.tsx`** — two or three services booked
alongside this one, from a **written** adjacency map (`relatedBySlug` in
content.ts), not derived from array order. The adjacency that matters is
physical: the roof being cleared means the ladder is already at the gutter; a
slab has to be washed and dried before it can be sealed; paint goes on a
surface that has just been soft-washed. **+28 links.**

**3. `BlogBlock` gains a `linked` member + a branch in `PostBody`.** The union
had no link in any shape and there is deliberately no Markdown parser in the
path, so six articles about moss, gutters, strata schedules and driveway
sealing could not point at the service that does the work. `linked` is a
paragraph whose sentence is broken into parts — strings are prose, objects are
anchors — which keeps in-prose links without opening the door to arbitrary
markup. Exactly the extension CLAUDE.md prescribes: one member, one branch,
both reviewable.

Wired into all six posts: **6 in-prose links** (existing sentences split at a
phrase already in them — no word of copy changed) and **6 closing signposts**
(new, and deliberately saying only where the scope and service area are written
down — no timing, no method, no claim the article had not already made).
**+30 links.**

### Result — inbound internal links per page, from built HTML

| Tier | Before | After |
|---|---|---|
| Location pages | ~3–4 (hub + 2–3 neighbours) | **13–16** |
| Service pages | ~11 | **11–19** |
| Broken internal links | 0 | **0** |

The location tier was the one receiving nothing from the service tier. It is
the tier that should win the "gutter cleaning Surrey" half of the search
volume, and it now gets 11 new inbound links each.

---

## One thing that went wrong, and what it cost

The first draft of the `ServiceAreas` heading was
`{service.title} Across Greater Vancouver` — the phrase the page most wants to
rank for. Measured at 375px in `display-l`, it wrapped to **three lines on six
of the eleven services and four on Concrete and Asphalt Sealing**, against the
template's documented two-line rule. Every shorter suffix behaved the same way;
the service names are simply too long for that type size plus a region.

**Fixed** by dropping the service name and keeping the region:
`"This Work, Across Greater Vancouver"` — two lines on every service at 375px,
verified. The page has already named the service twice above that point (the
h1 and the overview h2), and the nine links beneath carry the geography. The
`service` prop went with the heading rather than being carried unread.

**Why it nearly shipped:** `check-layout.mjs` only measured `#overview-heading`
— it did not know the new headings existed. It now measures all three, so the
next heading added to this template is checked by the thing that is supposed to
check it. That was the more important fix of the two.

---

## Honest cost of Phase 3

Adding two shared bands to eleven pages adds shared text to eleven pages.
Measured 8-gram pairwise overlap across the service pages:

| | Before | After |
|---|---|---|
| Max pairwise overlap | 9.6% | **19.8%** |
| Mean pairwise overlap | — | 18.8% |
| Words per page | ~1,300 | **~1,670** |

19.8% is still **below the location pages' 24%**, which was already comfortably
clear of any duplicate-content concern, and the word count moved toward the
1,600–2,000 target in the plan. The trade — 168 internal links for +10pp of
shared chrome on pages that started at 9.6% — is worth making, but it is a real
trade and it is recorded here rather than buried.

---

## Files changed

`lib/content.ts` (metaTitle field + 9 titles, 9 + 11 descriptions,
`servicePage.areas`, `servicePage.related`, `relatedBySlug`,
`relatedServices()`, `BlogBlock.linked`, 12 blog block edits, excerpt doc) ·
`app/page.tsx` · `app/services/page.tsx` · `app/services/[slug]/page.tsx` ·
`app/locations/page.tsx` · `app/locations/[slug]/page.tsx` ·
`app/about/page.tsx` · `app/contact/page.tsx` · `app/blog/page.tsx` ·
`components/blog/PostBody.tsx` · `check-layout.mjs` ·
**new:** `components/service/ServiceAreas.tsx`,
`components/service/RelatedServices.tsx`
