import { ChannelChartLegend } from './ChannelChartLegend';
import { ChannelFigure } from './ChannelFigure';
import { drawn } from './channelVisibility';

import type { Dispatch, SetStateAction, ReactNode } from 'react';

import type { ChannelChartCopy, ChartChannel } from './ChannelChart';

/** the front and back drawings, selected channel, and legend controls */
type ChannelFiguresProps = {
  showAll: boolean;
  frontFigure: ReactNode;
  backFigure: ReactNode;
  channels: readonly ChartChannel[];
  cutFilter: string;
  hanLang: string;
  sideZh: { front: string; back: string } | undefined;
  current: ChartChannel;
  copy: ChannelChartCopy;
  setShowAll: Dispatch<SetStateAction<boolean>>;
};

/**
 * groups the front and back figures with their controls
 * @param props the front and back drawings, selected channel, and legend controls
 * @returns the figure pair, course legend, and cartouche
 */
export const ChannelFigures = (props: Readonly<ChannelFiguresProps>): ReactNode => {
  const {
    showAll,
    setShowAll,
    channels,
    frontFigure,
    backFigure,
    current,
    copy,
    cutFilter,
    hanLang,
    sideZh,
  } = props;

  return (
    <div
      className="
        relative flex flex-col gap-5 border-b-[1.5px] border-ink px-4 pt-9 pb-5
        sm:px-5
        lg:border-r-[1.5px] lg:border-b-0
      ">
      <div
        className="
          flex justify-between gap-3
          sm:pr-14
        ">
        <ChannelFigure
          {...{ channels, current, copy, showAll, cutFilter, hanLang, sideZh }}
          body={frontFigure}
          view="front"
        />
        <ChannelFigure
          {...{ channels, current, copy, showAll, cutFilter, hanLang, sideZh }}
          body={backFigure}
          view="back"
        />
      </div>
      {drawn(current) ? null : (
        <p className="m-0 text-[0.95rem] text-ink-soft italic">{copy.noCourse}</p>
      )}
      <ChannelChartLegend {...{ showAll, copy, setShowAll }} />
      <span
        aria-hidden="true"
        className="
          tc vt r1 absolute top-[18px] right-[18px] hidden bg-paper px-[5px]
          py-3 text-xl font-bold tracking-[0.12em]
          sm:block
        ">
        {copy.cartouche}
      </span>
    </div>
  );
};
