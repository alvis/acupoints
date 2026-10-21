'use client';

import { cn } from '@/utilities/cn';

import { RING_RADIUS, RING_LENGTH, TICKS } from './BreathPacer';

import type { ReactNode } from 'react';

import type { BreathPacerViewModel } from './BreathPacerView';

/**
 * render breathing progress ring with tick marks and a phase pulse
 * @param props progress ring state
 * @param props.model breath counts, current phase, running state, and ring labels
 * @returns the breathing progress ring with tick marks and a phase pulse
 */
export const BreathRing = ({ model }: Readonly<{ model: BreathPacerViewModel }>): ReactNode => {
  const { progress, done, breaths, phase, running, text } = model;

  return (
    <svg
      aria-label={progress}
      className="flex-none"
      height="140"
      role="img"
      viewBox="0 0 140 140"
      width="140">
      <circle
        cx="70"
        cy="70"
        fill="none"
        r={RING_RADIUS}
        stroke="var(--color-ink)"
        strokeWidth="3"
      />
      {TICKS.map(({ deg, inner, outer }) => (
        <line
          key={deg}
          stroke="var(--color-ink)"
          strokeWidth="2"
          x1={inner.x}
          x2={outer.x}
          y1={inner.y}
          y2={outer.y}
        />
      ))}
      <circle
        className="
          motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700
        "
        cx="70"
        cy="70"
        fill="none"
        r={RING_RADIUS}
        stroke="var(--color-cinnabar)"
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={RING_LENGTH * (1 - done / breaths)}
        strokeWidth="6"
        transform="rotate(-90 70 70)"
      />
      <circle
        className={cn(
          `
            origin-center
            motion-safe:transition-transform motion-safe:duration-5000
          `,
          phase === 'out' ? 'motion-safe:scale-100' : 'motion-safe:scale-75',
        )}
        cx="70"
        cy="70"
        fill="var(--color-paper-raised)"
        opacity={running ? 1 : 0}
        r="34"
      />
      <text
        className="font-(family-name:--font-display)"
        fill="var(--color-ink)"
        fontSize="28"
        textAnchor="middle"
        x="70"
        y="70">
        {done} / {breaths}
      </text>
      <text
        className="font-(family-name:--font-display)"
        fill="var(--color-ink-soft)"
        fontSize="14"
        textAnchor="middle"
        x="70"
        y="90">
        {text.unit}
      </text>
    </svg>
  );
};
