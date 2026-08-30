"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronUp } from "@/components/ui/Icon";

/**
 * Floating return-to-top control. Hidden until the reader is a full viewport
 * down — before that the header is still in reach, so the button would only
 * be furniture. Fades and lifts in rather than appearing, and is taken out of
 * the tab order while hidden so it cannot be focused from nowhere.
 *
 * Sits at the standard 24px inset from the bottom-right corner, and rides up
 * by however much of the copyright bar is on screen so it never covers it.
 */
export function ScrollToTop() {
  const [shown, setShown] = useState(false);
  const [lift, setLift] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > window.innerHeight);
      // How much of the copyright bar has scrolled into view; the button
      // clears exactly that much so the 24px inset is kept against whichever
      // edge is beneath it.
      const bar = document.querySelector("[data-footer-bar]");
      const top = bar?.getBoundingClientRect().top ?? Infinity;
      setLift(Math.max(0, window.innerHeight - top));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /** Respect a reduced-motion preference by jumping instead of animating. */
  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Scroll back to top"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      style={{ bottom: `${24 + lift}px` }}
      className={cn(
        // Squared to match the site's button system (see the geometry note in
        // globals.css) — no radius, same as every other button. 40px on
        // mobile, 44px from sm up: the spec's own touch-target minimum.
        "fixed right-6 z-40 inline-flex size-10 items-center justify-center sm:size-11",
        "bg-amber text-navy shadow-[0_6px_20px_rgb(12_39_64_/_0.28)]",
        "transition-[opacity,transform,background-color,color] duration-300",
        "hover:scale-110 hover:bg-navy hover:text-amber",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ChevronUp className="size-4" />
    </button>
  );
}
