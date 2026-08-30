import { whyChooseUs } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Why Choose Us — a full-width numbered index, not a two-column split.
 *
 * The split was the problem. Five claims never balanced against a heading and
 * a button no matter how the two halves were weighted, and the left column
 * kept reading as the empty one. So the section stops being two columns of a
 * page: the heading block spans the top with the CTA set against it on the
 * same line, and the five claims run the full measure beneath as an index —
 * numeral, title, body — under a single amber rule.
 *
 * Numerals rather than the icon medallions used in About. Both neighbours are
 * already picture-led — the services grid above, the project pairs below — and
 * Pillars further down argues the same case over a photograph. An index reads
 * as a specification against all three, which is the register this section
 * wants and the one thing none of its neighbours occupy.
 *
 * The headline goes back up to `display-l`. It was stepped down to display-m
 * when it had to share a five-column well; across the full width it has the
 * room to carry the larger size again.
 */
/**
 * Row wash. Cool and warm alternate rather than stepping one hue down the
 * list: at the 1-2 point increments a five-step ramp needs, adjacent rows
 * were too close to tell apart without keeping the hairlines, and tint plus
 * rule together read as clutter. Alternating separates the rows on its own,
 * so the dividers come out and only the amber rule at the top survives.
 *
 * The ceiling is set by contrast, not taste. `steel` body copy measures
 * 4.53:1 on the deepest hover state here, just clear of the 4.5:1 AA floor;
 * another two points of opacity puts it under. Do not darken these without
 * re-measuring the body copy, which is the first thing to fail.
 */
const rowTint = [
  "bg-rc-blue/6 hover:bg-rc-blue/10",
  "bg-amber/7 hover:bg-amber/12",
  "bg-rc-blue/6 hover:bg-rc-blue/10",
  "bg-amber/7 hover:bg-amber/12",
  "bg-rc-blue/6 hover:bg-rc-blue/10",
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-section" aria-labelledby="why-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Heading and CTA share a line, set to the same baseline at md. */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-prose">
            <SectionLabel>{whyChooseUs.label}</SectionLabel>
            <h2 id="why-heading" className="display-l mt-5 text-navy">
              {whyChooseUs.headline}
            </h2>
          </div>
          {/* self-start stops the column stretching it edge to edge on a
              phone; no other CTA on the site runs full width. */}
          <Button href="#quote" className="shrink-0 self-start md:self-auto">
            {whyChooseUs.cta}
          </Button>
        </Reveal>

        {/* The index. Amber opens it; the wash separates the entries.
            Negative edge margin pulls the track out to the section's own
            width so each row's wash runs as an unbroken band; the padding
            goes back on the rows, which keeps the numerals on the same left
            edge as the heading above. */}
        <Stagger as="ol" className="mt-block -mx-edge border-t-3 border-t-amber">
          {whyChooseUs.features.map((feature, i) => (
            <StaggerItem
              as="li"
              key={feature.title}
              className={cn(
                "grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 px-edge py-8",
                "md:grid-cols-12 md:items-baseline md:gap-x-gap-x",
                "transition-colors duration-250 ease-out",
                rowTint[i],
              )}
            >
              {/* Numeral and title sit on one line on a phone; the body drops
                  under the title rather than under the numeral. */}
              <p aria-hidden="true" className="display-s text-rc-blue md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display-s text-navy md:col-span-4">{feature.title}</h3>
              <p className="body-base col-start-2 text-steel md:col-span-7 md:col-start-auto">
                {feature.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
