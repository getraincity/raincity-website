"use client";

import { useId, useState, type FormEvent } from "react";
import { business, quoteForm } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Motion";

type Errors = Partial<Record<"name" | "phone" | "email" | "service", string>>;

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
 * TODO: no backend. Validation and the success state are real; nothing is
 * sent. Wire `submit` to a server action, form endpoint or CRM to go live.
 */
export function QuoteForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Honeypot — bots fill hidden fields, people don't.
    if (data.get("company")) return;

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "");

    if (!name) next.name = "Please tell us your name.";
    if (!phone) next.phone = "We need a number to call you back on.";
    else if (phone.replace(/\D/g, "").length < 10)
      next.phone = "That number looks too short.";
    if (!email) next.email = "Please add an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "That email address doesn't look right.";
    if (!service) next.service = "Choose the service you need.";

    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

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

          {sent ? (
            <div
              role="status"
              className="mt-6 flex items-start gap-4 border-2 border-navy bg-fog p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center bg-navy text-amber">
                <Check />
              </span>
              <div>
                <p className="display-s text-navy">Request received</p>
                <p className="body-s mt-2 text-steel">
                  Thanks — we&rsquo;ll be in touch within one business day. For
                  anything urgent, call {business.phone}.
                </p>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              <Field id={`${id}-name`} name="name" label="Full Name" error={errors.name} required />
              <Field id={`${id}-phone`} name="phone" label="Phone Number" type="tel" error={errors.phone} required />
              <Field id={`${id}-email`} name="email" label="Email Address" type="email" error={errors.email} required />

              <Field id={`${id}-service`} name="service" label="Choose a Service" error={errors.service} required as="select">
                <option value="">Select…</option>
                {quoteForm.serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>

              <Field id={`${id}-date`} name="date" label="Preferred Date" type="date" className="sm:col-span-2" />
              <Field id={`${id}-info`} name="info" label="Additional Information" as="textarea" rows={3} className="sm:col-span-2" />

              {/* Honeypot */}
              <div aria-hidden="true" className="hidden">
                <label htmlFor={`${id}-company`}>Company</label>
                <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-1 sm:col-span-2">
                <Button type="submit">{quoteForm.submit}</Button>
              </div>
            </form>
          )}
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
              <iframe
                title={`Map of ${business.region}, the area RainCity serves`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${business.base}, BC, Canada`,
                )}&z=10&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block size-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const control =
  "w-full border border-line bg-fog px-4 py-field-y body-base text-navy placeholder:text-muted";

function Field({
  id,
  name,
  label,
  type = "text",
  as = "input",
  rows = 3,
  error,
  required = false,
  className,
  children,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  as?: "input" | "select" | "textarea";
  rows?: number;
  error?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(control, error && "border-amber-ink"),
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="meta block text-rc-blue">
        {label}
        {required && <span className="text-amber-ink"> *</span>}
      </label>

      <div className="mt-1.5">
        {as === "select" ? (
          <select {...shared}>{children}</select>
        ) : as === "textarea" ? (
          <textarea
            {...shared}
            rows={rows}
            // Vertical only: a horizontally resizable field breaks the grid.
            className={cn(shared.className, "resize-y")}
          />
        ) : (
          <input {...shared} type={type} />
        )}
      </div>

      {error && (
        <p id={errorId} className="body-s mt-1.5 text-amber-ink">
          {error}
        </p>
      )}
    </div>
  );
}
