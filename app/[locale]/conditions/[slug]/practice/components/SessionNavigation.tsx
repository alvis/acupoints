import { fill } from '@/features/conditions/format';

import type { ReactNode } from 'react';

import type { SessionDisplayContext } from './PracticeSession';
/**
 * moves between the routine's ordered steps
 * @param context the current point, adjacent points, and timer controls
 * @returns the previous and next step controls
 */
export const SessionNavigation = (context: Readonly<SessionDisplayContext>): ReactNode => {
  const { copy, timer, previous, next, n, pace } = context;

  return (
    <nav
      aria-label={copy.navLabel}
      className="
        flex flex-wrap items-center gap-3.5 border-t-[1.5px] border-ink px-5
        py-3.5
        sm:px-[30px]
        xl:col-span-2
      ">
      <button
        className="
          btn btn-secondary
          disabled:cursor-default disabled:opacity-45
        "
        disabled={!previous}
        type="button"
        onClick={() => timer.goTo(timer.step - 1)}>
        {previous ? fill(copy.previousNamed, { name: previous.name }) : copy.previous}
      </button>
      <span className="flex-1 text-center text-[0.95rem] text-ink-soft">
        {fill(copy.stepMid, { i: timer.step + 1, n, s: pace })}
      </span>
      <button
        className="
          btn btn-primary
          disabled:cursor-default disabled:opacity-45
        "
        disabled={!next}
        type="button"
        onClick={() => timer.goTo(timer.step + 1)}>
        {next ? fill(copy.next, { name: next.name }) : copy.lastStep}
      </button>
    </nav>
  );
};
