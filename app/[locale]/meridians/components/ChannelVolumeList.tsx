import { cn } from '@/utilities/cn';

import type { CSSProperties, ReactNode } from 'react';

import type { ChannelChartCopy, ChartChannel } from './ChannelChart';

/** the channel cards, volume entries, seal counts, and selection callback */
type ChannelVolumeListProps = {
  panels: readonly ReactNode[];
  index: number;
  copy: ChannelChartCopy;
  channels: readonly ChartChannel[];
  sealedIn: (codes: readonly string[]) => number;
  select: (slug: string) => void;
};

/**
 * lists the fourteen volumes beside the selected channel card
 * @param props the channel cards, volume entries, seal counts, and selection callback
 * @returns the selected card and volume buttons with seal counts
 */
export const ChannelVolumeList = (props: Readonly<ChannelVolumeListProps>): ReactNode => {
  const { panels, index, copy, channels, sealedIn, select } = props;

  return (
    <div
      className="
        flex min-w-0 flex-col gap-3.5 px-4 pt-[22px] pb-[18px]
        sm:px-[26px]
      ">
      <div aria-live="polite">{panels[index]}</div>
      <div aria-label={copy.rowsLabel} className="flex flex-col" role="group">
        {channels.map((c, k) => {
          const on = k === index;
          const sealed = sealedIn(c.codes);
          const count = c.codes.length;

          return (
            <button
              aria-label={copy.rowLabel
                .replace('{vol}', c.vol)
                .replace('{name}', c.name)
                .replace('{count}', String(count))
                .replace('{n}', String(sealed))}
              aria-pressed={on}
              className={cn(
                `
                  flex min-h-11 cursor-pointer items-center gap-1.5 border-0
                  border-b border-[rgba(29,26,22,0.18)] px-2.5 py-1 text-ink
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
              key={c.slug}
              type="button"
              onClick={() => select(c.slug)}>
              <span
                className="
                  tc w-[50px] shrink-0 text-left text-sm text-ink-micro
                ">
                {c.vol}
              </span>
              <span className="flex min-w-0 flex-1 flex-col text-left">
                <span className="tc text-lg leading-[1.2] font-bold">{c.zh}</span>
                {c.en ? <span className="text-sm/tight text-ink-soft">{c.en}</span> : null}
              </span>
              <span className="pm w-[34px] shrink-0 text-right text-xs">{count}</span>
              <span
                className="
                  relative ml-3 hidden h-1.5 w-16 shrink-0
                  shadow-[inset_0_0_0_1px_var(--color-ink)]
                  sm:block
                ">
                <span
                  className="absolute inset-y-0 left-0 bg-(--color-cinnabar)"
                  style={barWidth(sealed, count)}
                />
              </span>
              <span
                className="
                  pm w-10 shrink-0 text-right text-[0.6875rem] text-ink-micro
                ">
                {sealed}/{count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PERCENT_SCALE = 100;

/**
 * sizes a progress fill by the sealed fraction
 * @param sealed the number of sealed points
 * @param count the total number of points
 * @returns the rounded percentage width, or zero for an empty channel
 */
function barWidth(sealed: number, count: number): CSSProperties {
  return { width: `${count > 0 ? Math.round((PERCENT_SCALE * sealed) / count) : 0}%` };
}
