import { cn } from "@/lib/cn";

/**
 * The site's list.
 *
 * Two forms — a dash-marked unordered list and a numbered ordered one — and
 * neither uses a browser marker. A default disc is the one piece of type on a
 * page that no design system has touched, and on a site whose whole geometry
 * is squared and ruled it reads as an oversight.
 *
 * The unordered marker is a 10x3px RainCity Blue dash: the system's own
 * hairline at list scale, the same shape as the bar in `SectionLabel` and the
 * rule down the side of a callout. It began on the policy pages and moved
 * here when the blog post template needed the same thing — one marker,
 * defined once, rather than a second list style appearing in an article.
 *
 * The ordered form is for a sequence whose order is the point, and only for
 * that. CLAUDE.md rules out numbered badges as decoration; a list of steps
 * that must be done in order is the case the rule leaves open, and the
 * numeral is set in the site's `meta` type in a fixed gutter rather than in a
 * badge or a circle.
 *
 * `mt-3` on the marker sets it on the optical centre of the first line of
 * body-base rather than on the top of its line box. The numeral is aligned by
 * baseline instead, which is what `items-baseline` on the row is doing — a
 * numeral and the first word of the item should sit on the same line, and a
 * dash and a line of text should not.
 */
export function AccentList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-3 block h-hairline w-2.5 shrink-0 bg-rc-blue"
          />
          <span className="body-base text-steel">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The ordered form. Numerals are zero-padded to two digits so the gutter is
 * one width for the whole list and the items line up down the left, which a
 * bare "9." and "10." would not do.
 */
export function AccentSteps({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col gap-4", className)}>
      {items.map((item, i) => (
        <li key={item} className="flex items-baseline gap-4">
          {/* aria-hidden, because the numeral is what the list element already
              communicates: a screen reader announces "list item 1 of 4" from
              the <ol> itself, and reading the printed numeral as well makes
              every item start with the word "one, one". */}
          <span
            aria-hidden="true"
            className="meta w-6 shrink-0 tabular-nums text-rc-blue"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="body-base text-steel">{item}</span>
        </li>
      ))}
    </ol>
  );
}
