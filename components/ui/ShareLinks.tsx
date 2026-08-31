import type { BlogPost } from "@/lib/content";
import { blogPage } from "@/lib/content";
import { shareTargets } from "@/lib/blog";
import { Mail, SocialIcon } from "@/components/ui/Icon";

/**
 * The share row on a post card.
 *
 * Four plain links to the networks' own share endpoints — no SDK, no embedded
 * button, no script, no cookie. That is what lets the card stay a server
 * component and keeps four social networks from being told about every reader
 * who scrolls past one. The URLs themselves are built in lib/blog.ts.
 *
 * It sits inside a card whose title link is stretched across the whole card
 * (`after:absolute after:inset-0` on the heading link), so this list has to
 * paint above it — hence `relative z-10`. Without that the card's own link
 * would swallow every click meant for a share icon.
 *
 * Accessible names carry the post title: four cards would otherwise give a
 * screen-reader user four identical "Share on Facebook" links with nothing to
 * tell them apart. The icons themselves are `aria-hidden`, as everywhere else
 * in the icon set, and the group is labelled so the row reads as one thing.
 *
 * The email target is the odd one out and is deliberately included: it is the
 * only one of the four that works for the reader who wants to send a page to
 * a strata council rather than post it.
 */
export function ShareLinks({ post }: { post: BlogPost }) {
  const targets = shareTargets(post);

  return (
    <ul
      aria-label={`${blogPage.card.shareLabel}: ${post.title}`}
      className="relative z-10 flex items-center gap-1"
    >
      {targets.map((target) => (
        <li key={target.network}>
          <a
            href={target.href}
            aria-label={`${blogPage.card.shareLabel} “${post.title}” ${blogPage.card.shareOn} ${target.label}`}
            /* Opens away from the site, so both parts of the safe-target pair
               are set. `mailto:` ignores them harmlessly. */
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center text-steel transition-colors duration-200 hover:bg-fog hover:text-rc-blue"
          >
            {target.network === "email" ? (
              <Mail />
            ) : (
              <SocialIcon name={target.network} />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
