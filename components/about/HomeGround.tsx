import { aboutPage, business, locations } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * Home Ground — where the company is based, and what that changes.
 *
 * BUILT TO THE WHO WE ARE TEMPLATE, at the client's instruction (2026-09-13):
 * "do it exactly like that — same size of heading, same number of characters
 * of content, same image size, image overlay." So this is `WhoWeAre.tsx`
 * line for line — copy in six columns on the left, a 1:1 photograph in five
 * on the right with the navy-scrim caption, a secondary button under the
 * copy — and the copy in `aboutPage.local` is held to the template's lengths.
 * Keep the two components in step: a change to one is a change to both.
 *
 * Earlier versions (Mist with tinted fact cards; a display-xl heading row
 * over a stretched photo; a 16:9 photo over a fact list) are recorded in git.
 * The client rejected all three.
 *
 * Deliberate differences from the template:
 *
 *  1. FOG, NOT WHITE. Process above and QuoteForm below are both White; a
 *     third White band in a row would erase the section boundary entirely.
 *  2. THE BUTTON GOES TO /locations, not /services: this section is about the
 *     service area, and that is the page that lists it.
 *  3. "OUR HOME" SITS UNDER AN AMBER HIGHLIGHTER, at the client's request —
 *     see the note at the `<mark>`.
 *
 * THE PHOTOGRAPH IS NEW WESTMINSTER — Westminster Pier Park, the SkyBridge and
 * the Pattullo arch — chosen so the section reads as this city at a glance.
 * Its `note` in photos.ts records the source, licence and how it was verified.
 *
 * Still no map (QuoteForm directly below embeds one), no navy band (Mission
 * holds the page's only one), and no `SectionEdge` (the cut is spent).
 */
export function HomeGround() {
  const { local } = aboutPage;

  return (
    <section className="bg-fog py-section" aria-labelledby="home-ground-heading">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-edge lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-6">
          <SectionLabel>{local.label}</SectionLabel>

          <h2 id="home-ground-heading" className="display-l mt-5 text-navy">
            {local.heading}{" "}
            {/* The highlighter, at the client's request. Hi-Vis Amber is the
                CTA colour and this is its second decorative use on the site
                (the Why Choose Us row wash is the first) — deliberate, and
                kept to two words. A solid band rather than a gradient stroke:
                the token sheet rules out gradients as decoration, and navy on
                amber measures 8.9:1. `box-decoration-clone` repeats the
                padding on each line if the phrase ever wraps. */}
            {/* Amber at 35%, not solid: the client found full Hi-Vis Amber too
                loud for a heading and asked for a lighter, softer highlighter.
                A tint of the token rather than a new colour — the same move
                the Why Choose Us row wash makes — so the locked palette holds. */}
            <mark className="box-decoration-clone bg-amber/35 px-2 text-navy">
              {local.headingMark}
            </mark>
          </h2>

          {/* First paragraph at body-l, the second a step down — the template's
              pair, for the template's reason. */}
          <p className="body-l mt-6 text-steel">{local.body[0]}</p>
          <p className="body-base mt-5 text-steel">{local.body[1]}</p>

          <div className="mt-10">
            <Button href="/locations" variant="secondary" className="group">
              {local.cta}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
          <figure className="relative">
            <Photo
              name="aboutHomeGround"
              ratio="1:1"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />

            {/* Caption on a navy scrim, as on Who We Are. Both lines are
                derived: the base city is `business.base`, and the count is
                `locations`, so neither can drift from the source. */}
            <figcaption className="absolute inset-x-0 bottom-0 px-5 pt-16 pb-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy via-navy/80 to-transparent"
              />
              <div className="relative">
                <p className="meta text-white">
                  {local.captionPrefix} {business.base}
                </p>
                <p className="meta mt-1 text-fog">
                  {locations.length} {local.areaSuffix}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
