"use client";

import {
  useEffect,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Site motion primitives.
 *
 * Every animated thing on the site goes through one of the four wrappers
 * below, so the vocabulary stays one sentence long: content fades up sixteen
 * pixels, once, and never does anything else. There are no springs, no
 * rotation, no scale and no parallax anywhere in this file — a maintenance
 * company's site should feel composed, and the fastest way to lose that is a
 * second animation idiom appearing in a corner of one section.
 *
 * Only `opacity` and `transform` are animated. Both are compositor
 * properties, so nothing here triggers layout or paint and nothing can move
 * an element's box after it has been measured — no CLS.
 *
 * These are client components, but the sections that use them stay server
 * components: children arrive as already-rendered RSC output and are simply
 * placed inside the animated element.
 *
 * ## Why there is no animation library here
 *
 * This used to be Framer Motion. Measured on `/services/gutter-cleaning`, the
 * library was 118 KB uncompressed / 38 KB gzipped of the page's JavaScript —
 * for a fade and a sixteen-pixel slide. The whole vocabulary is two CSS
 * keyframes; what actually needed code was the scroll trigger, and that is an
 * `IntersectionObserver`, which the browser already ships. So the animation
 * lives in globals.css (`@keyframes rc-reveal` and the `[data-motion]` rules)
 * and this file is the small amount of wiring that decides *when* it runs.
 *
 * ## Nothing is ever hidden in the HTML
 *
 * The rule that shapes the whole design: **the server never sends invisible
 * content.** Framer wrote its start state to an inline style, so every reveal
 * on the site shipped as `style="opacity:0;transform:translateY(16px)"` and
 * the page was blank until the bundle arrived and hydrated — a blocked
 * script, a failed chunk or an old browser left the page empty. Here the
 * resting state *is* the visible state, in the HTML and in the CSS, and
 * motion is added on top of it. If this file never executes, the site simply
 * does not animate.
 *
 * That inverts the usual problem: an element that is already visible cannot
 * be hidden after the fact without the reader seeing it blink out. So the
 * observer only ever arms an element that is **below the trigger line at the
 * moment it registers** — off screen, where hiding it costs nothing. Anything
 * already on screen when the JavaScript runs is left alone: visible, and
 * never animated. In practice that is the first screenful, which is where
 * `RevealOnLoad` lives anyway.
 *
 * `RevealOnLoad` needs no JavaScript at all. It is a CSS animation that
 * starts when the element is first styled — the same moment it would first
 * paint — so the banners animate on a cold load exactly as before, and now
 * they do it before the bundle has finished downloading rather than after.
 *
 * ## Reduced motion
 *
 * `prefers-reduced-motion` is honoured in CSS, not here — see the
 * `[data-motion]` rule in globals.css. That was a deliberate second attempt:
 * branching on a media query in JavaScript reads it on the client only, so
 * the server still rendered the animated branch, and every reveal on the page
 * stayed invisible for exactly the users who asked for less movement. A
 * stylesheet rule cannot desynchronise from the server, and it holds even if
 * the JavaScript never arrives. Nothing in this file reads the media query.
 *
 * ## The attribute contract
 *
 * `data-motion` is the hook, and it stays that way: the reduced-motion rule
 * and the `<noscript>` override in app/layout.tsx both key off it. The value
 * says which of the four wrappers rendered the element; `data-motion-state`
 * is written only by the observer below, and only in the browser.
 */

/** Seconds between children of a `Stagger`, unless the caller says otherwise. */
const STEP = 0.07;

/**
 * Trigger a little before the element is fully on screen. The two constants
 * are one decision expressed twice — `rootMargin` for the observer, the ratio
 * for the "is it already on screen?" test at registration — so they have to
 * move together.
 */
const TRIGGER_MARGIN = "0px 0px -12% 0px";
const TRIGGER_LINE = 0.88;

/* --------------------------------------------------------------------------
   The observer. One instance for the whole document, created on first use.
   -------------------------------------------------------------------------- */

let io: IntersectionObserver | null = null;

/** Elements that have mounted but not yet been measured. */
const waiting: HTMLElement[] = [];
let flushQueued = false;

/**
 * The children of one stagger container. Filtered by `closest` rather than
 * taken straight from `querySelectorAll` so that a nested `Stagger` keeps its
 * own children — the descendant selector alone would let an outer container
 * claim an inner container's items and stagger them into the wrong row.
 */
function childrenOf(container: HTMLElement): HTMLElement[] {
  const found = container.querySelectorAll<HTMLElement>('[data-motion="item"]');
  return Array.from(found).filter(
    (item) => item.closest('[data-motion="stagger"]') === container,
  );
}

/**
 * Hide an element that is off screen, ready to be revealed. A stagger arms its
 * children instead of itself: the container never fades, it only carries the
 * cue — which is what makes the whole row key off the grid entering the
 * viewport rather than each card entering separately.
 *
 * The index is written here, at arm time, because it is what the per-child
 * delay is computed from in CSS. Doing it in React would mean cloning
 * children to inject a prop, which breaks the moment a caller maps over a
 * fragment; DOM order is the same order and cannot be got wrong.
 */
function arm(el: HTMLElement) {
  if (el.dataset.motion === "stagger") {
    childrenOf(el).forEach((item, i) => {
      item.style.setProperty("--rc-i", String(i));
      item.dataset.motionState = "armed";
    });
    return;
  }
  el.dataset.motionState = "armed";
}

/** Run the reveal. Same shape as `arm`: a container plays its children. */
function play(el: HTMLElement) {
  if (el.dataset.motion === "stagger") {
    for (const item of childrenOf(el)) item.dataset.motionState = "in";
    return;
  }
  el.dataset.motionState = "in";
}

function observer(): IntersectionObserver {
  if (io) return io;

  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        // Once only. Unobserving here rather than tracking a flag is the
        // cheapest form of `once: true` and cannot drift out of step.
        io?.unobserve(entry.target);
        play(entry.target as HTMLElement);
      }
    },
    { rootMargin: TRIGGER_MARGIN },
  );

  // Hand the element back to the browser once it has arrived. With the state
  // attribute gone the animation declaration goes with it, the compositor
  // layer is released, and the element's resting style is byte-for-byte the
  // one the server sent. `animationend` bubbles, so one listener covers every
  // reveal on the page rather than one per element.
  document.addEventListener("animationend", (event: AnimationEvent) => {
    const el = event.target;
    if (event.animationName !== "rc-reveal") return;
    if (el instanceof HTMLElement && el.dataset.motionState === "in") {
      delete el.dataset.motionState;
    }
  });

  return io;
}

