import Link from 'next/link';

import type { FC } from 'react';

import type { IndexGroup, IndexLeaf } from './indexTypes';

/** Props for {@link AzColumns}. */
export type AzColumnsProps = {
  groups: readonly IndexGroup[];
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  /** BCP-47 tag for Han text. */
  hanLang: string;
};

/**
 * Leaves by pinyin initial: a large letter over each column, names on dotted leaders to their codes.
 * @param props pinyin groups, point records, and Han language
 * @param props.groups ordered browsing groups
 * @param props.leaves point records keyed by code
 * @param props.hanLang language tag for Han text
 * @returns the pinyin initial columns with dotted name leaders
 */
export const AzColumns: FC<AzColumnsProps> = ({ groups, leaves, hanLang }) => (
  <div
    className="
      grid grid-cols-1 gap-x-10 gap-y-8 border-t-[2.5px] border-ink pt-[18px]
      sm:grid-cols-2
      lg:grid-cols-4
    ">
    {groups.map((group) => (
      <section aria-label={group.label} className="flex min-w-0 flex-col" key={group.key}>
        <h3
          className="
            m-0 mb-1.5 border-b-[1.5px] border-ink pb-2 text-[2.5rem]
            leading-none font-medium
          ">
          {group.label}
        </h3>
        <ul className="m-0 list-none p-0">
          {group.codes.map((code) => {
            const leaf = leaves[code];
            if (!leaf) {
              return null;
            }

            return (
              <li key={code}>
                <Link className="wb-link flex items-baseline py-[5px]" href={leaf.href}>
                  <span className="text-lg">{leaf.name}</span>
                  <span className="tc ml-2 text-base" lang={hanLang}>
                    {leaf.han}
                  </span>
                  <span aria-hidden="true" className="lead" />
                  <span className="pm text-xs">{leaf.code}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    ))}
  </div>
);
