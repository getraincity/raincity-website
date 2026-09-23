import { testimonials } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, Star } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import {
  TestimonialsCarousel,
  type TestimonialItem,
} from "@/components/home/TestimonialsCarousel";

/**
 * The testimonials section — server half.
 *
 * The heading block and the Google summary are static, so they stay here and
 * never reach the browser as JavaScript. Only the carousel needs state, and it
 * takes the reviews as props: this file used to carry `"use client"` and
 * `import { testimonials } from "@/lib/content"`, which shipped the whole
 * content module — every service, location and blog article — to the browser.
 *
 * THE GOOGLE SUMMARY (2026-09-23). The rating and count sit beside the
 * heading with the month they were read, and link to the listing itself —
 * where a reader can check them, which is the only thing that makes a number
 * like "5.0" worth printing. It is shown to people and deliberately NOT marked
 * up as an aggregate rating; the reason is on `averageRating` in content.ts.
 * The link opens in a new tab and is not `nofollow`: it is the company's own
 * listing.
 */
export function Testimonials() {
  // Optional fields cannot cross the server/client boundary as "absent", so
  // they are normalised to null here, once.
  const items: TestimonialItem[] = testimonials.items.map((item) => ({
    quote: item.quote,
    name: item.name,
    place: item.place ?? null,
    source: item.source ?? null,
    stars: item.stars ?? null,
    service: item.service ?? null,
  }));
  const g = testimonials.google;

  return (
    <section className="bg-white py-section" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-site px-edge">
        {/* Heading only. The track below is a native scroll-snap carousel and
            already owns its own transition — a second animation layered on it
            would fight the browser's scrolling for the same pixels. */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-prose">
            <SectionLabel>{testimonials.label}</SectionLabel>
            <h2 id="testimonials-heading" className="display-l mt-5 text-navy">
              {testimonials.headline}
            </h2>
          </div>

          <div className="shrink-0 border-l-3 border-l-amber pl-5">
            <p className="flex items-center gap-3">
              <span className="display-m text-navy">{g.rating}</span>
              <span className="flex items-center gap-0.5 text-amber-ink" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4" />
                ))}
              </span>
            </p>
            <p className="meta mt-2 text-steel">
              <span className="sr-only">Rated {g.rating} out of 5 from </span>
              {g.count} Google reviews · {g.checked}
            </p>
            <a
              href={g.url}
              target="_blank"
              rel="noopener"
              className="meta group mt-3 inline-flex items-center gap-2 text-rc-blue transition-colors hover:text-navy"
            >
              Read them on Google
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
