import Link from 'next/link';

import { PointDetail } from '@/components/composites/PointDetail';
import { fill } from '@/features/learn/fill';

import type { FC } from 'react';

import type { NamedPoint } from '@/features/learn/content';
import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';

import type { PointChipProps } from './PointChip';

/** Props for the page renderer. */
export type JournalPostProps = {
  locale: Locale;
  slug: string;
};

export type Neighbour = {
  title: string;
  tag?: string;
  href: string;
};

export const DATE: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };

export const CUN_SLUG = 'measuring-with-cun';

export type LeadPlateProps = {
  point: NamedPoint;
  href: string;
  copy: LearnCopy;
};

/**
 * The hero figure for a guide without its own: the first named point's plate and leaf link.
 * @param props first referenced point illustration and leaf link
 * @param props.point catalogued point referenced by the guide
 * @param props.href destination of the point leaf
 * @param props.copy localized interface text
 * @returns the first referenced point illustration and leaf link
 */
export const LeadPlate: FC<LeadPlateProps> = ({ point, href, copy }) => (
  <figure
    className="
      blk m-1.5 grid
      sm:grid-cols-[minmax(0,384px)_1.5px_minmax(0,1fr)]
    ">
    <div className="px-3 pt-[18px] pb-3.5">
      <PointDetail
        className="mx-auto max-w-[360px]"
        code={point.code}
        label={`${point.name}, ${point.code}`}
      />
    </div>
    <span
      aria-hidden="true"
      className="
        hidden bg-ink
        sm:block
      "
    />
    <figcaption
      className="
        flex flex-col gap-3 border-t-[1.5px] border-ink px-5 pt-[22px] pb-5
        sm:border-t-0
      ">
      <span className="cap">{copy.pointsCap}</span>
      <span
        aria-hidden="true"
        className="tc text-[2.75rem] leading-none font-black">
        {point.hanzi}
      </span>
      <span className="text-[1.3rem] font-medium">
        {point.name} <span className="pm text-sm text-ink-soft">{point.code}</span>
      </span>
      <span className="text-base text-ink-soft">{point.pinyin}</span>
      {point.avoidInPregnancy ? (
        <span className="red text-sm font-semibold">
          {copy.avoidLine1} {copy.avoidLine2}
        </span>
      ) : null}
      <Link className="btn mt-auto self-start no-underline" href={href}>
        {fill(copy.openLeaf, { code: point.code })}
      </Link>
    </figcaption>
  </figure>
);

/**
 * prepare a referenced point for the related-leaf list
 * @param point catalogued point referenced by the guide
 * @param href destination of the point leaf
 * @param copy localized interface text
 * @returns the point name, leaf destination, and pregnancy caution for a related-leaf chip
 */
export function chipProps(point: NamedPoint, href: string, copy: LearnCopy): PointChipProps {
  return {
    href,
    hanzi: point.hanzi,
    name: point.name,
    code: point.code,
    note: point.avoidInPregnancy ? noteFor(point, copy) : undefined,
  };
}

/**
 * format the pregnancy caution for a referenced point
 * @param point catalogued point referenced by the guide
 * @param copy localized interface text
 * @returns the point code and two-line pregnancy caution
 */
export function noteFor(point: NamedPoint, copy: LearnCopy): [string, string] {
  return [`${point.code}: ${copy.avoidLine1}`, copy.avoidLine2];
}

/**
 * The zh-hant heading up to its first pause, set vertically under the disc.
 * @param heading heading text
 * @returns the heading before its first Chinese punctuation pause, when present
 */
export function firstPhrase(heading: string | undefined): string | undefined {
  return heading?.split(/[：，、]/u)[0];
}
