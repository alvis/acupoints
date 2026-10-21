import { handBackPoint } from '@/content/illustrations';
import { cn } from '@/utilities/cn';

import { HandBackPlate } from './HandBackPlate';
import { PointFigure } from './PointFigure';

import type { FC } from 'react';

/** Props for {@link PointDetail}. */
export type PointDetailProps = {
  code: string;
  /** Accessible description of the plate. */
  label: string;
  /** Slug of the point's channel, cut in on the cropped figure. */
  channel?: string;
  className?: string;
};

/**
 * A point's close plate, as the practice board cuts it: the enlarged back of
 * the hand for a point there, otherwise the carved figure cropped to the part
 * of the body around the point. Both share the crop's 7:9 frame.
 * @param props the point close-up plate.
 * @param props.code catalogue point identifier.
 * @param props.label accessible or displayed reading.
 * @param props.channel channel route identifier.
 * @param props.className additional wrapper classes.
 */
export const PointDetail: FC<PointDetailProps> = ({ code, label, channel, className }) =>
  handBackPoint(code) ? (
    // the hand is set in the crop's proportions, so plates side by side line up
    <HandBackPlate className={cn('aspect-7/9', className)} code={code} label={label} />
  ) : (
    <PointFigure crop channel={channel} className={className} code={code} label={label} />
  );
