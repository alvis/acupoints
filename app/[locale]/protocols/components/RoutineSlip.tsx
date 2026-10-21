import Link from 'next/link';

import { MarginNote } from '@/components/primitives/MarginNote';
import { Seal } from '@/components/primitives/Seal';
import { PointSeal } from '@/features/conditions/components/PointSeal';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One point on a slip's sequence row. */
export type SlipPoint = {
  code: string;
  hanzi: string;
  /** Name under the seal (pinyin in English, omitted in Chinese). */
  label?: string;
};

/** One ruled row of a slip: Han glyph, label and value. */
export type SlipRow = {
  /** Han glyph before the label (時, 難, 處, 次). */
  han: string;
  label: string;
  value: string;
};

/** How hard a routine's points are to find, drawn as three dots. */
export type SlipFinding = SlipRow & {
  /** 1 easy, 2 fair, 3 takes care. */
  level: (typeof FINDING_LEVEL)[keyof typeof FINDING_LEVEL];
  /** Accessible label of the dots. */
  aria: string;
};

/** Props for {@link RoutineSlip}. */
export type RoutineSlipProps = {
  /** Heading id, unique on the page. */
  id: string;
  /** "方一 · Routine 1" caption. */
  number: string;
  /** Han numeral at the foot of the side column. */
  numeral: string;
  title: string;
  /** Cartouche title down the side column (頭痛方 …). */
  slip: string;
  /** Han name of the condition down the side column. */
  han: string;
  /** What the routine is for. */
  summary: string;
  points: readonly SlipPoint[];
  /** Spoken order of the sequence row. */
  sequenceLabel: string;
  time: SlipRow;
  finding: SlipFinding;
  where: SlipRow;
  often: SlipRow;
  /** Two-line margin note, red, beside the press-along link. */
  caution?: readonly [string, string];
  /** The prescription-slip seal (方 · 箋), in the page's script. */
  seal: readonly [string, string];
  practiceHref: string;
  pressAlong: string;
  className?: string;
};

const FINDING_LEVEL = { easy: 1, fair: 2, careful: 3 } as const;

const DOTS = Object.values(FINDING_LEVEL);

/**
 * A condition's routine written out as an old prescription slip (方箋): the
 * caption and seal, the title and what it is for, the points in order as
 * seals joined by arrows, the time, finding, where and how-often rows, the
 * caution note and the link into the guided practice, which times each point.
 * @param props prescription title, ordered points, facts, and practice destination
 * @param props.id anchor identifying the prescription slip
 * @param props.number localized prescription number above the title
 * @param props.numeral Han routine number in the slip legend
 * @param props.title condition title on the prescription slip
 * @param props.slip cartouche title on the prescription strip
 * @param props.han Han condition name beside the translated title
 * @param props.summary authored purpose of the routine
 * @param props.points ordered points shown in the routine
 * @param props.sequenceLabel accessible description of the pressing sequence
 * @param props.time duration label and routine time estimate
 * @param props.finding finding difficulty, dots, and accessible description
 * @param props.where posture label and instructions
 * @param props.often frequency label and instructions
 * @param props.caution two-line caution printed beneath the routine
 * @param props.seal pair of Han characters stamped on the slip
 * @param props.practiceHref URL of the guided practice for this routine
 * @param props.pressAlong text of the guided practice link
 * @param props.className additional classes for the outer element
 * @returns the prescription slip with ordered points and practice link
 */
export const RoutineSlip: FC<RoutineSlipProps> = ({
  id,
  number,
  numeral,
  title,
  slip,
  han,
  summary,
  points,
  sequenceLabel,
  time,
  finding,
  where,
  often,
  caution,
  seal,
  practiceHref,
  pressAlong,
  className,
}) => (
  <article
    aria-labelledby={id}
    className={cn(
      `
        grid min-w-0 grid-cols-[minmax(0,1fr)_66px] bg-paper-raised
        shadow-[inset_0_0_0_2px_var(--color-ink),inset_0_0_0_7px_var(--color-paper-raised),inset_0_0_0_8px_var(--color-ink)]
      `,
      className,
    )}>
    <div
      className="
        flex min-w-0 flex-col gap-3.5 pt-[26px] pr-[18px] pb-6 pl-6
        sm:pr-[22px] sm:pl-7
      ">
      <span className="flex items-center gap-2.5">
        <span className="cap">{number}</span>
        <span className="flex-1" />
        <span className="inline-flex rotate-[-7deg] opacity-90">
          <Seal bottom={seal[1]} size={44} top={seal[0]} />
        </span>
      </span>
      <h3 className="m-0 -mt-2 text-[1.875rem] leading-[1.1] font-medium" id={id}>
        {title}
      </h3>
      <p className="m-0 text-[1.0625rem] leading-[1.45] text-ink-soft">{summary}</p>
      <div
        aria-label={sequenceLabel}
        className="
          flex flex-wrap items-start gap-2 border-t-[2.5px] border-b border-ink
          pt-3.5 pb-2.5
        "
        role="img">
        {points.map((point, i) => (
          <span className="flex items-start gap-2" key={point.code}>
            {i > 0 ? <span className="red pt-2.5 text-lg">→</span> : null}
            <span className="flex flex-col items-center gap-[3px]">
              <PointSeal hanzi={point.hanzi} size={40} />
              <span className="pm text-[0.7rem]">{point.code}</span>
              {point.label ? (
                <span className="text-[0.8rem] text-ink-soft">{point.label}</span>
              ) : null}
            </span>
          </span>
        ))}
      </div>
      <dl
        className="
          m-0 grid grid-cols-[28px_minmax(4.5rem,auto)_minmax(0,1fr)]
          items-baseline gap-2 text-base
        ">
        <SlipLine row={time} />
        <dt aria-hidden="true" className="tc font-bold">
          {finding.han}
        </dt>
        <dt className="cap">{finding.label}</dt>
        <dd className="m-0 flex items-center gap-2">
          <span aria-label={finding.aria} className="flex gap-1" role="img">
            {DOTS.map((dot) => (
              <span
                className={cn(
                  `block size-2.5 rounded-full shadow-rest`,
                  dot <= finding.level && 'bg-ink',
                )}
                key={dot}
              />
            ))}
          </span>
          <span aria-hidden="true">{finding.value}</span>
        </dd>
        <SlipLine row={where} />
        <SlipLine row={often} />
      </dl>
      <span className="mt-auto flex flex-wrap items-center gap-2.5 pt-1.5">
        {caution ? <MarginNote lines={caution} /> : null}
        <span className="flex-1" />
        <Link className="btn btn-primary px-4 py-2.5 text-base" href={practiceHref}>
          {pressAlong}
        </Link>
      </span>
    </div>
    <div
      aria-hidden="true"
      className="
        flex flex-col items-center gap-3 border-l-[1.5px] border-ink pt-[22px]
        pb-[18px]
      ">
      <span className="tc vt text-[1.875rem] font-black tracking-widest">{slip}</span>
      <span className="w-[1.5px] flex-1 bg-(--color-cinnabar)" />
      <span className="tc vt text-sm tracking-[0.14em] text-ink-soft">{han}</span>
      <span className="tc text-[0.95rem] font-bold">{numeral}</span>
    </div>
  </article>
);

type SlipLineProps = { row: SlipRow };

const SlipLine: FC<SlipLineProps> = ({ row }) => (
  <>
    <dt aria-hidden="true" className="tc font-bold">
      {row.han}
    </dt>
    <dt className="cap">{row.label}</dt>
    <dd className="m-0">{row.value}</dd>
  </>
);
