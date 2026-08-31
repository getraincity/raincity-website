import { business, locationsPage } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * The last ask, above the quote form.
 *
 * The site's standard closing pattern, unchanged from `ServiceClosing`: a
 * photograph under a symmetrical navy scrim, the mark at its real size linked
 * home, a heading, a line of body copy and the quote/call pair — everything
 * on the centre axis, at a banner's proportion rather than a section's, so
 * the page ends on the same note it opened on.
 *
 * Not an import of `ServiceClosing` only because that component takes a
 * `Service` and reads its heading and photograph off it; there is no service
 * here. Everything below the heading is the same arrangement and the same
 * numbers, deliberately.
 *
 * The heading is the one thing written for this page. A closing CTA that said
 * "book your clean" would be the third such button on the screen — the banner
 * has one, the form below has one. The question a service-area page actually
 * leaves a reader holding is whether they are inside the line, so that is the
 * question it closes on, and the answer is a phone number.
 *
 * `windowClosing` for the photograph: a frameless glass balustrade curving
 * along a paved terrace, RainCity's own, and one of the few finished-work
 * frames in the registry that shows a property rather than a surface being
 * worked on. The 80/92/80 scrim below was tuned on this exact photograph when
 * `ServiceClosing` moved onto it — it is pale and cool, and lighter weights
 * dropped the outlined button under 7:1 — so the numbers are carried over
 * rather than re-derived.
 *
 * The obvious pick was `lawnClosing`, strata grounds under coastal cloud with
 * the frontage cut and edged, which is exactly what "we come to your
 * community" looks like. It is still a `placeholder` entry in photos.ts and
 * renders as the hatch. Swap to it the day that shoot lands; the scrim wants
 * re-checking against it, since that frame is a darker one.
 *
 * None of the nine cards above uses this image, so the page does not repeat a
 * photograph on the way down.
 */
export function LocationsClosing() {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="locations-closing-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo name="windowClosing" fill sizes="100vw" />
      </div>

      {/* The banners' scrim, made symmetrical to match the column it covers —
          heaviest through the middle band where the type sits, easing top and
          bottom so the frontage is still legible as a photograph rather than
          as a texture. Same 80/92/80 weights the service closing runs, and
          for the same reason: this frame is a bright one, and the outlined
          button nearest the lighter bottom of the ramp has to stay well clear
          of the contrast floor. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-navy/80 via-navy/92 to-navy/80"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-12 sm:py-14 lg:py-16">
        <Reveal className="mx-auto max-w-prose text-center">
          <Logo tone="light" />

          <h2
            id="locations-closing-heading"
            className="display-l mt-6 text-white"
          >
            {locationsPage.closing.heading}
          </h2>

          <p className="body-l mt-4 text-fog">{locationsPage.closing.body}</p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="#quote">{locationsPage.closing.cta}</Button>
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
