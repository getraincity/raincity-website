import Link from "next/link";
import { aboutPage, servicesPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Page banner.
 *
 * The same component grammar as the /about banner — full-bleed photograph, a
 * navy scrim, breadcrumb, heading, paragraph, one CTA — because a page banner
 * is a system component and two routes at the same level of the site should
 * not each invent one. What differs is the photograph and the tenure figure
 * set against the CTA, which the services inventory asks for and /about does
 * not carry in its banner.
 *
 * The figure is read from `aboutPage.stats`, not restated here. It is the
 * client's own unverified claim (see the comment block on `aboutPage` in
 * content.ts); printing it in two files would mean correcting it in two
 * files, and this is precisely the number most likely to need correcting. It
 * stays out of the page's structured data for the same reason /about keeps it
 * out of theirs.
 *
 * `servicesHero` rather than a crew shot: this page is a catalogue of work
 * done to buildings, and the frame is a technician mid-job on a Greater
 * Vancouver roofline. It is the LCP element here, hence `priority`.
 */
export function ServicesHero() {
  const tenure = aboutPage.stats[0];

  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="services-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="servicesHero" fill priority sizes="100vw" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, which keeps the right of the roofline
          clear of copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/85 to-navy/45 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/75 lg:to-navy/25"
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
                {servicesPage.hero.crumb}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-gap-x">
          <div className="max-w-prose lg:col-span-7 lg:max-w-none">
            <RevealOnLoad
              as="h1"
              id="services-hero-heading"
              className="display-xl text-white"
              delay={0.06}
            >
              {servicesPage.hero.heading}
            </RevealOnLoad>

            <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
              {servicesPage.hero.body}
            </RevealOnLoad>

            <RevealOnLoad className="mt-8" delay={0.22}>
              <Button href="#quote">{servicesPage.hero.cta}</Button>
            </RevealOnLoad>
          </div>

          {/* The tenure figure. Type against an amber rule rather than a
              plate or a badge — the banner already has a photograph, a scrim
              and a solid amber button in it, and a fourth object competing
              for the same corner is what makes a hero look assembled. */}
          <RevealOnLoad
            className="border-l-3 border-l-amber pl-5 lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-2"
            delay={0.3}
          >
            <p className="display-l text-white">{tenure.value}</p>
            <p className="meta mt-2 text-fog">{tenure.label}</p>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
