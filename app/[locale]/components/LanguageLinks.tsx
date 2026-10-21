'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utilities/cn';
import { LOCALE_NAMES } from '@/utilities/i18n/dictionaries';
import { LOCALES, localeToHtmlLang, stripLocale, withLocale } from '@/utilities/routes';

import { rememberLocale } from './localeChoice';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link LanguageLinks}. */
export type LanguageLinksProps = {
  /** The edition being read. */
  current: Locale;
  className?: string;
};

/**
 * The three editions as a stacked list of ruled buttons, for the scroll-end
 * footer and the mobile menu. Same deep-path targets as the masthead menu.
 * @param props current edition and optional list styling
 * @param props.current edition currently being read
 * @param props.className additional wrapper classes
 */
export const LanguageLinks: FC<LanguageLinksProps> = ({ current, className }) => {
  const pathname = usePathname() as string | null;
  const bare = stripLocale(pathname ?? '/');

  return (
    <ul className={cn('m-0 flex list-none flex-col gap-1.5 p-0', className)}>
      {LOCALES.map((locale) => (
        <li key={locale}>
          <Link
            aria-current={locale === current ? 'true' : undefined}
            className={cn('wb-lang', locale === 'en' ? undefined : 'tc')}
            href={withLocale(locale, bare)}
            hrefLang={localeToHtmlLang(locale)}
            lang={localeToHtmlLang(locale)}
            onClick={() => rememberLocale(locale)}>
            <span className="flex-1">{LOCALE_NAMES[locale].long}</span>
            {locale === current ? <span aria-hidden="true">✓</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
};
