import { fill } from '@/features/conditions/format';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import type { ReactNode } from 'react';

import type { SessionDisplayContext } from './PracticeSession';

/**
 * lists the routine points and their completion states
 * @param context the current practice state and localized text
 * @returns the ordered step buttons with completion status
 */
export const SessionStepList = (context: Readonly<SessionDisplayContext>): ReactNode => {
  const { steps, copy, zh, timer, n, rowStatus } = context;

  return (
    <div
      className="
        flex flex-col gap-3.5 border-b-[1.5px] border-ink px-[22px] pt-6 pb-5
        lg:border-r-[1.5px] lg:border-b-0
      ">
      <span className="flex items-baseline gap-2.5">
        <span aria-hidden="true" className="tc text-[1.375rem] font-black">
          {`${hanNumeral(n)}步`}
        </span>
        <h2 className="m-0 text-[1.375rem] font-medium">{fill(copy.stepsTitle, { n })}</h2>
      </span>
      <ol className="
        m-0 flex list-none flex-col border-t-[2.5px] border-ink p-0
      ">
        {steps.map((step, i) => {
          const item = timer.progress.at(i);
          const on = i === timer.step;
          const status = rowStatus(copy, item, {
            current: on && !timer.allDone,
            running: timer.running,
          });

          return (
            <li className="border-b border-rule" key={step.code}>
              <button
                aria-current={on ? 'step' : undefined}
                className={cn(
                  `
                    flex w-full cursor-pointer items-center gap-3 border-0
                    px-2.5 py-3.5 text-left text-ink transition-colors
                    motion-reduce:transition-none
                  `,
                  on
                    ? `
                      bg-paper-raised
                      shadow-[inset_4px_0_0_var(--color-cinnabar)]
                    `
                    : `
                      bg-transparent
                      hover:bg-paper-raised
                    `,
                )}
                type="button"
                onClick={() => timer.goTo(i)}>
                <span
                  aria-hidden="true"
                  className={cn(
                    `
                      tc grid size-9 flex-none place-items-center rounded-full
                      text-base font-black
                    `,
                    item?.done
                      ? `bg-(--color-cinnabar) text-paper`
                      : on
                        ? `bg-ink text-paper`
                        : 'shadow-rest',
                  )}>
                  {hanNumeral(i + 1)}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="sr-only">
                    {fill(copy.stepRow, { i: i + 1, name: step.name, code: step.code })}
                  </span>
                  <span aria-hidden="true" className="flex items-baseline gap-2">
                    <span className="tc text-[1.375rem] font-bold">{step.hanzi}</span>
                    {zh ? null : <span className="text-lg">{step.pinyinName}</span>}
                  </span>
                  <span className="pm text-[0.7rem] text-ink-micro">
                    <span aria-hidden="true">{step.code} · </span>
                    {step.sides === 'lr'
                      ? copy.sideEach
                      : step.sides === 'both'
                        ? copy.sideBoth
                        : copy.sideMid}
                  </span>
                </span>
                <span
                  className={cn(
                    'pm text-[0.8rem] tracking-[0.06em]',
                    item?.done ? 'red' : `text-ink-soft`,
                  )}>
                  {status}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div
        className="
          mt-auto flex flex-col gap-1.5 bg-paper-raised px-4 py-3.5
          text-[0.95rem] leading-[1.45]
        ">
        <span className="cap">{copy.beforeTitle}</span>
        <span>{copy.beforeText}</span>
      </div>
    </div>
  );
};
