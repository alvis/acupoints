import { cn } from '@/utilities/cn';

import type { FC } from 'react';

const PERCENT_SCALE = 100;

/** Props for {@link InkBar}. */
export type InkBarProps = {
  /** Filled share, 0–100. */
  percent: number;
  className?: string;
};

/**
 * Ruled progress bar with a cinnabar fill, drawn as SVG so the fill width is
 * an attribute rather than an inline style. Decorative: the count beside it
 * carries the meaning.
 * @param props fill percentage and optional SVG styling
 * @param props.percent fill percentage, clamped between zero and one hundred
 * @param props.className additional wrapper classes
 */
export const InkBar: FC<InkBarProps> = ({ percent, className }) => (
  <svg
    aria-hidden="true"
    className={cn('block', className)}
    focusable="false"
    preserveAspectRatio="none"
    viewBox="0 0 100 4">
    <rect
      fill="var(--color-cinnabar)"
      height="4"
      width={Math.max(0, Math.min(PERCENT_SCALE, percent))}
    />
    <rect
      fill="none"
      height="3"
      stroke="var(--color-ink)"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
      width="99"
      x="0.5"
      y="0.5"
    />
  </svg>
);
