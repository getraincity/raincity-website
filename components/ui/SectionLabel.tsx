import { cn } from "@/lib/cn";

const barColors = {
  amber: "bg-amber",
  blue: "bg-rc-blue",
} as const;

/**
 * Label ink per ground. `blue` is for the RainCity Blue bands: Pacific Blue
 * measures about 2:1 on that ground, so the label goes white there — the same
 * call the service pages' trust band makes for its check marks.
 */
const toneColors = {
  light: "text-rc-blue",
  dark: "text-pacific",
  blue: "text-white",
} as const;

/**
 * Section label — a 28x3px bar followed by the eyebrow type row.
 * On navy the label lifts to Pacific Blue for contrast; on RainCity Blue it
 * goes white.
 *
 * The bar is amber everywhere except Stats' "By the numbers" eyebrow, which
 * sits on Fog next to the amber-barred stat dividers below it — amber there
 * reads as another CTA accent rather than a section label, so that one
 * instance takes `bar="blue"` to match its own RainCity Blue label text.
 */
export function SectionLabel({
  children,
  tone = "light",
  bar = "amber",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneColors;
  bar?: "amber" | "blue";
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn("block w-label-bar h-hairline shrink-0", barColors[bar])}
      />
      <span className={cn("eyebrow", toneColors[tone])}>
        {children}
      </span>
    </p>
  );
}
