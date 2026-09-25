import { projects, serviceGallery, type Service } from "@/lib/content";
import { photoData } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import {
  ServiceGalleryClient,
  type GalleryProject,
} from "@/components/service/ServiceGalleryClient";

/**
 * The service page's photo gallery — real jobs, topped up with clearly
 * labelled examples so every page shows full rows of three.
 *
 * Asked for by the client on 2026-09-25: a section on every service page for
 * "pictures for each of the project we did", with "click for more pictures",
 * and then — the same day — three columns on every page, never one or two.
 * So: a row of project cards, the after photo as each cover, and a viewer
 * with every photo of the job.
 *
 * THE ROW (see the banner on `serviceGallery` in content.ts):
 *
 *  - Real jobs first — the entries in `projects.items` whose `service` is
 *    this page, the same ones the homepage shows as before/after pairs. A job
 *    added there appears on the homepage and here at once.
 *  - Then examples from `serviceGallery.examples.bySlug`, as many as it takes
 *    to reach the next multiple of `perRow`. Each example card is tagged
 *    "Example photo" / "Not a RainCity job", on the card and in the viewer,
 *    and the section body switches to `bodyMixed`. They step aside one by one
 *    as real jobs arrive.
 *  - With no real job at all, three examples under their own label and heading
 *    ("What This Work Looks Like"), whose body says they are not RainCity jobs.
 *
 * NAVY GROUND. It sits between the scope tiles (White) and the process strip
 * (Fog), and photographs read best on the dark band — the same reasoning as
 * the homepage's Latest Work. No `SectionEdge`: the cut is spent in exactly
 * four places, and this template already uses its one.
 *
 * Each heading is one fixed string on every page that uses it, so it cannot
 * wrap differently from one service to the next. `check-layout.mjs` measures
 * it with the template's other headings (`#gallery-heading`).
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

  const ex = serviceGallery.examples;
  const { perRow } = serviceGallery;
  const wanted = real.length === 0 ? perRow : Math.ceil(real.length / perRow) * perRow;
  const examples: GalleryProject[] = (ex.bySlug[service.slug] ?? [])
    .slice(0, wanted - real.length)
    .map((e, i) => ({
      id: `example-${i + 1}`,
      title: e.title,
      detail: ex.detail,
      example: true,
      photos: [{ ...photoData(e.photo), tag: ex.tag }],
    }));
  const items = [...real, ...examples];
  if (items.length === 0) return null;

  const copy =
    real.length === 0
      ? ex
      : { ...serviceGallery, body: examples.length ? serviceGallery.bodyMixed : serviceGallery.body };

  return (
    <section className="on-navy bg-navy py-section" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <SectionLabel tone="dark">{copy.label}</SectionLabel>
            <h2 id="gallery-heading" className="display-l mt-5 text-white">
              {copy.heading}
            </h2>
          </div>
          <p className="body-l max-w-prose text-fog lg:w-5/12 lg:max-w-none">
            {copy.body}
          </p>
        </Reveal>

        <ServiceGalleryClient
          projects={items}
          viewLabel={serviceGallery.viewLabel}
          exampleViewLabel={ex.viewLabel}
        />
      </div>
    </section>
  );
}
