import { CarvedBody } from '@/components/primitives/CarvedBody';
import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

import type { FigureView } from '@/content/illustrations';
import type { CourseSegment } from '@/utilities/illustrations/woodcut';

const MIRROR = 'translate(300,0) scale(-1,1)';

/** Props for {@link FigurePlate}. */
export type FigurePlateProps = {
  back: boolean;
  view: FigureView;
  course: readonly CourseSegment[];
  mirror: boolean;
};

/**
 * The whole carved figure with the channel's line cut in red; an SVG group for the chart plate.
 * @param props the body view and channel course to draw
 * @param props.back whether to draw the back of the carved body
 * @param props.view the front or back side of the figure
 * @param props.course the channel course stretches in figure coordinates
 * @param props.mirror whether to reflect the course across the body midline
 * @returns the carved body and channel course as SVG groups
 */
export const FigurePlate: FC<FigurePlateProps> = ({ back, view, course, mirror }) => (
  <g>
    <CarvedBody back={back} strokeWidth={2.6} />
    <g
      fill="none"
      filter={`url(#${CUT_FILTER})`}
      opacity="0.85"
      stroke="var(--color-cinnabar)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2">
      {course
        .filter((stretch) => stretch.view === view)
        .map((stretch) => (
          <g key={stretch.d}>
            <path d={stretch.d} />
            {mirror ? <path d={stretch.d} transform={MIRROR} /> : null}
          </g>
        ))}
    </g>
  </g>
);
