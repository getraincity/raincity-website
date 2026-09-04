import { business, quoteForm } from "@/lib/content";
import { Reveal } from "@/components/ui/Motion";
import { QuoteFormClient } from "@/components/home/QuoteFormClient";

/**
 * Quote form — the page's primary conversion point.
 *
 * Two columns on desktop: the form, and a map of the area served. The section
 * used to be a single panel floating on a full-bleed photograph under a navy
 * scrim, which cost a lot of height and gave the eye a busy backdrop to fight
 * behind the controls. The photograph is gone; the map earns the space the
 * photograph was taking because it answers a question a quote form raises —
 * do you cover me?
 *
 * The map is a service area, not a storefront. `business` records a base city
 * and a region and no street address, so the embed is New Westminster at a
 * metro-wide zoom rather than a pin dropped on an address that is not on file.
 *
 * This file is a server component and everything on it below the fields is
 * static markup; only the form and its success panel are interactive, and
 * those live in `QuoteFormClient`. The section used to carry `"use client"`
 * whole, which put `lib/content.ts` — all of it, because `nav` is derived from
 * `services` and `locations` — into the browser bundle for the sake of eight
 * strings. Those eight now cross the boundary as props.
 */
export function QuoteForm() {
  return (
    // scroll-mt clears the sticky header. Every "Get A Quote" on the page is
    // an anchor to #quote, and without it the heading lands underneath the
    // navy bar once the utility strip has collapsed.
    <section
      id="quote"
      className="scroll-mt-20 bg-white py-section-sm"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-y-block lg:grid-cols-12 lg:gap-x-gap-x">
          {/* Form first in the DOM, so it is also first in the stack on a
              phone: the thing being asked for should not sit under a map. */}
          <div className="lg:col-span-7">
            {/* Heading only. The form itself is deliberately not animated —
                it is the page's conversion point, and a control that has to
                finish an entrance before it can be typed into is a worse form
                than a static one. */}
            <Reveal>
            <h2 id="quote-heading" className="display-m text-navy">
              {quoteForm.headline}
            </h2>
            <p className="body-s mt-3 text-steel">
            Tell us what needs doing and we&rsquo;ll come back with a price. Prefer
            to talk?{" "}
            <a
              href={business.phoneHref}
              className="text-rc-blue underline underline-offset-4 transition-colors duration-200 hover:text-navy"
            >
              {business.phone}
            </a>
            .
          </p>
            </Reveal>

          <QuoteFormClient
            copy={{
              phone: business.phone,
              email: business.email,
              emailHref: business.emailHref,
              serviceOptions: quoteForm.serviceOptions,
              submit: quoteForm.submit,
            }}
          />
          </div>

          {/* Service area. Bordered plate rather than a rounded card: the
              system resets the radius namespace outright — "no border radius
              anywhere" — so a rounded map would be the only curved edge on
              the site. The 2px navy border is the same plate treatment the
              Awards section uses, and a flat system carries no shadow token. */}
          <Reveal as="div" className="flex flex-col lg:col-span-5" delay={0.08}>
            <p className="meta text-rc-blue">Where we work</p>
            <p className="body-s mt-3 text-steel">
              Based in {business.base}, serving {business.region}.
            </p>
            {/* 320px on its own; `grow` lets it take the rest of the column
                once the grid stretches this cell to the form's height. No
                calc() — the system bans arbitrary values downstream. */}
            <div className="mt-5 h-80 grow border-2 border-navy bg-fog">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
                <iframe
                  title={`Map of ${business.region}, the area RainCity serves`}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(`${business.base}, BC, Canada`)}&zoom=10`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block size-full border-0"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <p className="meta text-steel">
                    Based in {business.base}, serving {business.region}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
