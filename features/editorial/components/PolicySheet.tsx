import { FishTail } from '@/components/primitives/FishTail';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import type { FC, ReactNode } from 'react';

/** One numbered clause of a policy. */
export type PolicyClause = {
  /** Clause heading. */
  title: string;
  body: ReactNode;
};

/** Props for {@link PolicySheet}. */
export type PolicySheetProps = {
  /** Document title, the sheet's h2. */
  title: string;
  /** Two-character Han name of the document (私隱, 免責, 薦介, 凡例). */
  han: string;
  /** The page's own path, printed in mono beside the title. */
  route: string;
  /** Vertical title of the fish-tail strip (經穴圖 · 規約), in the page's script. */
  stripTitle: string;
  /** Han measure word after each clause number (條), in the page's script. */
  clauseWord: string;
  /** Resolved "In short:" label. */
  inShort: string;
  summary: ReactNode;
  clauses: readonly PolicyClause[];
  zh: boolean;
};

/**
 * The policy itself: title line, the 要旨 "in short" box, then the clauses
 * numbered 第一條 … in a carved block with a fish-tail centre strip.
 * @param props the policy title, summary, and clauses.
 * @param props.title display heading
 * @param props.han two-character Han name of the document (私隱, 免責, 薦介, 凡例).
 * @param props.stripTitle vertical title of the fish-tail strip (經穴圖 · 規約), in the page's script.
 * @param props.clauseWord han measure word after each clause number (條), in the page's script.
 * @param props.route the page's own path, printed in mono beside the title.
 * @param props.inShort resolved "In short:" label.
 * @param props.summary the policy summary inside the in-short box.
 * @param props.clauses ordered policy sections
 * @param props.zh whether the page uses Chinese typography.
 */
export const PolicySheet: FC<PolicySheetProps> = ({
  title,
  han,
  stripTitle,
  clauseWord,
  route,
  inShort,
  summary,
  clauses,
  zh,
}) => (
  <div data-pagefind-body className="flex min-w-0 flex-col gap-7">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h2
        className={cn(
          `
            m-0 text-[2rem] font-medium
            sm:text-[2.5rem]
          `,
          zh && `tc`,
        )}>
        {title}
      </h2>
      {zh ? null : (
        <span
          aria-hidden="true"
          className="tc text-[1.38rem] font-bold text-ink-micro"
          lang="zh-Hant">
          {han}
        </span>
      )}
      <span className="flex-1" />
      <span className="pm text-[0.75rem] text-ink-micro">{route}</span>
    </div>

    <div
      className="
        grid items-start gap-3 bg-paper-raised px-5 py-[22px]
        shadow-[inset_0_0_0_1.5px_var(--color-ink),inset_6px_0_0_var(--color-cinnabar)]
        sm:grid-cols-[74px_minmax(0,1fr)] sm:gap-5 sm:px-[26px]
      ">
      <span
        aria-hidden="true"
        className="tc text-[1.9rem] leading-[1.1] font-black">
        要旨
      </span>
      <p
        className="
          m-0 text-[1.2rem] leading-[1.45]
          sm:text-[1.38rem]
        ">
        <strong className={cn('font-semibold', zh && 'tc')}>{inShort}</strong>{' '}
        <span className={cn(zh && 'tc')}>{summary}</span>
      </p>
    </div>

    <div
      className="
        blk m-1.5 grid
        sm:grid-cols-[58px_minmax(0,1fr)]
      ">
      <div
        aria-hidden="true"
        className="
          hidden flex-col items-center gap-3 border-r-[1.5px] border-ink py-3.5
          sm:flex
        ">
        <FishTail />
        <span className="tc vt text-[0.95rem] font-bold tracking-[0.2em]">{stripTitle}</span>
        <span className="flex-1" />
        <FishTail up />
      </div>
      <ol
        className="
          ruled m-0 list-none px-5 py-[34px]
          sm:pr-10 sm:pl-[30px]
        ">
        {clauses.map((clause, index) => (
          <li
            className="
              grid gap-x-[18px] pb-[34px]
              last:pb-0
              sm:grid-cols-[96px_minmax(0,1fr)]
            "
            key={clause.title}>
            <span
              className="tc red text-[1.19rem] leading-[34px] font-bold"
              lang={zh ? undefined : 'zh-Hant'}>
              {`第${hanNumeral(index + 1)}${clauseWord}`}
            </span>
            <div>
              <h3
                className={cn(
                  `m-0 text-[1.31rem] leading-[34px] font-semibold`,
                  zh && `tc`,
                )}>
                {clause.title}
              </h3>
              <p className={cn('m-0 text-[1.13rem] leading-[34px]', zh && 'tc')}>{clause.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);
