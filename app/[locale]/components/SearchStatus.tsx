import { KIND_HAN, LEGEND_KINDS } from './searchCommandData';

import type { FC } from 'react';

import type { Copy } from './searchCommandData';

interface SearchStatusProps {
  copy: Copy;
  trimmed: string;
  total: number;
}
/**
 * announces result totals alongside the printed content-kind legend.
 * @param props localized index labels, trimmed query, and result count
 * @param props.copy localized index labels
 * @param props.trimmed normalized display query
 * @param props.total number of entries or matches announced to the reader
 */
export const SearchStatus: FC<Readonly<SearchStatusProps>> = ({ copy, trimmed, total }) => (
  <div
    className="
      flex flex-wrap items-center gap-x-[18px] gap-y-1 border-b border-rule px-4
      py-2.5 text-[14px] text-ink-soft
      sm:px-[22px]
    ">
    <span aria-live="polite">{trimmed ? copy.matches(total, trimmed) : copy.entries(total)}</span>
    <span className="flex-1" />
    {LEGEND_KINDS.map((kind) => (
      <span
        className="
          hidden
          sm:inline
        "
        key={kind}>
        <span aria-hidden="true" className="tc font-bold text-ink" lang="zh-Hant">
          {KIND_HAN[kind]}
        </span>{' '}
        {copy.legend[kind]}
      </span>
    ))}
  </div>
);
