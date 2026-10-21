import Link from 'next/link';

import { glossaryBySlug } from '@/content/glossary';
import { loadProseRegistry } from '@/content/pages';
import { LearnComingSoon } from '@/features/learn/components/LearnComingSoon';
import { learnTitle, termHan } from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { glossaryTermData } from '@/features/learn/glossaryTerms';
import { contentLabels } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { GlossaryTermView } from './GlossaryTermView';

import type { FC } from 'react';

import type { LearnCrumb } from '@/features/learn/components/LearnCrumbs';
import type { Locale } from '@/utilities/routes';

import type { GlossaryTermModel } from './GlossaryTermModel';

/** Props for {@link GlossaryTerm}. */
export type GlossaryTermProps = {
  locale: Locale;
  /** Glossary slug from the route. */
  term: string;
};

export const PARA = 'm-0 text-[1.1rem] leading-[1.6]';

/**
 * A glossary term page, as the Glossary board sets the leaf: the dictionary
 * leaf with the entry's summary as its speakable meaning, then the whole
 * entry in numbered parts, the self-care limits, questions, sources and the
 * review line. Entries without prose fall back to their seed body, and
 * unknown terms to the coming-soon leaf.
 * @param props entry slug and reading locale
 * @returns the glossary entry page or its coming-soon leaf
 */
export const GlossaryTerm: FC<GlossaryTermProps> = async (props) => {
  const model = await useGlossaryTermModel(props);

  return 'fallback' in model ? model.fallback : <GlossaryTermView {...model} />;
};

/**
 * load a glossary entry and resolve its localized editorial reading.
 * @param props entry slug and reading locale
 * @param props.locale language used for links and copy
 * @param props.term glossary slug from the route
 * @returns the localized entry, editorial prose, and navigation, or a coming-soon fallback
 */
export const useGlossaryTermModel = async ({
  locale,
  term,
}: GlossaryTermProps): GlossaryTermModel => {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const dict = getDictionary(locale);
  const labels = contentLabels(locale);
  const english = locale === 'en';
  const han = (text: string): string => armText(text, locale);
  const headwordLang = english ? undefined : 'en';
  // Static-hub markdown files use family-prefixed slugs (`glossary-…`).
  const ed = (await loadProseRegistry()).hub('static', `glossary-${term}`);
  const entry = glossaryBySlug(term);
  const key = `static/glossary-${term}`;

  const crumbs = (label: string, zh?: string): LearnCrumb[] => [
    { href: r.basics, label: copy.learn, zh: english ? copy.learnHan : undefined },
    { href: r.glossary, label: copy.glossary, zh: english ? copy.glossaryHan : undefined },
    { href: r.glossaryTerm(term), label, zh: english ? zh : undefined },
  ];

  if (!entry) {
    return {
      fallback: (
        <LearnComingSoon
          changelogHref={r.changelog}
          changelogLabel={copy.changelog}
          crumbs={crumbs(learnTitle(key, ed?.title ?? term, locale))}
          crumbsLabel={copy.breadcrumb}
          kicker={`${copy.glossaryHan} · ${copy.comingSoon}`}
          oneLiner={copy.comingText}
          rssLabel={copy.rssFeed}
          text={copy.comingText}
          title={learnTitle(key, ed?.title ?? term, locale)}
        />
      ),
    };
  }

  const data = glossaryTermData(entry, { editorial: ed, locale, copy });
  const arm = ed ? armForLocale(ed, locale) : undefined;
  const opener = english ? entry.opener : undefined;
  const related = data.related.flatMap((slug) => {
    const other = glossaryBySlug(slug);

    return other
      ? [
          {
            slug,
            term: other.term,
            href: r.glossaryTerm(slug),
            zh: termHan(slug, locale)?.zh ?? '',
          },
        ]
      : [];
  });

  const seeAlso = (
    <ul
      aria-label={copy.relatedGroup}
      className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
      {related.map((other) => (
        <li key={other.slug}>
          <Link
            className="
              btn btn-secondary gap-1.5 px-3.5 py-2 text-base no-underline
            "
            href={other.href}>
            <span aria-hidden="true" className="tc font-bold">
              {other.zh}
            </span>
            <span lang={headwordLang}>{other.term}</span> →
          </Link>
        </li>
      ))}
    </ul>
  );

  return {
    crumbs,
    english,
    entry,
    contentKey: key,
    locale,
    data,
    copy,
    headwordLang,
    han,
    seeAlso,
    opener,
    arm,
    ed,
    dict,
    labels,
    r,
    term,
  };
};
