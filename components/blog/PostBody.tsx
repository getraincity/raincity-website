import type { BlogBlock, BlogPost } from "@/lib/content";
import { blogPage } from "@/lib/content";
import { hasContents, postSections, type PostSection } from "@/lib/blog";
import { Photo } from "@/components/ui/Photo";
import { AccentList, AccentSteps } from "@/components/ui/AccentList";
import { PostColumn } from "@/components/blog/PostColumn";
import { Reveal } from "@/components/ui/Motion";

/**
 * The article.
 *
 * Every element a post can contain is styled here and nowhere else, and the
 * set is closed: `BlogBlock` in content.ts has six shapes, the renderer below
 * has six branches, and there is no HTML string and no Markdown parser
 * anywhere in the path. A post cannot introduce a heading size, a list marker
 * or a quote treatment the design system has not already ruled on, which is
 * the whole reason the body is data rather than markup.
 *
 * ## The two measures
 *
 * Sections run on the wide track (`lg:max-w-heading`, up to 880px) and
 * everything inside them — text and photographs alike — sits in a
 * `PostColumn`. Photographs used to be the exception, taking the full 880px
 * so they opened out either side of the reading column; against a 663px
 * measure that read as a picture escaping the article rather than belonging
 * to it, so they were brought back onto the column. Nothing uses the wide
 * track today. It stays as the hook for a deliberately full-width frame, and
 * costs nothing while no child exceeds the column.
 *
 * Read the note in PostColumn before adding an element here. The short of it
 * is that `max-w-prose` on this site means `65ch` of the element's own font,
 * not the 680px token — harmless on body copy, and it throws a display-size
 * heading a hundred pixels out of the column. The wrapper is what makes the
 * left edge of this page a straight line.
 *
 * ## Short posts and long ones
 *
 * The same template carries `three-days-of-snow` — three sections of plain
 * prose — and `what-a-strata-schedule-covers`, which runs seven sections with
 * lists, an ordered sequence, a pull quote and a photograph in it. Two things
 * do that work:
 *
 *  1. Rhythm is per block rather than uniform. A subheading gets more air
 *     above it than a paragraph does, a photograph more again, and the first
 *     block after a heading gets none — so a long post reads as a structure
 *     and a short one does not acquire gaps it has not earned. `first:mt-0`
 *     on the wrapper is what drops the leading margin without the renderer
 *     having to know which block is first.
 *  2. The contents list appears only past a threshold. See `hasContents` in
 *     lib/blog.ts for why it is five sections and not "always".
 *
 * Headings are h2 with h3 beneath, under the page's single h1 in PostHeader —
 * so the outline is one unbroken ladder and a screen reader's heading list is
 * the same list the contents block prints.
 */
