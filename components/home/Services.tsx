import { services } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal, Stagger } from "@/components/ui/Motion";

/**
 * Services — a uniform three-up grid, centred, so the card has to carry the
 * character rather than the layout. It does that through the notched corner
 * revealing RainCity Blue, the photograph, and a border that moves to blue on
 * hover and focus. No icons, no numbering: the order carries no meaning.
 *
 * This is the teaser, not the catalogue. It runs the landscape crop and pulls
 * the grid in to `max-w-cards` — cards at the full site width would be
 * enormous, and narrowing the track keeps the card a card while giving the
 * section symmetrical margins. The `/services` catalogue runs the identical
 * geometry, so a reader following the button below lands on the same
 * furniture; change the crop or the track here and change it there too.
 *
 * The short last row is centred rather than left hanging; the arithmetic lives
 * in `lib/cardGrid.ts`, shared with that catalogue. See the comment block
 * there for how the halved columns produce the offset.
 */

const offsetClasses = shortRowOffsets(services.length);

export function Services() {
  return (
    <section className="bg-fog py-section" aria-labelledby="services-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Heading block. max-w-heading is a clamp, so the two-line break at
            desktop narrows with the viewport instead of holding a fixed
            measure and stranding a single word on line two. */}
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel className="justify-center">Our Services</SectionLabel>
          <h2 id="services-heading" className="display-l mt-5 text-navy">
            Our Professional Property Maintenance Services
          </h2>
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

        <Reveal className="mt-block flex justify-center">
          <Button href="/services" variant="secondary" className="group">
            Explore Our Services
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
