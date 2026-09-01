# Search Console Readiness Report — RainCity Property Maintenance

**Generated:** 2026-09-01  
**Domain:** https://raincitypms.com  
**Framework:** Next.js 16, fully static (`next build` prerenders every route)

---

## 1. Verification File

**File:** `google807aab8c24a997b5.html`  
**Status:** ✅ Placed at `public/google807aab8c24a997b5.html`

The file has been copied from `assets/` (source archive, never served) to `public/` (static root, served at the site root URL). Once deployed, the file is accessible at:

```
https://raincitypms.com/google807aab8c24a997b5.html
```

No further action needed — just deploy.

---

## 2. Google Maps Issue

### Diagnosis

All three map embeds (homepage quote form, `/locations` coverage map, each `/locations/[slug]` community map) were using the legacy Google Maps embed URL:

```
https://maps.google.com/maps?q=QUERY&z=ZOOM&output=embed
```

Google deprecated this free legacy embed in 2018. It now shows a **"For development purposes only"** watermark or a **"This page can't load Google Maps correctly"** error.

### Fixed at the code level

All three iframe components have been updated to the current Maps Embed API URL format:

```
https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=QUERY&zoom=N
```

| Component | File |
|---|---|
| Homepage quote form map | `components/home/QuoteForm.tsx` |
| /locations coverage map | `components/locations/CoverageMap.tsx` |
| /locations/[slug] community maps | `components/location/LocationMap.tsx` |

The API key is read from `NEXT_PUBLIC_GOOGLE_MAPS_KEY`. If not set, each map renders a clean text fallback (city/region name) rather than a Google error. The CSP `frame-src` in `next.config.ts` was updated to allow `https://www.google.com`. The `.env.local.example` documents setup steps.

### Still required — Google Cloud Console (cannot be done from the codebase)

There is no `.env.local` on this machine and no API key set. You must:

1. Go to https://console.cloud.google.com — select or create a project for this site
2. **Enable the Maps Embed API:** APIs & Services → Library → "Maps Embed API" → Enable
3. **Confirm billing is active** — Maps Embed API requires a billing account. The $200/month free credit covers thousands of map loads; this site will not exceed it
4. **Create a key:** APIs & Services → Credentials → Create Credentials → API Key
5. **Restrict the key:**
   - Application restrictions → HTTP referrers → `raincitypms.com/*`
   - API restrictions → Restrict key → Maps Embed API only
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...
   ```
7. Rebuild and redeploy (the key is embedded at build time)

---

## 3. Search Console Readiness Checklist

| Check | Status | Notes |
|---|---|---|
| **sitemap.xml** | ✅ Pass | Generated from live content arrays; 36 URLs, all resolving pages |
| **robots.txt** | ✅ Pass | Allows all crawlers at `/`; disallows `/_next/` and `/api/` |
| **Canonical tags** | ✅ Pass | Every page sets its own `<link rel="canonical">` via `pageMetadata()` |
| **noindex — location pages** | ✅ Fixed | Removed `noindex` from all 9 `/locations/[slug]` pages — now fully indexable |
| **noindex — blog pages** | ⚠️ Intentional hold | 6 placeholder posts + blog index remain `noindex`; indexing AI-written content before replacement risks a Google manual action |
| **noindex — legal pages** | ⚠️ Intentional hold | Terms & Privacy Policy remain `noindex` pending legal review |
| **Duplicate titles** | ✅ Pass | Every page has a unique, fully-written title |
| **Duplicate descriptions** | ✅ Pass | Every page supplies its own description |
| **Broken internal links** | ✅ Fixed | Social `"#"` icons removed from footer/header/awards (empty array — no broken links ship) |
| **HTTPS** | ✅ Pass | All canonical URLs reference `https://raincitypms.com`; HSTS header ready to uncomment once host confirms HTTPS stable |
| **Status codes** | ✅ Pass | 37 public routes → 200; `/disclaimer` and `/refund-policy` → 301 redirects; unrecognised URLs → proper 404 |
| **Mixed content** | ✅ Pass | All resources self-hosted; no HTTP resources on HTTPS pages |

