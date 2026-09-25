import { business, locations, quoteForm } from "@/lib/content";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Motion";
import { QuoteFormClient } from "@/components/home/QuoteFormClient";
import { WhatsApp } from "@/components/ui/Icon";

/**
 * Quote form — the page's primary conversion point, on every route.
 *
 * Two columns on desktop: the form, and a photograph of where the work comes
 * from. The section used to be a single panel floating on a full-bleed
 * photograph under a navy scrim, which cost a lot of height and gave the eye
 * a busy backdrop to fight behind the controls.
 *
 * ## Why the right column is a photograph, not a map
 *
 * It was a Google Maps Embed API iframe until 2026-09-23. That API needs a key
 * tied to a billing account, none was ever issued, and so on every page of
 * the live site the column rendered a line of grey text in an empty box. The
 * keyless legacy embed it replaced is deprecated, which is why it was removed
 * in the first place. A photograph needs no key, no third party and no
 * account, and cannot go blank — the durable answer for a client who wants
 * this to still work untouched in two years. The service area itself is
 * mapped by the /locations pages; this column only has to say where the
 * truck leaves from.
 *
 * The frame is downtown New Westminster from above the Fraser. `/about`
 * passes a different one: Home Ground sits directly above this form there and
 * already shows the SkyBridge, and the same bridge twice in one screen reads
 * as a mistake. The caption is about the business, never the place, so it
 * stays true whichever frame a page passes.
 *
 * This file is a server component and everything on it below the fields is
 * static markup; only the form and its success panel are interactive, and
 * those live in `QuoteFormClient`. The section used to carry `"use client"`
 * whole, which put `lib/content.ts` — all of it, because `nav` is derived from
 * `services` and `locations` — into the browser bundle. Everything the form
 * needs crosses the boundary as props, the service list included.
 */
export function QuoteForm({
  photo = "quoteNewWestminster",
}: {
  /** The "Where we work" frame. Override only where a neighbour repeats it. */
  photo?: PhotoKey;
} = {}) {
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
              phone: the thing being asked for should not sit under a photo. */}
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
              href={business.whatsappHref}
              target="_blank"
              rel="noopener"
              aria-label={business.whatsappLabel}
              className="inline-flex items-center gap-1.5 text-rc-blue underline underline-offset-4 transition-colors duration-200 hover:text-navy"
            >
              <WhatsApp className="shrink-0" />
              {business.phone}
            </a>
            .
          </p>
            </Reveal>

          <QuoteFormClient
            copy={{
              phone: business.phone,
              serviceOptions: quoteForm.serviceOptions,
              submit: quoteForm.submit,
            }}
          />
          </div>

          {/* Where we work. Square plate with a 2px navy border rather than a
              rounded card: the system resets the radius namespace outright,
              so a rounded frame would be the only curved edge on the site. */}
          <Reveal as="div" className="flex flex-col lg:col-span-5" delay={0.08}>
            <p className="meta text-rc-blue">Where we work</p>
            <p className="body-s mt-3 text-steel">
              Based in {business.base}, serving {business.region}.
            </p>
            {/* 320px on its own; `grow` lets it take the rest of the column
                once the grid stretches this cell to the form's height. No
                calc() — the system bans arbitrary values downstream.

                `sizes` is deliberately wider than the box, and it is the crop
                that sets it, not the column. The frame is 16:9 and the panel
                is taller than that everywhere below a tablet, so `cover`
                scales the image to the panel's height: at desktop it shows
                well under half its width, and on a phone the 320px-tall panel
                needs a file ~570px wide however narrow the screen is. Sized to
                the column, the browser fetched 400px there and the photograph
                rendered soft. Measured, 2026-09-23. */}
            <figure className="relative mt-5 h-80 grow overflow-hidden border-2 border-navy bg-navy">
              <Photo
                name={photo}
                fill
                sizes="(min-width: 1024px) 75vw, (min-width: 640px) 100vw, 600px"
              />
              {/* The About section's caption treatment: a scrim rising off
                  the bottom edge holds the type at full contrast and leaves
                  the rest of the photograph clear. The count is
                  `locations.length`, so a tenth community updates it. */}
              <figcaption className="absolute inset-x-0 bottom-0 px-5 pt-16 pb-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-navy via-navy/80 to-transparent"
                />
                <div className="relative">
                  <p className="meta text-white">{business.name}</p>
                  <p className="meta mt-1 text-fog">
                    {locations.length} communities across {business.region}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
