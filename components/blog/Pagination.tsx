import Link from "next/link";
import { blogPage } from "@/lib/content";
import { pageHref } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icon";

/**
 * The archive pager.
 *
 * Real routes, not a "load more" button. Every post stays reachable with
 * JavaScript switched off, every page has a URL that can be linked and
 * crawled, and nothing on the page moves after it has rendered — which a
 * button that reveals rows on hydration cannot claim. It is also the version
 * that still works untouched in two years, which is what this site is for.
 *
 * Page 1 is /blog; the rest are /blog/page/N. See `pageHref`.
 *
 * Previous and Next are simply absent at the ends of the run rather than
 * rendered as greyed-out cells. A disabled control that is announced, tabbed
 * to and clicked to no effect is worse than no control, and the numbered
 * cells already say where the reader is.
 *
 * Renders nothing while there is only one page — which is the state a real
 * `POSTS_PER_PAGE` would leave this blog in for a while. Nothing else on the
 * page has to know.
 */

/** 44px minimum on both axes: the CTA floor from the design system. */
const cell =
  "meta inline-flex h-11 min-w-11 items-center justify-center border px-3 transition-colors duration-200";
const idle = "border-line text-navy hover:border-rc-blue hover:text-rc-blue";
const current = "border-navy bg-navy text-white";
const step = "gap-2 px-4";

export function Pagination({
  current: currentPage,
  total,
}: {
  current: number;
  total: number;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      aria-label={blogPage.pagination.label}
      className="mt-block flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link href={pageHref(currentPage - 1)} className={cn(cell, idle, step)}>
          <ArrowLeft className="shrink-0" />
          {blogPage.pagination.previous}
        </Link>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            aria-label={`${blogPage.pagination.page} ${page}`}
            className={cn(cell, current)}
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            aria-label={`${blogPage.pagination.page} ${page}`}
            className={cn(cell, idle)}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < total && (
        <Link href={pageHref(currentPage + 1)} className={cn(cell, idle, step)}>
          {blogPage.pagination.next}
          <ArrowRight className="shrink-0" />
        </Link>
      )}
    </nav>
  );
}
