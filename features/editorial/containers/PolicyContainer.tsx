import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';
import { formatDate } from '@/utilities/i18n/date';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import { PolicyAside } from '../components/PolicyAside';
import { PolicySheet } from '../components/PolicySheet';
import { PolicyTabs } from '../components/PolicyTabs';
import { TrustCrumbs } from '../components/TrustCrumbs';
import { TrustHero } from '../components/TrustHero';
import { TrustPage } from '../components/TrustPage';
import { COMMON_COPY, fill, hanText, POLICY_COPY, translator } from '../copy';

import type { FC, ReactNode } from 'react';

import type { Locale } from '@/utilities/routes';

import type { PolicyAsideLabels } from '../components/PolicyAside';
import type { PolicyClause } from '../components/PolicySheet';
import type { PolicyTab } from '../components/PolicyTabs';
import type { TrustCrumb } from '../components/TrustCrumbs';

const MONTH_START = 5;
const MONTH_END = 7;

/** The four policy routes that share this container. */
export type PolicyKey = 'privacy' | 'disclaimer' | 'affiliate' | 'editorial';

/** Props for {@link PolicyContainer}: the document's own text and dates, in the page's language. */
export type PolicyContainerProps = {
  locale: Locale;
  current: PolicyKey;
  /** Version as the document states it, e.g. "1.0". */
  version: string;
  /** Last-updated date, ISO `YYYY-MM-DD`. */
  updated: string;
  /** The "in short" summary. */
  summary: ReactNode;
  clauses: readonly PolicyClause[];
};

/** Two-character Han names of the documents, as on the board. */
const DOCUMENT_HAN: Record<PolicyKey, string> = {
  privacy: '私隱',
  disclaimer: '免責',
  affiliate: '薦介',
  editorial: '凡例',
};

const DATE_STYLE: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

/**
 * 規約: one shared policy look (board WbLegal). Resolves the localized chrome
 * and composes crumbs, hero, link tabs, the document sheet and its margin.
 * Each document passes its text already resolved for the page's language.
 * @param props the localized policy page.
 * @param props.locale page language and writing system
 * @param props.current the policy route whose document and tab are active.
 * @param props.version version as the document states it, e.g. "1.0".
 * @param props.updated last-updated date, ISO `YYYY-MM-DD`.
 * @param props.summary brief introductory text
 * @param props.clauses ordered policy sections
 */
export const PolicyContainer: FC<PolicyContainerProps> = ({
  locale,
  current,
  version,
  updated,
  summary,
  clauses,
}) => {
  const t = translator(locale);
  const han = hanText(locale);
  const zh = locale !== 'en';
  const r = localizedRoutes(locale);
  const links = getDictionary(locale).chrome.footer.links;
  const tabs: readonly PolicyTab[] = [
    { key: 'privacy', han: '私', label: links.privacy, href: r.privacy },
    { key: 'disclaimer', han: '免', label: links.disclaimer, href: r.disclaimer },
    { key: 'affiliate', han: '介', label: links.affiliate, href: r.affiliate },
    {
      key: 'editorial',
      han: '例',
      label: t(POLICY_COPY.editorialTab),
      href: r.editorialPolicy,
    },
  ];
  const active = tabs.find((tab) => tab.key === current) ?? tabs[0];
  const crumbs: readonly TrustCrumb[] = [
    { href: r.home, zh: '首', label: t(COMMON_COPY.home) },
    { zh: '規約', label: t(POLICY_COPY.crumb) },
    { label: active.label },
  ];
  const count = zh ? hanNumeral(clauses.length) : String(clauses.length);
  const asideLabels: PolicyAsideLabels = {
    aside: t(POLICY_COPY.docAside),
    lastUpdated: t(POLICY_COPY.lastUpdated),
    clauses: fill(t(POLICY_COPY.clauses), { n: count }),
    recordLink: t(POLICY_COPY.recordLink),
    emergencyTitle: t(POLICY_COPY.emergencyTitle),
    emergencyBody: t(POLICY_COPY.emergencyBody),
    questions: t(POLICY_COPY.questions),
    revised: han('改訂'),
  };
  const lead = (
    <p
      className={cn(
        `
          m-0 max-w-[640px] text-[1.15rem] leading-normal text-ink-soft
          sm:text-[1.25rem]
        `,
        zh && 'tc',
      )}>
      {t(POLICY_COPY.intro)}
    </p>
  );

  return (
    <TrustPage>
      <TrustCrumbs aria-label={t(COMMON_COPY.breadcrumb)} items={crumbs} zh={zh} />
      <TrustHero
        cap={t(POLICY_COPY.cap)}
        capZh={han('規約')}
        lead={lead}
        title={t(POLICY_COPY.title)}
        vertical={han('規約')}
        zh={zh}
      />
      <section className="mt-11">
        <PolicyTabs aria-label={t(POLICY_COPY.tabs)} current={current} tabs={tabs} zh={zh} />
        <div
          className="
            mt-9 grid items-start gap-12
            lg:grid-cols-[minmax(0,1fr)_330px]
          ">
          <PolicySheet
            clauseWord={han('條')}
            clauses={clauses}
            han={DOCUMENT_HAN[current]}
            inShort={t(POLICY_COPY.inShort)}
            route={`${active.href}/`}
            stripTitle={han('經穴圖 · 規約')}
            summary={summary}
            title={active.label}
            zh={zh}
          />
          <PolicyAside
            changelogHref={r.changelog}
            labels={asideLabels}
            month={hanNumeral(Number(updated.slice(MONTH_START, MONTH_END)))}
            updated={updated}
            updatedLabel={formatDate(new Date(`${updated}T00:00:00Z`), locale, {
              ...DATE_STYLE,
              timeZone: 'UTC',
            })}
            version={fill(t(POLICY_COPY.version), { v: version })}
            zh={zh}
          />
        </div>
      </section>
    </TrustPage>
  );
};
