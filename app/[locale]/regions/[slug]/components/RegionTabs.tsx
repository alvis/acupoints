import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One region in the tab row. */
export type RegionTab = {
  slug: string;
  href: string;
  glyph: string;
  name: string;
  count: string;
};

/** Props for {@link RegionTabs}. */
export type RegionTabsProps = {
  label: string;
  tabs: readonly RegionTab[];
  current: string;
  hanLang: string;
};

/**
 * The ten regions as a row of links, the current one marked.
 * @param props body-part destinations and active slug
 * @param props.label accessible name of the region navigation
 * @param props.tabs the ten region labels and destinations
 * @param props.current slug of the current body region
 * @param props.hanLang language tag for Han text
 * @returns the region navigation row with the current region marked
 */
export const RegionTabs: FC<RegionTabsProps> = ({ label, tabs, current, hanLang }) => (
  <nav aria-label={label} className="mt-11">
    <ul
      className="
        m-0 grid list-none grid-cols-5 border-t-[2.5px] border-b border-ink p-0
        lg:grid-cols-10
      ">
      {tabs.map((tab) => {
        const on = tab.slug === current;

        return (
          <li className="border-r border-[rgba(29,26,22,0.25)]" key={tab.slug}>
            <Link
              aria-current={on ? 'page' : undefined}
              className={cn(
                `
                  flex min-h-11 flex-col items-center gap-1.5 px-1 pt-3.5 pb-3
                  text-ink no-underline
                `,
                on
                  ? `
                    bg-paper-raised
                    shadow-[inset_0_-3px_0_var(--color-cinnabar)]
                  `
                  : 'hover:bg-paper-raised',
              )}
              href={tab.href}>
              <span
                aria-hidden="true"
                className="tc text-2xl leading-none font-black"
                lang={hanLang}>
                {tab.glyph}
              </span>
              <span className="text-[1.0625rem]">{tab.name}</span>
              <span className="pm text-[0.6875rem] text-ink-micro">{tab.count}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);
