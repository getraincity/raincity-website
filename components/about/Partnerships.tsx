import { partnerships } from "@/lib/content";
import type { Partner } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExternalLink } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { PartnerCarousel } from "@/components/about/PartnerCarousel";

/**
 * Partnerships.
 *
 * REDESIGN #2 — 2026-09-10, on the feedback that the previous version still
 * "reads as placeholder" because every plate carried the partner's name as
 * text rather than their actual mark. Touseef pushed the standard: this
 * section is for a client review, and needs to read as production. Two
 * concessions were made explicitly:
 *
 *   1. "Use their identity in this partner section" — for the two cleaning
 *      partners whose sites and marks are publicly available, pull the real
 *      logo. This overrides the earlier "no third-party trademark artwork"
 *      rule for the length of this review pass. `client-action-checklist.md`
 *      documents that this needs written permission before the page is
 *      indexed publicly; the mark files sit in `public/partners/` with a
 *      note on each one.
 *
 *   2. "If you are not sure about anything, just use any company making
 *      sense according to the business. I will go through it later for
 *      confirmation." So the universities and business/member marks are
 *      publicly-published forms (Wikimedia Commons for CFIB and the three
 *      coats of arms; the partner's own header logo for Union Savings).
 *      Nothing was invented — every asset has a source recorded on its
 *      `logo:` entry in content.ts.
 *
 * Two partners still have no logo file — CFOne (its brand asset was not
 * locatable without a CFMWS-supplied download) and SA Cleaning (no site
 * URL supplied yet). Those fall through to `WordmarkPlate` below, which
 * renders a distinct stylised nameplate rather than the generic Fog tag
 * the earlier version produced. That's the "still identifiable, still
 * production-looking" state.
 *
 * ─── the treatments, one per group ──────────────────────────────────
 *
 * "Cleaning partners" — `layout: "tiles"`, LARGE cards. Each partner gets
 * its own accent colour along the top edge, a large logo well in Fog, the
 * name below, and a "Visit site" link on partners that carry a URL. This
 * is the most branded of the three treatments because these three are the
 * partners with the deepest working relationship, and (for two of the
 * three) the ones whose brands the reader can go and verify. Grid: 1 col
 * phone, 2 col tablet, 3 col desktop.
 *
 * "Post-secondary partners" — `layout: "carousel"`. The horizontal
 * scroll-snap mechanism the homepage testimonials use, generalised to
 * logo-only plates. Requested by name: "as we have a section on home
 * page, the review section... continuous... logos in full length." No
 * name captions below the logos — the coats of arms are read by shape,
 * and captioning them repeats what the mark already says. The plates are
 * shorter than they were in v1: "you can just reduce the size — I don't
 * think that much big will make more sense."
 *
 * "Business and member partners" — `layout: "tiles"`, SMALLER cards than
 * the Cleaning group. These are credibility badges rather than active
 * partnerships (a business federation, a benefits programme, a forces
 * community programme), and the badge grammar `Awards.tsx` already uses
 * for credential marks is the right reference. No accent stripe, no
 * "Visit site" link — the mark itself is the whole point.
 *
 * ─── the shared invariants ──────────────────────────────────────────
 *
 * A group with no items is skipped rather than rendered as a bare heading,
 * so the "Property management" group stays absent from the page while its
 * `items` array is empty.
 *
 * White ground, `py-section` height, and the fog-to-navy cut below still
 * come out of White — see the earlier version of this comment for why
 * that is load-bearing on the Founders-absent state.
 */

/**
 * PARTNERLOGO — one presentational primitive both tile groups and the
 * carousel use to render a partner's mark.
 *
 * SVGs and raster images go through a plain `<img>` tag rather than
 * `next/image`. Two reasons:
 *   1. Next's image optimiser will refuse an SVG source unless
 *      `dangerouslyAllowSVG` is enabled on `next.config.ts`, and the site
 *      deliberately does not have that turned on. Two of the seven logos
 *      here are SVG.
 *   2. Every logo file on disk is under 175 KB (most under 20 KB), which is
 *      small enough that the optimiser adds no measurable saving. A uniform
 *      `<img>` render keeps the code path identical across formats.
 *
 * `object-contain` inside a fixed-height plate is what actually controls
 * the rendered dimensions, so the `width`/`height` here only supply the
 * intrinsic aspect ratio — passing them explicitly still prevents a
 * layout shift while the file is downloading.
 */
