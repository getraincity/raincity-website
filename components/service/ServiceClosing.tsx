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
 * Right-weighted, where the banner at the top of this page is left-weighted
 * and the scrim runs the other way. That is the whole reason it is not
 * centred: a second centred block would have been a third variation on the
 * page's own hero, and the mirrored one reads as a bookend — the reader
 * leaves the page on the opposite side from where they entered it. It also
 * puts the copy on the side of the frame that is quiet.
 *
 * `rooftops` rather than the service photograph. That frame is already the
 * banner of this page, and running it twice would make the page look short of
 * pictures. This one — Greater Vancouver roofs under the overcast that
 * creates the work — is the one photograph that is equally true of all eleven
 * services, which is what a shared closing band needs.
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
        <Photo name="rooftops" fill sizes="100vw" />
      </div>

      {/* The banners' scrim, mirrored. Bottom-up on phones, where the type
          sits over the middle of the frame; right-to-left from lg, which is
          the reverse of the hero at the top of this page and keeps the left
          of the roofline clear of copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/85 to-navy/45 lg:bg-linear-to-l lg:from-navy/95 lg:via-navy/75 lg:to-navy/25"
      />

      <div className="relative mx-auto w-full max-w-site px-edge py-section">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <Reveal className="max-w-prose lg:col-span-6 lg:col-start-7 lg:max-w-none">
            <Logo tone="light" />

            <h2
              id="service-closing-heading"
              className="display-l mt-8 text-white"
            >
              {service.detail.closing}
            </h2>

            <p className="body-l mt-5 text-fog">{servicePage.closing.body}</p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button href="#quote">{servicePage.closing.cta}</Button>
              <Button href={business.phoneHref} variant="tertiary-invert">
                <Phone />
                {business.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
