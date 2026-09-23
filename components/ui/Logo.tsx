import Link from "next/link";
import { cn } from "@/lib/cn";
import { LOGO_BOX } from "@/components/ui/LogoSprite";

/**
 * The client's own logo — RAINCITY over PROPERTY MAINTENANCE, with the open
 * maple leaf growing out of the Y — drawn from the shapes in `LogoSprite`.
 *
 * ## The identity is the client's; the colours are the site's
 *
 * The supplied logo is one colour, an indigo (#10176D) that is not in
 * raincity-tokens.md. Its *drawing* is the identity — typeface, lockup,
 * proportions, the leaf — and all of that is kept exactly. Its colour is not
 * carried onto the site, for two reasons:
 *
 * 1. Every placement on this site is on Harbour Navy. Indigo on navy is
 *    invisible, so the logo had to be reversed out regardless — and a
 *    reversed logo is white, not indigo.
 * 2. The palette is locked. A seventh colour arriving through the logo would
 *    be the first thing that made the site look assembled from two sources.
 *
 * So the lockup takes the site's colours, the way any identity is applied to
 * a system: white wordmark on navy, with the leaf in Pacific Blue — the colour
 * of the Squeegee Edge hairline, which the leaf's single thin stroke echoes.
 * On a light ground it is Harbour Navy with a RainCity Blue leaf. The client's
 * indigo stays the print colour; the exports in `assets/` carry it.
 *
 * This replaced the site's interim mark — a RainCity Blue plate cut at 12
 * degrees beside "RAINCITY" set in Chivo. The Squeegee Edge itself is
 * untouched everywhere else (hero, section transitions, check plates); only
 * the logo stopped using it.
 *
 * ## Size
 *
 * One size everywhere, as before. 44px tall is the header's content height —
 * the bar is 64px with py-2.5, and the compact CTA beside it is also 44px — so
 * the logo sets nothing and the bar did not grow. At that height the
 * descriptor's cap height is about 7px: small, but it is the client's lockup,
 * and it stays crisp because it is vector. Do not drop the descriptor to
 * "save" it; the second line is half of what the client asked for.
 *
 * Width and height are set as attributes as well as by class, so the box has
 * its intrinsic ratio before any CSS arrives — no layout shift.
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
      className={cn("inline-flex", className)}
      aria-label="RainCity Property Maintenance — home"
    >
      <svg
        width={LOGO_BOX.width}
        height={LOGO_BOX.height}
        viewBox={`0 0 ${LOGO_BOX.width} ${LOGO_BOX.height}`}
        aria-hidden="true"
        focusable="false"
        className="h-11 w-auto shrink-0"
      >
        <use
          href="#rc-logo-word"
          className={tone === "dark" ? "text-navy" : "text-white"}
        />
        <use
          href="#rc-logo-leaf"
          className={tone === "dark" ? "text-rc-blue" : "text-pacific"}
        />
      </svg>
    </Link>
  );
}
