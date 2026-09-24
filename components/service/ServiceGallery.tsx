import { projects, serviceGallery, type Service } from "@/lib/content";
import { photoData } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import {
  ServiceGalleryClient,
  type GalleryProject,
} from "@/components/service/ServiceGalleryClient";

/**
 * Recent Projects — the service page's photo gallery.
 *
 * Asked for by the client on 2026-09-25: a section on every service page for
 * "pictures for each of the project we did", placeholders until the photos
 * arrive, and "can click for more pictures". So: a row of project cards, the
 * after photo as each cover, and a viewer with every photo of the job.
 *
 * ONE SOURCE. The projects are `projects.items` in content.ts — the same
 * entries the homepage shows as before/after pairs — picked by `service`.
 * A job added there appears on the homepage and on its service page at once.
 * Placeholders top the row up to `serviceGallery.slots`, and they drop out
 * one by one as real jobs are added; a service with more real jobs than
 * slots shows them all.
 *
 * PLACEHOLDERS ARE NOT CLICKABLE. A card that opens an empty viewer is a dead
 * end for a real visitor, so they are plain plates saying photos are on the
 * way. The four pages with real work (Balcony Cleaning, Power Washing, Window
 * Cleaning, Roof Cleaning) are where the viewer can be tried.
 *
 * NAVY GROUND. It sits between the scope tiles (White) and the process strip
 * (Fog), and photographs read best on the dark band — the same reasoning as
 * the homepage's Latest Work. No `SectionEdge`: the cut is spent in exactly
 * four places, and this template already uses its one.
 *
 * The heading is one fixed string on all twelve pages, so it cannot wrap
 * differently from one service to the next. `check-layout.mjs` measures it
 * with the template's other headings (`#gallery-heading`).
 *
 * The server resolves every photo through `photoData`, so the client viewer
 * receives plain props and never imports the photo registry or content.ts.
 */
export function ServiceGallery({ service }: { service: Service }) {
  const real: GalleryProject[] = projects.items
    .filter((p) => p.service === service.slug)
    .map((p) => ({
      id: p.id,
      title: p.job,
      detail: p.detail,
      photos: [
        { ...photoData(p.before), tag: "Before" },
        { ...photoData(p.after), tag: "After" },
        ...(p.more ?? []).map((key) => ({ ...photoData(key), tag: null })),
      ],
    }));
  const placeholders = Math.max(0, serviceGallery.slots - real.length);

  return (
    <section className="on-navy bg-navy py-section" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <SectionLabel tone="dark">{serviceGallery.label}</SectionLabel>
            <h2 id="gallery-heading" className="display-l mt-5 text-white">
              {serviceGallery.heading}
            </h2>
          </div>
          <p className="body-l max-w-prose text-fog lg:w-5/12 lg:max-w-none">
            {serviceGallery.body}
          </p>
        </Reveal>

        <ServiceGalleryClient
          projects={real}
          placeholders={placeholders}
          serviceTitle={service.title}
          placeholderTitle={serviceGallery.placeholderTitle}
          placeholderDetail={serviceGallery.placeholderDetail}
          viewLabel={serviceGallery.viewLabel}
        />
      </div>
    </section>
  );
}
