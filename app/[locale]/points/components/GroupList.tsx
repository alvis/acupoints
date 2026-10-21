import Link from 'next/link';

import { LeafLinks } from './LeafLinks';

import type { FC } from 'react';

import type { IndexGroup, IndexLeaf } from './indexTypes';

/** Props for {@link GroupList}. */
export type GroupListProps = {
  heading: string;
  groups: readonly IndexGroup[];
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  /** BCP-47 tag for Han text. */
  hanLang: string;
  showHan: boolean;
  sealedLabel: string;
  /** Text of the link on a group heading that has a page. */
  openLabel?: string;
};

/**
 * Titled groups of leaves (by carved plate, by condition), each a ruled block.
 * @param props group headings, point records, and link labels
 * @param props.heading heading above the grouped point lists
 * @param props.groups ordered browsing groups
 * @param props.leaves point records keyed by code
 * @param props.hanLang language tag for Han text
 * @param props.showHan whether Han labels accompany English copy
 * @param props.sealedLabel accessible label for a sealed point
 * @param props.openLabel label linking to the group page
 * @returns the titled groups of linked point leaves
 */
export const GroupList: FC<GroupListProps> = ({
  heading,
  groups,
  leaves,
  hanLang,
  showHan,
  sealedLabel,
  openLabel,
}) => (
  <div className="flex min-w-0 flex-col gap-8">
    <h2
      className="
        m-0 border-b-[1.5px] border-ink pb-2.5 text-[1.375rem] font-medium
      ">
      {heading}
    </h2>
    {groups.map((group) => {
      const listed = group.codes
        .map((c) => leaves[c])
        .filter((leaf): leaf is IndexLeaf => leaf !== undefined);

      return (
        <section
          aria-labelledby={`group-${group.key}`}
          className="flex flex-col gap-3"
          key={group.key}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="m-0 text-xl font-medium" id={`group-${group.key}`}>
              {group.han ? (
                <span className="tc mr-2 font-bold" lang={hanLang}>
                  {group.han}
                </span>
              ) : null}
              {showHan || !group.han ? group.label : null}
            </h3>
            {group.href && openLabel ? (
              <Link className="wb-link text-[0.95rem]" href={group.href}>
                {openLabel} →
              </Link>
            ) : null}
          </div>
          <LeafLinks hanLang={hanLang} leaves={listed} sealedLabel={sealedLabel} />
        </section>
      );
    })}
  </div>
);
