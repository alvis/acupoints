import { NumberDisc } from '@/components/primitives/NumberDisc';

import type { FC } from 'react';

/** One step of the how-to strip. */
export type RegionStep = {
  title: string;
  body: string;
};

/** Props for {@link RegionSteps}. */
export type RegionStepsProps = {
  /** Han heading introducing the usage steps. */
  zh: string;
  title: string;
  steps: readonly RegionStep[];
  hanLang: string;
};

/**
 * "Three steps from ache to point" (用法): numbered discs over a hairline.
 * @param props numbered usage instructions and their heading
 * @param props.zh Han heading introducing the usage steps
 * @param props.title heading displayed above the content
 * @param props.steps ordered step titles and instructions
 * @param props.hanLang language tag for Han text
 * @returns the three numbered steps from choosing a region to pressing lightly
 */
export const RegionSteps: FC<RegionStepsProps> = ({ zh, title, steps, hanLang }) => (
  <section aria-labelledby="region-steps" className="mt-16">
    <div className="mb-[26px] flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <span aria-hidden="true" className="tc text-[1.875rem] font-black" lang={hanLang}>
        {zh}
      </span>
      <h2
        className="
          m-0 text-[1.6rem] font-medium
          md:text-[2rem]
        "
        id="region-steps">
        {title}
      </h2>
    </div>
    <ol
      className="
        m-0 grid list-none gap-8 border-t border-rule p-0 pt-[22px]
        md:grid-cols-3
      ">
      {steps.map((step, k) => (
        <li className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-3.5" key={step.title}>
          <NumberDisc n={k + 1} size={36} />
          <span className="flex flex-col gap-1">
            <span className="text-xl font-semibold">{step.title}</span>
            <span className="text-body/normal text-ink-soft">{step.body}</span>
          </span>
        </li>
      ))}
    </ol>
  </section>
);
