import { FishTail } from '@/components/primitives/FishTail';
import { fill } from '@/features/conditions/format';

import { PracticeProgress } from './PracticeProgress';
import { SessionNavigation } from './SessionNavigation';
import { SessionPointDetails } from './SessionPointDetails';
import { SessionStepList } from './SessionStepList';

import type { ReactNode } from 'react';

import type { SessionDisplayContext } from './PracticeSession';
/**
 * renders the guided session from its timer state
 * @param context the current practice state and localized text
 * @returns the session layout
 */
export const SessionDisplay = (context: Readonly<SessionDisplayContext>): ReactNode => {
  const {
    steps,
    copy,
    hanMarks,
    slip,
    zh,
    children,
    timer,
    current,
    progressText,
    announcement,
    figure,
  } = context;

  return (
    <>
      <p aria-live="polite" className="sr-only" role="status">
        {announcement}
      </p>

      <PracticeProgress
        current={timer.allDone ? -1 : timer.step}
        label={copy.progressLabel}
        percent={timer.percent}
        progress={timer.progress}
        steps={steps}
        text={progressText}
        zh={zh}
      />

      {children}

      <section aria-label={copy.practiceLabel} className="mt-[30px]">
        <div
          className="
            blk m-1.5 grid grid-cols-1
            lg:grid-cols-[318px_58px_minmax(0,1fr)]
          ">
          <SessionStepList {...context} />

          <div
            aria-hidden="true"
            className="
              hidden flex-col items-center gap-3 border-r-[1.5px] border-ink
              py-3
              lg:flex
            ">
            <span className="block h-10 w-1.5 bg-ink" />
            <FishTail />
            <span className="tc vt text-base font-bold tracking-[0.2em]">
              {hanMarks.practiceStrip}
            </span>
            <span className="flex-1" />
            <span className="tc vt text-sm tracking-[0.2em]">{slip}</span>
            <FishTail up />
            <span className="tc text-base font-bold">方</span>
          </div>

          <div
            className="
              grid min-w-0 grid-cols-1
              xl:grid-cols-[380px_minmax(0,1fr)]
            ">
            <figure
              className="
                relative m-0 flex flex-col items-center justify-center gap-3
                border-b-[1.5px] border-ink px-2.5 py-6
                xl:border-r-[1.5px] xl:border-b-0
              ">
              <div className="w-full max-w-68">{current.plate}</div>
              <figcaption className="text-center text-[0.95rem]">
                <span className="tc font-bold">{current.hanzi}</span> · {figure}
              </figcaption>
              <span
                aria-hidden="true"
                className="
                  tc vt absolute top-4 right-3.5 bg-paper px-1 py-2.5 text-lg
                  font-bold tracking-[0.12em] shadow-rest
                ">
                {fill(hanMarks.figure, { name: current.hanzi })}
              </span>
            </figure>

            <SessionPointDetails {...context} />

            <SessionNavigation {...context} />
          </div>
        </div>
      </section>
    </>
  );
};
