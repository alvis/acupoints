import { Crumbs } from '@/features/conditions/components/Crumbs';
import { SafetyCards } from '@/features/conditions/components/SafetyCards';

import { ProtocolsHero } from './ProtocolsHero';
import { RoutineSlips } from './RoutineSlips';

import type { ReactNode } from 'react';

import type { Locale } from '@/utilities/routes';

import type { protocolsIndexModel } from './protocolsIndexModel';

/** localized routines index presentation */
type ProtocolsIndexViewProps = {
  locale: Locale;
  index: ReturnType<typeof protocolsIndexModel>;
};

/**
 * renders routines hero, prescription slips, and safety cards
 * @param props routine facts, prescription slips, breadcrumbs, and safety advice
 * @returns the routines hero, prescription slips, and safety cards
 */
export const ProtocolsIndexView = (props: Readonly<ProtocolsIndexViewProps>): ReactNode => {
  const { locale, index } = props;
  const { facts, legend, slips, crumbs, copy, text, pregnancyText, r } = index;

  return (
    <article
      data-pagefind-body
      className="
        mx-auto max-w-[1440px] px-4 pt-6 pb-4
        sm:px-8
        lg:px-20
      ">
      <Crumbs items={crumbs} label={copy.shared.breadcrumb} />

      <ProtocolsHero {...{ copy, locale, text, facts }} />

      <RoutineSlips {...{ text, legend, slips, r }} />

      <section aria-labelledby="before-any" className="mt-14">
        <div className="mb-5 flex items-baseline gap-5">
          <span aria-hidden="true" className="tc text-[1.875rem] font-black">
            戒
          </span>
          <h2
            className="
              m-0 text-[1.6rem] leading-tight font-medium
              md:text-[2rem]
            "
            id="before-any">
            {text.beforeTitle}
          </h2>
        </div>
        <SafetyCards
          copy={copy.shared.safety}
          idPrefix="before-any"
          pregnancyText={pregnancyText}
          stopText={copy.shared.safety.stopText}
          urgentHref={`${r.conditions}#help-now`}
          urgentLink={text.urgentLink}
          urgentText={text.urgentText}
          urgentTitle={text.urgentTitle}
        />
      </section>
    </article>
  );
};
