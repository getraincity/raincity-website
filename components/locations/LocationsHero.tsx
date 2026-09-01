import Link from "next/link";
import { locationsPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Page banner.
 *
 * The same component grammar as the /about and /services banners — full-bleed
 * photograph, navy scrim, breadcrumb, heading, paragraph, one CTA. A page
 * banner is a system component and the fourth route at this level of the site
 * should not invent a fifth version of it. What differs is the photograph.
 *
 * `rooftops` rather than a job frame, and it is the one choice here worth
 * explaining. Every other banner on the site opens on the work — a technician
 * on a roofline, a crew on a ladder. This page's subject is not the work, it
 * is the place: residential rooftops running back into evergreens under the
 * overcast that creates the work in the first place. It is the only frame in
 * the registry that is about Greater Vancouver rather than about a service,
 * which is exactly what a service-area page should open on. It has sat unused
 * as `ServiceClosing`'s fallback since that component was written; this is
 * its first appearance on a page.
 *
 * LCP element for this route, hence `priority`.
 */
export function LocationsHero() {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="locations-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="rooftops" fill priority sizes="100vw" focal="50% 55%" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, which keeps the right of the roofline
          clear of copy. Identical to /about and /services. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/65 to-navy/15 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/75 lg:to-navy/25"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-section">
        {/* Breadcrumb. Mirrors the BreadcrumbList in the page's JSON-LD, so
            the trail a crawler is told about is the one a reader can see. */}
        <RevealOnLoad>
          <nav aria-label="Breadcrumb">
            <ol className="meta flex items-center gap-2 text-fog">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-amber"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-pacific">
                /
              </li>
              <li aria-current="page" className="text-white">
                {locationsPage.hero.crumb}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="locations-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {locationsPage.hero.heading}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {locationsPage.hero.body}
          </RevealOnLoad>

          <RevealOnLoad className="mt-8" delay={0.22}>
            <Button href="#quote">{locationsPage.hero.cta}</Button>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
