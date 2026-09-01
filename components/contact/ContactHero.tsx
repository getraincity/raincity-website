import Link from "next/link";
import { contactPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Page banner. Same grammar as /about and /services: full-bleed photograph,
 * navy scrim, breadcrumb, heading, paragraph, one CTA. See the note on
 * `AboutHero` for why a page banner is not a second homepage hero.
 *
 * The photograph is the frame flagged as an alternate for the homepage hero
 * in `lib/photos.ts` — lighter and foggier than the frame actually used
 * there, so the two do not read as the same photo bookending the site. It is
 * the LCP element for this route, hence `priority`.
 */
export function ContactHero() {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="contact-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="contactHero" fill priority sizes="100vw" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, which keeps the houses on the right
          of the frame clear of copy. */}
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
                {contactPage.hero.crumb}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="contact-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {contactPage.hero.heading}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {contactPage.hero.body}
          </RevealOnLoad>

          <RevealOnLoad className="mt-8" delay={0.22}>
            <Button href="#quote">{contactPage.hero.cta}</Button>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