/**
 * Measure everything that has mounted, then decide. Batched into one pass on a
 * microtask because a page can carry well over a hundred of these: reading a
 * rect immediately after writing to the DOM forces a fresh layout, so all the
 * reads happen first and all the writes after. One layout, not a hundred.
 */
function flush() {
  flushQueued = false;
  const batch = waiting.splice(0, waiting.length);

  // Read.
  const line = window.innerHeight * TRIGGER_LINE;
  const offScreen = batch.map((el) => el.getBoundingClientRect().top >= line);

  // Write.
  batch.forEach((el, i) => {
    // Already on screen — or scrolled past. Leave it visible and unobserved:
    // hiding something the reader can see, in order to fade it back in, is
    // the one thing this implementation exists to avoid.
    if (!offScreen[i]) return;
    arm(el);
    observer().observe(el);
  });
}

/**
 * Register an element with the observer. Returns the ref to hang on it.
 *
 * Registration happens per element rather than in one document-wide sweep
 * because the App Router navigates on the client: a soft navigation mounts a
 * new page's reveals with no reload for a one-shot scan to hook into.
 */
function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    waiting.push(el);
    if (!flushQueued) {
      flushQueued = true;
      // A microtask, not a frame: React runs a commit's effects inside one
      // task, so this lands after the last of them and still before the
      // browser paints again. Nothing gets armed a frame late.
      queueMicrotask(flush);
    }

    return () => {
      const i = waiting.indexOf(el);
      if (i >= 0) waiting.splice(i, 1);
      io?.unobserve(el);
    };
  }, []);

  return ref;
}

