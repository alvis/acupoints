'use client';

import { cn } from '@/utilities/cn';

import { RegionFigureSpread } from './RegionFigureSpread';

import type { ReactNode } from 'react';

import type { useRegionsBoardModel } from './RegionsBoard';

/** nonempty body-part selection shared by the rail and figure spread. */
export type RegionsBoardViewModel = NonNullable<ReturnType<typeof useRegionsBoardModel>>;

/**
 * compose the region rail and synchronized figure spread.
 * @param model current body part, selection controls, and figure renderer
 * @returns the region button rail and synchronized figure spread
 */
export const RegionsBoardView = (model: Readonly<RegionsBoardViewModel>): ReactNode => {
  const { copy, regions, current, setSelected, hanLang } = model;

  return (
    <>
      <section aria-labelledby="region-list" className="mt-11">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          <h2 className="m-0 text-xl font-semibold" id="region-list">
            {copy.listTitle}
          </h2>
          <span className="text-base text-ink-soft">{copy.listNote}</span>
        </div>
        <div
          aria-label={copy.listLabel}
          className="
            grid grid-cols-5 border-t-[2.5px] border-b border-ink
            lg:grid-cols-10
          "
          role="group">
          {regions.map((r) => {
            const on = r.slug === current.slug;

            return (
              <button
                aria-pressed={on}
                className={cn(
                  `
                    flex min-h-11 cursor-pointer flex-col items-center gap-1.5
                    border-0 border-r border-[rgba(29,26,22,0.25)] px-1 pt-3.5
                    pb-3 text-ink
                  `,
                  on
                    ? `
                      bg-paper-raised
                      shadow-[inset_0_-3px_0_var(--color-cinnabar)]
                    `
                    : `
                      bg-transparent
                      hover:bg-paper-raised
                    `,
                )}
                key={r.slug}
                type="button"
                onClick={() => setSelected(r.slug)}>
                <span
                  aria-hidden="true"
                  className="tc text-2xl leading-none font-black"
                  lang={hanLang}>
                  {r.glyph}
                </span>
                <span className="text-[1.0625rem]">{r.name}</span>
                <span className="pm text-[0.6875rem] text-ink-micro">{r.count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <RegionFigureSpread model={model} />
    </>
  );
};
