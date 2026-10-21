import { Speakable } from '@/components/primitives/Speakable';
import { basicSlugs } from '@/content/basics';
import { loadProseRegistry } from '@/content/pages';
import { Cartouche } from '@/features/learn/components/Cartouche';
import { FactList } from '@/features/learn/components/FactList';
import { GlossaryFigure } from '@/features/learn/components/GlossaryFigure';
import { LearnCrumbs } from '@/features/learn/components/LearnCrumbs';
import { countWord, learnCopy } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { glossaryAtoZ, glossaryLeafLabels, glossaryTermData } from '@/features/learn/glossaryTerms';
import { FRAME } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { GlossaryIndex } from './GlossaryIndex';

import type { FC } from 'react';

import type { FactRow } from '@/features/learn/components/FactList';
import type { LearnCrumb } from '@/features/learn/components/LearnCrumbs';
import type { Locale } from '@/utilities/routes';

import type { GlossaryIndexLabels, GlossaryIndexTerm } from './GlossaryIndex';

/** Props for {@link GlossaryIndexView}. */
export type GlossaryIndexViewProps = {
  locale: Locale;
};

/**
 * The glossary index, as the Glossary board sets it: a 詞彙 cartouche and
 * facts over an A to Z rail, then the term list and the selected entry's
 * dictionary leaf. Leaf data and figures are drawn here; selection lives in
 * the {@link GlossaryIndex} island.
 * @param props reading locale for the glossary introduction and entries
 * @param props.locale language used for links and copy
 * @returns the glossary introduction, facts, and interactive dictionary spread
 */
export const GlossaryIndexView: FC<GlossaryIndexViewProps> = async ({ locale }) => {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const han = (text: string): string => armText(text, locale);
  const registry = await loadProseRegistry();

  const terms: GlossaryIndexTerm[] = glossaryAtoZ().map((entry) => {
    const { figure, ...data } = glossaryTermData(entry, {
      editorial: registry.hub('static', `glossary-${entry.slug}`),
      locale,
      copy,
    });

    return { ...data, figure: figure ? <GlossaryFigure data={figure} /> : undefined };
  });

  const crumbs: LearnCrumb[] = [
    { href: r.basics, label: copy.learn, zh: english ? copy.learnHan : undefined },
    { href: r.glossary, label: copy.glossary, zh: english ? copy.glossaryHan : undefined },
  ];
  const facts: FactRow[] = [
    { term: copy.statTerms, value: fill(copy.statTermsValue, { n: terms.length }) },
    { term: copy.statGives, value: copy.statGivesValue },
    {
      term: copy.statReadIn,
      value: (
        <>
          {copy.readInLatin} · <span className="tc">繁</span> · <span className="
            tc
          ">简</span>
        </>
      ),
    },
  ];
  const labels: GlossaryIndexLabels = {
    lettersGroup: copy.lettersGroup,
    allLetters: copy.allLetters,
    letterLabel: copy.letterLabel,
    letterLabelOne: copy.letterLabelOne,
    letterEmpty: copy.letterEmpty,
    listAll: copy.listAll,
    listLetter: copy.listLetter,
    termsGroup: copy.termsGroup,
    greyed: copy.greyed,
    moreToRead: copy.moreToRead,
    basicsLink: fill(copy.basicsLeaves, { n: countWord(basicSlugs.length, locale) }),
    basicsHref: r.basics,
    faqLink: copy.faqLinkText,
    faqHref: r.faq,
    spine: han(copy.spine),
    letterPart: copy.letterPart,
    termOf: copy.termOf,
    termHan: han('詞'),
    relatedGroup: copy.relatedGroup,
    readWhole: copy.readWhole,
    readWholeAria: copy.readWholeAria,
    notAdvice: copy.notAdviceLine,
    leaf: glossaryLeafLabels(copy, han),
  };

  return (
    <div className={cn(FRAME, 'pb-20')}>
      <LearnCrumbs items={crumbs} label={copy.breadcrumb} />

      <section
        className="
          mt-[34px] grid items-end gap-10
          lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14
        ">
        <div className="flex items-start gap-[30px]">
          <Cartouche zh={copy.glossaryHan} />
          <div className="flex flex-col gap-3.5 pt-2">
            <span className="cap">
              <span aria-hidden="true" className="tc">
                {copy.glossaryHan}
              </span>{' '}
              · {copy.glossaryKicker}
            </span>
            <h1
              className="
                m-0 text-[2.75rem] leading-none font-medium tracking-[-0.01em]
                md:text-[4rem]
              ">
              {copy.glossary}
            </h1>
            <Speakable
              as="p"
              className="
                m-0 max-w-[580px] font-[inherit] text-lead/normal text-ink-soft
                not-italic
              ">
              {copy.glossaryLede}
            </Speakable>
          </div>
        </div>
        <FactList rows={facts} />
      </section>

      <GlossaryIndex headwordLang={english ? undefined : 'en'} labels={labels} terms={terms} />
    </div>
  );
};
