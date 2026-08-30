import Link from "next/link";
import { business, footer, social } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Clock, Mail, Phone, SocialIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";

export function Footer() {
  return (
    <footer className="on-navy bg-navy">
      {/* Bottom padding is deliberately short of the top: the copyright strip
          below closes the page, so a full section's worth of navy under the
          last column was dead space rather than breathing room. */}
      {/* One reveal for the columns. The copyright strip below is left
          alone: it is the last thing on the page, and fading in the band that
          closes it reads as the page still loading. */}
      <Reveal className="mx-auto max-w-site px-edge pt-section-sm pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            {/* Left as body copy — the one thing down here that is prose rather
                than a label, so it keeps the body face. `max-w-tagline`, not the
                column width: see the token for why 280px. */}
            <p className="body-s mt-6 max-w-tagline text-fog">{footer.tagline}</p>

            {/* Same target size, colour and hover as the header's social row —
                one control, one behaviour, wherever it appears. */}
            <ul className="-ml-1.5 mt-4 flex items-center">
              {social.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="group inline-flex size-8 items-center justify-center text-white/75 transition-colors duration-200 hover:bg-white/15 hover:text-amber sm:size-9"
                  >
                    <SocialIcon
                      name={s.icon}
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:scale-110 sm:size-4.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            {/* Body face at 500 — the header nav's family and weight. Not `meta`:
                that token carries `text-transform: uppercase` and 0.1em tracking,
                which are a caps-only device. The footer names things ("Contact
                Info", "About Us"), so it is set as written. `body-l` over the
                links' `body-s` restores the size step the display face used to
                carry, since white-over-fog alone is a thin distinction. */}
            <h2 className="body-l font-medium text-white">Contact Info</h2>
            <ul className="mt-5">
              <li>
                <a
                  href={business.phoneHref}
                  className="body-s font-medium inline-flex items-center gap-2.5 py-1.5 text-fog transition-colors duration-200 hover:text-amber"
                >
                  <Phone className="shrink-0 text-pacific" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="body-s font-medium inline-flex items-center gap-2.5 py-1.5 text-fog transition-colors duration-200 hover:text-amber"
                >
                  <Mail className="shrink-0 text-pacific" />
                  {business.email}
                </a>
              </li>
            </ul>
            {/* The one caps label kept down here. "Open Hours" is a label on the
                two lines below it, not a name or a destination — the same small
                -label role `eyebrow` plays above every section on the site. */}
            <h3 className="meta mt-6 flex items-center gap-2.5 text-pacific">
              <Clock className="shrink-0" />
              Open Hours
            </h3>
            <p className="body-s font-medium mt-2 text-fog">{business.hours.weekdays}</p>
            <p className="body-s font-medium text-fog">{business.hours.sunday}</p>
          </div>

          <FooterLinks
            title="Quick Links"
            links={footer.quickLinks}
            className="lg:col-span-2"
          />
          {/* One column wider than Quick Links: "Terms & Conditions" is the
              longest label in the footer and sets this column's floor. */}
          <FooterLinks
            title="Additional Links"
            links={footer.additionalLinks}
            className="lg:col-span-3"
          />
        </div>
      </Reveal>

      {/* Copyright strip. Mist rather than navy so it reads as a separate band
          closing the page, and full-bleed so the colour runs edge to edge. */}
      <div data-footer-bar className="bg-mist py-3.5">
        <p className="meta px-edge text-center text-navy">{footer.copyright}</p>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
  className,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav className={className} aria-label={title}>
      <h2 className="body-l font-medium text-white">{title}</h2>
      <ul className="mt-5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              // Block rather than inline-block: an inline-block here takes a
              // shrink-to-fit width that breaks two-word labels over two
              // lines. Every column is wide enough for its longest label, so
              // nowrap holds each one on a single line without overflowing.
              className="body-s font-medium block w-fit py-1.5 whitespace-nowrap text-fog transition-colors duration-200 hover:text-amber"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
