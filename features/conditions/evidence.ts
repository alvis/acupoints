/**
 * Read model for a condition's cited evidence: the Chinese-medicine
 * authorities that name its points and the clinical research that weighed
 * them, localized for the page with links that open each source.
 */

import { evidenceBySlug } from '@/content/evidence';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import type { EvidenceSource } from '@/content/evidence';
import type { RoutineLine } from '@/content/protocols';
import type { Locale } from '@/utilities/routes';

/** One cited source of a condition's evidence, in the page locale. */
export interface EvidenceSourceView {
  kind: EvidenceSource['kind'];
  /** Issuing body or first author. */
  by: string;
  title: string;
  /** The source's own Chinese title on English pages, for Chinese-medicine sources. */
  original?: string;
  year: number;
  /** Where the source opens: its DOI resolver link, else its URL. */
  href: string;
  /** Standard number or other identifier. */
  ref?: string;
  /** The points the source names, with locale-prefixed leaf links. */
  points: Array<{ code: string; href: string }>;
  finding: string;
}

/** What a condition's advice rests on, in the page locale. */
export interface EvidenceView {
  summary: string;
  chinese: EvidenceSourceView[];
  research: EvidenceSourceView[];
}

/**
 * What a condition's advice rests on, in the page locale: the
 * Chinese-medicine authorities that name its points and the research that
 * weighed them, each with a link that opens the source.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns the localized evidence, when written up
 */
export function conditionEvidence(slug: string, locale: Locale): EvidenceView | undefined {
  const entry = evidenceBySlug(slug);
  if (!entry) {
    return undefined;
  }

  return {
    summary: localLine(entry.summary, locale),
    chinese: entry.chinese.map((source) => sourceView(source, locale, true)),
    research: entry.research.map((source) => sourceView(source, locale, false)),
  };
}

/**
 * localizes one cited source
 * @param source authored citation
 * @param locale page language and writing system
 * @param chinese whether the source is a Chinese-medicine authority, whose own title English pages keep beside the translation
 * @returns the citation in the page language with its links
 */
function sourceView(source: EvidenceSource, locale: Locale, chinese: boolean): EvidenceSourceView {
  const r = localizedRoutes(locale);

  return {
    kind: source.kind,
    by: localLine(source.by, locale),
    title: localLine(source.title, locale),
    original: chinese && locale === 'en' ? source.title.zh : undefined,
    year: source.year,
    href: source.doi ? `https://doi.org/${source.doi}` : (source.url ?? ''),
    ref: source.ref,
    points: (source.points ?? []).map((code) => ({ code, href: r.point(code) })),
    finding: localLine(source.finding, locale),
  };
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
