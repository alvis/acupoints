import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';

import type { FC } from 'react';

/** One breadcrumb step; the last one is the current page. */
export type LearnCrumb = {
  href: string;
  label: string;
  /** Han word set before the label (English pages only). */
  zh?: string;
};

/** Props for {@link LearnCrumbs}. */
export type LearnCrumbsProps = {
  items: readonly LearnCrumb[];
  /** Accessible name of the breadcrumb landmark. */
  label: string;
};

/**
 * Breadcrumbs with fish-tail separators, as the Learn boards set them.
 * @param props breadcrumb links separated by fish tails
 * @param props.items ordered entries to display
 * @param props.label accessible name for the illustration
 * @returns the breadcrumb links separated by fish tails
 */
export const LearnCrumbs: FC<LearnCrumbsProps> = ({ items, label }) => (
  <nav aria-label={label} className="pt-5 text-base">
    <ol
      className="
        m-0 flex list-none flex-wrap items-center gap-x-3.5 gap-y-1 p-0
      ">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const body = (
          <>
            {item.zh ? (
              <span className="tc mr-1.5 font-bold" lang="zh-Hant">
                {item.zh}
              </span>
            ) : null}
            {item.label}
          </>
        );

        return (
          <li className="flex items-center gap-3.5" key={item.href}>
            {last ? (
              <span aria-current="page">{body}</span>
            ) : (
              <Link className="wb-link" href={item.href}>
                {body}
              </Link>
            )}
            {last ? null : <FishTail width={18} />}
          </li>
        );
      })}
    </ol>
  </nav>
);
