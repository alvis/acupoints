import { fill } from '@/features/conditions/format';
import { hanNumeral } from '@/utilities/hanNumeral';

import type { PracticeCopy } from '@/features/conditions/copy';

import type { PressTimer } from '../hooks/usePressTimer';

import type { PracticeStep } from './PracticeSession';

const SECONDS_PER_MINUTE = 60;
/** inputs for the current press descriptions */
interface SessionLabelsParams {
  timer: PressTimer;
  copy: PracticeCopy;
  current: PracticeStep;
  n: number;
  zh: boolean;
}
/** localized labels for the current press */
interface SessionLabels {
  pressStatus: string;
  toggleLabel: string;
  progressText: string;
  announcement: string;
  stepLabel: string;
  figure: string;
  sideNote: string;
}
const pressStatusFor = ({ timer, copy }: SessionLabelsParams): string =>
  timer.currentDone
    ? copy.pressed
    : timer.running
      ? copy.pressing
      : timer.elapsed > 0
        ? copy.paused
        : copy.ready;
const toggleLabelFor = ({ timer, copy }: SessionLabelsParams): string =>
  timer.running
    ? copy.pause
    : timer.currentDone
      ? copy.again
      : timer.elapsed > 0
        ? copy.resume
        : copy.start;
const progressTextFor = ({ timer, copy, n }: SessionLabelsParams): string =>
  timer.allDone
    ? copy.allDone
    : fill(copy.progress, {
        done: timer.doneCount,
        n,
        min: Math.max(1, Math.ceil(timer.routineLeft / SECONDS_PER_MINUTE)),
      });
const announcementFor = ({ timer, copy, current, n }: SessionLabelsParams): string =>
  timer.notice === 'step'
    ? fill(copy.announceStep, {
        i: timer.step + 1,
        n,
        name: current.name,
        code: current.code,
      })
    : timer.notice === 'press'
      ? timer.allDone
        ? fill(copy.doneTitle, { n })
        : copy.announcePress
      : '';
const stepLabelFor = ({ timer, copy, n, zh }: SessionLabelsParams): string =>
  zh
    ? fill(copy.stepLabel, { i: hanNumeral(timer.step + 1), n: hanNumeral(n) })
    : `第${hanNumeral(timer.step + 1)}步 · ${fill(copy.stepLabel, { i: timer.step + 1, n })}`;
const figureFor = ({ timer, copy, current }: SessionLabelsParams): string =>
  current.sides === 'mid'
    ? copy.figMid
    : current.sides === 'both'
      ? copy.figBoth
      : timer.side === 'L'
        ? copy.figLeft
        : copy.figRight;
const sideNoteFor = ({ copy, current }: SessionLabelsParams): string =>
  current.sides === 'lr'
    ? copy.sideNoteLr
    : current.sides === 'both'
      ? copy.sideNoteBoth
      : copy.sideNoteMid;
/**
 * describes the current press and routine progress
 * @param params the timer state, point, and localized copy
 * @returns the visible and announced session labels
 */
export const sessionLabels = (params: SessionLabelsParams): SessionLabels => ({
  pressStatus: pressStatusFor(params),
  toggleLabel: toggleLabelFor(params),
  progressText: progressTextFor(params),
  announcement: announcementFor(params),
  stepLabel: stepLabelFor(params),
  figure: figureFor(params),
  sideNote: sideNoteFor(params),
});
