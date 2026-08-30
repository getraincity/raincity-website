import Link from "next/link";
import { business, servicePage, type Service } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icon";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * Service page banner.
 *
 * Deliberately not the full-bleed-photo-under-a-scrim banner /about and
 * /services share, and there are two reasons, one of them practical.
 *
 * The practical one: those two banners run photographs chosen for a 16:9
 * full-bleed crop at 2000px and up. The service photographs are not that —
 * they are the registry's portrait service frames, and the smallest of them
 * (commercial cleaning, 600x400) would be scaled two and a half times to fill
 * a 1440px band. Held in a column instead, it renders at about its own size.
 *
 * The design one: this is the only photograph on the page and it is the
 * subject of it. Dropping it behind eighty-five per cent navy so type can sit
 * on top would be spending the one frame the reader came to see on a texture.
 * So the navy is the ground and the photograph sits on it, undimmed.
 *
 * The corner notch is the same 28px cut the service card carries. A reader
 * arrives here by clicking that card, and finding the same detail at banner
 * scale is what makes the page read as the destination of the card rather
 * than a different template that happens to be about the same thing.
 *
 * Two CTAs, per the content inventory, and both are fixed across all eleven
 * pages: the quote anchor, and the phone. The phone one is a real tel: link
 * on a navy ground, so it takes the inverted tertiary outline rather than
 * competing with the amber beside it.
 */
export function ServiceHero({ service }: { service: Service }) {
  return (
    <section
      className="on-navy relative isolate overflow-hidden bg-navy"
      aria-labelledby="service-hero-heading"
    >
      <div className="mx-auto w-full max-w-site px-edge py-section">
        {/* Breadcrumb. Mirrors the BreadcrumbList in the page's JSON-LD, so
            the trail a crawler is told about is the one a reader can see. */}
        <RevealOnLoad>
          <nav aria-label="Breadcrumb">
            <ol className="meta flex flex-wrap items-center gap-2 text-fog">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-amber"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-pacific">
                /
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-200 hover:text-amber"
                >
                  {servicePage.hero.crumb}
                </Link>
              </li>
              <li aria-hidden="true" className="text-pacific">
                /
              </li>
              <li aria-current="page" className="text-white">
                {service.title}
              </li>
            </ol>
          </nav>
        </RevealOnLoad>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-gap-x">
          <div className="max-w-prose lg:col-span-6 lg:max-w-none">
            <RevealOnLoad
              as="h1"
              id="service-hero-heading"
              className="display-xl text-white"
              delay={0.06}
            >
              {service.detail.heading}
            </RevealOnLoad>

            <RevealOnLoad as="p" className="body-l mt-6 text-fog" delay={0.14}>
              {service.detail.intro}
            </RevealOnLoad>

            <RevealOnLoad
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              delay={0.22}
            >
              <Button href="#quote">{servicePage.hero.quoteCta}</Button>
              <Button href={business.phoneHref} variant="tertiary-invert">
                <Phone />
                {servicePage.hero.callCta}
              </Button>
            </RevealOnLoad>
          </div>

          {/* RainCity Blue sits behind the notch the photo is cut away from,
              exactly as it does on the card. */}
          <RevealOnLoad
            className="relative bg-rc-blue lg:col-span-5 lg:col-start-8"
            delay={0.3}
          >
            <Photo
              name={service.photo}
              ratio="7:5"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="card-corner-cut"
            />
          </RevealOnLoad>
        </div>
      </div>
    </section>
  );
}
