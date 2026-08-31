import Link from "next/link";
import { business, locations, locationsPage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, MapPin } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The coverage map and index — this page's centrepiece, and the one section
 * on the site that could not be lifted onto any other route.
 *
 * The composition is a map on the left and a directory on the right, and the
 * two halves are doing different jobs on purpose. A map answers "roughly
 * where do you go" in one glance and answers "do you come to Ladner" not at
 * all — at metro zoom the label is not even legible. A list answers the
 * second question exactly and the first not at all. Neither is the section;
 * both of them side by side is, which is why the list is not laid over the
 * map. Overlaying it would also put text on top of a live Google iframe,
 * which is a scroll target, a focus target and a thing that repaints.
 *
 * What makes the directory more than nine links is `bearing`. The nine are
 * printed in four bands — the base, then north of the Fraser west and east,
 * then south of it — because that is how this region is actually organised
 * and how anyone booking work here already thinks about it. It is checkable
 * geography rather than invented precision: the alternative, a "14 km · 22
 * min from our base" figure on each row, would look authoritative and be a
 * number nobody measured. The bands come off the data, so a tenth community
 * lands in the right one with nothing here to edit.
 *
 * The map itself is the embed the quote form already uses, asked a different
 * question. There the query is the base city, so Google drops a pin on New
 * Westminster: that section answers "where are you", and a point is the right
 * answer to it. Here the query is the regional district, and Google draws the
 * Metro Vancouver boundary as an outline with no pin in it at all — which is
 * the whole reason this section can show an area rather than a dot without
 * the Maps JavaScript API, an API key, a billing account and a polygon this
 * site would then have to maintain. The free embed does it from a search
 * string, which is the kind of thing that still works untouched in two years.
 *
 * z=10 either way. z=9 was tried first and is too wide: it pulls in Nanaimo,
 * Squamish and Bellingham and leaves the service area a small cluster in the
 * middle of a lot of water. At z=10 the frame runs Bowen Island to Langley
 * and Anmore to White Rock, with the Fraser labelled across the middle of it.
 *
 * The outline is honestly wider than the coverage. All nine communities are
 * Metro Vancouver members, but so are Richmond, the North Shore and Bowen
 * Island, and we do not list those. The caption says so rather than letting
 * the boundary read as the service area — the list beside it is what draws
 * the actual line, which is also the argument for having both.
 *
 * Fog, with the same 2px navy plate the quote form's map sits in. The system
 * carries no radius and no shadow, so a bordered plate is what a framed thing
 * looks like here.
 */
/**
 * The Google search string the embed resolves. Not built from
 * `business.region`: "Greater Vancouver" is the region as this company writes
 * it in its own copy and its own NAP, and "Metro Vancouver" is the name of
 * the regional district Google will actually draw a boundary for. They are
 * the same place under two names, and only one of them is a map query — so it
 * is written out here, next to the note explaining it, rather than derived
 * from a field that means something else.
 */
const MAP_QUERY = "Metro Vancouver, British Columbia, Canada";

export function CoverageMap() {
  return (
    <section className="bg-fog py-section" aria-labelledby="coverage-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{locationsPage.map.label}</SectionLabel>
          <h2 id="coverage-heading" className="display-l mt-5 text-navy">
            {locationsPage.map.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{locationsPage.map.body}</p>
        </Reveal>

        <div className="mt-block grid grid-cols-1 gap-y-block lg:grid-cols-12 lg:gap-x-gap-x">
          {/* Map first in the DOM, so it is also first in the stack on a
              phone. The reverse of the quote form's rule, and for the same
              reason: there the form is what the reader came for, here the
              shape of the area is. */}
          <Reveal as="div" className="flex flex-col lg:col-span-7">
            {/* 384px on its own; `grow` lets the plate take the rest of the
                column once the grid stretches this cell to the height of the
                index beside it. No calc() — the system bans arbitrary values
                downstream.

                Taller than the quote form's 320px, and the extra height is
                doing a job on a phone rather than looking generous. The embed
                is centred on the regional district at a fixed zoom, so the
                width of the box decides how much of the region is in frame
                east to west and the height decides it north to south. At 320
                the map stopped above Surrey and Delta and showed a screen of
                Mount Seymour instead; 384 brings the south bank back in. */}
            <div className="h-96 grow border-2 border-navy bg-fog">
              <iframe
                title={`Map of ${business.region}, the region ${business.name} works across`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  MAP_QUERY,
                )}&z=10&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block size-full border-0"
              />
            </div>
            <p className="meta mt-4 text-steel">{locationsPage.map.caption}</p>
          </Reveal>

          {/* The index. One block per band, and each band's members are
              filtered out of `locations` by their own `bearing` rather than
              listed here — the only thing this file decides is the order the
              bands print in. */}
          <Stagger as="div" className="lg:col-span-5" delay={0.08}>
            {locationsPage.map.groups.map((group) => {
              const members = locations.filter(
                (location) => location.bearing === group.bearing,
              );
              if (members.length === 0) return null;

              return (
                <StaggerItem
                  as="div"
                  key={group.bearing}
                  className="mt-10 first:mt-0"
                >
                  <h3 className="meta border-t border-t-line pt-4 text-steel">
                    {group.title}
                  </h3>

                  <ul>
                    {members.map((location) => (
                      <li key={location.slug}>
                        <Link
                          href={`/locations/${location.slug}`}
                          className="group flex items-center justify-between gap-4 border-b border-b-line py-3.5 transition-colors duration-200 hover:border-b-rc-blue focus-visible:border-b-rc-blue"
                        >
                          {/* Wraps rather than truncating: at the narrowest
                              width this column ever takes, "New Westminster"
                              and its tag do not fit on one line, and a
                              clipped city name on a page whose entire job is
                              naming cities would be the wrong trade. */}
                          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="display-s text-navy transition-colors duration-200 group-hover:text-rc-blue">
                              {location.name}
                            </span>

                            {/* The base marker. RainCity Blue rather than
                                amber: amber means "act here" everywhere else
                                on this site, and this is a fact about us, not
                                a button. */}
                            {location.bearing === "base" && (
                              <span className="meta inline-flex items-center gap-1.5 text-rc-blue">
                                <MapPin className="shrink-0" />
                                {locationsPage.map.baseTag}
                              </span>
                            )}
                          </span>

                          <ArrowRight className="shrink-0 text-rc-blue transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
