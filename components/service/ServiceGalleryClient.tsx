"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PhotoFrame, type PhotoFrameData } from "@/components/ui/PhotoFrame";
import { ArrowLeft, ArrowRight, Camera, Close } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

export type GalleryPhoto = PhotoFrameData & { tag: string | null };

export type GalleryProject = {
  id: string;
  title: string;
  detail: string;
  /** A labelled stock example topping up the row, not a RainCity job. */
  example?: boolean;
  photos: GalleryPhoto[];
};

/**
 * The gallery's cards and its photo viewer. The section around it is the
 * server component `ServiceGallery`, which resolves every photograph and
 * passes it here as plain props.
 *
 * THE VIEWER IS A NATIVE `<dialog>`, opened with `showModal()`. That gives the
 * things a hand-built lightbox usually gets wrong, for free and correctly: the
 * page behind is inert, Escape closes it, focus moves in on open and back to
 * the card that opened it on close, and it sits in the top layer above the
 * sticky header. The script adds only what the element does not do — arrow
 * keys, the previous/next buttons, closing on a click outside the photo, and
 * holding the page still behind it.
 *
 * Photos are shown whole (`object-contain`) at up to the viewport's height,
 * so a job added later with a portrait or landscape `more` frame is never
 * cropped in the viewer, whatever the card does.
 */
export function ServiceGalleryClient({
  projects,
  viewLabel,
  exampleViewLabel,
}: {
  /** Always a multiple of three — the server tops the row up with examples. */
  projects: GalleryProject[];
  viewLabel: string;
  exampleViewLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<{ project: number; photo: number } | null>(null);

  const project = active ? projects[active.project] : null;
  const photo = active && project ? project.photos[active.photo] : null;
  const count = project?.photos.length ?? 0;

  // Open the dialog once there is something to show in it. Doing it in an
  // effect rather than in the click handler means the content is rendered
  // before `showModal()` moves focus into it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (active && dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, [active]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (by: number) =>
      setActive((a) => {
        if (!a) return a;
        const n = projects[a.project].photos.length;
        return { project: a.project, photo: (a.photo + by + n) % n };
      }),
    [projects],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
  };

  return (
    <>
      <Stagger
        as="ul"
        // Three across at `lg`, always full rows. On a tablet, two across with
        // an odd last card centred (four-column track, cards span two).
        className="mt-block grid grid-cols-1 gap-gap-x gap-y-10 sm:grid-cols-4 lg:grid-cols-3"
        delay={0.06}
      >
        {projects.map((p, i) => {
          const after = p.photos.find((ph) => ph.tag === "After") ?? p.photos[0];
          const label = p.example ? exampleViewLabel : viewLabel;
          return (
            <StaggerItem
              as="li"
              key={p.id}
              className="group relative sm:col-span-2 sm:odd:last:col-start-2 lg:col-span-1 lg:odd:last:col-start-auto"
            >
              {/* The whole card is the control, through one button stretched
                  over it — a button may not contain the block-level photo
                  frame, so it sits on top of the card instead of around it.
                  Its label says everything the card shows. */}
              <button
                type="button"
                onClick={() => setActive({ project: i, photo: 0 })}
                aria-haspopup="dialog"
                aria-label={
                  p.example
                    ? `${label}: ${p.title} (${p.photos[0].tag}, ${p.detail.toLowerCase()})`
                    : `${viewLabel}: ${p.title}, ${p.detail} (${p.photos.length} photos)`
                }
                className="absolute inset-0 z-10 cursor-pointer"
              />
              <div aria-hidden="true">
                {/* The service card's signature: the corner cut out of the
                    photo, RainCity Blue behind it. */}
                <div className="bg-rc-blue">
                  <div className="card-corner-cut relative">
                    <PhotoFrame
                      photo={after}
                      ratio="1:1"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                    {/* The brand wash, deepening on hover — the site's hover
                        for photographs. Nothing scales. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-rc-blue/0 transition-colors duration-300 group-hover:bg-rc-blue/20"
                    />
                    <span className="meta absolute bottom-0 left-0 inline-flex items-center gap-2 bg-navy/90 px-3 py-2 text-white">
                      <Camera className="size-4 text-pacific" />
                      {p.example
                        ? p.photos[0].tag
                        : `${p.photos.length} ${p.photos.length === 1 ? "photo" : "photos"}`}
                    </span>
                  </div>
                </div>
                <div className="mt-5 border-t border-t-white/15 pt-4">
                  <p className="display-s text-white">{p.title}</p>
                  <p className="meta mt-1.5 text-muted">{p.detail}</p>
                  <p className="meta mt-4 inline-flex items-center gap-2 text-pacific transition-colors group-hover:text-white">
                    {label}
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <dialog
        ref={dialogRef}
        aria-label={project ? `${project.title} — photos` : "Project photos"}
        onClose={() => {
          setActive(null);
          document.documentElement.style.overflow = "";
        }}
        onKeyDown={onKeyDown}
        // A click that lands on the dialog itself, not on anything inside it,
        // is a click on the dark space around the photo.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        // Solid navy: at 95% the page's own headings ghosted through behind
        // the photo and read as clutter.
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-navy p-0 text-white backdrop:bg-navy"
      >
        {project && photo && active && (
          <div className="flex h-full flex-col" onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}>
            <div className="flex items-center justify-between gap-6 border-b border-b-white/10 px-edge py-4">
              <div>
                <p className="display-s text-white">{project.title}</p>
                <p className="meta mt-1 text-muted">{project.detail}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <p className="meta text-fog" aria-live="polite">
                  {active.photo + 1} / {count}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close photos"
                  className="flex size-11 cursor-pointer items-center justify-center border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-navy"
                >
                  <Close className="size-4" />
                </button>
              </div>
            </div>

            <div
              className="flex min-h-0 flex-1 items-center justify-center px-edge py-6"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              {/* Square at up to the space left between header and footer,
                  so a photo never runs under either. */}
              <figure
                className="relative aspect-square"
                style={{ width: "min(100%, calc(100dvh - 15rem))" }}
              >
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 75vh, 100vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  className="object-contain"
                />
                {photo.tag && (
                  <figcaption
                    className={cn(
                      "meta absolute top-0 left-0 px-3 py-1.5",
                      photo.tag === "After" ? "bg-amber text-navy" : "bg-navy text-white",
                    )}
                  >
                    {photo.tag}
                  </figcaption>
                )}
              </figure>
            </div>

            <div className="flex items-center justify-center gap-3 px-edge pb-6">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={count < 2}
                aria-label="Previous photo"
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-navy disabled:invisible"
              >
                <ArrowLeft className="size-4" />
              </button>
              <ul className="flex gap-2 overflow-x-auto">
                {project.photos.map((ph, i) => (
                  <li key={ph.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActive({ project: active.project, photo: i })}
                      aria-label={`Show photo ${i + 1} of ${count}${ph.tag ? ` (${ph.tag.toLowerCase()})` : ""}`}
                      aria-current={i === active.photo ? "true" : undefined}
                      className={cn(
                        "relative block size-14 cursor-pointer overflow-hidden border-2 transition-colors sm:size-16",
                        i === active.photo ? "border-amber" : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      {/* alt="": the button's label names the photo. */}
                      <Image src={ph.src} alt="" fill sizes="64px" quality={68} className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={count < 2}
                aria-label="Next photo"
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-navy disabled:invisible"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
