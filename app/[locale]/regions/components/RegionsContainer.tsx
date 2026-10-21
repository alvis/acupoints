/**
 * /regions: find by body part (部位). Loads the ten regions, the points filed
 * under each and their prose, and composes the opening spread with its
 * cautions, the region picker (with each region's points dotted on the
 * figures) and the three-step how-to.
 */

import { Breadcrumbs } from '@/components/composites/Breadcrumbs';
import { CarvedBody } from '@/components/primitives/CarvedBody';
import { Speakable } from '@/components/primitives/Speakable';
import { figurePoint } from '@/content/illustrations';
import { loadProseRegistry } from '@/content/pages';
import { firstSentence, pointHanzi, pointWhere } from '@/features/channels/channelData';
import { VolumeHero } from '@/features/channels/components/VolumeHero';
import { BeforeYouPress } from '@/features/regions/components/BeforeYouPress';
import { regionCopy } from '@/features/regions/regionCopy';
import {
  orderedRegions,
  pointList,
  pregnancyCautions,
  regionCaution,
  regionGlyph,
  regionName,
  regionPoints,
  regionZone,
} from '@/features/regions/regionData';
import { cn } from '@/utilities/cn';
import { hanFor, hanLang } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import { beforeItems, pointCount, regionLinkGroups } from '../regionView';

import { RegionPanel } from './RegionPanel';
import { RegionsBoard } from './RegionsBoard';
import { RegionSteps } from './RegionSteps';

import type { FC } from 'react';

import type { ProseRegistry } from '@/content/pages';
import type { RegionDescriptor } from '@/content/regions';
import type { RegionLinkGroup } from '@/features/regions/components/RegionLinks';
import type { RegionTranslate } from '@/features/regions/regionCopy';
import type { Locale } from '@/utilities/routes';

import type { PanelPoint } from './RegionPanel';
import type { BoardDot, BoardRegion, RegionsBoardCopy } from './RegionsBoard';

/** Props for {@link RegionsContainer}. */
export type RegionsContainerProps = {
  locale: Locale;
};

const INITIAL = 'hand';
const SIDE_ZH = { front: '正面', back: '背面' } as const;

/**
 * The regions index; see the module note.
 * @param props reading locale for body-part navigation
 * @param props.locale language used for links and copy
 * @returns the regions introduction, safety box, picker, and usage steps
 */
export const RegionsContainer: FC<RegionsContainerProps> = async ({ locale }) => {
  const prose = await loadProseRegistry();
  const t = regionCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const lang = hanLang(locale);
  const han = (text: string): string => hanFor(text, locale);

  const boardRegions: BoardRegion[] = orderedRegions.map((region) => ({
    slug: region.slug,
    glyph: regionGlyph(region, locale),
    name: regionName(region, locale),
    count: pointCount(regionPoints(region).length, t),
    zone: regionZone(region),
    dots: regionPoints(region).flatMap((point): BoardDot[] => {
      const spot = figurePoint(point.code);

      return spot ? [{ code: point.code, view: spot.view, x: spot.x, y: spot.y }] : [];
    }),
  }));
  const panels = orderedRegions.map((region, k) => (
    <RegionPanel key={region.slug} {...panelProps({ region, k, locale, prose, t })} />
  ));

  const crumbs = [
    { href: r.home, label: t('home') },
    { href: r.regions, label: t('regions') },
  ];
  const before = beforeItems(locale, t);
  const boardCopy: RegionsBoardCopy = {
    listTitle: t('listTitle'),
    listNote: t('listNote'),
    listLabel: t('listLabel'),
    figureLabel: t('figureLabel'),
    frontFigure: t('frontFigure'),
    backFigure: t('backFigure'),
    front: t('front'),
    back: t('back'),
    legendZone: t('legendZone'),
    legendPicked: t('legendPicked'),
    legendPoints: t('legendPoints'),
    zoneLabel: t('zoneLabel'),
    cartouche: han('部位圖'),
    stripTitle: han('經穴圖 · 部位'),
    stripMiddle: han('十部'),
  };
  const steps = [
    { title: t('step1Title'), body: t('step1Body') },
    { title: t('step2Title'), body: t('step2Body') },
    { title: t('step3Title'), body: t('step3Body') },
  ];
  const leadClass = cn(
    `m-0 max-w-[580px] font-sans text-lead/normal text-ink-soft not-italic`,
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
        aside={
          <BeforeYouPress
            glyph={han('慎')}
            hanLang={lang}
            items={before}
            title={t('beforeTitle')}
          />
        }
        cap={english ? `${han('部位')} · ${t('indexCap')}` : t('indexCap')}
        cartouche={han('部位')}
        title={t('indexTitle')}>
        <Speakable as="p" className={leadClass}>
          {t('indexLead')}
        </Speakable>
      </VolumeHero>

      <RegionsBoard
        backFigure={<CarvedBody back />}
        copy={boardCopy}
        frontFigure={<CarvedBody />}
        hanLang={lang}
        initial={INITIAL}
        panels={panels}
        regions={boardRegions}
        sideZh={english ? SIDE_ZH : undefined}
      />

      <RegionSteps hanLang={lang} steps={steps} title={t('stepsTitle')} zh={han('用法')} />
    </div>
  );
};

