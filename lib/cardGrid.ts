/**
 * Centring the short final row of a service card grid.
 *
 * Eleven services divide into neither three columns nor two, so the final row
 * is always short: two cards at desktop, one at tablet. Left-aligned they read
 * as a rendering fault, and stretching them to fill the row would break the
 * one thing these grids have going for them, which is that every card is the
 * same size. So the short row is centred instead.
 *
 * CSS grid cannot centre a partial row directly, so the columns are halved and
 * every card spans two of them: six columns at `lg`, four at `sm`. A card is
 * then `2c + g` wide, which works out identical to the three- and two-column
 * widths it replaces — the layout is unchanged for every full row. What the
 * finer grid buys is the half-column offset needed to centre the last one:
 * `col-start-2` on a six-column grid indents by exactly `c + g`, which is half
 * the space two missing cards leave behind.
 *
 * The offsets derive from the card count, so a grid re-centres itself when
 * `services` changes rather than needing the indices edited by hand. Class
 * names are looked up whole rather than interpolated, because Tailwind scans
 * source text and never sees a constructed string.
 *
 * Used by the homepage teaser grid and the /services catalogue. Both run the
 * same three-up geometry, so the arithmetic lives here once — a second copy
 * would be a second thing to keep in step with `services.length`.
 */

/** Start column for a short final row, by how many cards are left in it. */
const LG_START = ["", "lg:col-start-3", "lg:col-start-2"] as const;
const SM_START = ["", "sm:col-start-2"] as const;

/**
 * Build the offset lookup for a grid of `count` cards. Returns a function
 * mapping a card's index to the column-start classes it needs, or "".
 *
 * The grid itself must be `sm:grid-cols-4 lg:grid-cols-6` with every card
 * spanning `sm:col-span-2`, which is what makes the half-column offset land.
 */
export function shortRowOffsets(count: number): (index: number) => string {
  const lgTail = count % 3; // cards stranded in the final three-up row
  const smTail = count % 2; // …and in the final two-up row
  const lgStartIndex = lgTail ? count - lgTail : -1;
  const smStartIndex = smTail ? count - smTail : -1;

  return function offsetClasses(i: number): string {
    const classes: string[] = [];
    if (i === smStartIndex) classes.push(SM_START[smTail]);
    if (i === lgStartIndex) classes.push(LG_START[lgTail]);
    // Breakpoint prefixes are min-width, so an `sm:` offset would otherwise
    // still apply at `lg` and collide with the card placed there.
    else if (i === smStartIndex) classes.push("lg:col-start-auto");
    return classes.join(" ");
  };
}
