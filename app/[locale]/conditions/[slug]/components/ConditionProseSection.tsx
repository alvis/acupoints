import { HAN_NUMERALS } from '@/utilities/hanNumeral';

import type { ReactNode } from 'react';

import type { EditorialSection } from '@/content/editorial/schema';

/** authored section and its zero-based reading position */
interface ConditionProseSectionProps {
  section: EditorialSection;
  i: number;
}

/**
 * renders numbered prose heading and its paragraphs
 * @param props authored section and its zero-based reading position
 * @returns the numbered prose heading and its paragraphs
 */
export const ConditionProseSection = (props: Readonly<ConditionProseSectionProps>): ReactNode => {
  const { section, i } = props;

  return (
    <section aria-labelledby={section.id} className="flex flex-col gap-3" key={section.id}>
      <div className="flex items-baseline gap-4 border-b border-rule pb-2">
        <span aria-hidden="true" className="
          tc text-[1.5rem] leading-none font-black
        ">
          {HAN_NUMERALS[i] ?? i + 1}
        </span>
        <h3 className="m-0 scroll-mt-24 text-[1.4rem] leading-tight font-medium" id={section.id}>
          {section.heading}
        </h3>
      </div>
      {section.paragraphs.map((paragraph) => (
        <p className="m-0 text-[1.0625rem] leading-[1.65]" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
};
