import { FishTail } from '@/components/primitives/FishTail';
import { hanNumber } from '@/features/points/volumes';

import { HanDirectionScope } from './HanDirectionScope';
import { LeafCrumbBar } from './LeafCrumbBar';
import { LeafPointPlate } from './LeafPointPlate';
import { VERTICAL } from './LeafSpread';
import { LeafTextPanel } from './LeafTextPanel';

import type { ReactNode } from 'react';

import type { useLeafSpreadModel } from './LeafSpread';

/** state and localized content for the LeafSpread layout */
export type LeafSpreadViewModel = ReturnType<typeof useLeafSpreadModel>;

/**
 * render breadcrumb bar and carved spread with the point plate and text panel
 * @param model localized point headings, channel facts, and annotated instructions
 * @returns the breadcrumb bar and carved spread with the point plate and text panel
 */
export const LeafSpreadView = (model: Readonly<LeafSpreadViewModel>): ReactNode => {
  const { hanLang, leafHan, aboveBlock, leafOf, han, stripTitle, position } = model;

  return (
    <HanDirectionScope
      className="
        mx-auto max-w-[1440px] px-4
        sm:px-8
        lg:px-20
      ">
      <LeafCrumbBar model={model} />

      <section
        aria-labelledby="leaf-title"
        className="
          mt-2.5
          md:mt-6
          lg:mt-7
        ">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-2 px-2.5 pb-2.5">
          <div
            className="
              min-w-0 basis-full
              md:flex-1 md:basis-0
            ">
            {aboveBlock}
          </div>
          {leafOf ? <span className="text-[0.95rem] text-ink-soft">{leafOf}</span> : null}
        </div>

        <div
          className="
            blk m-1.5 grid
            lg:min-h-[880px] lg:grid-cols-[minmax(0,1fr)_58px_minmax(0,1fr)]
          ">
          {/* left leaf: the carved plate */}
          <LeafPointPlate model={model} />

          {/* centre strip (版心) */}
          <div
            aria-hidden="true"
            className="
              hidden flex-col items-center gap-3 border-r-[1.5px] border-ink
              py-3
              lg:flex
            ">
            <span className="h-10 w-1.5 bg-ink" />
            <FishTail />
            <span
              className={`
                tc text-base font-bold tracking-[0.2em]
                ${VERTICAL}
              `}
              lang={hanLang}>
              {stripTitle}
            </span>
            <span className="flex-1" />
            <span
              className={`
                tc text-sm tracking-[0.2em]
                ${VERTICAL}
              `}
              lang={hanLang}>
              {han}
            </span>
            <FishTail up />
            <span className="tc text-base font-bold">
              {position ? hanNumber(position.index) : ''}
            </span>
          </div>
          <div
            aria-hidden="true"
            className="
              flex items-center justify-center gap-2 border-b-[1.5px] border-ink
              py-2
              lg:hidden
            ">
            <FishTail width={16} />
            <span className="tc text-[0.95rem] font-bold" lang={hanLang}>
              {stripTitle} · {leafHan}
            </span>
            <FishTail up width={16} />
          </div>

          {/* right leaf: name, main text, commentary, seal */}
          <LeafTextPanel model={model} />
        </div>
      </section>
    </HanDirectionScope>
  );
};
