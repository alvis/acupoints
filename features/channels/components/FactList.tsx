import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

/** One row of a {@link FactList}. */
export type Fact = {
  term: string;
  /** Bold Han word set before the value (十二經, 金 …). */
  zh?: string;
  value: ReactNode;
};

/** Props for {@link FactList}. */
export type FactListProps = {
  facts: readonly Fact[];
  /** BCP-47 tag for the Han words. */
  hanLang: string;
};

/**
 * Heavy-ruled facts table: mono caps terms beside their values.
 * @param props the ordered facts and Han language tag
 * @param props.facts ordered label and value pairs
 * @param props.hanLang the BCP-47 tag for Han text
 * @returns the ruled definition list of channel facts
 */
export const FactList: FC<FactListProps> = ({ facts, hanLang }) => (
  <dl
    className="
      m-0 grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] border-t-[2.5px]
      border-ink text-[1.0625rem]
    ">
    {facts.map((fact, index) => {
      const rule =
        index === facts.length - 1
          ? 'border-[color:var(--color-ink)]'
          : 'border-[color:var(--color-rule)]';

      return (
        <div className="contents" key={fact.term}>
          <dt className={cn('cap border-b py-3 pr-3', rule)}>{fact.term}</dt>
          <dd className={cn('m-0 border-b py-2.5', rule)}>
            {fact.zh ? (
              <span className="tc mr-1.5 font-bold" lang={hanLang}>
                {fact.zh}
              </span>
            ) : null}
            {fact.value}
          </dd>
        </div>
      );
    })}
  </dl>
);
