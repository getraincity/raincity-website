import { aboutPage, business, locations } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MapPin, Route, Check } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Home Ground — where the company is based, and what that changes.
 *
 * Added at the client's request ("about local to New West"). The copy note on
 * `aboutPage.local` explains why the section argues what it argues rather than
 * simply saying the company is local, which the site already does fourteen
 * times over. This comment covers why it looks the way it does, because four
 * of the obvious treatments are ruled out on this page in particular:
 *
 *  1. NOT a third copy-and-photograph split. Who We Are runs copy left, and
 *     Process deliberately runs the opposite hand so the page alternates
 *     rather than stacking two identical splits. A third would collapse that
 *     into three of the same section, which is why the photograph here sits
 *     under the heading in its own column rather than opposite the copy.
 *  2. NO `SectionEdge`. The 12 degree cut is spent in exactly four places and
 *     all four are taken — the homepage's mist-to-navy, this page's
 *     fog-to-navy above Mission, and the slim amber closers on the service
 *     and location templates.
 *  3. NOT navy. Mission's row is the only navy on this page besides the
 *     banner, and that is what stops a statement of intent reading as filler
 *     between the concrete sections either side of it.
 *  4. NO map, which is the one that would have gone unnoticed. `QuoteForm`
 *     sits on this page directly below, and it already embeds a Google map
 *     queried on the base city — so a map here would be the second New
 *     Westminster map inside one screen.
 *
 * Hence Mist. It is used nowhere else on /about, so the page gains a note
 * without a fifth ground, and it lands between Process and QuoteForm — both
 * white — which makes the band read as a deliberate pull-out rather than as a
 * smudge against Stats' fog. It is also the right place commercially:
 * proximity is a conversion argument, so it is the last thing read before the
 * form.
 *
 * THE PHOTOGRAPH, and why it is not New Westminster. Nothing in `public/` or
 * `assets/` shows this city, and the stock pools have nothing usable: the New
 * Westminster results are street furniture, a SkyTrain at a platform and a set
 * of monkey bars; the Fraser River results are wilderness; and one frame
 * returned under "New Westminster" is in fact Edinburgh, which is worth
 * remembering before trusting any of those listings. `aboutCrew`, the frame
 * the New Westminster location card already uses, shows a crew *re-roofing* a
 * house, and re-roofing is not one of the eleven services. `rooftops` is the
 * /locations hub hero, doing this exact job one page over.
 *
 * So the frame is chosen the way the nine location cards are: it shows the
 * kind of property and the kind of weather the copy describes, and its alt
 * text says what is in the picture rather than naming a city. It carries both
 * halves of the argument at once — a residential street on a slope, and the
 * coastal cloud the second paragraph says sets the calendar — and every hard
 * surface in it, the rooflines and gutter runs and the driveway apron and the
 * retaining wall, is something on the service list. That is what makes it
 * better here than a scenic frame. Its `note` in photos.ts carries the rest.
 *
 * THE COLUMNS BALANCE BECAUSE OF WHERE THE TWO STACKS SIT, and that took three
 * passes to get right, so it is worth writing down. The facts go under the
 * copy and the photograph goes under the heading, which puts roughly 730px in
 * the left column against roughly 630 in the right. Every other arrangement
 * leaves a void: heading-plus-facts against two paragraphs alone is 620
 * against 310, and moving the photograph into the copy column instead makes it
 * 620 against 820. The reading order falls out of it correctly on a phone as
 * well — heading, picture, argument, facts.
 *
 * Both derived facts are derived rather than written, the same arrangement as
 * `LocationMap`: `business.base` is the string the header, the footer and
 * every piece of structured data already print, and the count comes off
 * `locations`, so a tenth community updates this page by existing.
 */
