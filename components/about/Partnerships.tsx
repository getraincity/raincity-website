import Image from "next/image";
import { partnerships } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Partnerships.
 *
 * Added at the client's request. The names are theirs and are listed on
 * `partnerships` in content.ts, along with the two things about them that are
 * not settled — what each relationship actually is, and how two of the names
 * are spelled.
 *
 * GROUPED, NOT ONE STRIP, and that is the substance of the section rather than
 * a layout preference. A single undifferentiated row of marks makes the same
 * implied claim about every name in it, and the strongest available reading of
 * "who we work with" is "these are our customers". Splitting it means a
 * university that runs a member programme and a cleaning company that swaps
 * referrals are not both silently presented as clients. An empty group is
 * skipped rather than printed as a bare heading, so the four groups fill one
 * at a time and in any order — which matters, because one of them is empty on
 * purpose and is meant to stay visible as a gap in the data rather than in the
 * page.
 *
 * NO LOGO FILE EXISTS FOR ANY OF THESE YET, and the section ships anyway. Each
 * partner renders as its name set in the site's own type inside the plate that
 * would otherwise hold the mark. That is honest, it needs no trademark asset
 * from anybody, and it reads as a deliberate list rather than as a row of
 * broken images. `Partner.logo` is optional, so a real file drops in per
 * partner with no change here — and the two states can coexist while the logos
 * arrive one at a time.
 *
 * The plates are the same answer `Awards` reached for the credential badges,
 * and for the same reason. Marks from a dozen different houses will never
 * agree on colour, weight or aspect ratio, and restyling artwork this company
 * does not own is not an option — so an identical plate and identical type do
 * the unifying, and the container carries the consistency rather than the
 * artwork. Fog plates on white, the same way round as Awards.
 *
 * WHITE, AND THAT IS LOAD-BEARING RATHER THAN TASTE. Founders sits directly
 * above and renders nothing while it has no people, so this band has two
 * neighbours depending on the day: Founders when it is filled, Stats when it
 * is not. Stats is Fog, so a Fog ground here merged the two into one band the
 * moment Founders was empty — which is the state that ships first. White works
 * against both, needs no condition, and does not invert the day the founder
 * data lands. It is also why the `SectionEdge` below now cuts out of white:
 * this section is what it cuts out of, in either state.
 *
 * Flex-wrap rather than a grid. These are wordmarks of wildly different
 * lengths — "SA Cleaning" against "Kwantlen Polytechnic University" — and a
 * rigid grid would either shrink the long ones or strand the short ones in a
 * lot of white space. Wrapping plates size to their content and stay tidy at
 * every width, and they behave the same once real logos replace the type.
 *
 * Fog and `py-section-sm`. It is a supporting band rather than a full section:
 * it sits under the founders, who are the substance, and above the cut into
 * Mission. Running it at full section height would give a list of names the
 * same weight as the people.
 */
export function Partnerships() {
  // Groups with nothing in them are dropped before anything renders, so an
  // empty section never reaches the page and `partnerships.groups` can be
  // extended without touching this file.
  const groups = partnerships.groups.filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;

  return (
    <section
      className="bg-white py-section-sm"
      aria-labelledby="partnerships-heading"
    >
      <div className="mx-auto grid max-w-site grid-cols-1 gap-y-block px-edge lg:grid-cols-12 lg:gap-x-gap-x">
        {/* Heading left, the marks right — the same label-and-evidence split
            Awards and PageFaq use. Run full width the groups hug the left edge
            and leave roughly half the band empty, because wrapped plates size
            to their content and nine short names do not reach 1440px. */}
        <Reveal className="lg:col-span-4">
          <SectionLabel>{partnerships.label}</SectionLabel>
          <h2 id="partnerships-heading" className="display-l mt-5 text-navy">
            {partnerships.heading}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-10 lg:col-span-7 lg:col-start-6">
          {groups.map((group) => (
            <Reveal key={group.label} delay={0.08}>
              {/* The group name is the claim, so it is a real heading in the
                  outline rather than a styled paragraph. `meta` keeps it well
                  under the h2 above it. */}
              <h3 className="meta text-steel">{group.label}</h3>

              <Stagger as="ul" className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <StaggerItem
                    as="li"
                    key={item.name}
                    className="flex min-h-16 items-center border border-line bg-fog px-6 py-4"
                  >
                    {item.logo ? (
                      <Image
                        src={item.logo.src}
                        alt={item.logo.alt}
                        width={item.logo.width}
                        height={item.logo.height}
                        sizes="200px"
                        className="h-8 w-auto object-contain sm:h-10"
                      />
                    ) : (
                      <span className="body-s font-medium text-navy">
                        {item.name}
                      </span>
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
