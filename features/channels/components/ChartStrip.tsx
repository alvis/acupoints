import { FishTail } from '@/components/primitives/FishTail';

import type { FC } from 'react';

import type { PointChartProps } from './PointChart';

export const ChartStrip: FC<Readonly<Pick<PointChartProps, 'strip'>>> = ({ strip }) => (
  <div
    aria-hidden="true"
    className="
      hidden flex-col items-center gap-3 border-r-[1.5px] border-ink py-3
      lg:flex
    ">
    <span className="h-10 w-1.5 bg-ink" />
    <FishTail />
    <span className="tc vt text-base font-bold tracking-[0.2em]">{strip.title}</span>
    <span className="flex-1" />
    <span className="tc vt text-sm tracking-[0.2em]">{strip.middle}</span>
    <FishTail up />
    <span className="tc text-base font-bold">{strip.foot}</span>
  </div>
);
