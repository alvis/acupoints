import { cn } from '@/utilities/cn';

import type { CSSProperties, FC } from 'react';

/** stamp inscriptions, face size, tilt, and border style. */
interface StampStyleParams {
  top: string;
  size: number;
  rotate: number;
  round: boolean;
  solid: boolean;
}

/** stamp face proportions and border weights. */
const LAYOUT_DIMENSIONS = {
  DEFAULT_SIZE: 56,
  MULTI_GLYPH_SIZE_RATIO: 0.3,
  SINGLE_GLYPH_SIZE_RATIO: 0.4,
  CORNER_RADIUS: 4,
  BORDER_SIZE_RATIO: 0.05,
} as const;

/** Props for {@link Stamp}. */
export type StampProps = {
  /** Upper line of the stamp face. */
  top: string;
  /** Lower line of the stamp face. */
  bottom: string;
  /** Accessible reading of the stamp. */
  label: string;
  /** 白文 (paper on cinnabar) when true, 朱文 (cinnabar outline) otherwise. */
  solid?: boolean;
  round?: boolean;
  /** Tilt in degrees, as a hand-pressed stamp sits. */
  rotate?: number;
  size?: number;
  className?: string;
};

/**
 * Hand-pressed stamp with a slight tilt, used under footer columns and on seal pages.
 * @param props the tilted printed stamp.
 * @param props.top the upper seal inscription.
 * @param props.bottom lower stamp reading.
 * @param props.label accessible or displayed reading.
 * @param props.solid whether the face uses reversed ink.
 * @param props.round whether the face uses a circular border.
 * @param props.rotate tilt angle in degrees.
 * @param props.size mark extent in pixels.
 * @param props.className additional wrapper classes.
 */
export const Stamp: FC<StampProps> = ({
  top,
  bottom,
  label,
  solid = false,
  round = false,
  rotate = 0,
  size = LAYOUT_DIMENSIONS.DEFAULT_SIZE,
  className,
}) => {
  return (
    <span
      aria-label={label}
      className={cn(
        `tc inline-flex shrink-0 flex-col items-center justify-center`,
        className,
      )}
      role="img"
      style={stampStyle({ top, size, rotate, round, solid })}>
      <span aria-hidden="true">{top}</span>
      <span aria-hidden="true">{bottom}</span>
    </span>
  );
};

/**
 * Face geometry for {@link Stamp}; sizes scale with the stamp, so they cannot be static classes.
 * @param props the stamp face geometry.
 * @param props.top the upper seal inscription.
 * @param props.size mark extent in pixels.
 * @param props.rotate tilt angle in degrees.
 * @param props.round whether the face uses a circular border.
 * @param props.solid whether the face uses reversed ink.
 * @returns the stamp dimensions, border, tilt, colors, and scaled type size.
 */
function stampStyle({ top, size, rotate, round, solid }: StampStyleParams): CSSProperties {
  return {
    width: size,
    height: size,
    fontSize: Math.round(
      size *
        (top.length > 1
          ? LAYOUT_DIMENSIONS.MULTI_GLYPH_SIZE_RATIO
          : LAYOUT_DIMENSIONS.SINGLE_GLYPH_SIZE_RATIO),
    ),
    fontWeight: 900,
    lineHeight: 1.05,
    opacity: 0.94,
    transform: `rotate(${rotate}deg)`,
    borderRadius: round ? '50%' : LAYOUT_DIMENSIONS.CORNER_RADIUS,
    ...(solid
      ? { background: 'var(--color-cinnabar)', color: '#f3ead3' }
      : {
          color: 'var(--color-cinnabar)',
          boxShadow: `inset 0 0 0 ${Math.max(2, Math.round(size * LAYOUT_DIMENSIONS.BORDER_SIZE_RATIO))}px var(--color-cinnabar)`,
        }),
  };
}
