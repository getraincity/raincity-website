import { aboutPage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Mission and Vision, as one navy band.
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
 * Navy, and the only navy on the page besides the banner. The two statements
 * are the most abstract copy here; giving them the darkest ground is what
 * stops them reading as filler between the concrete sections either side.
 */
export function MissionVision() {
  return (
    <section
      className="on-navy bg-navy py-section"
      aria-label="Our mission and vision"
    >
      <div className="mx-auto max-w-site px-edge">
        {/* Amber opens the set; Pacific hairlines divide it. Pacific rather
            than the line token, which is a light-ground border and vanishes
            on navy. */}
        <Stagger as="ul" className="border-t-3 border-t-amber">
          {aboutPage.statements.map((statement) => (
            <StaggerItem
              as="li"
              key={statement.title}
              className="grid grid-cols-1 gap-x-gap-x gap-y-5 border-b border-b-pacific/30 py-10 last:border-b-0 lg:grid-cols-12 lg:py-14"
            >
              <div className="lg:col-span-5">
                <SectionLabel tone="dark">{statement.label}</SectionLabel>
                <h2 className="display-l mt-5 text-white">{statement.title}</h2>
              </div>

              <p className="body-l text-fog lg:col-span-6 lg:col-start-7 lg:self-center">
                {statement.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
