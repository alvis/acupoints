/**
 * Read models for the conditions area: the ordered set of points each
 * condition's authored prose names, and the prose sections that play a role
 * on the page (the routine, the traditional rationale, the red flags).
 *
 * Nothing here is authored fact. Point sets come from the condition's
 * curated `pickerPoints` and the point codes its English prose cites, ordered
 * by where the routine section first names each point; locations come from
 * the point's leaf card, else the point registry (English) or the point's own
 * Chinese prose arm; timings, pressing lines and red flags come from the
 * condition's written routine (content/protocols.ts).
 */

import { isCataloguePoint } from '@/content/catalog';
import { conditions } from '@/content/conditions';
import { leafCardByCode } from '@/content/leaves';
import { pointByCode, points } from '@/content/points';
import { routineBySlug, urgentSigns } from '@/content/protocols';
import { armForLocale, summaryForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { CONDITION_GROUPS, conditionLabel } from './copy';
import { sectionId, sectionIn } from './sections';

import type { EditorialArm, EditorialHubModule } from '@/content/editorial/schema';
import type { ProseRegistry } from '@/content/pages';
import type { RoutineLine, RoutineNote, RoutineStep } from '@/content/protocols';
import type { AnyPoint, Condition } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

import type { ConditionLabel } from './copy';

const _CAREFUL_FINDING = 3;

/**
 * How a point is pressed: one side then the other (`lr`), both sides at once
 * (`both`, head and neck points both hands reach), or once on the midline.
 */
export type PressSides = 'lr' | 'both' | 'mid';

/** One point of a condition's set, resolved for a page locale. */
export interface RoutinePoint {
  code: string;
  /** Point name in the page locale (pinyin name in English, hanzi in Chinese). */
  name: string;
  /** Latin pinyin name, kept for English labels and announcements. */
  pinyinName: string;
  /** Hanzi in the page locale's script. */
  hanzi: string;
  /** One location line in the page locale. */
  where: string;
  /** The registry marks the point as traditionally avoided in pregnancy. */
  avoidInPregnancy: boolean;
  /** One press on the midline, both sides at once, or one side then the other. */
  sides: PressSides;
  /**
   * How to press it in the page locale: the routine's own line, else the
   * leaf card's, else the registry's last how-to-find step (English only).
   */
  how?: string;
  /** Two-line margin note the routine sets beside the point. */
  note?: [string, string];
  /** Locale-prefixed leaf URL. */
  href: string;
}

/** One condition with its resolved set, as the index and protocols list it. */
export interface ConditionSet {
  condition: Condition;
  label: ConditionLabel;
  /** One-line summary in the page locale. */
  oneLiner: string;
  points: RoutinePoint[];
  /** Anchor of the condition's "get help" prose section, when it has one. */
  helpId?: string;
  /** The condition's written routine, when one exists. */
  routine?: RoutineFacts;
}

/** A condition's written routine, resolved for a page locale. */
export interface RoutineFacts {
  /** About how many minutes the whole routine takes. */
  minutes: number;
  /** How hard the points are to find: 1 easy, 2 fair, 3 takes care. */
  finding: 1 | 2 | typeof _CAREFUL_FINDING;
  /** Card line on the conditions index. */
  line: string;
  /** What the routine is for, on its slip. */
  purpose: string;
  /** The order of the set, in a sentence. */
  order: string;
  /** Where to sit or lie. */
  posture: string;
  /** How often. */
  often: string;
  /** Two-line card and slip note. */
  caution: [string, string];
  /** Signs that mean see a doctor before pressing. */
  help: string[];
}

/** Point codes as the prose cites them: LI4, GB20, EX-HN5 … */
const CODE_PATTERN = /\b(?:EX-[A-Z]{1,2}\d{1,2}|[A-Z]{1,3}\d{1,3})\b/gu;

/** The sentence where a condition's prose weighs the modern evidence. */
const EVIDENCE_PATTERN = /reviews suggest|綜述|综述/iu;

/** Condition slugs in shelf reading order. */
const SHELF_ORDER: readonly string[] = CONDITION_GROUPS.flatMap((group) => group.slugs);

const MIDLINE_MERIDIANS = new Set(['du', 'ren']);
const BOTH_HANDS_REGIONS = new Set(['head', 'neck']);

/**
 * Ordered point codes for a condition: the curated picker codes plus every
 * registry code the English prose cites, sorted by where the routine section
 * first names each point (by code or by name). Codes the routine never names
 * keep their curated / first-mention order after the named ones.
 * @param condition registry condition to describe
 * @param module authored editorial content
 * @returns identifiers in authored routine order
 */
export function routineCodes(
  condition: Condition,
  module: EditorialHubModule | undefined,
): string[] {
  const en = module?.en;
  const prose = en ? armStrings(en).join('\n') : condition.canonicalOneLiner;
  const candidates = [...(condition.pickerPoints ?? []), ...(prose.match(CODE_PATTERN) ?? [])];
  const known = [...new Set(candidates.map((code) => code.toUpperCase()))].filter((code) =>
    Boolean(pointByCode(code)),
  );
  const routine = en ? sectionIn(en, condition.slug, 'routine') : undefined;
  const routineText = routine ? routine.paragraphs.join('\n').toLowerCase() : '';
  const rank = (code: string): number => {
    const name = pointByCode(code)?.name.toLowerCase() ?? '';
    const hits = [
      routineText.indexOf(code.toLowerCase()),
      name ? routineText.indexOf(name) : -1,
    ].filter((index) => index >= 0);

    return hits.length > 0 ? Math.min(...hits) : Number.POSITIVE_INFINITY;
  };

  return known
    .map((code, order) => ({ code, order, at: rank(code) }))
    .sort((a, b) => a.at - b.at || a.order - b.order)
    .map(({ code }) => code);
}

/** page context a condition's routine is resolved against */
export interface RoutineContext {
  /** authored editorial content, when the condition has any */
  module: EditorialHubModule | undefined;
  /** page language and writing system */
  locale: Locale;
  /** resolved prose lookup */
  registry: ProseRegistry;
}

/**
 * Resolves a condition's ordered point set for the page locale.
 * @param condition registry condition to describe
 * @param context editorial content, locale, and prose lookup for the page
 * @returns the localized ordered routine
 */
export function routinePoints(condition: Condition, context: RoutineContext): RoutinePoint[] {
  const { module, locale, registry } = context;
  const routine = routineBySlug(condition.slug);
  const inLabor = routine?.pregnancy === 'labor-only';

  return routineCodes(condition, module).flatMap((code) => {
    const point = pointByCode(code);
    if (!point) {
      return [];
    }
    const resolved = toRoutinePoint(point, locale, { registry, step: routine?.steps[code] });

    return [inLabor ? { ...resolved, avoidInPregnancy: false } : resolved];
  });
}

/**
 * Every condition with its set, for the page locale, in shelf reading order
 * (the order routines are numbered in); conditions on no shelf come last.
 * @param locale page language and writing system
 * @param registry resolved prose lookup
 * @returns conditions in shelf order with resolved routines
 */
export function conditionSets(locale: Locale, registry: ProseRegistry): ConditionSet[] {
  return [...conditions]
    .sort((a, b) => shelfRank(a.slug) - shelfRank(b.slug))
    .map((condition) => {
      const editorial = registry.hub('condition', condition.slug);
      const routine = routineFacts(condition.slug, locale);

      return {
        condition,
        label: conditionLabel(locale, condition),
        oneLiner:
          routine?.line ??
          (locale === 'en' || !editorial
            ? condition.canonicalOneLiner
            : summaryForLocale(editorial, locale)),
        points: routinePoints(condition, { module: editorial, locale, registry }),
        helpId: sectionId(condition.slug, 'help'),
        routine,
      };
    });
}

/**
 * A condition's written routine in the page locale, when one exists.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns the localized authored routine, when available
 */
export function routineFacts(slug: string, locale: Locale): RoutineFacts | undefined {
  const routine = routineBySlug(slug);
  if (!routine) {
    return undefined;
  }

  return {
    minutes: routine.minutes,
    finding: routine.finding,
    line: localLine(routine.line, locale),
    purpose: localLine(routine.purpose, locale),
    order: localLine(routine.order, locale),
    posture: localLine(routine.posture, locale),
    often: localLine(routine.often, locale),
    caution: localNote(routine.caution, locale),
    help: routine.help.map((sign) => localLine(sign, locale)),
  };
}

/**
 * The general "get help now" signs, gathered across conditions, in the page locale.
 * @param locale page language and writing system
 * @returns localized urgent warning passages
 */
export function urgentSignLines(locale: Locale): string[] {
  return urgentSigns.map((sign) => localLine(sign, locale));
}

/**
 * The prose's own word on the modern evidence: the sentence that weighs what
 * reviews suggest, and the one after it, from a section or an FAQ answer of
 * an already-resolved arm.
 * @param arm localized editorial content
 * @returns the evidence passage, when found
 */
export function evidenceLine(arm: EditorialArm): string | undefined {
  const texts = [
    ...arm.sections.flatMap((section) => section.paragraphs),
    ...arm.faqs.map((faq) => faq.a),
  ];
  for (const text of texts) {
    const sentences = sentencesOf(text);
    const at = sentences.findIndex((sentence) => EVIDENCE_PATTERN.test(sentence));
    if (at >= 0) {
      return sentences
        .slice(at, at + 2)
        .join('')
        .trim();
    }
  }

  return undefined;
}

/**
 * Points of a set the registry marks as traditionally avoided in pregnancy.
 * @param set ordered routine entries
 * @returns entries flagged for pregnancy avoidance
 */
export function pregnancyPoints(set: readonly RoutinePoint[]): RoutinePoint[] {
  return set.filter((point) => point.avoidInPregnancy);
}

/**
 * Points the registry links to the condition that its set does not include.
 * @param condition registry condition to describe
 * @param setCodes identifiers already in the routine
 * @returns related entries outside the routine
 */
export function linkedPoints(condition: Condition, setCodes: readonly string[]): AnyPoint[] {
  return points.filter(
    (point) =>
      point.about.includes(`condition:${condition.slug}`) && !setCodes.includes(point.code),
  );
}

/**
 * The first `count` sentences of a paragraph (Latin or Han full stops).
 * @param text passage to process
 * @param count number of sentences to retain
 * @returns the requested opening sentences
 */
export function leadSentences(text: string, count: number): string {
  return sentencesOf(text).slice(0, count).join('').trim();
}

/**
 * orders a condition by its routine shelf
 * @param slug registry key to look up
 * @returns the shelf position, with unlisted entries last
 */
function shelfRank(slug: string): number {
  const at = SHELF_ORDER.indexOf(slug);

  return at >= 0 ? at : SHELF_ORDER.length;
}

/**
 * splits prose at Latin and Han sentence endings
 * @param text passage to process
 * @returns punctuated sentences or the original passage
 */
function sentencesOf(text: string): string[] {
  return (
    text.match(
      /(?<![^。.!?！？])(?:[^。.!?！？]+[。.!?！？]+(?=\s|$)|[^。.!?！？]+[。！？]+)/gu,
    ) ?? [text]
  );
}

/**
 * selects a bilingual line for the page
 * @param line authored bilingual line
 * @param locale page language and writing system
 * @returns the line in the page language
 */
function localLine(line: RoutineLine, locale: Locale): string {
  return locale === 'en' ? line.en : armText(line.zh, locale);
}

/**
 * selects and converts both caution lines
 * @param note bilingual caution pair
 * @param locale page language and writing system
 * @returns the caution pair in the page language
 */
function localNote(note: RoutineNote, locale: Locale): [string, string] {
  return locale === 'en' ? note.en : [armText(note.zh[0], locale), armText(note.zh[1], locale)];
}

/**
 * resolves an authored or catalog location instruction
 * @param point catalog entry to describe
 * @param locale page language and writing system
 * @param context authored routine content
 * @param context.registry resolved prose lookup
 * @param context.step optional authored routine instruction
 * @returns the localized location instruction
 */
function localWhere(
  point: AnyPoint,
  locale: Locale,
  { registry, step }: { registry: ProseRegistry; step: RoutineStep | undefined },
): string {
  if (step?.where) {
    return localLine(step.where, locale);
  }
  const leaf = leafCardByCode(point.code);

  return leaf ? localLine(leaf.where, locale) : whereLine(point, locale, registry);
}

/**
 * prepares a catalog point for a routine
 * @param point catalog entry to describe
 * @param locale page language and writing system
 * @param context authored routine content
 * @param context.registry resolved prose lookup
 * @param context.step optional authored routine instruction
 * @returns the prepared routine entry
 */
function toRoutinePoint(
  point: AnyPoint,
  locale: Locale,
  { registry, step }: { registry: ProseRegistry; step: RoutineStep | undefined },
): RoutinePoint {
  const hanzi = armText(point.hanzi, locale);
  const leaf = leafCardByCode(point.code);
  const registryHow =
    locale === 'en' && !isCataloguePoint(point) ? point.howToFind.at(-1) : undefined;
  const how = step
    ? localLine(step.how, locale)
    : leaf
      ? localLine(leaf.press, locale)
      : registryHow;

  return {
    code: point.code,
    name: locale === 'en' ? point.name : hanzi,
    pinyinName: point.name,
    hanzi,
    where: localWhere(point, locale, { registry, step }),
    avoidInPregnancy: !isCataloguePoint(point) && !point.pregnancySafe,
    sides: pressSides(point),
    how,
    note: step?.note ? localNote(step.note, locale) : undefined,
    href: localizedRoutes(locale).point(point.code),
  };
}

/**
 * reads the catalog's side guidance
 * @param point catalog entry to describe
 * @returns the catalog's side guidance
 */
function pressSides(point: AnyPoint): PressSides {
  if (MIDLINE_MERIDIANS.has(point.meridian)) {
    return 'mid';
  }

  return point.region && BOTH_HANDS_REGIONS.has(point.region) ? 'both' : 'lr';
}

/**
 * English reads the registry's WHO-style location; Chinese reads the
 * locating sentence of the point's own `where-it-sits` prose section, falling
 * back to the registry text when the point has no Chinese prose.
 * @param point catalog entry to describe
 * @param locale page language and writing system
 * @param registry resolved prose lookup
 * @returns the localized catalog location
 */
function whereLine(point: AnyPoint, locale: Locale, registry: ProseRegistry): string {
  const registryText = isCataloguePoint(point) ? point.location : point.whoCoordinates;
  if (locale === 'en') {
    return registryText;
  }
  const editorial = registry.pointByCode(point.code);
  const paragraph = editorial
    ? armForLocale(editorial, 'zh-hant').sections.find((section) => section.id === 'where-it-sits')
        ?.paragraphs[0]
    : undefined;
  if (!paragraph) {
    return registryText;
  }
  const sentences = paragraph.split('。').filter((sentence) => sentence.trim().length > 0);
  const locating =
    sentences.find((sentence) => /定位|定在|定於/u.test(sentence)) ?? sentences.at(0);

  return armText(`${locationClause(locating ?? paragraph)}。`, locale);
}

/**
 * Trims the authorial lead-in from a locating sentence so only the location
 * remains: text after a full-width colon ("…的定位：在足背…"), after a
 * "located at" verb, or the quoted dataset wording after a dash.
 * @param sentence location passage to shorten
 * @returns the passage with its introductory clause removed
 */
function locationClause(sentence: string): string {
  const colon = sentence.indexOf('：');
  const tail = colon >= 0 ? sentence.slice(colon + 1) : sentence;
  const quoted = /——“(.+?)”/u.exec(tail);
  if (quoted?.[1]) {
    return quoted[1];
  }

  return tail.replace(/^.*?(?:定位於|定位在|定在|定於)/u, '');
}

/**
 * gathers prose passages in reading order
 * @param arm localized editorial content
 * @returns the prose passages in reading order
 */
function armStrings(arm: EditorialArm): string[] {
  return [
    arm.summary,
    ...arm.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...arm.faqs.flatMap((faq) => [faq.q, faq.a]),
  ];
}
