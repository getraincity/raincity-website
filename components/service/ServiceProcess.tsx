import { servicePage } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * How It Works — the customer's three steps, identical on all eleven pages.
 *
 * Set as a connected timeline, where it used to be three columns of numerals
 * on navy. The navy version had two problems. It was the site's third dark
 * band in a row on this page, and — more to the point — figure, amber rule,
 * title, body is close enough to /about's Process and to Pillars that the
 * three read as one component used three times. A rule per column reads as
 * one line broken into three only if you already know it is meant to; an
 * actual continuous rail running through the gutters does not need the
 * benefit of the doubt.
 *
 * The rail is a single absolutely-positioned line behind the grid, not a
 * border per column, which is the whole difference. Nodes sit on it — squared
 * blocks, because nothing on this site takes a radius — and each step hangs
 * from its node as a tinted card. The rail stays clear of the cards rather
 * than crossing them: a timeline whose line runs through its own content
 * reads as a rule that happens to be there, not as a thread the steps are
 * strung on.
 *
 * Stacked below md the rail turns with the layout: per-step vertical segments
 * joining each node to the next, running down the gutter to the left of the
 * cards. Without them the nodes read as three loose marks, which is the one
 * thing a timeline must not do.
 *
 * Numerals are kept, and are still earned: this is a sequence and the order
 * is the entire point. Set as an ordered list, so the sequence is in the
 * markup and not only in the figures drawn above it.
 *
 * Heading centred rather than ranged left. Every other heading on this page
 * hangs off the left edge — the masthead above, the closing band below — and
 * this is the one section whose content is symmetrical: three equal columns
 * on a single rail. A left-ranged heading over a symmetrical grid is the one
 * arrangement that looks like nobody chose it.
 *
 * No photograph, deliberately. A second frame here would have to be generic
 * to work on all eleven pages, and a generic photograph is worse than none.
 *
 * Sizing: the whole band was taken down about a quarter in one pass, every
 * value moved together so the internal proportions are the ones it already
 * had. Padding 48/128 to 36/96, heading display-l to display-m, numerals
 * display-xl to display-l with the echo offset following the cap height down,
 * card padding 24/32 to 20/24, heading-to-rail `block` to `gap-y`, rail-to-
 * card 28 to 20. The one thing that could not move is the eyebrow: 13px is
 * the smallest size in the type scale, so `overline` has no step below it and
 * the label holds its size while everything around it comes in. Its gap to
 * the heading took the reduction instead.
 */

/**
 * The step cards.
 *
 * A different family from the six-tile grid in the section above, which
 * rotates Mist / amber / Fog. This one is a progression rather than a
 * rotation — white, the border grey used as a surface, then a Pacific tint —
 * three steps of one cool ramp, which is the shape of the content: a
 * sequence, not a set. The section keeps its Fog ground, so the ramp starts
 * lighter than the ground and ends darker than it, and the middle card is
 * near enough to the ground to read as the hinge.
 *
 * All three are pale on purpose. This band sits between a RainCity Blue one
 * and a navy-scrimmed photograph, and it is the light section between them
 * that lets either of those read as dark.
 *
 * Whole literal class names, because Tailwind's scanner never sees a string
 * this file builds.
 */
const stepWash = ["bg-white", "bg-line", "bg-pacific/15"] as const;

/**
 * Nodes. The middle one takes amber.
 *
 * This is the second decorative use of the CTA accent on the site, after the
 * Why Choose Us index wash on the homepage, and it is deliberate in the same
 * way: three identical marks on a rail carry no information, and the eye
 * needs somewhere to land in the middle of a three-step run. It is an 16px
 * block, not a button, and there is no amber anywhere else in this section —
 * so nothing here competes with the quote CTAs above and below it for what
 * amber means.
 */
const nodeTone = ["bg-rc-blue", "bg-amber", "bg-rc-blue"] as const;

