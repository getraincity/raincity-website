import { servicePage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * How It Works — the customer's three steps, identical on all eleven pages.
 *
 * Set as a connected timeline on Fog, where it used to be three columns of
 * numerals on navy. The navy version had two problems. It was the site's
 * third dark band in a row on this page, and — more to the point — figure,
 * amber rule, title, body is close enough to /about's Process and to Pillars
 * that the three read as one component used three times. A rule per column
 * reads as one line broken into three only if you already know it is meant
 * to; an actual continuous rail running through the gutters does not need
 * the benefit of the doubt.
 *
 * The rail is a single absolutely-positioned line behind the grid, not a
 * border per column, which is the whole difference. Nodes sit on it — squared
 * blocks, because nothing on this site takes a radius — and the numerals hang
 * below in Pacific at display-m, large enough to be the design element the
 * section is built on rather than a label on a column.
 *
 * Stacked below md the rail turns with the layout: per-step vertical segments
 * joining each node to the next. Without them the nodes read as three loose
 * marks, which is the one thing a timeline must not do.
 *
 * Numerals are kept, and are still earned: this is a sequence and the order
 * is the entire point. Set as an ordered list, so the sequence is in the
 * markup and not only in the figures drawn above it.
 *
 * Colour: Fog ground, RainCity Blue nodes, Pacific numerals and rail. No navy
 * ground and no amber — the band above this one is RainCity Blue and the one
 * below is a navy-scrimmed photograph, so a light section between them is
 * what lets either of those read as dark.
 *
 * No photograph, deliberately. A second frame here would have to be generic
 * to work on all eleven pages, and a generic photograph is worse than none.
 */
export function ServiceProcess() {
  return (
    <section className="bg-fog py-section" aria-labelledby="process-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel bar="blue">{servicePage.process.label}</SectionLabel>
          <h2 id="process-heading" className="display-l mt-5 text-navy">
            {servicePage.process.headline}
          </h2>
        </Reveal>

        <div className="relative mt-block">
          {/* The rail. One line spanning the whole grid — gutters included —
              which is what makes the three steps read as connected rather
              than merely adjacent. `top-2` centres it on the 16px nodes.
              Hidden below md: stacked, the steps run down the page and the
              per-step vertical segments take the rail's job there. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-2 hidden h-hairline bg-pacific/35 md:block"
          />

          <Stagger
            as="ol"
            className="grid grid-cols-1 gap-y-gap-y md:grid-cols-3 md:gap-x-gap-x"
            delay={0.08}
          >
            {servicePage.process.steps.map((step, i) => (
              /* Stacked, the step is indented clear of its own rail and
                 the node is lifted out of the flow to sit on it. From md the
                 node returns to the flow and the indent goes, which is the
                 horizontal layout unchanged. */
              <StaggerItem
                as="li"
                key={step.title}
                className="relative pl-8 md:pl-0"
              >
                {/* Stacked, the rail turns vertical: a segment from the foot
                    of this node, through the row gap, to the top of the next.
                    `-bottom-gap-y` is exactly the grid's own row gap, so the
                    segment lands on the following node however the clamp
                    resolves. Not drawn under the last step — a timeline that
                    runs on past its final node is an arrow to nowhere. */}
                {i < servicePage.process.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-4 -bottom-gap-y left-2 w-hairline bg-pacific/35 md:hidden"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 block h-4 w-4 bg-rc-blue md:static"
                />
                {/* aria-hidden: the list is already ordered, so a screen
                    reader announcing "one" and then "01" would say it twice. */}
                <p aria-hidden="true" className="display-m mt-7 text-pacific">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display-s mt-3 text-navy">{step.title}</h3>
                <p className="body-base mt-3 text-steel">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
