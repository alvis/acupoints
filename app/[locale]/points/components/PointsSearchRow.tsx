'use client';

import { fill } from '@/features/points/format';

import type { ReactNode } from 'react';

import type { PointsIndexViewModel } from './PointsIndexView';

const MATCH_COUNT_CLASSES = '\n          m-0 min-h-5 text-[0.95rem] text-ink-soft\n        ';

/**
 * render index heading slot, search input, and live match count
 * @param props index search controls
 * @param props.model heading content, query state, search labels, and match counts
 * @returns the index heading slot, search input, and live match count
 */
export const PointsSearchRow = ({
  model,
}: Readonly<{ model: PointsIndexViewModel }>): ReactNode => {
  const { children, searchId, text, query, setQuery, needle, matchCount, leafCount, deferred } =
    model;

  return (
    <div
      className="
        mt-8 flex flex-col gap-8
        lg:mt-11 lg:flex-row lg:items-end lg:gap-[34px]
      ">
      {children}
      <span
        aria-hidden="true"
        className="
          hidden flex-1
          lg:block
        "
      />
      <div
        className="
          flex flex-col gap-2
          lg:mb-2 lg:w-[340px] lg:shrink-0
        ">
        <label className="cap" htmlFor={searchId}>
          {text.searchLabel}
        </label>
        <div
          className="
            flex items-center gap-3 px-4 py-3
            shadow-[inset_0_0_0_2px_var(--color-ink)]
            focus-within:shadow-[inset_0_0_0_3px_var(--color-ink)]
          ">
          <svg aria-hidden="true" className="shrink-0" height="18" viewBox="0 0 16 16" width="18">
            <circle
              cx="6.5"
              cy="6.5"
              fill="none"
              r="5"
              stroke="var(--color-ink)"
              strokeWidth="1.6"
            />
            <path d="M10.4 10.4 L15 15" stroke="var(--color-ink)" strokeWidth="1.6" />
          </svg>
          <input
            autoComplete="off"
            className="
              w-full min-w-0 border-0 bg-transparent p-0 text-lg text-ink
              outline-none
              placeholder:text-ink-soft
            "
            id={searchId}
            placeholder={text.searchPlaceholder}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <p aria-live="polite" className={MATCH_COUNT_CLASSES}>
          {needle
            ? matchCount > 0
              ? fill(text.matches, { n: matchCount, total: leafCount })
              : fill(text.noMatch, { q: deferred.trim() })
            : ''}
        </p>
      </div>
    </div>
  );
};
