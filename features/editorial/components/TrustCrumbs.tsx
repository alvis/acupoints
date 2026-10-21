import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';
import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC } from 'react';

/** One step of the breadcrumb trail; the last step is the current page. */
export type TrustCrumb = {
  label: string;
  /** Han word set before the English label (首, 問答 …); shown on English pages only. */
  zh?: string;
  /** Omitted for the current page or a step without its own route. */
  href?: string;
};

/** Props for {@link TrustCrumbs}; pass the landmark name as `aria-label`. */
export type TrustCrumbsProps = Omit<ComponentPropsWithoutRef<'nav'>, 'children'> & {
  items: readonly TrustCrumb[];
  /** True on Chinese pages: labels set in the Han face, no doubled Han word. */
  zh: boolean;
};

/**
 * Breadcrumb trail separated by fish-tail marks, as on every board.
 * @param props the trust-page breadcrumb trail.
 * @param props.items ordered entries to display
 * @param props.zh whether the page uses Chinese typography.
 * @param props.className additional presentation classes
 */
export const TrustCrumbs: FC<TrustCrumbsProps> = ({ items, zh, className, ...rest }) => (
  <nav className={cn('pt-[22px] text-base', className)} {...rest}>
    <ol
      className="
        m-0 flex list-none flex-wrap items-center gap-x-3.5 gap-y-1 p-0
      ">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        const inner = (
          <>
            {item.zh && !zh ? (
              <span aria-hidden="true" className="tc mr-1.5 font-bold" lang="zh-Hant">
                {item.zh}
              </span>
            ) : null}
            <span className={cn(zh && 'tc')}>{item.label}</span>
          </>
        );

        return (
          <li className="flex items-center gap-3.5" key={item.label}>
            {item.href && !last ? (
              <Link className="wb-link" href={item.href}>
                {inner}
              </Link>
            ) : (
              <span aria-current={last ? 'page' : undefined}>{inner}</span>
            )}
            {last ? null : <FishTail width={18} />}
          </li>
        );
      })}
    </ol>
  </nav>
);
