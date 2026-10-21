/**
 * The printed leaf (葉): breadcrumb and direction switch, the red notes above
 * the block, and the carved block itself — plate on the left leaf, the
 * fish-tail centre strip (版心), and the main text with margin notes on the
 * right leaf. Shared by editorial and catalogue-only points so every one of
 * the 361 reads the same way.
 */

import { handBackPoint } from '@/content/illustrations';
import { categoryHan } from '@/features/points/categoryHan';
import { fill } from '@/features/points/format';
import { hanNumber } from '@/features/points/volumes';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localeToHtmlLang, localizedRoutes } from '@/utilities/routes';

import { LeafSpreadView } from './LeafSpreadView';

import type { FC, ReactNode } from 'react';

import type { PointsText } from '@/features/points/labels';
import type { LocalLeafQuote } from '@/features/points/leafCard';
import type { LeafPosition } from '@/features/points/volumes';
import type { Locale } from '@/utilities/routes';

import type { LeafLine } from './LeafNotes';
import type { LeafSpreadModel } from './leafSpreadModel';

/** Identity of the point a leaf prints. */
export interface LeafIdentity {
  code: string;
  name: string;
  pinyin: string;
  /** Han name as stored in the registry. */
  hanzi: string;
  /** Point classes from the registry ("yuan-source"). */
  categories: readonly string[];
  /** The English meaning of the name, from the leaf card ("Joining Valley"). */
  gloss?: string;
}

/** Props for {@link LeafSpread}. */
export type LeafSpreadProps = {
  locale: Locale;
  text: PointsText;
  point: LeafIdentity;
  /** Volume placement; absent for points outside the fourteen channels. */
  position?: LeafPosition;
  /** Main text lines (Where / For / Press). */
  lines: readonly LeafLine[];
  /** The leaf's summary, set in the boxed slot under the commentary when no quote takes it. */
  summary?: ReactNode;
  /** The card's classical line, set in the boxed slot in place of the summary. */
  quote?: LocalLeafQuote;
  /** Red notes printed above the block (cautions). */
  aboveBlock?: ReactNode;
};

export const VERTICAL = '[writing-mode:vertical-rl] [text-orientation:upright]';
export const ACROSS = 'group-data-[han=across]/han:[writing-mode:horizontal-tb]';

/**
 * Breadcrumb, cautions and the carved block for one point.
 * @param props point identity, instructions, channel position, and authored notes
 * @returns the carved point plate, center strip, and annotated text leaf
 */
export const LeafSpread: FC<LeafSpreadProps> = (props) => (
  <LeafSpreadView {...useLeafSpreadModel(props)} />
);

/**
 * localize the printed headings and channel facts
 * @param props point identity, instructions, channel position, and authored notes
 * @param props.locale language used for links and copy
 * @param props.text localized interface copy
 * @param props.point point registry entry
 * @param props.position placement within its channel volume
 * @param props.lines ordered location and pressure instructions
 * @param props.summary published overview for this leaf
 * @param props.quote classical passage printed beside the notes
 * @param props.aboveBlock caution content preceding the carved block
 * @returns the localized headings, channel position, point facts, and text for the leaf spread
 */
export const useLeafSpreadModel = ({
  locale,
  text,
  point,
  position,
  lines,
  summary,
  quote,
  aboveBlock,
}: LeafSpreadProps): LeafSpreadModel => {
  const t = text.leaf;
  const r = localizedRoutes(locale);
  const han = hanFor(point.hanzi, locale);
  const hanLang = locale === 'en' ? 'zh-Hant' : localeToHtmlLang(locale);
  const volume = position?.volume;
  const volumeHan = volume ? fill(t.volumeHan, { n: hanNumber(volume.order) }) : t.extra.han;
  const channelHan = volume ? hanFor(volume.han, locale) : hanFor(t.extra.han, locale);
  const channelName = volume ? (locale === 'en' ? volume.channel : channelHan) : t.extra.label;
  const leafHan = position ? fill(t.leafHan, { n: hanNumber(position.index) }) : point.code;
  const leafOf = position
    ? fill(t.leafOf, { n: position.index, total: position.total, channel: channelName })
    : undefined;
  const ordinal = position ? fill(t.ordinal, { n: position.index, total: position.total }) : '';
  const roles =
    locale === 'en'
      ? point.categories.join(', ')
      : point.categories.flatMap((c) => categoryHan(c, locale) ?? []).join('、');
  const facts = [channelName, ordinal, roles].filter(Boolean).join(' · ');
  const plateLabel = fill(t.plateLabel, { code: point.code, name: point.name });
  const handInset = handBackPoint(point.code)
    ? fill(t.insetLabel, { name: locale === 'en' ? point.name : han })
    : undefined;
  const stripTitle = `${hanFor('經穴圖', locale)} · ${volumeHan}`;
  const next = position?.next;

  return {
    t,
    r,
    hanLang,
    locale,
    volume,
    volumeHan,
    channelName,
    leafHan,
    point,
    aboveBlock,
    leafOf,
    channelHan,
    handInset,
    plateLabel,
    han,
    stripTitle,
    position,
    facts,
    lines,
    quote,
    summary,
    next,
  };
};
