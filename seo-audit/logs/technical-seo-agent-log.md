# Technical SEO & Indexing Agent — log

**Ran:** 2026-09-02 · **Phase 1** · Gate: `npm run typecheck` + `npm run build`, both clean after every change.

---

## 1. Single-source indexing flag — `indexing` in `lib/seo.tsx`

**Problem.** Two route groups were held out of search, and each hold lived in
two unrelated files that disagreed with each other. Three blog route files and
two legal route files each carried a literal `robots: { index: false }`, while
`app/sitemap.ts` went on listing all eight blog URLs and both legal URLs.

That is a contradiction a crawler reads twice: the sitemap says *"canonical
content, index this"*, the page header says *"do not"*. Google resolves it in
favour of the page and files ten URLs under **"Excluded by 'noindex' tag"** in
Coverage — noise in the one report that should be signal. It also meant lifting
a hold required remembering five route files *and* the sitemap, and the sitemap
is the one that gets forgotten.

**Change.**

```ts
export const indexing = { blog: false, legal: false } as const;
export function searchDirectives(published: boolean): Pick<Metadata, "robots">
```

- Five route files now spread `...searchDirectives(indexing.blog | .legal)`
  instead of a literal.
- `app/sitemap.ts` gates the blog index, the six posts and both legal pages on
  the same two booleans.
- `searchDirectives(true)` returns `{}` rather than `{ index: true }`, so a
  released route inherits the layout's directives instead of carrying a second
  copy to keep in step.
- `follow: true` is retained on held routes on purpose: the page is out of the
  index, but links out of it still pass — so the new blog→service links added
  in Phase 3 work today, before the copy is replaced.

**Effect.** `sitemap.xml` went **36 URLs → 25**, and all 25 are indexable. Zero
contradictions between sitemap and page directives. Flipping `blog: true` on
the day the copy is confirmed releases three route files and eight sitemap
entries in one edit.

*(The plan predicted 28 URLs. Actual is 25 — the plan had not accounted for the
blog index itself being gated alongside its posts, which is correct: `/blog`
carries `noindex` too.)*

---

## 2. `WebSite` schema node + `isPartOf` repair

**Problem.** The entity graph had an organisation tier and a page tier with
nothing joining them. There was no `WebSite` node at all, and — found while
fixing it — **all six** page-level nodes (`/about`, `/services`, each service,
`/locations`, `/contact`, the blog index) set
`isPartOf: { "@id": ".../#business" }`, pointing at the **ProfessionalService**.
That is a business, not a website, and it is only declared on the homepage.

*(The audit recorded this as affecting `blogPageSchema` alone. It was six
nodes. The audit's note was corrected in the code comment.)*

**Change.** Added `websiteSchema` (`@id` `/#website`, `publisher` → the
Organization), rendered in the root layout beside `organizationSchema`, and
repointed all six `isPartOf` targets at it.

No `potentialAction` / `SearchAction` — there is no site search, and publishing
a search endpoint that does not exist is a claim a crawler can follow to
nothing.

**Effect.** `WebSite` now on all 36 content pages. **159 JSON-LD blocks across
the site, 0 invalid.**

---

## 3. Image conversion — 31.2 MB of PNG removed

**Problem.** Five PNGs totalling 31.2 MB were 90% of `public/` by weight, and
two of them were the **LCP hero images** on `/about` and `/services`. Every
other photograph on the site was already webp.

**Change.** Converted with `sharp` (already present via Next), at the
dimensions the project's own supplied-photo convention uses — 1920 wide for the
full-bleed bands, 1600 for the card-crop figures. Originals were already
archived in `assets/`, so the PNGs were deleted from `public/` rather than kept
alongside. `lib/photos.ts` `src` paths updated; the three registry `note`
fields that quoted source dimensions were updated to quote the served ones.

| File | Before | After | Saved |
|---|---|---|---|
| `about-us-hero-background` (LCP, /about) | 7.72 MB | 0.31 MB | 96% |
| `our-services-hero-background` (LCP, /services) | 5.90 MB | 0.14 MB | 98% |
| `what-we-offer-section-background` | 8.36 MB | 0.13 MB | 98% |
| `about-us-who-we-are-section-background` | 4.86 MB | 0.09 MB | 98% |
| `about-us-our-process-section-background` | 3.31 MB | 0.06 MB | 98% |
| `about-section-picture.jpg` (bonus, only non-webp left) | 0.50 MB | 0.31 MB | 39% |

The two smoothest images were re-encoded at q90 rather than q82 after their
first pass came out at 30 KB and 50 KB — headroom was free and a smooth image
is where webp artefacts show. The `/about` hero was inspected visually after
conversion; no visible loss.

**Effect.** `public/` **54 MB → 24 MB**. `og-default.png` deliberately stays
PNG — some social scrapers still do not take webp.

**Note on P-2 (orphaned image).** `what-we-offer-section-background` is
registered in `photos.ts` as `servicesOffer` and no component reads it. It was
converted rather than deleted: that removes 8.2 MB while destroying nothing a
designer may have planned to use, and the original is in `assets/` regardless.
Flagged, not resolved.

---

## 4. Finding T-4 — withdrawn

`app/(legal)/disclaimer/page.tsx` and `.../refund-policy/page.tsx` were
recorded in the audit as dead routes to delete. On reading them they are
two-line `redirect()` stubs, each carrying a comment saying why it exists. The
page *content* was genuinely removed in an earlier pass; only the stubs remain,
and `next.config.ts` 301s both paths before filesystem routing is reached.

**No change made.** The audit was corrected in place so a future pass does not
re-discover them and delete something deliberate.

---

## 5. Deliberately not changed

| Item | Why |
|---|---|
| `robots.txt` | Already correct — allows `/`, disallows `/_next/` and `/api/`, names 13 AI crawlers explicitly. |
| Canonical tags | Already correct on every route via `pageMetadata()`. |
| HSTS | Still commented out. Enabling before the host confirms stable HTTPS bricks the domain for returning visitors until `max-age` expires. Launch-checklist item, not a code change. |
| CSP | Unchanged. Dev-mode React logs an `unsafe-eval` console error against it; React does not use `eval` in production, and adding `unsafe-eval` to ship would be a security regression to silence a dev warning. Pre-existing, not introduced here. |
| GA4 / analytics | **Not added.** See §6. |

---

## 6. Analytics — not added, and this was a decision

Most engagements add GA4 in Phase 1. It was not added here because
`lib/content.ts` publishes a Privacy Policy stating this site *"sets no
advertising or tracking cookies of its own and runs no third-party analytics
package."*

That sentence is true today. Adding GA4 would make it false, on a page already
waiting on legal review, without anyone deciding to. The recommendation in the
plan is a cookieless package (Plausible or Vercel Analytics) added in the same
commit that amends that sentence — no cookie banner, no PIPEDA consent
question, and the sentence stays honest. **Client decision, logged not taken.**

---

## Files changed

`lib/seo.tsx` · `app/sitemap.ts` · `app/layout.tsx` · `app/blog/page.tsx` ·
`app/blog/[slug]/page.tsx` · `app/blog/page/[page]/page.tsx` ·
`app/(legal)/terms/page.tsx` · `app/(legal)/privacy-policy/page.tsx` ·
`lib/photos.ts` · six files in `public/`
