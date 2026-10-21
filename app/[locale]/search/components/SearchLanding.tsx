import { TrustCrumbs } from '@/features/editorial/components/TrustCrumbs';
import { TrustHero } from '@/features/editorial/components/TrustHero';
import { TrustPage } from '@/features/editorial/components/TrustPage';
import { COMMON_COPY, hanText, translator } from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';
import { localizedRoutes } from '@/utilities/routes';

import { SEARCH_COPY } from '../copy';

import { SearchOpener } from './SearchOpener';

import type { FC } from 'react';

import type { TrustCrumb } from '@/features/editorial/components/TrustCrumbs';
import type { Locale } from '@/utilities/routes';

/** Props for {@link SearchLanding}. */
export type SearchLandingProps = { locale: Locale };

/**
 * 檢索 (board WbSearch): the search window is the board; this page is its
 * permanent address. It names what can be searched, opens the window on load
 * and keeps a button to reopen it.
 * @param props reading locale for search guidance and navigation
 * @param props.locale edition used for labels and links
 */
export const SearchLanding: FC<SearchLandingProps> = ({ locale }) => {
  const t = translator(locale);
  const han = hanText(locale);
  const zh = locale !== 'en';
  const r = localizedRoutes(locale);
  const crumbs: readonly TrustCrumb[] = [
    { href: r.home, zh: '首', label: t(COMMON_COPY.home) },
    { zh: '檢索', label: t(SEARCH_COPY.crumb) },
  ];

  return (
    <TrustPage>
      <TrustCrumbs aria-label={t(COMMON_COPY.breadcrumb)} items={crumbs} zh={zh} />
      <TrustHero
        cap={t(SEARCH_COPY.cap)}
        capZh={han('尋葉')}
        lead={
          <p
            className={cn(
              `
                m-0 max-w-[640px] text-[1.15rem] leading-normal text-ink-soft
                sm:text-[1.25rem]
              `,
              zh && 'tc',
            )}>
            {t(SEARCH_COPY.lead)}
          </p>
        }
        title={t(SEARCH_COPY.title)}
        vertical={han('檢索')}
        zh={zh}
      />
      <div className="mt-10 flex flex-col items-start gap-4">
        <SearchOpener label={t(SEARCH_COPY.open)} locale={locale} zh={zh} />
        <p className={cn('m-0 text-base text-ink-micro', zh && `tc`)}>{t(SEARCH_COPY.shortcut)}</p>
      </div>
    </TrustPage>
  );
};
