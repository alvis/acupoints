import Link from 'next/link';

import { Seal } from '@/components/primitives/Seal';
import { fill } from '@/features/conditions/format';

import { SessionPressControls } from './SessionPressControls';
import { SessionSideControls } from './SessionSideControls';

import type { ReactNode } from 'react';

import type { SessionDisplayContext } from './PracticeSession';

/**
 * shows the active point and its locating and pressing directions
 * @param context the current practice state and localized text
 * @returns the current point name, location, and pressing instructions
 */
export const SessionPointDetails = (context: Readonly<SessionDisplayContext>): ReactNode => {
  const { copy, hanMarks, zh, doneHref, doneLabel, timer, current, n, stepLabel } = context;

  return (
    <div
      className="
        flex min-w-0 flex-col gap-3.5 px-5 pt-[26px] pb-[18px]
        sm:px-[30px]
      ">
      <div className="flex flex-col gap-2.5">
        <span className="cap">{stepLabel}</span>
        <span className="flex flex-wrap items-baseline gap-4">
          <span
            className="
              tc text-[3.5rem] leading-[0.95] font-black
              sm:text-[5.25rem]
            ">
            {current.hanzi}
          </span>
          <span className="flex flex-col gap-0.5">
            {zh ? null : <span className="text-[1.875rem] font-medium">{current.pinyinName}</span>}
            <span className="pm text-[0.8rem] text-ink-micro">{current.code}</span>
          </span>
        </span>
      </div>

      <dl
        className="
          m-0 grid grid-cols-[62px_minmax(0,1fr)] gap-x-3 gap-y-2
          border-t-[2.5px] border-ink pt-3 text-lg leading-[1.45]
        ">
        <dt className="cap pt-1">{copy.where}</dt>
        <dd className="m-0">{current.where}</dd>
        <dt className="cap pt-1">{copy.how}</dt>
        <dd className="m-0">{current.how ?? copy.howText}</dd>
      </dl>

      {current.avoidInPregnancy ? (
        <p className="red m-0 flex items-baseline gap-2 text-base">
          <span aria-hidden="true" className="tc font-black">
            孕
          </span>
          <span>{fill(copy.pregnancyStep, { name: current.name })}</span>
        </p>
      ) : null}

      <a className="wb-link self-start text-base underline" href={current.href}>
        {fill(copy.leafLink, { name: current.name })}
      </a>

      <SessionSideControls {...context} />

      {timer.allDone ? (
        <div className="flex flex-wrap items-center gap-[26px] py-2.5">
          <span className="inline-flex rotate-[-9deg]">
            <Seal
              bottom={hanMarks.doneSeal[1]}
              label={copy.stampLabel}
              size={150}
              top={hanMarks.doneSeal[0]}
            />
          </span>
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-[1.625rem] font-medium">{fill(copy.doneTitle, { n })}</span>
            <span className="text-[1.0625rem] leading-[1.45] text-ink-soft">{copy.doneText}</span>
            <span className="mt-1 flex flex-wrap gap-2.5">
              <button className="btn btn-secondary" type="button" onClick={timer.restart}>
                {copy.goAgain}
              </button>
              <Link className="btn btn-primary" href={doneHref}>
                {doneLabel}
              </Link>
            </span>
          </div>
        </div>
      ) : (
        <SessionPressControls {...context} />
      )}

      <div role="status">
        {timer.hurt && !timer.allDone ? (
          <p
            className="
              m-0 bg-paper-raised px-4 py-3 text-base leading-[1.45]
              shadow-[inset_3px_0_0_var(--color-seal)]
            ">
            {copy.hurtMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
};
