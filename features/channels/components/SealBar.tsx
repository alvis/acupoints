'use client';

import { useSeals } from '@/components/headless/useSeals';

import type { FC } from 'react';

const PERCENT_SCALE = 100;

/** Props for {@link SealBar}. */
export type SealBarProps = {
  /** Point codes counted, e.g. every leaf of one volume. */
  codes: readonly string[];
  /** Sentence with an `{n}` slot for the sealed count, e.g. "You have sealed {n} of 20". */
  label: string;
};

/**
 * "You have sealed 9 of 20" with a thin cinnabar progress bar. Counts the
 * seals stamped in this browser; reads 0 until the store has loaded.
 * @param props the point codes and sealed-count template
 * @param props.codes the point codes whose browser seals are counted
 * @param props.label the sentence template with an {n} slot for the sealed count
 * @returns the sealed-count sentence and cinnabar progress bar
 */
export const SealBar: FC<SealBarProps> = ({ codes, label }) => {
  const seals = useSeals();
  const ready = seals.ready;
  const sealed = ready ? codes.filter((code) => seals.has(code)).length : 0;
  const percent = codes.length > 0 ? Math.round((PERCENT_SCALE * sealed) / codes.length) : 0;
  const [before = '', after = ''] = label.split('{n}');
  const fill = { width: `${percent}%` };

  return (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-base">
      <span>
        {before}
        <b>{sealed}</b>
        {after}
      </span>
      <span
        aria-hidden="true"
        className="
          relative h-1.5 w-[220px] max-w-full
          shadow-[inset_0_0_0_1px_var(--color-ink)]
        ">
        <span className="absolute inset-y-0 left-0 bg-(--color-cinnabar)" style={fill} />
      </span>
    </div>
  );
};
