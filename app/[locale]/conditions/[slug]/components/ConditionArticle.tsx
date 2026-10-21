import { notFound } from 'next/navigation';

import { conditionBySlug, conditions } from '@/content/conditions';
import { loadProseRegistry } from '@/content/pages';
import { Crumbs } from '@/features/conditions/components/Crumbs';
import { conditionLabel, conditionsCopy } from '@/features/conditions/copy';
import {
  evidenceLine,
  leadSentences,
  linkedPoints,
  routineFacts,
  routinePoints,
} from '@/features/conditions/data';
import { conditionEvidence } from '@/features/conditions/evidence';
import { sectionIn } from '@/features/conditions/sections';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { ConditionHero } from './ConditionHero';
import { ConditionNotes } from './ConditionNotes';
import { ConditionProse } from './ConditionProse';
import { ConditionRoutine } from './ConditionRoutine';
import { EvidenceBox } from './EvidenceBox';

import type { FC } from 'react';

import type { Crumb } from '@/features/conditions/components/Crumbs';
import type { Locale } from '@/utilities/routes';

import type { RelatedLink, WhyNote } from './ConditionNotes';

/** Props for {@link ConditionArticle}. */
export type ConditionArticleProps = {
  locale: Locale;
  slug: string;
};

const LEAD_SENTENCE_COUNT = 3;

/**
 * One condition in the Woodblock Chart: the cartouche hero with the get-help
 * box, the carved block of the set (plates, fish-tail strip, numbered list),
 * the why / evidence / related boxes, the cited sources the advice rests on
 * and the authored prose in full. Loads its
 * own content; unknown slugs are a 404.
 * @param props page locale and condition slug
 * @param props.locale page language and writing system
 * @param props.slug condition identifier in the content registry
 * @returns the condition hero, routine, notes, and authored prose
 */
export const ConditionArticle: FC<ConditionArticleProps> = async ({ locale, slug }) => {
  const condition = conditionBySlug(slug);
  if (!condition) {
    notFound();
  }

  const r = localizedRoutes(locale);
  const registry = await loadProseRegistry();
  const proseModule = registry.hub('condition', condition.slug);
  const arm = proseModule ? armForLocale(proseModule, locale) : undefined;
  const copy = conditionsCopy(locale);
  const dict = getDictionary(locale);
  const label = conditionLabel(locale, condition);
  const zh = locale !== 'en';

  const set = routinePoints(condition, { module: proseModule, locale, registry });
  const routine = routineFacts(condition.slug, locale);
  const tradition = arm ? sectionIn(arm, condition.slug, 'tradition') : undefined;

  const crumbs: Crumb[] = [
    { href: r.conditions, label: copy.shared.conditions, han: '症' },
    { href: r.condition(condition.slug), label: label.name, han: zh ? undefined : label.han },
  ];
  const why: WhyNote | undefined = tradition
    ? {
        id: tradition.id,
        heading: tradition.heading,
        lead: leadSentences(tradition.paragraphs[0] ?? '', LEAD_SENTENCE_COUNT),
      }
    : undefined;
  const evidence = arm ? evidenceLine(arm) : undefined;
  const sources = conditionEvidence(condition.slug, locale);
  const related: RelatedLink[] = [
    ...conditions
      .filter((other) => other.slug !== condition.slug)
      .map((other) => {
        const otherLabel = conditionLabel(locale, other);

        return {
          href: r.condition(other.slug),
          han: otherLabel.han,
          label: zh ? undefined : otherLabel.name,
        };
      }),
    ...linkedPoints(
      condition,
      set.map((point) => point.code),
    ).map((point) => ({
      href: r.point(point.code),
      han: armText(point.hanzi, locale),
      code: point.code,
    })),
  ];

  return (
    <article
      data-pagefind-body
      className="
        mx-auto max-w-[1440px] px-4 pt-6 pb-4
        sm:px-8
        lg:px-20
      ">
      <Crumbs items={crumbs} label={copy.shared.breadcrumb} />

      <ConditionHero {...{ locale, arm, condition, set, routine }} />

      {set.length > 0 ? <ConditionRoutine {...{ label, copy, set, routine }} /> : null}

      <ConditionNotes
        className="mt-16"
        evidence={evidence}
        evidenceTitle={copy.condition.evidenceTitle}
        marks={copy.marks}
        related={related}
        relatedTitle={copy.condition.relatedTitle}
        why={why}
        whyTitle={copy.condition.whyTitle}
      />

      {sources ? (
        <EvidenceBox
          className="mt-7"
          copy={copy.condition.sourceBox}
          evidence={sources}
          mark={copy.marks.evidence}
        />
      ) : null}

      {arm && proseModule ? (
        <ConditionProse
          arm={arm}
          citeTitle={proseModule.title}
          className="mt-20"
          faqTitle={dict.faqHeading}
          lastReviewed={proseModule.lastReviewed}
          lastReviewedLabel={copy.condition.lastReviewed}
          locale={locale}
          marks={copy.marks}
          pagePath={r.condition(condition.slug)}
          readTitle={copy.condition.readTitle}
          selfCareNotice={dict.disclaimers.selfCareNotice}
          selfCareTitle={dict.disclaimers.selfCareTitle}
          sources={proseModule.sources}
          sourcesTitle={copy.condition.sourcesTitle}
        />
      ) : null}
    </article>
  );
};
