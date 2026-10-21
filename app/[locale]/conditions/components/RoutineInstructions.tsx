import Link from 'next/link';

import { NumberDisc } from '@/components/primitives/NumberDisc';
import { fill } from '@/features/conditions/format';

import type { ReactNode } from 'react';

import type { ConditionsCopy } from '@/features/conditions/copy';
import type { ConditionSet } from '@/features/conditions/data';
import type { localizedRoutes } from '@/utilities/routes';

/** localized instructions, first available routine, and route links */
interface RoutineInstructionsProps {
  copy: ConditionsCopy;
  firstPractice: ConditionSet | undefined;
  r: ReturnType<typeof localizedRoutes>;
}

/**
 * renders three numbered instructions and first-practice link
 * @param props localized instructions, first available routine, and route links
 * @returns the three numbered instructions and first-practice link
 */
export const RoutineInstructions = (props: Readonly<RoutineInstructionsProps>): ReactNode => {
  const { copy, firstPractice, r } = props;

  return (
    <section aria-labelledby="how-set" className="mt-[72px]">
      <div className="mb-[22px] flex flex-wrap items-baseline gap-x-5 gap-y-3">
        <span aria-hidden="true" className="tc text-[1.875rem] font-black">
          方法
        </span>
        <h2
          className="
            m-0 text-[1.6rem] leading-tight font-medium
            md:text-[2rem]
          "
          id="how-set">
          {copy.index.howTitle}
        </h2>
        <span className="flex-1" />
        {firstPractice ? (
          <Link className="btn btn-primary" href={r.practice(firstPractice.condition.slug)}>
            {fill(copy.index.pressSet, { min: firstPractice.routine?.minutes ?? '' })}
          </Link>
        ) : null}
      </div>
      <ol
        className="
          m-0 grid list-none gap-7 p-0
          md:grid-cols-3
        ">
        {copy.index.steps.map((step, i) => (
          <li
            className="
              r1 grid grid-cols-[54px_minmax(0,1fr)] items-start gap-[18px]
              px-[26px] pt-6 pb-[26px]
            "
            key={step.han}>
            <NumberDisc n={i + 1} size={46} />
            <div className="flex flex-col gap-2">
              <span className="flex items-baseline gap-2.5">
                <span aria-hidden="true" className="
                  tc text-[1.625rem] font-black
                ">
                  {step.han}
                </span>
                <h3 className="m-0 text-2xl font-medium">{step.title}</h3>
              </span>
              <p className="m-0 text-body/normal">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="m-0 mt-[18px] text-base text-ink-soft">{copy.index.footnote}</p>
    </section>
  );
};
