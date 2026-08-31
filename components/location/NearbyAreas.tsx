import Link from "next/link";
import { locationPage, nearbyLocations, type Location } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, MapPin } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Two or three neighbouring communities, and the way off this page for a
 * reader who is on the wrong one.
 *
 * The section exists because a service-area page has a specific failure mode:
 * somebody searches their city, lands on the nearest page we have, and finds
 * a page about somewhere else. The nine communities are named on `nearby` in
 * content.ts by geography — Burnaby points at New Westminster, Vancouver and
 * the Tri-Cities because those are the three places a Burnaby page's reader
 * might actually live — and the list resolves through `nearbyLocations`, so a
 * renamed slug drops a card rather than publishing a dead link.
 *
 * Deliberately NOT `LocationCard`. That component is the photographed card
 * from the /locations grid, and by the time a reader reaches this section
 * they have already passed eleven photographed service cards on the same
 * page; a second photo grid underneath would read as the page running out of
 * ideas, and it would put a third crop of the same nine community frames on
 * the site. What is here instead is the plate: a ruled block with the pin,
 * the name, the community's own one-line blurb and a link row — the card's
 * furniture with the photograph taken out of it, which is what makes the
 * section read as a cross-reference rather than as another catalogue.
 *
 * The blurb is `location.blurb`, the same line that community's card carries
 * on /locations. Reused rather than rewritten: it is one sentence saying what
 * the properties there are like, which is exactly what this row needs, and a
 * second version of it would be a second thing to keep true.
 *
 * The link under the cards goes back to the hub. Two or three neighbours is
 * not the service area, and a reader whose city is none of them should not
 * have to use the back button to find the list of nine.
 *
 * White, between the Fog FAQ above and the navy closing below.
 */

export function NearbyAreas({ location }: { location: Location }) {
  const nearby = nearbyLocations(location);
  if (nearby.length === 0) return null;

  /* The site's own short-row arithmetic, not a column count of this
     section's own. Both cases here are a short row — three plates leave the
     third stranded on the left of a two-up tablet grid, and Ridge Meadows'
     two leave a third of a desktop row empty — and every other grid on this
     site centres exactly that rather than letting it read as a rendering
     fault. Called per render rather than at module scope because the count
     changes community to community; it is three array reads. */
  const offsetClasses = shortRowOffsets(nearby.length);

  return (
    <section className="bg-white py-section" aria-labelledby="nearby-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{locationPage.nearby.label}</SectionLabel>
          <h2 id="nearby-heading" className="display-l mt-5 text-navy">
            {locationPage.nearby.heading}
          </h2>
          <p className="body-l mt-6 text-steel">{locationPage.nearby.body}</p>
        </Reveal>

        {/* The half-column grid every card grid on this site runs —
            `sm:grid-cols-4 lg:grid-cols-6` with each item spanning two — which
            is what gives `shortRowOffsets` the half column it needs to centre
            a short row. Same geometry as the eleven service cards above, so
            the two sections line up down the page. */}
        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:grid-cols-6"
        >
          {nearby.map((neighbour, i) => (
            <StaggerItem
              as="li"
              key={neighbour.slug}
              className={cn("sm:col-span-2", offsetClasses(i))}
            >
              <Link
                href={`/locations/${neighbour.slug}`}
                className="group flex h-full flex-col border border-line bg-fog p-6 transition-colors duration-200 hover:border-rc-blue focus-visible:border-rc-blue sm:p-8"
              >
                <MapPin className="shrink-0 text-rc-blue" />

                <h3 className="display-m mt-4 text-navy transition-colors duration-200 group-hover:text-rc-blue">
                  {neighbour.name}
                </h3>

                <p className="body-s mt-3 flex-1 text-steel">
                  {neighbour.blurb}
                </p>

                {/* The arrow flows with the text rather than sitting in a
                    flex row beside it. "Property care in New Westminster"
                    and "…in Ridge Meadow" both wrap to two lines in a
                    half-width card, and as a flex sibling the arrow then
                    floats at the vertical centre of the block, unattached to
                    either line. Inline, it follows the last word wherever
                    that lands — which is also what an arrow after a phrase is
                    supposed to mean. */}
                <span className="meta mt-6 block text-rc-blue transition-colors group-hover:text-navy">
                  {locationPage.nearby.cardCta} {neighbour.name}
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
            {locationPage.nearby.allCta}
            <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