/**
 * assemble the selected region card from registry and editorial content.
 * @param props body-part descriptor, list position, editorial registry, and locale
 * @param props.region body-region registry entry
 * @param props.k zero-based position in the region list
 * @param props.locale language used for links and copy
 * @param props.prose published editorial registry
 * @param props.t localized template formatter
 * @returns the localized names, points, cautions, and links for a region card
 */
function panelProps({
  region,
  k,
  locale,
  prose,
  t,
}: {
  region: RegionDescriptor;
  k: number;
  locale: Locale;
  prose: ProseRegistry;
  t: RegionTranslate;
}): {
  glyph: string;
  cap: string;
  name: string;
  summary: string;
  pointsTitle: string;
  points: PanelPoint[];
  leafWord: string;
  empty: string;
  caution: string;
  cautionGlyph: string;
  links: RegionLinkGroup[];
  href: string;
  openText: string;
  hanLang: 'zh-Hant' | 'zh-Hans';
  english: boolean;
} {
  const english = locale === 'en';
  const r = localizedRoutes(locale);
  const han = (text: string): string => hanFor(text, locale);
  const filed = regionPoints(region);
  const name = regionName(region, locale);
  const hub = prose.hub('region', region.slug);
  const cautions = pregnancyCautions(filed);
  const points: PanelPoint[] = filed.map((point) => ({
    code: point.code,
    hanzi: pointHanzi(point, locale, prose),
    name: point.name,
    where: pointWhere(point, locale, prose),
    href: r.point(point.code),
    label: t('pointLabel', { name: point.name, code: point.code }),
  }));

  return {
    glyph: regionGlyph(region, locale),
    cap: english ? `${han('部位')} · ${t('regionOf', { n: k + 1 })}` : t('regionOf', { n: k + 1 }),
    name,
    summary: english ? region.summary : han(firstSentence(hub?.zh.summary ?? region.summary)),
    pointsTitle: english ? `${han('穴')} · ${t('keyPoints')}` : t('keyPoints'),
    points,
    leafWord: t('leaf'),
    empty: t('empty', { name: english ? region.name.toLowerCase() : name }),
    caution: [
      regionCaution(region, locale),
      ...(cautions.length > 0 ? [t('pregnancySkip', { points: pointList(cautions, locale) })] : []),
    ].join(english ? ' ' : ''),
    cautionGlyph: han('慎'),
    links: regionLinkGroups(region, locale, t),
    href: r.region(region.slug),
    openText: t('openRegion', { name: english ? region.name.toLowerCase() : name }),
    hanLang: hanLang(locale),
    english,
  };
}
