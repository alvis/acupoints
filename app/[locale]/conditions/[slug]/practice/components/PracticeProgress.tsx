import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import type { FC } from 'react';

import type { RoutinePoint } from '@/features/conditions/data';

import type { StepProgress } from '../hooks/usePressTimer';

/** Props for {@link PracticeProgress}. */
export type PracticeProgressProps = {
  label: string;
  /** Whole-routine progress, 0–100. */
  percent: number;
  /** "1 of 4 done · about 5 min left". */
  text: string;
  /** Index of the current step; -1 once every step is done. */
  current: number;
  steps: ReadonlyArray<Pick<RoutinePoint, 'code' | 'hanzi' | 'pinyinName'>>;
  progress: readonly StepProgress[];
  zh: boolean;
};

const PERCENT_SCALE = 100;

/**
 * The routine's progress as one carved bar per step, filled cinnabar as the
 * presses complete, exposed to assistive technology as a single progressbar
 * with a spoken value.
 * @param props step completion flags, active index, and localized progress labels
 * @param props.label accessible label for the navigation or progress indicator
 * @param props.percent completed percentage of the routine
 * @param props.text localized completion text
 * @param props.current active step index
 * @param props.steps ordered point codes, Han names, and pinyin labels
 * @param props.progress completion flags for each practice step
 * @param props.zh whether the page uses Chinese labels and Han numerals
 * @returns the completion bar and numbered step markers
 */
export const PracticeProgress: FC<PracticeProgressProps> = ({
  label,
  percent,
  text,
  current,
  steps,
  progress,
  zh,
}) => (
  <div
    aria-label={label}
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={percent}
    aria-valuetext={text}
    className="mt-[26px] flex flex-wrap items-end gap-x-3.5 gap-y-3"
    role="progressbar">
    <div aria-hidden="true" className="
      flex min-w-0 flex-[1_1_32rem] items-end gap-3.5
    ">
      {steps.map((step, i) => {
        const on = i === current;

        return (
          <div className="flex min-w-0 flex-1 flex-col gap-2" key={step.code}>
            <span
              className={cn(
                `
                  flex items-baseline gap-2 overflow-hidden text-[0.95rem]
                  whitespace-nowrap
                `,
                on ? 'font-semibold text-ink' : 'text-ink-soft',
              )}>
              <span className="tc font-bold">{hanNumeral(i + 1)}</span>
              <span
                className="
                  tc hidden font-bold
                  sm:inline
                ">
                {step.hanzi}
              </span>
              {zh ? null : (
                <span
                  className="
                    hidden truncate
                    md:inline
                  ">
                  {step.pinyinName}
                </span>
              )}
            </span>
            <svg
              aria-hidden="true"
              className={cn(
                'block h-2 w-full',
                on && `
                  outline-[1.5px] outline-offset-2 outline-ink outline-solid
                `,
              )}
              preserveAspectRatio="none"
              viewBox="0 0 100 8">
              <rect
                className="
                  transition-[width] duration-300
                  motion-reduce:transition-none
                "
                fill="var(--color-cinnabar)"
                height="8"
                width={((progress[i]?.fraction ?? 0) * PERCENT_SCALE).toFixed(1)}
                x="0"
                y="0"
              />
              <rect
                fill="none"
                height="6.5"
                stroke="var(--color-ink)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                width="98.5"
                x="0.75"
                y="0.75"
              />
            </svg>
          </div>
        );
      })}
    </div>
    <span
      className="
        w-full text-right text-base text-ink-soft
        sm:w-52
      ">
      {text}
    </span>
  </div>
);
