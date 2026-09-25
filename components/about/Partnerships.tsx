import { partnerships } from "@/lib/content";
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
 * THE MEMBERSHIPS ROW WAS REMOVED (2026-09-25). For one round it sat under
 * these cards, repeating the homepage's Memberships & Partnerships; the
 * client asked for it off /about because the homepage already carries it.
 * Memberships live on the homepage only (`Awards.tsx`).
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
  if (cards.length === 0) return null;

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
      </div>
    </section>
  );
}
