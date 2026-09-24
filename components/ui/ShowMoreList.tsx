"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ReactElement,
} from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "@/components/ui/Icon";
import { Stagger } from "@/components/ui/Motion";

/**
 * A staggered list that shows its first `initial` items and the rest behind a
 * button. Built for the homepage's project pairs (2026-09-25): eight real
 * before/after jobs at full size would run the section to three screens.
 *
 * THE HIDDEN ITEMS ARE IN THE HTML. Each child is a server-rendered `<li>`;
 * this component only adds the `hidden` attribute to the ones past
 * `initial`. So every pair and its alt text is in the prerendered page for
 * a crawler and a no-JavaScript reader alike, and the button changes one
 * attribute rather than fetching or mounting anything. The photographs in
 * them are lazy, so hidden ones cost nothing until they are opened.
 *
 * Children arrive as props from a server component, per the rule that no
 * client file imports a value from content.ts; the labels come in the same
 * way.
 */
export function ShowMoreList({
  children,
  initial,
  moreLabel,
  lessLabel,
  className,
}: {
  children: React.ReactNode;
  initial: number;
  moreLabel: string;
  lessLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{
    hidden?: boolean;
  }>[];
  const extra = items.length - initial;

  return (
    <>
      <Stagger as="ul" id={id} className={className} step={0.08}>
        {items.map((item, i) =>
          i < initial ? item : cloneElement(item, { hidden: !open }),
        )}
      </Stagger>

      {extra > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={id}
            className={cn(
              "group inline-flex min-h-cta-min items-center gap-2 border-2 border-navy px-cta-x py-cta-y sm:min-h-cta",
              "font-display text-cta font-bold uppercase text-navy transition-colors duration-200",
              "cursor-pointer hover:bg-navy hover:text-white",
            )}
          >
            {open ? lessLabel : moreLabel}
            {!open && <span className="font-body font-medium normal-case text-steel group-hover:text-fog">({extra})</span>}
            <ChevronDown
              className={cn("transition-transform duration-200", open && "rotate-180")}
            />
          </button>
        </div>
      )}
    </>
  );
}
