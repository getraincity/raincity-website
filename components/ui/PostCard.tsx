import Link from "next/link";
import type { BlogPost } from "@/lib/content";
import { blogPage } from "@/lib/content";
import { formatPostDate } from "@/lib/blog";
import type { PhotoRatio } from "@/lib/photos";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { ShareLinks } from "@/components/ui/ShareLinks";
import { ArrowRight } from "@/components/ui/Icon";
import { StaggerItem } from "@/components/ui/Motion";

/**
 * The blog post card — the same furniture as `ServiceCard` and
 * `LocationCard`: 1px line border, the photograph with the blue corner notch
 * cut out of it, the brand wash that lifts on hover, 20px pad, a display
 * title, a body blurb and a meta CTA row in RainCity Blue that moves to navy.
 * Three card grids on this site are already one piece of furniture and this
 * is the fourth.
 *
 * Two things it does that neither of those does, and both come from the same
 * fact: a post card carries links of its own.
 *
 * 1. The card is an `<article>`, not a `<Link>` wrapped round everything. An
 *    anchor inside an anchor is invalid HTML and the browser recovers from it
 *    by splitting the outer one, which is how a card ends up half-clickable.
 *    Instead the heading holds the only link to the post and stretches itself
 *    across the card with `after:absolute after:inset-0`, so the whole card is
 *    still one click target, and `ShareLinks` paints above it on `z-10`. The
 *    hover state moves to `group-hover` and `focus-within`, so the border
 *    still answers a pointer and a keyboard.
 * 2. "Read More" is a `<span>`, exactly as "View Service" is on the service
 *    card. It looks like a link and is not one — the card already is.
 *
 * The variant is a prop rather than a second file. `ServiceCard` and
 * `LocationCard` were kept apart because they render different types and
 * would have needed a union and two branches; these two render the same
 * `BlogPost` and differ in four class strings, which is a lookup table, not a
 * fork. The table holds whole literal class names because Tailwind scans
 * source text and never sees a constructed string.
 *
 * The grid classes are not baked in the way `ServiceCard`'s `sm:col-span-2`
 * is: the featured strip is a two-up grid and the archive is the half-column
 * six-up, so each caller passes its own placement through `className`.
 */

type Variant = "standard" | "feature";

const variants: Record<
  Variant,
  { ratio: PhotoRatio; pad: string; title: string; excerpt: string }
> = {
  standard: {
    ratio: "3:2",
    pad: "p-card",
    title: "display-s",
    excerpt: "body-s",
  },
  // Wider crop, bigger pad, one step up the display scale and the full body
  // size. That is the whole of "more visual weight" — no second treatment, no
  // badge, no accent bar. Two cards at this size next to a three-up grid of
  // the smaller ones is already an unmistakable difference in rank.
  feature: {
    ratio: "16:10",
    pad: "p-card sm:p-8",
    title: "display-m",
    excerpt: "body-base",
  },
};

export function PostCard({
  post,
  variant = "standard",
  sizes,
  className,
}: {
  post: BlogPost;
  variant?: Variant;
  sizes: string;
  className?: string;
}) {
  const v = variants[variant];

  return (
    <StaggerItem as="li" className={className}>
      <article className="group relative isolate flex h-full flex-col border border-line bg-white transition-colors duration-200 hover:border-rc-blue focus-within:border-rc-blue">
        {/* The notch is cut out of the photo; RainCity Blue sits behind it. */}
        <div className="relative bg-rc-blue">
          <Photo
            name={post.photo}
            ratio={v.ratio}
            sizes={sizes}
            className="card-corner-cut"
          />

          {/* Brand wash, as on every other card grid: a thin RainCity Blue
              tint that pulls frames from different jobs and different light
              into one family, lifting on hover so the card answers the
              pointer by getting clearer rather than darker. */}
          <div
            aria-hidden="true"
            className="card-corner-cut pointer-events-none absolute inset-0 bg-rc-blue/15 transition-colors duration-300 ease-out group-hover:bg-rc-blue/5"
          />
        </div>

        <div className={cn("flex flex-1 flex-col", v.pad)}>
          {/* The category, in the site's own label type rather than a pill.
              Nothing on this site is a rounded chip, and a tag that looks
              like a button reads as one. */}
          <p className="meta text-rc-blue">{post.category}</p>

          <h3 className={cn("mt-3 text-navy", v.title)}>
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-rc-blue"
            >
              {post.title}
            </Link>
          </h3>

          <p className={cn("mt-3 flex-1 text-steel", v.excerpt)}>
            {post.excerpt}
          </p>

          {/* Date and read time. `dateTime` carries the machine-readable form
              so the printed one can stay short. */}
          <p className="meta mt-5 text-muted">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readMinutes} {blogPage.card.readTime}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="meta inline-flex items-center gap-2 text-rc-blue transition-colors group-hover:text-navy">
              {blogPage.card.cta}
              <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </span>

            <ShareLinks post={post} />
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}
