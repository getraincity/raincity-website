import Link from "next/link";
import type { Service } from "@/lib/content";
import type { PhotoRatio } from "@/lib/photos";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { ArrowRight } from "@/components/ui/Icon";
import { StaggerItem } from "@/components/ui/Motion";

/**
 * The service card, per the design system: 1px line border, a photograph with
 * a blue corner notch cut out of it, 20px pad, display-s title, body-s blurb
 * and a `VIEW SERVICE →` row in RainCity Blue. Border moves to blue on hover
 * and focus.
 *
 * One component, two callers: the homepage teaser grid and the /services
 * catalogue. They differ only in how tall the photograph is cut and what the
 * browser should be told about its rendered width — everything the card is
 * made of is spec, and spec belongs in one file.
 *
 * Renders as a `StaggerItem` list item, so both callers get the grid's
 * one-after-another entry from the `Stagger` they wrap it in.
 */
export function ServiceCard({
  service,
  ratio = "3:2",
  sizes,
  className,
}: {
  service: Service;
  /** Photo crop. The teaser runs landscape; the catalogue runs portrait. */
  ratio?: PhotoRatio;
  sizes: string;
  className?: string;
}) {
  return (
    <StaggerItem as="li" className={cn("sm:col-span-2", className)}>
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col border border-line bg-white transition-colors duration-200 hover:border-rc-blue focus-visible:border-rc-blue"
      >
        {/* The notch is cut out of the photo; RainCity Blue sits behind it. */}
        <div className="relative bg-rc-blue">
          <Photo
            name={service.photo}
            ratio={ratio}
            sizes={sizes}
            className="card-corner-cut"
          />

          {/* Brand wash. Eleven photographs from different sources, lighting
              and seasons; a thin RainCity Blue tint pulls them into one family
              without dimming any of them. It lifts on hover, so the card
              answers the pointer by getting clearer rather than darker. */}
          <div
            aria-hidden="true"
            className="card-corner-cut pointer-events-none absolute inset-0 bg-rc-blue/15 transition-colors duration-300 ease-out group-hover:bg-rc-blue/5"
          />
        </div>

        <div className="flex flex-1 flex-col p-card">
          <h3 className="display-s text-navy">{service.title}</h3>
          <p className="body-s mt-2 flex-1 text-steel">{service.blurb}</p>

          <span className="meta mt-4 inline-flex items-center gap-2 text-rc-blue transition-colors group-hover:text-navy">
            View Service
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </StaggerItem>
  );
}
