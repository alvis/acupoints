import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { WorkedExampleFigure } from './WorkedExampleFigure';

import type { FC } from 'react';

import type { CunGuide } from './cunGuide';

/** Props for {@link WorkedExample}. */
export type WorkedExampleProps = {
  example: CunGuide['example'];
  /** The ST36 leaf, when the catalogue has it. */
  leafHref?: string;
  /** "Open the ST36 leaf →". */
  leafLabel: string;
  className?: string;
};

/**
 * The worked example from the Journal board: a carved left leg with four
 * fingers stacked below the knee-eye, beside the four steps that find
 * Zusanli (ST36), as the guide's "Putting it to work" part describes them.
 * @param props Zusanli illustration and four locating steps
 * @param props.example Zusanli locating steps and illustration labels
 * @param props.leafHref destination of the Zusanli leaf
 * @param props.leafLabel label for the Zusanli leaf link
 * @param props.className additional presentation classes
 * @returns the Zusanli illustration and four locating steps
 */
export const WorkedExample: FC<WorkedExampleProps> = ({
  example,
  leafHref,
  leafLabel,
  className,
}) => (
  <section
    aria-labelledby="ex"
    className={cn(
      `
        blk m-1.5 grid
        md:grid-cols-[330px_minmax(0,1fr)]
      `,
      className,
    )}>
    <WorkedExampleFigure example={example} />
    <div
      className="
        flex flex-col gap-2.5 px-5 pt-[26px] pb-6
        md:px-[34px]
      ">
      <span className="cap">{example.cap}</span>
      <h2
        className="
          m-0 text-[1.75rem] leading-tight font-medium
          md:text-[2rem]
        "
        id="ex">
        <span aria-hidden="true" className="tc mr-3 font-black">
          {example.han}
        </span>
        {example.title}
      </h2>
      <span className="text-[1.05rem] text-ink-soft">{example.lede}</span>
      <ol className="m-0 mt-1 list-none p-0">
        {example.steps.map((step, k) => (
          <li
            className="
              grid grid-cols-[34px_minmax(0,1fr)_80px] items-baseline gap-3.5
              border-b border-rule py-3
            "
            key={step.han}>
            <span className="pm red text-[0.8rem]">0{k + 1}</span>
            <span className="text-[1.1rem] leading-[1.45]">{step.text}</span>
            <span
              aria-hidden="true"
              className="tc text-right text-[0.95rem] font-bold">
              {step.han}
            </span>
          </li>
        ))}
      </ol>
      <span className="mt-2 flex flex-wrap items-center gap-4">
        <span className="text-base text-ink-soft">{example.minutes}</span>
        <span className="flex-1" />
        {leafHref ? (
          <Link className="btn no-underline" href={leafHref}>
            {leafLabel}
          </Link>
        ) : null}
      </span>
    </div>
  </section>
);
