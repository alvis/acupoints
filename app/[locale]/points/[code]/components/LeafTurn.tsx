import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';

import { VolumeDots } from './VolumeDots';

import type { FC } from 'react';

import type { CardPoint } from './LeafCards';

/** Props for {@link LeafTurn}. */
export type LeafTurnProps = {
  label: string;
  /** BCP-47 tag for Han text. */
  hanLang: string;
  /** formatted channel and leaf position for the navigation heading. */
  place: string;
  current: string;
  codes: readonly string[];
  /** Accessible reading of the position dots. */
  dotsTemplate: string;
  prev?: CardPoint;
  next?: CardPoint;
};

/**
 * Turn the leaf: previous and next leaves either side of the volume's position
 * dots. From md up; phones get the pinned `LeafTurnBar` instead.
 * @param props adjacent leaves, channel position, and navigation labels
 * @param props.label accessible name of the leaf-turn navigation
 * @param props.hanLang language tag for Han text
 * @param props.place formatted volume and leaf position
 * @param props.current identifier of the displayed point
 * @param props.codes ordered point identifiers
 * @param props.dotsTemplate accessible position template
 * @param props.prev previous point in the channel
 * @param props.next next point in the channel
 * @returns the previous and next leaf links with volume position dots
 */
export const LeafTurn: FC<LeafTurnProps> = ({
  label,
  hanLang,
  place,
  current,
  codes,
  dotsTemplate,
  prev,
  next,
}) => (
  <div
    className="
      mx-auto mt-14 hidden max-w-[1440px] px-4
      sm:px-8
      md:block
      lg:px-20
    ">
    <nav
      aria-label={label}
      className="
        grid grid-cols-2 items-center gap-4 border-t-[2.5px] border-b border-ink
        py-[18px]
        md:grid-cols-[1fr_auto_1fr] md:gap-6
      ">
      <div
        className="
          col-span-2 row-start-1 flex flex-col items-center gap-2
          md:col-span-1 md:col-start-2
        ">
        <span className="flex items-center gap-2.5">
          <FishTail width={22} />
          <span className="tc text-base font-bold" lang={hanLang}>
            {place}
          </span>
          <FishTail up width={22} />
        </span>
        <VolumeDots codes={codes} current={current} template={dotsTemplate} />
      </div>
      {prev ? (
        <Link
          className="
            wb-link flex flex-wrap items-baseline gap-x-3
            md:col-start-1 md:row-start-1
          "
          href={prev.href}
          rel="prev">
          <span aria-hidden="true" className="text-[1.375rem]">
            ←
          </span>
          <span className="tc text-2xl font-bold" lang={hanLang}>
            {prev.han}
          </span>
          <span className="text-lg">
            {prev.name} · {prev.code}
          </span>
        </Link>
      ) : (
        <span className="md:col-start-1 md:row-start-1" />
      )}
      {next ? (
        <Link
          className="
            wb-link flex flex-wrap items-baseline justify-end gap-x-3
            md:col-start-3 md:row-start-1
          "
          href={next.href}
          rel="next">
          <span className="text-lg">
            {next.name} · {next.code}
          </span>
          <span className="tc text-2xl font-bold" lang={hanLang}>
            {next.han}
          </span>
          <span aria-hidden="true" className="text-[1.375rem]">
            →
          </span>
        </Link>
      ) : (
        <span className="md:col-start-3 md:row-start-1" />
      )}
    </nav>
  </div>
);
