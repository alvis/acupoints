'use client';

import { useEffect, useState } from 'react';

import { BreathPacerView } from './BreathPacerView';

import type { FC } from 'react';

import type { BreathPacerModel } from './breathPacerModel';

/** Strings for {@link BreathPacer}, already filled for this leaf. */
export interface BreathPacerText {
  /** Han word of the cap label (按). */
  capHan: string;
  capLabel: string;
  title: string;
  body: string;
  start: string;
  stop: string;
  again: string;
  breatheOut: string;
  breatheIn: string;
  done: string;
  unit: string;
  /** `{done}`, `{n}`. */
  progress: string;
}

/** Props for {@link BreathPacer}. */
export type BreathPacerProps = {
  text: BreathPacerText;
  /** Breaths in one round. */
  breaths: number;
  /** BCP-47 tag for the Han cap word. */
  hanLang: string;
  /** Show the Han word before the cap label (EN pages). */
  showHan: boolean;
};

export type Phase = 'idle' | 'out' | 'in' | 'done';

/** Half a breath: press while breathing out, ease while breathing in. */
export const HALF_BREATH_MS = 5000;
export const RING_RADIUS = 56;
export const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
export const TICK_GEOMETRY = {
  halfTurn: 180,
  center: 70,
  precision: 100,
  inner: 50,
  outer: 62,
} as const;
const TICK_STEP_DEGREES = 60;
const TICK_ANGLES = Array.from({ length: 6 }, (_, index) => index * TICK_STEP_DEGREES);
/** Tick ends, rounded so server and client print identical attributes. */
export const TICKS = TICK_ANGLES.map((deg) => {
  const a = (deg * Math.PI) / TICK_GEOMETRY.halfTurn;
  const at = (r: number): { x: number; y: number } => ({
    x:
      Math.round((TICK_GEOMETRY.center + r * Math.sin(a)) * TICK_GEOMETRY.precision) /
      TICK_GEOMETRY.precision,
    y:
      Math.round((TICK_GEOMETRY.center - r * Math.cos(a)) * TICK_GEOMETRY.precision) /
      TICK_GEOMETRY.precision,
  });

  return { deg, inner: at(TICK_GEOMETRY.inner), outer: at(TICK_GEOMETRY.outer) };
});

/**
 * 按 · Press with me: a ring of slow breaths to press along with. Start runs
 * one round (about ten seconds a breath), the ring fills as breaths finish,
 * and the phase line is announced politely. Under reduced motion the ring
 * steps without easing or pulsing.
 * @param props round length, phase labels, and Han caption settings
 * @returns the press-along breathing ring, phase cue, and start or stop button
 */
export const BreathPacer: FC<BreathPacerProps> = (props) => (
  <BreathPacerView {...useBreathPacerModel(props)} />
);

/**
 * advance the press-along phases and announce breath progress
 * @param props round length, phase labels, and Han caption settings
 * @param props.text localized interface copy
 * @param props.breaths number of breaths in one round
 * @param props.hanLang language tag for Han text
 * @param props.showHan whether Han labels accompany English copy
 * @returns the breath progress, phase announcements, and start and stop actions
 */
export const useBreathPacerModel = ({
  text,
  breaths,
  hanLang,
  showHan,
}: BreathPacerProps): BreathPacerModel => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (phase !== 'out' && phase !== 'in') {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      if (phase === 'out') {
        setPhase('in');

        return;
      }
      const next = done + 1;
      setDone(next);
      setPhase(next >= breaths ? 'done' : 'out');
    }, HALF_BREATH_MS);

    return () => window.clearTimeout(timer);
  }, [phase, done, breaths]);

  const running = phase === 'out' || phase === 'in';
  const progress = text.progress.replace('{done}', String(done)).replace('{n}', String(breaths));
  const cue =
    phase === 'out'
      ? text.breatheOut
      : phase === 'in'
        ? text.breatheIn
        : phase === 'done'
          ? text.done
          : '';

  const start = (): void => {
    setDone(0);
    setPhase('out');
  };
  const stop = (): void => setPhase('idle');

  return { progress, done, breaths, phase, running, text, showHan, hanLang, cue, stop, start };
};
