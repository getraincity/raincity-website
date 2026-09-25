import { founders } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The founders — Wilson and Glevin (the client's spelling; see `founders`).
 *
 * Added at the client's request. `/about` otherwise names no person anywhere,
 * so this is the page's only human anchor, which is worth remembering if it
 * is ever cut down.
 *
 * LAYOUT. Heading and lead line on the left (four columns), the two founders
 * on the right (seven), side by side from `sm`. Two portraits sharing the full
 * site width would each stand some 800px tall; beside the heading they sit at
 * a portrait's natural size and the section reads as one statement — who
 * started the company, then the two of them — rather than as a staff grid.
 *
 * THE PORTRAIT'S PLACE IS ALWAYS HELD. Until a founder's photograph arrives,
 * the 4:5 frame carries a Harbour Navy plate with their initial set in the
 * display face. Same frame, same corner notch, so the page does not move when
 * the real picture lands — set `photo` on the founder and nothing else
 * changes. A navy plate rather than Fog: Fog is what an image that failed to
 * load looks like on this site, and beside a heading it would read as broken.
 *
 * The frame carries the service card's signature — the corner cut out to
 * reveal RainCity Blue — which is what makes it one of this site's cards
 * rather than a generic team tile. No circular crops: nothing on this site is
 * rounded except the partner cards' 4px, and a round avatar is the single
 * strongest tell of a templated team section.
 *
 * GROUND: White. Stats above it is Fog and Partnerships below it is Fog, so
 * the three alternate. Before the founders were confirmed this section
 * rendered nothing, and Partnerships had been moved to White to avoid two Fog
 * bands touching; it is back to the designed Fog now that this always shows.
 *
 * Both portraits are in (2026-09-25), so neither card shows the plate. The
 * roles are the client's and the bios describe those roles — see the banner
 * on `founders` in content.ts.
 */
export function Founders() {
  const { people } = founders;
  if (people.length === 0) return null;

  return (
    <section className="bg-white py-section" aria-labelledby="founders-heading">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-block px-edge lg:grid-cols-12 lg:gap-x-gap-x">
        <Reveal className="lg:col-span-4">
          <SectionLabel>{founders.label}</SectionLabel>
          <h2 id="founders-heading" className="display-l mt-5 text-navy">
            {founders.heading}
          </h2>
          <p className="body-l mt-6 text-steel">{founders.body}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-gap-x lg:col-span-7 lg:col-start-6"
          delay={0.08}
        >
          {people.map((person) => (
            <StaggerItem as="li" key={person.name}>
              {/* The notch is cut out of the frame; RainCity Blue sits behind
                  it, exactly as behind a service card's photograph. */}
              <div className="bg-rc-blue">
                {person.photo ? (
                  <Photo
                    name={person.photo}
                    ratio="4:5"
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="card-corner-cut"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`Portrait of ${person.name} to follow`}
                    className="card-corner-cut flex aspect-4/5 items-end bg-navy p-card"
                  >
                    <span
                      aria-hidden="true"
                      className="display-xl leading-none text-pacific"
                    >
                      {person.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* "Co-Founder" is shared by both cards, so it is the quiet
                  line; the job title is what tells the two apart, so it takes
                  the blue eyebrow the role used to have. */}
              <div className="mt-6 border-t border-t-line pt-5">
                <p className="meta text-steel">{person.role}</p>
                <h3 className="display-s mt-1.5 text-navy">{person.name}</h3>
                <p className="eyebrow mt-2 text-rc-blue">{person.title}</p>
                <p className="body-s mt-4 text-steel">{person.bio}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
