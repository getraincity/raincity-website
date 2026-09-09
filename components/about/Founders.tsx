import { founders } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The founders.
 *
 * Added at the client's request. `/about` currently names no person anywhere —
 * not in a byline, not in a caption, not in the FAQ — so this is the page's
 * only human anchor, which is worth remembering if it is ever cut down.
 *
 * IT RENDERS NOTHING UNTIL `founders.people` HAS SOMEBODY IN IT, and today it
 * is empty. The note on that constant lists what is still outstanding and why
 * two first names are not enough to publish. This is the same arrangement the
 * footer uses for `social`: an empty array and no section, rather than a
 * section full of stand-ins. Returning `null` above the markup means the page
 * simply does not have this band yet, so nothing has to be commented out of
 * `app/about/page.tsx` and nothing gets forgotten there later.
 *
 * White, and placed between Stats and Partnerships. That keeps the page
 * alternating — white, fog, white, fog — into the fog-to-navy cut above
 * Mission, which is why `SectionEdge` did not need its `from` changed when
 * these two sections landed. Narratively it also sits in the right place: the
 * company, then the numbers, then the people behind both, then who works with
 * them.
 *
 * THE PORTRAIT IS OPTIONAL AND THE LAYOUT IS BUILT AROUND THAT. A founder with
 * no photograph renders as a rule, a name, a role and a bio, which reads as a
 * deliberate typographic entry. The alternative — a placeholder frame — renders
 * as a flat Fog box on this site, which beside a real portrait would look like
 * a face that failed to load. So one founder can go up with a photograph while
 * the other is still waiting for one.
 *
 * No circular crops. The system resets `--radius-*` and takes no radius on any
 * card or panel, so a round avatar would be the only curved edge on the page,
 * and it is the single strongest tell of a templated team section. Portrait
 * 4:5, squared, left-aligned type under a hairline — the same grammar as every
 * other figure here.
 */

/**
 * Column counts as whole literal class strings. The scanner never sees a
 * string this file builds, so these are looked up rather than interpolated —
 * the rule is in CLAUDE.md and this is exactly the case it is written for.
 *
 * One founder does not get a full-width row: at `max-w-site` a single 4:5
 * portrait would stand over a thousand pixels tall. Four or more falls back to
 * the three-column form and wraps.
 */
const columns: Record<string, string> = {
  "1": "sm:max-w-sm",
  "2": "sm:grid-cols-2 lg:gap-x-gap-x",
  "3": "sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-gap-x",
};
const columnsFallback = "sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-gap-x";

export function Founders() {
  const { people } = founders;
  if (people.length === 0) return null;

  const cols = columns[String(people.length)] ?? columnsFallback;

  return (
    <section className="bg-white py-section" aria-labelledby="founders-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal>
          <SectionLabel>{founders.label}</SectionLabel>
          <h2 id="founders-heading" className="display-l mt-5 text-navy">
            {founders.heading}
          </h2>
        </Reveal>

        <Stagger
          as="ul"
          className={cn("mt-block grid grid-cols-1 gap-10", cols)}
          delay={0.08}
        >
          {people.map((person) => (
            <StaggerItem as="li" key={person.name}>
              {person.photo ? (
                <Photo
                  name={person.photo}
                  ratio="4:5"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              ) : null}

              {/* The rule sits above the name whether or not there is a
                  photograph over it, so an entry with no portrait still reads
                  as an entry rather than as loose copy. */}
              <div
                className={cn(
                  "border-t border-t-line pt-5",
                  person.photo && "mt-6",
                )}
              >
                <h3 className="display-s text-navy">{person.name}</h3>
                <p className="eyebrow mt-2 text-rc-blue">{person.role}</p>
                <p className="body-base mt-4 text-steel">{person.bio}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
