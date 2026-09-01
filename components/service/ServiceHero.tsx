import Link from "next/link";
import { business, servicePage, type Service } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Service page banner.
 *
 * The same component grammar as the /about and /services banners: a
 * full-bleed photograph, the shared navy scrim, breadcrumb, heading,
 * paragraph, CTAs. A page banner is a system component, and three routes at
 * this level of the site should not each invent one. This version carries two
 * CTAs where those carry one, which is what the service inventory asks for.
 *
 * The heading is the service name and nothing else. `detail.heading` — the
 * longer marketing line, "Windows Worth Looking Through" and its ten
 * counterparts — is deliberately not printed here: at display-xl over a
 * photograph the short noun phrase is the thing a reader is checking they
 * landed on, and the sell is the paragraph's job. The field is left in
 * content.ts rather than deleted; it is real approved copy and the decision
 * not to show it is this component's, not the content's.
 *
 * `focal` is set per service rather than read from the registry. The registry
 * value frames each photo for the card's 4:5 portrait crop; this band is much
 * wider and shorter, and the two want different vertical anchors. See the
 * table below.
 */

/**
 * object-position for the banner crop, by service.
 *
 * A wide band takes a horizontal slice of a landscape source, so the vertical
 * figure is the one that matters — it decides which slice. Anything not named
 * here falls through to the registry focal, which is the correct default for
 * a frame whose subject is already centred.
 */
const heroFocal: Record<string, string> = {
  // Cleaner and pane sit right of centre; the band would otherwise crop to
  // the empty bay on the left.
  "window-cleaning": "62% 42%",
};

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="service-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo
          name={service.photo}
          fill
          priority
          focal={heroFocal[service.slug]}
          sizes="100vw"
        />
      </div>

      {/* The scrim /about and /services use, unchanged. Bottom-up on phones,
          where the type sits over the middle of the frame; left-to-right from
          lg, which keeps the right of the photograph clear of copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/65 to-navy/15 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/75 lg:to-navy/25"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-section">
        {/* Breadcrumb. Mirrors the BreadcrumbList in the page's JSON-LD, so
            the trail a crawler is told about is the one a reader can see. */}
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
                  href="/services"
                  className="transition-colors duration-200 hover:text-amber"
                >
                  {servicePage.hero.crumb}
                </Link>
              </li>
              <li aria-hidden="true" className="text-pacific">
                /
              </li>
              <li aria-current="page" className="text-white">
                {service.title}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="service-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {service.title}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {service.detail.intro}
          </RevealOnLoad>

          <RevealOnLoad
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            delay={0.22}
          >
            <Button href="#quote">{servicePage.hero.quoteCta}</Button>
            <Button href={business.phoneHref} variant="tertiary-invert">
              <Phone />
              {servicePage.hero.callCta}
            </Button>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
