import { cn } from '@/utilities/cn';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type { ChannelChartCopy } from './ChannelChart';

/** the legend labels, background-course visibility, and toggle callback */
interface ChannelChartLegendProps {
  showAll: boolean;
  copy: ChannelChartCopy;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

/**
 * explains channel marks and toggles the background courses
 * @param props the legend labels, background-course visibility, and toggle callback
 * @returns the course legend and show-all toggle
 */
export const ChannelChartLegend = (props: Readonly<ChannelChartLegendProps>): ReactNode => {
  const { showAll, copy, setShowAll } = props;

  return (
    <div
      className="
        mt-auto flex flex-wrap items-center gap-x-[18px] gap-y-2 text-sm
        text-ink-soft
      ">
      {showAll ? (
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="
            w-[22px] border-t-[1.5px] border-ink-soft
          " />
          {copy.legendChannel}
        </span>
      ) : null}
      <span className="flex items-center gap-1.5">
        <span aria-hidden="true" className="
          w-[22px] border-t-[3px] border-(--color-cinnabar)
        " />
        {copy.legendPicked}
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden="true" className="
          size-2.5 rounded-full bg-(--color-cinnabar)
        " />
        {copy.legendFirst}
      </span>
      <span className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="
            size-2.5 rounded-full shadow-[inset_0_0_0_2px_var(--color-cinnabar)]
          "
        />
        {copy.legendLast}
      </span>
      <button
        aria-pressed={showAll}
        className="
          flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0
          text-sm text-ink
        "
        type="button"
        onClick={() => setShowAll((on) => !on)}>
        <span aria-hidden="true" className={cn('size-3.5 shadow-rest', showAll && `
          bg-ink
        `)} />
        <span className="wb-link">{copy.showAll}</span>
      </button>
      <span className="flex-1" />
      <span className="italic">{copy.approx}</span>
    </div>
  );
};
