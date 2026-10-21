import { channelCopy } from '@/features/channels/channelCopy';
import { hanFor } from '@/utilities/i18n/contentLabels';

import type { Locale } from '@/utilities/routes';

import type { ChannelChartCopy } from './ChannelChart';
/**
 * prepares localized labels for the channel overview chart
 * @param locale the page language and Han script
 * @returns the figure, legend, and channel-list labels
 */
export const overviewChartCopy = (locale: Locale): ChannelChartCopy => {
  const t = channelCopy(locale);
  const han = (text: string): string => hanFor(text, locale);
  const chartCopy: ChannelChartCopy = {
    chartLabel: t('chartLabel'),
    front: t('front'),
    back: t('back'),
    figFront: t('figFront'),
    figBack: t('figBack'),
    figThin: t('figThin'),
    figPicked: t('figPicked'),
    figOther: t('figOther'),
    figNone: t('figNone'),
    legendChannel: t('legendChannel'),
    legendPicked: t('legendPicked'),
    legendFirst: t('legendFirst'),
    legendLast: t('legendLast'),
    approx: t('approx'),
    noCourse: t('noCourse'),
    showAll: t('showAll'),
    rowsLabel: t('rowsLabel'),
    rowLabel: t('rowLabel'),
    cartouche: han('十四經圖'),
    stripTitle: han('經穴圖 · 總圖'),
    stripMiddle: han('十四卷'),
    stripFoot: han('總'),
  };

  return chartCopy;
};
