import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

const MAJOR_TICK_INTERVAL = 4;
const PHASE_COUNT = 5;
const GLYPH_BASELINE_OFFSET = 9;
const TICK_COUNT = 32;
const PHASE_RADIUS = 96;
const MAJOR_INNER_RADIUS = 137;
const MINOR_INNER_RADIUS = 139;
const MINOR_OUTER_RADIUS = 144;
const MAJOR_OUTER_RADIUS = 147;
const CENTER = 150;
const MAJOR_TICK_WIDTH = 2.2;
const MINOR_TICK_WIDTH = 1.2;

/** Props for {@link BasicsEmblem}. */
export type BasicsEmblemProps = {
  /** Which basic the emblem heads: `what-is-qi`, `yin-and-yang` or `five-elements`. */
  slug: string;
  /** Accessible description of the figure. */
  label: string;
  /** 氣 or 气, in the page's script; drawn by the qi emblem. */
  qiGlyph: string;
  className?: string;
};

const INK = 'var(--color-ink)';
const PAPER = 'var(--color-paper)';
const CINNABAR = 'var(--color-cinnabar)';
const HAN = 'var(--font-han), serif';
const CUT = `url(#${CUT_FILTER})`;

/** The five phases, wood first, in generating order; the same glyphs in both scripts. */
const PHASES = ['木', '火', '土', '金', '水'] as const;

const RING_TICKS = Array.from({ length: TICK_COUNT }, (_, k) => {
  const a = (k * Math.PI * 2) / TICK_COUNT;
  const major = k % MAJOR_TICK_INTERVAL === 0;
  const [inner, outer] = major
    ? [MAJOR_INNER_RADIUS, MAJOR_OUTER_RADIUS]
    : [MINOR_INNER_RADIUS, MINOR_OUTER_RADIUS];

  return {
    k,
    width: major ? MAJOR_TICK_WIDTH : MINOR_TICK_WIDTH,
    x1: (CENTER + inner * Math.sin(a)).toFixed(1),
    y1: (CENTER - inner * Math.cos(a)).toFixed(1),
    x2: (CENTER + outer * Math.sin(a)).toFixed(1),
    y2: (CENTER - outer * Math.cos(a)).toFixed(1),
  };
});

const PHASE_POSITIONS = PHASES.map((glyph, k) => {
  const a = (k * Math.PI * 2) / PHASE_COUNT;

  return { glyph, x: CENTER + PHASE_RADIUS * Math.sin(a), y: CENTER - PHASE_RADIUS * Math.cos(a) };
});

const PHASE_RING = PHASE_POSITIONS.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

/**
 * The carved emblem beside a basics article, as the Basics board draws it:
 * the yin-yang circle, the qi ring, or the five phases on a ring. Every
 * emblem sits inside the same 32-tick ring and the layout's cut filter.
 * @param props carved emblem for the selected basics topic
 * @param props.slug entry URL segment
 * @param props.label accessible name for the illustration
 * @param props.qiGlyph Han character for qi at the center of its emblem
 * @param props.className additional presentation classes
 * @returns the carved emblem for the selected basics topic
 */
export const BasicsEmblem: FC<BasicsEmblemProps> = ({ slug, label, qiGlyph, className }) => (
  <svg aria-label={label} className={className} role="img" viewBox="0 0 300 300">
    <title>{label}</title>
    <g fill="none" filter={CUT} stroke={INK} strokeLinecap="round">
      <circle cx="150" cy="150" r="133" strokeWidth="1.5" />
      {RING_TICKS.map((t) => (
        <line key={t.k} strokeWidth={t.width} x1={t.x1} x2={t.x2} y1={t.y1} y2={t.y2} />
      ))}
    </g>
    {slug === 'yin-and-yang' ? (
      <YinYang />
    ) : slug === 'five-elements' ? (
      <FivePhases />
    ) : (
      <Qi glyph={qiGlyph} />
    )}
  </svg>
);

const YinYang: FC = () => (
  <g filter={CUT} stroke={INK} strokeLinecap="round">
    <circle cx="150" cy="150" fill={PAPER} r="121" strokeWidth="5" />
    <path
      d="M150 32 A118 118 0 0 1 150 268 A59 59 0 0 1 150 150 A59 59 0 0 0 150 32 Z"
      fill={INK}
      strokeWidth="1"
    />
    <path d="M150 46 A104 104 0 0 0 150 254" fill="none" strokeDasharray="14 5" strokeWidth="1" />
    <path
      d="M150 46 A104 104 0 0 1 150 254"
      fill="none"
      stroke={PAPER}
      strokeDasharray="14 5"
      strokeWidth="1"
    />
    <circle cx="150" cy="91" fill={INK} r="16" strokeWidth="1" />
    <circle cx="150" cy="209" fill={CINNABAR} r="16" stroke={PAPER} strokeWidth="2" />
  </g>
);

type QiProps = {
  glyph: string;
};

const Qi: FC<QiProps> = ({ glyph }) => (
  <>
    <g fill="none" filter={CUT} stroke={INK}>
      <circle cx="150" cy="150" r="121" strokeWidth="5" />
      <circle cx="150" cy="150" r="104" strokeDasharray="14 5" strokeWidth="1" />
    </g>
    <text
      fill={INK}
      filter={CUT}
      fontFamily={HAN}
      fontSize="120"
      fontWeight="900"
      textAnchor="middle"
      x="150"
      y="190">
      {glyph}
    </text>
    <circle cx="150" cy="44" fill={CINNABAR} r="9" />
  </>
);

const FivePhases: FC = () => (
  <>
    <g fill="none" filter={CUT} stroke={INK} strokeLinecap="round">
      <circle cx="150" cy="150" r="96" strokeWidth="4" />
      <polygon points={PHASE_RING} strokeDasharray="4 5" strokeWidth="1.2" />
    </g>
    {PHASE_POSITIONS.map((p) => (
      <g key={p.glyph}>
        <circle cx={p.x} cy={p.y} fill={CINNABAR} r="27" />
        <circle cx={p.x} cy={p.y} fill="none" r="21" stroke={PAPER} strokeWidth="1.5" />
        <text
          fill={PAPER}
          fontFamily={HAN}
          fontSize="25"
          fontWeight="900"
          textAnchor="middle"
          x={p.x}
          y={p.y + GLYPH_BASELINE_OFFSET}>
          {p.glyph}
        </text>
      </g>
    ))}
  </>
);
