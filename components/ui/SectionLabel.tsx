import { cn } from "@/lib/cn";

/**
 * Section label — a 28x3px amber bar followed by the eyebrow type row.
 * On navy the label lifts to Pacific Blue for contrast.
 */
export function SectionLabel({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="block w-label-bar h-hairline shrink-0 bg-amber"
      />
      <span
        className={cn("eyebrow", tone === "dark" ? "text-pacific" : "text-rc-blue")}
      >
        {children}
      </span>
    </p>
  );
}