/**
 * The element's own delay, as a custom property. Emitted only when there is
 * one: the CSS resets `--rc-delay` to zero per element, and a page carries
 * enough of these that an inert `style="--rc-delay:0s"` on every one of them
 * is payload for nothing.
 */
function delayStyle(delay: number): CSSProperties | undefined {
  if (!delay) return undefined;
  return { "--rc-delay": `${delay}s` } as CSSProperties;
}

/**
 * The elements these wrappers need to be able to *become*. A `div` wrapped
 * around a grid child or a list item would break the layout it sits in.
 */
type Tag =
  | "div"
  | "section"
  | "ul"
  | "ol"
  | "li"
  | "figure"
  | "h1"
  | "h2"
  | "h3"
  | "p";

type BaseProps = {
  children: ReactNode;
  /** Which element to render. Defaults to a div. */
  as?: Tag;
  className?: string;
  /** Seconds. Used for the hero's hand-timed stagger. */
  delay?: number;
} & Omit<ComponentProps<"div">, "children" | "className" | "style">;

/**
 * A single block fading up as it scrolls into view: section eyebrows and
 * headings, a photograph, a standalone card.
 */
export function Reveal({ children, as = "div", className, delay = 0, ...rest }: BaseProps) {
  const Tag = as as ElementType;
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      data-motion="reveal"
      className={className}
      style={delayStyle(delay)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * The same fade-up, but run on load instead of on scroll. Only the banners use
 * this: they are above the fold, so a viewport trigger would fire at the same
 * moment anyway and only add a scroll listener for nothing.
 *
 * There is no JavaScript in this one at all — the animation is a CSS rule
 * keyed off the attribute, so it starts as the element is first styled. That
 * is earlier than the old Framer version could manage (which had to wait for
 * hydration before it could clear its own `opacity: 0`), and it means the
 * largest element on most pages is painted from the HTML rather than from a
 * bundle.
 */
export function RevealOnLoad({ children, as = "div", className, delay = 0, ...rest }: BaseProps) {
  const Tag = as as ElementType;

  return (
    <Tag data-motion="load" className={className} style={delayStyle(delay)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * A grid or list whose children come in one after another. Wrap the container
 * in `Stagger` and each child in `StaggerItem`; the container holds the
 * viewport trigger and the children take their cue from it, so the whole set
 * is keyed off the grid entering the viewport rather than each item entering
 * separately.
 *
 * The rhythm is published to CSS as two custom properties rather than being
 * applied per child in JavaScript. They inherit, so every `StaggerItem` inside
 * — at any depth — computes its own delay from its index, and a nested
 * container overrides both for its own subtree by setting them again.
 */
export function Stagger({
  children,
  as = "div",
  className,
  /** Seconds between children. */
  step = STEP,
  delay = 0,
  ...rest
}: BaseProps & { step?: number }) {
  const Tag = as as ElementType;
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      data-motion="stagger"
      className={className}
      style={{ "--rc-step": `${step}s`, "--rc-lead": `${delay}s` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * One child of a `Stagger`. Takes its cue from the container, not the scroll,
 * and carries no JavaScript of its own — the container arms it and writes its
 * index, and the CSS turns that index into a delay.
 */
export function StaggerItem({ children, as = "div", className, ...rest }: BaseProps) {
  const Tag = as as ElementType;

  return (
    <Tag data-motion="item" className={className} {...rest}>
      {children}
    </Tag>
  );
}
