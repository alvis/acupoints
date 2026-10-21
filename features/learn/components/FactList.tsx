import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

/** One row of a {@link FactList}. */
export type FactRow = {
  term: string;
  value: ReactNode;
};

/** Props for {@link FactList}. */
export type FactListProps = {
  rows: readonly FactRow[];
  className?: string;
};

/**
 * Ruled definition list of facts under a heavy rule, as the hero boards set it.
 * @param props ruled list of label and value pairs
 * @param props.rows ordered table entries
 * @param props.className additional presentation classes
 * @returns the ruled list of label and value pairs
 */
export const FactList: FC<FactListProps> = ({ rows, className }) => (
  <dl
    className={cn(
      `
        m-0 grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] border-t-[2.5px]
        border-ink text-[1.05rem]
      `,
      className,
    )}>
    {rows.map((row, i) => {
      const edge =
        i === rows.length - 1
          ? 'border-[color:var(--color-ink)]'
          : 'border-[color:var(--color-rule)]';

      return (
        <div className="contents" key={row.term}>
          <dt className={cn('cap border-b py-3', edge)}>{row.term}</dt>
          <dd className={cn('m-0 border-b py-2.5', edge)}>{row.value}</dd>
        </div>
      );
    })}
  </dl>
);
