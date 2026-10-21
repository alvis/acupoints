/**
 * /regions/<slug>: one body region (部). Loads the region, the points filed
 * under it and its prose, and composes the opening spread, the region row,
 * its caution, the leaf chart of its points, its channels and conditions, and the prose.
 */

import { notFound } from 'next/navigation';

import { CarvedBody } from '@/components/primitives/CarvedBody';
import { figurePoint } from '@/content/illustrations';
import { loadProseRegistry } from '@/content/pages';
import { firstSentence, pointHanzi, pointWhere } from '@/features/channels/channelData';
import { regionCopy } from '@/features/regions/regionCopy';
import {
  orderedRegions,
  pointList,
  pregnancyCautions,
  regionCaution,
  regionFor,
  regionGlyph,
  regionName,
  regionPoints,
} from '@/features/regions/regionData';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';
import { hanFor, hanLang } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import { beforeItems, pointCount } from '../../regionView';

import { RegionContainerView } from './RegionContainerView';

import type { FC } from 'react';

import type { FigurePoint } from '@/content/illustrations';
import type {
  ChartPlate,
  ChartPoint,
  ChartStrip,
  PlateSize,
  PointChartCopy,
} from '@/features/channels/components/PointChart';
import type { Locale } from '@/utilities/routes';

import type { RegionContainerModel } from './RegionContainerModel';
import type { RegionTab } from './RegionTabs';

/** Props for {@link RegionContainer}. */
export type RegionContainerProps = {
  locale: Locale;
  slug: string;
};

/**
 * One region's page; see the module note.
 * @param props body-part slug and reading locale
 * @returns the requested body region page
 */
export const RegionContainer: FC<RegionContainerProps> = async (props) => (
  <RegionContainerView {...await useRegionContainerModel(props)} />
);

/**
 * load a region and prepare its localized chart and editorial reading.
 * @param props body-part slug and reading locale
 * @param props.locale language used for links and copy
 * @param props.slug registry identifier from the route
 * @returns the localized region content, chart plates, safety notes, and navigation
 */
export const useRegionContainerModel = async ({
  locale,
  slug,
}: RegionContainerProps): RegionContainerModel => {
  const region = regionFor(slug);
  if (!region) {
    notFound();
  }
  const prose = await loadProseRegistry();
  const hub = prose.hub('region', region.slug);
  const t = regionCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const lang = hanLang(locale);
  const han = (text: string): string => hanFor(text, locale);
  const glyph = regionGlyph(region, locale);
  const name = regionName(region, locale);
  const filed = regionPoints(region);
  const position = orderedRegions.indexOf(region) + 1;

  const placed = filed.flatMap((point) => {
    const spot = figurePoint(point.code);

    return spot ? [{ point, spot }] : [];
  });
  const chartPoints: ChartPoint[] = placed.map(({ point, spot }, k) => ({
    code: point.code,
    ordinal: han(hanNumeral(k + 1)),
    hanzi: pointHanzi(point, locale, prose),
    name: point.name,
    where: pointWhere(point, locale, prose),
    plate: spot.view,
    x: spot.x,
    y: spot.y,
    href: r.point(point.code),
  }));
  const views = placed
    .map(({ spot }) => spot.view)
    .filter((view, k, all) => all.indexOf(view) === k);
  const plates: ChartPlate[] = views.map((view) => {
    const size = regionWindow(placed.map(({ spot }) => spot).filter((spot) => spot.view === view));

    return {
      key: view,
      zh: han(view === 'front' ? '正面' : '背面'),
      label: t(view === 'front' ? 'plateFront' : 'plateBack'),
      base: (
        <CarvedBody
          back={view === 'back'}
          strokeWidth={Math.max(
            PLATE_GEOMETRY.minStroke,
            (PLATE_GEOMETRY.stroke * size.width) / PLATE_GEOMETRY.referenceWidth,
          )}
        />
      ),
      size,
      mark: Math.min(Math.max(size.width / PLATE_GEOMETRY.markerScale, 1), 2),
    };
  });
  const chartCopy = chartLabels(t, filed.length);
  const strip: ChartStrip = {
    title: han('經穴圖 · 部位'),
    middle: han('目次'),
    foot: glyph,
  };
  const tabs: RegionTab[] = orderedRegions.map((other) => ({
    slug: other.slug,
    href: r.region(other.slug),
    glyph: regionGlyph(other, locale),
    name: regionName(other, locale),
    count: pointCount(regionPoints(other).length, t),
  }));

  const crumbs = [
    { href: r.home, label: t('home') },
    { href: r.regions, label: t('regions') },
    { href: r.region(region.slug), label: name, zh: english ? glyph : undefined },
  ];
  const before = beforeItems(locale, t);
  const lowerName = english ? region.name.toLowerCase() : name;
  const pregnancy = pregnancyCautions(filed);
  const caution = [
    regionCaution(region, locale),
    ...(pregnancy.length > 0 ? [t('pregnancySkip', { points: pointList(pregnancy, locale) })] : []),
  ].join(english ? ' ' : '');
  const summary = english ? region.summary : han(firstSentence(hub?.zh.summary ?? region.summary));
  const leadClass = cn(
    `m-0 max-w-[580px] font-sans text-lead/normal text-ink-soft not-italic`,
    !english && 'tc',
  );

  return {
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
  };
};

