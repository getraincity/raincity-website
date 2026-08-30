import { cn } from "@/lib/cn";

/**
 * Signature use #3 — the transition between two section colours, cut on the
 * same 12 degrees as the hero.
 *
 * The angle runs across the last 30% of the width rather than the whole of it:
 * a full-width 12 degree diagonal costs roughly 306px of vertical space on a
 * 1440px screen, which is more wedge than transition. Scoped, it reads as a
 * deliberate detail and the angle stays exactly 12 degrees at any viewport.
 */
export function SectionEdge({
  from,
  to,
  className,
}: {
  /** Tailwind background class of the section above, e.g. "bg-navy". */
  from: string;
  /** Tailwind background class of the section below, e.g. "bg-white". */
  to: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("squeegee-edge relative w-full", to, className)}
    >
      <div className={cn("squeegee-edge-fill absolute inset-0", from)} />
    </div>
  );
}
