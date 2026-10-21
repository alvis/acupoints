import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One breadcrumb step: a Han word set before its label. */
export type Crumb = {
  href: string;
  label: string;
  /** Han word before the label; decorative. */
  han?: string;
};

/** Props for {@link Crumbs}. */
export type CrumbsProps = {
  items: readonly Crumb[];
  /** Accessible name of the breadcrumb landmark. */
  label: string;
  className?: string;
};

/**
 * Woodblock breadcrumb trail: Han word and label per step, separated by small
 * fish-tail marks. The last step is the current page.
 * @param props ordered breadcrumb links and navigation label
 * @param props.items ordered breadcrumb links
 * @param props.label accessible label for the navigation or progress indicator
 * @param props.className additional classes for the outer element
 */
export const Crumbs: FC<CrumbsProps> = ({ items, label, className }) => (
  <nav aria-label={label} className={cn('text-base', className)}>
    <ol
      className="
        m-0 flex list-none flex-wrap items-center gap-x-3.5 gap-y-1 p-0
      ">
      {items.map((item, i) => {
        const face = (
          <>
            {item.han ? (
              <span aria-hidden="true" className="tc mr-1.5 font-bold">
                {item.han}
              </span>
            ) : null}
            {item.label}
          </>
        );

        return (
          <li className="flex items-center gap-3.5" key={item.href}>
            {i === items.length - 1 ? (
              <span aria-current="page">{face}</span>
            ) : (
              <>
                <Link className="wb-link text-ink" href={item.href}>
                  {face}
                </Link>
                <FishTail width={18} />
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
