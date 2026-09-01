import Link from "next/link";
import { aboutPage, business } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Page banner.
 *
 * Deliberately not a second homepage hero. The homepage hero is a stage: it
 * runs to a named minimum height, carries the 12 degree cut as a lit wedge,
 * and closes on a standing-information strip. This is a header — the photo
 * band is sized by its own padding, the cut is not repeated (the system
 * allows it in exactly four places and this is not one of them), and the
 * whole thing is roughly half the height. What it borrows is the part that
 * has to match: the same scrim grammar and the same load-in.
 *
 * The photograph is a Greater Vancouver home among evergreens, cropped to a
 * landscape band. It is the LCP element for this route, hence `priority`.
 */
export function AboutHero() {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="about-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="aboutHero" fill priority sizes="100vw" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, which keeps the right of the roofline
          clear of copy. */}
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
                {aboutPage.hero.crumb}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="about-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {aboutPage.hero.heading}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {aboutPage.hero.body}
          </RevealOnLoad>

          <RevealOnLoad
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            delay={0.22}
          >
            <Button href="#quote">{aboutPage.hero.cta}</Button>
            <Button href={business.phoneHref} variant="tertiary-invert">
              <Phone />
              Call Us Now
            </Button>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
