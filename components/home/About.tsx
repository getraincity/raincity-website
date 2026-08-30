import { about, business } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock, ShieldCheck, Users } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * About — photograph in the left five columns, copy in the right six.
 *
 * The photograph used to carry `lg:mt-16`, dropping it below the text so the
 * section read on a diagonal. The offset is gone: both columns now start on
 * the same line, so the eyebrow and the top edge of the plate align exactly.
 *
 * The three tags stay a stacked list tied together by a single amber rule
 * rather than three cards: they are qualities, not features. Each now leads
 * with an icon on the title's own line, which marks the list without giving
 * it the weight of a card row.
 */

/** Named in content.ts so the copy owns the pairing, not this component. */
const pointIcons = {
  team: Users,
  clock: Clock,
  shield: ShieldCheck,
} as const;

export function About() {
  return (
    <section className="bg-white py-section" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-edge lg:grid-cols-12 lg:gap-6">
        {/* Photograph */}
        <Reveal className="lg:col-span-5">
          {/* The plate anchors to the figure, not the grid cell: the cell is
              as tall as the copy beside it, so pinning to it left the caption
              floating hundreds of pixels below the image. */}
          <figure className="relative">
            {/* The original 4:5 portrait frame, kept as-is. The 1445x1017
                source is landscape, so cover crops it to the middle ~56% of
                its width; held just left of centre, which keeps the ladder,
                the roofer on it and the porch line, and drops the empty
                left-hand gable instead. */}
            <Photo
              name="aboutCrew"
              ratio="4:5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />

            {/* Caption. A scrim rising off the bottom edge rather than the old
                opaque plate: it holds the type at full contrast while letting
                the photograph read through everywhere it is not needed. */}
            <figcaption className="absolute inset-x-0 bottom-0 px-5 pt-16 pb-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy via-navy/80 to-transparent"
              />
              <div className="relative">
                <p className="meta text-white">RainCity Property Maintenance</p>
                <p className="meta mt-1 text-fog">Taking care of your place</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        {/* Copy. One reveal for the whole column: the eyebrow, heading, body
            and the three qualities are a single argument, and fading them in
            separately would make a list of four out of a paragraph. */}
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
          <SectionLabel>{about.label}</SectionLabel>

          <h2 id="about-heading" className="display-l mt-5 text-navy">
            {about.headline}
          </h2>

          <p className="body-l mt-6 text-steel">{about.body}</p>

          <ul className="mt-10 border-l-3 border-l-amber pl-6">
            {about.tags.map((tag, i) => {
              const Icon = pointIcons[tag.icon];
              return (
                <li
                  key={tag.title}
                  className={i === 0 ? "pb-5" : "border-t border-t-line py-5 last:pb-0"}
                >
                  <h3 className="display-s flex items-center gap-2.5 text-navy">
                    <Icon className="size-5 shrink-0 text-rc-blue" />
                    {tag.title}
                  </h3>
                  <p className="body-s mt-2 text-steel">{tag.support}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            {/* "Learn More" on its own names no destination, which is a
                problem for anyone reading the page as a list of links. The
                rest of the sentence is added as screen-reader-only text
                rather than an aria-label so it is part of the link's actual
                text. `sr-only` is absolutely positioned, so it is out of
                flex flow and contributes nothing to the button's gap or
                size — the rendered CTA is unchanged. */}
            <Button href="/about" variant="secondary" className="group">
              {about.cta}
              <span className="sr-only"> about {business.name}</span>
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
