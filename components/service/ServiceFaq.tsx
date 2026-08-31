import { servicePage, type Service } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import { FaqAccordion } from "@/components/service/FaqAccordion";

/**
 * The questions, last before the footer.
 *
 * Placed after the quote form rather than before it. Everything above this
 * point on the page is an argument for booking, and the form is where that
 * argument lands; the FAQ is for the reader who scrolled past it with a
 * specific doubt, and it belongs after the ask rather than in front of it.
 *
 * Split 4 / 7 with the heading column sticky from lg. The section is a long
 * ruled list and nothing else, so the reader loses the context of what they
 * are reading a third of the way down it; holding the heading in view is
 * cheaper than repeating it. Below lg the column simply stacks and the sticky
 * never engages, which is correct — a sticky block on a phone is a block
 * taking up a phone.
 *
 * Fog, and no accent surface. The page above it has already spent a RainCity
 * Blue band, six washed tiles in three tones, three washed step cards and an
 * amber wedge, and the footer under it is navy. A seventh coloured block here
 * would be one too many; the colour in this section is on the open row and
 * the hover, where it means something.
 *
 * Returns null when the service has no questions written — see `Faq` in
 * content.ts. All eleven carry a set today, so every service page ends here
 * rather than at the quote form; the guard stays for the twelfth service, on
 * the day it is added and before its copy exists.
 */
export function ServiceFaq({ service }: { service: Service }) {
  const faqs = service.detail.faqs;
  if (!faqs?.length) return null;

  return (
    /* pt-12 rather than a full section pad: the quote form above closes on
       96px of its own, and the two together would put a third of a screen of
       empty ground between the form and this heading. */
    <section className="bg-fog pt-12 pb-section-sm" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          {/* Sticky on the wrapper, not on the Reveal: `self-start` is what
              gives a stretched grid child the room to move within, and
              keeping it off the animated element means the transform and the
              sticky offset never have to agree about anything. top-28 clears
              the sticky header, which is what `scroll-mt-20` on the quote
              form is already measured against. */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionLabel bar="blue">{servicePage.faq.label}</SectionLabel>
              <h2 id="faq-heading" className="display-l mt-5 text-navy">
                {servicePage.faq.headline}
              </h2>
              <p className="body-base mt-5 text-steel">
                {servicePage.faq.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
