import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** seal face dimensions and inscription positions. */
const LAYOUT_DIMENSIONS = {
  DEFAULT_SIZE: 40,
} as const;

/** Props for {@link Seal}. */
export type SealProps = {
  /** Rendered width and height in px. */
  size?: number;
  /** Upper character. */
  top?: string;
  /** Lower character. */
  bottom?: string;
  /** Accessible label; omit for a decorative seal. */
  label?: string;
  className?: string;
};

/**
 * Square cinnabar seal with two stacked characters in paper (白文 style).
 * Decorative unless a label is passed.
 * @param props the square cinnabar seal.
 * @param props.size rendered width and height in px.
 * @param props.top the upper seal inscription.
 * @param props.bottom lower stamp reading.
 * @param props.label accessible or displayed reading.
 * @param props.className additional wrapper classes.
 */
export const Seal: FC<SealProps> = ({
  size = LAYOUT_DIMENSIONS.DEFAULT_SIZE,
  top = '經',
  bottom = '穴',
  label,
  className,
}) => {
  const face = (
    <>
      <rect fill="var(--color-cinnabar)" height="38" rx="3" width="38" x="1" y="1" />
      <rect
        fill="none"
        height="31"
        stroke="var(--color-paper)"
        strokeWidth="1.5"
        width="31"
        x="4.5"
        y="4.5"
      />
      <SealGlyph y={18.6}>{top}</SealGlyph>
      <SealGlyph y={32.4}>{bottom}</SealGlyph>
    </>
  );
  if (!label) {
    return (
      <svg
        aria-hidden="true"
        className={cn('shrink-0', className)}
        height={size}
        viewBox="0 0 40 40"
        width={size}>
        {face}
      </svg>
    );
  }

  return (
    <svg
      aria-label={label}
      className={cn('shrink-0', className)}
      height={size}
      role="img"
      viewBox="0 0 40 40"
      width={size}>
      <title>{label}</title>
      {face}
    </svg>
  );
};

type SealGlyphProps = PropsWithChildren<{ y: number }>;

const SealGlyph: FC<SealGlyphProps> = ({ y, children }) => {
  return (
    <text
      fill="var(--color-paper)"
      fontFamily="var(--font-han), serif"
      fontSize="12.5"
      fontWeight="900"
      textAnchor="middle"
      x="20"
      y={y}>
      {children}
    </text>
  );
};
