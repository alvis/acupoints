import { cn } from '@/utilities/cn';

import { GlossaryExamples } from './GlossaryExamples';
import { GlossaryQuestion } from './GlossaryQuestion';

import type { FC, PropsWithChildren, ReactNode } from 'react';

import type { FaqItem } from '@/components/composites/FaqBlock';

/** A catalogue point the entry uses as a worked example. */
export type GlossaryExample = {
  code: string;
  name: string;
  hanzi: string;
  /** Where the point sits, in the entry's own words. */
  where: string;
  href: string;
  /** Accessible name of the link. */
  aria: string;
};

/** Labels and Han marks the leaf prints, in the page's locale and script. */
export type GlossaryLeafLabels = {
  also: string;
  means: string;
  meansHan: string;
  line: string;
  lineHan: string;
  meet: string;
  meetHan: string;
  seeAlso: string;
  seeAlsoHan: string;
  asked: string;
  askedHan: string;
  leafArrow: string;
};

/** Props for {@link GlossaryLeaf}. */
export type GlossaryLeafProps = {
  /** Heading id; the leaf is labelled by its headword. */
  headingId: string;
  /** The headword is the page's h1 on a term page, an h2 inside the index. */
  level: 1 | 2;
  /** Mono caps position line, "詞 · C · term 1 of 3". */
  position: string;
  headword: string;
  /** BCP 47 tag of the headword when it differs from the page. */
  headwordLang?: string;
  /** Large Han headword in the cartouche. */
  zh: string;
  /** Pinyin, or the English term on Chinese pages. */
  reading?: string;
  kind: string;
  aka?: string;
  /** The definition; a Speakable on the term page. */
  means: ReactNode;
  line: string;
  meet: string;
  examples: readonly GlossaryExample[];
  /** Related-term controls: buttons inside the index, links on a term page. */
  seeAlso: ReactNode;
  /** Side figure for the entry. */
  figure?: ReactNode;
  faq?: FaqItem;
  /** Closing row: the read-more link and the not-advice line. */
  footer?: ReactNode;
  labels: GlossaryLeafLabels;
  className?: string;
};

const ROW =
  'grid grid-cols-[56px_minmax(0,1fr)] gap-3.5 border-b border-[color:var(--color-rule)] py-3.5';

/**
 * A dictionary leaf, as the Glossary board prints it: headword, reading and
 * kind over a heavy rule, the Han headword in a cartouche, then ruled rows
 * for the meaning, one line, where you meet it and related terms, with a
 * figure and a common question beside them.
 * @param props dictionary headword, definition rows, examples, and question
 * @param props.headingId anchor for the parts heading
 * @param props.level heading depth
 * @param props.position side-figure placement
 * @param props.headword dictionary term
 * @param props.headwordLang language tag for the term
 * @param props.zh Han inscription in the page script
 * @param props.reading phonetic spelling
 * @param props.kind term classification
 * @param props.aka alternative wording
 * @param props.means definition text
 * @param props.line authored bilingual line
 * @param props.meet context where the term appears
 * @param props.examples illustrative uses
 * @param props.seeAlso related dictionary links
 * @param props.figure optional anatomical illustration
 * @param props.faq optional question and answer
 * @param props.footer content following the definition
 * @param props.labels localized row headings
 * @param props.className additional presentation classes
 * @returns the dictionary headword, definition rows, examples, and question
 */
export const GlossaryLeaf: FC<GlossaryLeafProps> = ({
  headingId,
  level,
  position,
  headword,
  headwordLang,
  zh,
  reading,
  kind,
  aka,
  means,
  line,
  meet,
  examples,
  seeAlso,
  figure,
  faq,
  footer,
  labels,
  className,
}) => {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <article
      aria-labelledby={headingId}
      className={cn('@container flex min-w-0 flex-col', className)}>
      <div
        className="
          grid grid-cols-[minmax(0,1fr)_auto] items-end gap-7 border-b-[2.5px]
          border-ink pb-4 shadow-[0_4px_0_-3px_var(--color-ink)]
        ">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="cap">{position}</span>
          <Heading
            className="
              m-0 text-[2.75rem] leading-none font-medium tracking-[-0.01em]
              md:text-[3.75rem]
            "
            id={headingId}
            lang={headwordLang}>
            {headword}
          </Heading>
          <span
            className="flex flex-wrap items-baseline gap-x-3.5 text-[1.25rem]">
            {reading ? (
              <span className="whitespace-nowrap italic">
                {reading}
                <span aria-hidden="true" className="
                  ml-3.5 text-ink-micro not-italic
                ">
                  ·
                </span>
              </span>
            ) : null}
            <span className="text-[1.05rem] text-ink-soft">{kind}</span>
          </span>
          {aka ? (
            <span className="text-base text-ink-soft">
              {labels.also} <span className="tc">{aka}</span>
            </span>
          ) : null}
        </div>
        <span
          aria-hidden="true"
          className="
            tc r2 px-[18px] py-3.5 text-[3.5rem] leading-none font-black
            md:text-[4.75rem]
          ">
          {zh}
        </span>
      </div>

      <div
        className="
          grid gap-8 pt-1.5
          @3xl:grid-cols-[minmax(0,1fr)_340px]
        ">
        <div className="flex flex-col">
          <LeafRow han={labels.meansHan} label={labels.means}>
            <div className="text-[1.2rem] leading-normal">{means}</div>
          </LeafRow>
          <LeafRow red han={labels.lineHan} label={labels.line}>
            <p className="m-0 text-[1.3rem] leading-[1.4] italic">{line}</p>
          </LeafRow>
          <LeafRow han={labels.meetHan} label={labels.meet}>
            <div className="flex flex-col gap-2.5">
              <p className="m-0 text-[1.05rem] leading-normal">{meet}</p>
              {examples.length > 0 ? (
                <GlossaryExamples examples={examples} labels={labels} />
              ) : null}
            </div>
          </LeafRow>
          <LeafRow last han={labels.seeAlsoHan} label={labels.seeAlso}>
            {seeAlso}
          </LeafRow>
        </div>

        <div className="flex flex-col gap-[18px] pt-3.5">
          {figure}
          <GlossaryQuestion faq={faq} labels={labels} />
        </div>
      </div>

      {footer ? (
        <div
          className="
            mt-auto flex flex-wrap items-center gap-4 border-t-[2.5px]
            border-ink pt-4
          ">
          {footer}
        </div>
      ) : null}
    </article>
  );
};

type LeafRowProps = PropsWithChildren<{
  han: string;
  label: string;
  red?: boolean;
  last?: boolean;
}>;

const LeafRow: FC<LeafRowProps> = ({ han, label, red = false, last = false, children }) => (
  <div className={cn(ROW, last && 'border-b-0')}>
    <span className="flex flex-col items-start gap-0.5">
      <span
        aria-hidden="true"
        className={cn(
          'tc text-xl font-black',
          red &&
            `red`,
        )}>
        {han}
      </span>
      <span className="cap">{label}</span>
    </span>
    {children}
  </div>
);
