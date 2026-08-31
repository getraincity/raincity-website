import { locations, locationsPage, services } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The overview: three sentences about being a mobile business, and the two
 * figures that follow from it.
 *
 * Deliberately not a second Stats band. /about already carries the full
 * treatment — an eyebrow, its own Fog band, three figures across the width,
 * each on a rule — and running that again here would make two pages open on
 * the same furniture. This is the compact version of it: the figures sit
 * beside the paragraph in the same grid rather than under a band of their
 * own, at `display-m` rather than `display-l`, and the section keeps the
 * white ground the page's opening statement wants.
 *
 * Both numbers are counted, not typed. `locations.length` and
 * `services.length` are facts about this site's own content, which is what
 * makes them safe to print — unlike the three figures on /about, which are
 * the client's unverified claims and are handled with a comment block saying
 * so. There is nothing to keep in step here: add a tenth community and this
 * band says ten.
 */
export function ServiceArea() {
  const figures = [locations.length, services.length];

  return (
    <section className="bg-white py-section" aria-labelledby="area-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-y-block lg:grid-cols-12 lg:gap-x-gap-x">
          <Reveal className="lg:col-span-7">
            <SectionLabel>{locationsPage.overview.label}</SectionLabel>
            <h2 id="area-heading" className="display-l mt-5 text-navy">
              {locationsPage.overview.headline}
            </h2>
            <p className="body-l mt-6 max-w-prose text-steel">
              {locationsPage.overview.body}
            </p>
          </Reveal>

          {/* Two figures, stacked on the right of the well and set against
              the same 28x3 amber bar the section labels and the /about stats
              use. Side by side under the paragraph on a phone, where a right
              column does not exist.

              `lg:self-end` rather than centred: the grid row is as tall as
              the heading block beside it, and floating the pair in the middle
              of that height left them related to nothing. Ending on the
              paragraph's last line gives the two columns a shared baseline,
              which is the same thing the /services banner does with its
              tenure figure. */}
          <Stagger
            as="ul"
            className="grid grid-cols-2 gap-x-gap-x lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:gap-y-8 lg:self-end"
            delay={0.1}
          >
            {locationsPage.overview.stats.map((stat, i) => (
              <StaggerItem as="li" key={stat.label}>
                <span
                  aria-hidden="true"
                  className="block h-hairline w-label-bar bg-amber"
                />
                <p className="display-m mt-4 text-navy">{figures[i]}</p>
                <p className="meta mt-2 text-steel">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
