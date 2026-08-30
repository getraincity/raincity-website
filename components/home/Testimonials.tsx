"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * Testimonials — a scroll-snap carousel.
 *
 * Built on native CSS scroll-snap rather than a carousel package: nothing in
 * package.json does this already, and the browser's own scrolling supplies
 * touch, trackpad, wheel and momentum for free and correctly on every device.
 * The script below only drives the arrows and dots and reads the position back
 * out — it never animates anything itself, so if JavaScript fails to load this
 * degrades to a plain horizontally scrollable row rather than a dead widget.
 *
 * Slide widths are set so a slice of the next card always shows at the right
 * edge: three cards and a peek at desktop, two at tablet, one on a phone.
 *
 * The dot marks the leftmost visible review, which is the position the arrows
 * step through. Scrolled hard right at desktop the leftmost card is the
 * fourth, so the last two dots read as destinations rather than ever lighting
 * up; every dot is still clickable and lands where it says it will.
 */

const items = testimonials.items;

export function Testimonials() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Read the carousel's position back out of the DOM after any scroll. */
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    if (slides.length === 0) return;

    const base = slides[0].offsetLeft;
    let nearest = 0;
    let best = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - base - el.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });

    setIndex(nearest);
    // A pixel of slack: fractional scroll offsets never land exactly on zero.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    // Slide widths are percentages, so every resize moves the snap points.
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const goTo = useCallback((target: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const slide = slides[Math.max(0, Math.min(target, slides.length - 1))];
    if (!slide) return;
    el.scrollTo({
      left: slide.offsetLeft - slides[0].offsetLeft,
      // Honours the same reduced-motion preference the stylesheet does.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  /** Arrow keys step one review rather than free-scrolling the container. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(index + (event.key === "ArrowRight" ? 1 : -1));
  };

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
        </Reveal>

        {/* The track bleeds to the container edges so the peeking card runs
            off the side, while the scroll padding keeps a snapped card lined
            up with the heading above it. */}
        {/* The region lives on the wrapper, not on the <ol>. An explicit
            role replaces an element's implicit one, so `role="region"` on the
            list stopped it being a list and left all six slides reported as
            orphan <li> elements. The wrapper has no styles of its own — this
            is a semantics change, not a layout one. */}
        <div
          role="region"
          aria-label={`Customer reviews, ${items.length} items, scrollable`}
        >
        <ol
          ref={trackRef}
          onScroll={sync}
          onKeyDown={onKeyDown}
          tabIndex={0}
          className={cn(
            "no-scrollbar mt-block -mx-edge flex snap-x snap-mandatory gap-x-gap-x",
            "scroll-px-edge overflow-x-auto scroll-smooth px-edge",
          )}
        >
          {items.map((item) => {
            // Only the placeholder reviews carry a service. The two real ones
            // do not record what was bought, and it will not be guessed at.
            const service = "service" in item ? item.service : null;
            return (
              <li
                key={item.name}
                className="w-slide shrink-0 snap-start sm:w-slide-sm lg:w-slide-lg"
              >
                <figure className="flex h-full flex-col bg-fog p-7">
                  <span
                    aria-hidden="true"
                    className="block h-hairline w-label-bar shrink-0 bg-amber"
                  />
                  <blockquote className="mt-6 grow">
                    <p className="body-l text-navy">&ldquo;{item.quote}&rdquo;</p>
                  </blockquote>
                  {/* Fixed height so the rule above the attribution lands on
                      the same line in every card. Two of the six carry no
                      service, and without this their divider rode ~20px
                      higher than its neighbours' across the visible row.
                      96px clears the tallest caption — name, place and
                      service, each on one line — at every width where more
                      than one card is on screen at a time. */}
                  <figcaption className="mt-7 min-h-24 border-t border-t-line pt-5">
                    <p className="display-s text-navy">{item.name}</p>
                    <p className="meta mt-1.5 text-steel">{item.place}</p>
                    {service && <p className="meta mt-1 text-rc-blue">{service}</p>}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
        </div>

        {/* Controls — dots left, arrows right. */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <ul className="flex items-center gap-2">
            {items.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show review ${i + 1} of ${items.length}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "block h-2 rounded-full transition-all duration-250 ease-out",
                    i === index ? "w-7 bg-rc-blue" : "w-2 bg-line hover:bg-muted",
                  )}
                />
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={atStart}
              aria-label="Previous review"
              className={cn(
                "flex size-11 items-center justify-center border-2 border-navy text-navy",
                "transition-colors duration-200 hover:bg-navy hover:text-white",
                "disabled:pointer-events-none disabled:border-line disabled:text-muted",
              )}
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={atEnd}
              aria-label="Next review"
              className={cn(
                "flex size-11 items-center justify-center border-2 border-navy text-navy",
                "transition-colors duration-200 hover:bg-navy hover:text-white",
                "disabled:pointer-events-none disabled:border-line disabled:text-muted",
              )}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
