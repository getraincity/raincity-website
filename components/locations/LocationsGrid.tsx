import { locations, locationsPage } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LocationCard } from "@/components/ui/LocationCard";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * One card per community, from the `locations` array in content.ts.
 *
 * Geometry is deliberately identical to the homepage teaser and the /services
 * catalogue: the same 3:2 landscape crop, the same `sm:grid-cols-4
 * lg:grid-cols-6` half-column grid with every card spanning two, the same
 * `gap-x-gap-x`/`gap-y-gap-y` gutters, the same `lg:max-w-cards` track and
 * the same centred heading block on `max-w-heading`. Three card grids on one
 * site should be one piece of furniture, not three.
 *
 * `shortRowOffsets` is the same arithmetic those two use, and it earns its
 * place here for the tablet row rather than the desktop one: nine divides
 * cleanly into three columns, so the desktop grid has no short row at all,
 * but the two-up layout at `sm` strands the ninth card and it gets centred.
 * Add or drop a community and both rows re-centre with nothing to edit.
 *
 * White, against the Fog the coverage map sits on above it.
 */

const offsetClasses = shortRowOffsets(locations.length);

export function LocationsGrid() {
  return (
    <section className="bg-white py-section" aria-labelledby="communities-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">
            {locationsPage.grid.label}
          </SectionLabel>
          <h2 id="communities-heading" className="display-l mt-5 text-navy">
            {locationsPage.grid.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{locationsPage.grid.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block mx-auto grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:max-w-cards lg:grid-cols-6"
        >
          {locations.map((location, i) => (
            <LocationCard
              key={location.slug}
              location={location}
              ratio="3:2"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={offsetClasses(i)}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
