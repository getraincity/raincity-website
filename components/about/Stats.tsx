import { aboutPage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Three figures, set as type on a Fog band.
 *
 * Not cards, not counters. Cards would make three boxes out of three numbers
 * and put a border around each, which is more furniture than a nine-word
 * section can carry; an animated count-up would be a second motion idiom and
 * the system has exactly one. What separates the figures is the same 28x3
 * amber bar the section labels use, and a hairline between the columns.
 *
 * The figures themselves are the client's published claims and are not
 * verified — see the comment block on `aboutPage` in content.ts. They stay
 * out of the structured data for that reason.
 *
 * No heading of its own: the band is three figures under an eyebrow, and an
 * h2 here would only restate the label already printed above it. The section
 * carries an `aria-label` instead, so it is still named in a landmark list.
 */
export function Stats() {
  return (
    <section className="bg-fog py-section-sm" aria-label="RainCity by the numbers">
      <div className="mx-auto max-w-site px-edge">
        <Reveal>
          <SectionLabel bar="blue">{aboutPage.statsLabel}</SectionLabel>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0"
        >
          {aboutPage.stats.map((stat, i) => (
            <StaggerItem
              as="li"
              key={stat.label}
              className={
                i === 0
                  ? "sm:pr-8"
                  : "border-t border-t-line pt-8 sm:border-t-0 sm:border-l sm:border-l-line sm:pt-0 sm:pl-8"
              }
            >
              <span
                aria-hidden="true"
                className="block h-hairline w-label-bar bg-amber"
              />
              {/* display-l, one step below the page's h1 — large enough to
                  read as a figure, not so large it outweighs the headline it
                  sits under. */}
              <p className="display-l mt-5 text-navy">{stat.value}</p>
              <p className="meta mt-3 text-steel">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
