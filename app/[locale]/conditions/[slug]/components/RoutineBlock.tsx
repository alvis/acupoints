import Link from 'next/link';

import { PointDetail } from '@/components/composites/PointDetail';
import { FishTail } from '@/components/primitives/FishTail';
import { MarginNote } from '@/components/primitives/MarginNote';
import { NumberDisc } from '@/components/primitives/NumberDisc';
import { fill } from '@/features/conditions/format';
import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

import type { RoutinePoint } from '@/features/conditions/data';

/** Props for {@link RoutineBlock}. */
export type RoutineBlockProps = {
  points: readonly RoutinePoint[];
  /** Cartouche title on the strip (頭痛方 …). */
  slip: string;
  /** Vertical label at the head of the strip. */
  strip: string;
  /** "leaf →" link text. */
  leaf: string;
  /** Two-line pregnancy margin note. */
  pregnancyNote: [string, string];
  /** Stop rule set at the foot of the list. */
  stopLine: string;
  /** Accessible plate label template; `{name}` and `{code}` filled per point. */
  plateLabel: string;
  className?: string;
};

/**
 * The carved block of a condition page: each point's woodcut plate (marker
 * positions from the shared coordinate table, never hand placed), the
 * fish-tail centre strip, and the numbered point list in pressing order:
 * where each point sits, how to press it and its margin note (the pregnancy
 * note first, else the routine's own).
 * @param props ordered routine points, strip labels, and pregnancy warning
 * @param props.points ordered points shown in the routine
 * @param props.slip cartouche title on the prescription strip
 * @param props.strip vertical label at the head of the fish-tail strip
 * @param props.leaf text of the point leaf links
 * @param props.pregnancyNote two-line pregnancy margin warning
 * @param props.stopLine stop rule at the foot of the point list
 * @param props.plateLabel accessible plate label template with name and code slots
 * @param props.className additional classes for the outer element
 * @returns the point plates, fish-tail strip, and pressing instructions
 */
export const RoutineBlock: FC<RoutineBlockProps> = ({
  points,
  slip,
  strip,
  leaf,
  pregnancyNote,
  stopLine,
  plateLabel,
  className,
}) => (
  <div
    className={cn(
      `
        blk m-1.5 grid grid-cols-1
        lg:grid-cols-[minmax(0,34rem)_58px_minmax(0,1fr)]
      `,
      className,
    )}>
    <div
      className="
        grid grid-cols-2 content-start gap-x-4 gap-y-6 border-b-[1.5px]
        border-ink px-4 py-6
        sm:px-6
        lg:border-r-[1.5px] lg:border-b-0 lg:py-8
      ">
      {points.map((point, i) => (
        <figure className="m-0 flex min-w-0 flex-col items-center gap-2" key={point.code}>
          <PointDetail
            className="max-w-60"
            code={point.code}
            label={fill(plateLabel, { name: point.name, code: point.code })}
          />
          <figcaption className="flex items-center gap-2 text-[0.95rem]">
            <NumberDisc n={i + 1} size={26} />
            <span className="tc font-bold">{point.hanzi}</span>
            <span className="pm text-xs text-ink-micro">{point.code}</span>
          </figcaption>
        </figure>
      ))}
    </div>

    <div
      aria-hidden="true"
      className="
        hidden flex-col items-center gap-3 border-r-[1.5px] border-ink py-3
        lg:flex
      ">
      <span className="block h-10 w-1.5 bg-ink" />
      <FishTail />
      <span className="tc vt text-base font-bold tracking-[0.2em]">{strip}</span>
      <span className="flex-1" />
      <span className="tc vt text-sm tracking-[0.2em]">{slip}</span>
      <FishTail up />
      <span className="tc text-base font-bold">方</span>
    </div>

    <div
      className="
        flex min-w-0 flex-col px-4 pt-3 pb-5
        sm:px-7
        lg:pt-5
      ">
      <ol className="m-0 list-none p-0">
        {points.map((point, i) => (
          <li
            className="
              grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-rule
              pt-4 pb-[18px]
              sm:grid-cols-[50px_minmax(0,1fr)]
            "
            key={point.code}>
            <NumberDisc n={i + 1} />
            <div className="flex min-w-0 flex-col gap-1.5">
              <Link
                className="
                  group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ink
                  no-underline
                "
                href={point.href}>
                <span className="tc text-[1.75rem] leading-tight font-bold">{point.hanzi}</span>
                {point.name === point.hanzi ? null : (
                  <span className="text-[1.375rem]">{point.name}</span>
                )}
                <span className="pm text-xs text-ink-micro">{point.code}</span>
                <span
                  aria-hidden="true"
                  className="
                    lead hidden
                    sm:block
                  "
                />
                <span
                  className="
                    text-[0.95rem] underline underline-offset-[3px]
                    group-hover:text-seal
                  ">
                  {leaf}
                </span>
              </Link>
              <p className="m-0 text-[1.0625rem] leading-[1.45]">{point.where}</p>
              {point.how || point.avoidInPregnancy || point.note ? (
                <p className="m-0 text-[1.0625rem] leading-[1.45] text-ink-soft">
                  {point.how}
                  {noteFor(point, pregnancyNote)}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <p className="m-0 mt-auto pt-5 text-[0.95rem] text-ink-soft">{stopLine}</p>
    </div>
  </div>
);

/**
 * selects a pregnancy warning before the authored point note
 * @param point the acupoint to describe.
 * @param pregnancyNote two-line warning used for points avoided in pregnancy
 * @returns the pregnancy warning or authored point margin note
 */
function noteFor(point: RoutinePoint, pregnancyNote: [string, string]): ReactNode {
  const lines = point.avoidInPregnancy ? pregnancyNote : point.note;

  return lines ? <MarginNote lines={lines} /> : null;
}
