"use client";

import { useEffect, useRef, useState } from "react";
import { blogPage } from "@/lib/content";
import { Check, LinkIcon } from "@/components/ui/Icon";

/**
 * Copy this page's URL to the clipboard.
 *
 * The one control in the share row that cannot be a link. The other four are
 * plain anchors to the networks' own endpoints — no script, no SDK, no cookie
 * — and this is the exception that earns its client boundary: there is no
 * markup that copies to a clipboard.
 *
 * It carries a visible label where the other four do not, and that is
 * deliberate rather than inconsistent. A Facebook mark says what it does; a
 * chain link is the one icon in the row that does not tell anybody what will
 * happen, and it is also the one control here that has a result to report. So
 * it is a labelled button rather than a fifth square, which is what turns the
 * label swap into feedback instead of an unexplained tick.
 *
 * The URL is passed in rather than read from `location`. It is the post's
 * canonical URL on the production origin, which is what somebody pasting the
 * link means to share; `window.location.href` would hand a colleague
 * `localhost:3000` from a dev build, and in production a URL carrying
 * whatever query string the reader happened to arrive with.
 *
 * Three states, and the third is not decoration. `navigator.clipboard` is
 * unavailable on an insecure origin and can be refused outright by the
 * browser, so the failure is caught and said out loud — a button that does
 * nothing and reports success is worse than one that admits it did nothing.
 *
 * Two accessible-name rules are doing work here. The button's own name is
 * fixed, so it does not rename itself under a user who is still focused on
 * it, and the visible label is `aria-hidden` so the change is not announced
 * twice. The outcome — and only the outcome — goes through a `role="status"`
 * region, which is polite: it is read after whatever the user is doing,
 * without moving focus.
 *
 * The timer is cleared on unmount. Without it, a reader who copies and then
 * navigates leaves a `setState` pointed at a component that is gone.
 */
type State = "idle" | "copied" | "failed";

export function CopyLink({ url }: { url: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  const label =
    state === "copied"
      ? blogPage.post.share.copied
      : state === "failed"
        ? blogPage.post.share.copyFailed
        : blogPage.post.share.copy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={blogPage.post.share.copy}
        className="inline-flex min-h-cta-min items-center gap-2.5 border-2 border-line bg-white px-4 text-navy transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-white"
      >
        {state === "copied" ? (
          <Check className="shrink-0" />
        ) : (
          <LinkIcon className="shrink-0" />
        )}
        {/* Hidden from assistive technology: the button already has a fixed
            accessible name, and the outcome is announced by the status region
            below rather than by the name changing under the user. */}
        {/* `min-w` holds the button's width across all three labels, so the
            row does not jog sideways the moment somebody uses it. */}
        <span aria-hidden="true" className="meta min-w-24 text-left">
          {label}
        </span>
      </button>

      <span role="status" className="sr-only">
        {state === "idle" ? "" : label}
      </span>
    </>
  );
}
