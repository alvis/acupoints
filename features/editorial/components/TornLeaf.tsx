import { TORN_LEAF_MARKS } from './tornLeafMarks';

import type { FC } from 'react';

/** Props for {@link TornLeaf}. */
export type TornLeafProps = {
  /** Accessible description of the figure in the page language. */
  label: string;
  className?: string;
};

const TEAR =
  'L306 40 L324 62 L301 92 L316 118 L297 150 L319 176 L303 204 L327 232 L309 262 L331 290 L313 318 L335 348 L317 380 L339 412';
const KEEP = `M0 0 L318 0 ${TEAR} L328 440 L0 440 Z`;
const SCRAP =
  'M470 300 L506 292 L530 306 L566 298 L570 420 L540 412 L512 424 L484 410 L462 418 L474 380 L458 352 Z';

/**
 * The 404 figure: a woodblock leaf torn down its fish-tail centre strip. The
 * left half survives with its columns and seal; the right half is a dashed
 * outline marked 闕 (missing), with one scrap lying where it fell. Pure SVG
 * with fixed ids, so it renders inside the locale layout and in the
 * chrome-less global 404 alike (one figure per page).
 * @param props the torn-leaf illustration.
 * @param props.label accessible text
 * @param props.className additional presentation classes
 */
export const TornLeaf: FC<TornLeafProps> = ({ label, className }) => (
  <svg aria-label={label} className={className} role="img" viewBox="0 0 600 450">
    <title>{label}</title>
    <defs>
      <filter id="torn-leaf-cut">
        <feTurbulence baseFrequency="0.09" numOctaves="2" seed="5" type="fractalNoise" />
        <feDisplacementMap in="SourceGraphic" scale="2.6" />
      </filter>
      <clipPath id="torn-leaf-keep">
        <path d={KEEP} />
      </clipPath>
      <clipPath id="torn-leaf-scrap">
        <path d={SCRAP} />
      </clipPath>
      <g filter="url(#torn-leaf-cut)" id="torn-leaf-face">
        <rect fill="var(--color-paper-raised)" height="400" width="540" x="30" y="20" />
        <rect
          fill="none"
          height="386"
          stroke="var(--color-ink)"
          strokeWidth="5"
          width="526"
          x="37"
          y="27"
        />
        <rect
          fill="none"
          height="372"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          width="512"
          x="44"
          y="34"
        />
        <path d="M288 34 V406 M312 34 V406" stroke="var(--color-ink)" strokeWidth="1.5" />
        <rect fill="var(--color-ink)" height="24" width="8" x="296" y="40" />
        <path
          d="M288 78 H312 V98 L300 90 L288 98 Z M288 362 H312 V342 L300 350 L288 342 Z"
          fill="var(--color-ink)"
        />
        <path d="M300 108 V330" stroke="var(--color-ink)" strokeDasharray="3 5" strokeWidth="1" />
        <path
          d={TORN_LEAF_MARKS}
          fill="none"
          stroke="var(--color-ink)"
          strokeLinecap="square"
          strokeWidth="2.1"
        />
        <rect fill="var(--color-cinnabar)" height="28" width="28" x="236" y="352" />
        <rect
          fill="none"
          height="21"
          stroke="var(--color-paper-raised)"
          strokeWidth="1.2"
          width="21"
          x="239.5"
          y="355.5"
        />
      </g>
    </defs>
    <path
      d="M318 20 H570 V420 H330"
      fill="none"
      stroke="var(--color-ink-micro)"
      strokeDasharray="7 6"
      strokeWidth="1.5"
    />
    <text
      fill="none"
      fontFamily="var(--font-han), serif"
      fontSize="128"
      fontWeight="900"
      stroke="var(--color-cinnabar)"
      strokeWidth="2"
      textAnchor="middle"
      x="446"
      y="232">
      闕
    </text>
    <text
      fill="var(--color-seal)"
      fontFamily="var(--font-mono), monospace"
      fontSize="13"
      letterSpacing="3"
      textAnchor="middle"
      x="446"
      y="278">
      LEAF 404
    </text>
    <use clipPath="url(#torn-leaf-keep)" href="#torn-leaf-face" />
    <path
      d={`M${TEAR.slice(1)}`}
      fill="none"
      stroke="var(--color-ink)"
      strokeLinejoin="bevel"
      strokeWidth="2.2"
    />
    <g transform="translate(-34 8) rotate(11 514 360)">
      <use clipPath="url(#torn-leaf-scrap)" href="#torn-leaf-face" />
      <path
        d={SCRAP}
        fill="none"
        stroke="var(--color-ink)"
        strokeLinejoin="bevel"
        strokeWidth="1.6"
      />
    </g>
  </svg>
);
