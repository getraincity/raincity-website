import { business, locationPage, type Location } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * The last ask, above the quote form.
 *
 * The site's standard closing pattern, unchanged from `ServiceClosing` and
 * `LocationsClosing`: a photograph under a symmetrical navy scrim, the mark
 * at its real size linked home, a heading, one line of body copy and the
 * quote/call pair — everything on the centre axis, at a banner's proportion
 * rather than a section's, so the page ends on the same note it opened on.
 *
 * Not an import of either of those only because one takes a `Service` and
 * reads its heading and photograph off it, and the other takes nothing at
 * all. Everything below the heading is the same arrangement and the same
 * numbers, deliberately, and the 80/92/80 scrim is carried across rather than
 * re-derived — it was tuned on this exact photograph, which is pale and cool
 * enough that lighter weights drop the outlined button under 7:1.
 *
 * The heading names the community and comes from `detail.closing`. It is the
 * ninth and last time the name appears on the page, which is the reason the
 * body line under it says nothing about geography — a closing block that
 * repeated "in Anmore" a tenth time would be keyword stuffing rather than
 * copy. What it does instead is answer the objection a reader still holding
 * at the bottom of a service-area page actually has: cost, commitment, and
 * whether the crew that turns up is the same one.
 *
 * `windowClosing` on all nine, and it does not collide with anything above
 * it: the banner runs this community's own registry frame and the eleven
 * service cards run theirs, none of which is this. The alternative was a
 * per-community closing photograph, which would mean nine more frames chosen
 * from a registry where seventy of the hundred-odd slots are still
 * placeholders. Not worth it for a band the reader is scrolling past on the
 * way to the form.
 */
export function LocationClosing({ location }: { location: Location }) {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="location-closing-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="windowClosing" fill sizes="100vw" />
      </div>

      {/* The banners' scrim, made symmetrical to match the column it covers —
          heaviest through the middle band where the type sits, easing top and
          bottom so the frontage is still legible as a photograph rather than
          as a texture. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-navy/80 via-navy/92 to-navy/80"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-12 sm:py-14 lg:py-16">
        <Reveal className="mx-auto max-w-prose text-center">
          <Logo tone="light" />

          <h2
            id="location-closing-heading"
            className="display-l mt-6 text-white"
          >
            {location.detail.closing}
          </h2>

          <p className="body-l mt-4 text-fog">{locationPage.closing.body}</p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="#quote">{locationPage.closing.cta}</Button>
            <Button href={business.phoneHref} variant="tertiary-invert">
              <Phone />
              {business.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
