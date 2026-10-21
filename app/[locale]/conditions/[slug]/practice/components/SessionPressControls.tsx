import { fill } from '@/features/conditions/format';
import { cn } from '@/utilities/cn';

import { PressRing } from './PressRing';

import type { ReactNode } from 'react';

import type { SessionDisplayContext } from './PracticeSession';

/**
 * provides press timing, pace selection, and stop controls
 * @param context the current practice state and localized text
 * @returns the pace selector, timer ring, and press controls
 */
export const SessionPressControls = (context: Readonly<SessionDisplayContext>): ReactNode => {
  const { copy, pace, setPace, timer, current, marks, time, pressStatus, toggleLabel, paces } =
    context;

  return (
    <div className="flex flex-wrap items-center gap-[22px] pt-1.5">
      <PressRing
        label={fill(copy.ringLabel, { marks, left: time })}
        marks={marks}
        running={timer.running}
        status={pressStatus}
        time={time}
      />
      <div className="flex min-w-0 flex-col gap-2.5">
        <span className="text-base leading-[1.45] text-ink-soft">{copy.tickNote}</span>
        <span className="flex flex-wrap gap-2.5">
          <button
            aria-label={fill(copy.toggleAria, {
              action: toggleLabel,
              name: current.name,
            })}
            className="btn btn-primary min-w-32 justify-center"
            type="button"
            onClick={timer.toggle}>
            {toggleLabel}
          </button>
          <button className="btn btn-secondary" type="button" onClick={timer.reset}>
            {copy.reset}
          </button>
        </span>
        <button
          className="
            red cursor-pointer self-start border-0 border-b-[1.5px] border-solid
            border-seal bg-transparent px-0 py-1 text-base
          "
          type="button"
          onClick={timer.stop}>
          <span aria-hidden="true" className="tc mr-1.5 font-black">
            停
          </span>
          {copy.hurt}
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <span className="cap" id="practice-pace-label">
            {copy.seconds}
          </span>
          <div aria-labelledby="practice-pace-label" className="flex" role="group">
            {paces.map((seconds) => (
              <button
                aria-pressed={pace === seconds}
                className={cn(
                  `
                    pm h-8 cursor-pointer border-0 px-2.5 text-xs
                    transition-colors
                    motion-reduce:transition-none
                  `,
                  pace === seconds
                    ? `
                      bg-ink text-paper
                      shadow-[inset_0_-3px_0_var(--color-cinnabar)]
                    `
                    : `
                      bg-transparent text-ink
                      shadow-[inset_0_0_0_1px_var(--color-ink)]
                    `,
                )}
                key={seconds}
                type="button"
                onClick={() => setPace(seconds)}>
                {fill(copy.secondsUnit, { n: seconds })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
