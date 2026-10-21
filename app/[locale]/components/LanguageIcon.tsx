import type { FC } from 'react';

const DEFAULT_ICON_SIZE = 22;

/** Props for {@link LanguageIcon}. */
export type LanguageIconProps = {
  size?: number;
};

/**
 * 文A: one icon both scripts read as "language".
 * @param props dimensions of the bilingual language glyph
 * @param props.size icon width and height in pixels
 */
export const LanguageIcon: FC<LanguageIconProps> = ({ size = DEFAULT_ICON_SIZE }) => {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 26 26" width={size}>
      <rect
        fill="none"
        height="24"
        stroke="currentColor"
        strokeWidth="1.6"
        width="24"
        x="1"
        y="1"
      />
      <text
        fill="currentColor"
        fontFamily="var(--font-han), serif"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        x="8"
        y="17">
        文
      </text>
      <text
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        x="18.5"
        y="19">
        A
      </text>
    </svg>
  );
};
