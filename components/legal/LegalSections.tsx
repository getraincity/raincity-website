import type { LegalIconName, LegalSection } from "@/lib/content";
import { AccentList } from "@/components/ui/AccentList";
import { Reveal } from "@/components/ui/Motion";
import {
  AlertTriangle,
  Archive,
  Calendar,
  Camera,
  Check,
  ClipboardList,
  Clock,
  Cookie,
  CreditCard,
  ExternalLink,
  FileText,
  Info,
  Key,
  Lock,
  Mail,
  Receipt,
  Route,
  Scale,
  Share,
  ShieldCheck,
  Target,
  Users,
} from "@/components/ui/Icon";

/**
 * The clause body of a policy page.
 *
 * The brief this section is built against is "must not look like a basic wall
 * of text", and the answer is furniture rather than decoration: every clause
 * opens on a numbered rule, carries a mark that says what it is about, and
 * closes on either a list with real markers or a callout. Nothing here is a
 * gradient, a rounded card or a shadow — the page is legible because it is
 * ruled and numbered, which is how a legal document has always been legible.
 */

/**
 * Icon name to component. A lookup rather than a constructed import, for the
 * same reason the Tailwind class names in this codebase are whole literals:
 * nothing that has to be resolved at runtime from a string the bundler cannot
 * see. It also keeps `content.ts` free of any import from `components/`.
 */
const icons: Record<
  LegalIconName,
  (p: { className?: string }) => React.ReactElement
> = {
  fileText: FileText,
  clipboardList: ClipboardList,
  calendar: Calendar,
  receipt: Receipt,
  creditCard: CreditCard,
  scale: Scale,
  route: Route,
  share: Share,
  cookie: Cookie,
  archive: Archive,
  key: Key,
  lock: Lock,
  info: Info,
  target: Target,
  camera: Camera,
  externalLink: ExternalLink,
  alertTriangle: AlertTriangle,
  shieldCheck: ShieldCheck,
  users: Users,
  clock: Clock,
  check: Check,
  mail: Mail,
};

export function LegalSections({
  sections,
}: {
  sections: readonly LegalSection[];
}) {
  return (
    <div className="flex flex-col gap-block">
      {sections.map((section, i) => (
        <Clause key={section.id} section={section} index={i} />
      ))}
    </div>
  );
}

function Clause({ section, index }: { section: LegalSection; index: number }) {
  const Icon = icons[section.icon];

  return (
    // scroll-mt clears the sticky header, and matches the `top-24` the
    // desktop contents rail sticks at — so a jumped-to heading arrives level
    // with the top of that list rather than above or below it.
    <Reveal
      as="section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-24"
    >
      {/* The numbered rule. The numeral sits on the line rather than in a
          badge, and the hairline runs out to the column edge — the same
          masthead device the service overview opens on, which is what keeps
          eight of these from reading as eight stacked cards.

          Numerals are the one thing on this template that breaks the site's
          rule against numbered markers, and they are earned: a clause number
          is how a legal document is cited, and "see section 4" has to resolve
          to something a reader can actually find. */}
      <div className="flex items-center gap-4">
        <span className="meta shrink-0 text-rc-blue">
          Section {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <h2
        id={`${section.id}-heading`}
        className="display-m mt-5 flex items-start gap-4 text-navy"
      >
        {/* Mist rather than Fog: at 36px on a white ground Fog is close to
            invisible, and this plate has to read as a mark rather than as a
            slightly grey square. mt-1 sets it on the cap height of the first
            line, not the line box. */}
        <span
          aria-hidden="true"
          className="mt-1 flex size-9 shrink-0 items-center justify-center bg-mist text-rc-blue"
        >
          <Icon />
        </span>
        <span>{section.title}</span>
      </h2>

      {section.body?.map((paragraph) => (
        <p key={paragraph} className="body-base mt-5 max-w-prose text-steel">
          {paragraph}
        </p>
      ))}

      {section.list ? (
        <AccentList items={section.list} className="mt-6 max-w-prose" />
      ) : null}

      {section.after?.map((paragraph) => (
        <p key={paragraph} className="body-base mt-5 max-w-prose text-steel">
          {paragraph}
        </p>
      ))}

      {section.callout ? <Callout {...section.callout} /> : null}
    </Reveal>
  );
}

/**
 * The one clause per page a reader must not scroll past.
 *
 * Mist ground with a RainCity Blue rule down the left edge. The rule is an
 * absolutely-positioned `w-hairline` span rather than a border, because 3px
 * is a system token and 4px — the nearest border utility — is not.
 *
 * Deliberately not amber. Amber on this site means "act here" and is spent on
 * CTAs only; a callout that used it would be the fourth amber thing on the
 * page competing with the one that is actually a button.
 */
function Callout({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative mt-8 max-w-prose bg-mist p-6 sm:p-7">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-hairline bg-rc-blue"
      />
      <p className="meta text-rc-blue">{title}</p>
      <p className="body-base mt-3 text-navy">{body}</p>
    </div>
  );
}
