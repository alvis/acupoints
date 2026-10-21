import type { JSX, ReactNode } from 'react';

import type { PairBox, PairColumn, PairRow } from './PairingGrid';

/** the degree headings, limb rows, and channel-box renderer */
interface ChannelPairsProps {
  columns: readonly PairColumn[];
  hanLang: string;
  rows: readonly PairRow[];
  box: (b: PairBox, dark: boolean) => JSX.Element;
}

/**
 * arranges hand and foot channels by yin–yang degree
 * @param props the degree headings, limb rows, and channel-box renderer
 * @returns the degree headings and linked yin–yang pairs
 */
export const ChannelPairs = (props: Readonly<ChannelPairsProps>): ReactNode => {
  const { columns, hanLang, rows, box } = props;

  return (
    <div className="flex flex-col gap-6">
      <div
        aria-hidden="true"
        className="
          hidden grid-cols-[110px_repeat(3,minmax(0,1fr))] gap-8
          lg:grid
        ">
        <span />
        {columns.map((c) => (
          <span className="flex items-baseline gap-3" key={c.zh}>
            <span className="tc text-[1.0625rem] font-bold" lang={hanLang}>
              {c.zh}
            </span>
            {c.en ? <span className="text-base text-ink-soft">{c.en}</span> : null}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          className="
            grid gap-5
            lg:grid-cols-[110px_repeat(3,minmax(0,1fr))] lg:gap-8
          "
          key={row.zh}>
          <span className="flex flex-col">
            <span className="flex items-baseline gap-2.5">
              <span className="tc text-[1.625rem] font-black" lang={hanLang}>
                {row.zh}
              </span>
              {row.label ? <span className="text-lg">{row.label}</span> : null}
            </span>
            <span className="cap">{row.meet}</span>
          </span>
          {row.pairs.map((pair, k) => (
            <div className="flex flex-col gap-2" key={pair.yin.slug}>
              <span
                className="
                  text-sm text-ink-soft
                  lg:hidden
                ">
                <span className="tc font-bold" lang={hanLang}>
                  {columns[k]?.zh}
                </span>{' '}
                {columns[k]?.en}
              </span>
              <div className="flex items-center">
                {box(pair.yin, true)}
                <span
                  aria-hidden="true"
                  className="
                    relative h-0.5 w-[46px] shrink-0 bg-(--color-cinnabar)
                  ">
                  <span
                    className="
                      absolute top-1/2 left-1/2 size-3 -translate-1/2
                      rounded-full bg-paper
                      shadow-[inset_0_0_0_2px_var(--color-cinnabar)]
                    "
                  />
                </span>
                {box(pair.yang, false)}
              </div>
              <span className="text-center text-sm text-ink-soft">{pair.phase}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
