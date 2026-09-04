import Link from "next/link";
import { locations, servicePage } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, MapPin } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The nine communities, on a service page.
 *
 * This is the mirror of `LocationServices`, and it is here because that
 * component had no counterpart. Every community page carries all eleven
 * service links; no service page carried a single community link. The built
 * HTML of /services/gutter-cleaning contained exactly eight internal hrefs —
 * `/`, `/about`, `/blog`, `/contact`, `/locations`, `/services` and the two
 * policy pages — on the page most likely to be the entry point for a search
 * like "gutter cleaning Surrey". The reader who arrived that way had nowhere
 * to go that answered the second half of what they typed.
 *
 * The header's dropdowns are not the answer to that and are the reason it
 * went unseen for so long: `Header` keeps its children behind `openMenu`
 * state, so those eleven and nine links are not in the server HTML of any
 * route on this site. Everything a crawler follows has to be in a section.
 *
 * All nine, not a selection, for the same reason `LocationServices` shows all
 * eleven: every service is offered in every community — that is what
 * `areaServed` asserts in this page's own JSON-LD a few hundred lines up — and
 * showing five here would quietly imply the other four are outside some
 * boundary.
 *
 * Deliberately the plate, not `LocationCard`. This is the same decision
 * `NearbyAreas` documents and for the same reason: the reader has just come
 * past six photographed scope tiles, and a nine-up photo grid underneath
 * would read as the page running out of things to say — and it would put a
 * third crop of the same nine community frames onto the site. The plate is
 * the card's furniture with the photograph taken out, which is what makes a
 * cross-reference look like a cross-reference.
 *
 * White, and it sits where `NearbyAreas` sits on the community template: after
 * the Fog process band, before the amber edge into the navy closing. The two
 * templates now have the same shape in the same order, which is the point.
 *
 * It takes no props. The heading was `{service.title} Across Greater
 * Vancouver` until it was measured at 375px and came out three and four lines
 * against the template's two-line rule — see `servicePage.areas` in
 * content.ts. Nothing else in this band varies by service, so the argument
 * went with the heading rather than being carried unread.
 */

// Nine plates strand one card on the final two-up row and none on the
// three-up. `shortRowOffsets` centres it, exactly as the four other card
// grids on this site do. The count is fixed for every render — `locations` is
// module scope — so this is computed once rather than per page.
const offsetClasses = shortRowOffsets(locations.length);

export function ServiceAreas() {
  return (
    <section className="bg-white py-section" aria-labelledby="areas-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{servicePage.areas.label}</SectionLabel>
          <h2 id="areas-heading" className="display-l mt-5 text-navy">
            {servicePage.areas.heading}
          </h2>
          <p className="body-l mt-6 text-steel">{servicePage.areas.body}</p>
        </Reveal>

        {/* The half-column grid every card grid on this site runs —
            `sm:grid-cols-4 lg:grid-cols-6` with each item spanning two — which
            is what gives `shortRowOffsets` the half column it needs. */}
        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:grid-cols-6"
        >
          {locations.map((location, i) => (
            <StaggerItem
              as="li"
              key={location.slug}
              className={cn("sm:col-span-2", offsetClasses(i))}
            >
              <Link
                href={`/locations/${location.slug}`}
                className="group flex h-full flex-col border border-line bg-fog p-6 transition-colors duration-200 hover:border-rc-blue focus-visible:border-rc-blue sm:p-8"
              >
                <MapPin className="shrink-0 text-rc-blue" />

                <h3 className="display-m mt-4 text-navy transition-colors duration-200 group-hover:text-rc-blue">
                  {location.name}
                </h3>

                <p className="body-s mt-3 flex-1 text-steel">
                  {location.blurb}
                </p>

                {/* Inline rather than a flex sibling, so the arrow follows the
                    last word wherever a two-line name leaves it. Same
                    construction as `NearbyAreas`. */}
                <span className="meta mt-6 block text-rc-blue transition-colors group-hover:text-navy">
                  {servicePage.areas.cardCta} {location.name}
                  <ArrowRight className="ml-2 inline-block align-middle transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10" delay={0.08}>
          <Link
            href="/locations"
            className="meta group inline-flex items-center gap-2 border-b border-b-line pb-2 text-rc-blue transition-colors duration-200 hover:border-b-rc-blue hover:text-navy focus-visible:border-b-rc-blue"
          >
            {servicePage.areas.allCta}
            <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
