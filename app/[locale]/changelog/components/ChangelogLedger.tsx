import { FishTail } from '@/components/primitives/FishTail';
import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

const YEAR_DIGITS = 4;

/** One edition mark as the ledger prints it. */
export type LedgerMark = {
  /** Commit hash; the row key. */
  id: string;
  /** Edition number, counted from the oldest mark. */
  edition: number;
  /** printed ordinal in Han numerals, such as 第二十六版. */
  editionHan: string;
  /** ISO date. */
  date: string;
  /** Seal characters for the mark's kind. */
  seal: readonly [string, string];
  /** Screen-reader word for the kind ("New", "Correction" …). */
  kindWord: string;
  /** True for corrections, which the board tints. */
  correction: boolean;
  scope?: string;
  /** One-character area glyph (語, 檢 …). */
  scopeGlyph: string;
  /** The change in the page's language, or in English when no rendering exists. */
  subject: string;
  /** `en` when a Chinese page falls back to the English subject. */
  subjectLang?: string;
  /** Resolved "Breaking change" note, when the commit carried one. */
  breaking?: string;
};

/** Column heads of the ledger. */
export type LedgerColumns = {
  edition: string;
  date: string;
  area: string;
  change: string;
};

/** Props for {@link ChangelogLedger}. */
export type ChangelogLedgerProps = {
  /** Heading id; one ledger per printing date. */
  id: string;
  /** Colophon date (二〇二六年八月二十六日). */
  dateHan: string;
  /** Spelled date for English pages ("26 August 2026"); omitted on Chinese pages. */
  dateLabel?: string;
  /** "25 marks, one printing". */
  countLabel: string;
  listLabel: string;
  columns: LedgerColumns;
  /** Vertical title of the fish-tail strip (經穴圖 · 刊記), in the page's script. */
  stripTitle: string;
  /** Han glyph closing the strip (記), in the page's script. */
  recordMark: string;
  marks: readonly LedgerMark[];
  zh: boolean;
};

const ROW_GRID = 'lg:grid-cols-[128px_70px_136px_176px_minmax(0,1fr)]';
const CELL_RULE =
  'lg:shadow-[inset_-1px_0_0_color-mix(in_srgb,var(--color-cinnabar)_55%,transparent)]';

/**
 * One printing's edition marks in a carved block (board WbChangelog): a
 * fish-tail centre strip down the left, column heads on a raised band, then
 * one ruled row per mark with its edition, seal, date, area and change. On
 * phones each row folds into two lines and the strip falls away.
 * @param props dated edition ledger and its ruled change rows
 * @param props.id heading anchor for this printing date
 * @param props.dateHan printing date written in Han numerals
 * @param props.dateLabel spelled-out printing date for English pages
 * @param props.countLabel summary of marks in this printing
 * @param props.listLabel accessible name for the change list
 * @param props.columns localized ledger column headings
 * @param props.stripTitle vertical title on the fish-tail strip
 * @param props.recordMark Han glyph closing the fish-tail strip
 * @param props.marks edition marks printed on this date
 * @param props.zh whether the edition uses Chinese labels
 * @returns the dated edition ledger and its ruled change rows
 */
