'use client';

import Link from 'next/link';

import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';

import { SectionLabel } from './SectionLabel';
import { SearchGlyph } from './SiteMenu';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { SectionKey, SectionLink } from './SectionLabel';

interface HeaderNavigationProps {
  locale: Locale;
  sections: readonly SectionLink[];
  active?: SectionKey;
  setSearchOpen: (open: boolean) => void;
}
/**
 * desktop section links and the shortcut that opens the book index.
 * @param props edition, section destinations, current section, and search action
 * @param props.locale edition used for labels and links
 * @param props.sections ordered section destinations
 * @param props.active currently selected book section
 * @param props.setSearchOpen opens the search overlay
 * @returns the desktop navigation and search controls
 */
export const HeaderNavigation: FC<Readonly<HeaderNavigationProps>> = ({
  locale,
  sections,
  active,
  setSearchOpen,
}) => {
  const chrome = getDictionary(locale).chrome;
  const zh = locale !== 'en';

  return (
    <>
      <nav
        aria-label={chrome.mainNav}
        className="
          wb-nav hidden
          lg:block
        ">
        <ul
          className="
            m-0 flex list-none gap-5 p-0 text-[1.02rem]
            xl:gap-6
          ">
          {sections.map(({ key, href }) => (
            <li key={key}>
              <Link
                aria-current={active === key ? 'page' : undefined}
                className="whitespace-nowrap text-ink"
                data-current={active === key ? 'true' : undefined}
                href={href}>
                <SectionLabel locale={locale} section={key} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <span className="flex-1" />

      <button
        aria-label={chrome.searchShortcut}
        className={cn(
          `
            hidden h-10 w-[168px] shrink-0 cursor-pointer items-center gap-2.5
            border-0 bg-transparent px-3 text-base text-ink-soft shadow-rest
            hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
            md:flex
          `,
          // The English section words leave no room for the label until xl.
          !zh && 'lg:max-xl:w-10 lg:max-xl:justify-center lg:max-xl:px-0',
        )}
        type="button"
        onClick={() => setSearchOpen(true)}>
        <SearchGlyph />
        <span className={cn('flex-1 text-left', zh ? 'tc' : `lg:max-xl:hidden`)}>
          {getDictionary(locale).search.openLabel}
        </span>
        <kbd
          className={cn(
            `
              pm px-1.5 py-0.5 text-[0.62rem]
              shadow-[inset_0_0_0_1px_var(--color-ink-micro)]
            `,
            !zh && 'lg:max-xl:hidden',
          )}>
          ⌘K
        </kbd>
      </button>
    </>
  );
};
