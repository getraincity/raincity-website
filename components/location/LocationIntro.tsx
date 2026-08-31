import { locationPage, type Location } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentList } from "@/components/ui/AccentList";
import { Reveal } from "@/components/ui/Motion";

/**
 * The local brief — the section this route exists for, and the only one on
 * the site whose copy is written nine separate times.
 *
 * A location page earns its URL on this block or it does not earn it at all.
 * Everything else here is furniture the site already owns; this is the part
 * that says something true about Anmore that is not true about Surrey. The
 * copy is in `detail.heading` and `detail.body`, and the note on `locations`
 * in content.ts carries the test to apply when editing it: a sentence that
 * would still read true with a different city's name in it is the wrong
 * sentence.
 *
 * Composition is 7 / 4 with a Fog panel in the short column, and the panel is
 * the reason this is not just two paragraphs on a white ground. `detail.notes`
 * are three short lines of what we plan for in this particular place —
 * needles all year, salt film, snow on the plateau. They are facts about
 * working here rather than benefit statements, which is what keeps the panel
 * from becoming the three-icon feature row CLAUDE.md rules out: no icons, no
 * headings, no "Fast, Friendly, Insured", just the site's own blue dash
 * marker down a ruled list.
 *
 * `AccentList` rather than a bespoke list, for the same reason the FAQ reuses
 * `FaqAccordion`: the dash marker is defined once in the design system and a
 * second list style appearing on a location page would be exactly the drift
 * that component exists to prevent.
 *
 * White, against the navy banner above and the Fog service grid below.
 */
export function LocationIntro({ location }: { location: Location }) {
  const { detail } = location;

  return (
    <section className="bg-white py-section" aria-labelledby="local-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionLabel>{locationPage.intro.label}</SectionLabel>
            <h2 id="local-heading" className="display-l mt-5 text-navy">
              {detail.heading}
            </h2>

            {/* Two paragraphs, held to the prose measure. `max-w-prose` is
                safe here and only here in this component — it is 65ch of the
                body font, which is near enough the token to have never shown
                a difference. It is deliberately not on the heading above;
                see the trap documented in components/blog/PostColumn.tsx. */}
            <div className="mt-6 flex max-w-prose flex-col gap-5">
              {detail.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="body-l text-steel">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* The panel. Fog with a 2px navy plate, the same framed-thing
              treatment the two maps on this site sit in — the system carries
              no radius and no shadow, so a bordered plate is what a framed
              block looks like here. `lg:self-start` keeps it the height of
              its own content rather than stretching to the copy beside it. */}
          <Reveal
            as="div"
            className="border-2 border-navy bg-fog p-6 sm:p-8 lg:col-span-4 lg:col-start-9 lg:self-start"
            delay={0.1}
          >
            <h3 className="meta text-steel">
              {locationPage.intro.notesTitle}
            </h3>
            <AccentList items={detail.notes} className="mt-5" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
