import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { ChartPoint, PointChartProps } from './PointChart';

type ChartCardProps = Pick<PointChartProps, 'copy' | 'hanLang' | 'english'> & {
  current: ChartPoint;
  isSealed: (code: string) => boolean;
};

export const ChartCard: FC<Readonly<ChartCardProps>> = ({
  current,
  copy,
  hanLang,
  english,
  isSealed,
}) => (
  <div
    aria-live="polite"
    className="
      grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-3
      bg-paper-raised p-4 shadow-[inset_3px_0_0_var(--color-cinnabar)]
      sm:grid-cols-[auto_minmax(0,1fr)_auto]
    ">
    <span className="tc text-[2.75rem] leading-none font-black" lang={hanLang}>
      {current.hanzi}
    </span>
    <span className="flex min-w-0 flex-col gap-1">
      <span className="text-[1.375rem] font-medium">
        {current.name} <span className="pm text-[0.75rem] text-ink-micro">{current.code}</span>
      </span>
      <span className={cn('text-base/snug', english ? undefined : `tc`)}>{current.where}</span>
      <span className="text-sm text-ink-micro">
        {isSealed(current.code) ? copy.sealed : copy.notSealed}
      </span>
    </span>
    <Link
      className="
        btn btn-primary col-span-2 justify-self-start px-3.5 py-2.5
        text-[0.95rem]
        sm:col-span-1
      "
      href={current.href}>
      {copy.openLeaf} →
    </Link>
  </div>
);
