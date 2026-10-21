import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

const CUBIC_DEGREE = 3;
const HATCH_SPACING = 7;
const CREST_Y = 30;
const HATCH_CEILING = 136;
const GROUND_Y = 140;
const CREST_X = 260;
const HATCH_START = 266;
const SHOULDER_X = 320;
const SAMPLE_INTERVALS = 400;
const SAMPLE_COUNT = 401;
const HATCH_END = 496;
const FOOT_X = 500;

/** Props for {@link HillFigure}. */
export type HillFigureProps = {
  /** Accessible description of the figure. */
  label: string;
  /** 陽, drawn on the sunlit face. */
  yang: string;
  /** 陰, drawn on the hatched slope. */
  yin: string;
  className?: string;
};

const INK = 'var(--color-ink)';
const PAPER = 'var(--color-paper)';
const CINNABAR = 'var(--color-cinnabar)';
const HAN = 'var(--font-han), serif';
const CUT = `url(#${CUT_FILTER})`;

const HILL_HATCH = buildHillHatch();

/**
 * The yin-and-yang band's hill, as the Basics board draws it: the sun on
 * the left, the sunlit face marked yang and the hatched slope marked yin.
 * @param props sunlit and shaded slopes labeled yang and yin
 * @param props.label accessible name for the illustration
 * @param props.yang label on the sunlit slope
 * @param props.yin label on the shaded slope
 * @param props.className additional presentation classes
 * @returns the sunlit and shaded slopes labeled yang and yin
 */
export const HillFigure: FC<HillFigureProps> = ({ label, yang, yin, className }) => (
  <svg aria-label={label} className={className} role="img" viewBox="0 0 520 160">
    <title>{label}</title>
    <g fill="none" filter={CUT} stroke={INK} strokeLinecap="round">
      <path d={HILL_HATCH} strokeWidth="1.3" />
      <path d="M20 140 C120 140 200 30 260 30 C320 30 400 140 500 140" strokeWidth="3.4" />
      <path d="M8 146 H512" strokeWidth="2.5" />
      <path d="M30 153 H490" strokeWidth="1" />
      <path
        d="M90 16 V6 M90 72 V82 M62 44 H52 M118 44 H128 M70 24 L63 17 M110 24 L117 17 M70 64 L63 71 M110 64 L117 71"
        stroke={CINNABAR}
        strokeWidth="2.4"
      />
    </g>
    <circle cx="90" cy="44" fill={CINNABAR} r="17" />
    <text
      fill={INK}
      fontFamily={HAN}
      fontSize="30"
      fontWeight="900"
      textAnchor="middle"
      x="186"
      y="104">
      {yang}
    </text>
    <rect fill={PAPER} height="44" width="44" x="398" y="34" />
    <text
      fill={INK}
      fontFamily={HAN}
      fontSize="30"
      fontWeight="900"
      textAnchor="middle"
      x="420"
      y="67">
      {yin}
    </text>
  </svg>
);

/**
 * Hatch lines under the shaded slope, sampled from the hill's right-hand curve.
 * @returns SVG path commands for the shaded slope hatch lines
 */
function buildHillHatch(): string {
  const xs = [CREST_X, SHOULDER_X, SAMPLE_INTERVALS, FOOT_X] as const;
  const ys = [CREST_Y, CREST_Y, GROUND_Y, GROUND_Y] as const;
  const bezier = (p: readonly [number, number, number, number], t: number): number => {
    const u = 1 - t;

    return (
      u ** CUBIC_DEGREE * p[0] +
      CUBIC_DEGREE * u * u * t * p[1] +
      CUBIC_DEGREE * u * t * t * p[2] +
      t ** CUBIC_DEGREE * p[CUBIC_DEGREE]
    );
  };
  const samples = Array.from({ length: SAMPLE_COUNT }, (_, j) => ({
    x: bezier(xs, j / SAMPLE_INTERVALS),
    y: bezier(ys, j / SAMPLE_INTERVALS),
  }));
  const lines: string[] = [];
  for (let x = HATCH_START; x < HATCH_END; x += HATCH_SPACING) {
    const nearest = samples.reduce(
      (best, s) => (Math.abs(s.x - x) < Math.abs(best.x - x) ? s : best),
      samples[0],
    );
    if (nearest.y < HATCH_CEILING) {
      lines.push(`M${x} ${(nearest.y + CUBIC_DEGREE).toFixed(1)} V138`);
    }
  }

  return lines.join(' ');
}
