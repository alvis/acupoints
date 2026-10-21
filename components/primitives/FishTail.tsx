import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** fish-tail design dimensions and stroke weight. */
const LAYOUT_DIMENSIONS = {
  DEFAULT_WIDTH: 40,
  DESIGN_HEIGHT: 22,
  DESIGN_WIDTH: 40,
} as const;

/** Props for {@link FishTail}. */
export type FishTailProps = {
  /** Point the tail upward (the lower fish tail of a strip). */
  up?: boolean;
  width?: number;
  className?: string;
};

/**
 * Fish-tail (魚尾) mark from the centre strip of a printed leaf.
 * @param props the decorative fish-tail mark.
 * @param props.up whether the fish-tail tip points upward.
 * @param props.width horizontal extent in pixels.
 * @param props.className additional wrapper classes.
 */
export const FishTail: FC<FishTailProps> = ({
  up = false,
  width = LAYOUT_DIMENSIONS.DEFAULT_WIDTH,
  className,
}) => {
  const d = up ? 'M0 22 H40 V0 L20 10 L0 0 Z' : 'M0 0 H40 V22 L20 12 L0 22 Z';

  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      height={Math.round(
        (width * LAYOUT_DIMENSIONS.DESIGN_HEIGHT) / LAYOUT_DIMENSIONS.DESIGN_WIDTH,
      )}
      viewBox="0 0 40 22"
      width={width}>
      <path d={d} fill="var(--color-ink)" />
    </svg>
  );
};
