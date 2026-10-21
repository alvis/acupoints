import { coursePaths, endDots } from './channelDrawing';
import { drawn, onView } from './channelVisibility';

import type { ReactNode } from 'react';

import type { FigureView } from '@/content/illustrations';

import type { ChannelChartCopy, ChartChannel } from './ChannelChart';

/** the body view, channel registry, selection state, and caption labels */
type ChannelFigureProps = {
  view: FigureView;
  body: ReactNode;
  cutFilter: string;
  showAll: boolean;
  channels: readonly ChartChannel[];
  current: ChartChannel;
  sideZh: { front: string; back: string } | undefined;
  hanLang: string;
  copy: ChannelChartCopy;
};

/**
 * draws one side of the body with channel courses
 * @param props the body view, channel registry, selection state, and caption labels
 * @returns the carved figure, highlighted course, endpoint marks, and caption
 */
export const ChannelFigure = (props: Readonly<ChannelFigureProps>): ReactNode => {
  const { view, body, cutFilter, showAll, channels, current, sideZh, hanLang, copy } = props;

  const thin = channels.filter((c) => c.slug !== current.slug);
  const figureLabel = (view: FigureView): string => {
    const parts = [view === 'front' ? copy.figFront : copy.figBack];
    if (showAll) {
      parts.push(copy.figThin);
    }
    const name = current.name;
    const other = view === 'front' ? 'back' : 'front';
    if (!drawn(current)) {
      parts.push(copy.figNone.replace('{name}', name));
    } else if (onView(current, view)) {
      parts.push(copy.figPicked.replace('{name}', name));
    } else {
      parts.push(copy.figOther.replace('{name}', name).replace('{side}', copy[other]));
    }

    return parts.join(' ');
  };

  return (
    <figure className="
      m-0 flex w-[47%] max-w-[315px] flex-col items-center gap-2.5
    ">
      <svg
        aria-label={figureLabel(view)}
        className="block h-auto w-full"
        role="img"
        viewBox="0 0 300 640">
        {body}
        <g fill="none" filter={`url(#${cutFilter})`} strokeLinecap="round" strokeLinejoin="round">
          {showAll ? (
            <g opacity="0.55" stroke="var(--color-ink-soft)" strokeWidth="1.1">
              {thin.map(async (c) => coursePaths(c, view))}
            </g>
          ) : null}
          <g stroke="var(--color-cinnabar)" strokeWidth="3.2">
            {coursePaths(current, view)}
          </g>
        </g>
        {endDots(current, view)}
      </svg>
      <figcaption className="text-[0.95rem]">
        {sideZh ? (
          <>
            <span className="tc font-bold" lang={hanLang}>
              {sideZh[view]}
            </span>{' '}
            ·{' '}
          </>
        ) : null}
        {copy[view]}
      </figcaption>
    </figure>
  );
};
