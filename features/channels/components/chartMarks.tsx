import type { CSSProperties, ReactNode } from 'react';

import type { ChartPoint, PlateSize } from './PointChart';

const LABEL_SIDE_THRESHOLD = 0.78;
const LABEL_GAP = 7;
const SELECTED_RING_RADIUS = 5.4;
const SELECTED_RADIUS = 3;
const LABEL_FONT_SIZE = 5.5;
const LABEL_STROKE_WIDTH = 1.6;
const PERCENT_SCALE = 100;

/**
 * The picked point: cinnabar disc, ring and its code beside it.
 * @param point catalog entry to describe
 * @param size drawing dimensions
 * @param mark marker scale
 * @returns the selected point disc, ring, and code label as SVG elements
 */
export function selectedMark(point: ChartPoint, size: PlateSize, mark: number): ReactNode {
  const left = size.x ?? 0;
  const top = size.y ?? 0;
  const right = point.x - left < size.width * LABEL_SIDE_THRESHOLD;
  const gap = LABEL_GAP * mark;

  return (
    <g>
      <circle
        cx={point.x}
        cy={point.y}
        fill="none"
        r={SELECTED_RING_RADIUS * mark}
        stroke="var(--color-cinnabar)"
        strokeWidth={mark}
      />
      <circle cx={point.x} cy={point.y} fill="var(--color-cinnabar)" r={SELECTED_RADIUS * mark} />
      <text
        fill="var(--color-ink)"
        fontFamily="var(--font-mono)"
        fontSize={LABEL_FONT_SIZE * mark}
        fontWeight="500"
        paintOrder="stroke"
        stroke="var(--color-paper)"
        strokeWidth={LABEL_STROKE_WIDTH * mark}
        textAnchor={right ? 'start' : 'end'}
        x={right ? point.x + gap : point.x - gap}
        y={Math.max(point.y - SELECTED_RADIUS * mark, top + gap)}>
        {point.code}
      </text>
    </g>
  );
}

/**
 * places an overlay button in the drawing's coordinate space
 * @param point catalog entry to describe
 * @param size drawing dimensions
 * @returns percentage offsets for the overlay button
 */
export function markPosition(point: ChartPoint, size: PlateSize): CSSProperties {
  return {
    left: `${((point.x - (size.x ?? 0)) / size.width) * PERCENT_SCALE}%`,
    top: `${((point.y - (size.y ?? 0)) / size.height) * PERCENT_SCALE}%`,
  };
}
