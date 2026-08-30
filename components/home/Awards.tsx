import Image from "next/image";
import { awards, social } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Check, SocialIcon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Awards & Recognition.
 *
 * One credential is the headline and four support it. The Canadian Choice
 * Award takes an oversized plate on the right of the section — the same
 * copy-left / evidence-right grammar the rest of the page uses — sized to
 * fill the column beside the copy, with the supporting marks running
 * underneath at a fraction of the size. The ranking is legible before a word
 * is read.
 *
 * The five source images come from different houses: two 3D renders in gold,
 * one in red, one flat vector in blue. Rather than restyle artwork we do not
 * own, every supporting mark is set in an identical Fog plate inside an
 * identical white card and captioned in the same type. The containers carry
 * the consistency, which is why the row reads as one deliberate set.
 *
 * Plates are square, not circular: the system resets `--radius-*` and takes
 * no radius on any card, field or panel, so a pill or a circle here would be
 * the only rounded edge in the section.
 */
export function Awards() {
  return (
    <section className="bg-fog py-section" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-site px-edge">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <SectionLabel>{awards.label}</SectionLabel>
            <h2 id="awards-heading" className="display-l mt-5 text-navy">
              {awards.headline}
            </h2>
            <p className="body-l mt-6 text-steel">{awards.body}</p>

            <ul className="mt-8">
              {awards.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border-b border-b-line py-3 last:border-b-0"
                >
                  <Check className="mt-1 shrink-0 text-amber-ink" />
                  <span className="body-s text-steel">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-5">
              <p className="meta text-steel">Follow</p>
              <ul className="-mx-2 flex items-center">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="inline-flex size-11 items-center justify-center text-rc-blue transition-colors hover:text-navy"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The anchor. 2px navy outline marks it as the primary credential;
              the supporting cards below take a hairline instead. */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <div className="flex h-full flex-col items-center justify-center gap-8 border-2 border-navy bg-white p-8 text-center sm:gap-10 sm:p-10">
              <Image
                src={awards.badge.src}
                alt={awards.badge.alt}
                width={awards.badge.width}
                height={awards.badge.height}
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 208px"
                className="h-auto w-52 shrink-0 sm:w-64 lg:w-72"
                priority={false}
              />
              <div className="max-w-prose">
                <p className="meta text-rc-blue">{awards.badge.kicker}</p>
                <h3 className="display-m mt-3 text-navy">{awards.badge.title}</h3>
                <p className="body-s mt-4 text-steel">{awards.badge.body}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Supporting marks. 2x2 on phones and tablets &mdash; four across only
            once the column is wide enough for the longest caption to sit on
            two lines rather than three. */}
        <Reveal as="h3" className="meta mt-14 text-steel">
          {awards.credentialsLabel}
        </Reveal>
        <Stagger as="ul" className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {awards.credentials.map((c) => (
            <StaggerItem
              as="li"
              key={c.label}
              className="flex flex-col items-center gap-4 border border-line bg-white px-4 py-6 text-center sm:px-6"
            >
              <span className="flex size-24 shrink-0 items-center justify-center bg-fog p-3 sm:size-32 sm:p-4">
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.width}
                  height={c.height}
                  sizes="(min-width: 640px) 128px, 96px"
                  className="h-full w-full object-contain"
                />
              </span>
              <p className="meta text-navy">{c.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
