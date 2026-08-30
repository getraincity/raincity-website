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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Next's build output and the image optimiser's query endpoint are not
      // pages; neither belongs in an index.
      { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
