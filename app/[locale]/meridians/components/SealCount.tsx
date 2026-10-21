'use client';

import { useSeals } from '@/components/headless/useSeals';

import type { FC } from 'react';

/** Props for {@link SealCount}. */
export type SealCountProps = {
  codes: readonly string[];
  /** Sentence with an `{n}` slot, e.g. "{n} of 20 sealed". */
  label: string;
  className?: string;
};

/**
 * How many of `codes` this browser has sealed, as a short sentence.
 * @param props the point codes and count label
 * @param props.codes the point codes whose browser seals are counted
 * @param props.label the sentence template with an {n} slot for the sealed count
 * @param props.className additional classes for the seal count
 * @returns the label with the number of sealed point codes
 */
export const SealCount: FC<SealCountProps> = ({ codes, label, className }) => {
  const seals = useSeals();
  const { ready } = seals;
  const sealed = ready ? codes.filter((code) => seals.has(code)).length : 0;

  return <span className={className}>{label.replace('{n}', String(sealed))}</span>;
};
