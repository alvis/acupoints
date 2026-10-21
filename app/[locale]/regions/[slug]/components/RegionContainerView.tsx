import { Breadcrumbs } from '@/components/composites/Breadcrumbs';
import { EditorialView } from '@/components/composites/EditorialView';
import { Speakable } from '@/components/primitives/Speakable';
import { PointChart } from '@/features/channels/components/PointChart';
import { VolumeHero } from '@/features/channels/components/VolumeHero';
import { BeforeYouPress } from '@/features/regions/components/BeforeYouPress';
import { RegionLinks } from '@/features/regions/components/RegionLinks';
import { pointList } from '@/features/regions/regionData';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';

import { regionLinkGroups } from '../../regionView';

import { RegionTabs } from './RegionTabs';

import type { ReactNode } from 'react';

import type { useRegionContainerModel } from './RegionContainer';

/** resolved body-region reading and point-chart data. */
export type RegionContainerViewModel = Awaited<ReturnType<typeof useRegionContainerModel>>;

/**
 * compose the selected region’s introduction, chart, and prose.
 * @param model localized body-part content, chart plates, and navigation
 * @returns the region introduction, tabs, point chart, related links, and editorial prose
 */
export const RegionContainerView = (model: Readonly<RegionContainerViewModel>): ReactNode => {
  const {
    locale,
    crumbs,
    han,
    lang,
    before,
    t,
    english,
    position,
    region,
    name,
    leadClass,
    summary,
    filed,
    lowerName,
    caution,
    tabs,
    chartPoints,
    chartCopy,
    plates,
    strip,
    hub,
    r,
  } = model;

  return (
    <div
      className="
        mx-auto max-w-[1440px] px-4 pb-[72px]
        sm:px-8
        lg:px-20
      ">
      <Breadcrumbs
        aria-label={getDictionary(locale).chrome.breadcrumb}
        className="pt-[22px]"
        items={crumbs}
      />
      <VolumeHero
        aside={
          <BeforeYouPress
            glyph={han('慎')}
            hanLang={lang}
            items={before}
            title={t('beforeTitle')}
          />
        }
        cap={
          english
            ? `${han('部位')} · ${t('regionOf', { n: position })}`
            : t('regionOf', { n: position })
        }
        cartouche={han(`${region.hanzi ?? ''}部`)}
        title={name}>
        <Speakable as="p" className={leadClass}>
          {summary}
        </Speakable>
        {filed.length > 0 ? (
          <p className={cn('m-0 max-w-[580px] text-body/normal', !english && `
            tc
          `)}>
            {t('detailLead', { name: lowerName, n: filed.length, list: pointList(filed, locale) })}
          </p>
        ) : null}
        <p
          className="
            m-0 flex max-w-[580px] items-baseline gap-2.5 bg-paper-raised px-3.5
            py-2.5 text-base leading-[1.45]
            shadow-[inset_3px_0_0_var(--color-cinnabar)]
          ">
          <span aria-hidden="true" className="tc red text-lg font-black" lang={lang}>
            {han('慎')}
          </span>
          {caution}
        </p>
      </VolumeHero>

      <RegionTabs current={region.slug} hanLang={lang} label={t('otherRegions')} tabs={tabs} />

      {chartPoints.length > 0 ? (
        <section aria-label={t('chartLabel', { name: lowerName })} className="
          mt-6
        ">
          <PointChart
            cartouche={han(`${region.hanzi ?? ''}部圖`)}
            copy={chartCopy}
            english={english}
            hanLang={lang}
            plates={plates}
            points={chartPoints}
            strip={strip}
          />
        </section>
      ) : (
        <p className="mt-8 mb-0 max-w-[640px] text-body/normal text-ink-soft">
          {t('empty', { name: lowerName })}
        </p>
      )}

      <RegionLinks className="mt-10" groups={regionLinkGroups(region, locale, t)} hanLang={lang} />

      {hub ? (
        <EditorialView
          className="mt-16"
          locale={locale}
          module={hub}
          pagePath={r.region(region.slug)}
        />
      ) : null}
    </div>
  );
};
