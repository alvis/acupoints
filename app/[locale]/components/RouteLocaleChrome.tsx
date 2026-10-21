'use client';

import { useEffect } from 'react';

import { WoodcutDefs } from '@/components/primitives/WoodcutDefs';
import { useRouteLocale } from '@/features/editorial/hooks/useRouteLocale';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localeToHtmlLang } from '@/utilities/routes';

import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link RouteLocaleChrome}. */
export type RouteLocaleChromeProps = PropsWithChildren;

/**
 * The masthead and scroll-end footer for documents rendered outside the
 * locale layout (the exported 404, which a static host serves for every
 * unknown URL). The locale comes from the URL's first segment, so a missing
 * page under /zh-hant/ keeps the Traditional chrome.
 * @param props page content to surround with URL-derived locale chrome
 * @param props.children nested page content
 * @returns the locale-aware masthead, page content, and scroll-end footer
 */
export const RouteLocaleChrome: FC<RouteLocaleChromeProps> = ({ children }) => {
  const locale = useRouteLocale();
  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  return (
    <>
      <WoodcutDefs />
      <a className="skip-link" href="#main">
        {getDictionary(locale).chrome.skipToContent}
      </a>
      <SiteHeader locale={locale} />
      <main className="relative z-1" id="main">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
};
