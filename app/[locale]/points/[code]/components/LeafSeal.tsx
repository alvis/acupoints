'use client';

import { useSeals } from '@/components/headless/useSeals';
import { Seal } from '@/components/primitives/Seal';

import type { FC } from 'react';

import type { SealButtonText } from '@/features/points/labels';

/** Props for {@link LeafSeal}. */
export type LeafSealProps = {
  code: string;
  /** Two characters pressed into the seal face. */
  glyphs: readonly [string, string];
  /** `lg` on the desktop leaf (84px), `sm` in the mobile leaf-turn bar (62px). */
  size: 'lg' | 'sm';
  text: SealButtonText;
};

const SIZES = {
  lg: { px: 84, box: 'size-[84px] outline-offset-[-9px]' },
  sm: { px: 62, box: 'size-[62px] outline-offset-[-7px]' },
} as const;

/**
 * The leaf's own seal: a dashed "seal it" square until the reader stamps the
 * leaf, then the cinnabar seal of the point's name, tilted as if pressed by
 * hand. State lives in this browser only (`useSeals`).
 * @param props point identifier, stamp glyphs, size, and button labels
 * @param props.code canonical point identifier
 * @param props.glyphs characters printed on the seal
 * @param props.size seal dimensions for this placement
 * @param props.text localized interface copy
 * @returns the interactive point seal and its stamp prompt
 */
export const LeafSeal: FC<LeafSealProps> = ({ code, glyphs, size, text }) => {
  const seals = useSeals();
  const { ready } = seals;
  const sealed = ready && seals.has(code);
  const { px, box } = SIZES[size];

  return (
    <button
      aria-label={sealed ? text.unsealLabel : text.sealLabel}
      aria-pressed={sealed}
      className="
        flex cursor-pointer flex-col items-center gap-1.5 border-0
        bg-transparent p-0
      "
      type="button"
      onClick={() => seals.toggle(code)}>
      {sealed ? (
        <span className="inline-flex -rotate-6">
          <Seal bottom={glyphs[1]} size={px} top={glyphs[0]} />
        </span>
      ) : (
        <span
          className={`
            red grid
            ${box}
            -rotate-6 place-items-center bg-paper text-[0.875rem]
            shadow-[inset_0_0_0_1.5px_var(--color-seal)] outline-[1.5px]
            outline-seal outline-dashed
          `}>
          {text.cta}
        </span>
      )}
      <span aria-hidden="true" className="text-[0.8125rem] text-ink-soft">
        {sealed ? text.done : text.prompt}
      </span>
    </button>
  );
};
