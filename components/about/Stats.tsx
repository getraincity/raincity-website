import { aboutPage, testimonials } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, Star } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * By the numbers — a heading on the left, four figures on the right.
 *
 * REBUILT 2026-09-25. The client's note on the previous version was "this
 * section just looks funny, i think something is missing", and they were
 * right about what: it was three figures under an eyebrow, left-aligned in
 * three wide columns of an otherwise empty Fog band. No heading said what the
 * numbers were for, nothing under a figure said what it meant, and each
 * column was two-thirds empty space at desktop. So it gained the three
 * things it lacked:
 *
 *  - A HEADING AND A LINE OF CONTEXT, set to the left like Founders below
 *    it, so the band reads as a statement with evidence rather than as a
 *    stray row of numbers.
 *  - A SENTENCE UNDER EACH FIGURE (`note` in content.ts), each restating a
 *    fact the client has already confirmed elsewhere.
 *  - A FOURTH FIGURE THAT CAN BE CHECKED: the Google rating, from
 *    `testimonials.google`, with a link to the listing. The other three are
 *    the client's claims; this one is somebody else's verdict, which is the
 *    figure a sceptical reader is actually looking for. It reads the count
 *    at render, so updating the reviews updates this too.
 *
 * The figures sit on white tiles with the section label's amber bar, in a
 * 2x2 grid — four equal cells fill the column, where three in a row left
 * each one mostly empty. Not counters: an animated count-up would be a
 * second motion idiom, and the system has exactly one.
 *
 * None of the four goes into the structured data. The three client figures
 * are unverified, and a rating marked up on the business's own site is the
 * "self-serving" review markup Google's rules exclude — see the rating gate
 * in lib/seo.tsx.
 */
export function Stats() {
  const google = testimonials.google;

  return (
    <section className="bg-fog py-section" aria-labelledby="stats-heading">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-block px-edge lg:grid-cols-12 lg:gap-x-gap-x">
        <Reveal className="lg:col-span-4 lg:self-center">
          {/* Blue bar: the tiles beside it carry the amber one — see the
              note on SectionLabel. */}
          <SectionLabel bar="blue">{aboutPage.statsLabel}</SectionLabel>
          <h2 id="stats-heading" className="display-l mt-5 text-navy">
            {aboutPage.statsHeading}
          </h2>
          <p className="body-l mt-6 text-steel">{aboutPage.statsBody}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="grid grid-cols-1 gap-gap-x sm:grid-cols-2 lg:col-span-8 lg:col-start-5"
          delay={0.06}
        >
          {aboutPage.stats.map((stat) => (
            <StaggerItem as="li" key={stat.label} className="flex">
              <Figure value={stat.value} label={stat.label} note={stat.note} />
            </StaggerItem>
          ))}

          <StaggerItem as="li" className="flex">
            <Figure
              value={google.rating}
              label="Google rating"
              note={`From ${google.count} reviews on our Google Business Profile.`}
              stars
              link={{ href: google.url, text: "Read the reviews" }}
            />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function Figure({
  value,
  label,
  note,
  stars = false,
  link,
}: {
  value: string;
  label: string;
  note: string;
  stars?: boolean;
  link?: { href: string; text: string };
}) {
  return (
    <div className="flex w-full flex-col border border-line bg-white p-card sm:p-8">
      <span aria-hidden="true" className="block h-hairline w-label-bar bg-amber" />
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* display-xl: the figure is the point of the tile. */}
        <p className="display-xl text-navy">{value}</p>
        {stars && (
          // The rating is already stated in the figure beside it, so the
          // stars are decoration to a screen reader.
          <span aria-hidden="true" className="flex gap-0.5 text-amber-ink">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-5" />
            ))}
          </span>
        )}
      </div>
      <p className="meta mt-3 text-navy">{label}</p>
      <p className="body-s mt-2 text-steel">{note}</p>
      {link && (
        <a
          href={link.href}
          target="_blank"
          rel="noopener"
          className="meta group relative mt-auto inline-flex items-center gap-2 pt-4 text-rc-blue transition-colors hover:text-navy"
        >
          {link.text}
          <span className="sr-only"> (opens Google in a new tab)</span>
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}