export function PostBody({ post }: { post: BlogPost }) {
  const sections = postSections(post);

  return (
    <div className="bg-white pt-block pb-section-sm">
      <div className="mx-auto max-w-site px-edge">
        <div className="mx-auto w-full lg:max-w-heading">
          {hasContents(post) ? <Contents sections={sections} /> : null}

          {sections.map((section, i) => (
            <Section key={section.id} section={section} first={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The in-article contents, on long posts only.
 *
 * Plain `<a href="#id">` anchors — no client boundary, no scroll spy. The
 * policy pages have a sticky rail with an IntersectionObserver behind it
 * because a policy is a reference document somebody arrives at mid-way and
 * jumps around inside. An article is read top to bottom; the list is there so
 * a reader can see the shape of what they are starting and skip to the part
 * they came for, and once they have used it, it has done its job. A rail that
 * followed them down the page would be tracking a journey nobody is making.
 *
 * `scroll-mt-24` on each section is what clears the sticky header when one of
 * these lands, and it matches the value the policy clauses use.
 */
function Contents({ sections }: { sections: PostSection[] }) {
  return (
    <Reveal>
      <PostColumn>
        <section
          aria-labelledby="post-contents-heading"
          className="border border-line bg-fog p-6 sm:p-7"
        >
          <h2 id="post-contents-heading" className="meta text-rc-blue">
            {blogPage.post.contents}
          </h2>

          <ol className="mt-5 flex flex-col gap-3">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-baseline gap-4 text-navy transition-colors duration-200 hover:text-rc-blue"
                >
                  {/* aria-hidden: the <ol> already announces "item 3 of 7",
                      and printing the numeral again makes every entry start
                      by saying its own number twice. */}
                  <span
                    aria-hidden="true"
                    className="meta w-6 shrink-0 tabular-nums text-muted transition-colors duration-200 group-hover:text-rc-blue"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="body-s">{section.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </PostColumn>
    </Reveal>
  );
}

function Section({ section, first }: { section: PostSection; first: boolean }) {
  return (
    <Reveal
      as="section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-24 pt-block"
    >
      {/* A hairline above every heading but the first. It is the same device
          the policy clauses open on, minus the clause number — a rule is what
          this site uses to say "new part", and it does the work an extra 40px
          of white space would otherwise be asked to do in a seven-section
          article. */}
      {first ? null : (
        <PostColumn className="mb-block">
          <span aria-hidden="true" className="block h-px w-full bg-line" />
        </PostColumn>
      )}

      <PostColumn>
        <h2 id={`${section.id}-heading`} className="display-m text-navy">
          {section.heading}
        </h2>
      </PostColumn>

      <div className="mt-6">
        {section.blocks.map((block, i) => (
          <Block key={blockKey(block, i)} block={block} />
        ))}
      </div>
    </Reveal>
  );
}

/**
 * A stable key per block. The text of a block is unique within a section in
 * practice, and the index is included anyway so two identical paragraphs
 * cannot collide — the list is static, so an index is not the hazard here
 * that it is in a reorderable one.
 */
function blockKey(block: BlogBlock, i: number) {
  if (typeof block === "string") return `${i}-text`;
  return `${i}-${block.kind}`;
}

function Block({ block }: { block: BlogBlock }) {
  // A bare string is a paragraph — the shorthand `BlogBlock` is built around.
  if (typeof block === "string") {
    return (
      <PostColumn className="mt-5 first:mt-0">
        <p className="body-base text-steel">{block}</p>
      </PostColumn>
    );
  }

  switch (block.kind) {
    case "subheading":
      return (
        // display-s, the step under the section's display-m. It takes the
        // most air of anything in the body because it is the only block that
        // has to read as a division rather than as a continuation.
        <PostColumn className="mt-10 first:mt-0">
          <h3 className="display-s text-navy">{block.text}</h3>
        </PostColumn>
      );

    case "list":
      return (
        <PostColumn className="mt-6 first:mt-0">
          <AccentList items={block.items} />
        </PostColumn>
      );

    case "steps":
      return (
        <PostColumn className="mt-6 first:mt-0">
          <AccentSteps items={block.items} />
        </PostColumn>
      );

    case "quote":
      return (
        <PostColumn className="mt-9 first:mt-0">
          <figure className="relative pl-6 sm:pl-8">
            {/* The rule is a positioned span rather than a border, because
                3px is the system's hairline token and 4px — the nearest
                border utility — is not. Same device as the policy callout. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-hairline bg-rc-blue"
            />
            <blockquote>
              {/* body-l on navy: a size up and a tone darker than the prose
                  around it, and that is the whole treatment. No Mist panel —
                  that is the policy pages' callout and means "do not scroll
                  past this", which is not what a pulled line is for. No
                  quotation marks set as ornament and no italic: this is body
                  copy being lifted, not decorated. */}
              <p className="body-l text-navy">{block.text}</p>
            </blockquote>
            {block.cite ? (
              <figcaption className="meta mt-4 text-muted">
                {block.cite}
              </figcaption>
            ) : null}
          </figure>
        </PostColumn>
      );

    case "photo":
      return (
        // 16:10, on the reading column, the same frame the header photo
        // takes. This block used to be 3:2 on the full 880px track, which was
        // the tallest picture in the article — the comment here claimed 3:2
        // was "shorter than the 16:10 header frame", and at a shared width it
        // is the other way round (880/1.5 = 587px against 880/1.6 = 550px).
        // One repeated frame is what makes a picture read as supporting.
        <figure className="mt-10 first:mt-0">
          <PostColumn>
            <Photo
              name={block.photo}
              ratio="16:10"
              sizes="(min-width: 1024px) 680px, 100vw"
            />
          </PostColumn>
          {/* The caption is required by the type. An image dropped into an
              article without one is decoration, and the alt text is not a
              substitute: alt describes the frame for somebody who cannot see
              it, the caption says why it is on the page. */}
          <PostColumn className="mt-4">
            <figcaption className="body-s text-steel">
              {block.caption}
            </figcaption>
          </PostColumn>
        </figure>
      );
  }
}
