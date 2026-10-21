/**
 * Loads one point's registry record, authored leaf card and editorial prose
 * and composes its printed leaf: the phone header, the carved block (card
 * lines and classical quote when a card exists, dataset lines otherwise),
 * the cards under it, the authored commentary, safety notes, FAQ, sources,
 * the colophon and the leaf turn — plus the page's JSON-LD graph, which
 * must quote exactly what renders.
 */

import { notFound } from 'next/navigation';

import { Speakable } from '@/components/primitives/Speakable';
import { isCataloguePoint } from '@/content/catalog';
import { loadProseRegistry } from '@/content/pages';
import { pointByCode } from '@/content/points';
import { fill } from '@/features/points/format';
import { pointsText } from '@/features/points/labels';
import { localLeafCard } from '@/features/points/leafCard';
import { catalogueEntry, leafPosition } from '@/features/points/volumes';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { localeToHtmlLang, localizedRoutes, SITE } from '@/utilities/routes';

import { leafLines } from '../leafData';

import { leafCommentary } from './buildLeafCommentary';
import { leafCautions } from './leafCautions';
import { leafPlacement } from './leafPlacement';
import { leafRelations } from './leafRelations';
import { pointGraph } from './pointGraph';
import { PointLeafContainerView } from './PointLeafContainerView';

import type { FC } from 'react';

