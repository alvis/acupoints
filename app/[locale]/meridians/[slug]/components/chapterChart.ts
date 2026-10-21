import { figurePoint } from '@/content/illustrations';
import { channelCopy } from '@/features/channels/channelCopy';
import { codeNumber, pointHanzi, pointWhere } from '@/features/channels/channelData';
import { hanNumeral } from '@/utilities/hanNumeral';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import type { ProseRegistry } from '@/content/pages';
import type { Channel } from '@/features/channels/channelData';
import type { ChartPoint, PointChartCopy } from '@/features/channels/components/PointChart';
import type { Locale } from '@/utilities/routes';
/** content for the chapter's point chart */
interface ChapterChartContent {
  chartPoints: ChartPoint[];
  chartCopy: PointChartCopy;
}
/**
 * prepares located points and localized labels for a chapter chart
 * @param channel the channel with its classical names and ordered points
 * @param locale the page language and Han script
 * @param prose the loaded editorial registry for point names and locations
 * @returns the chart rows and interface labels
 */
export const chapterChartContent = (
  channel: Channel,
  locale: Locale,
  prose: ProseRegistry,
): ChapterChartContent => {
  const { points } = channel;
  const r = localizedRoutes(locale);
  const t = channelCopy(locale);
  const han = (text: string): string => hanFor(text, locale);
  const chartPoints: ChartPoint[] = points.flatMap((point) => {
    const spot = figurePoint(point.code);
    if (!spot) {
      return [];
    }

    return [
      {
        code: point.code,
        ordinal: han(hanNumeral(codeNumber(point.code))),
        hanzi: pointHanzi(point, locale, prose),
        name: point.name,
        where: pointWhere(point, locale, prose),
        plate: spot.view,
        x: spot.x,
        y: spot.y,
        href: r.point(point.code),
      },
    ];
  });
  const chartCopy: PointChartCopy = {
    platesLabel: t('platesLabel'),
    listLabel: t('listLabel', { n: points.length }),
    openLeaf: t('openLeaf'),
    sealed: t('sealed'),
    notSealed: t('notSealed'),
    legendSealed: t('legendSealed'),
    legendNot: t('legendNot'),
    plateAria: t('figureAria'),
  };

  return { chartPoints, chartCopy };
};
