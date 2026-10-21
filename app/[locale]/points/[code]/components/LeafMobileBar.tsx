import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';

import type { FC } from 'react';

/** Props for {@link LeafMobileBar}. */
export type LeafMobileBarProps = {
  /** Accessible name of the bar. */
  label: string;
  /** Where the back arrow goes: the leaf's volume, or the index. */
  backHref: string;
  backLabel: string;
  /** The leaf's place, e.g. 卷二 · 第四葉. */
  place: string;
  hanLang: string;
  searchHref: string;
  searchLabel: string;
};

/**
 * The phone leaf's compact header (below `md`, in place of the masthead):
 * back to the volume, the leaf's place between fish tails, and search.
 * @param props parent and search links with the leaf position
 * @param props.label accessible name of the compact leaf navigation
 * @param props.backHref address of the parent channel or points index
 * @param props.backLabel accessible label for returning to the parent channel
 * @param props.place formatted volume and leaf position
 * @param props.hanLang language tag for Han text
 * @param props.searchHref address of the localized search page
 * @param props.searchLabel accessible label of the search link
 * @returns the compact back link, leaf position, and search link
 */
export const LeafMobileBar: FC<LeafMobileBarProps> = ({
  label,
  backHref,
  backLabel,
  place,
  hanLang,
  searchHref,
  searchLabel,
}) => (
  <nav
    aria-label={label}
    className="
      flex h-[54px] items-center gap-2.5 border-b-[1.5px] border-ink px-4
      md:hidden
    ">
    <Link
      aria-label={backLabel}
      className="
        flex size-10 flex-none items-center text-[1.375rem] text-ink
        no-underline
      "
      href={backHref}>
      <span aria-hidden="true">←</span>
    </Link>
    <span className="flex min-w-0 flex-1 items-center justify-center gap-2">
      <FishTail width={16} />
      <span className="tc truncate text-[0.95rem] font-bold" lang={hanLang}>
        {place}
      </span>
      <FishTail up width={16} />
    </span>
    <Link
      aria-label={searchLabel}
      className="flex size-10 flex-none items-center justify-end text-ink"
      href={searchHref}>
      <svg aria-hidden="true" height="20" viewBox="0 0 16 16" width="20">
        <circle cx="6.5" cy="6.5" fill="none" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.4 10.4 L15 15" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </Link>
  </nav>
);
