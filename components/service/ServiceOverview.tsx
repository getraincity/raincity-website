import { business, servicePage, type Service } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
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
 *  1. The intro splits 5 / 6 with a column of air between, heading against
 *     body rather than heading above it. An asymmetric editorial split reads
 *     as a spread; the old 7/4 read as a page with a sidebar bolted on.
 *  2. "What's Included" is a tile grid. The scope is a set of parallel facts
 *     with no order to them, and a tile grid says that where a checklist —
 *     which the eye reads top to bottom as a sequence — did not. The check
 *     glyph goes with it: an icon on every tile is the feature-row cliché the
 *     design notes rule out, and a short RainCity Blue rule marks each entry
 *     without pretending to be an icon.
 *  3. The trust points run as a horizontal band across the full width, under
 *     everything, instead of sitting in a sidebar. They are the footing of the
 *     page, not an aside to one column of it.
 *
 * Colour is the other half of the reset. The site's dark ground is Harbour
 * Navy and its accent is Hi-Vis Amber, and between them they had claimed
 * every emphatic surface on the site. Neither appears here. The band is
 * RainCity Blue — the primary, and until now spent only on rules, links, the
 * card notch and the secondary button, never as a ground — and the tiles are
 * Mist, the Pacific tint that exists precisely to be a light surface that
 * still reads as blue. Pacific carries the divider hairlines on the band.
 * Amber is left for the CTA, which is the one thing on this page it means.
 */
export function ServiceOverview({ service }: { service: Service }) {
  const { trust } = servicePage.overview;

  return (
    <section aria-labelledby="overview-heading">
      <div className="bg-white py-section">
        <div className="mx-auto max-w-site px-edge">
          {/* 5 / 6 with column 6 left empty. The gap is the point: it is what
              stops the two halves reading as a heading with its own caption. */}
          <div className="grid grid-cols-1 gap-x-gap-x gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionLabel>{servicePage.overview.label}</SectionLabel>
              <h2 id="overview-heading" className="display-l mt-5 text-navy">
                {service.detail.overviewHeading}
              </h2>
            </Reveal>

            {/* Optically aligned to the cap height of the h2 beside it rather
                than its box, which sits a shade high without the nudge. */}
            <Reveal
              className="lg:col-span-6 lg:col-start-7 lg:pt-3"
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

          {/* Mist tiles, no border. The fill is the edge — a border as well
              would be two lines doing one job, and the squared corners are
              already carrying the system's geometry. */}
          <Stagger
            as="ul"
            className="mt-6 grid grid-cols-1 gap-x-gap-x gap-y-gap-x sm:grid-cols-2 lg:grid-cols-3"
            step={0.05}
            delay={0.1}
          >
            {service.detail.included.map((item) => (
              <StaggerItem as="li" key={item} className="bg-mist p-6">
                <span
                  aria-hidden="true"
                  className="block h-hairline w-label-bar bg-rc-blue"
                />
                <p className="body-base mt-4 text-navy">{item}</p>
              </StaggerItem>
            ))}
          </Stagger>

          {/* The CTA and the low-friction fallback the inventory asks for —
              the reader who has read the scope and would simply rather talk.
              Side by side, because they are two ways to do one thing. */}
          <Reveal
            className="mt-block flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-12"
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
          these five claims is one this site already makes somewhere else. */}
      <div className="on-navy bg-rc-blue">
        <div className="mx-auto max-w-site px-edge py-14">
          <Reveal>
            <h3 className="display-s text-white">{trust.title}</h3>
          </Reveal>

          {/* Five items: two-up at sm, five across from lg.
              
              Each point takes a full-width Pacific hairline above it rather
              than a rule between the columns. A vertical divider has to know
              which column an item landed in, and five items across a two-up
              grid put items 3 and 5 back in column one — the rule would have
              to be dropped for those and restored at lg, per item. A rule
              over each one is the same reading — a set of parallel claims —
              and is correct at every width without knowing any of that.
              Pacific rather than the band's own blue, which would vanish
              into it, and full-width rather than the 28px bar /about sets
              over its figures, so the two do not read as the same device. */}
          <Stagger
            as="ul"
            className="mt-8 grid grid-cols-1 gap-x-gap-x gap-y-6 sm:grid-cols-2 lg:grid-cols-5"
            step={0.05}
            delay={0.06}
          >
            {trust.points.map((point) => (
              <StaggerItem as="li" key={point}>
                <span
                  aria-hidden="true"
                  className="block h-hairline w-full bg-pacific/45"
                />
                <p className="body-s mt-4 text-mist">{point}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
