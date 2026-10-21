'use client';

import Link from 'next/link';

import { useSeals } from '@/components/headless/useSeals';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import { LanguageIcon } from './LanguageIcon';
import { LanguageLinks } from './LanguageLinks';
import { SectionLabel } from './SectionLabel';

import type { FC, PropsWithChildren } from 'react';

import type { Locale } from '@/utilities/routes';

import type { SectionKey, SectionLink } from './SectionLabel';

/** Props for {@link SiteMenu}. */
export type SiteMenuProps = {
  id: string;
  locale: Locale;
  sections: readonly SectionLink[];
  active?: SectionKey;
  sealsCurrent: boolean;
  /** Close the menu and open the search dialog. */
  onSearch: () => void;
};

const ROW = 'flex items-center gap-3 py-3.5 text-[color:var(--color-ink)] no-underline';

/**
 * The masthead folded for phones and tablets (WbMobileMenu): the language
 * choice first, search, the five sections with a note under each, My seals
 * with its live count and reading streak, and the small print. Seal state lives in this browser
 * only, so the count reads 0 until storage is read.
 * @param props menu identity, edition, current destination, section links, and search action
 * @param props.id identifier linking the menu to its trigger
 * @param props.locale edition used for labels and links
 * @param props.sections ordered section destinations
 * @param props.active currently selected book section
 * @param props.sealsCurrent whether the seal book is the current page
 * @param props.onSearch action that opens the search overlay
 */
export const SiteMenu: FC<SiteMenuProps> = ({
  id,
  locale,
  sections,
  active,
  sealsCurrent,
  onSearch,
}) => {
  const chrome = getDictionary(locale).chrome;
  const r = localizedRoutes(locale);
  const { codes, streak, ready } = useSeals();
  const zh = locale !== 'en';
  const small = [
    { key: 'about', href: r.about, label: chrome.menu.links.about },
    { key: 'faq', href: r.faq, label: chrome.menu.links.faq },
    { key: 'disclaimer', href: r.disclaimer, label: chrome.menu.links.disclaimer },
    { key: 'privacy', href: r.privacy, label: chrome.menu.links.privacy },
    { key: 'changelog', href: r.changelog, label: chrome.menu.links.changelog },
  ] as const;

  return (
    <div
      className="
        absolute inset-x-0 top-full z-50 bg-paper px-4 pt-5 pb-8
        shadow-[0_18px_40px_rgba(29,26,22,0.25)]
        sm:px-8
        lg:hidden
      "
      id={id}>
      <section aria-labelledby={`${id}-lang`} className="mb-6">
        <h2
          className="m-0 mb-2.5 flex items-center gap-2 text-base font-semibold"
          id={`${id}-lang`}>
          <LanguageIcon />
          {chrome.language}
        </h2>
        <LanguageLinks current={locale} />
        <p className={cn('m-0 mt-2 text-sm text-ink-micro', zh && `tc`)}>
          {chrome.languageKeepsPlace}
        </p>
      </section>
      <button
        className="
          mb-5 flex h-11 w-full cursor-pointer items-center gap-2.5 border-0
          bg-transparent px-3 text-base text-ink-soft shadow-rest
        "
        type="button"
        onClick={onSearch}>
        <SearchGlyph />
        <span className={cn(zh && 'tc')}>{chrome.menu.search}</span>
      </button>
      <nav aria-label={chrome.mainNav}>
        <ul className="m-0 list-none border-t-[2.5px] border-ink p-0">
          {sections.map(({ key, href }) => (
            <MenuRow
              current={active === key}
              href={href}
              key={key}
              note={chrome.menu.notes[key]}
              zh={zh}>
              <SectionLabel locale={locale} section={key} />
            </MenuRow>
          ))}
          <MenuRow
            current={sealsCurrent}
            href={r.seals}
            note={`${chrome.menu.sealsLine.replace('{n}', String(ready ? codes.length : 0))}${
              ready && streak > 0 ? chrome.menu.sealsStreak.replace('{n}', String(streak)) : ''
            }`}
            zh={zh}>
            <span className={cn(zh && 'tc')}>{chrome.seals}</span>
          </MenuRow>
        </ul>
      </nav>
      <ul
        className="
          m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[0.95rem]
        ">
        {small.map((link) => (
          <li key={link.key}>
            <Link className={cn('wb-link text-ink-soft', zh && `tc`)} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

type MenuRowProps = PropsWithChildren<{
  href: string;
  current: boolean;
  note: string;
  zh: boolean;
}>;

const MenuRow: FC<MenuRowProps> = ({ href, current, note, zh, children }) => (
  <li className="border-b border-rule">
    <Link aria-current={current ? 'page' : undefined} className={ROW} href={href}>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[1.2rem]">{children}</span>
        <span className={cn('text-sm text-ink-micro', zh && `tc`)}>{note}</span>
      </span>
      <span aria-hidden="true" className={current ? 'text-(--color-cinnabar)' : undefined}>
        →
      </span>
    </Link>
  </li>
);

/** The magnifier drawn in the masthead's search field. */
export const SearchGlyph: FC = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
    <circle cx="6.5" cy="6.5" fill="none" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.4 10.4 L15 15" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
