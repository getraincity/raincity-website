import { pillars } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Why Choose RainCity — the three points set over one wide photograph.
 *
 * Section 5 above is type on white with no image; this one is the inverse, so
 * the two trust sections read as different in kind rather than as a repeat.
 * A navy hold sits over the photo to hold contrast for the white type.
 */
export function Pillars() {
  return (
    <section className="on-navy relative isolate" aria-labelledby="pillars-heading">
      <div className="absolute inset-0 -z-10">
        <Photo name="rooftops" fill sizes="100vw" />
        <div className="absolute inset-0 bg-navy/85" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-site px-edge py-section">
        <Reveal className="max-w-prose">
          <SectionLabel tone="dark">{pillars.label}</SectionLabel>
          <h2 id="pillars-heading" className="display-l mt-5 text-white">
            {pillars.headline}
          </h2>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
          {pillars.points.map((point, i) => (
            <StaggerItem
              as="li"
              key={point.title}
              className={
                i === 0
                  ? "md:pr-8"
                  : "border-t border-t-pacific/40 pt-8 md:border-t-0 md:border-l-3 md:border-l-amber md:pt-0 md:pl-8"
              }
            >
              <h3 className="display-s text-white">{point.title}</h3>
              <p className="body-s mt-3 text-fog">{point.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12">
          <Button href="#quote">{pillars.cta}</Button>
        </Reveal>
      </div>
    </section>
  );
}
