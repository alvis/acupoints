import { fill } from '@/features/conditions/format';
import { hanNumeral } from '@/utilities/hanNumeral';

import { RoutineBlock } from './RoutineBlock';

import type { ReactNode } from 'react';

import type { ConditionLabel, ConditionsCopy } from '@/features/conditions/copy';
import type { RoutineFacts, RoutinePoint } from '@/features/conditions/data';

/** ordered points, routine advice, and localized count labels */
interface ConditionRoutineProps {
  label: ConditionLabel;
  copy: ConditionsCopy;
  set: RoutinePoint[];
  routine: RoutineFacts | undefined;
}

/**
 * renders ordered point set with its pressing order and count
 * @param props ordered points, routine advice, and localized count labels
 * @returns the ordered point set with its pressing order and count
 */
export const ConditionRoutine = (props: Readonly<ConditionRoutineProps>): ReactNode => {
  const { label, copy, set, routine } = props;

  return (
    <section aria-labelledby="the-set" className="mt-12">
      <h2 className="sr-only" id="the-set">
        {`${label.slip} · ${fill(copy.condition.pointsBothSides, { n: set.length })}`}
      </h2>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-1 px-2.5 pb-2.5">
        <p className="red m-0 max-w-176 text-base italic">
          {routine?.order ?? copy.condition.orderNote}
        </p>
        <span className="flex-1" />
        <p className="m-0 text-[0.95rem] text-ink-soft">
          <span aria-hidden="true" className="tc font-bold">
            {`${hanNumeral(set.length)}穴`}
          </span>{' '}
          · {fill(copy.shared.pointsCount, { n: set.length })}
        </p>
      </div>
      <RoutineBlock
        leaf={copy.shared.leaf}
        plateLabel={copy.condition.plateLabel}
        points={set}
        pregnancyNote={copy.shared.pregnancyNote}
        slip={label.slip}
        stopLine={copy.condition.stopLine}
        strip={copy.condition.strip}
      />
    </section>
  );
};
