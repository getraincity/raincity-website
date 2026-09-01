import Link from "next/link";
import { blogPage, type BlogPost } from "@/lib/content";
import { formatPostDate } from "@/lib/blog";
import { Photo } from "@/components/ui/Photo";
import { Calendar, Clock } from "@/components/ui/Icon";
import { PostColumn } from "@/components/blog/PostColumn";
import { RevealOnLoad } from "@/components/ui/Motion";

/**
 * The top of an article: the trail, what it is, what it is called, what it is
 * about, when it was written — and then the photograph.
 *
 * This is the one page level on the site that does **not** open on the
 * full-bleed navy banner. /about, /services, /services/[slug], /locations,
 * /contact and /blog all do, and they are all pages about the company; an
 * article is a page about a subject, and putting a 52px headline in white
 * over a scrimmed photograph is what a landing page does. It would also mean
 * the title of the piece competing with a picture for the reader's first two
 * seconds, which is the wrong way round for something whose whole value is
 * the text. So the header is set on white, the type is navy, and the
 * photograph follows the title instead of carrying it.
 *
 * What is kept from the banner is everything structural: the same breadcrumb
 * markup and the same trail the page's BreadcrumbList publishes, the same
 * `RevealOnLoad` cascade the five banners use above the fold, the same
 * `meta`/`display`/`body-l` rows in the same order. Only the ground changed.
 *
 * The excerpt is reused as the standfirst rather than a second summary being
 * written for it. It is already two sentences that stand alone — that is what
 * it was written for, on the card and in a search result — and a post whose
 * card promise and whose opening line differ is a post that has told the
 * reader two things.
 *
 * ## The two measures
 *
 * ## One measure, not two
 *
 * Everything on this page — text and photographs alike — sits in
 * `PostColumn`. Read the note in that file before adding to this one, because
 * `max-w-prose` does not mean what it looks like it means on this site.
 *
 * Photographs used to run on a wider track (`lg:max-w-heading`, up to 880px)
 * so a picture opened out either side of the reading column. On the numbers
 * that put a 880x550 frame against a 663px column: a third wider than the
 * text on both counts, and tall enough to push the opening paragraphs off a
 * laptop screen. It read as a picture that had escaped the article rather
 * than one belonging to it, so both frames now hold the reading measure and
 * the article has one straight left edge from the breadcrumb to the last
 * line. At 663px the 16:10 frame is 414px tall — a picture, not a second
 * hero.
 *
 * The wide track is kept on the wrapper below. Nothing uses it today; it is
 * the hook to hang a deliberately full-width frame on if one is ever wanted,
 * and it costs nothing while no child exceeds the column.
 *
 * The featured frame is cropped 16:10 rather than to the registry's 4:5.
 * Every post photograph is a service-card portrait, and 16:10 is exactly the
 * crop the `feature` PostCard already puts them through on /blog — so the
 * frame a reader clicks and the frame that opens are the same frame, and the
 * registry's focal points are already tuned against it. No `focal` override
 * is passed for that reason. `PostBody` crops its in-body photographs to the
 * same 16:10 so every picture in an article is one repeated frame.
 *
 * LCP element for the route, hence `priority`.
 */
export function PostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="bg-white pt-10 sm:pt-14 lg:pt-16">
      <div className="mx-auto max-w-site px-edge">
        <div className="mx-auto w-full lg:max-w-heading">
          <RevealOnLoad>
            <PostColumn>
              <nav aria-label="Breadcrumb">
                {/* Wraps on a phone rather than truncating: the last crumb
                    is the title of the article, which is the longest thing in
                    the trail and the one a reader least needs abbreviated. */}
                <ol className="meta flex flex-wrap items-center gap-x-2 gap-y-1 text-steel">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors duration-200 hover:text-rc-blue"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-muted">
                    /
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="transition-colors duration-200 hover:text-rc-blue"
                    >
                      {blogPage.post.crumb}
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-muted">
                    /
                  </li>
                  <li aria-current="page" className="text-navy">
                    {post.title}
                  </li>
                </ol>
              </nav>
            </PostColumn>
          </RevealOnLoad>

          <RevealOnLoad delay={0.06}>
            <PostColumn className="mt-8">
              <p className="meta text-rc-blue">{post.category}</p>
            </PostColumn>
          </RevealOnLoad>

          <RevealOnLoad delay={0.1}>
            <PostColumn className="mt-4">
              {/* display-l, not display-xl. The banners run xl because a
                  headline over a photograph has to hold its own against it;
                  here the title is the first thing on a white page and 76px
                  would be shouting. */}
              <h1 id="post-title" className="display-l text-navy">
                {post.title}
              </h1>
            </PostColumn>
          </RevealOnLoad>

          <RevealOnLoad delay={0.16}>
            <PostColumn className="mt-6">
              <p className="body-l text-steel">{post.excerpt}</p>
            </PostColumn>
          </RevealOnLoad>

          {/* Date, read time, and (when set) author — on a rule that closes
              the header block and separates it from the photograph below.
              `dateTime` carries the machine-readable form so the printed one
              stays short. The author block appears only when `post.author` is
              set: add the field to a post in content.ts at the same time as
              confirming the person named actually wrote it. */}
          <RevealOnLoad delay={0.22}>
            <PostColumn className="mt-8 border-t border-line pt-5">
              <p className="meta flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="shrink-0 text-rc-blue" />
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="shrink-0 text-rc-blue" />
                  {post.readMinutes} {blogPage.card.readTime}
                </span>
                {post.author && (
                  <span className="inline-flex items-center gap-2 text-navy">
                    <span aria-hidden="true" className="h-3 w-px bg-line" />
                    <span>
                      {post.author.name}
                      <span className="ml-1.5 text-muted">
                        · {post.author.title}
                      </span>
                    </span>
                  </span>
                )}
              </p>
            </PostColumn>
          </RevealOnLoad>

          <RevealOnLoad className="mt-10 sm:mt-12" delay={0.28}>
            <PostColumn>
              <Photo
                name={post.photo}
                ratio="16:10"
                priority
                sizes="(min-width: 1024px) 680px, 100vw"
              />
            </PostColumn>
          </RevealOnLoad>
        </div>
      </div>
    </header>
  );
}
