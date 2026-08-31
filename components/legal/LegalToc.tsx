"use client";

import { useEffect, useState } from "react";
import type { LegalSection } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ChevronDown } from "@/components/ui/Icon";

/**
 * The table of contents, in its two forms.
 *
 * A policy page is not read top to bottom. Somebody arrives wanting the
 * cancellation window or the retention period, and the job of this component
 * is to get them there in one click from anywhere on the page — which is why
 * the desktop form is sticky rather than a list at the top that scrolls away
 * the moment it becomes useful.
 *
 * Both forms render real `<a href="#id">` anchors, so navigation works with
 * JavaScript off and the whole contents list is in the markup for a crawler.
 * The only thing the client boundary buys is state: which section is in view
 * on desktop, and open/closed on mobile. That is the same split the FAQ
 * accordion uses — a server section with one interactive piece inside it.
 *
 * Scroll-spy is `IntersectionObserver` against a band across the upper third
 * of the viewport rather than a scroll handler doing arithmetic on every
 * frame. The rootMargin is what makes it behave: a section counts as current
 * once its heading has cleared the sticky header, and stops counting when the
 * next one does, so the marker moves once per section instead of flickering
 * between two of them at a boundary.
 */
function useActiveSection(sections: readonly LegalSection[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Top inset clears the sticky header; the large bottom inset leaves a
      // narrow band in play, so only one section is ever intersecting.
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  return active;
}

/** One row, shared by both forms so the numeral column cannot drift apart. */
function TocLink({
  section,
  index,
  isActive,
}: {
  section: LegalSection;
  index: number;
  isActive: boolean;
}) {
  return (
    <li className="relative">
      {/* The active marker. A 3px rule — the system's hairline — in the gutter
          rather than a border on the row, so nothing shifts when it appears.
          Same device as the open row on the FAQ accordion. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 bottom-0 left-0 w-hairline transition-colors duration-200",
          isActive ? "bg-rc-blue" : "bg-transparent",
        )}
      />
      <a
        href={`#${section.id}`}
        aria-current={isActive ? "true" : undefined}
        className="group grid grid-cols-[auto_1fr] items-baseline gap-x-3 py-2 pl-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            "meta transition-colors duration-200",
            isActive ? "text-rc-blue" : "text-muted",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "body-s transition-colors duration-200",
            isActive
              ? "font-medium text-rc-blue"
              : "text-steel group-hover:text-navy",
          )}
        >
          {section.title}
        </span>
      </a>
    </li>
  );
}

/**
 * Desktop: a sticky rail in the left three columns. `top-24` clears the
 * sticky header with the same margin the section anchors scroll to, so a
 * jumped-to heading lands level with the top of this list rather than above
 * or below it.
 */
export function LegalTocDesktop({
  sections,
}: {
  sections: readonly LegalSection[];
}) {
  const active = useActiveSection(sections);

  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-24 lg:block"
    >
      <p className="meta text-rc-blue">On this page</p>
      <span aria-hidden="true" className="mt-4 block h-px w-full bg-line" />
      <ol className="mt-4">
        {sections.map((section, i) => (
          <TocLink
            key={section.id}
            section={section}
            index={i}
            isActive={active === section.id}
          />
        ))}
      </ol>
    </nav>
  );
}

/**
 * Tablet and phone: the same list, collapsed into a disclosure at the top of
 * the content column. Closed on load — open, it is eight rows of furniture
 * between the reader and the first clause.
 *
 * The panel is a CSS grid animating 0fr to 1fr, the `collapse-open` /
 * `collapse-closed` pair in globals.css, so it is a real height animation
 * with nothing measured in JavaScript. A closed panel is `inert`, which keeps
 * its links out of the tab order and the accessibility tree while leaving
 * them in the DOM for a crawler. Same mechanism as the FAQ accordion.
 *
 * It deliberately does NOT close when you pick a section. This list sits above
 * every one of its own targets in the document, so collapsing it on click
 * pulls all of them up by the height of the panel — the browser has already
 * committed to a scroll position by then, and the heading you asked for ends
 * up that far above the top of the screen. Measured at 375px it overshot by
 * 265px, exactly the panel's height. Leaving it open costs nothing: by the
 * time the jump lands, the panel is off the top of the screen anyway.
 */
export function LegalTocMobile({
  sections,
}: {
  sections: readonly LegalSection[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = "legal-toc-panel";

  return (
    <nav aria-label="On this page" className="border border-line lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="meta text-rc-blue">On this page</span>
        <span className="flex items-center gap-3">
          <span className="body-s text-steel">{sections.length} sections</span>
          {/* Same rotation, duration and easing as the header dropdown and the
              FAQ accordion — one toggle idiom on the site, not three. */}
          <ChevronDown
            className={cn(
              "shrink-0 transition-transform duration-200",
              open ? "rotate-180 text-rc-blue" : "text-steel",
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "collapse-open" : "collapse-closed",
        )}
      >
        <div className="overflow-hidden">
          <ol className="border-t border-line px-5 py-3">
            {sections.map((section, i) => (
              <TocLink
                key={section.id}
                section={section}
                index={i}
                // No active state here. The rail on desktop is pinned and
                // visible while you read, so "where am I" is worth tracking;
                // this list is scrolled past the moment you use it.
                isActive={false}
              />
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
