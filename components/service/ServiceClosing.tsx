import { business, servicePage, type Service } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

/**
 * The last ask, above the quote form.
 *
 * The source template closes on a faded company logo used as a watermark.
 * The mark is kept and the watermark is not: this design system spends its
 * decoration budget on the Squeegee Edge and has none left for a ghosted
 * graphic behind type. Set at its real size and linked home, the same mark is
 * a signature on the end of the page instead — which is what a watermark was
 * reaching for.
 *
 * Centred, where every other section on this page is set left. It is eight
 * lines long and it is the only thing being asked, so it gets the axis to
 * itself.
 *
 * The heading names the service; everything under it is fixed. Both CTAs
 * point at the two things a reader can do, and the quote button lands on the
 * form immediately below — close enough that the scroll reads as the button
 * working rather than as a jump.
 */
export function ServiceClosing({ service }: { service: Service }) {
  return (
    <section
      className="bg-fog py-section"
      aria-labelledby="service-closing-heading"
    >
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto flex max-w-heading flex-col items-center text-center">
          <Logo />

          <h2
            id="service-closing-heading"
            className="display-l mt-10 text-navy"
          >
            {service.detail.closing}
          </h2>

          <p className="body-l mt-5 max-w-prose text-steel">
            {servicePage.closing.body}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="#quote">{servicePage.closing.cta}</Button>
            <Button href={business.phoneHref} variant="tertiary">
              <Phone />
              {business.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
