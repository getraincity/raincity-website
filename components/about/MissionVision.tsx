import { aboutPage } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Mission and Vision, as a matched pair of full-bleed rows.
 *
 * The source has these as two consecutive sections with identical structure —
 * eyebrow, heading, one paragraph — which on a page this length would have
 * read as the same section printed twice. Set as two rows of one band they
 * read as what they are: a matched pair.
 *
 * Label and heading hold the left five columns, the statement sits in the
 * right six. That label / statement split is the site's own grammar — it is
 * the shape of the Why Choose Us index on the homepage — and it does the one
 * thing a mission statement needs, which is to stop looking like body copy.
 *
 * The split waits until lg. At 768 a six-column measure is about 300px, and
 * these paragraphs came out eight words wide against a heading with nothing
 * beside it; stacked, the tablet gets the full measure and the pairing still
 * reads from the amber rule and the dividers.
 *
 * Mission keeps Navy, the only navy on the page besides the banner — it's
 * the more abstract of the two statements, and the darkest ground is what
 * stops it reading as filler between the concrete sections either side.
 * Vision runs Fog rather than a second navy row, so the pair reads as two
 * considered statements rather than one long band repeating itself; the
 * eyebrow/heading/body colors flip to their light-surface equivalents to
 * keep contrast on the lighter ground.
 */
export function MissionVision() {
  return (
    <section aria-label="Our mission and vision">
      {/* Amber opens the set; Pacific hairlines divide it. Pacific rather
          than the line token, which is a light-ground border and would
          vanish against Mission's navy row. */}
      <Stagger as="ul" className="border-t-3 border-t-amber">
        {aboutPage.statements.map((statement, i) => {
          const isVision = i === 1;
          return (
            <StaggerItem
              as="li"
              key={statement.title}
              className={cn(
                isVision ? "bg-fog" : "on-navy bg-navy",
                "border-b border-b-pacific/30 last:border-b-0",
              )}
            >
              <div
                className={cn(
                  "mx-auto grid max-w-site grid-cols-1 gap-x-gap-x gap-y-5 px-edge lg:grid-cols-12",
                  isVision
                    ? "pt-10 pb-section lg:pt-14"
                    : "pt-section pb-10 lg:pb-14",
                )}
              >
                <div className="lg:col-span-5">
                  <SectionLabel tone={isVision ? "light" : "dark"}>
                    {statement.label}
                  </SectionLabel>
                  <h2
                    className={cn(
                      "display-l mt-5",
                      isVision ? "text-navy" : "text-white",
                    )}
                  >
                    {statement.title}
                  </h2>
                </div>

                <p
                  className={cn(
                    "body-l lg:col-span-6 lg:col-start-7 lg:self-center",
                    isVision ? "text-steel" : "text-fog",
                  )}
                >
                  {statement.body}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
