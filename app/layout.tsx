import type { Metadata, Viewport } from "next";
import { Chivo, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { business } from "@/lib/content";
import { LogoSprite } from "@/components/ui/LogoSprite";
import {
  JsonLd,
  OG_IMAGE,
  SITE_URL,
  canonical,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-chivo",
  display: "swap",
});

// Only the weights the type scale actually asks for. Plex 700 was being
// downloaded and never used — every `font-bold` on the site sits on
// `font-display`, which is Chivo.
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

/**
 * Site-wide defaults. Every page overrides `title`, `description` and
 * `alternates.canonical` with its own; what is set here is the part that is
 * genuinely shared — the template, the social card, and the crawler
 * directives.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | Exterior Cleaning in ${business.region}`,
    template: `%s | ${business.shortName} Property Maintenance`,
  },
  description: `Reliable, year-round exterior cleaning and property care for homes, stratas and businesses in ${business.base} and across ${business.region}.`,
  applicationName: business.name,
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.name,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: business.name,
    url: canonical("/"),
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${business.name} — year-round property maintenance in ${business.region}.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Phone numbers are already marked up as tel: links; Safari's own detection
  // rewrites the rendered text and can break the layout it sits in.
  formatDetection: { telephone: false, address: false, email: false },
  category: "Property Maintenance",
};

/**
 * Google Analytics 4 measurement ID, declared once because it appears twice
 * below — in the loader URL and in the `config` call — and a mismatch between
 * the two is silent: the tag loads, the config names a property that is not
 * the one being loaded, and the reports stay empty.
 *
 * Not an environment variable. It is printed in the HTML of every page, so it
 * is not a secret, and reading it from `process.env` would mean a missing value
 * in the host's dashboard silently switches analytics off on a deploy. Clarity
 * hardcodes its project ID one screen down for the same reason.
 */
const GA_MEASUREMENT_ID = "G-SJE51YKEFY";

export const viewport: Viewport = {
  // Harbour Navy. The only literal colour in the codebase outside the token
  // block: browser-chrome metadata cannot read a CSS custom property.
  themeColor: "#0c2740",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${chivo.variable} ${plex.variable}`}>
      <head>
        {/* No image preconnect. Every photograph, the LCP hero included, is
            now served from this origin, so the connection the browser needs
            is the one it already has — a preconnect to a host nothing is
            fetched from costs a socket and saves nothing. */}
        {/* The company, then the site it publishes. Every page-level node
            below the root points its `isPartOf` at the second of these, so
            both belong here rather than on any one route. */}
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={websiteSchema} />
      </head>
      <body>
        {/* Google Analytics 4.

            NOT literally "immediately after <head>", which is what Google's
            copy-paste instructions say. That wording is written for a hand-
            authored HTML page with no script loader; on this stack the same
            two tags go through next/script, which is the documented
            equivalent and is what Clarity below already uses. `afterInteractive`
            injects them once hydration is underway, so the tag cannot sit in
            front of the LCP render — and the LCP hero is the one number on
            this site that analytics must not cost anything, since it is the
            thing analytics exists to measure.

            One tag, and only one. Google's warning about not adding a second
            Google tag per page is the real constraint here: gtag.js is also
            what a Google Ads tag, a Search Console tag or a GTM container
            would load, and a second copy double-counts every session. If any
            of those arrive later they belong in this same pair of tags as an
            extra `config` line, not as another loader.

            No route-change handler, deliberately. App Router navigations do
            not reload the document, so a naive integration counts one
            page_view per session — but GA4's Enhanced Measurement watches
            History API changes and records those views itself, and it is on by
            default in a new property. That keeps this a server component with
            no `usePathname` client boundary, which is the invariant in
            CLAUDE.md about not pulling content.ts into the client bundle.
            Confirm Enhanced Measurement is on in Admin -> Data streams before
            trusting the pageview counts. */}
        <Script
          id="ga4-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        {/* Microsoft Clarity — session recording/heatmaps for
            raincitypms.com. Loaded with next/script so it never
            blocks hydration or the LCP render. */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yddlgq9hjb");`}
        </Script>
        {/* Belt and suspenders, not a fix for a real gap: the server HTML is
            already visible without JavaScript, because only the
            IntersectionObserver in Motion.tsx ever writes the armed
            (opacity: 0) state, and that observer cannot run without JS in the
            first place. This rule only matters if something upstream changes
            that guarantee — it costs one style tag to keep it true. */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* The logo's shapes, once per page. Every <Logo /> — header, mobile
            menu, footer, closing band — draws them through <use>; see
            LogoSprite.tsx for why they are not inlined per instance. It lives
            in the layout so it survives client-side navigation with the
            header that depends on it. */}
        <LogoSprite />
        <a
          href="#main"
          className="meta sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
