import Link from "next/link";
import { projects, services } from "@/lib/content";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal, StaggerItem } from "@/components/ui/Motion";
import { ShowMoreList } from "@/components/ui/ShowMoreList";

/**
 * Recent projects — RainCity's own jobs, before and after.
 *
 * REAL SINCE 2026-09-25. Until then this section carried two stock pairs
 * under an "illustrative" disclaimer, because no job photography existed.
 * The client supplied eight jobs; they are `projects.items`, and the
 * disclaimer is off (`projects.illustrative`).
 *
 * SIDE BY SIDE, NOT A WIPE SLIDER. Each pair is one job, but the phone rarely
 * stood in the same spot twice, and a drag-to-wipe over two differently
 * framed photos looks broken rather than persuasive. The design system's
 * slider is for identical framing; when a job is shot that way, it can use
 * one. Every frame is a square (see the note in photos.ts), so a pair is two
 * equal tiles whatever the phone's orientation was.
 *
 * TWO PAIRS PER ROW at `lg`, one below it, with the Before tile in navy and
 * the After tile in amber — the tags the stock version already used. Each card
 * names the job, what it covered, and links to the service that does it, so
 * the proof leads somewhere.
 *
 * Four show on load and the rest behind a button (`ShowMoreList`). The
 * hidden pairs are still in the HTML; see that component.
 */
export function Projects() {
  const titleBySlug = new Map(services.map((s) => [s.slug, s.title]));

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
          {projects.illustrative && (
            <p className="body-s mt-4 border-l-3 border-l-amber pl-5 text-steel">
              {projects.disclaimer}
            </p>
          )}
        </Reveal>

        <ShowMoreList
          initial={projects.initialCount}
          moreLabel={projects.moreLabel}
          lessLabel={projects.lessLabel}
          className="mt-12 grid grid-cols-1 gap-gap-x gap-y-8 lg:grid-cols-2"
        >
          {projects.items.map((item) => (
            <StaggerItem as="li" key={item.id}>
              <figure className="flex h-full flex-col border border-line bg-white">
                <div className="grid grid-cols-2 gap-1 p-1">
                  <Pane photo={item.before} tag="Before" />
                  <Pane photo={item.after} tag="After" highlight />
                </div>
                <figcaption className="flex flex-1 flex-wrap items-end justify-between gap-x-6 gap-y-3 px-5 pt-4 pb-5">
                  <div>
                    <h3 className="display-s text-navy">{item.job}</h3>
                    <p className="meta mt-1.5 text-steel">{item.detail}</p>
                  </div>
                  <Link
                    href={`/services/${item.service}`}
                    className="meta group inline-flex items-center gap-2 text-rc-blue transition-colors hover:text-navy"
                  >
                    {titleBySlug.get(item.service)}
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </ShowMoreList>
      </div>
    </section>
  );
}

function Pane({
  photo,
  tag,
  highlight = false,
}: {
  photo: PhotoKey;
  tag: string;
  highlight?: boolean;
}) {
  return (
    <div className="relative">
      {/* A quarter of the row at `lg` (two cards, two tiles each), half the
          column below it. */}
      <Photo name={photo} ratio="1:1" sizes="(min-width: 1440px) 330px, (min-width: 1024px) 23vw, 50vw" />
      <p
        className={`meta absolute top-0 left-0 px-3 py-1.5 ${
          highlight ? "bg-amber text-navy" : "bg-navy text-white"
        }`}
      >
        {tag}
      </p>
    </div>
  );
}
