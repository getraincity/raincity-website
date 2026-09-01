import Link from "next/link";
import { blogPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Page banner.
 *
 * The same component grammar as the /about, /services, /contact and
 * /locations banners — full-bleed photograph, navy scrim, breadcrumb,
 * heading, one line of body copy, one CTA. A page banner is a system
 * component and the fifth route at this level should not invent a sixth
 * version of it. What differs is the photograph and the paragraph.
 *
 * `truck` for the frame, and it is the one choice here worth explaining. It
 * was the only real photograph in the registry with no slot on any page: a
 * van at the kerb, which is what a mobile crew looks like when it is not up a
 * ladder. That suits a blog better than another frame of the work does —
 * these are notes from the people who drive out, not a service the page is
 * selling — and it means /blog does not open on a photograph a reader has
 * already seen on another route.
 *
 * It is a stand-in twice over. The registry note says so: it is stock
 * standing in for the branded truck, and its source is squarer and smaller
 * than the other banner frames, so it is held slightly high here to keep the
 * van and the building line in a much wider crop. Replace it with the fleet
 * shot when the wrap lands, or with a frame shot for this page.
 *
 * LCP element for this route, hence `priority`.
 */
export function BlogHero() {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="blog-hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        {/* `truck` was a stock van that didn't match the blog's Pacific
            Northwest voice and used a source squarer than the banner crop.
            Replaced with `hero` (the evergreen-and-fog residential frame)
            until the branded fleet photo exists — see the registry note for
            the truck slot. Update this once the wrap is shot. */}
        <Photo name="hero" fill priority sizes="100vw" focal="70% 55%" />
      </div>

      {/* Bottom-up on phones, where the type sits over the middle of the
          frame; left-to-right from lg, which keeps the right of the frame
          clear of copy. Identical to the other four banners. */}
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
                {blogPage.hero.crumb}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-6 max-w-prose lg:w-7/12 lg:max-w-none">
          <RevealOnLoad
            as="h1"
            id="blog-hero-heading"
            className="display-xl text-white"
            delay={0.06}
          >
            {blogPage.hero.heading}
          </RevealOnLoad>

          <RevealOnLoad as="p" className="body-l mt-5 text-fog" delay={0.14}>
            {blogPage.hero.body}
          </RevealOnLoad>

          <RevealOnLoad className="mt-8" delay={0.22}>
            <Button href="#quote">{blogPage.hero.cta}</Button>
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
