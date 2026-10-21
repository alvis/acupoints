'use client';

import { FishTail } from '@/components/primitives/FishTail';

import type { ReactNode } from 'react';

import type { RegionsBoardViewModel } from './RegionsBoardView';

/**
 * pair the selectable body figures with the chosen region card.
 * @param props region figure selection
 * @param props.model figure renderer, current region, legend labels, and server-rendered cards
 * @returns the paired figures, selection legend, spine, and chosen region card
 */
export const RegionFigureSpread = ({
  model,
}: Readonly<{ model: RegionsBoardViewModel }>): ReactNode => {
  const { copy, current, figure, frontFigure, backFigure, panels, index } = model;

  return (
    <section aria-label={copy.figureLabel} className="mt-6">
      <div
        className="
          blk m-1.5 grid
          lg:grid-cols-[minmax(0,620px)_58px_minmax(0,1fr)]
        ">
        <div
          className="
            relative border-b-[1.5px] border-ink px-4 pt-11 pb-6
            sm:px-[30px]
            lg:border-r-[1.5px] lg:border-b-0
          ">
          <div
            className="
              flex items-start gap-6
              sm:gap-9 sm:pr-14
            ">
            {figure('front', frontFigure, 'w-[58%] max-w-[360px]')}
            <div className="
              flex w-[30%] max-w-[180px] flex-col gap-8 pt-[106px]
            ">
              {figure('back', backFigure, 'w-full')}
              <span
                className="
                  flex flex-col gap-2 text-sm leading-[1.45] text-ink-soft
                ">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-3 w-[18px] shrink-0 outline-[1.5px]
                      outline-offset-[-1.5px] outline-ink outline-dashed
                    "
                  />
                  {copy.legendZone}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-3 w-[18px] shrink-0 bg-[rgba(194,59,34,0.2)]
                      shadow-[inset_0_0_0_2px_var(--color-cinnabar)]
                    "
                  />
                  {copy.legendPicked}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      mx-1 size-2.5 shrink-0 rounded-full bg-(--color-cinnabar)
                    "
                  />
                  {copy.legendPoints}
                </span>
              </span>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="
              tc vt r1 absolute top-[18px] right-[18px] hidden bg-paper px-[5px]
              py-3 text-xl font-bold tracking-[0.12em]
              sm:block
            ">
            {copy.cartouche}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="
            hidden flex-col items-center gap-3 border-r-[1.5px] border-ink py-3
            lg:flex
          ">
          <span className="h-10 w-1.5 bg-ink" />
          <FishTail />
          <span className="tc vt text-base font-bold tracking-[0.2em]">{copy.stripTitle}</span>
          <span className="flex-1" />
          <span className="tc vt text-sm tracking-[0.2em]">{copy.stripMiddle}</span>
          <FishTail up />
          <span className="tc text-base font-bold">{current.glyph}</span>
        </div>

        <div
          aria-live="polite"
          className="
            min-w-0 px-4 pt-[26px] pb-5
            sm:px-[30px]
          ">
          {panels[index]}
        </div>
      </div>
    </section>
  );
};
