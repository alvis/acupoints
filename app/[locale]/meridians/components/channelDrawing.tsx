import type { ReactNode } from 'react';

import type { FigureView } from '@/content/illustrations';

import type { ChartChannel } from './ChannelChart';

const MIRROR = 'translate(300,0) scale(-1,1)';

/**
 * draws the channel course on one body view
 * @param channel the channel with its classical names and ordered points
 * @param view the front or back side of the figure
 * @returns the course paths and their bilateral mirrors, or null when absent
 */
export function coursePaths(channel: ChartChannel, view: FigureView): ReactNode {
  const stretches = channel.course.filter((stretch) => stretch.view === view);
  if (stretches.length === 0) {
    return null;
  }

  return (
    <g key={channel.slug}>
      {stretches.map((stretch) => (
        <g key={stretch.d}>
          <path d={stretch.d} />
          {channel.mirror ? <path d={stretch.d} transform={MIRROR} /> : null}
        </g>
      ))}
    </g>
  );
}

/**
 * the first point as a filled cinnabar dot, the last as a ring.
 * @param channel the channel with its classical names and ordered points
 * @param view the front or back side of the figure
 * @returns the first-point disc and last-point ring on the requested view
 */
export function endDots(channel: ChartChannel, view: FigureView): ReactNode {
  const { start, end } = channel;

  return (
    <g>
      {end?.view === view ? (
        <circle
          cx={end.x}
          cy={end.y}
          fill="var(--color-paper)"
          r="5"
          stroke="var(--color-cinnabar)"
          strokeWidth="2.4"
        />
      ) : null}
      {start?.view === view ? (
        <circle
          cx={start.x}
          cy={start.y}
          fill="var(--color-cinnabar)"
          r="5"
          stroke="var(--color-paper)"
          strokeWidth="1.5"
        />
      ) : null}
    </g>
  );
}
