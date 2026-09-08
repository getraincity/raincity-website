import type { Faq } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import { FaqAccordion } from "@/components/service/FaqAccordion";

/**
 * The questions section, for a page that is not a service or a community.
 *
 * `ServiceFaq` and `LocationFaq` are the same block with their content
 * already decided for them — one reads `service.detail.faqs`, the other
 * reads `location.detail.faqs`. This is the third case: the five pages above
 * those templates, which had no questions on them at all.
 *
 * That gap was worth closing for one specific reason. The service and
 * location templates between them publish the great majority of this site's
 * structured question-and-answer content, and both sit one level *below* the
 * pages a broad question actually lands on — "who does strata exterior
 * maintenance in Greater Vancouver" reaches the homepage or /services long
 * before it reaches /services/gutter-cleaning. Those were the pages with
 * nothing machine-readable on them to answer it.
 *
 * Deliberately a parameterised copy of `ServiceFaq` rather than a
 * generalisation of it. The two could be merged — the markup is nearly
 * identical — but `ServiceFaq` carries a sticky heading column tuned against
 * a page that always has a quote form directly above it, and these five
 * pages do not all share that. A shared component would have to grow a prop
 * for the difference, and a prop that exists to describe where a component is
 * being used is the beginning of a component that knows about its callers.
 *
 * Renders nothing without questions, exactly as the other two do.
 */
export function PageFaq({
  label,
  heading,
  body,
  faqs,
  id = "page-faq-heading",
}: {
  label: string;
  heading: string;
  body: string;
  faqs: readonly Faq[];
  /** Unique per page, because more than one section per page carries one. */
  id?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="bg-fog py-section-sm" aria-labelledby={id}>
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-x-gap-x gap-y-block lg:grid-cols-12">
          {/* Sticky on the wrapper rather than on the Reveal, for the reason
              written out in ServiceFaq: `self-start` is what gives a stretched
              grid child room to move in, and keeping the sticky off the
              animated element means the transform and the offset never have to
              agree about anything. */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionLabel bar="blue">{label}</SectionLabel>
              <h2 id={id} className="display-l mt-5 text-navy">
                {heading}
              </h2>
              <p className="body-base mt-5 text-steel">{body}</p>
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
