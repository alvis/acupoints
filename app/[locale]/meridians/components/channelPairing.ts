import { channelCourse, channelFigure } from '@/content/illustrations';
import { channels, PHASES, pointHanzi } from '@/features/channels/channelData';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import type { FigurePoint } from '@/content/illustrations';
import type { ProseRegistry } from '@/content/pages';
import type { AnyPoint } from '@/content/schemas';
import type { ChannelCopyKey } from '@/features/channels/channelCopy';
import type { Channel } from '@/features/channels/channelData';
import type { Translate } from '@/features/channels/translator';
import type { Locale } from '@/utilities/routes';

import type { ChartChannel, ChartDot } from './ChannelChart';
import type { PanelEnd } from './ChannelPanel';
import type { ChannelPair, PairBox, PairColumn, PairRow, VesselMark } from './PairingGrid';

const MIDLINE = new Set(['du', 'ren']);

/**
 * prepares the name and code of a channel endpoint
 * @param point the endpoint point record, when available
 * @param locale the page language and Han script
 * @param prose the loaded editorial registry for point names and locations
 * @returns the endpoint code, Han name, and romanized name
 */
export function panelEnd(point: AnyPoint, locale: Locale, prose: ProseRegistry): PanelEnd {
  return { code: point.code, hanzi: pointHanzi(point, locale, prose), name: point.name };
}

/**
 * looks up a channel by its meridian slug
 * @param slug the meridian slug identifying the chapter
 * @returns the matching channel, or undefined when absent
 */
export function channelOf(slug: string): Channel | undefined {
  return channels.find((c) => c.meridian.slug === slug);
}

/**
 * finds the interior–exterior partner of a paired channel
 * @param channel the channel with its classical names and ordered points
 * @returns the partner channel, or undefined for an unpaired vessel
 */
export function partnerOf(channel: Channel): Channel | undefined {
  return channel.naming.kind === 'paired' ? channelOf(channel.naming.partner) : undefined;
}

/**
 * The channel's line on the figures, with its first and last point.
 * @param channel the channel with its classical names and ordered points
 * @returns the course stretches, mirror flag, and endpoint coordinates
 */
export function courseOf(
  channel: Channel,
): Pick<ChartChannel, 'course' | 'mirror' | 'start' | 'end'> {
  const slug = channel.meridian.slug;
  const figure = channelFigure(slug);

  return {
    course: channelCourse(slug),
    mirror: !MIDLINE.has(slug),
    start: dotOf(figure[0]),
    end: dotOf(figure[figure.length - 1]),
  };
}

/**
 * copies a figure point into a chart marker
 * @param point the endpoint point record, when available
 * @returns the view and coordinates, or undefined when the point is absent
 */
export function dotOf(point: FigurePoint | undefined): ChartDot | undefined {
  return point ? { view: point.view, x: point.x, y: point.y } : undefined;
}

/**
 * Which figures carry the channel's points, as a copy key.
 * @param channel the channel with its classical names and ordered points
 * @returns the front, back, or both-sides copy key, or undefined without points
 */
export function figureSides(channel: Channel): 'sideFront' | 'sideBack' | 'sideBoth' | undefined {
  const views = new Set(channelFigure(channel.meridian.slug).map((p) => p.view));
  if (views.size === 0) {
    return undefined;
  }
  if (views.size > 1) {
    return 'sideBoth';
  }

  return views.has('front') ? 'sideFront' : 'sideBack';
}

/**
 * prepares the organ label and link for a paired channel
 * @param channel the channel with its classical names and ordered points
 * @param locale the page language and Han script
 * @returns the localized organ label, code prefix, and chapter link
 */
export function pairBox(channel: Channel, locale: Locale): PairBox {
  const organ = channel.naming.kind === 'paired' ? channel.naming.organZh : channel.fullZh;

  return {
    slug: channel.meridian.slug,
    zh: hanFor(organ, locale),
    en: locale === 'en' ? channel.meridian.name : undefined,
    code: channel.prefix,
    href: localizedRoutes(locale).meridian(channel.meridian.slug),
  };
}

/**
 * labels a yin–yang degree column
 * @param slug the yin-channel slug identifying this degree pair
 * @param locale the page language and Han script
 * @param t the localized channel-copy resolver
 * @returns the paired degree names in Han and optional English
 */
export function pairColumn(slug: string, locale: Locale, t: Translate<ChannelCopyKey>): PairColumn {
  const yin = channelOf(slug);
  const yang = yin ? partnerOf(yin) : undefined;
  const yinName = yin?.naming.kind === 'paired' ? yin.naming : undefined;
  const yangName = yang?.naming.kind === 'paired' ? yang.naming : undefined;

  return {
    zh: hanFor(`${yinName?.degreeZh ?? ''} · ${yangName?.degreeZh ?? ''}`, locale),
    en:
      locale === 'en'
        ? t('pairDegrees', { yin: yinName?.degreeEn ?? '', yang: yangName?.degreeEn ?? '' })
        : undefined,
  };
}

/**
 * groups yin and yang partners by limb
 * @param props the limb labels and yin-channel slugs
 * @param props.zh the Han label for the hand or foot row
 * @param props.label the localized hand or foot label
 * @param props.meet the label for where the paired channels meet
 * @param props.yinSlugs the yin-channel slugs in degree order
 * @param props.locale the page language and Han script
 * @returns the limb heading and its available channel pairs with phase labels
 */
export function pairRow({
  zh,
  label,
  meet,
  yinSlugs,
  locale,
}: {
  zh: string;
  label: string;
  meet: string;
  yinSlugs: readonly string[];
  locale: Locale;
}): PairRow {
  const pairs: ChannelPair[] = [];
  for (const slug of yinSlugs) {
    const yin = channelOf(slug);
    const yang = yin ? partnerOf(yin) : undefined;
    if (!yin || !yang) {
      continue;
    }
    const phase = PHASES[yin.meridian.element];
    pairs.push({
      yin: pairBox(yin, locale),
      yang: pairBox(yang, locale),
      phase: locale === 'en' ? `${phase.zh} ${phase.en}` : hanFor(phase.zh, locale),
    });
  }

  return {
    zh: hanFor(zh, locale),
    label: locale === 'en' ? label : undefined,
    meet,
    pairs,
  };
}

/**
 * prepares the two unpaired vessel links
 * @param locale the page language and Han script
 * @param t the localized channel-copy resolver
 * @returns the governing and conception vessel labels, links, and mark styles
 */
export function vesselMarks(locale: Locale, t: Translate<ChannelCopyKey>): VesselMark[] {
  const r = localizedRoutes(locale);

  return [
    {
      slug: 'du',
      zh: hanFor('督', locale),
      label: t('governingBack'),
      href: r.meridian('du'),
      dark: false,
    },
    {
      slug: 'ren',
      zh: hanFor('任', locale),
      label: t('conceptionFront'),
      href: r.meridian('ren'),
      dark: true,
    },
  ];
}
