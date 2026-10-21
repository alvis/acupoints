import Link from 'next/link';

import { cn } from '@/utilities/cn';
import { localizedRoutes } from '@/utilities/routes';

import { hanLang, homeHan, homeText } from './homeCopy';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link MobileTabBar}. */
export type MobileTabBarProps = {
  locale: Locale;
};

type TabKey = 'today' | 'index' | 'seals' | 'search';

type Tab = { key: TabKey; href: string; han: string; word: string };

/**
 * The phone home board's bottom bar (今日 · 目錄 · 印譜 · 搜): four ruled tabs
 * pinned to the foot of the screen while the front leaf scrolls, released
 * above the scroll-end footer. Hidden from md up, where the masthead shows
 * every section.
 * @param props edition used to build the four phone navigation tabs
 * @param props.locale edition used for labels and links
 */
export const MobileTabBar: FC<MobileTabBarProps> = ({ locale }) => {
  const r = localizedRoutes(locale);
  const t = homeText(locale);
  const han = homeHan(locale);
  const zh = locale !== 'en';
  const tabs: readonly Tab[] = [
    { key: 'today', href: r.home, han: han.tabToday, word: t.tabToday },
    { key: 'index', href: r.points, han: han.tabIndex, word: t.tabIndex },
    { key: 'seals', href: r.seals, han: han.tabSeals, word: t.tabSeals },
    { key: 'search', href: r.search, han: han.tabSearch, word: t.tabSearch },
  ];

  return (
    <nav
      aria-label={t.tabsLabel}
      className="
        sticky bottom-0 z-30 -mx-4 mt-10 border-t-[2.5px] border-ink bg-paper
        pb-[env(safe-area-inset-bottom)]
        sm:-mx-8
        md:hidden
      ">
      <ul className="m-0 flex h-[70px] list-none p-0">
        {tabs.map((tab) => {
          const current = tab.key === 'today';

          return (
            <li className="flex flex-1" key={tab.key}>
              <Link
                aria-current={current ? 'page' : undefined}
                className={cn(
                  `
                    flex flex-1 flex-col items-center gap-0.5 pt-2.5
                    no-underline
                  `,
                  current
                    ? `text-ink shadow-[inset_0_2.5px_0_var(--color-cinnabar)]`
                    : 'text-ink-soft',
                )}
                href={tab.href}>
                <span
                  aria-hidden={zh ? undefined : true}
                  className="tc text-[1.0625rem] font-bold"
                  lang={hanLang(locale)}>
                  {tab.han}
                </span>
                {zh ? null : <span className="text-xs">{tab.word}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
