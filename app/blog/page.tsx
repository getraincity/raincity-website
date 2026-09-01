import { business } from "@/lib/content";
import {
  JsonLd,
  blogPageSchema,
  breadcrumbSchema,
  pageMetadata,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

// All six posts are placeholder content — block the index from being crawled
// until real articles are live. Remove when real posts replace the placeholders.
export const metadata = {
  ...pageMetadata({
    title: `Blog | Property Maintenance Advice for ${business.region}`,
    description: `Seasonal timing, the maintenance that pays for itself and advice specific to ${business.region} — notes from ${business.name}, a mobile exterior-cleaning crew based in ${business.base}, BC.`,
    path: "/blog",
    // Informational terms only. The commercial ones belong to /services and the
    // city-by-city set to /locations; a blog index bidding against either would
    // be the site competing with itself for one query, which is the note the
    // /locations metadata already makes.
    keywords: [
      `property maintenance tips ${business.region}`,
      "exterior cleaning advice BC",
      "roof moss removal advice Vancouver",
      "gutter cleaning tips Greater Vancouver",
      "seasonal home maintenance BC",
      "strata maintenance schedule BC",
    ],
  }),
  robots: { index: false, follow: true },
};

/**
 * /blog — the index.
 *
 * Three sections and then the sitewide ask: the banner, a short featured
 * strip on Fog, the archive grid and its pager on white, and the quote form
 * every other route on this site ends with. The form is also what the
 * banner's own CTA points at, so without it that button would scroll
 * nowhere — the same reason the service template carries it.
 *
 * The archive is paginated over real routes rather than revealed by a button;
 * page two and beyond are `app/blog/page/[page]`, which renders this same
 * page without the featured strip. See the notes in Pagination.tsx and
 * lib/blog.ts.
 *
 * No `SectionEdge`. The 12 degree cut is spent in exactly four places and one
 * of them is a navy band meeting a light one; the only such boundary here is
 * the banner meeting the featured strip, and /services, /contact, /locations
 * and the service template all leave the equivalent boundary square. Cutting
 * it here alone would make the signature a decoration rather than a rule.
 *
 * Every "Read More" and every share icon on this page resolves as of the
 * `/blog/[slug]` template landing, and the posts are in the sitemap. What has
 * not changed is that the articles behind those links are placeholder copy —
 * see the PLACEHOLDER note on `blogPosts` in lib/content.ts. `blogPageSchema`
 * still publishes no list of them, which is now the only piece of the
 * original refusal left standing; the note in lib/seo.tsx says what lifts it.
 */
export default function BlogPage() {
  return (
    <>
      <JsonLd schema={blogPageSchema()} />
      <JsonLd schema={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />
      <Header />
      <main id="main">
        <BlogHero />
        <FeaturedPosts />
        <BlogArchive page={1} />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