export const ChangelogLedger: FC<ChangelogLedgerProps> = ({
  id,
  dateHan,
  dateLabel,
  countLabel,
  listLabel,
  columns,
  stripTitle,
  recordMark,
  marks,
  zh,
}) => (
  <section aria-labelledby={id} className="mt-[52px]">
    <div
      className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1 px-1.5 pb-3">
      <h2
        className="
          m-0 text-[1.5rem] font-medium
          sm:text-[1.88rem]
        "
        id={id}>
        <span className="tc mr-3 font-bold" lang="zh-Hant">
          {dateHan}
        </span>
        {dateLabel}
      </h2>
      <span className="flex-1" />
      <span className={cn('text-base text-ink-soft', zh && `tc`)}>{countLabel}</span>
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
        <span className="h-10 w-1.5 bg-ink" />
        <FishTail />
        <span className="tc vt text-base font-bold tracking-[0.2em]">{stripTitle}</span>
        <span className="flex-1" />
        <span className="tc vt text-[0.88rem] tracking-[0.2em]">
          {dateHan.slice(0, YEAR_DIGITS)}年刊
        </span>
        <FishTail up />
        <span className="tc text-base font-bold">{recordMark}</span>
      </div>
      <div className="min-w-0">
        <div
          aria-hidden="true"
          className={cn(
            `
              hidden border-b-[2.5px] border-ink bg-paper-raised text-[0.88rem]
              lg:grid
            `,
            ROW_GRID,
          )}>
          <ColumnHead han="版次" label={columns.edition} zh={zh} />
          <ColumnHead centered han="印" zh={zh} />
          <ColumnHead han="日期" label={columns.date} zh={zh} />
          <ColumnHead han="部" label={columns.area} zh={zh} />
          <ColumnHead last han="所改" label={columns.change} zh={zh} />
        </div>
        <ol aria-label={listLabel} className="m-0 list-none p-0">
          {marks.map((mark) => (
            <LedgerRow key={mark.id} mark={mark} zh={zh} />
          ))}
        </ol>
      </div>
    </div>
  </section>
);

type ColumnHeadProps = {
  han: string;
  label?: string;
  zh: boolean;
  centered?: boolean;
  last?: boolean;
};

const ColumnHead: FC<ColumnHeadProps> = ({ han, label, zh, centered = false, last = false }) => (
  <span className={cn('px-4 py-3', centered && 'text-center', last ? 'pl-[22px]' : CELL_RULE)}>
    <span className="tc mr-1.5 font-bold">{han}</span>
    {label && !zh ? label : null}
  </span>
);

type LedgerRowProps = { mark: LedgerMark; zh: boolean };

const LedgerRow: FC<LedgerRowProps> = ({ mark, zh }) => (
  <li
    className={cn(
      `
        grid min-h-[58px] grid-cols-[auto_auto_minmax(0,1fr)] items-center
        gap-x-3 gap-y-1 border-t border-rule px-4 py-3
        first:border-t-0
        lg:gap-0 lg:p-0
      `,
      ROW_GRID,
      mark.correction && 'bg-(--color-cinnabar)/[0.07]',
    )}>
    <span
      className={cn(
        `
          flex flex-col justify-center gap-px
          lg:h-full lg:px-4 lg:py-2
        `,
        CELL_RULE,
      )}>
      <span className="tc text-base font-bold" lang="zh-Hant">
        {mark.editionHan}
      </span>
      <span className="pm text-[0.69rem] text-ink-micro">No. {mark.edition}</span>
    </span>
    <span
      className={cn(
        `
          flex items-center justify-center
          lg:h-full
        `,
        CELL_RULE,
      )}>
      <Seal bottom={mark.seal[1]} size={32} top={mark.seal[0]} />
    </span>
    <span
      className="
        flex flex-wrap items-center gap-x-4 gap-y-1
        lg:contents
      ">
      <time
        className={cn(
          `
            pm flex items-center text-[0.81rem]
            lg:h-full lg:px-4
          `,
          CELL_RULE,
        )}
        dateTime={mark.date}>
        {mark.date}
      </time>
      <span
        className={cn(
          `
            flex items-center gap-2.5
            lg:h-full lg:px-4
          `,
          CELL_RULE,
        )}>
        <span
          aria-hidden="true"
          className="
            tc grid size-[26px] place-items-center text-[0.81rem] font-bold
            shadow-rest
          ">
          {mark.scopeGlyph}
        </span>
        <span className="pm text-[0.81rem]">{mark.scope ?? '—'}</span>
      </span>
    </span>
    <span
      className={cn(
        `
          col-span-3 text-[1.06rem] leading-[1.35]
          lg:col-span-1 lg:px-[22px] lg:py-2 lg:text-[1.13rem]
        `,
        zh && !mark.subjectLang && 'tc',
      )}
      lang={mark.subjectLang}>
      <span className="sr-only">{`${mark.kindWord}${zh ? '：' : ': '}`}</span>
      {mark.subject}
      {mark.breaking ? (
        <span className="red ml-2 text-[0.81rem] font-bold">{mark.breaking}</span>
      ) : null}
    </span>
  </li>
);
