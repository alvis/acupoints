import Link from 'next/link';

import { SealedSquare } from '@/features/points/components/SealedSquare';

import type { FC } from 'react';

import type { IndexLeaf } from './indexTypes';

/** Props for {@link LeafLinks}. */
export type LeafLinksProps = {
  leaves: readonly IndexLeaf[];
  /** BCP-47 tag for Han text. */
  hanLang: string;
  sealedLabel: string;
};

/**
 * A compact grid of leaf links: Han name, reading and code, with the reader's seal.
 * @param props point records, Han language, and seal label
 * @param props.leaves point records keyed by code
 * @param props.hanLang language tag for Han text
 * @param props.sealedLabel accessible label for a sealed point
 * @returns the point links with their codes and seal indicators
 */
export const LeafLinks: FC<LeafLinksProps> = ({ leaves, hanLang, sealedLabel }) => (
  <ul
    className="
      m-0 grid list-none grid-cols-2 gap-2 p-0
      sm:grid-cols-3
      xl:grid-cols-4
    ">
    {leaves.map((leaf) => (
      <li key={leaf.code}>
        <Link
          className="
            relative flex min-w-0 flex-col gap-0.5 px-3 py-2
            shadow-[inset_0_0_0_1px_var(--color-ink)]
            hover:bg-paper-raised
          "
          href={leaf.href}>
          <span className="pm text-[0.6875rem]">{leaf.code}</span>
          <span className="tc text-lg font-bold" lang={hanLang}>
            {leaf.han}
          </span>
          <span className="truncate text-[0.95rem]">{leaf.name}</span>
          <SealedSquare className="absolute top-2 right-2" code={leaf.code} label={sealedLabel} />
        </Link>
      </li>
    ))}
  </ul>
);
