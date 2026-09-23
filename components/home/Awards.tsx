import Image from "next/image";
import { awards, social } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PartnerCard, panelTint } from "@/components/ui/PartnerCard";
import { Check, SocialIcon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/** Memberships with a logo on file — the only ones shown. See the row below. */
const shownMemberships = awards.memberships.filter((m) => m.logo);

/**
 * `lg` columns by count, as whole literal class strings (the scanner never
 * sees a constructed one). Four across for four, three across for five or
 * six — which is two full rows at six.
 */
const membershipColumns: Record<number, string> = {
  1: "lg:grid-cols-1 lg:max-w-sm",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Awards & Recognition.
 *
 * One credential is the headline and the memberships support it. The Canadian
 * Choice Award takes an oversized plate on the right of the section — the
 * same copy-left / evidence-right grammar the rest of the page uses — sized
 * to fill the column beside the copy, with the Memberships & Partnerships
 * cards running underneath at a fraction of the weight. The ranking is
 * legible before a word is read.
 *
 * The row under it held four stock badges until 2026-09-23; the reasoning for
 * the cards that replaced them is at the row itself, and the list is
 * `awards.memberships` in content.ts.
 *
 * Nothing here is rounded: the system resets `--radius-*` and takes no radius
 * on any card, field or panel.
 */
export function Awards() {
  return (
    <section className="bg-fog py-section" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <SectionLabel>{awards.label}</SectionLabel>
            <h2 id="awards-heading" className="display-l mt-5 text-navy">
              {awards.headline}
            </h2>
            <p className="body-l mt-6 text-steel">{awards.body}</p>

            <ul className="mt-8">
              {awards.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border-b border-b-line py-3 last:border-b-0"
                >
                  <Check className="mt-1 shrink-0 text-amber-ink" />
                  <span className="body-s text-steel">{point}</span>
                </li>
              ))}
            </ul>

            {/* Only render the Follow row when at least one profile URL is
                real. Placeholder "#" links scroll to page top and look like
                active destinations — better to hide the row entirely until
                the client supplies the actual profile URLs. */}
            {social.some((s) => s.href !== "#") && (
              <div className="mt-8 flex items-center gap-5">
                <p className="meta text-steel">Follow</p>
                <ul className="-mx-2 flex items-center">
                  {social.map((s) =>
                    s.href !== "#" ? (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          aria-label={s.label}
                          className="inline-flex size-11 items-center justify-center text-rc-blue transition-colors hover:text-navy"
                        >
                          <SocialIcon name={s.icon} />
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}
          </Reveal>

          {/* The anchor. 2px navy outline marks it as the primary credential;
              the supporting cards below take a hairline instead. */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <div className="flex h-full flex-col items-center justify-center gap-8 border-2 border-navy bg-white p-8 text-center sm:gap-10 sm:p-10">
              <Image
                src={awards.badge.src}
                alt={awards.badge.alt}
                width={awards.badge.width}
                height={awards.badge.height}
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 208px"
                className="h-auto w-52 shrink-0 sm:w-64 lg:w-72"
                priority={false}
              />
              <div className="max-w-prose">
                <p className="meta text-rc-blue">{awards.badge.kicker}</p>
                <h3 className="display-m mt-3 text-navy">{awards.badge.title}</h3>
                <p className="body-s mt-4 text-steel">{awards.badge.body}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Memberships & Partnerships — the client's list, replacing four
            stock badges (2026-09-23).

            `PartnerCard`, the /about partner card, so the logo leads: people
            recognise these organisations by their marks. ONLY ENTRIES WITH A
            LOGO RENDER — the standing rule is no name-only cards, so an
            organisation still waiting for its file stays in content.ts and
            appears here the day `logo` is set, with no change to this file.

            Column count follows the number shown, so the grid never strands
            one card on a row of its own. */}
        <Reveal as="h3" className="meta mt-14 text-steel">
          {awards.membershipsLabel}
        </Reveal>
        <Stagger
          as="ul"
          className={cn(
            "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6",
            membershipColumns[shownMemberships.length] ?? "lg:grid-cols-3",
          )}
        >
          {shownMemberships.map((m, i) => (
            <StaggerItem as="li" key={m.name}>
              <PartnerCard
                partner={m}
                tag={m.tag}
                tint={panelTint[i % panelTint.length]}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
