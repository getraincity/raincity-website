import { servicePage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * How It Works — the customer's three steps, identical on all eleven pages.
 *
 * Numerals are used, and this is the second of the two places on the site
 * where that is allowed: the steps happen in this order and the order is the
 * point. Set as an ordered list, so the sequence is in the markup and not
 * only in the figures drawn above it.
 *
 * It is laid out to be no one else's section. /about's Process runs a
 * photograph beside a vertical list with the numerals inline; Pillars runs
 * three untitled claims divided by amber rules. This runs across: figure,
 * then a full-column amber rule, then the step. At desktop the three rules
 * read as one line broken into three, which is what a sequence looks like.
 *
 * No photograph, deliberately. The page has exactly one and it is in the
 * banner; a second frame here would have to be generic to work on all eleven
 * pages, and a generic photograph is worse than none.
 */
export function ServiceProcess() {
  return (
    <section
      className="on-navy bg-navy py-section"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel tone="dark">{servicePage.process.label}</SectionLabel>
          <h2 id="process-heading" className="display-l mt-5 text-white">
            {servicePage.process.headline}
          </h2>
        </Reveal>

        <Stagger
          as="ol"
          className="mt-block grid grid-cols-1 gap-y-gap-y md:grid-cols-3 md:gap-x-gap-x"
          delay={0.08}
        >
          {servicePage.process.steps.map((step, i) => (
            <StaggerItem as="li" key={step.title}>
              {/* aria-hidden: the list is already ordered, so a screen reader
                  announcing "one" and then "01" would say it twice. */}
              <p aria-hidden="true" className="display-m text-pacific">
                {String(i + 1).padStart(2, "0")}
              </p>
              <span
                aria-hidden="true"
                className="mt-5 block h-hairline w-full bg-amber"
              />
              <h3 className="display-s mt-6 text-white">{step.title}</h3>
              <p className="body-base mt-3 text-fog">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
