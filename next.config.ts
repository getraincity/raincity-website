import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No `remotePatterns`. Every photograph is served from `public/`, so the
    // optimiser never reaches off this origin and no page can be broken by a
    // third-party CDN. Re-adding one is a decision, not a detail.
    // Cap the ladder at 1920. Nothing on this page renders wider than ~1440
    // CSS pixels, so 2560/3840 variants only ask the optimiser to upscale
    // source files it already has at native size — slow, and no sharper.
    deviceSizes: [420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [160, 240, 320, 400, 512],
    // AVIF first, WebP second. The optimiser content-negotiates: a browser
    // that sends `image/avif` in Accept gets AVIF, everything else falls back
    // to WebP, so nothing regresses for older clients. Measured on this site's
    // own photographs at the sizes actually served, AVIF lands ~45% smaller
    // than the WebP it replaces — the single largest saving available on LCP,
    // because it applies to the hero and to every tile competing with it for
    // bandwidth. The cost is encode time on a cache miss, which is a
    // build/first-request concern, not a visitor one.
    formats: ["image/avif", "image/webp"],
    // Next 16 refuses any `quality` value not listed here, so the ladder has
    // to be declared before `PhotoFrame` can ask for one. 68 is what the
    // photographs are served at (see the comment at the `quality` prop there);
    // 75 stays listed because it is next/image's default and anything that
    // does not go through `PhotoFrame` would otherwise 400.
    qualities: [68, 75],
    // Thirty days, and it has to be set explicitly.
    //
    // The optimiser derives its own `Cache-Control` from the upstream file's,
    // and the upstream here is a static asset out of `public/`, which the
    // host serves as `max-age=0, must-revalidate`. Every optimised variant
    // inherited that, so a returning visitor revalidated every photograph on
    // the page before any of it could be painted from cache — thirteen
    // conditional round trips on a service page, on a connection where the
    // round trip is the expensive part. `minimumCacheTTL` is the floor that
    // overrides it.
    //
    // The trade-off, stated because it is the one that will bite: these URLs
    // are keyed by source path, not by content hash. Replacing a photograph
    // *at the same path* leaves returning visitors on the old one until the
    // month is out. The fix is to change the filename, which costs one line —
    // the `src` on that slot's entry in `lib/photos.ts` — and is already how
    // every photograph on this site is addressed.
    minimumCacheTTL: 2592000,
  },

  async redirects() {
    return [
      // Disclaimer and Refund Policy pages have been removed; these permanent
      // redirects keep any existing bookmarks or external links from 404ing.
      { source: "/disclaimer", destination: "/", permanent: true },
      { source: "/refund-policy", destination: "/terms", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents this site from being embedded in an iframe on any
          // other domain. Clickjacking mitigation.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevents browsers from MIME-sniffing a response away from the
          // declared Content-Type.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Sends the full origin on same-origin requests; strips down to
          // origin-only on cross-origin. No query strings leak to third parties.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Locks off hardware APIs this site does not use.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js injects inline <script> tags during hydration; a strict
              // nonce-based CSP would require middleware-level nonce injection
              // on every request — substantially more complex than this site
              // warrants. 'unsafe-inline' is the accepted trade-off for static
              // Next.js deployments.
              // www.clarity.ms serves the loader tag; Clarity's own
              // collector then loads/executes from its *.clarity.ms
              // regional subdomains, so the wildcard is required, not
              // just the one host the snippet references.
              //
              // www.googletagmanager.com serves gtag.js for the GA4 tag in
              // app/layout.tsx. THIS LINE IS WHAT MAKES ANALYTICS WORK AT
              // ALL, and its absence is invisible: the tag markup renders,
              // the browser refuses the fetch, and the only trace is one
              // console line nobody reads on a production build. Any future
              // analytics, ads or tag-manager snippet needs its host added
              // here in the same commit as the snippet — never after.
              "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://*.clarity.ms https://www.googletagmanager.com",
              // Tailwind CSS v4 generates inline styles.
              "style-src 'self' 'unsafe-inline'",
              // All photographs are self-hosted; blur-up placeholders are
              // data: URIs generated by next/image. The analytics hosts here
              // are for pixel paths, not for imagery: a tag falls back from
              // `navigator.sendBeacon` to a 1x1 GET when the beacon is
              // unavailable or the page is unloading, and the unload case is
              // exactly when an exit event is worth having.
              //
              // *.clarity.ms was missing here from the day Clarity landed, so
              // c.clarity.ms/c.gif had been refused on every page load since —
              // found only because adding GA4 meant reading the console on a
              // production build. Clarity's own telemetry was never affected:
              // that goes to t.clarity.ms over connect-src, which was allowed,
              // and session replay and heatmaps have been recording normally.
              // The blocked pixel is Clarity's ID-sync hop, nothing else.
              //
              // Which is why one CSP error survives this fix, on purpose.
              // c.clarity.ms/c.gif redirects to c.bing.com to sync the Clarity
              // ID with a Bing advertising ID, CSP is enforced on the redirect
              // target as well as the request, and c.bing.com is deliberately
              // absent — a different company's ad host is a new vendor for
              // visitor data to reach, which is the client's call and not a
              // detail to close a console warning with. Same reasoning as
              // stats.g.doubleclick.net under connect-src. Adding *.clarity.ms
              // alone opens no new vendor: that host is already trusted by
              // script-src and connect-src above.
              "img-src 'self' data: https://*.clarity.ms https://*.google-analytics.com https://*.googletagmanager.com",
              // next/font/google self-hosts the font files — no external
              // font requests at runtime.
              "font-src 'self'",
              // Three distinct iframe locations: QuoteForm, CoverageMap,
              // and one LocationMap per community page (11 total).
              // Maps Embed API serves from www.google.com; maps.google.com
              // retained so any cached pages don't break during the rollout.
              "frame-src https://www.google.com https://maps.google.com",
              // Clarity's session/heatmap data beacons out to its
              // *.clarity.ms collector hosts; without this the script
              // loads but every reporting call is silently dropped.
              //
              // GA4 collects to a regional host — region1.google-analytics.com
              // for a Canadian property, not the www one the docs quote — so
              // the wildcard is required rather than tidier. Getting this wrong
              // is the second silent failure in the pair: with script-src fixed
              // and this line missing, gtag loads and runs, Realtime shows an
              // active user for the tag load itself, and every subsequent event
              // is dropped. *.analytics.google.com covers the Measurement
              // Protocol and consent endpoints the tag calls on some setups.
              //
              // stats.g.doubleclick.net is deliberately NOT here. That host is
              // only reached once Google Signals or an Ads link is switched on,
              // it is an advertising host rather than a measurement one, and
              // opening it changes what leaves a visitor's browser. Add it if
              // and when the client actually enables Signals, as a decision.
              "connect-src 'self' https://www.clarity.ms https://*.clarity.ms https://*.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
          // HSTS is intentionally commented out. Setting it before the
          // deployment host enforces HTTPS bricks the domain for all returning
          // visitors until max-age expires. Uncomment after confirming HTTPS
          // is active and stable at the host level.
          // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
