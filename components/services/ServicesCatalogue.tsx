import { services, servicesPage } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * The catalogue — every service, from the `services` array in content.ts.
 *
 * Nothing here is a list of its own. Add a service to that array and it
 * appears in this grid, in the nav dropdown, in the homepage teaser and in
 * the page's ItemList markup, and the short last row re-centres itself.
 *
 * Three differences from the homepage teaser, and they are the reason the
 * page is worth arriving at:
 *
 *  1. The photographs run in the registry's own 4:5 portrait crop rather than
 *     the teaser's landscape cut. The service frames were chosen for that
 *     ratio; at full height the crew, the lance and the ladder are legible
 *     instead of being a band of colour above a title.
 *  2. The grid runs to the full site width. `max-w-cards` exists so a teaser
 *     grid does not swell at 1440; a catalogue is allowed to.
 *  3. The heading block is set left with a line of copy under it, where the
 *     teaser's is centred and bare. There is no closing CTA either — the
 *     teaser's "Explore Our Services" button leads here, and repeating it on
 *     the page it points at would be a link to the top of the screen.
 *
 * Fog, matching the teaser's ground. The catalogue is the same furniture at a
 * different scale, and putting it on a different surface would have argued it
 * was a different kind of thing.
 */

const offsetClasses = shortRowOffsets(services.length);

export function ServicesCatalogue() {
  return (
    <section className="bg-fog py-section" aria-labelledby="catalogue-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{servicesPage.catalogue.label}</SectionLabel>
          <h2 id="catalogue-heading" className="display-l mt-5 text-navy">
            {servicesPage.catalogue.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{servicesPage.catalogue.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:grid-cols-6"
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              ratio="4:5"
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 90vw"
              className={offsetClasses(i)}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
