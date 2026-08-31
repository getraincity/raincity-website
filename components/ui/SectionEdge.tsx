import { cn } from "@/lib/cn";

/**
 * Signature use #3 — the transition between two section colours, cut on the
 * same 12 degrees as the hero.
 *
 * The angle runs across a fraction of the width rather than the whole of it:
 * a full-width 12 degree diagonal costs roughly 306px of vertical space on a
 * 1440px screen, which is more wedge than transition. Scoped, it reads as a
 * deliberate detail and the angle stays exactly 12 degrees at any viewport.
 *
 * Both dimensions come off one variable, so `size` moves the strip's height
 * and the wedge's width together. A wedge that kept its span while the strip
 * got shorter would not be a shallower cut, it would be a different angle.
 */

/**
 * `slim` is the shallow variant — a strip rather than a band, at the scale of
 * the site's other hairlines. Whole literal class names; the scanner never
 * sees a string this file builds.
 */
const sizes = {
  default: "",
  slim: "squeegee-edge-slim",
} as const;

export function SectionEdge({
  from,
  to,
  size = "default",
  className,
}: {
  /**
   * Tailwind background class of the wedge itself, e.g. "bg-navy".
   *
   * Normally the outgoing section's own colour, which is what makes the cut
   * read as one band flowing into the next. An instance may pass an accent
   * instead, in which case the edge stops being a transition and becomes a
   * mark — see the closing edge on the service pages, which is amber.
   */
  from: string;
  /** Tailwind background class of the section below, e.g. "bg-white". */
  to: string;
  /** "slim" for a thin strip. */
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("squeegee-edge relative w-full", sizes[size], to, className)}
    >
      <div className={cn("squeegee-edge-fill absolute inset-0", from)} />
    </div>
  );
}
