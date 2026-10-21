import { CarvedBody } from '@/components/primitives/CarvedBody';
import { channelCourse, channelFigure, figurePoint } from '@/content/illustrations';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { FigurePoint } from '@/content/illustrations';

/** body-view bounds, point mark sizes, and crop proportions. */
const LAYOUT_DIMENSIONS = {
  FULL_RING_STROKE_WIDTH: 1.5,
  GLYPH_BASELINE_OFFSET: 0.88,
} as const;

/** A Han name printed down beside its point. */
export type FigureName = { code: string; text: string };

/** Props for {@link PointFigure}. */
export type PointFigureProps = {
  /** The point marked in cinnabar. */
  code: string;
  /** Accessible description of the plate. */
  label: string;
  /** Slug of the channel whose course and points are cut in beside the point. */
  channel?: string;
  /** Han names printed down beside their points, as the boards label the figure. */
  names?: readonly FigureName[];
  /** Crop to the part of the body around the point instead of the whole figure. */
  crop?: boolean;
  className?: string;
};

/** The whole figure's box, and the window a cropped plate shows. */
const FULL = { x: 0, y: 0, width: 300, height: 640 } as const;
const CROP = { width: 140, height: 180 } as const;

/** Mark sizes for the whole figure and for a crop, which draws them about twice as large. */
const SIZES = {
  full: { body: 3.2, dot: 3.2, mark: 6.5, ring: 12, name: 17, gap: 24 },
  crop: { body: 2.2, dot: 2.2, mark: 4.5, ring: 8.5, name: 11, gap: 15 },
} as const;

/**
 * Any point on the carved standing figure, as the boards draw it: the figure
 * (front or back, wherever the point lies), the channel's course cut in ink
 * with its points as small cinnabar dots, and the point itself as a larger
 * disc with a ring. Positions come from the whole-figure table, so every one
 * of the 361 points resolves.
 * @param props the body drawing and point annotations.
 * @param props.code catalogue point identifier.
 * @param props.label accessible or displayed reading.
 * @param props.channel channel route identifier.
 * @param props.names point names to annotate.
 * @param props.crop crop to the part of the body around the point instead of the whole figure.
 * @param props.className additional wrapper classes.
 * @returns the carved body figure with the channel course and selected point.
 */
export const PointFigure: FC<PointFigureProps> = ({
  code,
  label,
  channel,
  names = [],
  crop = false,
  className,
}) => {
  const point = figurePoint(code);
  if (!point) {
    return null;
  }
  const size = crop ? SIZES.crop : SIZES.full;
  const box = crop ? cropAround(point) : FULL;
  const course = channel
    ? channelCourse(channel)
        .filter((stretch) => stretch.view === point.view)
        .map((stretch) => stretch.d)
        .join(' ')
    : undefined;
  const dots = channel
    ? channelFigure(channel).filter((p) => p.view === point.view && p.code !== point.code)
    : [];
  const placed = names.flatMap((name) => {
    const at = figurePoint(name.code);

    return at?.view === point.view ? [{ ...name, at }] : [];
  });

  return (
    <svg
      aria-label={label}
      className={cn('h-auto w-full', className)}
      data-point={point.code}
      role="img"
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}>
      <CarvedBody
        back={point.view === 'back'}
        channel={course === '' ? undefined : course}
        strokeWidth={size.body}
      />
      {dots.map((p) => (
        <circle cx={p.x} cy={p.y} fill="var(--color-cinnabar)" key={p.code} r={size.dot} />
      ))}
      <circle cx={point.x} cy={point.y} fill="var(--color-cinnabar)" r={size.mark} />
      <circle
        cx={point.x}
        cy={point.y}
        fill="none"
        r={size.ring}
        stroke="var(--color-cinnabar)"
        strokeWidth={crop ? 1 : LAYOUT_DIMENSIONS.FULL_RING_STROKE_WIDTH}
      />
      {placed.map(({ code: key, text, at }) => (
        <DownName at={at} box={box} gap={size.gap} key={key} size={size.name} text={text} />
      ))}
    </svg>
  );
};

type DownNameProps = {
  text: string;
  at: FigurePoint;
  box: { x: number; y: number; width: number; height: number };
  size: number;
  gap: number;
};

/**
 * A name set top to bottom beside its point: left of it, or right where the left edge is too near.
 * @param props the vertical point-name annotation.
 * @param props.text the point name written from top to bottom.
 * @param props.at annotation anchor.
 * @param props.box visible coordinate window.
 * @param props.size the annotation font size in SVG units.
 * @param props.gap spacing from the point mark.
 */
const DownName: FC<DownNameProps> = ({ text, at, box, size, gap }) => {
  const glyphs = [...text];
  const left = at.x - gap - box.x > size;
  const x = left ? at.x - gap : at.x + gap;
  const top = Math.min(
    Math.max(at.y - (glyphs.length * size) / 2, box.y + 2),
    box.y + box.height - glyphs.length * size - 2,
  );

  return (
    <g
      fill="var(--color-ink)"
      fontFamily="var(--font-cjk)"
      fontSize={size}
      fontWeight="700"
      textAnchor="middle">
      {glyphs.map((glyph, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: a name may repeat a glyph; its position is its identity
        <text key={i} x={x} y={top + (i + LAYOUT_DIMENSIONS.GLYPH_BASELINE_OFFSET) * size}>
          {glyph}
        </text>
      ))}
    </g>
  );
};

/**
 * The crop window around a point, kept inside the figure.
 * @param point the point coordinates and body view to frame.
 * @returns the bounded SVG window centered around the point.
 */
function cropAround(point: FigurePoint): { x: number; y: number; width: number; height: number } {
  return {
    x: clamp(point.x - CROP.width / 2, 0, FULL.width - CROP.width),
    y: clamp(point.y - CROP.height / 2, 0, FULL.height - CROP.height),
    ...CROP,
  };
}

/**
 * keep a coordinate inside the inclusive bounds.
 * @param value the coordinate to constrain.
 * @param min inclusive lower bound.
 * @param max the maximum permitted line length in characters.
 * @returns the coordinate limited to the inclusive bounds.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
