import { cn } from '@/utilities/cn';

import { ChartCard } from './ChartCard';

import type { FC, RefObject } from 'react';

import type { ChartPoint, PointChartProps } from './PointChart';

const LONG_LIST = 24;

type ChartRowsProps = Pick<PointChartProps, 'points' | 'copy' | 'hanLang' | 'english'> & {
  current: ChartPoint;
  selected: number;
  isSealed: (code: string) => boolean;
  setSelected: (index: number) => void;
  rows: RefObject<Map<number, HTMLButtonElement>>;
};

export const ChartRows: FC<Readonly<ChartRowsProps>> = ({
  points,
  copy,
  hanLang,
  current,
  english,
  isSealed,
  selected,
  setSelected,
  rows,
}) => (
  <div
    className="
      flex min-w-0 flex-col gap-4 p-5
      sm:p-7
    ">
    <ChartCard
      copy={copy}
      current={current}
      english={english}
      hanLang={hanLang}
      isSealed={isSealed}
    />

    <ol
      aria-label={copy.listLabel}
      className={cn(
        'm-0 flex list-none flex-col p-0',
        points.length > LONG_LIST && 'max-h-144 overflow-y-auto',
      )}>
      {points.map((point, index) => {
        const on = index === selected;
        const sealed = isSealed(point.code);

        return (
          <li key={point.code}>
            <button
              aria-pressed={on}
              className={cn(
                `
                  flex min-h-9 w-full cursor-pointer items-center gap-1.5
                  border-0 border-b border-[rgba(29,26,22,0.18)] px-2.5
                  text-left text-ink
                `,
                on
                  ? `
                    bg-paper-raised shadow-[inset_3px_0_0_var(--color-cinnabar)]
                  `
                  : `
                    bg-transparent
                    hover:bg-paper-raised
                  `,
              )}
              ref={(el) => {
                if (el) {
                  rows.current.set(index, el);
                } else {
                  rows.current.delete(index);
                }
              }}
              type="button"
              onClick={() => setSelected(index)}>
              <span className="tc w-11 shrink-0 text-sm text-ink-micro" lang={hanLang}>
                {point.ordinal}
              </span>
              <span className="tc w-19 shrink-0 text-[1.15rem] font-bold" lang={hanLang}>
                {point.hanzi}
              </span>
              <span className="min-w-0 truncate text-[1.05rem]">{point.name}</span>
              <span aria-hidden="true" className="lead" />
              <span className="pm shrink-0 text-[0.75rem]">{point.code}</span>
              <span
                aria-hidden="true"
                className={cn(
                  'ml-2.5 size-3 shrink-0',
                  sealed
                    ? 'bg-(--color-cinnabar)'
                    : `shadow-[inset_0_0_0_1px_var(--color-ink)]`,
                )}
              />
              <span className="sr-only">{sealed ? copy.sealed : copy.notSealed}</span>
            </button>
          </li>
        );
      })}
    </ol>
  </div>
);
