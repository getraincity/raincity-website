import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = "raincitypms@gmail.com";

/**
 * POST /api/contact
 *
 * Receives quote-form submissions from QuoteForm.tsx, validates them
 * server-side, checks the honeypot, then delivers the submission to the
 * business inbox via Resend (https://resend.com — free tier covers 100
 * emails/day; paid plans from $20/month for higher volume).
 *
 * Required environment variables — set in .env.local (never committed):
 *   RESEND_API_KEY     — API key from resend.com/api-keys
 *   RESEND_FROM_EMAIL  — Verified sender address. Must be a domain you
 *                        have verified in Resend. Defaults to
 *                        noreply@raincitypms.com — verify raincitypms.com
 *                        in the Resend dashboard before launch.
 *
 * Wire the form up by setting in .env.local:
 *   NEXT_PUBLIC_FORM_ENDPOINT=/api/contact
 */
export async function POST(request: NextRequest) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — the hidden "company" field is filled only by bots.
  if (data.get("company")) {
    // Silent success: the bot thinks it worked, no email sent.
    return NextResponse.json({ ok: true });
  }

  const name    = String(data.get("name")    ?? "").trim();
  const phone   = String(data.get("phone")   ?? "").trim();
  const email   = String(data.get("email")   ?? "").trim();
  const service = String(data.get("service") ?? "").trim();
  const date    = String(data.get("date")    ?? "").trim();
  const info    = String(data.get("info")    ?? "").trim();

  // Server-side validation — mirrors the client-side checks in QuoteForm.tsx
  // so that a submission bypassing the browser UI is still rejected cleanly.
  if (!name)
    return NextResponse.json(
      { error: "Please tell us your name." },
      { status: 400 }
    );
  if (!phone)
    return NextResponse.json(
      { error: "We need a number to call you back on." },
      { status: 400 }
    );
  if (phone.replace(/\D/g, "").length < 10)
    return NextResponse.json(
      { error: "That number looks too short." },
      { status: 400 }
    );
  if (!email)
    return NextResponse.json(
      { error: "Please add an email address." },
      { status: 400 }
    );
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  if (!service)
    return NextResponse.json(
      { error: "Choose the service you need." },
      { status: 400 }
    );

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured — tell the caller so the form can surface a helpful message.
    return NextResponse.json(
      { error: "Email service not configured. Please call us directly." },
      { status: 503 }
    );
  }

  const bodyLines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service: ${service}`,
    ...(date ? [`Preferred date: ${date}`] : []),
    ...(info ? [`\nAdditional info:\n${info}`] : []),
  ];

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@raincitypms.com";

  let resendRes: Response;
  try {
    resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Quote Request — ${service}`,
        text: bodyLines.join("\n"),
      }),
    });
  } catch (err) {
    console.error("Resend network error:", err);
    return NextResponse.json(
      { error: "Could not reach email service. Please call us directly." },
      { status: 502 }
    );
  }

  if (!resendRes.ok) {
    const body = await resendRes.text().catch(() => "");
    console.error("Resend API error:", resendRes.status, body);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please call us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
