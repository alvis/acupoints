import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { ChartPlate, PointChartProps } from './PointChart';

type PlateTabsProps = Pick<
  PointChartProps,
  'plates' | 'points' | 'copy' | 'english' | 'hanLang'
> & { plate: ChartPlate | undefined; setSelected: (index: number) => void };

export const PlateTabs: FC<Readonly<PlateTabsProps>> = ({
  copy,
  plates,
  points,
  english,
  hanLang,
  plate,
  setSelected,
}) => (
  <div
    aria-label={copy.platesLabel}
    className={cn(
      `
        flex flex-wrap gap-2
        sm:pr-14
      `,
      plates.length < 2 && `hidden`,
    )}
    role="group">
    {plates.map((p) => {
      const first = points.findIndex((point) => point.plate === p.key);
      const count = points.filter((point) => point.plate === p.key).length;
      const on = p.key === plate?.key;

      return (
        <button
          aria-pressed={on}
          className={cn(
            `
              flex cursor-pointer items-baseline gap-2 border-0 px-3 py-1.5
              text-base text-ink
            `,
            on
              ? `bg-ink text-paper`
              : `
                r1 bg-transparent
                hover:bg-paper-raised
              `,
          )}
          key={p.key}
          type="button"
          onClick={() => setSelected(first)}>
          {english ? (
            <span className="tc font-bold" lang={hanLang}>
              {p.zh}
            </span>
          ) : null}
          <span className={english ? undefined : 'tc'}>{p.label}</span>
          <span className="pm text-[0.75rem]">{count}</span>
        </button>
      );
    })}
  </div>
);
