import { notFound } from "next/navigation";
import { blogPosts, business } from "@/lib/content";
import { findPost } from "@/lib/blog";
import { photos } from "@/lib/photos";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
  indexing,
  pageMetadata,
  searchDirectives,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostBody } from "@/components/blog/PostBody";
import { PostShare } from "@/components/blog/PostShare";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

type Params = { slug: string };

/**
 * Every post, prerendered at build time from `blogPosts` in content.ts —
 * exactly as `/services/[slug]` is generated from `services`. Nothing about
 * the route knows how many posts there are or what they are called: add one
 * to that array and its page exists, with its card on the index, its place in
 * the pager arithmetic, its sitemap line and its BlogPosting markup.
 */
export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/**
 * No fallback rendering. The params above are the complete set, so any other
 * slug is a 404 rather than an attempt to build a page for a post nobody
 * wrote. Same as the service template.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};

  return {
    ...pageMetadata({
      // The title first and the brand after it, which is the half of a result
      // somebody scanning for an answer is actually reading. The category is
      // in there because a bare post title says nothing about the subject area
      // to a reader who has never heard of this company.
      // Headline then brand. The category used to sit between them and pushed
      // every post past the 60-character render limit — 83 on the strata
      // piece. It is on the card, on the page and in `articleSection`; a SERP
      // title is not where it earns its place.
      title: `${post.title} | ${business.shortName}`,
      // The excerpt, unchanged. It was written as two sentences that stand
      // alone in a search result — see the field's own note in content.ts — so
      // writing a second description for the same post would be writing a worse
      // one and giving the page two summaries to drift apart.
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      // The post's own photograph as the social card, rather than the shared
      // brand card every other route uses. Six links to six articles that all
      // preview identically is six links that look like the same page. Alt
      // comes from the registry with it, so the card and its description are
      // about the same photograph.
      image: { url: photos[post.photo].src, alt: photos[post.photo].alt },
      article: { publishedTime: post.date, section: post.category },
      // Informational only, and derived from the post rather than from a list
      // somebody maintains. The commercial terms belong to /services and the
      // city-by-city set to /locations; the blog index note says the same.
      keywords: [
        post.title.toLowerCase(),
        `${post.category.toLowerCase()} ${business.region}`,
        `${post.category.toLowerCase()} advice BC`,
        `property maintenance ${business.region}`,
      ],
    }),
    // All six posts are placeholder content (PLACEHOLDER BLOG CONTENT in
    // lib/content.ts). Block indexing until copy is replaced and confirmed.
    // Remove when real posts are live.
    // Single-source hold. See `indexing` in lib/seo.tsx — flipping the flag
  // there lifts this noindex and adds the sitemap entries in one edit.
  ...searchDirectives(indexing.blog),
  };
}

/**
 * /blog/[slug] — the shared template behind every post.
 *
 * Order is the article's own: the trail and the header block, the photograph,
 * the body, the share block, three more posts, and then the sitewide ask.
 *
 * Two things are worth knowing about what is *not* here.
 *
 * There is no page banner. Every other route on this site opens on a
 * full-bleed photograph with a navy scrim over it, and an article
 * deliberately does not — see the note in PostHeader. This is the one page
 * level where the subject is the text.
 *
 * There is no closing band above the quote form either. The service template
 * carries `ServiceClosing` because a service page is selling the service it
 * just described and the last thing before the form should say so; a post is
 * not selling anything, and a "book this now" band bolted onto the end of an
 * article about when moss should be treated would turn the advice into bait.
 * `RelatedPosts` does that job instead — it is the honest thing to offer a
 * reader who has just finished reading — and the quote form under it is the
 * same ask that closes /blog, /about, /locations and /contact. Anyone who
 * wants it will scroll to it; that is what it is there for.
 *
 * Header, Footer and QuoteForm are the homepage's own components, imported
 * rather than reimplemented, as on every other route.
 *
 * No `SectionEdge`. The 12 degree cut is spent in exactly four places
 * sitewide and one of them is a navy band meeting a light one; this page has
 * no such boundary, exactly as /blog does not.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  // Unreachable with `dynamicParams = false`, and kept for the same reason
  // the service template keeps it: it is what makes `post` non-optional for
  // everything below.
  if (!post) notFound();

  return (
    <>
      <JsonLd schema={blogPostingSchema(post)} />
      {/* The visible trail in PostHeader is this list, in the same order. A
          breadcrumb a crawler is told about and a reader cannot see is the
          one kind of structured data that is worth nothing. */}
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Header />
      <main id="main">
        {/* `article` wraps exactly the post and nothing else — not the
            related grid, not the quote form. It is the machine-readable form
            of the same boundary the BlogPosting node draws. */}
        <article aria-labelledby="post-title">
          <PostHeader post={post} />
          <PostBody post={post} />
          <PostShare post={post} />
        </article>
        <RelatedPosts post={post} />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
