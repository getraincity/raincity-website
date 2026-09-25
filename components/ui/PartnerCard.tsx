import { partnerships } from "@/lib/content";
import type { Partner } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icon";

/**
 * The partner card — the service card's anatomy with the logo standing in for
 * the photograph. Approved by the client on /about (2026-09-13) and moved here
 * when the community pages' Local Partners section needed the same card: one
 * component, so the two sections cannot drift apart.
 *
 *  - VISUAL PANEL: a tinted panel holding the mark, with the service card's
 *    own signature — the corner notch cut out to reveal RainCity Blue.
 *  - BODY: tag (`meta`, blue ink), partner name (`display-s`), a two-line
 *    blurb (`body-s`), and "Visit Site →" for partners with a site.
 *  - Hover moves the border to RainCity Blue and deepens the panel a shade,
 *    only on cards that link somewhere.
 *
 * Design history and the rejected versions are on `Partnerships.tsx`.
 */

/**
 * Visual-panel tints, repeating 1-2-3 across a grid — at `lg` that is one
 * colour per column. Asked for by the client: a single Fog on every panel
 * read as flat.
 *
 * FROM THE SITE'S PALETTE, NOT THE PARTNERS'. Brand-matched tints were
 * considered and rejected: Crystal Clear's pink would sit beside CFIB's red,
 * three of the crests are near-identical blues, and two partners have no mark
 * at all. Instead it extends the Why Choose Us row wash (cool RainCity Blue,
 * warm Amber) to three steps with Steel as the third: blue, sand, slate. Each
 * sits on a solid white layer so the tint composites with nothing else, and
 * the opacities are low enough that the multiplied marks keep their colours.
 * Blue at 10 rather than 8: at 8 it read a step fainter than the sand.
 *
 * Each tint carries its own hover step. It is `group-hover`, and only linked
 * cards are a `group`, so a card that opens nothing never answers the pointer.
 * Photographs from the partners' own sites were considered for these panels
 * and rejected: other people's images, a dark overlay that would erase every
 * dark-on-transparent mark, and two partners with no site to take one from.
 *
 * Whole literal class strings, looked up by index: Tailwind never sees a
 * constructed class name.
 */
export const panelTint = [
  "bg-rc-blue/10 group-hover:bg-rc-blue/16",
  "bg-amber/12 group-hover:bg-amber/20",
  "bg-steel/10 group-hover:bg-steel/16",
] as const;

export function PartnerCard({
  partner,
  tag,
  tint,
}: {
  partner: Partner;
  /** The eyebrow over the name — a sector, or a sector and a place. */
  tag: string;
  tint: (typeof panelTint)[number];
}) {
  const body = (
    <>
      {/* Visual panel. The notch is cut out of the panel; RainCity Blue sits
          behind it, exactly as behind the service card's photograph. The
          white layer under the tint keeps the notch's blue from bleeding
          through a translucent colour. */}
      <div className="bg-rc-blue">
        <div className="card-corner-cut bg-white">
          <div className={cn("flex h-32 items-center justify-center px-6 transition-colors duration-300 ease-out [--mark:6rem] sm:h-40 sm:[--mark:7.5rem]", tint)}>
            <PartnerMark partner={partner} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-card">
        <p className="meta text-blue-ink">{tag}</p>
        <h3 className="display-s mt-2 text-navy">{partner.name}</h3>
        <p className="body-s mt-2 flex-1 text-steel">{partner.blurb}</p>

        {partner.href && (
          <span className="meta mt-4 inline-flex items-center gap-2 text-rc-blue transition-colors group-hover:text-navy">
            {partnerships.visitLabel}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </>
  );

  // `overflow-hidden` so the 4px corner clips the visual panel too.
  const card =
    "flex h-full flex-col overflow-hidden rounded-card border border-line bg-white";

  if (!partner.href) {
    return <div className={card}>{body}</div>;
  }

  // New tab, `noopener`, deliberately no `nofollow` — the same choice
  // PostBody.tsx makes for citations.
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener"
      aria-label={`${partner.name} (opens their website in a new tab)`}
      className={cn(card, "group transition-colors duration-200 hover:border-rc-blue focus-visible:border-rc-blue")}
    >
      {body}
    </a>
  );
}

/**
 * The mark, at its own proportions, sized so every logo covers ABOUT THE SAME
 * AREA: width = `--mark` x sqrt(aspect ratio), so height = `--mark` /
 * sqrt(ratio) and width x height = `--mark` squared for every file. A square
 * crest is `--mark` on a side; a 6.6:1 wordmark is 2.6 x `--mark` wide and
 * correspondingly short. `--mark` is set on the panel, one step per
 * breakpoint.
 *
 * It replaced a fixed height ceiling (48px on anything 2:1 or wider, 80px on
 * the rest) on 2026-09-25, when the client said the logos looked small in
 * their boxes. They were: the ceiling held New West Spotlight, at 2.25:1, to
 * 108x48 in a 419x160 panel, and Hello Gubby and Tri-Cities fared little
 * better, while the long wordmarks beside them filled the width. Equal area is
 * the usual answer to a mixed logo wall: nothing dwarfs its neighbours, and
 * nothing is left as a speck.
 *
 * The files are trimmed to their ink (a few pixels of margin at most) so the
 * area is the mark's, not its canvas's, and `logo.width`/`height` must be the
 * file's true size, since the ratio drives the width.
 *
 * Plain `<img>`, not next/image: two files are SVG and `next.config.ts`
 * deliberately does not enable `dangerouslyAllowSVG`. `mix-blend-multiply`
 * drops Capilano's white JPEG ground into the panel. `alt=""` because the
 * partner's name is printed directly beneath it. A partner with no logo file
 * shows its name in the panel, set quietly so it does not read as a heading.
 */
function PartnerMark({ partner }: { partner: Partner }) {
  if (!partner.logo) {
    return (
      <span className="display-m text-center text-steel/60">{partner.name}</span>
    );
  }

  const scale = Math.sqrt(partner.logo.width / partner.logo.height).toFixed(3);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see note above.
    <img
      src={partner.logo.src}
      alt=""
      width={partner.logo.width}
      height={partner.logo.height}
      loading="lazy"
      decoding="async"
      // An inline style because the multiplier is per file; `max-w-full`
      // shrinks a long wordmark on a narrow card instead of overflowing it.
      style={{ width: `calc(var(--mark) * ${scale})` }}
      className="h-auto max-w-full object-contain mix-blend-multiply"
    />
  );
}
