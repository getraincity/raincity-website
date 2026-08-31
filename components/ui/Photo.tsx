import Image from "next/image";
import {
  photos,
  tonePlaceholder,
  type Photo as PhotoRecord,
  type PhotoKey,
  type PhotoRatio,
} from "@/lib/photos";
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
  focal,
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
   * Override the registry's object-position for a particular slot.
   *
   * The registry focal is tuned for the crop the photo was catalogued at —
   * for the service frames, the card's 4:5 portrait. A full-bleed banner is a
   * far wider, shorter window onto the same file and can strand the subject,
   * so a slot that crops differently states its own. The registry value stays
   * the default so nothing has to opt in.
   */
  focal?: string;
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
  // Widened to the declared type on purpose. `photos` is `as const`, so
  // indexing it with a PhotoKey yields a union of the twenty-odd literal
  // entry types, and a field only some entries declare — `placeholder` — is
  // not readable off that union. The registry satisfies `Photo`, so this is
  // the shape the component is entitled to read.
  const photo: PhotoRecord = photos[name];
  const r = ratio ?? photo.ratio;
  const box = cn(
    "relative overflow-hidden bg-fog",
    fill ? "h-full w-full" : ratioClass[r],
    className,
  );

  // No photograph in this slot yet. The design system's placeholder stands in
  // — the hatch, the shot name along the bottom edge, the intended ratio
  // tagged in the corner — so the gap is legible as work outstanding and the
  // layout is reviewable at the size the real frame will occupy. Hidden from
  // assistive technology entirely: `alt` describes a photograph that is not
  // on the page, and announcing it would be a straightforward lie.
  if (photo.placeholder) {
    return (
      <div className={box} aria-hidden="true">
        <span className="photo-placeholder absolute inset-0" />
        <span className="meta absolute top-0 right-0 bg-navy px-2 py-1 text-white">
          {r}
        </span>
        <span className="meta absolute inset-x-0 bottom-0 px-4 pb-3 text-steel">
          {photo.placeholder}
        </span>
      </div>
    );
  }

  return (
    <div className={box}>
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
        style={{ objectPosition: focal ?? photo.focal ?? "50% 50%" }}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
