/**
 * Loads one point's registry record, authored leaf card and editorial prose
 * and composes its printed leaf: the phone header, the carved block (card
 * lines and classical quote when a card exists, dataset lines otherwise),
 * the cards under it, the authored commentary, safety notes, FAQ, sources,
 * the colophon and the leaf turn — plus the page's JSON-LD graph, which
 * must quote exactly what renders.
 */

import { fill } from '@/features/points/format';
import { hanNumber } from '@/features/points/volumes';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { LOCALES } from '@/utilities/routes';

import { colophonRecord, leafJsonPath } from '../leafData';

import type { AnyPoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { LocalLeafCard } from '@/features/points/leafCard';
import type { catalogueEntry, leafPosition } from '@/features/points/volumes';
import type { Locale } from '@/utilities/routes';

/**
 * format the position, colophon, and machine-copy links for a leaf.
 * @param props point record, channel position, locale, and publication details
 * @param props.point point registry entry
 * @param props.entry catalogue metadata for the point
 * @param props.position placement within its channel volume
 * @param props.leafCard localized instructions and timing
 * @param props.locale language used for links and copy
 * @param props.pageUrl canonical absolute address of this point leaf
 * @param props.reviewed date of the latest content review
 * @param props.t localized leaf labels and text templates
 * @returns the formatted channel position, JSON record, and localized record links
 */
export const leafPlacement = ({
  point,
  entry,
  position,
  leafCard,
  locale,
  pageUrl,
  reviewed,
  t,
}: {
  point: AnyPoint;
  entry: ReturnType<typeof catalogueEntry>;
  position: ReturnType<typeof leafPosition>;
  leafCard: LocalLeafCard | undefined;
  locale: Locale;
  pageUrl: string;
  reviewed: Date;
  t: LeafText;
}): {
  place: string;
  record: string;
  jsonPaths: string[];
  mobilePlace: string;
  volumeName: string;
} => {
  const place = position
    ? [
        fill(t.volumeHan, { n: hanNumber(position.volume.order) }),
        fill(t.leafHan, { n: hanNumber(position.index) }),
        fill(t.ofLeavesHan, { n: hanNumber(position.total) }),
      ].join(' · ')
    : '';
  const record = colophonRecord({
    point,
    entry,
    position,
    card: leafCard,
    english: locale === 'en',
    url: pageUrl,
    lastReviewed: reviewed,
  });
  const jsonPaths = [locale, ...LOCALES.filter((l) => l !== locale)].map((l) =>
    leafJsonPath(l, point.code),
  );
  const leafHan = position ? fill(t.leafHan, { n: hanNumber(position.index) }) : point.code;
  const mobilePlace = position
    ? `${fill(t.volumeHan, { n: hanNumber(position.volume.order) })} · ${leafHan}`
    : leafHan;
  const volumeName = position
    ? locale === 'en'
      ? position.volume.channel
      : hanFor(position.volume.han, locale)
    : t.index.label;

  return { place, record, jsonPaths, mobilePlace, volumeName };
};
