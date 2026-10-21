import Link from 'next/link';

import { Cap } from '@/components/primitives/Cap';
import { Speakable } from '@/components/primitives/Speakable';
import { VerticalTitle } from '@/components/primitives/VerticalTitle';
import { HelpBox } from '@/features/conditions/components/HelpBox';
import { conditionLabel, conditionsCopy } from '@/features/conditions/copy';
import { sectionIn } from '@/features/conditions/sections';
import { cn } from '@/utilities/cn';
import { hanLang } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import type { ReactNode } from 'react';

import type { conditionBySlug } from '@/content/conditions';
import type { EditorialArm } from '@/content/editorial/schema';
import type { RoutineFacts, RoutinePoint } from '@/features/conditions/data';
import type { Locale } from '@/utilities/routes';

/** condition labels, summary, routine, and urgent-care passages */
type ConditionHeroProps = {
  locale: Locale;
  arm: EditorialArm | undefined;
  condition: NonNullable<ReturnType<typeof conditionBySlug>>;
  set: RoutinePoint[];
  routine: RoutineFacts | undefined;
};

/**
 * renders condition title, summary, practice link, and urgent advice
 * @param props condition labels, summary, routine, and urgent-care passages
 * @returns the condition title, summary, practice link, and urgent advice
 */
export const ConditionHero = (props: Readonly<ConditionHeroProps>): ReactNode => {
  const { locale, arm, condition, set, routine } = props;
  const label = conditionLabel(locale, condition);
  const copy = conditionsCopy(locale);
  const zh = locale !== 'en';
  const r = localizedRoutes(locale);
  const dict = getDictionary(locale);
  const help = arm ? sectionIn(arm, condition.slug, 'help') : undefined;

  return (
    <section
      className="
        mt-8 grid items-start gap-10
        lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-14
      ">
      <div className="flex items-start gap-7">
        <VerticalTitle>{label.slip}</VerticalTitle>
        <div className="flex min-w-0 flex-col gap-3.5 pt-2">
          <Cap zh="方" zhLang={hanLang(locale)}>
            {copy.condition.kicker}
          </Cap>
          <h1
            className={cn(
              `
                m-0 text-[2.5rem] leading-none font-medium tracking-[-0.01em]
                sm:text-[3.25rem]
                lg:text-[4rem]
              `,
              zh && 'tc',
            )}>
            {label.name}
          </h1>
          <Speakable
            as="p"
            className="
              m-0 max-w-xl font-(family-name:--font-sans) text-lead/normal
              text-ink-soft not-italic
            ">
            {arm?.summary ?? condition.canonicalOneLiner}
          </Speakable>
          {set.length > 0 ? (
            <Link className="btn btn-primary mt-1 self-start" href={r.practice(condition.slug)}>
              {copy.shared.pressAlong}
            </Link>
          ) : null}
        </div>
      </div>

      <HelpBox urgent id="help-now" title={copy.condition.helpTitle}>
        {routine ? (
          <ul className="m-0 flex flex-col gap-1 pl-5">
            {routine.help.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        ) : (
          <p className="m-0">
            {help?.paragraphs[0] ?? arm?.selfCareLimits ?? dict.disclaimers.selfCareNotice}
          </p>
        )}
        {help ? (
          <a className="wb-link red self-start text-base" href={`#${help.id}`}>
            {copy.condition.helpMore}
          </a>
        ) : null}
      </HelpBox>
    </section>
  );
};
