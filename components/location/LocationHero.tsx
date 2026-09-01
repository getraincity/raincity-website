import Link from "next/link";
import { business, locationPage, type Location } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Community page banner.
 *
 * The system banner, unchanged in its grammar from /about, /services,
 * /locations and the service template: full-bleed photograph, the shared
 * navy scrim, breadcrumb, h1, one paragraph, the quote/call pair. This is
 * the fifth route at this level and it should not invent a sixth version of
 * the same block. Two CTAs rather than one, matching the service template —
 * a page a reader arrived at from a search for their own city is a page
 * where the phone is a live option.
 *
 * The heading is the community name and nothing else, exactly as
 * `ServiceHero` prints the bare service name. `detail.heading` — "The Wet End
 * Of The Valley", "Six Town Centres And A Lot Of Asphalt" — is the local
 * block's h2 further down the page and is deliberately not spent here: at
 * display-xl over a photograph the thing a reader is checking is that they
 * landed on the right city, and the sell is the paragraph's job.
 *
 * The breadcrumb carries the middle rung /about and /services do not need:
 * Home / Locations / [community], mirroring the BreadcrumbList this page
 * publishes so the trail a crawler is told about is the one a reader can see.
 *
 * The photograph is the community's own registry entry — the same frame its
 * card on /locations uses, which is what makes the click from that grid land
 * somewhere recognisable. None of the nine was taken in the city it sits
 * under and no alt text claims otherwise; see the photography note on
 * `locations` in content.ts.
 *
 * LCP element for the route, hence `priority`.
 */
export function LocationHero({ location }: { location: Location }) {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="location-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name={location.photo} fill priority sizes="100vw" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, which keeps the right of the
          photograph clear of copy. Identical to every other banner. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/65 to-navy/15 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/75 lg:to-navy/25"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-section">
        <RevealOnLoad>
          <nav aria-label="Breadcrumb">
            <ol className="meta flex flex-wrap items-center gap-2 text-fog">
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
              <li>
                <Link
                  href="/locations"
                  className="transition-colors duration-200 hover:text-amber"
                >
                  {locationPage.hero.crumb}
                </Link>
              </li>
              <li aria-hidden="true" className="text-pacific">
                /
              </li>
              <li aria-current="page" className="text-white">
                {location.name}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="location-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {location.name}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {location.detail.intro}
          </RevealOnLoad>

          <RevealOnLoad
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            delay={0.22}
          >
            <Button href="#quote">{locationPage.hero.quoteCta}</Button>
            <Button href={business.phoneHref} variant="tertiary-invert">
              <Phone />
              {locationPage.hero.callCta}
            </Button>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
