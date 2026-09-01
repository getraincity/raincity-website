import { business } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Hero — signature use #1 of the Squeegee Edge.
 *
 * The photograph runs full bleed and full length at every breakpoint; nothing
 * boxes it into a column. Legibility comes from layered scrims rather than a
 * solid plate, and the 12 degree cut survives as a density step inside those
 * scrims — the Pacific hairline still draws the actual line, so the signature
 * reads without an opaque navy block sitting on top of the picture.
 */
export function Hero() {
  return (
    <section className="on-navy relative isolate flex min-h-hero flex-col justify-end overflow-hidden bg-navy">
      {/* Photograph */}
      <div className="absolute inset-0 -z-20">
        <Photo name="hero" fill priority sizes="100vw" />
      </div>

      {/* Base scrim. Bottom-up on phones, where the type stacks over the photo;
          left-to-right from lg, where it sits in the first half and the right
          side is left clear for the subject. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/65 to-navy/15 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/70 lg:to-navy/5"
      />

      {/* The cut. Hairline first, the gradient wedge laid 3px over it. */}
      <div
        aria-hidden="true"
        className="squeegee-box absolute inset-y-0 left-0 -z-10 hidden w-3/5 lg:block"
      >
        <div className="squeegee-box squeegee-cut-r absolute inset-0 translate-x-hairline bg-pacific/80" />
        <div className="squeegee-box squeegee-cut-r absolute inset-0 bg-linear-to-r from-navy/80 via-navy/60 to-navy/25" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-site px-edge pt-28 pb-14 sm:pt-32 lg:py-24">
        <div className="max-w-prose lg:w-1/2 lg:max-w-none">
          {/* One-time entrance on load, 90ms apart. The headline carries no
              delay of its own: it is the LCP element, so it starts moving on
              the first frame after hydration rather than waiting its turn. */}
          <RevealOnLoad as="h1" className="display-xl text-white">
            Year-Round Property Maintenance
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.09}>
            RainCity Property Maintenance provides reliable, year-round exterior
            cleaning and property care for homes, stratas, and businesses in{" "}
            {business.base} and across {business.region}.
          </RevealOnLoad>

          <RevealOnLoad className="mt-7 flex flex-wrap gap-4" delay={0.18}>
            <Button href="#quote">Get a Free Quote</Button>
            <Button href={business.phoneHref} variant="tertiary-invert">
              Call Us Now
            </Button>
          </RevealOnLoad>
        </div>
      </div>

      {/* Standing information, not invented statistics. */}
      <div className="relative border-t border-t-pacific/30 bg-fog">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-edge py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta text-navy">
            Serving {business.base} &amp; {business.region}
          </p>
          {/* Steel, not muted: muted is a support tone for navy grounds and
              drops to ~2:1 on Fog. Steel holds the same second-rank weight
              and clears AA. */}
          <p className="meta text-steel">
            {business.hours.weekdays} · {business.hours.sunday}
          </p>
        </div>
      </div>
    </section>
  );
}
