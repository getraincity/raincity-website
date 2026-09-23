import { latestWork } from "@/lib/content";
import { latestPosts } from "@/lib/blog";
import { shortRowOffsets } from "@/lib/cardGrid";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PostCard } from "@/components/ui/PostCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * Explore Our Latest Work — the three newest articles, on the homepage's one
 * navy band.
 *
 * This used to be `Pillars`, three abstract trust points over the same
 * photograph. The client replaced it with the blog (2026-09-23). The band
 * itself is kept exactly — photograph, 85% navy hold, the edge cut into it
 * from the section above — because it is the page's one change of ground
 * between the white sections either side, and losing it would run four light
 * sections together.
 *
 * The cards are `PostCard`, the same card as the /blog archive and the
 * related-posts grid, on the same half-column geometry. White cards on navy
 * need nothing extra: the card carries its own white ground and line border.
 *
 * It is also the homepage's only link into the articles. The posts are the
 * site's largest body of indexable copy, and until now a crawler reached them
 * from the homepage only through the nav, which is not in the server HTML
 * (see "The header's dropdowns are not internal links" in CLAUDE.md).
 *
 * Heading and button share a line at `md`, as in Why Choose Us. The button is
 * the outline variant: amber is reserved for the quote, and this is not one.
 */
export function LatestWork() {
  const posts = latestPosts(3);
  // No articles, no section — an empty grid under "Explore Our Latest Work"
  // would be the worst thing on the page.
  if (posts.length === 0) return null;

  const offsetClasses = shortRowOffsets(posts.length);

  return (
    <section className="on-navy relative isolate" aria-labelledby="latest-work-heading">
      <div className="absolute inset-0 -z-10">
        <Photo name="servicesHero" fill sizes="100vw" />
        <div className="absolute inset-0 bg-navy/85" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-site px-edge py-section">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-prose">
            <SectionLabel tone="dark">{latestWork.label}</SectionLabel>
            <h2 id="latest-work-heading" className="display-l mt-5 text-white">
              {latestWork.headline}
            </h2>
            <p className="body-l mt-6 text-fog">{latestWork.body}</p>
          </div>
          <Button
            href="/blog"
            variant="tertiary-invert"
            className="group shrink-0 self-start md:self-auto"
          >
            {latestWork.cta}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:grid-cols-6"
        >
          {posts.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={cn("sm:col-span-2", offsetClasses(i))}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
