import { relatedServices, servicePage, type Service } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * Two or three services that get booked alongside this one.
 *
 * The second half of closing the link graph. `ServiceAreas` above sends this
 * page out to the nine communities; this sends it sideways to the services a
 * reader on this page is most likely to want next, which until now was a
 * journey through the header dropdown — and the header dropdown is client
 * state, so it was not a journey a crawler could take at all.
 *
 * The pairs are written, in `relatedBySlug` in content.ts, not derived from
 * the order of the `services` array. The adjacency that matters here is
 * physical: the roof being cleared means the ladder is already at the gutter,
 * the driveway being washed is the step before it can be sealed, paint goes
 * on a surface that has just been soft-washed. That is what makes the section
 * worth a reader's time rather than a related-posts widget.
 *
 * `ServiceCard` at the site's own card geometry, unmodified — the same 3:2
 * crop and the same half-column grid the homepage teaser, the /services
 * catalogue, the /locations grid and `LocationServices` all run. Five card
 * grids on one site should be one piece of furniture.
 *
 * Fog, between the white `ServiceAreas` above and the amber edge below, which
 * puts the service template into the same white → fog → edge → navy close
 * that the community template already runs.
 *
 * Returns nothing for a service with no pairs written. Nothing takes that
 * path today — all eleven carry two or three — and the guard is what keeps a
 * twelfth from shipping an empty band with a heading over it.
 */
export function RelatedServices({ service }: { service: Service }) {
  const related = relatedServices(service);
  if (related.length === 0) return null;

  // Two or three cards is a short row at every breakpoint this grid has, and
  // every other grid on this site centres a short row rather than letting it
  // hang left. Called per render because the count changes service to
  // service; it is three array reads.
  const offsetClasses = shortRowOffsets(related.length);

  return (
    <section className="bg-fog py-section" aria-labelledby="related-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{servicePage.related.label}</SectionLabel>
          <h2 id="related-heading" className="display-l mt-5 text-navy">
            {servicePage.related.heading}
          </h2>
          <p className="body-l mt-6 text-steel">{servicePage.related.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block mx-auto grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-4 lg:max-w-cards lg:grid-cols-6"
        >
          {related.map((item, i) => (
            <ServiceCard
              key={item.slug}
              service={item}
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
