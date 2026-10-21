import { FaqLeaf } from '@/features/learn/components/FaqLeaf';
import { PartRow } from '@/features/learn/components/PartRow';
import { ReviewFooter } from '@/features/learn/components/ReviewFooter';
import { SourceList } from '@/features/learn/components/SourceList';
import { StopBox } from '@/features/learn/components/StopBox';
import { learnTitle, sentences } from '@/features/learn/content';
import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { H2, HEAD_RULE } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';

import { PARA } from './GlossaryTerm';

import type { ReactNode } from 'react';

import type { GlossaryTermViewModel } from './GlossaryTermView';

/**
 * show the full entry and its supporting editorial material.
 * @param props entry reading and supporting sources
 * @param props.model localized prose, entry data, source metadata, and navigation
 * @returns the numbered entry, cautions, questions, sources, and review line, or nothing without prose
 */
export const GlossaryEntryDetails = ({
  model,
}: Readonly<{ model: GlossaryTermViewModel }>): ReactNode => {
  const {
    english,
    contentKey: key,
    locale,
    data,
    copy,
    han,
    arm,
    ed,
    dict,
    labels,
    r,
    term,
  } = model;
  if (!arm || !ed) {
    return null;
  }

  return (
    <>
      <section aria-labelledby="entry" className="mt-16">
        <div className={cn('flex flex-wrap items-baseline gap-x-5 gap-y-1', HEAD_RULE)}>
          <span aria-hidden="true" className="tc text-[1.875rem] font-black">
            {data.zh}
          </span>
          <h2 className={H2} id="entry">
            {fill(copy.entryHeading, { n: countWord(arm.sections.length, locale) })}
          </h2>
        </div>
        <ol className="m-0 list-none p-0">
          {arm.sections.map((section, i) => (
            <PartRow heading={section.heading} id={section.id} key={section.id} n={i + 1}>
              {section.paragraphs.map((paragraph) => (
                <p className={PARA} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </PartRow>
          ))}
        </ol>
      </section>

      <StopBox
        className="mt-12 max-w-[760px]"
        lines={sentences(arm.selfCareLimits)}
        mark={han('止')}
        notice={dict.disclaimers.selfCareNotice}
        title={copy.stopBox}
      />

      <div className="mt-14 flex flex-col gap-12">
        <FaqLeaf faqs={arm.faqs} heading={dict.faqHeading} mark={han('問')} />
        <SourceList
          heading={copy.sources}
          mark={han('據')}
          sourceLang={english ? undefined : 'en'}
          sources={ed.sources}
        />
        <ReviewFooter
          citeLabel={labels.cite.text}
          citeTitle={learnTitle(key, ed.title, locale)}
          className="border-t-[2.5px] border-ink pt-4"
          locale={locale}
          pagePath={r.glossaryTerm(term)}
          reviewed={ed.lastReviewed}
          template={copy.lastReviewed}
        />
      </div>
    </>
  );
};
