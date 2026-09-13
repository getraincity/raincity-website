import Link from "next/link";
import {
  communityFor,
  locationPage,
  type CommunityItem,
  type Location,
} from "@/lib/content";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Off The Clock — what the crew turns out for in this community, unpaid.
 *
 * Asked for by the client (2026-09-13): community involvement "with some local
 * events pictures", so a reader from Burnaby comes away thinking these people
 * are part of the place, not only that they will drive to it. THE CONTENT IS
 * PLACEHOLDER and the photographs are stock — read the banner on
 * `communityBySlug` in content.ts before treating any entry as a fact.
 *
 * THE IDEA: the volunteering that suits an exterior cleaning company is its
 * own trade done for free — a litter crew behind a parade, a shoreline
 * clean-up, a neighbour's steps after snow. That is what keeps this from
 * reading as a generic charity band dropped onto nine pages.
 *
 * LAYOUT: one feature frame and two smaller ones, not three equal cards —
 * the page already has an eleven-card grid above it and a card row below.
 * Every frame is a captioned photograph in the grammar the client approved on
 * /about (navy scrim, meta eyebrow, white title) with the service card's blue
 * corner notch, so nothing here is new vocabulary. At `lg` the feature spans
 * both rows and takes whatever height the two 3:2 frames beside it make; below
 * `lg` everything stacks, feature first — 3:2 on a tablet, 4:5 on a phone so
 * the caption does not bury the picture. No carousel.
 *
 * FEWER THAN THREE ENTRIES: one is a single wide frame, two sit side by side,
 * none renders no section — the `social` and Founders rule.
 *
 * UNDER THE PHOTOGRAPHS, AN INVITATION RATHER THAN A CLAIM: "Running a
 * clean-up or a community event in X? Tell us about it." It is true before a
 * single entry is confirmed, and it goes to /contact, not to the quote form —
 * it is not a sales enquiry.
 *
 * Fog ground, between the White map above and the White Local Partners below.
 */

// Grid placement by entry count. Whole literal strings, for the scanner.
const layout = {
  1: ["lg:col-span-12"],
  2: ["lg:col-span-6", "lg:col-span-6"],
  3: ["lg:col-span-7 lg:row-span-2", "lg:col-span-5", "lg:col-span-5"],
} as const;

export function LocationCommunity({ location }: { location: Location }) {
  const items = communityFor(location).slice(0, 3);
  if (items.length === 0) return null;
  const copy = locationPage.community;
  const place = layout[items.length as 1 | 2 | 3];

  return (
    <section className="bg-fog py-section" aria-labelledby="community-heading">
      <div className="mx-auto max-w-site px-edge">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="community-heading" className="display-l mt-5 text-navy">
              {/* The place on its own line — the same fixed break as Local
                  Partners, so the two headings read as a pair on every page. */}
              {copy.headingBefore}{" "}
              <span className="block">
                {copy.headingPlace}
                {location.name}
              </span>
            </h2>
          </div>
          {/* `lg:w-5/12` rather than a named max-width: the container scale is
              reset in globals.css. Same header row as Partnerships on /about. */}
          <p className="body-l max-w-prose text-steel lg:w-5/12 lg:max-w-none">
            {copy.body}
          </p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-block grid grid-cols-1 gap-gap-x lg:grid-cols-12"
          delay={0.08}
        >
          {items.map((item, i) => (
            <StaggerItem as="li" key={item.title} className={place[i]}>
              <CommunityFrame
                item={item}
                feature={i === 0 && items.length === 3}
                wide={items.length === 1}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal
          className="mt-8 flex flex-col gap-4 border-t border-t-line pt-6 sm:flex-row sm:items-baseline sm:justify-between"
          delay={0.08}
        >
          <p className="body-base text-navy">
            {copy.inviteBefore}
            {location.name}
            {copy.inviteAfter}{" "}
            <Link
              href="/contact"
              className="meta group ml-1 inline-flex items-center gap-2 whitespace-nowrap text-rc-blue transition-colors duration-200 hover:text-navy"
            >
              {copy.inviteCta}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </p>
          {copy.illustrative && (
            <p className="meta shrink-0 text-steel">{copy.illustrativeNote}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function CommunityFrame({
  item,
  feature,
  wide,
}: {
  item: CommunityItem;
  feature: boolean;
  wide: boolean;
}) {
  return (
    // RainCity Blue behind the notch, as behind every service card photo.
    <figure className="h-full overflow-hidden rounded-card bg-rc-blue">
      <div
        className={cn(
          "card-corner-cut relative",
          // 4:5 on phones: at 3:2 the caption scrim covered almost the whole
          // frame and the photograph disappeared behind its own text.
          feature
            ? "aspect-4/5 sm:aspect-3/2 lg:aspect-auto lg:h-full"
            : wide
              ? "aspect-4/5 sm:aspect-3/2 lg:aspect-21/9"
              : "aspect-4/5 sm:aspect-3/2",
        )}
      >
        <Photo
          name={item.photo}
          fill
          sizes={feature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
        />

        {/* Caption on the navy scrim — the Who We Are / Home Ground grammar.
            Taller on the feature, where there is room for the line to breathe. */}
        <figcaption
          className={cn(
            "absolute inset-x-0 bottom-0 px-5 pb-5",
            feature ? "pt-24 sm:px-8 sm:pb-8" : "pt-16",
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-navy via-navy/80 to-transparent"
          />
          <div className="relative max-w-prose">
            <p className="meta text-fog">{item.when}</p>
            <p className={cn("mt-2 text-white", feature ? "display-m" : "display-s")}>
              {item.title}
            </p>
            <p className={cn("mt-2 text-fog", feature ? "body-base" : "body-s")}>
              {item.line}
            </p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
