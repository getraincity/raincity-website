import { servicesPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * What We Offer — the value proposition, then the three principles.
 *
 * Photograph left, copy right: the mirror of /about's Who We Are, which runs
 * copy left. The two pages share the split and alternate the hand, so neither
 * reads as a re-run of the other.
 *
 * The photograph is the crew re-roofing, not one of the service frames. Every
 * service photograph in the registry appears in the catalogue directly below
 * this section, and printing one of them twice on the same page would make
 * the page look shorter than it is.
 *
 * --- The principles ------------------------------------------------------
 *
 * The three claims run as a full-width strip beneath the split rather than as
 * a bulleted list inside the copy column. As a list they would be three
 * two-word lines lost against a paragraph; as a strip under a single amber
 * rule they read as a specification, which is the one register on this page
 * that neither the banner above nor the photo catalogue below occupies.
 *
 * Deliberately not icons. Three claims, three icons and three boxes is the
 * exact shape this design system rules out — the strip carries its structure
 * in the rule and the dividers instead, and no glyph has to stand in for
 * "Transparent Practices".
 */
export function WhatWeOffer() {
  return (
    <section className="bg-white py-section" aria-labelledby="offer-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-gap-x">
          {/* Centred in the row rather than top-aligned: the copy column is
              the taller of the two and sets the row height, and a picture
              hung from the top of it leaves a hole under the frame. */}
          <Reveal className="lg:col-span-5 lg:self-center">
            <Photo
              name="aboutCrew"
              ratio="7:5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <SectionLabel>{servicesPage.intro.label}</SectionLabel>

            <h2 id="offer-heading" className="display-l mt-5 text-navy">
              {servicesPage.intro.headline}
            </h2>

            <p className="body-l mt-6 text-steel">{servicesPage.intro.body}</p>

            <div className="mt-10">
              <Button href="#quote">{servicesPage.intro.cta}</Button>
            </div>
          </Reveal>
        </div>

        {/* Amber opens the strip; hairlines divide it from md, where the three
            claims sit side by side. Stacked below that the dividers run
            horizontally instead, so the set still reads as one group. */}
        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 border-t-3 border-t-amber md:grid-cols-3"
        >
          {servicesPage.intro.principles.map((principle, i) => (
            <StaggerItem
              as="li"
              key={principle.title}
              className={
                i === 0
                  ? "py-7 md:pr-8 md:last:pr-0"
                  : "border-t border-t-line py-7 md:border-t-0 md:border-l md:border-l-line md:pr-8 md:pl-8 md:last:pr-0"
              }
            >
              <h3 className="display-s text-navy">{principle.title}</h3>
              <p className="body-s mt-2 text-steel">{principle.support}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
