import { business, servicePage, type Service } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * The last ask, above the quote form.
 *
 * It used to be a centred column on flat Fog — logo, headline, two buttons —
 * which read as a gap between the process section and the form rather than as
 * the close of the page. It now sits on a photograph under the same scrim
 * grammar the /about and /services banners use, so the page ends on the same
 * note it opens on.
 *
 * Centred, and compact. It was right-weighted — a mirror of the page's
 * left-weighted banner — which was a defensible bookend and a poor closing
 * ask: four short elements stacked in half the width, with the other half of
 * a wide screen carrying nothing, over a section 600px tall. A last ask is
 * the one block on the page with no second thing to sit beside, and centring
 * it is what says so. Everything on the axis, the scrim symmetrical with it.
 *
 * Height is the other half of that. At `py-section` the padding alone was
 * 256px against 347px of content, so the band read as a section that happened
 * to end the page rather than as its close. 48/56/64 by breakpoint puts the
 * frame at roughly a fifth of the content it frames, which is a banner's
 * proportion — still more than double the largest gap inside the block, so
 * nothing is crowded against the edge.
 *
 * The photograph comes from `detail.closingPhoto`. All eleven services now
 * declare one, so the `rooftops` fallback below is unreached — it is kept
 * because it is what a twelfth service should land on before its own frame
 * exists, and because Greater Vancouver roofs under the overcast that creates
 * the work is the one image equally true of every service here. None of the
 * eleven reuses the service photograph from the banner at the top of its own
 * page: running that twice would make the page look short of pictures.
 *
 * The mark is kept from the original and stays at its real size, linked home:
 * a signature at the end of the page. The source template ghosted it as a
 * watermark; this design system spends its decoration budget on the Squeegee
 * Edge and has none left for that.
 *
 * The heading names the service; everything under it is fixed. The quote
 * button lands on the form immediately below — close enough that the scroll
 * reads as the button working rather than as a jump.
 */
export function ServiceClosing({ service }: { service: Service }) {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="service-closing-heading"
    >
      <div className="absolute inset-0 -z-20">
        <Photo
          name={service.detail.closingPhoto ?? "rooftops"}
          fill
          sizes="100vw"
        />
      </div>

      {/* The banners' scrim, made symmetrical to match the column it covers.
          Heaviest through the middle band where the type sits, easing at top
          and bottom so the roofline is still legible as a photograph rather
          than as a texture. The directional version this replaced was built
          to keep one half of the frame clear for copy; with the copy on the
          axis there is no half to keep clear.

          Weights went up when the photograph changed. `rooftops` was a dark
          overcast roofline and carried the type on 70/90/70; the glass frame
          that replaced it on this page is pale and cool, and at those numbers
          the logo and the outlined button — which sit nearest the lighter top
          and bottom of the ramp — came down to about 5.4:1. 80/92/80 puts
          them back over 7:1 while still leaving the panels and their
          reflections readable as a photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-navy/80 via-navy/92 to-navy/80"
      />

      {/* text-center rather than a flex column: the mark is already an
          inline-flex link and the other three are blocks, so one property
          centres all four and the buttons keep their full-width stack on a
          phone. */}
      <div className="relative mx-auto w-full max-w-site px-edge py-12 sm:py-14 lg:py-16">
        <Reveal className="mx-auto max-w-prose text-center">
          <Logo tone="light" />

          <h2
            id="service-closing-heading"
            className="display-l mt-6 text-white"
          >
            {service.detail.closing}
          </h2>

          <p className="body-l mt-4 text-fog">{servicePage.closing.body}</p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="#quote">{servicePage.closing.cta}</Button>
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
