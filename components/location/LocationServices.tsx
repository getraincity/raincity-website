import { locationPage, services, type Location } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * The full catalogue, on a community page.
 *
 * This section is the only place on the site where the services half and the
 * locations half are joined. /services names no community and /locations
 * names no service; a reader who arrives from a search for "gutter cleaning
 * Surrey" lands here and has, until now, had nowhere on the page to go next.
 * Eleven links to eleven service pages is that route, and it is worth the
 * vertical space it takes.
 *
 * All eleven, not a selection. Every service is offered in every community —
 * that is what `areaServed` asserts in the structured data on every service
 * page — so showing six here would quietly imply the other five stop at some
 * boundary. The grid is generated from `services`, so a twelfth arrives on
 * all nine community pages the day it is added to that array.
 *
 * `ServiceCard` at the site's own card geometry, deliberately unmodified: the
 * same 3:2 crop, the same `sm:grid-cols-4 lg:grid-cols-6` half-column grid
 * with every card spanning two, the same gutters and the same `lg:max-w-cards`
 * track the homepage teaser, the /services catalogue and the /locations grid
 * all run. Four card grids on one site should be one piece of furniture. A
 * denser four-up variant was the alternative and was not worth a second
 * geometry and a second short-row calculation for the sake of one row's
 * height.
 *
 * `shortRowOffsets` is the same arithmetic those three use. Eleven services
 * strand two cards in the final three-up row and one in the final two-up row,
 * and both get centred rather than left hanging.
 *
 * Fog, matching the homepage teaser and the /services catalogue — the two
 * other places this exact grid appears — and sitting between the white local
 * brief above and the white map band below.
 */

const offsetClasses = shortRowOffsets(services.length);

export function LocationServices({ location }: { location: Location }) {
  return (
    <section
      className="bg-fog py-section"
      aria-labelledby="location-services-heading"
    >
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">
            {locationPage.services.label}
          </SectionLabel>
          <h2
            id="location-services-heading"
            className="display-l mt-5 text-navy"
          >
            {locationPage.services.headingBefore}
            {location.name}
          </h2>
          <p className="body-l mt-6 text-steel">
            {locationPage.services.body}
          </p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block mx-auto grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:max-w-cards lg:grid-cols-6"
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
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
