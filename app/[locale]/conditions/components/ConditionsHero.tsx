import Link from 'next/link';

import { Cap } from '@/components/primitives/Cap';
import { Speakable } from '@/components/primitives/Speakable';
import { VerticalTitle } from '@/components/primitives/VerticalTitle';
import { HelpBox } from '@/features/conditions/components/HelpBox';
import { urgentSignLines } from '@/features/conditions/data';
import { fill } from '@/features/conditions/format';
import { hanLang } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import type { ReactNode } from 'react';

import type { ConditionsCopy } from '@/features/conditions/copy';
import type { ConditionSet } from '@/features/conditions/data';
import type { Locale } from '@/utilities/routes';

/** condition totals, routine durations, and urgent warning signs */
interface ConditionsHeroProps {
  locale: Locale;
  copy: ConditionsCopy;
  sets: ConditionSet[];
}

/**
 * renders conditions heading, routine counts, and urgent warning signs
 * @param props condition totals, routine durations, and urgent warning signs
 * @returns the conditions heading, routine counts, and urgent warning signs
 */
export const ConditionsHero = (props: Readonly<ConditionsHeroProps>): ReactNode => {
  const { locale, copy, sets } = props;
  const pointTotal = new Set(sets.flatMap((set) => set.points.map((point) => point.code))).size;
  const minutes = sets.flatMap((set) => (set.routine ? [set.routine.minutes] : []));
  const r = localizedRoutes(locale);
  const urgent = urgentSignLines(locale);

  return (
    <section
      className="
        mt-8 grid items-start gap-10
        lg:grid-cols-[minmax(0,1fr)_29rem] lg:gap-14
      ">
      <div className="flex items-start gap-7">
        <VerticalTitle>症候</VerticalTitle>
        <div className="flex min-w-0 flex-col gap-3.5 pt-2">
          <Cap zh="症候" zhLang={hanLang(locale)}>
            {copy.index.kicker}
          </Cap>
          <h1
            className="
              m-0 text-[2.5rem] leading-none font-medium tracking-[-0.01em]
              sm:text-[3.25rem]
              lg:text-[4rem]
            ">
            {copy.index.title[0]}
            <br />
            {copy.index.title[1]}
          </h1>
          <Speakable
            as="p"
            className="
              m-0 max-w-150 font-(family-name:--font-sans) text-lead/normal
              text-ink-soft not-italic
            ">
            {fill(copy.index.intro, { n: sets.length })}
          </Speakable>
          <p
            className="
              m-0 flex flex-wrap items-center gap-x-4 gap-y-1 text-base
              text-ink-soft
            ">
            <span>{fill(copy.index.sets, { n: sets.length })}</span>
            <span aria-hidden="true">·</span>
            <span>{fill(copy.index.points, { n: pointTotal })}</span>
            {minutes.length > 0 ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {fill(copy.index.minutes, {
                    min: Math.min(...minutes),
                    max: Math.max(...minutes),
                  })}
                </span>
              </>
            ) : null}
            <Link className="ml-2 text-ink underline underline-offset-[3px]" href={r.protocols}>
              <span aria-hidden="true" className="tc font-bold">
                方
              </span>{' '}
              {copy.index.allRoutines}
            </Link>
          </p>
        </div>
      </div>

      <HelpBox urgent id="help-now" title={copy.index.helpTitle}>
        <p className="m-0 text-base text-ink-soft">{copy.index.helpIntro}</p>
        <ul className="m-0 flex flex-col gap-1 pl-5">
          {urgent.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
        <p className="m-0 border-t border-seal/45 pt-2.5 text-base">
          {copy.index.helpFoot} <span className="red">{copy.index.helpFootRed}</span>
        </p>
      </HelpBox>
    </section>
  );
};
