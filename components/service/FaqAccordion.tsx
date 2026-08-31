"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ChevronDown } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * The interactive half of the FAQ section. The section itself stays a server
 * component; only the open/closed state lives here.
 *
 * Not an accordion made of boxes. Each question is a row on a ruled list —
 * the same hairline furniture the overview masthead uses — so the closed
 * state is a table of contents rather than six stacked cards with a plus sign
 * on each. The only things that mark the open row are a RainCity Blue rule
 * down its left edge and the colour of the numeral and question beside it.
 *
 * The numerals deliberately undershoot the ones in How It Works. That section
 * sets them at display-xl with a ghost behind, as the design element the
 * whole band is built on; here they are display-m, flat, and sit in a fixed
 * gutter beside the question rather than above it, so the two read as the
 * same family without the second one looking like a repeat of the first.
 * Muted until the row opens, which is the point — colour is reserved for
 * state on this section, not spent on surfaces.
 *
 * One row open at a time. Six panels open at once is a wall of body copy and
 * makes the blue rule meaningless; the first is open on load so the section
 * does not arrive as six closed bars.
 *
 * Motion: the panel is a CSS grid animating `0fr` to `1fr` — see the
 * `collapse-open` / `collapse-closed` utilities in globals.css — not a Framer
 * height transition. It is a real height animation with no measurement, it
 * cannot desynchronise from the content, and `prefers-reduced-motion` already
 * flattens it through the global transition-duration rule. Framer stays where
 * the rest of the site keeps it: the entry stagger.
 *
 * Accessibility: every question is a real <button> inside a heading, carrying
 * `aria-expanded` and `aria-controls`; a closed panel is `inert`, so its
 * answer is out of the accessibility tree and off the tab order even though
 * it is still in the DOM — which is what lets a crawler read all six answers
 * whatever the open state happens to be.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Stagger as="ul" className="border-t border-line" step={0.05} delay={0.06}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `faq-q-${i}`;
        const panelId = `faq-a-${i}`;

        return (
          <StaggerItem
            as="li"
            key={item.question}
            className="relative border-b border-line"
          >
            {/* The active marker. A 3px rule — the system's hairline — rather
                than a border on the row, so nothing shifts when it appears
                and the row keeps its own bottom line. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 bottom-0 left-0 w-hairline transition-colors duration-200",
                isOpen ? "bg-rc-blue" : "bg-transparent",
              )}
            />

            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                /* Three tracks, not a flex row: the numeral column is a
                   declared width, which is what lets the answer below line up
                   under the question by mirroring it rather than by adding
                   paddings together. */
                className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-5 py-6 pr-1 pl-5 text-left sm:gap-x-7 sm:pl-7"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "display-m w-9 transition-colors duration-200 sm:w-12",
                    isOpen
                      ? "text-rc-blue"
                      : "text-muted group-hover:text-steel",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={cn(
                    "body-l font-medium transition-colors duration-200",
                    isOpen ? "text-rc-blue" : "text-navy group-hover:text-rc-blue",
                  )}
                >
                  {item.question}
                </span>

                {/* Same rotation, duration and easing as the header's own
                    dropdown chevron — one toggle idiom on the site, not two. */}
                <ChevronDown
                  className={cn(
                    "mt-1.5 shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180 text-rc-blue" : "text-steel",
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "collapse-open" : "collapse-closed",
              )}
            >
              <div className="overflow-hidden">
                {/* The empty first cell mirrors the numeral column above, so
                    the answer hangs off the question rather than off the
                    edge of the row. */}
                <div className="grid grid-cols-[auto_1fr] gap-x-5 pr-1 pb-7 pl-5 sm:gap-x-7 sm:pl-7">
                  <span aria-hidden="true" className="w-9 sm:w-12" />
                  <p className="body-base max-w-prose text-steel">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
