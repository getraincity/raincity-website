import {
  business,
  includedItems,
  servicePage,
  type Service,
} from "@/lib/content";
import { cn } from "@/lib/cn";
import { photos, type Photo as PhotoRecord, type PhotoKey } from "@/lib/photos";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { CheckPlate, Phone } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The substance of the page: what the work actually covers, and the standing
 * reasons to hand it to this company.
 *
 * Built as two stacked full-bleed bands rather than a wide column beside a
 * narrow one. The previous composition — 7 columns of copy next to a 4-column
 * Fog panel — was the site's most-repeated shape: /about's WhoWeAre, the
 * homepage's WhyChooseUs and this section were three variations on
 * content-left, panel-right, and a reader moving between them saw the same
 * furniture three times.
 *
 * What replaces it:
 *
 *  1. The intro is a masthead. The eyebrow sits on its own line, a hairline
 *     runs the full width under it, and the heading and the paragraph both
 *     hang from that rule — 5 columns against 6, with column 6 left empty and
 *     a second hairline standing in the gap. Before the rules it was a
 *     heading beside a paragraph and nothing more; the two lines are what
 *     make it read as a composed spread rather than two blocks that happen to
 *     be side by side.
 *  2. "What's Included" is a tile grid. The scope is a set of parallel facts
 *     with no order to them, and a tile grid says that where a checklist —
 *     which the eye reads top to bottom as a sequence — did not. The check
 *     glyph goes with it: an icon on every tile is the feature-row cliché the
 *     design notes rule out.
 *  3. The trust block runs as a full-bleed band under everything, instead of
 *     sitting in a sidebar — it is the footing of the page, not an aside to
 *     one column of it — and is itself split: the claim, its supporting
 *     paragraph and the ask on the left, the five points as a ticked list on
 *     the right.
 *
 * Colour is the other half of the reset. The site's dark ground is Harbour
 * Navy and its accent is Hi-Vis Amber, and between them they had claimed
 * every emphatic surface on the site. Neither carries a surface here. The
 * band is RainCity Blue — the primary, and until now spent only on rules,
 * links, the card notch and the secondary button, never as a ground. Pacific
 * carries the divider hairlines on the band. Amber is left for the CTA, which
 * is the one thing on this page it means.
 */

/**
 * Tile washes, cycling left to right and repeating on the second row, so the
 * three-column grid reads as two matched rows rather than six unrelated
 * boxes.
 *
 * Mist and Fog are the system's two light surfaces. There is no soft yellow
 * token — the palette's only warm value is Hi-Vis Amber — so the third wash
 * is amber laid on at a tenth, which is the same device the homepage's Why
 * Choose Us index already uses to tint alternate rows. It is a wash, not a
 * fill: at 10% it is a tone the eye reads as paper stock, and the solid amber
 * CTA further down the section still has the only amber on the page that
 * means "act here".
 *
 * Written out as whole literal class names because Tailwind's scanner never
 * sees a string this file builds.
 */
const tileWash = ["bg-mist", "bg-amber/10", "bg-fog"] as const;

