import Link from 'next/link';

import { RoutineSlip } from './RoutineSlip';

import type { ReactNode } from 'react';

import type { ProtocolsCopy } from '@/features/conditions/copy';
import type { localizedRoutes } from '@/utilities/routes';

import type { Fact } from './protocolsIndexModel';
import type { RoutineSlipProps } from './RoutineSlip';

/** localized legend, prescription slips, and condition routes */
interface RoutineSlipsProps {
  text: ProtocolsCopy;
  legend: Fact[];
  slips: RoutineSlipProps[];
  r: ReturnType<typeof localizedRoutes>;
}

/**
 * renders slip legend, prescription grid, and conditions link
 * @param props localized legend, prescription slips, and condition routes
 * @returns the slip legend, prescription grid, and conditions link
 */
export const RoutineSlips = (props: Readonly<RoutineSlipsProps>): ReactNode => {
  const { text, legend, slips, r } = props;

  return (
    <section aria-labelledby="routine-slips" className="mt-12">
      <div
        className="
          flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-ink py-3.5
          text-base
        ">
        <span className="cap">{text.legendTitle}</span>
        {legend.map((item) => (
          <span className="flex items-center gap-2" key={item.label}>
            <span
              aria-hidden="true"
              className="
                tc grid size-7 place-items-center text-[0.95rem] font-bold
                shadow-rest
              ">
              {item.label}
            </span>
            {item.value}
          </span>
        ))}
      </div>

      <h2 className="sr-only" id="routine-slips">
        {text.listTitle}
      </h2>

      <div
        className="
          mt-7 grid gap-x-8 gap-y-9
          md:grid-cols-2
          lg:grid-cols-3
        ">
        {slips.map((slip) => (
          <RoutineSlip key={slip.id} {...slip} />
        ))}
      </div>

      <p className="m-0 mt-[22px] text-base text-ink-soft">
        {text.footnote}{' '}
        <Link className="text-ink underline underline-offset-[3px]" href={r.conditions}>
          {text.readConditions}
        </Link>
      </p>
    </section>
  );
};
