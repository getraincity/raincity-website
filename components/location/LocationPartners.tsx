import Link from "next/link";
import { localPartnersFor, locationPage, type Location } from "@/lib/content";
import { shortRowOffsets } from "@/lib/cardGrid";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PartnerCard, panelTint } from "@/components/ui/PartnerCard";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Local Partners — the partners from /about that operate in this community.
 *
 * Asked for by the client alongside Off The Clock ("companies we work with
 * locally"). Nothing here is written per page and nothing is invented: the
 * cards are `localPartnersFor(location)`, which reads `Partner.local` — each
 * partner's OWN published service area or campus list, checked on their own
 * site. The eyebrow says which ("Cleaning · Serves Burnaby", "Post-secondary
 * · Campus in Surrey"), so the geographic claim is visible on the card and is
 * about the partner, not about what RainCity does with them there. A
 * national partner fills a short row and says "Across Canada" instead of
 * pretending to be local.
 *
 * THE CARD IS THE ONE THE CLIENT APPROVED ON /about, imported from
 * `components/ui/PartnerCard.tsx` rather than restyled — same notch, same
 * 1-2-3 tints, same hover. The link under the row goes to that full section.
 *
 * GRID: the site's half-column card grid (`sm:grid-cols-4 lg:grid-cols-6`,
 * cards span two) so a short row centres through `shortRowOffsets`, exactly
 * like NearbyAreas and the service grids.
 *
 * White ground, between the Fog Off The Clock above and the Fog Nearby Areas
 * below. No partners, no section.
 */
export function LocationPartners({ location }: { location: Location }) {
  const cards = localPartnersFor(location);
  if (cards.length === 0) return null;
  const copy = locationPage.localPartners;
  const offsetClasses = shortRowOffsets(cards.length);

  return (
    <section className="bg-white py-section" aria-labelledby="local-partners-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="local-partners-heading" className="display-l mt-5 text-navy">
              {/* The place on its own line, so the break is always "Who We Work
                  With / Around X". Left to wrap, it moved with the length of
                  the city name and split "Work / With" on Delta. */}
              {copy.headingBefore}{" "}
              <span className="block">
                {copy.headingPlace}
                {location.name}
              </span>
            </h2>
          </div>
          <p className="body-l max-w-prose text-steel lg:w-5/12 lg:max-w-none">
            {copy.body}
          </p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-gap-x sm:grid-cols-4 lg:grid-cols-6"
          delay={0.06}
        >
          {cards.map(({ partner, tag, where }, i) => (
            <StaggerItem
              as="li"
              key={partner.name}
              className={cn("sm:col-span-2", offsetClasses(i))}
            >
              <PartnerCard
                partner={partner}
                tag={`${tag} · ${where}`}
                tint={panelTint[i % panelTint.length]}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10" delay={0.08}>
          <Link
            href="/about#partners"
            className="meta group inline-flex items-center gap-2 border-b border-b-line pb-2 text-rc-blue transition-colors duration-200 hover:border-b-rc-blue hover:text-navy focus-visible:border-b-rc-blue"
          >
            {copy.allCta}
            <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