/** The carved figure's box, and the least window a region's plate shows. */
const PLATE_GEOMETRY = {
  minStroke: 1.4,
  stroke: 2.6,
  referenceWidth: 300,
  markerScale: 130,
  maxAspect: 2.2,
  minAspect: 1.2,
} as const;

export const FIGURE = { width: 300, height: 640 } as const;
export const MIN_WINDOW = { width: 110, height: 132 } as const;
export const PAD = 28;

/**
 * The part of the carved figure a region's plate shows: the box around its
 * points on one view, padded, no narrower than a hand and no more than about
 * twice as tall as wide, kept inside the figure.
 * @param spots point coordinates included on the plate
 * @returns the padded viewport enclosing the points within the carved figure
 */
export function regionWindow(spots: readonly FigurePoint[]): Required<PlateSize> {
  const xs = spots.map((spot) => spot.x);
  const ys = spots.map((spot) => spot.y);
  let width = Math.max(Math.max(...xs) - Math.min(...xs) + PAD * 2, MIN_WINDOW.width);
  let height = Math.max(Math.max(...ys) - Math.min(...ys) + PAD * 2, MIN_WINDOW.height);
  width = Math.min(Math.max(width, height / PLATE_GEOMETRY.maxAspect), FIGURE.width);
  height = Math.min(Math.max(height, width * PLATE_GEOMETRY.minAspect), FIGURE.height);
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2;

  return {
    x: clamp(cx - width / 2, 0, FIGURE.width - width),
    y: clamp(cy - height / 2, 0, FIGURE.height - height),
    width,
    height,
  };
}

/**
 * limit a number to an inclusive range.
 * @param value number to constrain
 * @param min inclusive lower bound
 * @param max inclusive upper bound
 * @returns the number limited to the inclusive bounds
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * label the region chart and its sealed-point legend.
 * @param t localized template formatter
 * @param count number of points filed in the region
 * @returns localized point-chart headings, controls, and seal legend
 */
const chartLabels = (t: ReturnType<typeof regionCopy>, count: number): PointChartCopy => {
  const chartCopy: PointChartCopy = {
    platesLabel: t('platesLabel'),
    listLabel: t('listPoints', { n: count }),
    openLeaf: t('openLeaf'),
    sealed: t('sealed'),
    notSealed: t('notSealed'),
    legendSealed: t('legendSealed'),
    legendNot: t('legendNot'),
    plateAria: t('plateAria'),
  };

  return chartCopy;
};
