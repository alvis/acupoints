'use client';

import { useSeals } from '@/components/headless/useSeals';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** Props for {@link SealedSquare}. */
export type SealedSquareProps = {
  code: string;
  /** Accessible word for the mark ("sealed"). */
  label: string;
  className?: string;
};

/**
 * Small cinnabar square shown once this browser has sealed the leaf.
 * @param props point code, accessible seal label, and optional classes
 * @param props.code catalog identifier
 * @param props.label accessible text
 * @param props.className additional presentation classes
 * @returns the seal indicator, or null before sealing
 */
export const SealedSquare: FC<SealedSquareProps> = ({ code, label, className }) => {
  const seals = useSeals();
  const ready = seals.ready;
  if (!ready || !seals.has(code)) {
    return null;
  }

  return (
    <span
      aria-label={label}
      className={cn(`inline-block size-3 shrink-0 bg-(--color-cinnabar)`, className)}
      role="img"
    />
  );
};
