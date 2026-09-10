"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icon";

/**
 * One partner, flattened for the boundary — mirrors `TestimonialItem` in
 * `TestimonialsCarousel.tsx`. Passed as a prop rather than imported from
 * `content.ts` here, for the reason every client component on this site does
 * that: `partnerships` is one field away from `nav`, which is built from
 * `services` and `locations`, and importing any one value out of `content.ts`
 * drags the whole module into the client bundle. `Partnerships.tsx` stays the
 * server component that reads the data; this file only ever sees the three
 * fields below.
 */
export type CarouselPartner = {
  name: string;
  href?: string;
  logo?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

/**
 * A logo carousel — requested by name: "as we have a section on home page,
 * the review section... continuous... logos in full length." That is
 * `TestimonialsCarousel.tsx`, generalised from quote cards to logo plates.
 *
 * DELIBERATELY A SEPARATE COMPONENT, NOT A SHARED ONE. The scroll-snap track,
 * the `sync`/`goTo` position math and the arrow-and-dot controls below are
 * copied from `TestimonialsCarousel.tsx` almost verbatim rather than lifted
 * into a shared hook. Two call sites is not yet a pattern, and the homepage
 * carousel is shipped, verified and carrying real customer reviews — coupling
 * it to a second, unrelated section's requirements is exactly the kind of
 * change that should not ride in on a partnerships redesign. If a third
 * carousel shows up somewhere else on the site, that is the point to extract
 * `useCarousel` and refactor both call sites deliberately, in a change that is
 * about the extraction rather than about partners or reviews.
 *
 * Built on native CSS scroll-snap for the same reason as the original: no
 * carousel package in package.json, and the browser already supplies touch,
 * trackpad and momentum scrolling correctly. If JavaScript never loads this
 * degrades to a plain horizontally scrollable row, not a dead widget.
 */
export function PartnerCarousel({ items }: { items: CarouselPartner[] }) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
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
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(index + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <>
      <div role="region" aria-label={`${items.length} partner organizations, scrollable`}>
        <ol
          ref={trackRef}
          onScroll={sync}
          onKeyDown={onKeyDown}
          tabIndex={0}
          className={cn(
            "no-scrollbar -mx-edge flex snap-x snap-mandatory gap-x-gap-x",
            "scroll-px-edge overflow-x-auto scroll-smooth px-edge",
          )}
        >
          {items.map((item) => {
            // The plate is short by design — Touseef's own note: "you can
            // just reduce the size — I don't think that much big will make
            // more sense." The mark reads at 64–80px well, and shorter
            // plates let more slides sit on one row on a wide screen.
            //
            // Plain <img> rather than next/image: two of the seven partner
            // logos on this page are SVG, and `next.config.ts` deliberately
            // does not enable `dangerouslyAllowSVG` on the optimiser. Every
            // logo is under 175 KB on disk, so the optimiser adds no
            // measurable saving on the raster ones either. Uniform render
            // path across formats is worth more than the missed optimisation.
            const plate = (
              <div
                className={cn(
                  "flex h-32 flex-col items-center justify-center gap-2 border border-line bg-fog px-6 text-center sm:h-36",
                  item.href && "transition-colors group-hover:border-rc-blue",
                )}
              >
                {item.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto max-w-full object-contain sm:h-20"
                  />
                ) : (
                  // Wordmark fallback — kept consistent with the rest of
                  // this section: `display-s` name over an `eyebrow`
                  // caption, so the plate reads as a mark rather than
                  // as a truncated tag.
                  <>
                    <span className="display-s text-navy">{item.name}</span>
                    <span className="eyebrow text-steel">Partner</span>
                  </>
                )}
              </div>
            );

            return (
              <li
                key={item.name}
                className="w-slide shrink-0 snap-start sm:w-slide-sm lg:w-slide-lg"
              >
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener" className="group block">
                    {plate}
                  </a>
                ) : (
                  plate
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <ul className="flex items-center gap-2">
          {items.map((item, i) => (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${item.name}`}
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
            aria-label="Previous partner"
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
            aria-label="Next partner"
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
