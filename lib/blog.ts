import { blogPosts, type BlogPost, type BlogSection } from "./content";
import { canonical } from "./seo";

/**
 * Blog derivations — the ordering, the featured/archive split, the pagination
 * arithmetic, the date format and the share URLs.
 *
 * All of it is computed from `blogPosts` in content.ts rather than written
 * out, for the same reason `services` drives the catalogue: adding a post
 * should be one edit to one array, and every count, page and offset on the
 * site should follow it. Nothing in components/blog knows how many posts
 * there are.
 */

/**
 * Posts per page of the archive grid — one full row of the three-up desktop
 * grid.
 *
 * Deliberately low. The archive is four placeholder posts today, and at the
 * six or nine a real blog would run, the pager would never render and would
 * therefore never be reviewed, styled or tested. Raise it to six or nine when
 * real posts land: it is one constant, and the grid, the pager, the static
 * params for /blog/page/[page] and the page titles all follow it.
 */
export const POSTS_PER_PAGE = 3;

/**
 * Newest first. ISO 8601 dates sort correctly as plain strings, so this needs
 * no Date parsing and cannot pick up a timezone on the way through.
 */
const byNewest = (a: BlogPost, b: BlogPost) => b.date.localeCompare(a.date);

/** The featured strip above the archive. */
export const featuredPosts = blogPosts.filter((p) => p.featured).sort(byNewest);

/**
 * The archive grid — everything the featured strip is not showing.
 *
 * The split is exclusive on purpose. A featured post repeated in the grid
 * three hundred pixels below its own larger card is the same card twice on
 * one screen, and a reader scanning for something new has to work out that
 * they have already seen it. The cost is that a post drops out of the
 * chronological run while it is featured, which is the right trade for an
 * archive this size and should be revisited if the featured set ever grows
 * past three.
 */
export const archivePosts = blogPosts
  .filter((p) => !p.featured)
  .sort(byNewest);

/** Always at least 1, so an empty archive still has a page 1 to render. */
export const totalPages = Math.max(
  1,
  Math.ceil(archivePosts.length / POSTS_PER_PAGE),
);

/** True for a page number that exists. Everything else is a 404. */
export const isPage = (page: number) =>
  Number.isInteger(page) && page >= 1 && page <= totalPages;

/** The slice of the archive shown on a given page. */
export const pagePosts = (page: number) =>
  archivePosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

/**
 * Page 1 is /blog, not /blog/page/1. Two URLs listing the same posts is a
 * duplicate the canonical tag would then have to clean up after.
 */
export const pageHref = (page: number) =>
  page <= 1 ? "/blog" : `/blog/page/${page}`;

/**
 * "Aug 18, 2026". Built once rather than per card.
 *
 * `timeZone: "UTC"` is load-bearing. A bare ISO date parses as UTC midnight,
 * and formatted in any zone west of Greenwich — every zone this site is read
 * in — that lands on the previous day. Without it, every post on the page
 * would be dated one day early.
 */
const dateFormat = new Intl.DateTimeFormat("en-CA", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatPostDate = (iso: string) => dateFormat.format(new Date(iso));

export type ShareNetwork = "facebook" | "x" | "linkedin" | "email";

export type ShareTarget = {
  network: ShareNetwork;
  /** Printed in the link's accessible name, never on screen. */
  label: string;
  href: string;
};

/**
 * The share row on a post card.
 *
 * Plain links to each network's own share endpoint, so the row needs no
 * JavaScript, no SDK, no third-party script and no cookie — which is what
 * keeps this page a static server component and keeps four social networks
 * from getting a beacon every time somebody scrolls past a card.
 *
 * They point at the post's canonical URL, which resolves as of the
 * `/blog/[slug]` template landing — so a share posts a real page rather than
 * the 404 it would have posted before. What has not changed is the note on
 * `blogPosts`: the article at the other end is still placeholder copy, and
 * these links are live enough to spread it.
 */
export function shareTargets(post: BlogPost): ShareTarget[] {
  const url = encodeURIComponent(canonical(`/blog/${post.slug}`));
  const title = encodeURIComponent(post.title);

  return [
    {
      network: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      network: "x",
      label: "X",
      href: `https://x.com/intent/post?url=${url}&text=${title}`,
    },
    {
      network: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      network: "email",
      label: "Email",
      href: `mailto:?subject=${title}&body=${url}`,
    },
  ];
}

/* -------------------------------------------------------------------------- */
/* One post                                                                   */
/* -------------------------------------------------------------------------- */

/** A post by slug, or undefined. The route turns undefined into a 404. */
export const findPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

/**
 * A heading, as an anchor.
 *
 * Lowercased, non-alphanumerics collapsed to single hyphens, ends trimmed.
 * The em dashes, apostrophes and accented characters the copy actually
 * contains all fall out here rather than reaching a URL.
 *
 * Derived rather than authored, so a heading and the contents entry that
 * jumps to it cannot drift apart — the same reason `BlogSection` has no `id`
 * field for somebody to forget to update when they reword a heading. The
 * trade is that rewording a heading changes its anchor, which breaks a deep
 * link somebody may have saved. For an in-page contents list that is the
 * right side of the trade; if a post ever needs a permanent anchor, that is
 * the day `BlogSection` gains an optional `id`.
 */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    // Strip combining marks left behind by the decomposition above.
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export type PostSection = BlogSection & { id: string };

/**
 * The post's sections with an anchor on each — the article's own skeleton.
 *
 * Both the body and the contents list read from this one function, so the id
 * a heading renders with is by construction the id the contents links to.
 *
 * Duplicate headings within a post get a numeric suffix rather than a
 * duplicate id. Two identical ids on one page is invalid HTML and silently
 * makes every link to the second one land on the first, which is the sort of
 * fault that only shows up in the one long post nobody re-reads.
 */
export function postSections(post: BlogPost): PostSection[] {
  const seen = new Map<string, number>();

  return post.body.map((section) => {
    const base = slugify(section.heading) || "section";
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return { ...section, id: count === 1 ? base : `${base}-${count}` };
  });
}

/**
 * Below this many sections, a post does not get an in-article contents list.
 *
 * A contents list is navigation, and navigation is only worth its space when
 * there is somewhere to go. Three or four headings are already all on the
 * first screen and a half — a list of them is furniture that says "this is
 * long" about something that is not. At five the article is past the point
 * where a reader can see its shape by scrolling, which is exactly when a
 * contents list starts earning its keep.
 *
 * One constant, so the answer is the same for every post and visible in one
 * place rather than decided inside a component.
 */
export const CONTENTS_MIN_SECTIONS = 5;

export const hasContents = (post: BlogPost) =>
  post.body.length >= CONTENTS_MIN_SECTIONS;

/**
 * The three posts shown under an article.
 *
 * Same category first, newest first within it; then the newest of everything
 * else to make the count up. That order is the whole rule: a reader who has
 * just finished a piece about roofs is more likely to want the other roof
 * piece than the most recent post, but a category with one post in it must
 * not leave a short row under the article.
 *
 * `featured` is deliberately ignored. It ranks the index page, and a post is
 * no more relevant to the article above it for being promoted there.
 *
 * The post itself is excluded first, so it can never recommend itself.
 */
export function relatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== post.slug).sort(byNewest);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);

  return [...sameCategory, ...rest].slice(0, count);
}
