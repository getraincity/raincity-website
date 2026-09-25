import { aboutPage, business } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CheckPlate, WhatsApp } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Supporting Our Community — the client's special pricing for seniors, people
 * with disabilities, single parents, veterans, healthcare workers, first
 * responders and teachers (added 2026-09-23).
 *
 * A RainCity Blue band, in the grammar of the service pages' "Why Choose
 * RainCity?" band: the argument and the button on the left, the list on the
 * right, each item on the site's own check plate in white (Pacific Blue
 * measures about 2:1 on this ground). It is an offer, so it gets the page's
 * only blue band — distinct from Mission's navy above it and from the white
 * and Fog sections around it, which is what makes it read as the thing to
 * act on rather than as more about-us copy.
 *
 * Placed after Process and before Home Ground, so the page runs: how a job
 * works → who gets special pricing → where we are → the quote form. The
 * amber button goes to that form; the outline one calls.
 *
 * THE DISCLAIMER IS PART OF THE OFFER, not small print to be trimmed for
 * looks. It is the client's own wording and sits under a hairline across the
 * full width, in body type rather than uppercase meta so it can actually be
 * read. It must never be removed while the offer stands.
 */
export function CommunitySupport() {
  const c = aboutPage.community;

  return (
    <section className="on-navy bg-rc-blue py-section" aria-labelledby="community-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionLabel tone="blue">{c.label}</SectionLabel>
            <h2 id="community-heading" className="display-l mt-5 text-white">
              {c.heading}
            </h2>
            <p className="body-l mt-6 text-mist">{c.body}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button href="#quote">{c.cta}</Button>
              <Button href={business.whatsappHref} variant="tertiary-invert" aria-label={business.whatsappLabel}>
                <WhatsApp className="shrink-0" />
                {business.phone}
              </Button>
            </div>
          </Reveal>

          <Stagger
            as="ul"
            className="grid grid-cols-1 content-start gap-x-gap-x gap-y-6 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:self-center"
            step={0.05}
            delay={0.06}
            aria-label="Who the special pricing is for"
          >
            {c.groups.map((group) => (
              <StaggerItem as="li" key={group} className="flex items-start gap-4">
                <CheckPlate className="mt-0.5 shrink-0 text-white" />
                <span className="body-base font-medium text-white">{group}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-block border-t border-t-white/25 pt-6">
          <p className="eyebrow text-white">{c.disclaimerLabel}</p>
          <p className="body-s mt-2 max-w-prose text-mist">{c.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
