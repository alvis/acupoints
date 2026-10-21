'use client';

import { BreathRing } from './BreathRing';

import type { ReactNode } from 'react';

import type { useBreathPacerModel } from './BreathPacer';

/** state and localized content for the BreathPacer layout */
export type BreathPacerViewModel = ReturnType<typeof useBreathPacerModel>;

const PHASE_CUE_CLASSES = 'red m-0 min-h-[1.45em] text-base italic';

/**
 * render breathing ring, press guidance, phase cue, and round control
 * @param model breath progress, phase labels, and round controls
 * @returns the breathing ring, press guidance, phase cue, and round control
 */
export const BreathPacerView = (model: Readonly<BreathPacerViewModel>): ReactNode => {
  const { phase, running, text, showHan, hanLang, cue, stop, start } = model;

  return (
    <section
      aria-labelledby="leaf-pacer"
      className="
        r1 flex flex-col items-center gap-5 px-5 py-6
        sm:flex-row sm:px-[26px]
      ">
      <BreathRing model={model} />

      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="cap m-0" id="leaf-pacer">
          {showHan ? (
            <>
              <span className="tc" lang={hanLang}>
                {text.capHan}
              </span>
              {' · '}
            </>
          ) : null}
          {text.capLabel}
        </h2>
        <p className="m-0 text-[1.375rem] leading-tight font-medium">{text.title}</p>
        <p className="m-0 text-base leading-[1.45] text-ink-soft">{text.body}</p>
        <p aria-live="polite" className={PHASE_CUE_CLASSES}>
          {cue}
        </p>
        <button
          className="btn btn-primary self-start px-3.5 py-2 text-[0.95rem]"
          type="button"
          onClick={running ? stop : start}>
          {running ? text.stop : phase === 'done' ? text.again : text.start}
        </button>
      </div>
    </section>
  );
};
