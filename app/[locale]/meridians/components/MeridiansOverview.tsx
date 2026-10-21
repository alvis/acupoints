import { Breadcrumbs } from '@/components/composites/Breadcrumbs';
import { CarvedBody } from '@/components/primitives/CarvedBody';
import { Speakable } from '@/components/primitives/Speakable';
import { channelCopy } from '@/features/channels/channelCopy';
import { channels } from '@/features/channels/channelData';
import { FactList } from '@/features/channels/components/FactList';
import { SealBar } from '@/features/channels/components/SealBar';
import { VolumeHero } from '@/features/channels/components/VolumeHero';
import { cn } from '@/utilities/cn';
import { hanFor, hanLang } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { CUT_FILTER } from '@/utilities/illustrations/woodcut';
import { localizedRoutes } from '@/utilities/routes';

import { ChannelChart } from './ChannelChart';
import { ChannelSelection } from './ChannelSelection';
import { overviewChartCopy } from './chartCopy';
import { PairingSection } from './PairingSection';

import type { JSX, ReactNode } from 'react';

import type { Locale } from '@/utilities/routes';

import type { ChartChannel } from './ChannelChart';
import type { PairingGridProps } from './PairingGrid';

/** the locale, prepared chart volumes, and channel pairing content */
type MeridiansOverviewProps = {
  locale: Locale;
  chartChannels: ChartChannel[];
  panels: JSX.Element[];
  grid: PairingGridProps;
  notes: Array<{ title: string; body: string }>;
};

const INITIAL = 'large-intestine';
const SIDE_ZH = { front: '正面', back: '背面' } as const;

/**
 * lays out the fourteen-channel overview
 * @param props the localized overview facts, chart entries, and pairing data
 * @returns the overview hero, channel chart, and pairing diagram
 */
export const MeridiansOverview = (props: Readonly<MeridiansOverviewProps>): ReactNode => {
  const { locale, chartChannels, panels, grid, notes } = props;
  const t = channelCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const lang = hanLang(locale);
  const han = (text: string): string => hanFor(text, locale);
  const allCodes = channels.flatMap((c) => c.points.map((p) => p.code));
  const total = allCodes.length;
  const crumbs = [
    { href: r.home, label: t('home') },
    { href: r.meridians, label: t('channels') },
  ];
  const facts = [
    { term: t('volumes'), value: t('volumesValue') },
    { term: t('regular'), zh: english ? han('十二經') : undefined, value: t('regularValue') },
    { term: t('vessels'), zh: english ? han('督 · 任') : undefined, value: t('vesselsValue') },
    { term: t('leaves'), value: t('leavesValue', { n: total }) },
  ];
  const chartCopy = overviewChartCopy(locale);
  const leadClass = cn(
    `m-0 max-w-[600px] font-sans text-lead/normal text-ink-soft not-italic`,
    !english && 'tc',
  );

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
        aside={<FactList facts={facts} hanLang={lang} />}
        cap={english ? `${han('經絡總圖')} · ${t('indexCap')}` : t('indexCap')}
        cartouche={han('經絡總圖')}
        title={t('indexTitle')}>
        <Speakable as="p" className={leadClass}>
          {t('indexLead', { total })}
        </Speakable>
        <SealBar codes={allCodes} label={t('sealedOf', { total })} />
      </VolumeHero>

      <ChannelSelection initial={INITIAL}>
        <ChannelChart
          backFigure={<CarvedBody back />}
          channels={chartChannels}
          copy={chartCopy}
          cutFilter={CUT_FILTER}
          frontFigure={<CarvedBody />}
          hanLang={lang}
          panels={panels}
          sideZh={english ? SIDE_ZH : undefined}
        />
        <PairingSection
          aside={t('pairPicked')}
          grid={grid}
          notes={notes}
          title={t('pairTitle')}
          zh={han('表裏')}
        />
      </ChannelSelection>
    </div>
  );
};
