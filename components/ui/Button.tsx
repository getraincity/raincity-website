import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "tertiary-invert";
type Size = "default" | "compact";

/**
 * CTA styles, per the design system:
 *   primary   — amber bg, navy text, hover inverts to navy/amber
 *   secondary — RainCity Blue bg, white text, hover Pacific
 *   tertiary  — 2px navy outline, hover fills navy
 * All are 52px tall on desktop and never fall below 44px on mobile.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-amber text-navy hover:bg-navy hover:text-amber border-2 border-amber hover:border-navy",
  secondary:
    "bg-rc-blue text-white hover:bg-pacific border-2 border-rc-blue hover:border-pacific",
  tertiary:
    "bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white",
  "tertiary-invert":
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-navy",
};

/**
 * Sizing. `default` is the spec: 52px on desktop, never below 44px.
 * `compact` holds the 44px floor at every width and is for the header bar
 * only — at 52px the CTA was the tallest thing in the bar and therefore set
 * its height. 44px is the spec's own touch-target minimum, not a new number.
 */
const sizes: Record<Size, string> = {
  default: "px-cta-x py-cta-y min-h-cta-min sm:min-h-cta",
  compact: "px-5 py-2.5 min-h-cta-min",
};

// Chivo 700 / 15px / uppercase, straight from the CTA component spec.
const base = cn(
  "inline-flex items-center justify-center gap-2 text-center",
  "font-display font-bold uppercase text-cta",
  "transition-colors duration-200",
);

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "default",
  href,
  className,
  children,
  // Forwarded to the link branches too. Without this an accessible name set
  // on a CTA that happens to be a link was silently dropped, because `rest`
  // is only spread onto the <button>.
  "aria-label": ariaLabel,
  ...rest
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    const external = href.startsWith("tel:") || href.startsWith("mailto:");
    if (external || href.startsWith("#")) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} aria-label={ariaLabel} {...rest}>
      {children}
    </button>
  );
}
