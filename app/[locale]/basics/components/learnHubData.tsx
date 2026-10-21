import { MarginNote } from '@/components/primitives/MarginNote';
import { basicSlugs, basicSummaryBySlug, seededBasicBySlug } from '@/content/basics';
import { glossaryBySlug } from '@/content/glossary';
import { loadProseRegistry } from '@/content/pages';
import {
  basicHan,
  isForthcoming,
  journalTag,
  learnTitle,
  newestFirst,
  pointsNamedIn,
  readingMinutes,
  splitTitle,
} from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { journalRow } from '@/features/learn/journalRows';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { teaserTerms } from './glossaryTeaser';
import { ROUTINE_SLUGS } from './LearnHubDetails';

import type { FactRow } from '@/features/learn/components/FactList';

import type { TeaserTarget } from './glossaryTeaser';
import type { LearnHubProps, Routine, Stop } from './LearnHubDetails';

interface LearnHubData {
  copy: ReturnType<typeof learnCopy>;
  r: ReturnType<typeof localizedRoutes>;
  stops: Stop[];
  basicsMinutes: number;
  rows: Array<ReturnType<typeof journalRow>>;
  terms: ReturnType<typeof teaserTerms>;
  routines: Routine[];
  han: (text: string) => string;
  english: boolean;
  crumbs: Array<{ href: string; label: string; zh: string | undefined }>;
  facts: FactRow[];
  first: Stop | undefined;
}

/**
 * prepare the published learning route and reference shelves
 * @param props page language
 * @param props.locale page language and writing system
 * @returns localized hub entries and summary facts
 */
export const loadLearnHub = async ({ locale }: LearnHubProps): Promise<LearnHubData> => {
  const copy = learnCopy(locale);
  const toneNote: readonly [string, string] = [copy.notA, copy.diagnosis];
  const r = localizedRoutes(locale);
  const registry = await loadProseRegistry();
  const now = new Date();

  const stops = basicSlugs.flatMap((slug): Stop[] => {
    const ed = registry.hub('static', `basics-${slug}`);
    if (!ed) {
      return [];
    }
    const arm = armForLocale(ed, locale);
    const enLine = seededBasicBySlug(slug)?.oneLiner ?? basicSummaryBySlug(slug)?.oneLiner;

    return [
      {
        slug,
        zh: basicHan(slug, locale) ?? '',
        title: learnTitle(`static/basics-${slug}`, ed.title, locale),
        line: locale === 'en' && enLine ? enLine : arm.summary,
        minutes: readingMinutes(arm, locale),
        sections: arm.sections.length,
        href: r.basic(slug),
      },
    ];
  });
  const basicsMinutes = stops.reduce((sum, s) => sum + s.minutes, 0);

  const posts = newestFirst(registry.journal);
  const published = posts.filter((p) => !isForthcoming(p, now));
  const forthcoming = posts.filter((p) => isForthcoming(p, now));
  const rows = [...published, ...forthcoming].map((post) =>
    journalRow(post, { locale, copy, forthcoming: isForthcoming(post, now) }),
  );

  const exists = (target: TeaserTarget): boolean =>
    target.kind === 'term'
      ? glossaryBySlug(target.slug) !== undefined
      : target.kind === 'journal'
        ? published.some((p) => p.slug === target.slug)
        : stops.some((s) => s.slug === target.slug);
  const terms = teaserTerms(locale, exists);

  const routines = ROUTINE_SLUGS.flatMap((slug): Routine[] => {
    const post = published.find((p) => p.slug === slug);
    if (!post) {
      return [];
    }
    const codes = pointsNamedIn(armForLocale(post, locale), locale)
      .slice(0, 2)
      .map((p) => p.code)
      .join(' · ');

    return [
      {
        slug,
        tag: journalTag(slug, locale),
        title: splitTitle(learnTitle(`journal/${slug}`, post.title, locale)).main,
        href: r.journalPost(slug),
        codes,
      },
    ];
  });

  const han = (text: string): string => armText(text, locale);
  const english = locale === 'en';
  const crumbs = [
    { href: r.home, label: copy.home, zh: english ? copy.homeHan : undefined },
    { href: r.basics, label: copy.learn, zh: english ? copy.learnHan : undefined },
  ];
  const journalValue =
    fill(copy.statJournalValue, { n: published.length }) +
    (forthcoming.length > 0 ? fill(copy.statForthcoming, { m: forthcoming.length }) : '');
  const facts: FactRow[] = [
    {
      term: copy.basics,
      value: fill(copy.statBasicsValue, { n: stops.length, min: basicsMinutes }),
    },
    { term: copy.journal, value: journalValue },
    { term: copy.glossary, value: copy.statGlossaryValue },
    {
      term: copy.statTone,
      value: (
        <>
          {copy.statToneValue} <MarginNote lines={toneNote} />
        </>
      ),
    },
  ];
  const first = stops.at(0);

  return {
    copy,
    r,
    stops,
    basicsMinutes,
    rows,
    terms,
    routines,
    han,
    english,
    crumbs,
    facts,
    first,
  };
};
