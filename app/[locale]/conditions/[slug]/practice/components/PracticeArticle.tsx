import { notFound } from 'next/navigation';

import { PointDetail } from '@/components/composites/PointDetail';
import { conditionBySlug } from '@/content/conditions';
import { loadProseRegistry } from '@/content/pages';
import { conditionsCopy } from '@/features/conditions/copy';
import { conditionSets, leadSentences } from '@/features/conditions/data';
import { fill } from '@/features/conditions/format';
import { sectionIn } from '@/features/conditions/sections';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';

import { PracticeArticleView } from './PracticeArticleView';

import type { FC } from 'react';

import type { PracticeCopy } from '@/features/conditions/copy';
import type { Locale } from '@/utilities/routes';

import type { PracticeStep } from './PracticeSession';

/** Props for {@link PracticeArticle}. */
export type PracticeArticleProps = {
  locale: Locale;
  slug: string;
};

const LEAD_SENTENCE_COUNT = 3;

/**
 * Guided practice for one condition's set: the step progress, the hero, the
 * client pressing session (plates cut on the server and handed in) and the
 * three safety cards, which stay visible whatever the session is doing.
 * @param props page locale and condition slug
 * @param props.locale page language and writing system
 * @param props.slug condition identifier in the content registry
 * @returns the guided practice page with persistent safety advice
 */
export const PracticeArticle: FC<PracticeArticleProps> = async ({ locale, slug }) => {
  const condition = conditionBySlug(slug);
  if (!condition) {
    notFound();
  }

  const registry = await loadProseRegistry();
  const sets = conditionSets(locale, registry).filter((set) => set.points.length > 0);
  const index = sets.findIndex((set) => set.condition.slug === condition.slug);
  const set = index < 0 ? undefined : sets.at(index);
  if (!set) {
    notFound();
  }

  const copy = conditionsCopy(locale);
  const dict = getDictionary(locale);
  const proseModule = registry.hub('condition', condition.slug);
  const arm = proseModule ? armForLocale(proseModule, locale) : undefined;
  const help = arm ? sectionIn(arm, condition.slug, 'help') : undefined;
  const { points, routine } = set;
  const urgentSigns = routine?.help.slice(0, LEAD_SENTENCE_COUNT) ?? [];
  const urgentText =
    urgentSigns.length > 0
      ? fill(copy.practice.urgentIf, { list: joinLast(urgentSigns, copy.practice) })
      : help
        ? leadSentences(help.paragraphs[0] ?? '', 2)
        : dict.disclaimers.selfCareNotice;

  const steps: PracticeStep[] = points.map((point) => ({
    ...point,
    plate: (
      <PointDetail
        code={point.code}
        label={fill(copy.practice.plate, { name: point.name, code: point.code })}
      />
    ),
  }));

  return (
    <PracticeArticleView
      {...{ locale, set, index, steps, urgentText }}
      total={sets.length}
      urgentFragment={help ? `#${help.id}` : ''}
    />
  );
};

/**
 * Joins clauses as a list: `a; b; or c`.
 * @param items the entries to render in order.
 * @param copy the localized interface text.
 * @returns the clauses separated by semicolons with a final localized conjunction
 */
function joinLast(items: readonly string[], copy: PracticeCopy): string {
  const head = items.slice(0, -1).join(copy.urgentJoin);
  const last = items.at(-1) ?? '';

  return head ? `${head}${copy.urgentLast}${last}` : last;
}
