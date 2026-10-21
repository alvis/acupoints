'use client';

import { useSeals } from '@/components/headless/useSeals';

import type { FC } from 'react';

/** Props for {@link LiveSealCount}. */
export type LiveSealCountProps = {
  /** Text with `{n}` where the live count goes. */
  template: string;
};

/**
 * Live "n of 361" text from this browser's seals; `{n}` in the template is replaced.
 * @param props the live sealed-leaf count.
 * @param props.template text with `{n}` where the live count goes.
 * @returns the template with the browser's sealed-leaf count inserted.
 */
export const LiveSealCount: FC<LiveSealCountProps> = ({ template }) => {
  const { codes, ready } = useSeals();

  return <>{template.replace('{n}', String(ready ? codes.length : 0))}</>;
};
