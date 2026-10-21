import { Seal } from '@/components/primitives/Seal';

import type { FC } from 'react';

const DEFAULT_SEAL_SIZE = 34;

/** Props for {@link PointSeal}. */
export type PointSealProps = {
  hanzi: string;
  size?: number;
  className?: string;
};

/**
 * A point's hanzi cut as a small seal: two characters stacked, or the first
 * two over the third for three-character names. Decorative; the code beside
 * it carries the meaning.
 * @param props Han point name, drawing size, and presentation classes
 * @param props.hanzi point name used to draw the seal
 * @param props.size width and height of the seal drawing
 * @param props.className additional classes for the outer element
 */
export const PointSeal: FC<PointSealProps> = ({ hanzi, size = DEFAULT_SEAL_SIZE, className }) => {
  const chars = [...hanzi];
  const top = chars.length > 2 ? chars.slice(0, 2).join('') : (chars[0] ?? '');
  const bottom = chars.length > 2 ? chars.slice(2).join('') : (chars[1] ?? '');

  return <Seal bottom={bottom} className={className} size={size} top={top} />;
};
