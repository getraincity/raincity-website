import {
  photos,
  tonePlaceholder,
  type Photo as PhotoRecord,
  type PhotoKey,
  type PhotoRatio,
} from "@/lib/photos";
import { PhotoFrame, type PhotoFrameData } from "@/components/ui/PhotoFrame";

/**
 * Resolve a registry key into the plain fields `PhotoFrame` renders.
 *
 * Split out so a *server* component can do the lookup and hand the result
 * across a client boundary as props — the header's nav preview is the one
 * place that needs it. Keeping the lookup here means the registry is still
 * imported in exactly one component file, which is the property that makes
 * "swap `src` and everything downstream updates" true.
 */
export function photoData(name: PhotoKey): PhotoFrameData {
  // Widened to the declared type on purpose. `photos` is `as const`, so
  // indexing it with a PhotoKey yields a union of the twenty-odd literal
  // entry types, and a field only some entries declare — `placeholder` — is
  // not readable off that union. The registry satisfies `Photo`, so this is
  // the shape the component is entitled to read.
  const photo: PhotoRecord = photos[name];
  return {
    src: photo.src,
    alt: photo.alt,
    ratio: photo.ratio,
    focal: photo.focal,
    blurDataURL: tonePlaceholder(photo.tone),
    placeholder: Boolean(photo.placeholder),
  };
}

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
  return (
    <PhotoFrame
      photo={photoData(name)}
      ratio={ratio}
      focal={focal}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      imgClassName={imgClassName}
    />
  );
}
