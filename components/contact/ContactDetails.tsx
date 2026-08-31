import { business, contactPage } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Clock, Mail, MapPin, Phone } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/** Named in content.ts so the copy owns the pairing, not this component. */
const cardIcons = {
  phone: Phone,
  mail: Mail,
  clock: Clock,
  pin: MapPin,
} as const;

type CardIcon = keyof typeof cardIcons;

/**
 * Four ways to reach RainCity — a row of bordered plates, not a line of small
 * print. Border and hover follow the service card's own recipe (1px line,
 * moves to RainCity Blue on hover), and the icon sits in a solid navy/amber
 * plate rather than a fifth new treatment — that pairing is already the
 * quote form's "request received" badge, reused here rather than invented.
 *
 * Card copy (title, supporting line) comes from `contactPage.details.cards`;
 * the phone number, email, hours and service area underneath each one are
 * read straight off `business`, exactly as the footer and header strip do,
 * so a change to a number only ever has to be made once.
 */
export function ContactDetails() {
  return (
    <section className="bg-white py-section" aria-labelledby="contact-details-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="max-w-prose">
          <SectionLabel>{contactPage.details.label}</SectionLabel>
          <h2 id="contact-details-heading" className="display-l mt-5 text-navy">
            {contactPage.details.headline}
          </h2>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-x-gap-x gap-y-gap-y sm:grid-cols-2 lg:grid-cols-4"
          delay={0.08}
        >
          {contactPage.details.cards.map((card) => {
            const Icon = cardIcons[card.icon];
            return (
              <StaggerItem
                as="li"
                key={card.title}
                className="flex h-full flex-col border border-line p-card transition-colors duration-200 hover:border-rc-blue"
              >
                <span className="flex size-10 shrink-0 items-center justify-center bg-navy text-amber">
                  <Icon />
                </span>

                <h3 className="display-s mt-5 text-navy">{card.title}</h3>

                <div className="mt-2">
                  <CardValue icon={card.icon} />
                </div>

                <p className="meta mt-4 text-muted">{card.note}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const valueClass =
  "body-s font-medium text-rc-blue underline underline-offset-4 transition-colors duration-200 hover:text-navy";

function CardValue({ icon }: { icon: CardIcon }) {
  switch (icon) {
    case "phone":
      return (
        <a href={business.phoneHref} className={valueClass}>
          {business.phone}
        </a>
      );
    case "mail":
      return (
        <a href={business.emailHref} className={`${valueClass} break-words`}>
          {business.email}
        </a>
      );
    case "clock":
      return (
        <div className="body-s font-medium text-steel">
          <p>{business.hours.weekdays}</p>
          <p>{business.hours.sunday}</p>
        </div>
      );
    case "pin":
      return (
        <p className="body-s font-medium text-steel">
          Based in {business.base}, serving {business.region}.
        </p>
      );
  }
}
