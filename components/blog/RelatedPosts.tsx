import { blogPage, type BlogPost } from "@/lib/content";
import { relatedPosts } from "@/lib/blog";
import { shortRowOffsets } from "@/lib/cardGrid";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PostCard } from "@/components/ui/PostCard";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * Three more posts, under the article.
 *
 * `PostCard` at its standard size — the same card as the /blog archive, the
 * homepage service teaser and the /locations grid, on the same
 * `sm:grid-cols-4 lg:grid-cols-6` half-column geometry with every card
 * spanning two. Five card grids on this site are one piece of furniture and
 * this is the fifth; rebuilding a smaller "related" card would have been a
 * sixth thing to keep in step with the other four.
 *
 * `shortRowOffsets` is kept even though the count is three and three fills
 * the row exactly. It costs nothing, and it is what stops a blog with only
 * two other posts in it from leaving a stranded card hanging on the left —
 * which is the state this site is one deletion away from at any time.
 *
 * Which three, and why, is `relatedPosts` in lib/blog.ts.
 *
 * Fog, against the white the article runs on, which is the same alternation
 * the /blog index makes between its featured strip and its archive.
 *
 * The link back to the index sits under the grid rather than above it. A
 * reader who has finished an article and looked at three more cards without
 * clicking one has run out of suggestions, and that is the moment the whole
 * archive is worth offering — not before they have seen the three.
 */
export function RelatedPosts({ post }: { post: BlogPost }) {
  const posts = relatedPosts(post);
  // A blog of one. Nothing to suggest, so the section does not render an
  // empty grid under its own heading.
  if (posts.length === 0) return null;

  const offsetClasses = shortRowOffsets(posts.length);

  return (
    <section className="bg-fog py-section" aria-labelledby="related-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">
            {blogPage.post.related.label}
          </SectionLabel>
          <h2 id="related-heading" className="display-l mt-5 text-navy">
            {blogPage.post.related.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{blogPage.post.related.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block mx-auto grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:max-w-cards lg:grid-cols-6"
        >
          {posts.map((related, i) => (
            <PostCard
              key={related.slug}
              post={related}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={cn("sm:col-span-2", offsetClasses(i))}
            />
          ))}
        </Stagger>

        <Reveal className="mt-block text-center">
          <Button href="/blog" variant="tertiary">
            {blogPage.post.backToIndex}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
