import { testimonials } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import {
  TestimonialsCarousel,
  type TestimonialItem,
} from "@/components/home/TestimonialsCarousel";

/**
 * The testimonials section — server half.
 *
 * The heading block and the placeholder notice are static, so they stay here
 * and never reach the browser as JavaScript. Only the carousel needs state,
 * and it takes the reviews as props: this file used to carry `"use client"`
 * and `import { testimonials } from "@/lib/content"`, which shipped the whole
 * content module — every service, location and blog article — to the browser
 * for six quotes.
 */
export function Testimonials() {
  // `service` is optional on a review and `in` cannot survive the server/client
  // boundary, so the test happens here and the field is normalised to null.
  // Neither review carries one today — see the note on `items` in content.ts.
  // `"service" in item` narrows to `unknown`, not `string`, because no member
  // of the literal union declares the key at all — the cast is safe because
  // the only field ever named `service` in this source is a string.
  const items: TestimonialItem[] = testimonials.items.map((item) => ({
    quote: item.quote,
    name: item.name,
    place: item.place,
    service: "service" in item ? (item.service as string) : null,
  }));

  return (
    <section className="bg-white py-section" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Heading only. The track below is a native scroll-snap carousel and
            already owns its own transition — a second animation layered on it
            would fight the browser's scrolling for the same pixels. */}
        <Reveal className="max-w-prose">
          <SectionLabel>{testimonials.label}</SectionLabel>
          <h2 id="testimonials-heading" className="display-l mt-5 text-navy">
            {testimonials.headline}
          </h2>
          {/* No disclaimer any more, and nothing conditional to render one.
              It said some entries were "representative examples", which was
              true of four of the six; those four were invented and have been
              removed rather than replaced. Every quote below is a real
              customer.

              The condition that used to gate this note tested whether any
              review carried a `service` field — a proxy for "is a placeholder",
              because only the invented ones had one. That was quietly fragile:
              the first real review that arrived with a service attached would
              have put the disclaimer back over genuine testimonials. Deleted
              along with the note it gated. */}
        </Reveal>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
