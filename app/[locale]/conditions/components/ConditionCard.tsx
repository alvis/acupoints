import Link from 'next/link';

import { MarginNote } from '@/components/primitives/MarginNote';
import { PointSeal } from '@/features/conditions/components/PointSeal';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One point of a card's seal row. */
export type CardPoint = {
  code: string;
  hanzi: string;
};

/** Props for {@link ConditionCard}. */
export type ConditionCardProps = {
  href: string;
  /** Han name of the condition. */
  han: string;
  /** Latin name; omitted on Chinese pages, where the Han name is the heading. */
  name?: string;
  oneLiner: string;
  points: readonly CardPoint[];
  /** "四穴" badge. */
  badge: string;
  /** "4 points" footer count. */
  count: string;
  readSet: string;
  /** Two-line pregnancy note, when the set has points to leave out. */
  caution?: [string, string];
  className?: string;
};

/**
 * A condition on the index shelf: the Han name with its point-count badge,
 * the name and one-liner, the set's points cut as seals with their codes, and
 * a dotted-leader footer into the condition page.
 * @param props condition destination, names, point seals, and caution
 * @param props.href destination of the condition card
 * @param props.han Han condition name beside the translated title
 * @param props.name condition name in the page language
 * @param props.oneLiner one-sentence description of the condition routine
 * @param props.points ordered points shown in the routine
 * @param props.badge decorative Han condition glyph
 * @param props.count localized point count and routine duration
 * @param props.readSet text of the link to the condition routine
 * @param props.caution two-line caution printed beneath the routine
 * @param props.className additional classes for the outer element
 * @returns the linked condition card with point seals and caution
 */
export const ConditionCard: FC<ConditionCardProps> = ({
  href,
  han,
  name,
  oneLiner,
  points,
  badge,
  count,
  readSet,
  caution,
  className,
}) => (
  <Link
    className={cn(
      `
        r1 group flex min-w-0 flex-col gap-3 bg-paper px-6 pt-[22px] pb-5
        text-ink no-underline
        hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
      `,
      className,
    )}
    href={href}>
    <span className="flex items-baseline gap-3">
      {name ? (
        <span aria-hidden="true" className="
          tc text-[2.125rem] leading-[1.1] font-black
        ">
          {han}
        </span>
      ) : (
        <h3 className="tc m-0 text-[2.125rem] leading-[1.1] font-black">{han}</h3>
      )}
      {caution ? <MarginNote lines={caution} /> : null}
      <span className="flex-1" />
      <span className="
        tc shrink-0 px-2 py-[3px] text-[0.95rem] font-bold whitespace-nowrap
        shadow-rest
      ">
        {badge}
      </span>
    </span>
    {name ? <h3 className="m-0 text-[1.5625rem] leading-[1.1] font-medium">{name}</h3> : null}
    <span
      className="
        text-[1.0625rem] leading-[1.45] text-ink-soft
        sm:min-h-[4.6rem]
      ">
      {oneLiner}
    </span>
    <span className="flex flex-wrap items-end gap-2.5">
      {points.map((point) => (
        <span className="flex flex-col items-center gap-[3px]" key={point.code}>
          <PointSeal hanzi={point.hanzi} size={32} />
          <span className="pm text-[0.66rem] text-ink-soft">{point.code}</span>
        </span>
      ))}
    </span>
    <span
      className="
        mt-auto flex items-center border-t border-rule pt-2.5 text-base
      ">
      <span>{count}</span>
      <span aria-hidden="true" className="lead" />
      <span
        className="
          underline underline-offset-[3px]
          group-hover:text-seal
        ">
        {readSet}
      </span>
    </span>
  </Link>
);
