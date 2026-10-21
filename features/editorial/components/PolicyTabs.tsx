import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC } from 'react';

/** One policy in the tab strip. */
export type PolicyTab = {
  key: string;
  /** One-character Han tag (私, 免, 介, 例). */
  han: string;
  label: string;
  href: string;
};

/** Props for {@link PolicyTabs}; pass the landmark name as `aria-label`. */
export type PolicyTabsProps = Omit<ComponentPropsWithoutRef<'nav'>, 'children'> & {
  tabs: readonly PolicyTab[];
  /** Key of the policy this page shows. */
  current: string;
  zh: boolean;
};

/**
 * The board's tab strip as real navigation: each policy is its own route, so
 * the tabs are links and the current one carries `aria-current="page"`
 * (marked by the inked fill and the cinnabar underline, not colour alone).
 * @param props the policy navigation tabs.
 * @param props.tabs available policy destinations
 * @param props.current the key of the active policy destination.
 * @param props.zh whether the page uses Chinese typography.
 * @param props.className additional presentation classes
 */
export const PolicyTabs: FC<PolicyTabsProps> = ({ tabs, current, zh, className, ...rest }) => (
  <nav className={cn('r1', className)} {...rest}>
    <ul
      className="
        m-0 grid list-none grid-cols-1 p-0
        sm:grid-cols-2
        lg:flex
      ">
      {tabs.map((tab) => {
        const on = tab.key === current;

        return (
          <li key={tab.key}>
            <Link
              aria-current={on ? 'page' : undefined}
              className={cn(
                `
                  flex h-16 items-center gap-3 px-[26px] text-[1.19rem]
                  no-underline
                `,
                on
                  ? `
                    bg-ink text-paper
                    shadow-[inset_0_-4px_0_var(--color-cinnabar)]
                    hover:text-paper
                  `
                  : `
                    text-ink shadow-[inset_0_-1px_0_var(--color-rule)]
                    hover:bg-paper-raised hover:text-ink
                    lg:shadow-[inset_-1px_0_0_var(--color-rule)]
                  `,
              )}
              href={tab.href}>
              <span
                aria-hidden="true"
                className={cn('tc text-[1.38rem] font-black', on ? 'text-paper' : `
                  text-seal
                `)}>
                {tab.han}
              </span>
              <span className={cn(zh && 'tc')}>{tab.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);
