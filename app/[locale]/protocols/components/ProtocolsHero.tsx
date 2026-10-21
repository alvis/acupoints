import { Cap } from '@/components/primitives/Cap';
import { Speakable } from '@/components/primitives/Speakable';
import { VerticalTitle } from '@/components/primitives/VerticalTitle';
import { hanLang } from '@/utilities/i18n/contentLabels';

import type { ReactNode } from 'react';

import type { ConditionsCopy, ProtocolsCopy } from '@/features/conditions/copy';
import type { Locale } from '@/utilities/routes';

import type { Fact } from './protocolsIndexModel';

/** localized title, decorative marks, and routine facts */
interface ProtocolsHeroProps {
  copy: ConditionsCopy;
  locale: Locale;
  text: ProtocolsCopy;
  facts: Fact[];
}

/**
 * renders routines title, introduction, and ruled facts table
 * @param props localized title, decorative marks, and routine facts
 * @returns the routines title, introduction, and ruled facts table
 */
export const ProtocolsHero = (props: Readonly<ProtocolsHeroProps>): ReactNode => {
  const { copy, locale, text, facts } = props;

  return (
    <section
      className="
        mt-8 grid items-end gap-10
        lg:grid-cols-[minmax(0,1fr)_27.5rem] lg:gap-14
      ">
      <div className="flex items-start gap-7">
        <VerticalTitle>{copy.marks.slip}</VerticalTitle>
        <div className="flex min-w-0 flex-col gap-3.5 pt-2">
          <Cap zh="方" zhLang={hanLang(locale)}>
            {text.kicker}
          </Cap>
          <h1
            className="
              m-0 text-[2.5rem] leading-none font-medium tracking-[-0.01em]
              sm:text-[3.25rem]
              lg:text-[4rem]
            ">
            {text.title[0]}
            <br />
            {text.title[1]}
          </h1>
          <Speakable
            as="p"
            className="
              m-0 max-w-150 font-(family-name:--font-sans) text-lead/normal
              text-ink-soft not-italic
            ">
            {text.intro}
          </Speakable>
        </div>
      </div>
      <dl
        className="
          m-0 grid grid-cols-[9.5rem_minmax(0,1fr)] border-t-[2.5px] border-ink
          text-[1.0625rem]
        ">
        {facts.map((fact, i) => {
          const rule =
            i === facts.length - 1
              ? 'border-b border-[color:var(--color-ink)]'
              : 'border-b border-[color:var(--color-rule)]';

          return (
            <div className="contents" key={fact.label}>
              <dt
                className={`
                  cap py-3
                  ${rule}
                `}>
                {fact.label}
              </dt>
              <dd
                className={`
                  m-0 py-2.5
                  ${rule}
                `}>
                {fact.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};
