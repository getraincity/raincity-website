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
 * Geometry is deliberately identical to the homepage teaser: the same
 * `ServiceCard` in the same 3:2 landscape crop, the same `sm:grid-cols-4
 * lg:grid-cols-6` half-column grid, the same `gap-x-gap-x`/`gap-y-gap-y`
 * gutters, the same `lg:max-w-cards` track, and the same centred heading
 * block on `max-w-heading`. The two grids previously diverged — this one ran
 * the portrait crop at full site width under a left-set heading — and that
 * drift is the thing being removed: a reader arriving from the teaser's
 * "Explore Our Services" button should land on the same furniture, not on a
 * second grid that has to be re-read.
 *
 * What stays distinct from `components/home/Services.tsx`, and why this is not
 * simply an import of it:
 *
 *  1. The heading copy comes from `servicesPage.catalogue` and carries a line
 *     of body text under it. The teaser's heading is hardcoded homepage copy.
 *  2. There is no closing CTA. The teaser's button leads here, and repeating
 *     it on the page it points at would be a link to the top of the screen.
 *
 * The card itself is not duplicated — `ServiceCard` and `shortRowOffsets` are
 * one implementation shared by both callers, so the parts that can drift
 * cannot.
 *
 * Fog, matching the teaser's ground.
 */

const offsetClasses = shortRowOffsets(services.length);

export function ServicesCatalogue() {
  return (
    <section className="bg-fog py-section" aria-labelledby="catalogue-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Centred on max-w-heading, matching the teaser. The clamp lets the
            line break move with the viewport instead of holding a fixed
            measure; the body line under it centres on the same track. */}
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">
            {servicesPage.catalogue.label}
          </SectionLabel>
          <h2 id="catalogue-heading" className="display-l mt-5 text-navy">
            {servicesPage.catalogue.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{servicesPage.catalogue.body}</p>
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
