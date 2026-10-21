'use client';

import Link from 'next/link';

import { cn } from '@/utilities/cn';
import { getDictionary, LOCALE_NAMES } from '@/utilities/i18n/dictionaries';
import { LOCALES, localeToHtmlLang, withLocale } from '@/utilities/routes';

import { rememberLocale, SCRIPT_HINT } from './localeChoice';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

interface LanguageOptionsProps {
  current: Locale;
  bare: string;
  menuId: string;
  setOpen: (open: boolean) => void;
}

/**
 * edition links keep the current leaf while remembering the reader's choice.
 * @param props current edition, unprefixed path, menu identity, and visibility action
 * @param props.current edition currently being read
 * @param props.bare current path without its locale prefix
 * @param props.menuId identifier linking the trigger to its menu
 * @param props.setOpen updates the edition menu visibility
 */
export const LanguageOptions: FC<Readonly<LanguageOptionsProps>> = ({
  current,
  bare,
  menuId,
  setOpen,
}) => {
  const chrome = getDictionary(current).chrome;

  return (
    <div
      className="
        absolute top-[calc(100%+10px)] right-0 z-50 w-[300px] bg-paper p-2
        shadow-[inset_0_0_0_2px_var(--color-ink),0_18px_40px_rgba(29,26,22,0.25)]
      "
      id={menuId}>
      <p className={cn('cap m-0 px-2.5 pt-2 pb-1.5', current === 'en' ? undefined : `
        tc
      `)}>
        {chrome.languageMenuTitle}
      </p>
      <ul className="m-0 list-none p-0">
        {LOCALES.map((locale) => (
          // the colour sits on the <li>: the global `li a { color: inherit }`
          // rule outranks a utility class on the link itself
          <li className={locale === current ? 'text-paper' : 'text-ink'} key={locale}>
            <Link
              aria-current={locale === current ? 'true' : undefined}
              className={cn(
                'flex items-center gap-3 p-2.5 no-underline',
                locale === current
                  ? `
                    bg-ink
                    hover:text-paper
                  `
                  : `hover:bg-paper-raised hover:text-ink`,
              )}
              href={withLocale(locale, bare)}
              hrefLang={localeToHtmlLang(locale)}
              lang={localeToHtmlLang(locale)}
              onClick={() => {
                rememberLocale(locale);
                setOpen(false);
              }}>
              <span className={cn('flex-1 text-lg', locale === 'en' ? undefined : `
                tc
              `)}>
                {LOCALE_NAMES[locale].long}
              </span>
              <span className="text-sm opacity-80">{SCRIPT_HINT[current][locale]}</span>
              <span aria-hidden="true" className={locale === current ? undefined : `
                invisible
              `}>
                ✓
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p
        className={cn(
          `
            m-0 mt-1.5 border-t border-rule px-2.5 pt-2.5 pb-1 text-sm/snug
            text-ink-micro
          `,
          current === 'en' ? undefined : 'tc',
        )}>
        {chrome.languageKeepsPlace}
      </p>
    </div>
  );
};
