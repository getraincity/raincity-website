import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { canonical } from "@/lib/seo";

/**
 * sitemap.xml.
 *
 * Only routes that actually resolve. The header and footer link to
 * /locations, /locations/[slug], /blog and the four policy pages, but none of
 * those exist in app/ yet, so every one of them currently 404s. Listing a 404
 * in a sitemap is worse than omitting it:
 * it is a direct claim to the crawler that the URL is canonical content, and
 * a sitemap full of soft 404s costs crawl budget and trust.
 *
 * Add each entry here as its route lands.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonical("/"),
      lastModified: new Date("2026-08-29"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: canonical("/services"),
      lastModified: new Date("2026-08-30"),
      // The catalogue. It changes when the service list does, which is
      // seasonal at most — but it is the page the commercial queries land on,
      // so it sits above /about and below the homepage.
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: canonical("/about"),
      lastModified: new Date("2026-08-30"),
      // Company narrative, mission and process. It changes when the business
      // does, which is less often than the homepage.
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // One entry per service, generated from `services` rather than listed.
    // A hand-written block here would be the twelfth thing to remember on the
    // day a service is added or renamed, and the first one to be forgotten —
    // and a forgotten rename leaves a 404 in the sitemap, which is exactly
    // what the note above says not to publish.
    ...services.map((service) => ({
      url: canonical(`/services/${service.slug}`),
      lastModified: new Date("2026-08-30"),
      // Below the catalogue that lists them, above /about: these are the
      // pages the commercial queries should actually land on, but the
      // catalogue is the one that survives a service being renamed.
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
