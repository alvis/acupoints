import { cn } from '@/utilities/cn';

import type { ReactNode } from 'react';

import type { SessionDisplayContext } from './PracticeSession';

/**
 * selects which side of the current point to press
 * @param context the current practice state and localized text
 * @returns the left and right side selectors and side guidance
 */
export const SessionSideControls = (context: Readonly<SessionDisplayContext>): ReactNode => {
  const { copy, zh, timer, lr, sideNote, pressSides } = context;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="cap" id="practice-side-label">
        {copy.side}
      </span>
      <div aria-labelledby="practice-side-label" className="flex" role="group">
        {pressSides.map((side) => (
          <button
            aria-pressed={lr && timer.side === side}
            className={cn(
              `
                flex h-10 items-center gap-1.5 border-0 px-4 text-base
                transition-colors
                motion-reduce:transition-none
              `,
              lr ? 'cursor-pointer' : 'cursor-default opacity-55',
              lr && timer.side === side
                ? `
                  bg-ink text-paper
                  shadow-[inset_0_-3px_0_var(--color-cinnabar)]
                `
                : `bg-transparent text-ink shadow-rest`,
            )}
            disabled={!lr}
            key={side}
            type="button"
            onClick={() => timer.chooseSide(side)}>
            <span aria-hidden={zh ? undefined : true} className="tc font-bold">
              {side === 'L' ? '左' : '右'}
            </span>
            {zh ? null : side === 'L' ? copy.left : copy.right}
          </button>
        ))}
      </div>
      <span className="text-[0.95rem] text-ink-soft">{sideNote}</span>
    </div>
  );
};
