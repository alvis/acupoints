import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import type { CSSProperties, FC } from 'react';

/** disc border and type proportions. */
const LAYOUT_DIMENSIONS = {
  DEFAULT_DIAMETER: 40,
  GLYPH_SIZE_RATIO: 0.45,
} as const;

/** Props for {@link NumberDisc}. */
export type NumberDiscProps = {
  /** 1-based position, shown as a Han numeral. */
  n: number;
  size?: number;
  className?: string;
};

/**
 * Numbered cinnabar disc carrying a Han numeral (一, 二, 三 …).
 * @param props the numbered cinnabar disc.
 * @param props.n integer to display.
 * @param props.size mark extent in pixels.
 * @param props.className additional wrapper classes.
 */
export const NumberDisc: FC<NumberDiscProps> = ({
  n,
  size = LAYOUT_DIMENSIONS.DEFAULT_DIAMETER,
  className,
}) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        `
          tc grid shrink-0 place-items-center rounded-full bg-(--color-cinnabar)
          font-black text-paper
        `,
        className,
      )}
      style={discStyle(size)}>
      {hanNumeral(n)}
    </span>
  );
};

/**
 * Disc geometry for {@link NumberDisc}; it scales with `size`.
 * @param size mark extent in pixels.
 * @returns the disc dimensions and scaled type size.
 */
function discStyle(size: number): CSSProperties {
  return {
    width: size,
    height: size,
    fontSize: Math.round(size * LAYOUT_DIMENSIONS.GLYPH_SIZE_RATIO),
  };
}
