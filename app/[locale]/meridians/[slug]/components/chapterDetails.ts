import { PART_LABELS } from '@/features/channels/channelRoutes';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import type { BodyPart, FigurePoint } from '@/content/illustrations';
import type { Channel } from '@/features/channels/channelData';
import type { Locale } from '@/utilities/routes';

import type { RouteSegment } from './RouteStrip';
import type { VolumeLink } from './VolumeNav';

/** A point where the whole figure puts it, with its leaf. */
export interface PlacedPoint extends FigurePoint {
  readonly name: string;
  readonly href: string;
}

/**
 * Consecutive runs of points on the same part of the body, in channel order.
 * @param points the located channel points in route order
 * @param locale the page language and Han script
 * @returns consecutive body-part runs with point links and code ranges
 */
export function routeSegments(points: readonly PlacedPoint[], locale: Locale): RouteSegment[] {
  const segments: RouteSegment[] = [];
  for (const point of points) {
    const part: BodyPart = point.part;
    const open = segments.at(-1);
    const stop = { code: point.code, name: point.name, href: point.href };
    if (open?.key.startsWith(`${part}:`)) {
      const stops = [...open.stops, stop];
      segments[segments.length - 1] = { ...open, stops, range: rangeOf(stops) };
      continue;
    }
    segments.push({
      key: `${part}:${point.code}`,
      zh: hanFor(PART_LABELS[part].zh, locale),
      label: locale === 'en' ? PART_LABELS[part].en : undefined,
      range: point.code,
      stops: [stop],
    });
  }

  return segments;
}

/**
 * joins the first and last point codes in a route segment
 * @param stops the ordered point codes in one route segment
 * @returns a single code, an en-dash range, or an empty string
 */
export function rangeOf(stops: ReadonlyArray<{ code: string }>): string {
  const head = stops.at(0)?.code ?? '';
  const tail = stops.at(-1)?.code ?? '';

  return head === tail ? head : `${head}–${tail}`;
}

/**
 * builds navigation labels for a neighboring channel
 * @param channel the channel with its classical names and ordered points
 * @param locale the page language and Han script
 * @returns the localized volume link, or undefined when no channel exists
 */
export function volumeLink(channel: Channel | undefined, locale: Locale): VolumeLink | undefined {
  if (!channel) {
    return undefined;
  }

  return {
    href: localizedRoutes(locale).meridian(channel.meridian.slug),
    vol: hanFor(channel.volumeZh, locale),
    zh: hanFor(channel.fullZh, locale),
    en: locale === 'en' ? channel.meridian.name : undefined,
  };
}
