import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

/** Localized labels drawn into the finger-width figure. */
export type CunShortcutLabels = {
  /** Accessible description of the whole figure. */
  label: string;
  oneCun: string;
  thumb: string;
  oneHalf: string;
  twoFingers: string;
  two: string;
  three: string;
  threeCun: string;
  four: string;
  across: string;
};

/** Props for {@link CunShortcuts}. */
export type CunShortcutsProps = {
  labels: CunShortcutLabels;
  className?: string;
};

type BracketProps = {
  x0: number;
  x1: number;
  y: number;
  label: string;
  sub: string;
};

const INK = 'var(--color-ink)';
const PAPER = 'var(--color-paper)';
const CINNABAR = 'var(--color-cinnabar)';
const SEAL = 'var(--color-seal)';
const MUTED = 'var(--color-ink-soft)';

/** Four fingers (x, width, fingertip top) and the thumb, as the Glossary board draws them. */
const FINGERS = {
  index: { x: 40, w: 34, top: 84 },
  middle: { x: 76, w: 36, top: 74 },
  ring: { x: 114, w: 34, top: 80 },
  little: { x: 150, w: 30, top: 96 },
  thumb: { x: 276, w: 44, top: 120 },
};

const BRACKET_DEPTH = 7;
const BRACKET_LABEL_GAP = 8;
const BRACKET_LABEL_BASELINE = 6;
const FINGER_BOTTOM = 212;

/**
 * Finger-width shortcuts on one's own hand, from the cun glossary entry: one
 * cun the thumb at the knuckle, one and a half cun two fingers, two cun
 * three, three cun all four.
 * @param props hand diagram labeled with finger-width measurements
 * @param props.labels localized row headings
 * @param props.className additional presentation classes
 * @returns the hand diagram labeled with finger-width measurements
 */
export const CunShortcuts: FC<CunShortcutsProps> = ({ labels, className }) => (
  <svg aria-label={labels.label} className={className} role="img" viewBox="0 0 372 250">
    <title>{labels.label}</title>
    <g
      fill={PAPER}
      filter={`url(#${CUT_FILTER})`}
      stroke={INK}
      strokeLinejoin="round"
      strokeWidth="2.6">
      {Object.values(FINGERS).map(({ x, w, top }) => (
        <path d={fingerPath({ x, w, top })} key={x} />
      ))}
    </g>
    <path d="M40 150 H180 M276 168 H320" stroke={INK} strokeDasharray="3 3" strokeWidth="1.2" />
    <Bracket label={labels.oneHalf} sub={labels.twoFingers} x0={40} x1={112} y={62} />
    <Bracket label={labels.two} sub={labels.three} x0={40} x1={148} y={40} />
    <Bracket label={labels.threeCun} sub={labels.four} x0={40} x1={180} y={18} />
    <path d="M276 226 V233 H320 V226" fill="none" stroke={CINNABAR} strokeWidth="2" />
    <text fill={SEAL} fontSize="15" fontWeight="600" textAnchor="middle" x="298" y="248">
      {labels.oneCun}
    </text>
    <text fill={MUTED} fontSize="13" x="40" y="236">
      {labels.across}
    </text>
    <text fill={MUTED} fontSize="13" textAnchor="middle" x="298" y="110">
      {labels.thumb}
    </text>
  </svg>
);

const Bracket: FC<BracketProps> = ({ x0, x1, y, label, sub }) => (
  <>
    <path
      d={`M${x0} ${y + BRACKET_DEPTH} V${y} H${x1} V${y + BRACKET_DEPTH}`}
      fill="none"
      stroke={CINNABAR}
      strokeWidth="2"
    />
    <text
      fill={SEAL}
      fontSize="15"
      fontWeight="600"
      x={x1 + BRACKET_LABEL_GAP}
      y={y + BRACKET_LABEL_BASELINE}>
      {label}
      <tspan dx="8" fill={MUTED} fontSize="13" fontWeight="400">
        {sub}
      </tspan>
    </text>
  </>
);

/**
 * draws a rounded finger outline
 * @param geometry finger position and width
 * @param geometry.x horizontal drawing coordinate
 * @param geometry.w drawing width
 * @param geometry.top upper drawing coordinate
 * @returns the closed finger outline path
 */
function fingerPath({ x, w, top }: { x: number; w: number; top: number }): string {
  const bottom = FINGER_BOTTOM;
  const r = w / 2;

  return `M${x} ${bottom} V${top + r} A${r} ${r} 0 0 1 ${x + w} ${top + r} V${bottom}`;
}
