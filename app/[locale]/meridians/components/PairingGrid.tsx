'use client';

import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { useChannelSelection } from '../hooks/useChannelSelection';

import { ChannelPairs } from './ChannelPairs';
import { ExtraordinaryVessels } from './ExtraordinaryVessels';

import type { FC, JSX } from 'react';

/** One channel box in the pairing diagram. */
export type PairBox = {
  slug: string;
  /** Organ word, e.g. 大腸. */
  zh: string;
  /** English name; omitted on Chinese pages. */
  en?: string;
  code: string;
  href: string;
};

/** A yin channel joined to its yang partner. */
export type ChannelPair = {
  yin: PairBox;
  yang: PairBox;
  /** "金 Metal". */
  phase: string;
};

/** Hand or foot row of three pairs. */
export type PairRow = {
  /** limb category written in Chinese */
  zh: string;
  /** "Hand" on English pages. */
  label?: string;
  /** "FINGERTIPS". */
  meet: string;
  pairs: readonly ChannelPair[];
};

/** Column heading: "太陰 · 陽明" with "Taiyin and Yangming". */
export type PairColumn = {
  zh: string;
  en?: string;
};

/** A midline vessel beside the pairs. */
export type VesselMark = {
  slug: string;
  zh: string;
  label: string;
  href: string;
  dark: boolean;
};

/** Props for {@link PairingGrid}. */
export type PairingGridProps = {
  columns: readonly PairColumn[];
  rows: readonly PairRow[];
  vessels: readonly VesselMark[];
  /** Text alternative describing the whole diagram. */
  description: string;
  /** Word read after the picked box, e.g. "picked". */
  pickedWord: string;
  hanLang: string;
};

/**
 * Interior–exterior pairing (表裏): six yin boxes in ink joined to their yang
 * partners, hand row over foot row, with the two midline vessels apart.
 * The volume picked on the chart above is ringed in red.
 * @param props the degree columns, channel pairs, and vessel labels
 * @param props.columns the yin–yang degree headings
 * @param props.rows the hand and foot channel pairs
 * @param props.vessels the governing and conception vessel entries
 * @param props.description the accessible description of the pairing diagram
 * @param props.pickedWord the announcement for the selected channel
 * @param props.hanLang the BCP-47 tag for Han text
 * @returns the hand and foot pairings beside the two midline vessels
 */
export const PairingGrid: FC<PairingGridProps> = ({
  columns,
  rows,
  vessels,
  description,
  pickedWord,
  hanLang,
}) => {
  const { selected } = useChannelSelection();
  const box = (b: PairBox, dark: boolean): JSX.Element => {
    const on = b.slug === selected;

    return (
      <Link
        className={cn(
          `
            flex min-h-[58px] min-w-0 flex-1 items-center justify-between gap-2
            px-3.5 py-2 no-underline
          `,
          dark ? 'bg-ink text-paper' : `bg-paper text-ink shadow-rest`,
          on && 'shadow-[0_0_0_4px_var(--color-cinnabar)]',
        )}
        href={b.href}>
        <span className="tc text-[1.375rem] font-black" lang={hanLang}>
          {b.zh}
        </span>
        <span className="flex flex-col items-end leading-tight">
          {b.en ? <span className="text-base">{b.en}</span> : null}
          <span className="pm text-[0.6875rem]">{b.code}</span>
        </span>
        {on ? <span className="sr-only">, {pickedWord}</span> : null}
      </Link>
    );
  };

  return (
    <div
      className="
        grid gap-10
        lg:grid-cols-[minmax(0,1fr)_190px]
      ">
      <p className="sr-only">{description}</p>
      <ChannelPairs {...{ columns, hanLang, rows, box }} />
      <ExtraordinaryVessels {...{ vessels, selected, hanLang, pickedWord }} />
    </div>
  );
};
