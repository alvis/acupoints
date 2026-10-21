import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import type { FC } from 'react';

/** One layer of "how a leaf is made". */
export type MakingStep = { title: string; body: string };

/** Props for {@link MakingSteps}. */
export type MakingStepsProps = {
  steps: readonly MakingStep[];
  zh: boolean;
};

/**
 * The record, the prose, the foot: three numbered layers on cinnabar discs.
 * @param props numbered production steps and typography choice
 * @param props.steps numbered editorial workflow steps
 * @param props.zh whether to use Chinese typography
 */
export const MakingSteps: FC<MakingStepsProps> = ({ steps, zh }) => (
  <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
    {steps.map((step, index) => (
      <li className="grid grid-cols-[34px_minmax(0,1fr)] items-start gap-3" key={step.title}>
        <span
          aria-hidden="true"
          className="
            tc grid size-[30px] place-items-center rounded-full
            bg-(--color-cinnabar) text-[0.94rem] font-black text-paper
          ">
          {hanNumeral(index + 1)}
        </span>
        <span className={cn('text-[1.06rem] leading-[1.45]', zh && 'tc')}>
          <strong className="font-semibold">
            {step.title}
            {zh ? '。' : '.'}
          </strong>{' '}
          {step.body}
        </span>
      </li>
    ))}
  </ol>
);
