'use client';

import { useSeals } from '@/components/headless/useSeals';
import { fill } from '@/features/points/format';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** Props for {@link VolumeDots}. */
export type VolumeDotsProps = {
  /** Every code in the volume, in order. */
  codes: readonly string[];
  /** The leaf being read. */
  current: string;
  /** `{n}`, `{total}` and `{s}` (sealed count) template for the accessible reading. */
  template: string;
};

/**
 * One square per leaf of the volume: the current leaf enlarged and ringed,
 * sealed leaves filled cinnabar, the rest hollow.
 * @param props ordered channel codes, current point, and position template
 * @param props.codes ordered point identifiers
 * @param props.current identifier of the displayed point
 * @param props.template accessible position template with count and seal placeholders
 * @returns the sealed and current-position marks for the volume leaves
 */
export const VolumeDots: FC<VolumeDotsProps> = ({ codes, current, template }) => {
  const seals = useSeals();
  const { ready } = seals;
  const sealed = ready ? codes.filter((c) => seals.has(c)).length : 0;
  const at = codes.indexOf(current) + 1;

  return (
    <span
      aria-label={fill(template, { n: at, total: codes.length, s: sealed })}
      className="flex max-w-136 flex-wrap items-center justify-center gap-[5px]"
      role="img">
      {codes.map((c) =>
        c === current ? (
          <span
            className="
              size-3.5 bg-(--color-cinnabar)
              shadow-[0_0_0_2px_var(--color-paper),0_0_0_3.5px_var(--color-cinnabar)]
            "
            key={c}
          />
        ) : (
          <span
            className={cn(
              'size-[9px]',
              ready && seals.has(c)
                ? 'bg-(--color-cinnabar)'
                : 'shadow-[inset_0_0_0_1px_var(--color-ink)]',
            )}
            key={c}
          />
        ),
      )}
    </span>
  );
};
