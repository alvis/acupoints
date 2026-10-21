import { loadProseRegistry } from '@/content/pages';
import { Crumbs } from '@/features/conditions/components/Crumbs';
import { CONDITION_GROUPS, conditionsCopy } from '@/features/conditions/copy';
import { conditionSets, pregnancyPoints } from '@/features/conditions/data';
import { fill } from '@/features/conditions/format';
import { hanNumeral } from '@/utilities/hanNumeral';
import { localizedRoutes } from '@/utilities/routes';

import { ConditionCard } from './ConditionCard';
import { ConditionShelf } from './ConditionShelf';
import { ConditionsHero } from './ConditionsHero';
import { RoutineInstructions } from './RoutineInstructions';

import type { FC, JSX } from 'react';

import type { Crumb } from '@/features/conditions/components/Crumbs';
import type { ConditionSet } from '@/features/conditions/data';
import type { Locale } from '@/utilities/routes';

import type { ShelfGroup } from './ConditionShelf';

/** Props for {@link ConditionsIndex}. */
export type ConditionsIndexProps = {
  locale: Locale;
};

/** Grid span of each shelf, as the board lays the four body areas out. */
const SHELF_SPANS: Record<string, 1 | 2> = { head: 1, mind: 2, belly: 2, back: 1 };

/**
 * The conditions index in the Woodblock Chart: the 症候 cartouche hero with
 * the counts, a get-help-now box listing the signs gathered from every
 * condition's red flags, the filterable shelves of condition cards and the
 * three-step explainer of how a set is pressed.
 * @param props locale for resolving the condition shelves
 * @param props.locale page language and writing system
 * @returns the condition shelves, urgent advice, and routine instructions
 */
export const ConditionsIndex: FC<ConditionsIndexProps> = async ({ locale }) => {
  const r = localizedRoutes(locale);
  const copy = conditionsCopy(locale);
  const zh = locale !== 'en';
  const sets = conditionSets(locale, await loadProseRegistry());
  const firstPractice = sets.find((set) => set.points.length > 0);

  const crumbs: Crumb[] = [
    { href: r.home, label: copy.shared.home, han: '首' },
    { href: r.conditions, label: copy.shared.conditions, han: zh ? undefined : '症候' },
  ];

  const card = (set: ConditionSet): JSX.Element => {
    const avoid = pregnancyPoints(set.points);
    const list = avoid
      .map((point) => (zh ? point.hanzi : point.pinyinName))
      .join(copy.practice.listJoin);
    const caution: [string, string] | undefined =
      set.routine?.caution ??
      (avoid.length > 0
        ? [fill(copy.shared.cardCaution[0], { list }), fill(copy.shared.cardCaution[1], { list })]
        : undefined);

    return (
      <ConditionCard
        badge={`${hanNumeral(set.points.length)}穴`}
        caution={caution}
        count={
          set.routine
            ? fill(copy.shared.setMinutes, { n: set.points.length, min: set.routine.minutes })
            : fill(copy.shared.pointsCount, { n: set.points.length })
        }
        han={set.label.han}
        href={r.condition(set.condition.slug)}
        key={set.condition.slug}
        name={zh ? undefined : set.label.name}
        oneLiner={set.oneLiner}
        points={set.points}
        readSet={copy.shared.readSet}
      />
    );
  };

  const groups: ShelfGroup[] = CONDITION_GROUPS.map((group) => {
    const members = group.slugs.flatMap((slug) =>
      sets.filter((set) => set.condition.slug === slug),
    );

    return {
      key: group.key,
      han: zh ? undefined : group.han,
      title: copy.shared.groups[group.key],
      size: members.length,
      sizeLabel: fill(members.length === 1 ? copy.shared.setCount : copy.shared.setsCount, {
        n: members.length,
      }),
      span: SHELF_SPANS[group.key] ?? 1,
      cards: members.map(card),
    };
  });

  return (
    <article
      data-pagefind-body
      className="
        mx-auto max-w-[1440px] px-4 pt-6 pb-4
        sm:px-8
        lg:px-20
      ">
      <Crumbs items={crumbs} label={copy.shared.breadcrumb} />

      <ConditionsHero {...{ locale, copy, sets }} />

      <div className="mt-[52px]">
        <ConditionShelf
          all={copy.index.all}
          countAll={copy.index.countAll}
          countSome={copy.index.countSome}
          groups={groups}
          label={copy.index.shelfLabel}
          show={copy.index.show}
        />
      </div>

      <RoutineInstructions {...{ copy, firstPractice, r }} />
    </article>
  );
};
