import { QAOpener } from '@/components/composites/QAOpener';
import { Speakable } from '@/components/primitives/Speakable';
import { GlossaryFigure } from '@/features/learn/components/GlossaryFigure';
import { GlossaryLeaf } from '@/features/learn/components/GlossaryLeaf';
import { LearnCrumbs } from '@/features/learn/components/LearnCrumbs';
import { learnTitle, splitTitle } from '@/features/learn/content';
import { glossaryLeafLabels } from '@/features/learn/glossaryTerms';
import { FRAME } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';

import { EntryParagraph } from './EntryParagraph';
import { GlossaryEntryDetails } from './GlossaryEntryDetails';
import { PARA } from './GlossaryTerm';

import type { ReactNode } from 'react';

import type { useGlossaryTermModel } from './GlossaryTerm';

/** glossary entry data after resolving the coming-soon fallback. */
export type GlossaryTermViewModel = Exclude<
  Awaited<ReturnType<typeof useGlossaryTermModel>>,
  { fallback: unknown }
>;

/**
 * compose the entry opening and complete editorial reading.
 * @param model localized entry data, prose, and navigation
 * @returns the entry breadcrumbs, dictionary leaf, and full editorial details
 */
export const GlossaryTermView = (model: Readonly<GlossaryTermViewModel>): ReactNode => {
  const {
    crumbs,
    english,
    entry,
    contentKey: key,
    locale,
    data,
    copy,
    headwordLang,
    han,
    seeAlso,
    opener,
    arm,
    ed,
  } = model;

  return (
    <div className={cn(FRAME, 'pb-20')}>
      <LearnCrumbs
        items={crumbs(
          english ? entry.term : splitTitle(learnTitle(key, entry.term, locale)).main,
          data.zh,
        )}
        label={copy.breadcrumb}
      />

      <article data-pagefind-body className="mt-[34px]">
        <div
          className="
            blk m-1.5 px-4 pt-7 pb-6
            md:px-8
          ">
          <GlossaryLeaf
            aka={data.aka}
            examples={data.examples}
            faq={data.faq}
            figure={data.figure ? <GlossaryFigure data={data.figure} /> : undefined}
            headingId="hw"
            headword={entry.term}
            headwordLang={headwordLang}
            kind={data.kind}
            labels={glossaryLeafLabels(copy, han)}
            level={1}
            line={data.line}
            means={
              <Speakable suppressJsonLd as="p" className="
                m-0 font-[inherit] not-italic
              ">
                {data.means}
              </Speakable>
            }
            meet={data.meet}
            position={`${han('詞')} · ${data.letter}`}
            reading={data.reading}
            seeAlso={seeAlso}
            zh={data.zh}
          />
        </div>

        {opener ? (
          <QAOpener
            answer={opener.answer}
            className="mt-12 max-w-[860px]"
            followThrough={opener.followThrough}
            question={opener.question}
          />
        ) : null}

        {arm && ed ? (
          <GlossaryEntryDetails model={model} />
        ) : (
          <section className="mt-12 flex max-w-[760px] flex-col gap-4">
            {entry.body ? (
              entry.body.map((paragraph) => (
                <EntryParagraph className={PARA} key={paragraph} text={paragraph} />
              ))
            ) : (
              <p className={cn(PARA, 'text-ink-soft')}>{copy.comingText}</p>
            )}
          </section>
        )}
      </article>
    </div>
  );
};
