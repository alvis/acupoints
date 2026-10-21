import { NumberDisc } from '@/components/primitives/NumberDisc';

import type { FC } from 'react';

/** One authored section of the leaf's commentary. */
export interface CommentarySection {
  id: string;
  heading: string;
  paragraphs: readonly string[];
}

/** An entry in the leaf's contents list. */
export interface ContentsEntry {
  href: string;
  label: string;
}

/** Props for {@link LeafCommentary}. */
export type LeafCommentaryProps = {
  sections: readonly CommentarySection[];
  contents: readonly ContentsEntry[];
  contentsLabel: string;
};

const CONTENTS_NAV_CLASSES = 'lg:sticky lg:top-24 lg:self-start';

/**
 * The authored commentary under the block: a contents list, then each section
 * as a numbered ruled block under its stable heading anchor (the margin notes
 * on the leaf link here).
 * @param props authored sections and matching contents links
 * @param props.sections authored commentary sections with anchor identifiers
 * @param props.contents anchor links to the commentary, questions, and sources
 * @param props.contentsLabel accessible name of the contents navigation
 * @returns the linked contents list and authored commentary sections
 */
export const LeafCommentary: FC<LeafCommentaryProps> = ({ sections, contents, contentsLabel }) => (
  <div
    className="
      grid gap-10
      lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14
    ">
    <nav aria-label={contentsLabel} className={CONTENTS_NAV_CLASSES}>
      <p className="cap m-0 border-b-[1.5px] border-ink pb-2">{contentsLabel}</p>
      <ol className="m-0 flex list-none flex-col p-0">
        {contents.map((entry, i) => (
          <li className="border-b border-ink/25" key={entry.href}>
            <a
              className="
                wb-link flex items-baseline gap-2.5 py-1.5 text-[0.95rem]
              "
              href={entry.href}>
              <span className="pm text-[0.6875rem] text-ink-micro">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{entry.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
    <div className="flex min-w-0 flex-col gap-10">
      {sections.map((section, i) => (
        <section
          aria-labelledby={section.id}
          className="
            grid scroll-mt-24 gap-x-8 gap-y-3 border-t-[1.5px] border-ink pt-5
            md:grid-cols-[4rem_minmax(0,1fr)]
          "
          key={section.id}>
          <NumberDisc n={i + 1} size={36} />
          <div className="flex min-w-0 flex-col gap-3">
            <h2
              className="
                m-0 scroll-mt-24 font-display text-2xl/tight font-medium
                md:text-[1.75rem]
              "
              id={section.id}>
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                className="
                  m-0 max-w-[68ch] text-[1.0625rem] leading-[1.65] text-ink-soft
                "
                key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);