export function HomeGround() {
  const { local } = aboutPage;

  // Each fact carries its own icon, its own accent colour, and a tint
  // background — the same alternating cool/warm/cool grammar the homepage
  // WhyChooseUs section uses on its row wash, adapted to Mist rather than
  // White (which is what changed since v1 of this section).
  //
  // The icons are all in `Icon.tsx` already, so nothing new was added to
  // the icon library for this: MapPin marks the fixed base, Route marks
  // the run of the service area, Check marks the "no travel charge"
  // benefit — mapping icon-to-value rather than icon-to-label. The
  // colours pull from the tokens the rest of the site already uses:
  // rc-blue for the base fact (primary), amber for the region fact
  // (warm), and rc-blue again for the price fact (which needs to read as
  // a positive — a green would be a new token; a blue check is already
  // the treatment `CheckPlate` uses on the service pages).
  const facts = [
    {
      label: local.baseLabel,
      value: business.base,
      Icon: MapPin,
      tint: "bg-rc-blue/8 hover:bg-rc-blue/15",
      iconClass: "text-rc-blue",
    },
    {
      label: local.areaLabel,
      value: `${locations.length} ${local.areaSuffix}`,
      Icon: Route,
      tint: "bg-amber/10 hover:bg-amber/18",
      iconClass: "text-amber-ink",
    },
    {
      label: local.travelLabel,
      value: local.travelValue,
      Icon: Check,
      tint: "bg-rc-blue/8 hover:bg-rc-blue/15",
      iconClass: "text-rc-blue",
    },
  ] as const;

  return (
    <section
      className="bg-mist py-section"
      aria-labelledby="home-ground-heading"
    >
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-edge lg:grid-cols-12 lg:gap-x-gap-x">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>{local.label}</SectionLabel>
            <h2 id="home-ground-heading" className="display-l mt-5 text-navy">
              {local.heading}
              {/* Second line inside the same heading, not a sibling — the same
                  construction the banners use. Steel rather than the banners'
                  Fog, which is a dark-ground colour and would be unreadable on
                  Mist. */}
              <span className="display-m mt-3 block text-steel">
                {local.headingSub}
              </span>
            </h2>
          </Reveal>

          {/* No `priority`. This is a long way down /about, the banner is the
              LCP element, and everything below the fold on this site is
              lazy.
              *
              * The photograph sits inside its own container specifically so
              * the drop shadow can attach to a wrapper rather than the img
              * element itself. Touseef's note on 2026-09-10: "the picture
              * here isn't looking that much. Maybe there needs a effect of
              * dropping or something like that, a little bit slight smooth
              * so that the corner and the around the area doesn't look like
              * sharp anymore."
              *
              * The design system runs zero border-radius everywhere on
              * purpose — that discipline stays. Softness comes from a
              * shadow, not from curves. The value:
              *
              *   `0_25px_50px_-15px_rgba(20,38,54,0.28)`
              *
              * A large downward blur (50px) at negative spread (-15px) so
              * the shadow gathers under the photograph and fades gently
              * outward against Mist rather than ringing the frame. `#142636`
              * is Navy at 28% alpha — dark enough to read against the
              * pale ground, subtle enough not to compete with the picture
              * itself. Compared to the previous flat-edged treatment,
              * corners now feel seated on the ground rather than cut
              * into it. */}
          <Reveal className="mt-10" delay={0.08}>
            {/* Shadow set via inline style rather than a Tailwind arbitrary
                value. The commas inside `rgba(...)` are what tripped it —
                Tailwind's arbitrary-value parser treats them as separators
                and the whole box-shadow declaration comes out empty. An
                inline style bypasses the parser entirely, which is fine
                for a static value used in exactly one place. */}
            <div
              style={{
                boxShadow: "0 25px 50px -15px rgba(20, 38, 54, 0.28)",
              }}
            >
              <Photo
                name="aboutHomeGround"
                sizes="(min-width: 1024px) 41vw, 100vw"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {/* First paragraph at body-l, the second a step down — the same pair
              as Who We Are, and for the same reason: two paragraphs at one
              size give a wall of even grey with nothing to enter it by. */}
          <Reveal delay={0.08}>
            <p className="body-l text-steel">{local.body[0]}</p>
            <p className="body-base mt-5 text-steel">{local.body[1]}</p>
          </Reveal>

          {/* The facts, redesigned 2026-09-10 on the note that the plain
              hairline-divided list was reading as filler on this page.
              Touseef's own reference was WhyChooseUs on the homepage — a
              coloured, tinted, hover-active row grammar — and that is what
              this is, adapted to Mist. Three rows, each with its own icon
              medallion, alternating cool and warm tint, hovering to a
              deeper wash.
              *
              * The rows are cards rather than divided rows so each fact
              * reads as its own claim rather than as a strip. On Mist the
              * divisions of a plain hairline list disappear (line token
              * #dde4eb sits about 2 percent of luminance off the Mist
              * ground #d8e9f6 — a rule nobody can see). Tinted cards fix
              * that at the same time as the "feels flat" note.
              *
              * `<dl>` markup preserved: these are still label-and-value
              * pairs and the outline should say so. `dt`/`dd` sit inside
              * each row so a screen reader still walks the six items in
              * pairs rather than a flat list of six independent
              * paragraphs. */}
          <Stagger as="dl" className="mt-10 flex flex-col gap-3" delay={0.16}>
            {facts.map((fact) => (
              <StaggerItem
                as="div"
                key={fact.label}
                className={cn(
                  "flex items-start gap-4 border border-line px-5 py-5 sm:gap-5 sm:px-6 sm:py-6",
                  "transition-colors duration-250 ease-out",
                  fact.tint,
                )}
              >
                {/* Icon medallion. A square Fog plate holding the glyph —
                    the same treatment the credential row on the homepage
                    Awards section uses, at a smaller size. */}
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center bg-white sm:size-12",
                    fact.iconClass,
                  )}
                  aria-hidden="true"
                >
                  <fact.Icon className="size-5 sm:size-6" />
                </span>
                <div className="flex flex-col">
                  <dt className="eyebrow text-steel">{fact.label}</dt>
                  <dd className="display-s mt-1 text-navy">{fact.value}</dd>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
