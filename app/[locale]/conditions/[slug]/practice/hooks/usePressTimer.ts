import { useCallback, useEffect, useMemo, useReducer } from 'react';

import type { PressSides } from '@/features/conditions/data';

/** Marks on the press ring; one press runs through all twelve. */
export const PRESS_TICKS = 12;

/** The side being pressed on a one-side-at-a-time step. */
export type PressSide = 'L' | 'R';

/** What the screen-reader live region should say after the last change. */
export type PressNotice = 'idle' | 'step' | 'press';

/** Progress of one step, for the step list and the progress bar. */
export type StepProgress = {
  done: boolean;
  leftDone: boolean;
  rightDone: boolean;
  /** 0–1, counting both sides of a one-side-at-a-time step. */
  fraction: number;
};

/** Everything the guided session reads from and does with the timer. */
export type PressTimer = {
  step: number;
  side: PressSide;
  /** Marks elapsed on the current press, 0–12. */
  elapsed: number;
  running: boolean;
  /** The reader pressed "stop if it hurts" on this step. */
  hurt: boolean;
  notice: PressNotice;
  /** The current press (this step and side) is complete. */
  currentDone: boolean;
  allDone: boolean;
  progress: readonly StepProgress[];
  doneCount: number;
  /** Whole-routine progress, 0–100. */
  percent: number;
  /** Seconds left on the current press. */
  pressLeft: number;
  /** Seconds left in the whole routine at the current pace. */
  routineLeft: number;
  toggle: () => void;
  reset: () => void;
  stop: () => void;
  goTo: (step: number) => void;
  chooseSide: (side: PressSide) => void;
  restart: () => void;
};

type DoneMap = Readonly<Partial<Record<string, true>>>;

type PressState = {
  sides: ReadonlyArray<PressSides | undefined>;
  step: number;
  side: PressSide;
  elapsed: number;
  running: boolean;
  hurt: boolean;
  notice: PressNotice;
  done: DoneMap;
};

type PressAction =
  | { type: 'toggle' }
  | { type: 'tick' }
  | { type: 'reset' }
  | { type: 'stop' }
  | { type: 'go'; step: number }
  | { type: 'side'; side: PressSide }
  | { type: 'restart' };

const MILLISECONDS_PER_SECOND = 1000;
const PERCENT_SCALE = 100;

const pressKey = (sides: PressSides | undefined, step: number, side: PressSide): string =>
  sides === 'lr' ? `${step}${side}` : String(step);

const stepProgress = (state: PressState, index: number): StepProgress => {
  const { done, sides } = state;
  const live = index === state.step ? state.elapsed : 0;
  if (sides[index] === 'lr') {
    const leftDone = Boolean(done[`${index}L`]);
    const rightDone = Boolean(done[`${index}R`]);
    const current = done[pressKey('lr', index, state.side)] ? 0 : live;
    const marks = (leftDone ? PRESS_TICKS : 0) + (rightDone ? PRESS_TICKS : 0) + current;

    return {
      done: leftDone && rightDone,
      leftDone,
      rightDone,
      fraction: Math.min(1, marks / (2 * PRESS_TICKS)),
    };
  }
  const isDone = Boolean(done[String(index)]);

  return {
    done: isDone,
    leftDone: isDone,
    rightDone: isDone,
    fraction: isDone ? 1 : live / PRESS_TICKS,
  };
};

const initialState = (sides: ReadonlyArray<PressSides | undefined>): PressState => ({
  sides,
  step: 0,
  side: 'L',
  elapsed: 0,
  running: false,
  hurt: false,
  notice: 'idle',
  done: {},
});

const advancePress = (
  state: PressState,
  sides: PressSides | undefined,
  key: string,
): PressState => {
  if (!state.running) {
    return state;
  }
  if (state.elapsed + 1 < PRESS_TICKS) {
    return { ...state, elapsed: state.elapsed + 1 };
  }
  const done: DoneMap = { ...state.done, [key]: true };
  const other: PressSide = state.side === 'L' ? 'R' : 'L';
  if (sides === 'lr' && !done[pressKey('lr', state.step, other)]) {
    return { ...state, done, side: other, elapsed: 0, running: false, notice: 'press' };
  }

  return { ...state, done, elapsed: PRESS_TICKS, running: false, notice: 'press' };
};

const changeStep = (
  state: PressState,
  action: Extract<PressAction, { type: 'go' }>,
): PressState => {
  const next = state.sides[action.step];
  if (!next) {
    return state;
  }
  const side: PressSide =
    next === 'lr' && state.done[`${action.step}L`] && !state.done[`${action.step}R`] ? 'R' : 'L';

  return {
    ...state,
    step: action.step,
    side,
    elapsed: state.done[pressKey(next, action.step, side)] ? PRESS_TICKS : 0,
    running: false,
    hurt: false,
    notice: 'step',
  };
};

