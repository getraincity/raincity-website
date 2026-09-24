import { awards, partnerships } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PartnerCard, panelTint } from "@/components/ui/PartnerCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Partnerships — partner cards built on the service card's anatomy.
 *
 * WHY THIS SHAPE (2026-09-13). The client's note on the previous version — a
 * grid of logo-and-name cards — was that it said nothing about the companies,
 * and they pointed at the service cards as the thing to learn from: a picture
 * that carries colour, a title, a two-line blurb, and a "View Service" row.
 * So each partner card is that anatomy with the logo standing in for the
 * photograph. The card itself lives in `components/ui/PartnerCard.tsx`, shared
 * with the Local Partners section on the community pages; its anatomy, the
 * 1-2-3 panel tints and the hover are documented there.
 *
 * The blurbs describe the organisations, never the relationship — see the
 * note on `Partner.blurb`.
 *
 * GRID: each sector has three partners, so at lg the 3x3 grid gives each
 * sector its own row. On a tablet it is two across, and the odd ninth card is
 * centred rather than left hanging (four-column track, cards span two, the
 * last odd card starts at column two). One column on a phone, like the
 * service grid.
 *
 * 4px corners (`--radius-card` in globals.css) — the client's "slight"
 * softening, the only card radius on the site.
 *
 * Earlier rejected versions (a ruled register, a strip of nameless tiles,
 * rounded sector panels, a bare logo grid) are in git history.
 *
 * Ground is Fog — the designed sequence, Stats (Fog) → Founders (White) →
 * Partnerships (Fog) → the cut. It was White only while Founders rendered
 * nothing; with the two founders confirmed (2026-09-23) Founders always shows,
 * so this is Fog again and the `SectionEdge` after it runs `from="bg-fog"`.
 * The cards carry their own white ground. Empty groups contribute no cards.
 *
 * `id="partners"` is the target of the "See all our partners" link on the
 * community pages; `scroll-mt-20` clears the sticky header, as on QuoteForm.
 */
export function Partnerships() {
  // Logo or nothing: the standing rule is that a partner is never shown as a
  // name-only card (Touseef, 2026-09-23). All nine carry their own current
  // logo today; a partner added without one waits here until it has one.
  const cards = partnerships.groups.flatMap((group) =>
    group.items
      .filter((partner) => partner.logo)
      .map((partner) => ({ partner, tag: group.tag })),
  );
  // Less any organisation already carded above — CFIB is both one of the
  // partners and one of the memberships, and one page should not show it
  // twice.
  const carded = new Set(cards.map(({ partner }) => partner.name));
  const memberships = awards.memberships.filter(
    (m) => m.logo && !carded.has(m.name),
  );
  if (cards.length === 0 && memberships.length === 0) return null;

  return (
    <section id="partners" className="scroll-mt-20 bg-fog py-section" aria-labelledby="partnerships-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <SectionLabel>{partnerships.label}</SectionLabel>
            <h2 id="partnerships-heading" className="display-l mt-5 text-navy">
              {partnerships.heading}
            </h2>
          </div>
          {/* `lg:w-5/12` rather than a named max-width: the container scale is
              reset in globals.css. */}
          <p className="body-l max-w-prose text-steel lg:w-5/12 lg:max-w-none">
            {partnerships.body}
          </p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-gap-x sm:grid-cols-4 lg:grid-cols-3"
          delay={0.06}
        >
          {cards.map(({ partner, tag }, i) => (
            <StaggerItem
              as="li"
              key={partner.name}
              className="sm:col-span-2 sm:odd:last:col-start-2 lg:col-span-1 lg:odd:last:col-start-auto"
            >
              <PartnerCard partner={partner} tag={tag} tint={panelTint[i % panelTint.length]} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Memberships — added 2026-09-25 at Touseef's instruction, so the
            organisations the homepage lists under Memberships & Partnerships
            are on the company's own page too. Read from `awards.memberships`,
            the homepage's array, never a copy: the two pages cannot list
            different memberships. Same card, same logo-or-nothing rule, same
            grid (six fills two rows of three at `lg`), under a hairline and
            a quiet `meta` heading like the homepage row, so it reads as a
            second group of this section rather than a new section. */}
        {memberships.length > 0 && (
          <>
            <Reveal className="mt-block flex items-center gap-5 border-t border-t-line pt-block">
              <h3 className="meta text-steel">{awards.membershipsLabel}</h3>
            </Reveal>
            <Stagger
              as="ul"
              className="mt-8 grid grid-cols-1 gap-gap-x sm:grid-cols-4 lg:grid-cols-3"
              delay={0.06}
            >
              {memberships.map((m, i) => (
                <StaggerItem
                  as="li"
                  key={m.name}
                  className="sm:col-span-2 sm:odd:last:col-start-2 lg:col-span-1 lg:odd:last:col-start-auto"
                >
                  <PartnerCard partner={m} tag={m.tag} tint={panelTint[i % panelTint.length]} />
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}
      </div>
    </section>
  );
}
