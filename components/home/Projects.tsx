import { projects } from "@/lib/content";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Recent projects — side-by-side pairs rather than a wipe slider.
 *
 * These are two different properties, not one property photographed twice, so
 * a drag-to-wipe would imply a transformation that did not happen. Shown as
 * honest pairs with a stated disclaimer instead. Materials are matched within
 * each pair so the comparison is fair.
 */
export function Projects() {
  return (
    /* Mist, not fog. The 12deg wedge below this section is filled with this
       section's own colour — that is what makes the cut read as this band
       being sliced rather than as a separate plate laid over the navy. Fog
       goes white against navy, so the band moves with the wedge. */
    <section className="bg-mist py-section" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{projects.label}</SectionLabel>
          <h2 id="projects-heading" className="display-l mt-5 text-navy">
            {projects.headline}
          </h2>
          <p className="body-l mt-6 text-steel">{projects.body}</p>
          {/* Shown above the photographs so the illustrative nature is clear
              before a visitor starts scanning the pairs, not only after. */}
          {projects.illustrative && (
            <p className="body-s mt-4 border-l-3 border-l-amber pl-5 text-steel">
              {projects.disclaimer}
            </p>
          )}
        </Reveal>

        <Stagger className="mt-12 flex flex-col gap-12" step={0.08}>
          {projects.items.map((item) => (
            <StaggerItem as="figure" key={item.id}>
              <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-b-line pb-4">
                <h3 className="display-s text-navy">{item.job}</h3>
                <p className="meta text-steel">{item.place}</p>
              </figcaption>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Pane
                  photo={item.before as PhotoKey}
                  tag="Before"
                  caption={item.beforeCaption}
                />
                <Pane
                  photo={item.after as PhotoKey}
                  tag="After"
                  caption={item.afterCaption}
                  highlight
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
}

function Pane({
  photo,
  tag,
  caption,
  highlight = false,
}: {
  photo: PhotoKey;
  tag: string;
  caption: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="relative">
        <Photo name={photo} ratio="3:2" sizes="(min-width: 640px) 45vw, 90vw" />
        <p
          className={`meta absolute top-0 left-0 px-4 py-2 ${
            highlight ? "bg-amber text-navy" : "bg-navy text-white"
          }`}
        >
          {tag}
        </p>
      </div>
      <p className="body-s mt-3 text-steel">{caption}</p>
    </div>
  );
}
