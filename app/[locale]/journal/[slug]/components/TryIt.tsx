import type { FC } from 'react';

import type { CunGuide } from './cunGuide';
/** Props for {@link TryIt}. */
export type TryItProps = {
  tryIt: CunGuide['tryIt'];
};

/**
 * The board's "試 · Try it" box: three steps to Neiguan (PC6) with the guide's own fingers.
 * @param props three steps for locating Neiguan
 * @param props.tryIt heading and three steps for locating Neiguan
 * @returns the three steps for locating Neiguan
 */
export const TryIt: FC<TryItProps> = ({ tryIt }) => (
  <aside aria-labelledby="try" className="
    r1 flex flex-col gap-2.5 bg-paper-raised px-6 py-[22px]
  ">
    <span className="flex items-baseline gap-3">
      <span aria-hidden="true" className="tc red text-[1.875rem] font-black">
        {tryIt.han}
      </span>
      <h2 className="m-0 text-[1.6rem] font-medium" id="try">
        {tryIt.title}
      </h2>
    </span>
    <ol className="m-0 pl-[22px] text-[1.05rem] leading-normal">
      {tryIt.steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
    <span className="text-base leading-[1.45] text-ink-soft">{tryIt.note}</span>
  </aside>
);
