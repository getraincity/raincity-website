"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Inline spinner used during form submission. Matches the amber/navy colour
 * vocabulary of the primary CTA without pulling in an icon library.
 */
function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

type Errors = Partial<Record<"name" | "phone" | "email" | "service", string>>;

/**
 * The strings this component renders, resolved by the server wrapper.
 *
 * Passed rather than imported. `lib/content.ts` is cross-referential — `nav`
 * is built from `services` and `locations` — so any `"use client"` file that
 * imports from it pulls the entire 260 KB of site copy into the browser
 * bundle. The eight values below are all this form needs, and they arrive as
 * props from `QuoteForm`. Do not add an import of `@/lib/content` here; add a
 * field to this type instead.
 */
export type QuoteFormCopy = {
  phone: string;
  email: string;
  emailHref: string;
  /** A deliberately short six-option list, not the full service catalogue. */
  serviceOptions: readonly string[];
  submit: string;
};

/**
 * The interactive part of the quote section: the form, and the success panel
 * that replaces it. Everything static around it — the heading, the map, the
 * section furniture — stays a server component in `QuoteForm.tsx`.
 *
 * Without NEXT_PUBLIC_FORM_ENDPOINT the form falls back to a pre-filled
 * mailto: link — functional, but set the endpoint before launch (see
 * .env.local.example for Web3Forms, Formspree, and server-action options).
 */
export function QuoteFormClient({ copy }: { copy: QuoteFormCopy }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // True when the form fell back to mailto: — adjusts the success message.
  const [mailtoFallback, setMailtoFallback] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
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
    if (Object.keys(next).length > 0) return;

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      // No backend configured yet — fall back to a pre-filled mailto: link so
      // the request still reaches the inbox. The email client opens in the
      // background; the page shows the success state so the visitor knows the
      // action completed. Set NEXT_PUBLIC_FORM_ENDPOINT (see .env.local.example)
      // before launch to replace this with a proper submission.
      const subject = encodeURIComponent(`Quote Request — ${service}`);
      const preferredDate = String(data.get("date") ?? "").trim();
      const additionalInfo = String(data.get("info") ?? "").trim();
      const bodyLines = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service}`,
        ...(preferredDate ? [`Preferred date: ${preferredDate}`] : []),
        ...(additionalInfo ? [`Additional info:\n${additionalInfo}`] : []),
      ];
      window.location.href = `mailto:${copy.email}?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
      setMailtoFallback(true);
      setSent(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        // Surface the actual error message from the server when available,
        // so the visitor sees a specific reason rather than a generic fallback.
        const json = await res.json().catch(() => ({}) as Record<string, string>);
        throw new Error(
          (json as { error?: string }).error ??
            "Something went wrong. Please call us directly."
        );
      }
      setSent(true);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us directly.";
      setErrors({ name: msg });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
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
            anything urgent, call {copy.phone}.
          </p>
          {mailtoFallback && (
            <p className="body-s mt-2 text-steel">
              Your email client should have opened with your request. If
              it did not, email us directly at{" "}
              <a
                href={copy.emailHref}
                className="text-rc-blue underline underline-offset-4"
              >
                {copy.email}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
      <Field id={`${id}-name`} name="name" label="Full Name" autoComplete="name" error={errors.name} required />
      <Field id={`${id}-phone`} name="phone" label="Phone Number" type="tel" autoComplete="tel" error={errors.phone} required />
      <Field id={`${id}-email`} name="email" label="Email Address" type="email" autoComplete="email" error={errors.email} required />

      <Field id={`${id}-service`} name="service" label="Choose a Service" autoComplete="off" error={errors.service} required as="select">
        <option value="">Select…</option>
        {copy.serviceOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>

      {/* Preferred date is future-specific; autofill would insert a
          past date which is actively misleading here. */}
      <Field id={`${id}-date`} name="date" label="Preferred Date" type="date" autoComplete="off" className="sm:col-span-2" />
      <Field id={`${id}-info`} name="info" label="Additional Information" as="textarea" rows={3} autoComplete="off" className="sm:col-span-2" />

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-1 sm:col-span-2">
        <Button type="submit" disabled={submitting} aria-label={submitting ? "Sending your request…" : undefined}>
          {submitting ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            copy.submit
          )}
        </Button>
      </div>
    </form>
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
  autoComplete,
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
  autoComplete?: string;
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
    autoComplete,
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
