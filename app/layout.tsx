import type { Metadata, Viewport } from "next";
import { Chivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/content";
import { JsonLd, OG_IMAGE, SITE_URL, canonical, organizationSchema } from "@/lib/seo";

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
        {/* Every photograph on the page is served from Unsplash, including
            the hero, which is the LCP element. Opening the connection during
            the HTML parse saves the DNS + TLS round trips that would
            otherwise sit in front of the largest paint. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <JsonLd schema={organizationSchema} />
      </head>
      <body>
        {/* Reveals start at opacity 0 in the server HTML. If the JavaScript
            that animates them never runs, this puts them back. */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
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
