import { notFound } from "next/navigation";
import { business } from "@/lib/content";
import { isPage, totalPages, pagePosts } from "@/lib/blog";
import {
  JsonLd,
  blogPageSchema,
  breadcrumbSchema,
  indexing,
  pageMetadata,
  searchDirectives,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

type Params = { page: string };

/**
 * Page two onwards, prerendered at build time from the length of the archive.
 *
 * Page one is /blog and is not listed here — two URLs listing the same posts
 * is a duplicate that a canonical tag would then have to clean up after. With
 * `dynamicParams` off, /blog/page/1 and /blog/page/99 are both 404s rather
 * than pages built for a set of posts that does not exist.
 *
 * The list is derived, so raising `POSTS_PER_PAGE` or adding posts changes
 * how many of these routes exist with nothing here to edit. An archive short
 * enough to fit on one page produces no routes at all, which is correct: the
 * pager renders nothing in that state either.
 */
export function generateStaticParams(): Params[] {
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const page = Number((await params).page);
  if (!isPage(page)) return {};

  return {
    ...pageMetadata({
      // The page number goes in the title, so two archive pages are not two
      // identical results in a SERP. Each canonicalises to itself, which is
      // what `pageMetadata` does with `path`.
      title: `Blog, Page ${page} | ${business.shortName} Property Maintenance`,
      description: `Page ${page} of the ${business.name} archive — seasonal timing, maintenance advice and notes from the work across ${business.region}.`,
      path: `/blog/page/${page}`,
    }),
    // All posts are placeholder content. Block this paginated entry point as
    // well until real articles replace the placeholders (same rationale as
    // the hub and individual post routes).
    // Single-source hold. See `indexing` in lib/seo.tsx — flipping the flag
  // there lifts this noindex and adds the sitemap entries in one edit.
  ...searchDirectives(indexing.blog),
  };
}

/**
 * /blog/page/[page].
 *
 * The index minus the featured strip. A recommendation belongs on the page a
 * reader arrives at, and repeating the same two large cards above every page
 * of the archive would push the posts they came for below the fold on every
 * one of them.
 *
 * Everything else is the index: the same banner, the same grid, the same
 * pager, the same quote form. See app/blog/page.tsx.
 */
export default async function BlogArchivePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const page = Number((await params).page);
  if (!isPage(page)) notFound();

  return (
    <>
      <JsonLd schema={blogPageSchema(page, pagePosts(page))} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: `Page ${page}`, path: `/blog/page/${page}` },
        ])}
      />
      <Header />
      <main id="main">
        <BlogHero />
        <BlogArchive page={page} />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
