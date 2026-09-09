import { aboutPage, business, locations } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
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

  const facts = [
    { label: local.baseLabel, value: business.base },
    {
      label: local.areaLabel,
      value: `${locations.length} ${local.areaSuffix}`,
    },
    { label: local.travelLabel, value: local.travelValue },
  ];

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
              lazy. */}
          <Reveal className="mt-10" delay={0.08}>
            <Photo
              name="aboutHomeGround"
              sizes="(min-width: 1024px) 41vw, 100vw"
            />
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

          {/* A definition list, because these are label-and-value pairs and the
              markup should say so. Set as a vertical stack rather than a row of
              three: three hairline-divided columns on a pale band is exactly
              what Stats is further up this page, and two sections sharing that
              shape would make the page repeat itself.

              Navy at 15% for the rules, not `border-line`. The line token is
              #dde4eb against Mist's #d8e9f6 — a couple of percent of luminance
              apart, which is a rule nobody can see. Opacity on a token colour
              is the same move Mission makes with Pacific on its navy row. */}
          <Stagger
            as="dl"
            className="mt-10 border-t border-t-navy/15"
            delay={0.16}
          >
            {facts.map((fact) => (
              <StaggerItem
                as="div"
                key={fact.label}
                className="border-b border-b-navy/15 py-4"
              >
                <dt className="eyebrow text-rc-blue">{fact.label}</dt>
                <dd className="body-base mt-2 text-navy">{fact.value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