---

## 4. Complete Page List for Indexing

### Ready to index now (16 pages)

Submit these in Search Console immediately after verification.

| URL | Page |
|---|---|
| https://raincitypms.com/ | Homepage |
| https://raincitypms.com/about | About RainCity |
| https://raincitypms.com/services | Services catalogue |
| https://raincitypms.com/contact | Contact & quote |
| https://raincitypms.com/locations | Service areas hub |
| https://raincitypms.com/services/commercial-cleaning | Commercial Cleaning |
| https://raincitypms.com/services/power-washing | Power Washing |
| https://raincitypms.com/services/soft-washing | Soft Washing |
| https://raincitypms.com/services/concrete-and-asphalt-sealing | Concrete & Asphalt Sealing |
| https://raincitypms.com/services/window-cleaning | Window Cleaning |
| https://raincitypms.com/services/gutter-cleaning | Gutter Cleaning |
| https://raincitypms.com/services/roof-cleaning | Roof Cleaning |
| https://raincitypms.com/services/painting | Painting |
| https://raincitypms.com/services/snow-removal-salting | Snow Removal & Salting |
| https://raincitypms.com/services/holiday-light-installation | Holiday Light Installation |
| https://raincitypms.com/services/landscaping-lawn-care | Landscaping & Lawn Care |

### Now indexable — location pages (noindex removed, submit now)

| URL | Page |
|---|---|
| https://raincitypms.com/locations/anmore | Anmore |
| https://raincitypms.com/locations/burnaby | Burnaby |
| https://raincitypms.com/locations/delta | Delta |
| https://raincitypms.com/locations/langley | Langley |
| https://raincitypms.com/locations/new-westminster | New Westminster |
| https://raincitypms.com/locations/ridge-meadow | Maple Ridge & Pitt Meadows |
| https://raincitypms.com/locations/surrey | Surrey |
| https://raincitypms.com/locations/tri-cities | Tri-Cities |
| https://raincitypms.com/locations/vancouver | Vancouver |

### Still on hold — do not submit yet

| URL | Blocker |
|---|---|
| https://raincitypms.com/blog | Replace 6 placeholder posts with real content first |
| https://raincitypms.com/blog/moss-isnt-the-problem | Replace post content |
| https://raincitypms.com/blog/the-fortnight-before-the-rain | Replace post content |
| https://raincitypms.com/blog/why-the-north-wall-greens-first | Replace post content |
| https://raincitypms.com/blog/what-a-strata-schedule-covers | Replace post content |
| https://raincitypms.com/blog/sealing-between-two-rainstorms | Replace post content |
| https://raincitypms.com/blog/three-days-of-snow | Replace post content |
| https://raincitypms.com/terms | Legal review + client sign-off on operational numbers |
| https://raincitypms.com/privacy-policy | Legal review + client sign-off |

### Redirects — not submitted (not real pages)

| From | To |
|---|---|
| https://raincitypms.com/disclaimer | → / (301) |
| https://raincitypms.com/refund-policy | → /terms (301) |

---

## 5. Remaining items requiring client input (cannot be resolved from codebase)

| Item | What's needed |
|---|---|
| **Google Maps API key** | Create key in Google Cloud Console — see section 2 above |
| **Social profile URLs** | Supply real Facebook / Instagram / X / LinkedIn URLs; social icons are currently hidden (empty array) and will reappear once real URLs are added to `lib/content.ts → social` |
| **Blog content** | Replace all 6 placeholder posts in `lib/content.ts → blogPosts` with real articles confirmed by the client; then remove `robots: { index: false }` from `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` |
| **Legal pages** | Have a lawyer review Terms & Conditions and Privacy Policy; have the client confirm the operational numbers (cancellation window, late-cancellation charge, quote validity, net-30, issue-reporting window, retention periods); then remove `robots: { index: false }` from `app/(legal)/terms/page.tsx` and `app/(legal)/privacy-policy/page.tsx` |
| **Testimonials** | Replace placeholder testimonials in `lib/content.ts → testimonials` with real customer reviews before launch |
