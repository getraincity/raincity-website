"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentProps, ElementType, ReactNode } from "react";

/**
 * Site motion primitives.
 *
 * Every animated thing on the site goes through one of the three wrappers
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
 * `prefers-reduced-motion` is honoured in CSS, not here — see the
 * `[data-motion]` rule in globals.css. That was a deliberate second attempt:
 * branching on `useReducedMotion()` reads the media query on the client only,
 * so the server still rendered the animated branch and shipped
 * `style="opacity:0"` in the HTML. React does not clear a server-rendered
 * style attribute the client render no longer sets, so every reveal on the
 * page stayed invisible for exactly the users who asked for less motion. A
 * stylesheet rule cannot desynchronise from the server, and it holds even if
 * the JavaScript never arrives.
 */

/** Smooth ease-out. Decelerates into place; no overshoot, ever. */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const DURATION = 0.5;
const DISTANCE = 16;

/** Trigger a little before the element is fully on screen. */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

const hidden = { opacity: 0, y: DISTANCE };
const shown = { opacity: 1, y: 0 };

const revealVariants: Variants = {
  hidden,
  shown: { ...shown, transition: { duration: DURATION, ease: EASE } },
};

/**
 * The elements these wrappers need to be able to *become*. Motion has to
 * render the real tag — a `div` wrapped around a grid child or a list item
 * would break the layout it sits in.
 */
const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  figure: motion.figure,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

type Tag = keyof typeof tags;

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
  const Tag = tags[as] as ElementType;

  return (
    <Tag
      data-motion
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * The same fade-up, but run on mount instead of on scroll. Only the hero uses
 * this: it is above the fold on load, so a viewport trigger would fire at the
 * same moment anyway and only add a scroll listener for nothing.
 */
export function RevealOnLoad({ children, as = "div", className, delay = 0, ...rest }: BaseProps) {
  const Tag = tags[as] as ElementType;

  return (
    <Tag
      data-motion
      className={className}
      initial={hidden}
      animate={shown}
      transition={{ duration: DURATION, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A grid or list whose children come in one after another. Wrap the container
 * in `Stagger` and each child in `StaggerItem`; the container holds the
 * viewport trigger and the children inherit their cue from it through
 * Motion's variant context, so the whole set is keyed off the grid entering
 * the viewport rather than each item entering separately.
 */
export function Stagger({
  children,
  as = "div",
  className,
  /** Seconds between children. */
  step = 0.07,
  delay = 0,
  ...rest
}: BaseProps & { step?: number }) {
  const Tag = tags[as] as ElementType;

  return (
    <Tag
      data-motion
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ shown: { transition: { staggerChildren: step, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** One child of a `Stagger`. Takes its cue from the container, not the scroll. */
export function StaggerItem({ children, as = "div", className, ...rest }: BaseProps) {
  const Tag = tags[as] as ElementType;

  return (
    <Tag data-motion className={className} variants={revealVariants} {...rest}>
      {children}
    </Tag>
  );
}
