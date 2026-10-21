import { Breadcrumbs } from '@/components/composites/Breadcrumbs';
import { EditorialView } from '@/components/composites/EditorialView';
import { SectionHead } from '@/components/primitives/SectionHead';
import { Speakable } from '@/components/primitives/Speakable';
import { channelCopy, numberWord } from '@/features/channels/channelCopy';
import { channelName } from '@/features/channels/channelData';
import { FactList } from '@/features/channels/components/FactList';
import { PointChart } from '@/features/channels/components/PointChart';
import { SealBar } from '@/features/channels/components/SealBar';
import { VolumeHero } from '@/features/channels/components/VolumeHero';
import { cn } from '@/utilities/cn';
import { hanFor, hanLang } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import { chapterFacts, chapterTitle } from './chapterHeading';
import { RouteStrip } from './RouteStrip';
import { VolumeNav } from './VolumeNav';

import type { ReactNode } from 'react';

import type { BreadcrumbsProps } from '@/components/composites/Breadcrumbs';
import type { ProseRegistry } from '@/content/pages';
import type { Channel } from '@/features/channels/channelData';
import type { PointChartProps } from '@/features/channels/components/PointChart';
import type { Locale } from '@/utilities/routes';

import type { RouteStripProps } from './RouteStrip';
import type { VolumeNavProps } from './VolumeNav';

/** the chapter introduction and breadcrumb trail */
interface ChapterOpening {
  crumbs: BreadcrumbsProps['items'];
  lead: string;
}

/** the chapter entity and prepared content for each section */
type ChapterSpreadProps = {
  locale: Locale;
  channel: Channel;
  prose: ProseRegistry;
  opening: ChapterOpening;
  chart: Pick<PointChartProps, 'points' | 'copy' | 'initial' | 'plates' | 'strip'>;
  route: Pick<RouteStripProps, 'segments'> & { title: string };
  navigation: Pick<VolumeNavProps, 'prev' | 'next'>;
};

/**
 * lays out one channel chapter
 * @param props the localized channel, chart entries, route segments, and chapter prose
 * @returns the chapter hero, point chart, route strip, prose, and volume navigation
 */
export const ChapterSpread = (props: Readonly<ChapterSpreadProps>): ReactNode => {
  const { locale, channel, prose, opening, chart, route, navigation } = props;
  const { crumbs, lead } = opening;
  const { points: chartPoints, copy: chartCopy, initial, plates, strip } = chart;
  const { segments, title: routeTitle } = route;
  const { prev, next } = navigation;
  const t = channelCopy(locale);
  const english = locale === 'en';
  const lang = hanLang(locale);
  const han = (text: string): string => hanFor(text, locale);
  const { points } = channel;
  const codes = points.map((point) => point.code);
  const slug = channel.meridian.slug;
  const name = channelName(channel, locale);
  const hub = prose.hub('meridian', slug);
  const r = localizedRoutes(locale);

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
        aside={<FactList facts={chapterFacts({ channel, locale, prose, t })} hanLang={lang} />}
        cap={t('volumeCap', { vol: han(channel.volumeZh), word: numberWord(channel.volume) })}
        cartouche={han(channel.fullZh)}
        title={chapterTitle(channel, locale, t)}>
        <Speakable
          as="p"
          className={cn(
            `
              m-0 max-w-[560px] font-sans text-lead/normal text-ink-soft
              not-italic
            `,
            english ? 'lead-dropcap' : 'tc',
          )}>
          {lead}
        </Speakable>
        <SealBar codes={codes} label={t('sealedOf', { total: points.length })} />
      </VolumeHero>

      {chartPoints.length > 0 ? (
        <section aria-label={t('chapterChart', { name })} className="mt-[52px]">
          <PointChart
            cartouche={han(`${channel.fullZh}圖`)}
            copy={chartCopy}
            english={english}
            hanLang={lang}
            initial={initial}
            plates={plates}
            points={chartPoints}
            strip={strip}
          />
        </section>
      ) : null}

      {segments.length > 0 ? (
        <section aria-labelledby="route" className="mt-16">
          <SectionHead className="mb-6" id="route" title={routeTitle} zh={han('循行')} />
          <RouteStrip
            hanLang={lang}
            label={t('routeLabel', { name })}
            notSealedLabel={t('dotNot')}
            sealedLabel={t('dotSealed')}
            segments={segments}
          />
        </section>
      ) : null}

      {hub ? (
        <EditorialView className="mt-16" locale={locale} module={hub} pagePath={r.meridian(slug)} />
      ) : null}

      <VolumeNav hanLang={lang} label={t('otherVolumes')} next={next} prev={prev} />
    </div>
  );
};
