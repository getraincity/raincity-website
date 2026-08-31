import { cn } from "@/lib/cn";

/**
 * The reading column, and the reason it is a component rather than a class.
 *
 * `max-w-prose` is not what it looks like on this site. Tailwind ships it as a
 * static utility meaning `65ch`, and that wins over the `--container-prose`
 * token declared in globals.css — so the measure is not 680px, it is 65
 * characters *of whatever font the element it is on happens to be set in*. On
 * body copy that lands at 663px, near enough to the token that nobody has had
 * cause to notice. Put the same class on a `display-l` heading and it comes
 * out at 1199px; on `display-m`, 959px. The heading escapes the column and
 * the article stops having a left edge.
 *
 * So the measure is set here, once, on a plain div that is left at the body's
 * own font size — and everything inside it, at any type size, inherits the
 * same width. Headings, paragraphs, lists and captions all line up because
 * none of them is measuring itself.
 *
 * Margins belong on this wrapper too, not on the element inside it. That is
 * what lets `first:mt-0` work: the wrapper is the first child of the block
 * run, and the element inside it never is.
 *
 * The rule for anyone adding to this template: never put `max-w-prose`
 * directly on a heading. Wrap it.
 */
export function PostColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-prose", className)}>{children}</div>;
}
