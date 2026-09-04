import { blogPage, type BlogPost } from "@/lib/content";
import { shareTargets } from "@/lib/blog";
import { canonical } from "@/lib/seo";
import { Mail, SocialIcon } from "@/components/ui/Icon";
import { CopyLink } from "@/components/ui/CopyLink";
import { PostColumn } from "@/components/blog/PostColumn";
import { Reveal } from "@/components/ui/Motion";

/**
 * The share block at the end of an article.
 *
 * Same four endpoints as `ShareLinks` on the post card and the same reasoning
 * behind them — plain links to each network's own share URL, so this stays a
 * server component and no social network is told about a reader who merely
 * scrolled past it. What is different is scale and one extra control.
 *
 * Scale, because the two are answering different moments. On a card the row
 * is a 36px afterthought under a post somebody has not read; here it is the
 * ask at the end of one they have, so the targets are 44px — the design
 * system's own touch-target floor — and they take the tertiary button's
 * treatment: a 2px border that fills navy on hover, exactly as the outlined
 * CTAs elsewhere do. The brief for this row was "match the site's button
 * conventions", and this site has three of them; a bordered square that fills
 * is the only one that works at icon size, because the amber and blue fills
 * both mean "this is the action on this page" and the action on this page is
 * the quote form below.
 *
 * The extra control is copy-link, which is the one people actually use to put
 * a page into an email or a strata council's group chat, and the one that has
 * to be a client component. See CopyLink.
 *
 * The email target is kept for the reader who wants to send this to a
 * property manager rather than post it, which on this site's audience is more
 * likely than any of the other three.
 */
export function PostShare({ post }: { post: BlogPost }) {
  const targets = shareTargets(post);
  const url = canonical(`/blog/${post.slug}`);

  return (
    <div className="bg-white pb-section-sm">
      <div className="mx-auto max-w-site px-edge">
        <Reveal>
          <PostColumn>
            <section
              aria-labelledby="post-share-heading"
              className="border border-line bg-fog p-6 sm:p-8"
            >
              <p className="meta text-rc-blue">{blogPage.post.share.label}</p>

              <h2 id="post-share-heading" className="display-s mt-3 text-navy">
                {blogPage.post.share.heading}
              </h2>

              <p className="body-s mt-3 text-steel">
                {blogPage.post.share.body}
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {targets.map((target) => (
                  <li key={target.network}>
                    <a
                      href={target.href}
                      /* Carries the post title, so a screen-reader user does not
                     get four identical "Share on Facebook" links between this
                     page and the related cards below it. */
                      aria-label={`${blogPage.card.shareLabel} “${post.title}” ${blogPage.card.shareOn} ${target.label}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 items-center justify-center border-2 border-line bg-white text-navy transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-white"
                    >
                      {target.network === "email" ? (
                        <Mail />
                      ) : (
                        <SocialIcon name={target.network} />
                      )}
                    </a>
                  </li>
                ))}

                <li>
                  {/* Labels passed rather than imported: CopyLink is a client
                      component, and an import of `@/lib/content` from inside
                      one drags the whole content module into the bundle. */}
                  <CopyLink
                    url={url}
                    labels={{
                      copy: blogPage.post.share.copy,
                      copied: blogPage.post.share.copied,
                      copyFailed: blogPage.post.share.copyFailed,
                    }}
                  />
                </li>
              </ul>
            </section>
          </PostColumn>
        </Reveal>
      </div>
    </div>
  );
}
