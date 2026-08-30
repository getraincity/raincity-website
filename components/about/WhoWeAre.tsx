import { aboutPage, business } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * Who We Are — the company narrative.
 *
 * Copy left, photograph right: the exact mirror of the homepage's About
 * section, which runs photo left. Same grammar, opposite hand, so the two
 * pages read as one site without either one feeling like a re-run.
 *
 * The photograph is a technician at work on a rooftop, keeping the section
 * grounded in the same "real work, real crew" register as the rest of the
 * page rather than a posed shot.
 */
export function WhoWeAre() {
  return (
    <section className="bg-white py-section" aria-labelledby="who-heading">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-edge lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-6">
          <SectionLabel>{aboutPage.intro.label}</SectionLabel>

          <h2 id="who-heading" className="display-l mt-5 text-navy">
            {aboutPage.intro.headline}
          </h2>

          {/* First paragraph at body-l, the second a step down. The pair is
              one argument, and setting both at the larger size gives a wall
              of even grey with nothing to enter it by. */}
          <p className="body-l mt-6 text-steel">{aboutPage.intro.body[0]}</p>
          <p className="body-base mt-5 text-steel">{aboutPage.intro.body[1]}</p>

          <div className="mt-10">
            <Button href="/services" variant="secondary" className="group">
              {aboutPage.intro.cta}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
          <figure className="relative">
            <Photo
              name="aboutWhoWeAre"
              ratio="1:1"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />

            {/* Caption on a scrim rather than a plate, same as the homepage
                About figure — it holds the type at full contrast without
                boxing off the bottom of the picture. */}
            <figcaption className="absolute inset-x-0 bottom-0 px-5 pt-16 pb-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy via-navy/80 to-transparent"
              />
              <div className="relative">
                <p className="meta text-white">Hands-on, every job</p>
                <p className="meta mt-1 text-fog">
                  {business.base} &amp; {business.region}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
