import { blogPage } from "@/lib/content";
import { featuredPosts } from "@/lib/blog";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PostCard } from "@/components/ui/PostCard";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * The featured strip — a short recommendation above the archive.
 *
 * Two cards at `feature` size, side by side from `lg` and stacked below it.
 * They are the same card as the grid underneath, one step larger: a wider
 * crop, a bigger pad, `display-m` instead of `display-s` and the full body
 * size. Rank is carried by scale and by the Fog band they sit on, not by a
 * second card design — a site with two kinds of post card has to be read
 * twice.
 *
 * Which posts appear here is `featured` on the post itself, and they are
 * deliberately not repeated in the archive below. See the note on
 * `archivePosts` in lib/blog.ts.
 *
 * It renders nothing at all when no post is flagged, rather than falling back
 * to "the two newest". A strip headed "Worth Reading First" that quietly
 * means "the most recent" is a recommendation nobody made.
 *
 * Centred on `lg:max-w-cards`, the same track the archive grid runs on, so
 * the two sections line up down the page.
 */
export function FeaturedPosts() {
  if (featuredPosts.length === 0) return null;

  return (
    <section className="bg-fog py-section" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">
            {blogPage.featured.label}
          </SectionLabel>
          <h2 id="featured-heading" className="display-l mt-5 text-navy">
            {blogPage.featured.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{blogPage.featured.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block mx-auto grid grid-cols-1 gap-x-gap-x gap-y-gap-y lg:max-w-cards lg:grid-cols-2"
        >
          {featuredPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              variant="feature"
              sizes="(min-width: 1024px) 45vw, 92vw"
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
