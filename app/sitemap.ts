import type { MetadataRoute } from "next";
import { blogPosts, legalPages, locations, services } from "@/lib/content";
import { canonical, indexing } from "@/lib/seo";

/**
 * sitemap.xml.
 *
 * Only routes that actually resolve. Listing a 404 is worse than omitting it:
 * it is a direct claim to the crawler that the URL is canonical content, and
 * a sitemap full of soft 404s costs crawl budget and trust.
 *
 * The nine /locations/[slug] routes were the standing example of that rule.
 * The header has linked all nine since the nav was built and every one of
 * them 404ed, so they were held out of this file and the ItemList in
 * `locationsPageSchema` carried no `url` — one refusal wearing two hats. The
 * template has landed, the routes resolve, and both were lifted in the same
 * commit. They are generated from `locations` below for the same reason the
 * services are generated from `services`.
 *
 * The blog posts were in exactly that state until `/blog/[slug]` landed, and
 * they were listed here from that commit — alongside the BlogPosting markup
 * in lib/seo.tsx, which was held back on the same rule and lifted with it.
 *
 * They are now conditional instead, and so are the two policy pages. The
 * reasoning above has not changed: a resolving URL belongs in the sitemap and
 * `noindex` is the control for copy that is not ready. What changed is that
 * this file was applying only the first half of that. Eight blog URLs were
 * listed here while the routes themselves carried `noindex`, which is the
 * sitemap asserting "canonical content, please index" against a page header
 * saying the opposite — the crawler resolves it in favour of the page, logs
 * eight URLs under "Excluded by 'noindex' tag", and nobody is better off.
 *
 * Both halves now read one flag, `indexing` in lib/seo.tsx. A group that is
 * held back is absent here and noindex on the route; a group that is released
 * appears here and loses the noindex, in a single edit. See the note on that
 * constant for what releases each one.
 *
 * /blog/page/2 and any pages after it resolve too and are deliberately not
 * listed. They are one archive under a canonical entry point rather than
 * separate documents; the pager links them, so a crawler reaches every post
 * from /blog either way, and a sitemap full of archive pages just spends
 * crawl budget on the same cards a second time.
 *
 * Add each entry here as its route lands.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonical("/"),
      lastModified: new Date("2026-09-01"),
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
    {
      url: canonical("/locations"),
      lastModified: new Date("2026-08-31"),
      // The service-area hub. It sits level with /about rather than with the
      // catalogue: it is the page the "do you cover X" queries should land
      // on. It is now the parent of nine child routes, and it keeps 0.8
      // rather than moving to 0.9 — the children below are where the local
      // queries should actually land, and the hub is the index above them,
      // which is the same relationship /services has with its eleven.
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: canonical("/contact"),
      lastModified: new Date("2026-08-30"),
      // Phone, email and hours change about as rarely as the About page's
      // narrative does, and the page's own conversion path (the quote form)
      // is already the homepage's, not a route of its own.
      changeFrequency: "yearly",
      priority: 0.7,
    },
    // The blog index, and below it one entry per post. Both are gated on
    // `indexing.blog` — see the note at the top of this file.
    //
    // The one page on the site that is meant to change: a new post moves this
    // index even when nothing else on it does. Level with /contact — above the
    // policy pages, below the pages that sell the work.
    ...(indexing.blog
      ? [
          {
            url: canonical("/blog"),
            lastModified: new Date("2026-08-31"),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
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
    // One entry per community, generated from `locations`. Nine URLs that
    // 404ed for the life of this file until the template landed; see the note
    // at the top.
    //
    // Level with the eleven service pages rather than below them. These are
    // the pages the "gutter cleaning Surrey" half of the search volume should
    // land on, and each carries a screen of copy, a question set and a map
    // written for that one community — which is the condition for a priority
    // at all. If a tenth community is ever added with the copy left blank,
    // the honest move is to hold it out of this array until it is written,
    // not to ship a thin page at 0.8.
    ...locations.map((location) => ({
      url: canonical(`/locations/${location.slug}`),
      lastModified: new Date("2026-08-31"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    // One entry per post, generated from `blogPosts` for the same reason the
    // services are: a slug renamed in one place should not have to be
    // remembered here too.
    //
    // `lastModified` is the post's own publication date rather than a build
    // date. Nothing on this site tracks revisions to a post, so the honest
    // answer to "when did this last change" is "when it was published" — and
    // a lastModified that quietly moves to today on every deploy is a
    // freshness signal for six documents that did not change.
    //
    // Level with /contact and the blog index, and `yearly` rather than the
    // index's `weekly`: the archive gains posts, an individual post does not
    // change once it is up.
    ...(indexing.blog
      ? blogPosts.map((post) => ({
          url: canonical(`/blog/${post.slug}`),
          lastModified: new Date(post.date),
          changeFrequency: "yearly" as const,
          priority: 0.6,
        }))
      : []),
    // The two policy pages (Privacy Policy, Terms & Conditions), generated
    // from `legalPages`. Disclaimer and Refund Policy have been removed and
    // redirect permanently to / and /terms respectively.
    //
    // Lowest priority on the site and yearly: pages that exist so a reader
    // who goes looking finds them, not pages that should rank for anything.
    // Gated on `indexing.legal` for the same reason the blog is gated above —
    // both routes carry noindex until a lawyer has read them, and listing a
    // noindexed URL here only spends the crawler's time contradicting itself.
    ...(indexing.legal
      ? Object.values(legalPages).map((page) => ({
          url: canonical(`/${page.slug}`),
          lastModified: new Date(page.updatedISO),
          changeFrequency: "yearly" as const,
          priority: 0.3,
        }))
      : []),
  ];
}
