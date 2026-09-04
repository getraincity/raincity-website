# Research Agent — log

**Ran:** 2026-09-02 · **Phase:** pre-Phase-1 (keyword and competitor input to the plan)

## What it did

Built the keyword map and competitive read in `01-master-seo-plan.md` §1.

## Method and its limits — read this before quoting anything below

**No search-volume figures were produced, and that is deliberate.** This
engagement has no Keyword Planner, Ahrefs or Semrush access for this account.
Invented volumes are worse than no volumes, because they get repeated in client
meetings as measurements. Every term in the map is grouped by **intent and
commercial priority**, which is the property that actually determines which
page should own it. Attach real volumes before funding the Phase-7 matrix —
that is the decision they exist to inform.

## Findings

**Six intent tiers** (plan §1.2). Tier A (commercial + local, e.g. "gutter
cleaning surrey") lands on `/locations/[slug]`; Tier B (commercial, regional)
on `/services/[slug]`; Tier D (informational) on the blog, **which is currently
switched off by `noindex`**; Tier E (segment — strata, commercial property
management) is the most underexploited on the site.

**Per-service and per-location maps:** plan §1.3 and §1.4. The rule enforced
throughout is that no two pages bid on the same string — a service page owns
its term crossed with the region, a community page owns the same term crossed
with the city.

**The single largest uncaptured keyword opportunity found:** two of the nine
location slugs are groupings, not municipalities. Nobody searches "Tri-Cities
pressure washing" — they search Coquitlam, Port Coquitlam or Port Moody. Nobody
searches "Ridge Meadow" at all; the places are Maple Ridge and Pitt Meadows.
Those five municipality names appeared 16–31 times each in the page *bodies*
and **zero times in the title, the meta description or the structured data**.
Handed to the On-Page agent (title + description) and the Local agent (schema).

## Competitive read

Searched the live SERP for "gutter cleaning Surrey BC pressure washing company
Greater Vancouver" and fetched the strongest result's city page in full.

| Competitor | Architecture | Proof displayed |
|---|---|---|
| Shine City Pressure Washing | 12 locations × 4–8 nested service pages (~60–96 URLs), ~6,500 wd/page, 14 FAQs | "291+ verified reviews", BBB A-rating, HomeStars |
| BC Pressure Washing | Service pages, Surrey/White Rock weighted | "500+ 5-star reviews" |
| Gutter-Vac | Franchise, Whistler→Fraser Valley | Brand |
| Revive Services | South Surrey base, city list (not city pages) | Reviews |
| Twice as Nice | Surrey, service-led | Reviews |

**Two conclusions that shaped the plan:**

1. **The matrix is the market pattern.** The strongest competitor runs
   service × location as nested URLs. That is why plan §2.3 specifies the
   matrix properly rather than dismissing it — and why it is deferred to
   Phase 7 with an entry condition rather than generated blind in this pass.
   See the strategic call at the top of the plan.
2. **Every competitor displays a review count and RainCity cannot.** This is
   the largest single competitive gap and no amount of on-page work closes it.
   It is not a code task; it is in the final report as the highest-ROI action
   available to the business.

**Where RainCity can win:** 11 services against their ~7; genuine year-round
positioning (snow + holiday lights + summer work); and 20 commercial pages that
are better written than the competitors' templated ones. That last advantage
was invisible before this pass because those pages did not link to each other.

## Sources

- [BBB — Gutter Cleaning near Surrey, BC](https://www.bbb.org/ca/bc/surrey/category/gutter-cleaning)
- [Shine City Pressure Washing](https://shinecitypressurewashing.ca/)
- [Shine City — Surrey Pressure Washing](https://shinecitypressurewashing.ca/surrey-pressure-washing/)
- [BC Pressure Washing](https://bcpressurewashing.ca/)
- [Gutter-Vac — Surrey](https://guttervac.ca/surrey/pressure-washing)
- [Twice as Nice](https://www.twiceasnice.ca/)
- [Revive Services Ltd](https://reviveservices.ca/)
- [Lyonridge Property Services](https://lyonridgeservices.com/)

## Handed on

- Municipality-name gap → On-Page agent, Local SEO agent
- Tier-E (strata/commercial) under-exploitation → Content plan §3.2, posts 3, 6, 9
- Blog `noindex` as the Tier-D blocker → final report, client actions
- Review gap → final report, client actions
