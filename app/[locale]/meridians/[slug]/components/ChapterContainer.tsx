/**
 * /meridians/<slug>: one channel as a chapter (卷). Loads the channel's
 * points from the catalogue and its editorial prose, and composes the
 * opening spread, the leaf chart on the whole carved figure (front, back or
 * both, as the channel runs), the route strip by body part, the prose and
 * the neighbouring volumes.
 */

import { notFound } from 'next/navigation';

import { isCataloguePoint } from '@/content/catalog';
import { channelCourse, figurePoint } from '@/content/illustrations';
import { loadProseRegistry } from '@/content/pages';
import { channelCopy } from '@/features/channels/channelCopy';
import {
  channelBySlug,
  channelName,
  channels,
  firstSentence,
  pointHanzi,
} from '@/features/channels/channelData';
import { channelRoute } from '@/features/channels/channelRoutes';
import { hanNumeral } from '@/utilities/hanNumeral';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import { chapterChartContent } from './chapterChart';
import { routeSegments, volumeLink } from './chapterDetails';
import { ChapterSpread } from './ChapterSpread';
import { FigurePlate } from './FigurePlate';

import type { FC } from 'react';

import type { FigureView } from '@/content/illustrations';
import type { ChartPlate, ChartStrip } from '@/features/channels/components/PointChart';
import type { Locale } from '@/utilities/routes';

import type { PlacedPoint } from './chapterDetails';

/** Props for {@link ChapterContainer}. */
export type ChapterContainerProps = {
  locale: Locale;
  slug: string;
};

const MIDLINE = new Set(['du', 'ren']);
const FIGURE_SIZE = { width: 300, height: 640 } as const;
/** Marks on the whole figure are drawn twice a region plate's size. */
const FIGURE_MARK = 2;
const VIEWS: readonly FigureView[] = ['front', 'back'];

/**
 * One channel's chapter; see the module note.
 * @param props the locale and meridian slug to load
 * @param props.locale the page language and Han script
 * @param props.slug the meridian slug identifying the chapter
 * @returns the channel chapter with its chart and editorial prose
 */
export const ChapterContainer: FC<ChapterContainerProps> = async ({ locale, slug }) => {
  const channel = channelBySlug(slug);
  if (!channel) {
    notFound();
  }
  const prose = await loadProseRegistry();
  const hub = prose.hub('meridian', slug);
  const t = channelCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const han = (text: string): string => hanFor(text, locale);
  const { meridian, points } = channel;
  const name = channelName(channel, locale);
  const first = points.at(0);
  const last = points.at(-1);

  const placed: PlacedPoint[] = points.flatMap((point) => {
    const spot = figurePoint(point.code);

    return spot ? [{ ...spot, name: point.name, href: r.point(point.code) }] : [];
  });
  const { chartPoints, chartCopy } = chapterChartContent(channel, locale, prose);
  const course = channelCourse(slug);
  const mirror = !MIDLINE.has(slug);
  const plates: ChartPlate[] = VIEWS.filter((view) => placed.some((p) => p.view === view)).map(
    (view) => ({
      key: view,
      zh: han(view === 'front' ? '正面' : '背面'),
      label: t(view === 'front' ? 'plateFront' : 'plateBack'),
      base: <FigurePlate back={view === 'back'} course={course} mirror={mirror} view={view} />,
      size: FIGURE_SIZE,
      mark: FIGURE_MARK,
    }),
  );
  const initial = Math.max(
    points.findIndex((p) => !isCataloguePoint(p)),
    0,
  );
  const strip: ChartStrip = {
    title: han(`經穴圖 · ${channel.volumeZh}`),
    middle: han(t('stripContents')),
    foot: han(hanNumeral(channel.volume)),
  };

  const crumbs = [
    { href: r.home, label: t('home') },
    { href: r.meridians, label: t('channels') },
    {
      href: r.meridian(slug),
      label: english ? channel.subEn : han(channel.fullZh),
      zh: han(channel.volumeZh),
    },
  ];
  const segments = routeSegments(placed, locale);
  const fromSegment = segments.at(0);
  const toSegment = segments.at(-1);
  const routeTitle =
    fromSegment && toSegment && segments.length > 1
      ? t('routeTitle', {
          from: english ? (fromSegment.label ?? '').toLowerCase() : fromSegment.zh,
          to: english ? (toSegment.label ?? '').toLowerCase() : toSegment.zh,
        })
      : t('routeTitleOne');
  const index = channels.indexOf(channel);
  const prev = volumeLink(channels[index - 1], locale);
  const next = volumeLink(channels[index + 1], locale);
  const route = channelRoute(slug, locale);
  const lead = english
    ? meridian.canonicalOneLiner
    : [
        hub ? firstSentence(han(hub.zh.summary)) : route,
        t('chapterLead', {
          name,
          n: points.length,
          start: first ? pointHanzi(first, locale, prose) : '',
          startCode: first?.code ?? '',
          end: last ? pointHanzi(last, locale, prose) : '',
          endCode: last?.code ?? '',
        }),
      ].join('');

  return (
    <ChapterSpread
      channel={channel}
      chart={{ points: chartPoints, copy: chartCopy, initial, plates, strip }}
      locale={locale}
      navigation={{ prev, next }}
      opening={{ crumbs, lead }}
      prose={prose}
      route={{ segments, title: routeTitle }}
    />
  );
};
