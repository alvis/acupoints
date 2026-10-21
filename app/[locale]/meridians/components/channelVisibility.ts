import type { FigureView } from '@/content/illustrations';

import type { ChartChannel } from './ChannelChart';

/**
 * checks whether a channel has a course or starting point
 * @param channel the channel with its classical names and ordered points
 * @returns whether the channel has marks to draw
 */
export function drawn(channel: ChartChannel): boolean {
  return channel.course.length > 0 || channel.start !== undefined;
}

/**
 * checks whether a channel has marks on one side of the body
 * @param channel the channel with its classical names and ordered points
 * @param view the front or back side of the figure
 * @returns whether a course or endpoint lies on the requested view
 */
export function onView(channel: ChartChannel, view: FigureView): boolean {
  return (
    channel.course.some((stretch) => stretch.view === view) ||
    channel.start?.view === view ||
    channel.end?.view === view
  );
}
