import { contactPage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * What Happens Next — reassurance, not a process.
 *
 * Deliberately not a third rail-and-numeral timeline (`ServiceProcess`) or a
 * fourth amber-ruled step list beside a photograph (About's `Process`): three
 * short answers to the hesitation a contact form raises, divided by a plain
 * line rather than counted off. There is no sequence here for a numeral to
 * earn — a visitor can act on any one of these on its own, in any order.
 *
 * Set on Fog, same as `ServiceProcess`, and takes the same `bar="blue"` label
 * for the same reason: on Fog, an amber bar reads as a CTA accent rather than
 * a section marker.
 */
export function NextSteps() {
  return (
    <section className="bg-fog py-section" aria-labelledby="next-steps-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel bar="blue">{contactPage.reassurance.label}</SectionLabel>
          <h2 id="next-steps-heading" className="display-l mt-5 text-navy">
            {contactPage.reassurance.headline}
          </h2>
          <p className="body-l mt-5 text-steel">{contactPage.reassurance.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-gap-x"
          delay={0.08}
        >
          {contactPage.reassurance.points.map((point, i) => (
            <StaggerItem
              as="li"
              key={point.title}
              className={
                i === 0
                  ? ""
                  : "border-t border-t-line pt-8 md:border-t-0 md:border-l md:border-l-line md:pt-0 md:pl-8"
              }
            >
              <h3 className="display-s text-navy">{point.title}</h3>
              <p className="body-base mt-3 text-steel">{point.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
