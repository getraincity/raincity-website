import { blogPage } from "@/lib/content";
import { pagePosts, totalPages } from "@/lib/blog";
import { shortRowOffsets } from "@/lib/cardGrid";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PostCard } from "@/components/ui/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * The archive — one page of post cards, and the pager under them.
 *
 * Geometry is deliberately identical to the homepage teaser, the /services
 * catalogue and the /locations grid: the same 3:2 landscape crop, the same
 * `sm:grid-cols-4 lg:grid-cols-6` half-column grid with every card spanning
 * two, the same `gap-x-gap-x` / `gap-y-gap-y` gutters, the same
 * `lg:max-w-cards` track and the same centred heading block. Four card grids
 * on one site should be one piece of furniture.
 *
 * `shortRowOffsets` is counted per page rather than across the whole archive,
 * which is the only thing pagination changes about it: what matters for
 * centring is how many cards are in this grid, not how many posts exist. The
 * last page of an archive is nearly always a short row, so this is the grid
 * where that arithmetic earns its keep — the tail page centres its one or two
 * cards instead of leaving them hanging on the left.
 *
 * White, against the Fog the featured strip sits on above it.
 */
export function BlogArchive({ page }: { page: number }) {
  const posts = pagePosts(page);
  const offsetClasses = shortRowOffsets(posts.length);

  return (
    <section className="bg-white py-section" aria-labelledby="archive-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">
            {blogPage.archive.label}
          </SectionLabel>
          <h2 id="archive-heading" className="display-l mt-5 text-navy">
            {blogPage.archive.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{blogPage.archive.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block mx-auto grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:max-w-cards lg:grid-cols-6"
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

        <Pagination current={page} total={totalPages} />
      </div>
    </section>
  );
}
