import {
  business,
  locationPage,
  locationsPage,
  type Location,
} from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";

/**
 * The map, at community zoom.
 *
 * The same free Google embed /locations and the quote form use, asked a third
 * question. The quote form's query is the base city, so Google drops a pin on
 * New Westminster — that section is answering "where are you", and a point is
 * the right answer to it. The hub map's query is the regional district at
 * z=10, so Google draws the Metro Vancouver boundary and the section answers
 * "how big is the area". Here the query is this one community at a zoom
 * written for it, and the question is "is that where I live" — which needs
 * the streets legible, not the region.
 *
 * Still the embed rather than the Maps JavaScript API: no key, no billing
 * account, no polygon for this site to maintain, and it will still work
 * untouched in two years. `detail.mapQuery` and `detail.mapZoom` are per
 * community and the note on `LocationDetail` in content.ts says why both are
 * written out rather than derived — two of the nine are groupings that Google
 * resolves to nothing, and the embed has no fit-to-bounds, so the zoom is the
 * only control over what lands in frame.
 *
 * Composition is deliberately the mirror of the hub page's: there the map
 * takes the wide left column and the nine-city index sits beside it, because
 * that page's job is letting a reader find their own city in a list. Here the
 * reader has already found it, so the heading column leads and the map takes
 * the wide right one. Reversed columns are what stop the two map sections
 * reading as the same section twice on the way through the site.
 *
 * Both facts beside the heading are derived, not written. `business.base` is
 * the same string the header, the footer and every piece of structured data
 * print, and the band label comes from this community's own `bearing` through
 * `locationsPage.map.groups` — the same four bands the hub page's index is
 * built on. Neither can drift, and a tenth community brings both with it.
 *
 * White, between the Fog service grid above and the Fog FAQ below.
 */
export function LocationMap({ location }: { location: Location }) {
  const { detail } = location;
  const band = locationsPage.map.groups.find(
    (group) => group.bearing === location.bearing,
  );

  const facts = [
    { label: locationPage.map.baseLabel, value: business.base },
    // `band` is always found — every bearing on `Location` has a group — but
    // the fact is dropped rather than rendered blank if a tenth bearing is
    // ever added here before its band is added there.
    ...(band
      ? [{ label: locationPage.map.bearingLabel, value: band.title }]
      : []),
  ];

  return (
    <section className="bg-white py-section" aria-labelledby="location-map-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>{locationPage.map.label}</SectionLabel>
            <h2 id="location-map-heading" className="display-l mt-5 text-navy">
              {locationPage.map.heading}
            </h2>

            {/* The two facts, on the same 28x3 amber bar the section labels
                and the /about stats use. Set at body rather than display —
                these are captions to the map, not figures the page is
                arguing from. */}
            <dl className="mt-8 flex flex-col gap-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <span
                    aria-hidden="true"
                    className="block h-hairline w-label-bar bg-amber"
                  />
                  <dt className="meta mt-4 text-steel">{fact.label}</dt>
                  <dd className="display-s mt-2 text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal as="div" className="flex flex-col lg:col-span-8" delay={0.08}>
            {/* 384px, matching the hub map's plate rather than the quote
                form's 320px, and `grow` lets it take the rest of the column
                when the grid stretches this cell to the height of the
                heading beside it. Same 2px navy plate both of those sit in;
                the system carries no radius and no shadow, so a bordered
                plate is what a framed thing looks like here. */}
            <div className="h-96 grow border-2 border-navy bg-fog">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
                <iframe
                  title={`Map of ${location.name}, ${business.region} — one of the communities ${business.name} works in`}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(detail.mapQuery)}&zoom=${detail.mapZoom}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block size-full border-0"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <p className="meta text-steel">{location.name}</p>
                </div>
              )}
            </div>
            <p className="meta mt-4 text-steel">{detail.mapCaption}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
