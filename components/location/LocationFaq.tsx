import { locationPage, type Location } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import { FaqAccordion } from "@/components/service/FaqAccordion";

/**
 * The questions, written for this community.
 *
 * `FaqAccordion` is imported from the service template rather than copied —
 * it is a ruled list with one row open at a time, a CSS grid height
 * animation and a closed panel that stays readable to a crawler while being
 * `inert` to a keyboard, and none of that should exist twice on one site. It
 * lives under components/service/ because that is where it was written; it
 * takes a `Faq[]` and knows nothing about services, so it moves here without
 * a change.
 *
 * The layout is the service page's too: 4 / 7 with the heading column sticky
 * from lg, because the section is a long ruled list and the reader loses the
 * context of what they are reading a third of the way down it. Below lg the
 * column stacks and the sticky never engages, which is right — a sticky
 * block on a phone is a block taking up a phone.
 *
 * What is different is the copy, and it is the point of the section. All five
 * questions on each of the nine pages are written for that community: whether
 * Pitt Meadows is included in Ridge Meadows, what a steep Anmore driveway
 * means for access, how high the pole reaches on Burnaby's five-storey stock,
 * whether being based in New Westminster makes it cheaper. Nine copies of one
 * question set would have been the doorway-page pattern in the one part of
 * the page that also goes out as structured data.
 *
 * Placed after the quote form for the same reason it is on a service page:
 * everything above is an argument for booking and the form is where that
 * argument lands. The FAQ is for the reader who scrolled past it holding a
 * specific doubt, and it belongs after the ask rather than in front of it.
 *
 * Returns null when a community has no questions written. All nine carry a
 * set, so the guard is for the tenth on the day it is added and before its
 * copy exists — and the matching check on the page keeps the FAQPage node
 * and this section from ever disagreeing about whether a route has one.
 */
export function LocationFaq({ location }: { location: Location }) {
  const faqs = location.detail.faqs;
  if (!faqs?.length) return null;

  return (
    /* pt-12 rather than a full section pad: the quote form above closes on
       96px of its own, and the two together would put a third of a screen of
       empty ground between the form and this heading. */
    <section
      className="bg-fog pt-12 pb-section-sm"
      aria-labelledby="location-faq-heading"
    >
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          {/* Sticky on the wrapper, not on the Reveal: `self-start` is what
              gives a stretched grid child room to move within, and keeping it
              off the animated element means the transform and the sticky
              offset never have to agree about anything. top-28 clears the
              sticky header. */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionLabel bar="blue">{locationPage.faq.label}</SectionLabel>
              <h2
                id="location-faq-heading"
                className="display-l mt-5 text-navy"
              >
                {locationPage.faq.headingBefore}
                {location.name}
              </h2>
              <p className="body-base mt-5 text-steel">
                {locationPage.faq.body}
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