type PartnerLike = {
  name: string;
  logo?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

function PartnerLogo({
  partner,
  heightClass,
}: {
  partner: PartnerLike;
  /** Tailwind height utility for the logo well; e.g. `h-14 sm:h-16`. */
  heightClass: string;
}) {
  if (!partner.logo) {
    return <WordmarkPlate name={partner.name} heightClass={heightClass} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see the note on
    // this component for why `<img>` rather than next/image.
    <img
      src={partner.logo.src}
      alt={partner.logo.alt}
      width={partner.logo.width}
      height={partner.logo.height}
      loading="lazy"
      decoding="async"
      className={cn(heightClass, "w-auto max-w-full object-contain")}
    />
  );
}

/**
 * WordmarkPlate — the "no logo file yet" state.
 *
 * Renders the partner's name as a typographic mark rather than as body
 * text on a plain background. The design decision: two lines of contrast,
 * both drawn from the site's own type system — `display-s` for the
 * primary name, `eyebrow` for a small "PARTNER" caption underneath. The
 * result reads as a deliberate wordmark rather than as a placeholder,
 * which is the whole point of the change.
 *
 * Kept in the same fixed-height plate as a real logo so a mixed row (some
 * with logos, some without) still aligns.
 */
function WordmarkPlate({
  name,
  heightClass,
}: {
  name: string;
  heightClass: string;
}) {
  return (
    <div className={cn(heightClass, "flex flex-col items-center justify-center gap-1 px-2 text-center")}>
      <span className="display-s text-navy">{name}</span>
      <span className="eyebrow text-steel">Partner</span>
    </div>
  );
}

export function Partnerships() {
  const groups = partnerships.groups.filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;

  return (
    <section className="bg-white py-section" aria-labelledby="partnerships-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Heading full-width, on its own line. Same treatment as `Process`
            higher up the page. */}
        <Reveal className="max-w-prose">
          <SectionLabel>{partnerships.label}</SectionLabel>
          <h2 id="partnerships-heading" className="display-l mt-5 text-navy">
            {partnerships.heading}
          </h2>
        </Reveal>

        <div className="mt-block flex flex-col gap-14">
          {groups.map((group) => (
            <Reveal key={group.label} delay={0.08}>
              <h3 className="meta text-steel">{group.label}</h3>

              {group.layout === "carousel" ? (
                <div className="mt-6">
                  {/* Spread to a plain mutable array — content.ts declares
                      `readonly Partner[]`, and a client component's prop
                      cannot accept `readonly` without a per-partner
                      unwrap. Cheap copy of three small objects. */}
                  <PartnerCarousel items={[...group.items]} />
                </div>
              ) : group.label === "Cleaning partners" ? (
                <CleaningTiles items={group.items} />
              ) : (
                <BadgeTiles items={group.items} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CleaningTiles — the large branded card variant, used by the "Cleaning
 * partners" group.
 *
 * Per-card structure:
 *   - Accent stripe along the top edge, in the partner's own colour (from
 *     `accent`). Set via inline `borderTopColor` because the value is a
 *     different hex per partner and cannot be one of a small set of
 *     literal Tailwind class names.
 *   - Large Fog well holding the logo (or wordmark plate). `h-24 sm:h-28`.
 *   - The partner name in `display-s`, so it also carries typographic
 *     weight when the logo is small.
 *   - A "Visit site" link, in RainCity blue rather than the partner's
 *     accent (a partner's brand colour is not guaranteed to clear WCAG's
 *     4.5:1 contrast floor on white — Crystal Clear's own pink measures
 *     ~2:1). The border on top can carry brand colour because it's
 *     decoration; the link cannot because it's text.
 *
 * Whole card becomes a link on partners that carry `href`, using the same
 * `target="_blank" rel="noopener"` pattern the outbound-citations in blog
 * posts use.
 */
function CleaningTiles({ items }: { items: readonly Partner[] }) {
  return (
    <Stagger
      as="ul"
      className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      delay={0.06}
    >
      {items.map((item) => {
        const card = (
          <div
            className={cn(
              "flex h-full flex-col gap-6 border border-line bg-white p-6 sm:p-7",
              item.accent && "border-t-4",
              item.href && "transition-colors group-hover:border-rc-blue",
            )}
            style={item.accent ? { borderTopColor: item.accent } : undefined}
          >
            <div className="flex h-24 items-center justify-center bg-fog px-6 sm:h-28">
              <PartnerLogo partner={item} heightClass="h-16 sm:h-20" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="display-s text-navy">{item.name}</p>
              {item.href && (
                <span className="eyebrow inline-flex items-center gap-1.5 text-rc-blue">
                  Visit site
                  <ExternalLink className="size-3" />
                </span>
              )}
            </div>
          </div>
        );

        return (
          <StaggerItem as="li" key={item.name}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener" className="group block h-full">
                {card}
              </a>
            ) : (
              card
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/**
 * BadgeTiles — the smaller credential-badge variant, used by "Business
 * and member partners".
 *
 * Deliberately quieter than `CleaningTiles`: a smaller card, no accent
 * stripe, no "Visit site" link, no wrapping anchor. The mark is the whole
 * claim — same grammar the `Awards.tsx` credential row uses. The name
 * appears in a `meta` caption below the plate rather than a `display-s`
 * heading, because the mark itself already names the organisation.
 */
function BadgeTiles({ items }: { items: readonly Partner[] }) {
  return (
    <Stagger
      as="ul"
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      delay={0.05}
    >
      {items.map((item) => (
        <StaggerItem as="li" key={item.name}>
          <div className="flex h-full flex-col items-center gap-4 border border-line bg-white px-6 py-6 text-center">
            <div className="flex h-16 w-full items-center justify-center bg-fog px-4">
              <PartnerLogo partner={item} heightClass="h-10 sm:h-12" />
            </div>
            <p className="meta text-navy">{item.name}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
