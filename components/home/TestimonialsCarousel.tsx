"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowLeft, ArrowRight, Star } from "@/components/ui/Icon";

/**
 * One review, flattened for the boundary.
 *
 * Every optional field is `string | null` (or `number | null`) rather than
 * optional, because "absent" does not survive serialization reliably; the
 * server normalises once. A null means the source does not state it — a Google
 * review records no city, and no review records what was bought — and it will
 * not be guessed at.
 */
export type TestimonialItem = {
  quote: string;
  name: string;
  place: string | null;
  source: string | null;
  stars: number | null;
  service: string | null;
};

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
 *
 * The reviews arrive as props. Importing `testimonials` from `@/lib/content`
 * here would pull the entire content module — services, locations, blog and
 * all — into the client bundle, because `nav` in that file is derived from two
 * of those arrays. The section heading above stays on the server for the same
 * reason.
 */
export function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /**
   * Long reviews are clamped to five lines (`review-clamp`) so every card is
   * the same height with no dead space under a short one. Which reviews are
   * actually cut off depends on the card width, so it is measured, not
   * guessed from a character count: `truncated[i]` is true when quote i
   * overflows its five lines at the current width. `open` holds the cards a
   * reader has expanded.
   */
  const quoteRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [truncated, setTruncated] = useState<boolean[]>([]);
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());

  const measure = useCallback(() => {
    setTruncated(
      quoteRefs.current.map((el) =>
        el ? el.scrollHeight > el.clientHeight + 1 : false,
      ),
    );
  }, []);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

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
    measure();
    const el = trackRef.current;
    if (!el) return;
    // Slide widths are percentages, so every resize moves the snap points —
    // and changes where a quote's fifth line ends, so re-measure with it.
    const observer = new ResizeObserver(() => {
      sync();
      measure();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync, measure]);

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
    <>
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
          // `items-start`, not the default stretch: every closed card is
          // already the same height (five reserved lines of quote, a fixed
          // caption), so stretching only ever mattered when one was opened —
          // and then it padded every neighbour with the dead space this
          // layout exists to remove. Now an opened review grows on its own.
          "no-scrollbar mt-block -mx-edge flex items-start snap-x snap-mandatory gap-x-gap-x",
          "scroll-px-edge overflow-x-auto scroll-smooth px-edge",
        )}
      >
        {items.map((item, i) => {
          const service = item.service;
          const isOpen = open.has(i);
          // Shown for a quote that is cut off, and kept while it is open so
          // it can be closed again (an open quote no longer overflows).
          const canToggle = isOpen || truncated[i];
          return (
            <li
              key={item.name}
              className="w-slide shrink-0 snap-start sm:w-slide-sm lg:w-slide-lg"
            >
              {/* `relative` is load-bearing. The stars carry an `sr-only`
                  label, which is absolutely positioned; with no positioned
                  ancestor inside the scroll track it anchors to the page and
                  escapes the track's clipping, and the off-screen cards'
                  labels widened the whole document by ~270px on a phone.
                  Measured, and fixed here, on 2026-09-23. */}
              <figure className="relative flex h-full flex-col bg-fog p-7">
                {/* Stars where the review carries a rating, the amber rule
                    where it does not — the same slot either way, so the quote
                    starts on one line across the row. */}
                {item.stars ? (
                  <p className="flex h-4 items-center gap-0.5 text-amber-ink">
                    {Array.from({ length: item.stars }, (_, i) => (
                      <Star key={i} className="size-4" />
                    ))}
                    <span className="sr-only">{item.stars} out of 5 stars</span>
                  </p>
                ) : (
                  <span aria-hidden="true" className="flex h-4 items-center">
                    <span className="block h-hairline w-label-bar bg-amber" />
                  </span>
                )}
                {/* Five lines, held (`review-clamp`), so every card is the
                    same height and none carries dead space. The quote stays
                    whole in the HTML — only its display is clamped — so
                    crawlers and screen readers get the full review. */}
                <blockquote className="mt-6">
                  <p
                    id={`review-${i}`}
                    ref={(el) => {
                      quoteRefs.current[i] = el;
                    }}
                    // `whitespace-pre-line` keeps the reviewer's own paragraph
                    // breaks (`\n` in the data) and still wraps normally.
                    className={cn("body-base whitespace-pre-line text-navy", !isOpen && "review-clamp")}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
                {/* The toggle's line is always reserved and only made
                    visible once a quote is measured as cut off, so nothing
                    moves when the script arrives: `invisible` keeps the box
                    and removes it from focus and from screen readers. */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`review-${i}`}
                  className={cn(
                    "meta mt-3 self-start text-rc-blue transition-colors hover:text-navy",
                    !canToggle && "invisible",
                  )}
                >
                  {isOpen ? "Show less" : "Read more"}
                  <span className="sr-only"> of {item.name}&rsquo;s review</span>
                </button>
                {/* Name, then one line: "Google review" or the city. Every
                    review carries exactly those two, so the caption needs no
                    reserved height — it used to hold 96px for a third
                    (service) line no real review has, which left a band of
                    empty card under every name. If a review ever arrives with
                    a service, reserve that line here for all cards. */}
                <figcaption className="mt-5 border-t border-t-line pt-5">
                  <p className="display-s text-navy">{item.name}</p>
                  <p className="meta mt-1.5 text-steel">
                    {item.source ? `${item.source} review` : item.place}
                  </p>
                  {service && <p className="meta mt-1 text-rc-blue">{service}</p>}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ol>
      </div>

      {/* Controls — position left, arrows right.

          Dots from `sm` up; a "3 / 14" counter on phones. Fourteen dots and
          two arrows need ~360px, and a phone's column is 335px — the row
          pushed the whole page sideways once the Google reviews arrived.
          The counter carries the same information in a fixed width however
          many reviews there are. */}
      <div className="mt-8 flex items-center justify-between gap-6">
        <p className="meta text-steel sm:hidden" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <ul className="hidden items-center gap-2 sm:flex">
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
    </>
  );
}
