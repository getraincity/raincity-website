import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * The AI crawlers are listed explicitly rather than left to the wildcard.
 * A bare `User-agent: *` already allows them, but several operators publish
 * the named agent as the switch they check first, and being named is the
 * difference between "not blocked" and "clearly invited" when an answer
 * engine decides whether it may cite a page.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
];

/**
 * Only `/api/` is disallowed.
 *
 * `/_next/` used to be disallowed alongside it, on the reasoning that build
 * output is not a page and does not belong in an index. That reasoning is
 * right about what should be *indexed* and wrong about what should be
 * *fetched*, and on this stack the difference is most of the site:
 *
 *   - Every photograph is served from `/_next/image?url=...`. There are 294
 *     such references on the homepage alone. Blocking the prefix meant no
 *     image on this site could be crawled, so none could appear in Google
 *     Images — for a company whose entire proposition is visible before/after
 *     work, that is the wrong half of the search surface to switch off.
 *   - The stylesheet, the client JS and both woff2 faces live under
 *     `/_next/static/`. Googlebot renders with a headless browser and
 *     Google's own guidance is explicit that blocking CSS and JS produces a
 *     degraded render and can cost rankings. A layout that renders unstyled
 *     to the crawler is not the layout being judged.
 *
 * Nothing under `/_next/` can be indexed *as a page* regardless: the chunks
 * are not HTML, and the image endpoint answers with an image content type.
 * Allowing the fetch costs nothing and restores both the render and image
 * search.
 *
 * `/api/` stays blocked — `/api/contact` is a POST endpoint for the quote
 * form, not a document.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
