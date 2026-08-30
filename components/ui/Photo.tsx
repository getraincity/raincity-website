import Image from "next/image";
import { photos, tonePlaceholder, type PhotoKey, type PhotoRatio } from "@/lib/photos";
import { cn } from "@/lib/cn";

const ratioClass: Record<PhotoRatio, string> = {
  "16:9": "aspect-16/9",
  "16:10": "aspect-16/10",
  "7:5": "aspect-7/5",
  "4:5": "aspect-4/5",
  "3:2": "aspect-3/2",
  "1:1": "aspect-square",
};

/**
 * Every photograph on the site renders through here, so ratio, focal point,
 * blur-up and alt text stay consistent and come from one registry.
 */
export function Photo({
  name,
  ratio,
  fill = false,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
}: {
  name: PhotoKey;
  /** Override the registry's intended ratio for a particular slot. */
  ratio?: PhotoRatio;
  /**
   * Fill the parent instead of holding a ratio. Use for background imagery.
   * A ratio class plus `h-full` would derive width from height and burst the
   * viewport, so ratio is dropped entirely in this mode.
   */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const photo = photos[name];
  const r = ratio ?? photo.ratio;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-fog",
        fill ? "h-full w-full" : ratioClass[r],
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        // `priority` alone preloads without a hint, so the browser fetches
        // the LCP image at the same priority as everything else on the page.
        // Marking it high moves it to the front of the queue; the rest stay
        // lazy, which is next/image's default for anything not priority.
        placeholder="blur"
        blurDataURL={tonePlaceholder(photo.tone)}
        style={{ objectPosition: photo.focal ?? "50% 50%" }}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
