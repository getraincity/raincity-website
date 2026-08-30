import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The logo mark carries the Squeegee Edge at 34px — the same 12 degree cut
 * used by the hero, the before/after handle and the section transitions.
 *
 * Mark plus wordmark only: at header scale a second line of meta type would
 * out-measure "RAINCITY" itself, and the descriptor already lives in the
 * footer tagline.
 */
export function Logo({
  tone = "dark",
  className,
}: {
  /** "dark" = navy wordmark on light. "light" = white wordmark on navy. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="RainCity Property Maintenance — home"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Square block, right edge cut back at 12 degrees. */}
        <path d="M0 0 H34 L26.77 34 H0 Z" className="fill-rc-blue" />
        {/* The blade: a 3px Pacific hairline running the same angle. */}
        <path
          d="M28.5 0 L21.27 34"
          stroke="currentColor"
          strokeWidth="3"
          className="text-pacific"
        />
      </svg>

      <span
        className={cn(
          "font-display font-extrabold uppercase text-display-s leading-none",
          tone === "dark" ? "text-navy" : "text-white",
        )}
      >
        RainCity
      </span>
    </Link>
  );
}