export function ServiceProcess() {
  const { steps } = servicePage.process;

  return (
    /* Not pt-section. The RainCity Blue band above closes with 64px of its
       own padding, and a further 128px on top of that put nearly 200px of
       empty Fog between the last trust point and this heading — which reads
       as a missing section, not as air.
       
       Both figures then came down a further quarter in the compaction pass
       (see the note at the head of this file): 48 to 36 at the top, and the
       foot from `section` to `section-sm`, which is 128 to 96 at desktop and
       holds at the 56px floor on a phone. The foot stays the larger of the
       two because what follows it is the squeegee edge into the closing
       photograph, and the cut needs ground to sit on. */
    <section className="bg-fog pt-9 pb-section-sm" aria-labelledby="process-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="mx-auto max-w-heading text-center">
          <SectionLabel bar="blue" className="justify-center">
            {servicePage.process.label}
          </SectionLabel>
          <h2 id="process-heading" className="display-m mt-4 text-navy">
            {servicePage.process.headline}
          </h2>
        </Reveal>

        <div className="relative mt-gap-y">
          {/* The rail. One line spanning the whole grid — gutters included —
              which is what makes the three steps read as connected rather
              than merely adjacent. `top-2` centres it on the 16px nodes.
              Hidden below md: stacked, the steps run down the page and the
              per-step vertical segments take the rail's job there. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-2 hidden h-hairline bg-pacific/35 md:block"
          />

          <Stagger
            as="ol"
            className="grid grid-cols-1 gap-y-gap-y md:grid-cols-3 md:gap-x-gap-x"
            delay={0.08}
          >
            {steps.map((step, i) => (
              /* Stacked, the step is indented clear of its own rail and
                 the node is lifted out of the flow to sit on it. From md the
                 node returns to the flow and the indent goes, which is the
                 horizontal layout unchanged. */
              <StaggerItem
                as="li"
                key={step.title}
                className="relative flex flex-col pl-8 md:pl-0"
              >
                {/* Stacked, the rail turns vertical: a segment from the foot
                    of this node, through the row gap, to the top of the next.
                    `-bottom-gap-y` is exactly the grid's own row gap, so the
                    segment lands on the following node however the clamp
                    resolves. Not drawn under the last step — a timeline that
                    runs on past its final node is an arrow to nowhere. */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-4 -bottom-gap-y left-2 w-hairline bg-pacific/35 md:hidden"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 block h-4 w-4 md:static",
                    nodeTone[i],
                  )}
                />

                {/* The card hangs below the node, which is what keeps the
                    rail off it, and grows to the row height: three columns of
                    unequal copy left ragged bottoms, which reads as three
                    cards that failed to line up rather than as three steps of
                    one process. The drop and the padding both came down a
                    quarter in the compaction pass — 28 to 20, and 24/32 to
                    20/24 — so the cards still clear the rail by the same
                    proportion of their own size. */}
                <div className={cn("mt-5 flex-1 p-5 lg:p-6", stepWash[i])}>
                  {/* aria-hidden: the list is already ordered, so a screen
                      reader announcing "one" and then "01" would say it
                      twice — and the echo would make it three times.

                      The echo is one duplicate, offset down and right at 40%
                      in the lighter of the two blues, and that is the whole
                      effect. It is a second copy of the same glyph in the
                      same face at the same size, not a shadow, a stroke or a
                      gradient. The offset is a fraction of the cap height,
                      not a fixed distance, so it came down with the figure:
                      4px under display-xl, 2px under display-l, both a little
                      over five per cent of the glyph. Enough to read as
                      depth, never enough to double the number. */}
                  <p aria-hidden="true" className="relative">
                    <span className="display-l absolute top-0 left-0 translate-x-0.5 translate-y-0.5 text-pacific/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-l relative block text-rc-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </p>
                  <h3 className="display-s mt-4 text-navy">{step.title}</h3>
                  <p className="body-base mt-3 text-steel">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