export function ServiceOverview({ service }: { service: Service }) {
  const { trust } = servicePage.overview;

  // The band is fixed furniture — same title, same button, same phone prompt
  // on every page — and only its argument is per service. A service that has
  // written its own `detail.trust` supplies the paragraph and the five claims;
  // everything else still comes off `servicePage`. Window Cleaning is the one
  // page with no override, and the default it falls back to is that page's
  // own approved wording, so the fallback is real copy rather than a stub.
  const { blurb, points } = service.detail.trust ?? trust;
  const items = includedItems(service);

  /**
   * The washed-tile treatment, switched on by the content rather than by a
   * flag. A service qualifies the moment its scope lines carry copy or
   * photography of their own, and all eleven do now, so this is true on every
   * page today. It is read off the content rather than deleted because a
   * twelfth service added with bare titles should get the flat Mist tile the
   * grid was built on, not a three-tone rhythm applied to six empty boxes.
   */
  const expanded = items.some((item) => item.description ?? item.photo);

  return (
    <section aria-labelledby="overview-heading">
      {/* pt-section, but not pb-section. The band closes on a centred CTA
          and is followed immediately by the blue one, so a full 128px of
          white under the button stacked against the blue band's own padding
          and read as a hole in the page rather than as breathing room. 64px
          is the gap; the colour change does the rest of the separating. */}
      <div className="bg-white pt-section pb-16">
        <div className="mx-auto max-w-site px-edge">
          <Reveal>
            <SectionLabel>{servicePage.overview.label}</SectionLabel>
            {/* The masthead rule. Full container width, so it sets the
                measure both columns below are cut from. */}
            <span
              aria-hidden="true"
              className="mt-5 block h-px w-full bg-line"
            />
          </Reveal>

          {/* 5 / 6 with column 6 left empty. The gap is the point: it is what
              stops the two halves reading as a heading with its own caption,
              and the hairline standing in it is what stops the gap reading as
              an accident. */}
          <div className="grid grid-cols-1 gap-x-gap-x lg:grid-cols-12">
            <Reveal className="pt-8 lg:col-span-5 lg:pt-10">
              <h2 id="overview-heading" className="display-l text-navy">
                {service.detail.overviewHeading}
              </h2>
            </Reveal>

            {/* pt-11 against the heading's pt-10: four pixels of optical
                nudge, because body-l hangs a shade high off a shared rule
                next to display-l's cap height. */}
            <Reveal
              className="pt-6 lg:col-span-6 lg:col-start-7 lg:border-l lg:border-line lg:pt-11 lg:pl-10"
              delay={0.08}
            >
              <p className="body-l text-steel">{service.detail.overview}</p>
            </Reveal>
          </div>

          <Reveal className="mt-block" delay={0.06}>
            <h3 className="meta text-rc-blue">
              {servicePage.overview.includedLabel}
            </h3>
          </Reveal>

          {/* No borders on the tiles. The wash is the edge — a border as well
              would be two lines doing one job, and the squared corners are
              already carrying the system's geometry. The photograph runs to
              all three edges of its tile for the same reason. */}
          <Stagger
            as="ul"
            className="mt-6 grid grid-cols-1 gap-x-gap-x gap-y-gap-x sm:grid-cols-2 lg:grid-cols-3"
            step={0.05}
            delay={0.1}
          >
            {items.map((item, i) => {
              // A tile whose photo key points at a placeholder entry (the shot
              // has not been taken yet) degrades to the text-only layout rather
              // than showing an empty fog block where a photograph should be.
              // Text-only reads as intentional; a photo-shaped void reads as
              // broken. The real file drops in by deleting the `placeholder`
              // line in photos.ts — nothing here needs to change.
              const hasRealPhoto =
                item.photo &&
                !(photos[item.photo as PhotoKey] as PhotoRecord).placeholder;

              return (
              <StaggerItem
                as="li"
                key={item.title}
                className={cn(
                  "group",
                  expanded ? tileWash[i % tileWash.length] : "bg-mist",
                )}
              >
                {hasRealPhoto ? (
                  /* The photo sits on RainCity Blue, the way the service card
                     does, so the wash below has a ground rather than a hole
                     behind it at the moment it lifts. */
                  <div className="relative bg-rc-blue">
                    <Photo
                      name={item.photo!}
                      ratio="16:10"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      imgClassName="transition-transform duration-300 ease-out group-hover:scale-105"
                    />

                    {/* Brand wash, the homepage service card's device at a
                        lighter setting: six frames from six sources, and a
                        thin RainCity Blue tint pulls them into one family
                        without reading as a tinted photo. 12% resting rather
                        than the card's 15% because these run three-up at
                        nearly twice the card's height, where the same tint
                        carries further. It lifts to 4% on hover, so the tile
                        answers the pointer by getting clearer rather than
                        darker — and the frame scales 5% under it, which is
                        the only movement here and is transform-only, so
                        nothing reflows. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-rc-blue/12 transition-colors duration-300 ease-out group-hover:bg-rc-blue/4"
                    />
                  </div>
                ) : null}

                <div className="p-6">
                  {/* Without a real photograph the tile falls back to a short
                      blue rule, so the slot above the title is never empty.
                      Placeholder photos are treated the same as no photo at
                      all — the real frame drops in by removing the `placeholder`
                      line in photos.ts. */}
                  {hasRealPhoto ? null : (
                    <span
                      aria-hidden="true"
                      className="mb-4 block h-hairline w-label-bar bg-rc-blue"
                    />
                  )}

                  {/* Chivo where there is copy under it and the title has to
                      out-weigh it; the plain body line otherwise, which is
                      what a tile carrying nothing but a title has always
                      been. */}
                  <h4
                    className={cn(
                      "text-navy",
                      item.description ? "display-s" : "body-base",
                    )}
                  >
                    {item.title}
                  </h4>

                  {item.description ? (
                    <p className="body-s mt-3 text-steel">{item.description}</p>
                  ) : null}
                </div>
              </StaggerItem>
              );
            })}
          </Stagger>

          {/* The CTA and the low-friction fallback the inventory asks for —
              the reader who has read the scope and would simply rather talk.
              Side by side, because they are two ways to do one thing, and
              centred under the grid: left-aligned they hung off the first
              column of a six-tile block and read as a caption to it rather
              than as the section's own close. */}
          <Reveal
            className="mt-block flex flex-col items-center gap-8 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-12"
            delay={0.12}
          >
            <Button href="#quote">{service.detail.cta}</Button>

            <div>
              <p className="meta text-steel">{trust.callPrompt}</p>
              <a
                href={business.phoneHref}
                className="display-s mt-2 inline-flex items-center gap-3 text-rc-blue transition-colors duration-200 hover:text-navy"
              >
                <Phone className="shrink-0" />
                {business.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* The fixed half, identical on every service page. A band rather than
          a panel — see the note on `servicePage` in content.ts for why each of
          these five claims is one this site already makes somewhere else.

          It was five points strung across the full width under a single line
          of heading, each with a hairline over it. At five columns each claim
          got about 230px, which is two or three words a line, and the rules
          between them tightened rather than separated: the row read as a
          footer strip. Split in two it becomes a section — the claim and its
          ask on the left, the evidence as a list on the right, with each item
          given a full line and a tick rather than a rule.

          The list is the reason the marks are worth their pixels. A checkmark
          is the one piece of iconography that is not decoration here: it says
          "included", which is exactly what a list under "Why Choose RainCity?"
          is asserting. It sits on the logo's own cut plate rather than running
          bare — see CheckPlate in Icon.tsx. White rather than Pacific, which
          at 2:1 against this blue would not have held a 1.75 stroke. */}
      <div className="on-navy bg-rc-blue">
        <div className="mx-auto max-w-site px-edge py-16">
          <div className="grid grid-cols-1 gap-x-gap-x gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="display-m text-white">{trust.title}</h3>
              <p className="body-base mt-5 text-mist">{blurb}</p>
              {/* Amber, the same as the closing band's. The rule that amber
                  means "act here" is why this is a button and the ticks
                  beside it are not. */}
              <Button href="#quote" className="mt-8">
                {trust.cta}
              </Button>
            </Reveal>

            <Stagger
              as="ul"
              className="flex flex-col gap-7 lg:col-span-6 lg:col-start-7"
              step={0.05}
              delay={0.06}
            >
              {points.map((point) => (
                <StaggerItem
                  as="li"
                  key={point}
                  className="flex items-start gap-4"
                >
                  {/* mt-0.5 rather than a flex centre: the mark should sit on
                      the first line of a claim that wraps, not in the middle
                      of the block. Half the nudge the bare tick needed — the
                      plate is 20px against its 16 and already fills the line
                      box. */}
                  <CheckPlate className="mt-0.5 shrink-0 text-white" />
                  <p className="body-base text-mist">{point}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