const reducer = (state: PressState, action: PressAction): PressState => {
  const sides = state.sides[state.step];
  const key = pressKey(sides, state.step, state.side);
  switch (action.type) {
    case 'toggle': {
      if (state.running) {
        return { ...state, running: false, notice: 'idle' };
      }
      if (state.elapsed < PRESS_TICKS) {
        return { ...state, running: true, hurt: false, notice: 'idle' };
      }
      // "Press again": start this press over from the first mark.
      const { [key]: _pressed, ...done } = state.done;

      return { ...state, done, elapsed: 0, running: true, hurt: false, notice: 'idle' };
    }
    case 'tick':
      return advancePress(state, sides, key);
    case 'reset':
      return { ...state, elapsed: 0, running: false, notice: 'idle' };
    case 'stop':
      return { ...state, running: false, hurt: true, notice: 'idle' };
    case 'go':
      return changeStep(state, action);
    case 'side': {
      if (sides !== 'lr' || action.side === state.side) {
        return state;
      }

      return {
        ...state,
        side: action.side,
        elapsed: state.done[pressKey('lr', state.step, action.side)] ? PRESS_TICKS : 0,
        running: false,
        hurt: false,
        notice: 'idle',
      };
    }
    case 'restart':
      return { ...initialState(state.sides), notice: 'step' };
    default:
      return state;
  }
};

const remainingPresses = (state: PressState, progress: readonly StepProgress[]): number => {
  const pressesLeft = state.sides.reduce((sum, sides, index) => {
    const item = progress.at(index);
    if (!item) {
      return sum;
    }
    if (sides !== 'lr') {
      return sum + (item.done ? 0 : 1);
    }

    return sum + (item.leftDone ? 0 : 1) + (item.rightDone ? 0 : 1);
  }, 0);

  return pressesLeft;
};

/**
 * Timer for a guided pressing session: twelve marks per press at
 * `secondsPerPress`, one side then the other on `lr` steps, and the
 * completion state of every step. The interval runs only while a press is
 * running and is cleared on pause, completion, unmount or a pace change.
 * @param sides the pressing sides for each step.
 * @param secondsPerPress the duration of one timed press in seconds.
 * @returns the current progress and timer controls
 */
export const usePressTimer = (
  sides: readonly PressSides[],
  secondsPerPress: number,
): PressTimer => {
  const [state, dispatch] = useReducer(reducer, sides, initialState);

  useEffect(() => {
    if (!state.running) {
      return undefined;
    }
    const id = window.setInterval(
      () => dispatch({ type: 'tick' }),
      Math.round((secondsPerPress * MILLISECONDS_PER_SECOND) / PRESS_TICKS),
    );

    return () => window.clearInterval(id);
  }, [state.running, secondsPerPress]);

  const toggle = useCallback(() => dispatch({ type: 'toggle' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);
  const stop = useCallback(() => dispatch({ type: 'stop' }), []);
  const goTo = useCallback((step: number) => dispatch({ type: 'go', step }), []);
  const chooseSide = useCallback((side: PressSide) => dispatch({ type: 'side', side }), []);
  const restart = useCallback(() => dispatch({ type: 'restart' }), []);

  return useMemo(() => {
    const progress = state.sides.map((_, index) => stepProgress(state, index));
    const currentDone = Boolean(
      state.done[pressKey(state.sides[state.step], state.step, state.side)],
    );
    const tickSeconds = secondsPerPress / PRESS_TICKS;
    const pressesLeft = remainingPresses(state, progress);
    const pressLeft = currentDone ? 0 : Math.round((PRESS_TICKS - state.elapsed) * tickSeconds);
    const routineLeft = Math.max(
      0,
      pressesLeft * secondsPerPress - (currentDone ? 0 : state.elapsed * tickSeconds),
    );
    const total = progress.reduce((sum, item) => sum + item.fraction, 0);

    return {
      step: state.step,
      side: state.side,
      elapsed: state.elapsed,
      running: state.running,
      hurt: state.hurt,
      notice: state.notice,
      currentDone,
      allDone: progress.every((item) => item.done),
      progress,
      doneCount: progress.filter((item) => item.done).length,
      percent: progress.length > 0 ? Math.round((total / progress.length) * PERCENT_SCALE) : 0,
      pressLeft,
      routineLeft,
      toggle,
      reset,
      stop,
      goTo,
      chooseSide,
      restart,
    };
  }, [state, secondsPerPress, toggle, reset, stop, goTo, chooseSide, restart]);
};
