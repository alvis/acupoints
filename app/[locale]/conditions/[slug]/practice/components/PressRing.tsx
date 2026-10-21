import { PRESS_TICKS } from '../hooks/usePressTimer';

import type { FC } from 'react';

/** Props for {@link PressRing}. */
export type PressRingProps = {
  /** Marks lit so far, 0–12. */
  marks: number;
  running: boolean;
  /** "1:00" left on the press. */
  time: string;
  /** "pressing", "paused" … under the time. */
  status: string;
  /** Accessible description of the ring's state. */
  label: string;
};

const RING = {
  tickAngle: 30,
  rotation: 90,
  halfTurn: 180,
  center: 70,
  inner: 44,
  outer: 60,
  litWidth: 7,
  nextWidth: 3.5,
};

/** Twelve tick positions around a 140-unit ring, computed once. */
const TICKS = Array.from({ length: PRESS_TICKS }, (_, k) => {
  const angle = ((k * RING.tickAngle - RING.rotation) * Math.PI) / RING.halfTurn;

  return {
    k,
    x1: (RING.center + RING.inner * Math.cos(angle)).toFixed(1),
    y1: (RING.center + RING.inner * Math.sin(angle)).toFixed(1),
    x2: (RING.center + RING.outer * Math.cos(angle)).toFixed(1),
    y2: (RING.center + RING.outer * Math.sin(angle)).toFixed(1),
  };
});

/**
 * The carved press ring: twelve marks that fill cinnabar as the press runs,
 * with the time left in the middle. State reads from the label and the
 * spoken status, never from colour alone.
 * @param props completed tick count, remaining time, and press status
 * @param props.marks heading glyphs in the page script
 * @param props.running whether the press timer is active
 * @param props.time formatted remaining time for one press
 * @param props.status current press status displayed below the clock
 * @param props.label accessible label for the navigation or progress indicator
 * @returns the twelve-mark press ring with time and status labels
 */
export const PressRing: FC<PressRingProps> = ({ marks, running, time, status, label }) => (
  <div className="relative size-[190px] flex-none">
    <svg aria-label={label} height="190" role="img" viewBox="0 0 140 140" width="190">
      <g fill="none" stroke="var(--color-ink)">
        <circle cx="70" cy="70" r="66" strokeWidth="2.2" />
        <circle cx="70" cy="70" r="38" strokeWidth="1" />
      </g>
      {TICKS.map((tick) => {
        const lit = tick.k < marks;
        const next = running && tick.k === marks;

        return (
          <line
            className="
              transition-[stroke,stroke-width] duration-300
              motion-reduce:transition-none
            "
            key={tick.k}
            stroke={lit ? 'var(--color-cinnabar)' : next ? 'var(--color-seal)' : 'var(--color-ink)'}
            strokeLinecap="round"
            strokeWidth={lit ? RING.litWidth : next ? RING.nextWidth : 2}
            x1={tick.x1}
            x2={tick.x2}
            y1={tick.y1}
            y2={tick.y2}
          />
        );
      })}
    </svg>
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute inset-0 flex flex-col items-center
        justify-center gap-0.5
      ">
      <span className="pm text-[1.875rem] font-medium">{time}</span>
      <span className="text-[0.95rem] text-ink-soft">{status}</span>
    </div>
  </div>
);
