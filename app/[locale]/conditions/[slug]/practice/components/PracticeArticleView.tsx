import Link from 'next/link';

import { Cap } from '@/components/primitives/Cap';
import { Speakable } from '@/components/primitives/Speakable';
import { Crumbs } from '@/features/conditions/components/Crumbs';
import { SafetyCards } from '@/features/conditions/components/SafetyCards';
import { conditionsCopy } from '@/features/conditions/copy';
import { pregnancyPoints } from '@/features/conditions/data';
import { fill } from '@/features/conditions/format';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';
import { hanLang } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import { PracticeSession } from './PracticeSession';

import type { ReactNode } from 'react';

import type { Crumb } from '@/features/conditions/components/Crumbs';
import type { ConditionSet } from '@/features/conditions/data';
import type { Locale } from '@/utilities/routes';

import type { PracticeStep } from './PracticeSession';

/** resolved practice steps, condition labels, and safety messages */
type PracticeArticleViewProps = {
  locale: Locale;
  set: ConditionSet;
  index: number;
  total: number;
  steps: PracticeStep[];
  urgentFragment: string;
  urgentText: string;
};

/**
 * renders practice session, introductory heading, and safety cards
 * @param props resolved practice steps, condition labels, and safety messages
 * @returns the practice session, introductory heading, and safety cards
 */
export const PracticeArticleView = (props: Readonly<PracticeArticleViewProps>): ReactNode => {
  const { locale, set, index, total, steps, urgentFragment, urgentText } = props;
  const { condition, label, points, routine } = set;
  const copy = conditionsCopy(locale);
  const r = localizedRoutes(locale);
  const zh = locale !== 'en';
  const join = copy.practice.listJoin;
  const avoid = pregnancyPoints(points)
    .map((point) => (zh ? `${point.hanzi}（${point.code}）` : `${point.name} (${point.code})`))
    .join(join);
  const crumbs: Crumb[] = [
    { href: r.conditions, label: copy.shared.conditions, han: zh ? undefined : '症候' },
    { href: r.condition(condition.slug), label: label.name, han: zh ? undefined : label.slip },
    { href: r.practice(condition.slug), label: copy.practice.crumb, han: '按' },
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

      <PracticeSession
        copy={copy.practice}
        doneHref={r.condition(condition.slug)}
        doneLabel={fill(copy.practice.backTo, { name: label.name })}
        hanMarks={copy.marks}
        slip={label.slip}
        steps={steps}
        zh={zh}>
        <section className="mt-[34px] flex flex-wrap items-end gap-x-10 gap-y-5">
          <div className="flex min-w-0 flex-[1_1_36rem] flex-col gap-3">
            <Cap zh={`方${hanNumeral(index + 1)} · ${label.slip}`} zhLang={hanLang(locale)}>
              {fill(copy.practice.kicker, {
                i: index + 1,
                total,
                min: routine?.minutes ?? '',
              })}
            </Cap>
            <h1
              className={cn(
                `
                  m-0 text-[2.25rem] leading-[1.02] font-medium
                  tracking-[-0.01em]
                  sm:text-[2.75rem]
                  lg:text-[3.375rem]
                `,
                zh && 'tc',
              )}>
              {fill(copy.practice.title, { name: label.name })}
            </h1>
            <Speakable
              as="p"
              className="
                m-0 max-w-204 font-(family-name:--font-sans) text-[1.1875rem]
                leading-normal text-ink-soft not-italic
              ">
              {fill(copy.practice.intro, {
                n: points.length,
                list: points.map((point) => point.name).join(join),
              })}
            </Speakable>
          </div>
          <Link className="btn btn-secondary" href={r.condition(condition.slug)}>
            {fill(copy.practice.about, { name: label.name })}
          </Link>
        </section>
      </PracticeSession>

      <section aria-labelledby="practice-safety" className="mt-14">
        <h2 className="sr-only" id="practice-safety">
          {copy.shared.safety.title}
        </h2>
        <SafetyCards
          copy={copy.shared.safety}
          idPrefix="practice-safety"
          pregnancyText={
            avoid
              ? fill(copy.shared.safety.pregnancyText, { list: avoid })
              : copy.shared.safety.pregnancyNone
          }
          stopText={copy.shared.safety.stopText}
          urgentHref={`${r.condition(condition.slug)}${urgentFragment}`}
          urgentText={urgentText}
          urgentTitle={copy.practice.urgentTitle}
        />
      </section>
    </article>
  );
};
