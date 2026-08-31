import Link from "next/link";
import type { Location } from "@/lib/content";
import { locationsPage } from "@/lib/content";
import type { PhotoRatio } from "@/lib/photos";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { ArrowRight } from "@/components/ui/Icon";
import { StaggerItem } from "@/components/ui/Motion";

/**
 * The location card. Deliberately the same furniture as `ServiceCard` — 1px
 * line border, the photograph with the blue corner notch cut out of it, the
 * brand wash that lifts on hover, 20px pad, display-s title, body-s blurb and
 * a meta CTA row in RainCity Blue that moves to navy — because a reader
 * arriving from the services grid should not have to re-read a second kind of
 * card, and because the notch is one of the four things this design system
 * spends its character on.
 *
 * A sibling rather than a prop on `ServiceCard`, and that is a considered
 * choice. Making one component take `Service | Location` would mean a union
 * type, two branches for the href, two for the CTA label and a card that has
 * to be read twice to know what it renders. Two flat files that happen to
 * share a class list are the more boring, more durable arrangement, which is
 * what this codebase is for. The consequence is real and worth stating: a
 * change to the card treatment has to be made in both. The design system's
 * card spec is in `raincity-tokens.md`, both files implement it, and neither
 * is the source of truth for it.
 *
 * The CTA names the community — "View Services in Burnaby" — where the
 * service card just says "View Service". Nine cards that all read the same
 * would give a screen-reader user nine identical links, and the city is the
 * only thing that distinguishes them.
 *
 * Every one of these links 404ed until `/locations/[slug]` landed — the same
 * state /services was in before its own template shipped. They resolve now,
 * and the two refusals that went with them were lifted in the same commit:
 * the nine sitemap entries and the `url` on each ItemList item in
 * `locationsPageSchema`. See the notes in app/sitemap.ts and lib/seo.tsx.
 */
export function LocationCard({
  location,
  ratio = "3:2",
  sizes,
  className,
}: {
  location: Location;
  /** Photo crop. The grid runs the same 3:2 landscape cut as the services. */
  ratio?: PhotoRatio;
  sizes: string;
  className?: string;
}) {
  return (
    <StaggerItem as="li" className={cn("sm:col-span-2", className)}>
      <Link
        href={`/locations/${location.slug}`}
        className="group flex h-full flex-col border border-line bg-white transition-colors duration-200 hover:border-rc-blue focus-visible:border-rc-blue"
      >
        {/* The notch is cut out of the photo; RainCity Blue sits behind it. */}
        <div className="relative bg-rc-blue">
          <Photo
            name={location.photo}
            ratio={ratio}
            sizes={sizes}
            className="card-corner-cut"
          />

          {/* Brand wash. Nine frames shot in different weather and light; a
              thin RainCity Blue tint pulls them into one family without
              dimming any of them. It lifts on hover, so the card answers the
              pointer by getting clearer rather than darker. */}
          <div
            aria-hidden="true"
            className="card-corner-cut pointer-events-none absolute inset-0 bg-rc-blue/15 transition-colors duration-300 ease-out group-hover:bg-rc-blue/5"
          />
        </div>

        <div className="flex flex-1 flex-col p-card">
          <h3 className="display-s text-navy">{location.name}</h3>
          <p className="body-s mt-2 flex-1 text-steel">{location.blurb}</p>

          <span className="meta mt-4 inline-flex items-center gap-2 text-rc-blue transition-colors group-hover:text-navy">
            {locationsPage.grid.cardCta} {location.name}
            <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </StaggerItem>
  );
}
