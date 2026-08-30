import { aboutPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Our Process — three steps beside a photograph.
 *
 * Numerals are used here, and this is the one place on the site where that is
 * allowed: inspection, service and review happen in that order, and the order
 * is the whole point of the section. They are set as an ordered list so the
 * sequence is in the markup too, not only in the numerals drawn beside it.
 *
 * The photograph is not decoration. Three short steps on their own would be
 * the icon-row this design system rules out; a member of the crew says what
 * "we deliver professional service" cannot. Photo left, steps right — the
 * opposite hand to Who We Are further up, so the page alternates rather than
 * stacking two identical splits.
 *
 * It runs at 7:5 rather than the 4:5 the service cards use. The source is
 * 2530x1948 (1.3:1), so a portrait crop stood 700px tall beside 350px of
 * steps at desktop, and full viewport width by 960 tall on a tablet.
 * Landscape at 7:5, the two columns are within fifty pixels of each other
 * and the tablet gets its scroll back.
 */
export function Process() {
  return (
    <section className="bg-white py-section" aria-labelledby="process-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Heading and CTA share a line from md, as on the homepage. */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-prose">
            <SectionLabel>{aboutPage.process.label}</SectionLabel>
            <h2 id="process-heading" className="display-l mt-5 text-navy">
              {aboutPage.process.headline}
            </h2>
          </div>

          {/* Tertiary, where the same link higher up the page is secondary.
              Both go to /services and the copy inventory gives both the same
              label; the second one is a repeat, so it is weighted as one. */}
          <Button
            href="/services"
            variant="tertiary"
            className="group shrink-0 self-start md:self-auto"
          >
            {aboutPage.process.cta}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Reveal>

        <div className="mt-block grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-gap-x">
          <Reveal className="lg:col-span-6">
            <Photo
              name="aboutProcess"
              ratio="7:5"
              sizes="(min-width: 1024px) 47vw, 100vw"
            />
          </Reveal>

          <Stagger
            as="ol"
            className="border-l-3 border-l-amber pl-6 lg:col-span-5 lg:col-start-8 lg:self-center"
            delay={0.08}
          >
            {aboutPage.process.steps.map((step, i) => (
              <StaggerItem
                as="li"
                key={step.title}
                className={
                  i === 0 ? "pb-6" : "border-t border-t-line py-6 last:pb-0"
                }
              >
                <h3 className="display-s flex items-baseline gap-3 text-navy">
                  {/* aria-hidden: the list is already ordered, so a screen
                      reader announcing "one" then "01" would say it twice. */}
                  <span aria-hidden="true" className="display-m text-rc-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                <p className="body-base mt-2 text-steel">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
