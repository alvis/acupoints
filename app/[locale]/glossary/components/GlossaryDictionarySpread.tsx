'use client';

import { FishTail } from '@/components/primitives/FishTail';
import { GlossaryLeaf } from '@/features/learn/components/GlossaryLeaf';
import { fill } from '@/features/learn/fill';

import { GlossaryTermList } from './GlossaryTermList';

import type { ReactNode } from 'react';

import type { GlossaryIndexViewModel } from './GlossaryIndexPanels';

/**
 * pair the term list with the selected dictionary leaf.
 * @param props dictionary spread state
 * @param props.model selected term, list state, localized labels, and leaf footer
 * @returns the term list, printed spine, and selected dictionary leaf
 */
export const GlossaryDictionarySpread = ({
  model,
}: Readonly<{ model: GlossaryIndexViewModel }>): ReactNode => {
  const { labels, position, current, headwordLang, footer, seeAlso } = model;

  return (
    <section aria-label={labels.termsGroup} className="mt-6">
      <div
        className="
          blk m-1.5 grid
          lg:min-h-[900px] lg:grid-cols-[330px_58px_minmax(0,1fr)]
        ">
        <GlossaryTermList model={model} />

        <div
          aria-hidden="true"
          className="
            hidden flex-col items-center gap-3 border-r-[1.5px] border-ink py-3
            lg:flex
          ">
          <span className="h-10 w-1.5 bg-ink" />
          <FishTail width={40} />
          <span className="tc vt text-base font-bold tracking-[0.2em]">{labels.spine}</span>
          <span className="flex-1" />
          <span className="tc vt text-sm tracking-[0.2em]">
            {fill(labels.letterPart, { ch: current.letter })}
          </span>
          <FishTail up width={40} />
          <span className="tc text-base font-bold">{current.zh}</span>
        </div>

        <GlossaryLeaf
          aka={current.aka}
          className="
            px-5 pt-7 pb-6
            md:px-8
          "
          examples={current.examples}
          faq={current.faq}
          figure={current.figure}
          footer={footer}
          headingId="hw"
          headword={current.term}
          headwordLang={headwordLang}
          key={current.slug}
          kind={current.kind}
          labels={labels.leaf}
          level={2}
          line={current.line}
          means={<p className="m-0">{current.means}</p>}
          meet={current.meet}
          position={`${labels.termHan} · ${position}`}
          reading={current.reading}
          seeAlso={seeAlso}
          zh={current.zh}
        />
      </div>
    </section>
  );
};
