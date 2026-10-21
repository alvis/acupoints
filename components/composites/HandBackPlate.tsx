import { handBackPoint } from '@/content/illustrations';
import { cn } from '@/utilities/cn';
import { CUT_FILTER, HAND_BACK } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

/** Props for {@link HandBackPlate}. */
export type HandBackPlateProps = {
  /** The point marked in cinnabar. */
  code: string;
  /** Accessible description of the plate. */
  label: string;
  className?: string;
};

/**
 * The enlarged back of the hand the leaf board cuts beside the figure, with
 * the point marked. Renders nothing for a point the drawing cannot show
 * (anything off the back of the hand and the fingertips).
 * @param props the hand inset and selected point.
 * @param props.code catalogue point identifier.
 * @param props.label accessible or displayed reading.
 * @param props.className additional wrapper classes.
 * @returns the hand drawing with the point marked, or nothing for unsupported points.
 */
export const HandBackPlate: FC<HandBackPlateProps> = ({ code, label, className }) => {
  const point = handBackPoint(code);
  if (!point) {
    return null;
  }

  return (
    <svg
      aria-label={label}
      className={cn('h-auto w-full', className)}
      data-point={code.toUpperCase()}
      role="img"
      viewBox={HAND_BACK.viewBox}>
      <g
        fill="none"
        filter={`url(#${CUT_FILTER})`}
        stroke="var(--color-ink)"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d={HAND_BACK.outline} strokeWidth="3" />
        <path d={HAND_BACK.creases} strokeWidth="1.4" />
        <path d={HAND_BACK.bone} strokeWidth="1.2" />
      </g>
      <circle cx={point.x} cy={point.y} fill="var(--color-cinnabar)" r={8} />
      <circle
        cx={point.x}
        cy={point.y}
        fill="none"
        r={15}
        stroke="var(--color-cinnabar)"
        strokeWidth="1.6"
      />
    </svg>
  );
};