import type { AnyPoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { LocalLeafCard } from '@/features/points/leafCard';
import type { Locale } from '@/utilities/routes';

import type { BreathPacerText } from './BreathPacer';
import type { CardPoint, FourGates } from './LeafCards';
import type { LeafIdentity } from './LeafSpread';
import type { PointLeafContainerModel } from './pointLeafContainerModel';

/** Props for {@link PointLeafContainer}. */
export type PointLeafContainerProps = {
  locale: Locale;
  /** Point code from the URL, any case. */
  code: string;
};

/** The Four Gates (四關): LI4 on both hands with LV3 on both feet. */
export const FOUR_GATES = ['LI4', 'LV3'] as const;

/** Breaths a pacer round may hold, so a long press line never runs past a slow minute or two. */
export const MIN_BREATHS = 3;
export const MAX_BREATHS = 12;
export const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_BREATH = 10;

/**
 * Async server container for `/points/[code]`; 404s on an unknown code.
 * @param props point code and page language
 * @returns the complete point leaf with safety notes, sources, navigation, and structured data
 */
export const PointLeafContainer: FC<PointLeafContainerProps> = async (props) => (
  <PointLeafContainerView model={await usePointLeafContainerModel(props)} />
);

/**
 * load the point registry, editorial content, and leaf navigation
 * @param props point code and page language
 * @param props.locale language used for links and copy
 * @param props.code canonical point identifier
 * @returns the registry facts, authored content, safety notes, and links for the point leaf
 */
export const usePointLeafContainerModel = async ({
  locale,
  code,
}: PointLeafContainerProps): PointLeafContainerModel => {
  const point = pointByCode(code);
  if (!point) {
    notFound();
  }

  const r = localizedRoutes(locale);
  const text = pointsText(locale);
  const t = text.leaf;
  const dict = getDictionary(locale);
  const hanLang = locale === 'en' ? 'zh-Hant' : localeToHtmlLang(locale);
  const datasetLang = locale === 'en' ? undefined : 'en';

  const pagePath = r.point(point.code);
  const pageUrl = `${SITE.url}${pagePath}`;
  // Editorial prose comes from the markdown registry; the registry spine
  // always owns identity.
  const ed = (await loadProseRegistry()).pointByCode(point.code);
  // One arm per page; structured data quotes the same arm, since Google drops
  // a FAQPage rich result whose markup disagrees with the visible text.
  const arm = ed ? armForLocale(ed, locale) : undefined;
  const reviewed = ed?.lastReviewed ?? point.lastReviewed;
  const citations = ed?.sources ?? point.sources;
  const entry = catalogueEntry(point.code);
  const position = leafPosition(point.code);
  const legacy = isCataloguePoint(point) ? undefined : point;
  // The authored leaf card, in the page language; its lines win over the
  // dataset's, which stay on the page as recorded cautions and commentary.
  const leafCard = localLeafCard(point.code, locale);

  const relations = leafRelations({
    point,
    position,
    t,
    locale,
    r,
  });

  const { fourGates } = relations;

  // Notes above the block: the dataset's own cautions, quoted as recorded.
  // Editorial pages pair them with the self-care note after the commentary;
  // pages without prose carry a single note (cautions, pregnancy or info).
  const cautions = leafCautions({
    ed,
    legacy,
    point,
    t,
    dict,
    datasetLang,
    entry,
    leafCard,
    fourGates,
  });

  const summaryText = arm?.summary ?? point.canonicalOneLiner;
  const summary = (
    <Speakable suppressJsonLd as="p" className="m-0 text-base leading-[1.45]">
      {summaryText}
    </Speakable>
  );

  const commentary = leafCommentary({ arm, legacy, dict, t });

  const placement = leafPlacement({
    point,
    entry,
    position,
    leafCard,
    locale,
    pageUrl,
    reviewed,
    t,
  });

  const identity: LeafIdentity = {
    code: point.code,
    name: point.name,
    pinyin: point.pinyin,
    hanzi: point.hanzi,
    categories: entry?.category ?? point.category,
    gloss: leafCard?.gloss,
  };
  const lines = leafLines({ point, entry, arm, text: t, card: leafCard, datasetLang });
  const quote = leafCard?.quote;

  const { faqs } = commentary;
  const graph = pointGraph({ r, pagePath, point, pageUrl, reviewed, ed, locale, citations, faqs });

  return {
    ...relations,
    ...cautions,
    ...commentary,
    ...placement,
    position,
    r,
    t,
    hanLang,
    dict,
    lines,
    locale,
    identity,
    quote,
    summary,
    text,
    datasetLang,
    leafCard,
    arm,
    citations,
    reviewed,
    pagePath,
    point,
    graph,
  };
};

/**
 * The Four Gates card on LI4 and LV3; the leaf's other pairings stay as links under it.
 * @param props Four Gates point identity and card builder
 * @param props.code canonical point identifier
 * @param props.t localized leaf labels and text templates
 * @param props.pairs related point cards
 * @param props.card converter from a registry point to a link card
 * @returns the hand and foot pairing for a Four Gates point, when its partner exists
 */
export function fourGatesFor({
  code,
  t,
  pairs,
  card,
}: {
  code: string;
  t: LeafText;
  pairs: readonly CardPoint[];
  card: (p: AnyPoint) => CardPoint;
}): FourGates | undefined {
  if (!(FOUR_GATES as readonly string[]).includes(code)) {
    return undefined;
  }
  const [hand, foot] = FOUR_GATES.map((c) => pointByCode(c));
  if (!hand || !foot) {
    return undefined;
  }

  return {
    text: t.fourGates,
    gates: [
      { point: card(hand), limbs: t.fourGates.hands },
      { point: card(foot), limbs: t.fourGates.feet },
    ],
    also: pairs.filter((p) => !(FOUR_GATES as readonly string[]).includes(p.code)),
  };
}

/**
 * Breaths in one pacer round: the press line's seconds at a slow breath each, a minute by default.
 * @param leafCard localized instructions and timing
 * @returns the rounded breath count bounded to the pacer range
 */
export function breathsFor(leafCard: LocalLeafCard): number {
  const seconds = leafCard.timing.seconds ?? SECONDS_PER_MINUTE;

  return Math.min(MAX_BREATHS, Math.max(MIN_BREATHS, Math.round(seconds / SECONDS_PER_BREATH)));
}

/**
 * The pacer's strings, filled for this leaf's breath count.
 * @param t localized leaf labels and text templates
 * @param leafCard localized instructions and timing
 * @returns the pacer labels filled with this leaf’s breath count and duration
 */
export function pacerText(t: LeafText, leafCard: LocalLeafCard): BreathPacerText {
  const p = t.pacer;
  const breaths = breathsFor(leafCard);
  const seconds = breaths * SECONDS_PER_BREATH;
  const duration =
    seconds === SECONDS_PER_MINUTE
      ? p.minute
      : seconds % SECONDS_PER_MINUTE === 0
        ? fill(p.minutes, { n: seconds / SECONDS_PER_MINUTE })
        : fill(p.seconds, { n: seconds });

  return {
    capHan: p.cap.han,
    capLabel: p.cap.label,
    title: fill(p.title, { n: p.counts[breaths - 1] ?? String(breaths) }),
    body: fill(p.body, { duration }),
    start: p.start,
    stop: p.stop,
    again: p.again,
    breatheOut: p.breatheOut,
    breatheIn: p.breatheIn,
    done: p.done,
    unit: p.unit,
    progress: p.progress,
  };
}
