import Link from "next/link";
import type { LegalPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Page banner for the four policy pages. Same grammar as /about, /services and
 * /contact — full-bleed photograph, navy scrim, breadcrumb, heading, one line
 * of support copy. See the note on `AboutHero` for why a page banner is not a
 * second homepage hero.
 *
 * Two differences from the other three banners, both deliberate:
 *
 *  1. No CTA. Every other banner closes on "Get A Quote", because every other
 *     page exists to lead somewhere. A policy page exists to be read, and a
 *     quote button under the H1 of a refund policy is the site asking for a
 *     sale in the middle of answering a question about one. The ask is at the
 *     bottom of the page instead, once the reader has what they came for.
 *  2. One photograph across all four routes — `rooftops`, the overcast
 *     Greater Vancouver roofline the service template already falls back to
 *     for the same reason: it is equally true of every page that uses it, and
 *     it says nothing a policy page would have to live up to. Four separate
 *     frames here would be four decisions about what a refund policy looks
 *     like, which is not a question photography can answer.
 *
 * It is the LCP element for these routes, hence `priority`.
 */
export function LegalHero({ page }: { page: LegalPage }) {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="legal-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="rooftops" fill priority sizes="100vw" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, matching the other three banners. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/85 to-navy/45 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/75 lg:to-navy/25"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-section-sm">
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
                {page.crumb}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="legal-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {page.heading}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {page.intro}
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
