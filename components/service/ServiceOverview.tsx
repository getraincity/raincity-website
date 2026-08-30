import { business, servicePage, type Service } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Check, Phone } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The substance of the page: what the work actually covers, beside the
 * standing reasons to hand it to this company.
 *
 * The content inventory has "Why Choose RainCity?" and the "call us" prompt
 * inside this section rather than in one of their own, and that is the right
 * read — they are the aside to the scope, not a claim big enough to hold a
 * band. They sit in a Fog panel in the narrow column, identical on all eleven
 * pages, while the column that changes carries the description, the scope and
 * the CTA.
 *
 * The scope list takes a check mark, which is the one place on this site an
 * icon sits beside every line of a list. It is not decoration: the heading
 * above it asks what is included, and a check is the answer to that question
 * repeated. Compare the trust panel below it, where the claims are separated
 * by hairlines and carry no glyph at all — nothing there would be saying
 * anything a mark could say for it.
 */
export function ServiceOverview({ service }: { service: Service }) {
  const { trust } = servicePage.overview;

  return (
    <section className="bg-white py-section" aria-labelledby="overview-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>{servicePage.overview.label}</SectionLabel>

              <h2 id="overview-heading" className="display-l mt-5 text-navy">
                {service.detail.overviewHeading}
              </h2>

              <p className="body-l mt-6 text-steel">
                {service.detail.overview}
              </p>
            </Reveal>

            <Reveal className="mt-block" delay={0.08}>
              <h3 className="meta text-rc-blue">
                {servicePage.overview.includedLabel}
              </h3>
            </Reveal>

            {/* Two columns from sm. The amber rule opens the list and the
                hairline under each row closes it, so the set reads as a
                specification rather than as bullets floating in white. */}
            <Stagger
              as="ul"
              className="mt-5 grid grid-cols-1 gap-x-gap-x border-t-3 border-t-amber sm:grid-cols-2"
              step={0.05}
              delay={0.12}
            >
              {service.detail.included.map((item) => (
                <StaggerItem
                  as="li"
                  key={item}
                  className="flex items-start gap-3 border-b border-b-line py-4"
                >
                  <Check className="mt-1 shrink-0 text-rc-blue" />
                  <span className="body-base text-navy">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10" delay={0.1}>
              <Button href="#quote">{service.detail.cta}</Button>
            </Reveal>
          </div>

          {/* The fixed half. Identical on every service page — see the note on
              `servicePage` in content.ts for why each of these five claims is
              one this site already makes somewhere else. */}
          <Reveal
            as="div"
            className="lg:col-span-4 lg:col-start-9"
            delay={0.16}
          >
            <div className="bg-fog p-8">
              <h3 className="display-s text-navy">{trust.title}</h3>

              <ul className="mt-6">
                {trust.points.map((point, i) => (
                  <li
                    key={point}
                    className={
                      i === 0
                        ? "body-s pb-4 text-steel"
                        : "body-s border-t border-t-line py-4 text-steel last:pb-0"
                    }
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {/* The low-friction fallback the inventory asks for: the reader
                  who has read the scope and would simply rather talk. */}
              <div className="mt-8 border-t-3 border-t-amber pt-6">
                <p className="meta text-steel">{trust.callPrompt}</p>
                <a
                  href={business.phoneHref}
                  className="display-s mt-3 inline-flex items-center gap-3 text-rc-blue transition-colors duration-200 hover:text-navy"
                >
                  <Phone className="shrink-0" />
                  {business.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
