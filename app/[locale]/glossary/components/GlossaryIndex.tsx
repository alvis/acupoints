'use client';

import Link from 'next/link';
import { useState } from 'react';

import { fill } from '@/features/learn/fill';

import { GlossaryIndexPanels } from './GlossaryIndexPanels';

import type { FC, ReactNode } from 'react';

import type { GlossaryLeafLabels } from '@/features/learn/components/GlossaryLeaf';
import type { GlossaryTermData } from '@/features/learn/glossaryTerms';

import type { GlossaryIndexModel } from './GlossaryIndexModel';

/** A term as the index island receives it: leaf data plus its server-drawn figure. */
export type GlossaryIndexTerm = Omit<GlossaryTermData, 'figure'> & {
  figure?: ReactNode;
};

/** Chrome strings and templates the index prints, in the page's locale. */
export type GlossaryIndexLabels = {
  /** Accessible name of the A to Z rail. */
  lettersGroup: string;
  allLetters: string;
  /** "{ch}, {n} terms". */
  letterLabel: string;
  /** "{ch}, 1 term". */
  letterLabelOne: string;
  /** "{ch}, no terms yet". */
  letterEmpty: string;
  /** "All {n} terms, A to Z". */
  listAll: string;
  /** "{n} under {ch}". */
  listLetter: string;
  termsGroup: string;
  greyed: string;
  moreToRead: string;
  basicsLink: string;
  basicsHref: string;
  faqLink: string;
  faqHref: string;
  /** "經穴圖 · 詞彙", the spine's vertical title. */
  spine: string;
  /** "{ch}部". */
  letterPart: string;
  /** "{ch} · term {i} of {n}". */
  termOf: string;
  /** 詞, before the position line. */
  termHan: string;
  relatedGroup: string;
  readWhole: string;
  /** "Read the whole entry for {term}". */
  readWholeAria: string;
  notAdvice: string;
  leaf: GlossaryLeafLabels;
};

/** Props for {@link GlossaryIndex}. */
export type GlossaryIndexProps = {
  /** Terms in A to Z order; the first is selected on load. */
  terms: readonly GlossaryIndexTerm[];
  /** BCP 47 tag of the English headwords when the page is not English. */
  headwordLang?: string;
  labels: GlossaryIndexLabels;
};

export const FIRST_LATIN_CAPITAL = 65;

export const LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(FIRST_LATIN_CAPITAL + i),
);

export const RAIL =
  'h-[46px] min-w-[2.25rem] flex-1 sm:min-w-0 border-0 font-[inherit] text-[1.1875rem] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-ink)]';

export const ROW =
  'flex w-full cursor-pointer items-center gap-3 border-0 border-b border-[color:var(--color-rule)] px-3 py-3.5 text-left text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-ink)]';

/**
 * The glossary's working leaf, as the Glossary board sets it: an A to Z rail
 * that filters the term list, the list itself, a spine, and the selected
 * term's dictionary leaf. The selection is announced politely.
 * @param props ordered dictionary terms and localized controls
 * @returns the interactive glossary index, or nothing when no terms exist
 */
export const GlossaryIndex: FC<GlossaryIndexProps> = (props) => {
  const model = useGlossaryIndexModel(props);

  return model ? <GlossaryIndexPanels {...model} /> : null;
};

/**
 * track glossary selection and build the filtered term list.
 * @param props ordered dictionary terms and localized controls
 * @param props.terms terms in A to Z order; the first is selected on load
 * @param props.headwordLang language used for entry headings
 * @param props.labels localized interface labels
 * @returns the filtered terms, current entry, and selection actions, or null for an empty index
 */
export const useGlossaryIndexModel = ({
  terms,
  headwordLang,
  labels,
}: GlossaryIndexProps): GlossaryIndexModel => {
  const [selected, setSelected] = useState(0);
  const [letter, setLetter] = useState<string | null>(null);
  const current = terms.at(selected) ?? terms.at(0);
  if (!current) {
    return null;
  }

  const shown = terms
    .map((term, index) => ({ term, index }))
    .filter((o) => !letter || o.term.letter === letter);
  const countIn = (ch: string): number => terms.filter((t) => t.letter === ch).length;
  const position = fill(labels.termOf, { ch: current.letter, i: selected + 1, n: terms.length });
  const listCap = letter
    ? fill(labels.listLetter, { n: shown.length, ch: letter })
    : fill(labels.listAll, { n: terms.length });

  const pickLetter = (ch: string): void => {
    const first = terms.findIndex((t) => t.letter === ch);
    if (first < 0) {
      return;
    }
    setLetter(ch);
    setSelected(first);
  };
  const pickTerm = (slug: string): void => {
    const index = terms.findIndex((t) => t.slug === slug);
    if (index < 0) {
      return;
    }
    setSelected(index);
    setLetter(null);
  };

  const seeAlso = (
    <ul
      aria-label={labels.relatedGroup}
      className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
      {current.related.map((slug) => {
        const other = terms.find((t) => t.slug === slug);
        if (!other) {
          return null;
        }

        return (
          <li key={slug}>
            <button
              className="btn btn-secondary gap-1.5 px-3.5 py-2 text-base"
              type="button"
              onClick={() => pickTerm(slug)}>
              <span aria-hidden="true" className="tc font-bold">
                {other.zh}
              </span>
              <span lang={headwordLang}>{other.term}</span> →
            </button>
          </li>
        );
      })}
    </ul>
  );

  const footer = (
    <>
      <Link
        aria-label={fill(labels.readWholeAria, { term: current.term })}
        className="btn btn-primary no-underline"
        href={current.href}>
        {labels.readWhole}
      </Link>
      <span className="text-[0.95rem] text-ink-soft">{labels.notAdvice}</span>
    </>
  );

  return {
    labels,
    letter,
    setLetter,
    countIn,
    pickLetter,
    position,
    current,
    listCap,
    shown,
    selected,
    setSelected,
    headwordLang,
    footer,
    seeAlso,
  };
};
