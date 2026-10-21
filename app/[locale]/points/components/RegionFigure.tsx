'use client';

import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

import type { IndexText } from '@/features/points/labels';

import type { RegionLabel } from './indexTypes';

/** Body regions the carved figure labels; each has a region page. */
export type FigureRegion =
  'head' | 'neck' | 'shoulder' | 'chest' | 'back' | 'arm' | 'hand' | 'leg' | 'foot';

/** Props for {@link RegionFigure}. */
export type RegionFigureProps = {
  labels: Readonly<Record<FigureRegion, RegionLabel>>;
  text: IndexText;
  /** BCP-47 tag for Han text. */
  hanLang: string;
  showHan: boolean;
  /** Server-carved figure, front view (the carving reads files at build time). */
  front: ReactNode;
  /** Server-carved figure, back view. */
  back: ReactNode;
};

interface Placement {
  region: FigureRegion;
  side: 'left' | 'right';
  /** Vertical position and leader length, as on the board (660px-tall figure). */
  className: string;
  line: string;
}

const FRONT: readonly Placement[] = [
  { region: 'head', side: 'left', className: 'top-[5.5%]', line: 'w-8 sm:w-[104px]' },
  { region: 'neck', side: 'left', className: 'top-[15.8%]', line: 'w-10 sm:w-[120px]' },
  { region: 'chest', side: 'left', className: 'top-[28.2%]', line: 'w-9 sm:w-[110px]' },
  { region: 'hand', side: 'left', className: 'top-[60.6%]', line: 'w-5 sm:w-[66px]' },
  { region: 'foot', side: 'left', className: 'top-[92.4%]', line: 'w-9 sm:w-[110px]' },
  { region: 'shoulder', side: 'right', className: 'top-[21.2%]', line: 'w-5 sm:w-[70px]' },
  { region: 'arm', side: 'right', className: 'top-[37.9%]', line: 'w-6 sm:w-[72px]' },
  { region: 'leg', side: 'right', className: 'top-[84.8%]', line: 'w-9 sm:w-[110px]' },
];

const BACK: readonly Placement[] = [
  { region: 'head', side: 'left', className: 'top-[5.5%]', line: 'w-8 sm:w-[104px]' },
  { region: 'neck', side: 'left', className: 'top-[15.8%]', line: 'w-10 sm:w-[120px]' },
  { region: 'back', side: 'left', className: 'top-[36%]', line: 'w-12 sm:w-[124px]' },
  { region: 'hand', side: 'left', className: 'top-[60.6%]', line: 'w-5 sm:w-[66px]' },
  { region: 'foot', side: 'left', className: 'top-[92.4%]', line: 'w-9 sm:w-[110px]' },
  { region: 'shoulder', side: 'right', className: 'top-[21.2%]', line: 'w-5 sm:w-[70px]' },
  { region: 'arm', side: 'right', className: 'top-[37.9%]', line: 'w-6 sm:w-[72px]' },
  { region: 'leg', side: 'right', className: 'top-[84.8%]', line: 'w-9 sm:w-[110px]' },
];

/**
 * 按部: the carved standing figure with a label for each body region, each
 * opening that region's page. "Turn over" shows the back of the figure.
 * @param props body illustrations, region links, and viewing labels
 * @param props.labels localized interface labels
 * @param props.text localized interface copy
 * @param props.hanLang language tag for Han text
 * @param props.showHan whether Han labels accompany English copy
 * @param props.front front-view illustration
 * @param props.back back-view illustration
 * @returns the reversible body figure with links to its regions
 */
export const RegionFigure: FC<RegionFigureProps> = ({
  labels,
  text,
  hanLang,
  showHan,
  front,
  back,
}) => {
  const [turned, setTurned] = useState(false);
  const placements = turned ? BACK : FRONT;

  return (
    <section
      aria-labelledby="index-regions"
      className="
        r1 flex flex-col gap-4 px-4 py-5
        sm:px-6 sm:py-[22px]
      ">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="m-0 text-[1.375rem] font-medium" id="index-regions">
          <span className="tc font-bold" lang={hanLang}>
            {text.regionAside.han}
          </span>
          {showHan ? ` ${text.regionAside.label}` : null}
        </h2>
        <button
          aria-pressed={turned}
          className="
            cursor-pointer border-0 bg-transparent px-3 py-1.5 text-sm
            shadow-rest
          "
          type="button"
          onClick={() => setTurned(!turned)}>
          {turned ? text.turnBack : text.turnOver}
        </button>
      </div>
      <div className="relative mx-auto aspect-422/660 w-full max-w-[422px]">
        <svg
          aria-label={turned ? text.figureBack : text.figureFront}
          className="absolute top-0 left-[14.5%] h-[97%] w-[71%]"
          role="img"
          viewBox="0 0 300 640">
          {turned ? back : front}
        </svg>
        <ul className="m-0 list-none p-0">
          {placements.map((p) => {
            const label = labels[p.region];

            return (
              <li
                className={cn('absolute', p.className, p.side === 'left' ? `
                  left-0
                ` : `right-0`)}
                key={p.region}>
                <Link
                  className="
                    wb-link flex items-center gap-1.5 text-sm
                    sm:gap-2 sm:text-[1.06rem]
                  "
                  href={label.href}>
                  {p.side === 'right' ? <Leader className={p.line} /> : null}
                  <span className="bg-paper">
                    <span className="tc font-bold" lang={hanLang}>
                      {label.han}
                    </span>
                    {showHan ? ` ${label.label}` : null}
                  </span>
                  {p.side === 'left' ? <Leader className={p.line} /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/** Props for the hairline leader from a label to the figure. */
export type LeaderProps = { className: string };

const Leader: FC<LeaderProps> = ({ className }) => (
  <span aria-hidden="true" className={cn(`h-px shrink-0 bg-ink`, className)} />
);
