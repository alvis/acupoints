/**
 * One glossary entry shaped for a dictionary leaf, shared by the glossary
 * index and the term pages. Every line comes from content/glossary.ts, the
 * entry's prose under content/pages/glossary, or the leaf lines that restate
 * it in glossaryLeaf.ts; nothing here adds a claim.
 */

import { glossary } from '@/content/glossary';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { localizedRoutes } from '@/utilities/routes';

import { termHan } from './content';
import { glossaryFigure, glossaryLeaf } from './glossaryLeaf';

import type { FaqItem } from '@/components/composites/FaqBlock';
import type { EditorialHubModule } from '@/content/editorial/schema';
import type { GlossaryEntry } from '@/content/glossary';
import type { HanText } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

import type { GlossaryExample, GlossaryLeafLabels } from './components/GlossaryLeaf';
import type { LearnCopy } from './copy';
import type { GlossaryFigureData } from './glossaryLeaf';

/** A glossary entry, ready for a dictionary leaf. */
export type GlossaryTermData = {
  slug: string;
  term: string;
  /** Initial of the English headword, for the A to Z rail. */
  letter: string;
  zh: string;
  reading?: string;
  kind: string;
  aka?: string;
  /** The entry's summary in the page's arm, or its canonical one-liner. */
  means: string;
  line: string;
  meet: string;
  examples: readonly GlossaryExample[];
  faq?: FaqItem;
  href: string;
  /** Slugs of the terms listed under "See also". */
  related: readonly string[];
  figure?: GlossaryFigureData;
};

/** page context a glossary leaf is resolved against */
export interface GlossaryTermContext {
  /** editorial prose for the entry, when it has any */
  editorial: EditorialHubModule | undefined;
  /** page language and writing system */
  locale: Locale;
  /** localized interface strings */
  copy: LearnCopy;
}

/**
 * Glossary entries in A to Z order of their English headword.
 * @returns entries sorted by English headword
 */
export function glossaryAtoZ(): GlossaryEntry[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'en'));
}

/**
 * Leaf data for one entry. "See also" lists the entry's own related terms,
 * or the other entries in the glossary when it names none.
 * @param entry dictionary registry record
 * @param context editorial prose, locale, and interface strings for the page
 * @returns the localized dictionary page data
 */
export function glossaryTermData(
  entry: GlossaryEntry,
  context: GlossaryTermContext,
): GlossaryTermData {
  const { editorial, locale, copy } = context;
  const arm = editorial ? armForLocale(editorial, locale) : undefined;
  const leaf = glossaryLeaf(entry.slug, locale, copy);
  const han = termHan(entry.slug, locale);
  const faq = arm && leaf ? arm.faqs[leaf.faqIndex] : undefined;
  const related =
    entry.relatedTerms ??
    glossaryAtoZ()
      .map((other) => other.slug)
      .filter((slug) => slug !== entry.slug);

  return {
    slug: entry.slug,
    term: entry.term,
    letter: entry.term.charAt(0).toUpperCase(),
    zh: han?.zh ?? '',
    reading: han?.pinyin,
    kind: leaf?.kind ?? '',
    aka: leaf?.aka,
    means: arm?.summary ?? entry.oneLiner,
    line: leaf?.line ?? entry.oneLiner,
    meet: leaf?.meet ?? '',
    examples: leaf?.examples ?? [],
    faq,
    href: localizedRoutes(locale).glossaryTerm(entry.slug),
    related,
    figure: glossaryFigure(entry.slug, locale),
  };
}

/**
 * The leaf's row labels and Han marks in the page's script.
 * @param copy localized interface strings
 * @param han Han script converter
 * @returns localized definition-row headings
 */
export function glossaryLeafLabels(copy: LearnCopy, han: HanText): GlossaryLeafLabels {
  return {
    also: copy.alsoLabel,
    means: copy.means,
    meansHan: han('義'),
    line: copy.inOneLine,
    lineHan: han('一言'),
    meet: copy.meetIt,
    meetHan: han('見'),
    seeAlso: copy.seeAlso,
    seeAlsoHan: han('參'),
    asked: copy.askedOften,
    askedHan: han('問'),
    leafArrow: copy.leafArrow,
  };
}
