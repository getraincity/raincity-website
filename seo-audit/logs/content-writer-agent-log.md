# Content Writer Agent — log

**Ran:** 2026-09-02 · **Phase 3**

---

## The refusal, up front

**No new blog posts were written, and no existing post's advice was altered.**

The brief asked for a content plan with an exact number of blog posts written
and published. This site already has six articles. All six were written for the
build, none has been confirmed by anyone at RainCity, and all six carry
`noindex` for exactly that reason. CLAUDE.md's standing rule is *"Never invent
additional posts, author names or publication dates."*

Writing twelve more articles of unconfirmed advice would have doubled the size
of the problem currently keeping the entire informational funnel switched off.
It would have looked like a large delivery and been the opposite of one.

What this agent did instead: **built the machinery those six posts need to be
worth anything the moment they are confirmed**, and wrote the editorial brief
(plan §3.2) so the client can confirm or commission against a keyword target.
Confirming six existing articles lifts `noindex` on eight URLs at once — faster,
cheaper and worth more than writing three new ones.

---

## What was actually written

### 1. `servicePage.areas` — the service→location band copy

One heading, one label, one body paragraph, two CTA labels, shared across all
eleven service pages (the same arrangement `servicePage.process` and
`servicePage.faq` already use).

> "Everything comes off the truck — water, pressure, detergent and power — so
> the kit that reaches a strata lot in Surrey is the one that reaches an
> acreage in Anmore. Pick your community and the page will tell you what the
> work looks like there."

Every clause in that is already asserted elsewhere on the site: the truck
carrying its own water, pressure, detergent and power is stated in the Anmore
FAQ; strata work in Surrey and acreages in Anmore are what those two community
pages describe. **No new fact about the world is introduced.** The sentence
restates coverage the `areaServed` markup on that same page already claims.

Voice check: names a concrete thing (what is on the truck) rather than
asserting a benefit; no superlative; no "solutions". Consistent with
`locationPage.services.body`, which is its mirror.

### 2. `servicePage.related` — the related-services band copy

> "These are the jobs that go with this one, and the reason is nearly always
> the setup: the ladder, the truck or the dried surface is already where it
> needs to be. Booking them on one visit costs less than booking them on two."

The last clause is the only one that could be read as a commitment. It is
already the site's own position, stated in the Anmore FAQ — *"doing both while
the crew is set up costs less than coming back for the second one"* — and it is
a statement about how jobs are priced, not a discount being offered.

### 3. `relatedBySlug` — the adjacency map

Eleven entries, two or three each. Written rather than derived, because the
adjacency that matters is physical and no ordering of the `services` array
encodes it:

- roof → gutter (the ladder is already at the run; the debris from one lands
  in the other)
- power washing → concrete sealing (a slab must be washed and dried *before* it
  can be sealed — this pair is an order of operations, not a suggestion)
- soft washing → painting (paint goes on a clean, sound surface or it does not
  hold)
- snow/salting → landscaping, commercial (the two seasonal ends of one strata
  contract)

Each carries its reason as a comment at the point of use.

### 4. Nine location meta descriptions, rewritten

139–149 characters, down from 194–223. **Every place name in the new versions
was already in the old one or in that community's page body.** Nothing new was
claimed about any community.

The two grouping pages are the substantive change:

- Ridge Meadow's description now says **"Maple Ridge and Pitt Meadows"**
- Tri-Cities' now says **"Coquitlam, Port Coquitlam and Port Moody"**

Both are simply true, both were already true on the page, and neither name had
ever appeared in metadata.

### 5. Eleven service meta descriptions, trimmed

162–171 → 140–155. **Trims only.** Each lost one clause the page body already
carries. No claim was added, removed or softened. Example:

> before: "Gutter cleaning across Greater Vancouver — every run cleared by
> hand, debris bagged and removed, downspouts flushed and augered, then
> flow-tested **before we leave**."
> after: same sentence, minus "before we leave" (148 chars).

### 6. Twelve blog blocks — six in-prose links, six closing signposts

**The six in-prose links change no word of copy.** Each takes an existing
paragraph and splits the sentence at a phrase already in it, so that phrase
becomes an anchor:

> "…the **gutters are carrying it too**." → links to `/services/gutter-cleaning`
> "…which is why **salting** works here…" → links to `/services/snow-removal-salting`

**The six closing signposts are new sentences**, and they were written under a
deliberate constraint: each says only *where information is written down* and
*where the company works*. None states a timing, a method, a price or an
outcome. They are facts about the website, not facts about the world — which is
the one category of new sentence that is safe to add to placeholder copy that
has not been confirmed.

> "The scope, the method and what moves the price are set out on the roof
> cleaning page, and the low-pressure approach this article describes is soft
> washing. We work across nine Greater Vancouver communities."

---

## Depth target: partially met

| | Before | After | Plan target |
|---|---|---|---|
| Service page word count | ~1,300 | **~1,670** | 1,600–2,000 |
| Service page FAQs | 6 | 6 | 8–10 |
| Location page word count | ~1,190 | ~1,190 | 1,400+ |

Word count met at the low end of the target. **The FAQ deepening was not
done**, and that is the honest gap in this phase: the strongest competitor
carries 14 FAQs per page against RainCity's six, and adding four more per
service means writing answers about method, timing and pricing that nobody at
RainCity has confirmed. That is precisely the fabrication this pass exists not
to commit. It is specified in the plan as client-confirmed work, and it is the
largest content opportunity left on the site after the blog.

---

## Files changed

`lib/content.ts` only — `servicePage.areas`, `servicePage.related`,
`relatedBySlug`, `relatedServices()`, 9 location `metaTitle` + `metaDescription`,
11 service `metaDescription`, 12 blog blocks, and the doc comment on `excerpt`.
