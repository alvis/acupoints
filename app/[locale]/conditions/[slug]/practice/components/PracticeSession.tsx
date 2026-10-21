'use client';

import { useMemo, useState } from 'react';

import { PRESS_TICKS, usePressTimer } from '../hooks/usePressTimer';

import { SessionDisplay } from './SessionDisplay';
import { sessionLabels } from './sessionLabels';

import type { Dispatch, FC, PropsWithChildren, ReactNode, SetStateAction } from 'react';

import type { HanMarks, PracticeCopy } from '@/features/conditions/copy';
import type { RoutinePoint } from '@/features/conditions/data';

import type { PressTimer, StepProgress } from '../hooks/usePressTimer';

/** One step of the session: a point of the set with its server-cut plate. */
export type PracticeStep = RoutinePoint & {
  /** The point's woodcut plate, rendered on the server. */
  plate: ReactNode;
};

/** Props for {@link PracticeSession}; children are the page header. */
export type PracticeSessionProps = PropsWithChildren<{
  steps: readonly PracticeStep[];
  copy: PracticeCopy;
  /** Strip title, plate tag and finished seal, in the page's script. */
  hanMarks: HanMarks;
  /** Cartouche title on the strip (頭痛方 …). */
  slip: string;
  /** Chinese page: Han numerals in labels, no Latin name beside the hanzi. */
  zh: boolean;
  /** Where the finished state leads back to. */
  doneHref: string;
  doneLabel: string;
}>;

/** Paces a reader can pick for one press, in seconds. */
const PRESS_DURATIONS = { short: 30, moderate: 45, standard: 60, extended: 90 } as const;
const PACES = Object.values(PRESS_DURATIONS);
const SECONDS_PER_MINUTE = 60;
const DEFAULT_PACE = 60;
const SIDES = ['L', 'R'] as const;

const clock = (seconds: number): string =>
  `${Math.floor(seconds / SECONDS_PER_MINUTE)}:${String(seconds % SECONDS_PER_MINUTE).padStart(2, '0')}`;

const rowStatus = (
  copy: PracticeCopy,
  item: StepProgress | undefined,
  { current, running }: { current: boolean; running: boolean },
): string => {
  if (item?.done) {
    return copy.statusDone;
  }
  if (current) {
    return running ? copy.pressing : copy.statusNow;
  }
  if (item?.leftDone) {
    return copy.statusLeftDone;
  }
  if (item?.rightDone) {
    return copy.statusRightDone;
  }

  return '';
};

/**
 * prepares the active point, press timer, navigation, and accessible session labels
 * @param props practice points, display labels, and return navigation
 * @param props.steps ordered practice points and their server-rendered plates
 * @param props.copy localized headings, controls, and safety messages
 * @param props.hanMarks strip title, plate tag, and finished seal in the page script
 * @param props.slip cartouche title on the prescription strip
 * @param props.zh whether the page uses Chinese labels and Han numerals
 * @param props.doneHref condition URL shown when practice finishes
 * @param props.doneLabel text of the return link after practice
 * @param props.children introductory heading displayed inside the session
 * @returns the timer, navigation, and display state, or null when no point exists
 */
export const usePracticeSessionState = ({
  steps,
  copy,
  hanMarks,
  slip,
  zh,
  doneHref,
  doneLabel,
  children,
}: PracticeSessionProps): SessionDisplayContext | null => {
  const sides = useMemo(() => steps.map((step) => step.sides), [steps]);
  const [pace, setPace] = useState<number>(DEFAULT_PACE);
  const timer = usePressTimer(sides, pace);

  const current = steps.at(timer.step);
  if (!current) {
    return null;
  }

  const n = steps.length;
  const lr = current.sides === 'lr';
  const previous = timer.step > 0 ? steps.at(timer.step - 1) : undefined;
  const next = steps.at(timer.step + 1);
  const marks = timer.currentDone ? PRESS_TICKS : timer.elapsed;
  const time = clock(timer.pressLeft);
  const { pressStatus, toggleLabel, progressText, announcement, stepLabel, figure, sideNote } =
    sessionLabels({ timer, copy, current, n, zh });

  return {
    steps,
    copy,
    hanMarks,
    slip,
    zh,
    doneHref,
    doneLabel,
    children,
    sides,
    pace,
    setPace,
    timer,
    current,
    n,
    lr,
    previous,
    next,
    marks,
    time,
    pressStatus,
    toggleLabel,
    progressText,
    announcement,
    stepLabel,
    figure,
    sideNote,
    paces: PACES,
    pressSides: SIDES,
    rowStatus,
  };
};

/** state and copy shared by the guided practice sections */
export type SessionDisplayContext = PracticeSessionProps & {
  sides: ReadonlyArray<RoutinePoint['sides']>;
  pace: number;
  setPace: Dispatch<SetStateAction<number>>;
  timer: PressTimer;
  current: PracticeStep;
  n: number;
  lr: boolean;
  previous: PracticeStep | undefined;
  next: PracticeStep | undefined;
  marks: number;
  time: string;
  pressStatus: string;
  toggleLabel: string;
  progressText: string;
  announcement: string;
  stepLabel: string;
  figure: string;
  sideNote: string;
  paces: readonly number[];
  pressSides: ReadonlyArray<'L' | 'R'>;
  rowStatus: typeof rowStatus;
};

export const PracticeSession: FC<PracticeSessionProps> = (props) => {
  const state = usePracticeSessionState(props);

  return state ? <SessionDisplay {...state} /> : null;
};
