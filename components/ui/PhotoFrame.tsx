import Image from "next/image";
import type { PhotoRatio } from "@/lib/photos";
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
 * A registry entry flattened into plain, serializable fields.
 *
 * This exists so a client component can render a photograph without importing
 * `lib/photos.ts`. The registry is 1,200 lines of alt text, credits and
 * shot notes — none of which the browser needs, all of which used to ship in
 * the client bundle because `Photo` (which reads the registry) was imported
 * into the header. A server component resolves the key with `photoData()` and
 * passes the result down; the type-only import above is erased at compile
 * time, so nothing here reaches back into the registry.
 */
export type PhotoFrameData = {
  src: string;
  alt: string;
  ratio: PhotoRatio;
  focal?: string;
  /** Blur-up placeholder, pre-computed from the registry's dominant tone. */
  blurDataURL: string;
  /** True while the slot is still waiting for its photograph. */
  placeholder: boolean;
};

/**
 * The rendering half of `Photo` — everything that used to sit below the
 * registry lookup, unchanged. `Photo` is the server-side front door to this
 * and stays the component every section should reach for; use `PhotoFrame`
 * directly only where the caller is already across a client boundary.
 */
export function PhotoFrame({
  photo,
  ratio,
  focal,
  fill = false,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
}: {
  photo: PhotoFrameData;
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
  const r = ratio ?? photo.ratio;
  const box = cn(
    "relative overflow-hidden bg-fog",
    fill ? "h-full w-full" : ratioClass[r],
    className,
  );

  // No photograph in this slot yet. Rather than showing the diagonal hatch
  // (which reads as a broken image to visitors), render a clean fog background
  // that looks intentional. The slot is hidden from assistive technology: `alt`
  // describes a photograph that is not on the page, and announcing it would be
  // a lie. The hatch utility is kept in globals.css for local dev use only —
  // this component no longer renders it in any context.
  if (photo.placeholder) {
    return (
      <div className={cn(box, "bg-fog")} aria-hidden="true" />
    );
  }

  return (
    <div className={box}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        // 68 rather than next/image's default 75. Measured, not guessed: at
        // the 768px variant a phone actually receives, the hero encodes to
        // 23 KB at 68 against 30 KB at 75, and the two were compared at 1:1
        // and at 3x on the hero and the /about roof shot — the second of
        // which carries fine printed text on the underlayment, the hardest
        // thing on the site to hold. Nothing separates them at 1:1 and 68
        // keeps that text. Below 65 the conifer band in the hero starts to
        // smooth, so this is the floor, not a starting point. The permitted
        // values are declared in `next.config.ts`; Next 16 rejects any other.
        quality={68}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        // `priority` alone preloads without a hint, so the browser fetches
        // the LCP image at the same priority as everything else on the page.
        // Marking it high moves it to the front of the queue; the rest stay
        // lazy, which is next/image's default for anything not priority.
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        style={{ objectPosition: focal ?? photo.focal ?? "50% 50%" }}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
