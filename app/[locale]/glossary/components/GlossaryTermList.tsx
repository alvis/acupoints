'use client';

import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { ROW } from './GlossaryIndex';

import type { ReactNode } from 'react';

import type { GlossaryIndexViewModel } from './GlossaryIndexPanels';

/**
 * choose a glossary term from the filtered list.
 * @param props dictionary selection state
 * @param props.model filtered terms, current selection, labels, and selection setter
 * @returns the selectable term list and further-reading links
 */
export const GlossaryTermList = ({
  model,
}: Readonly<{ model: GlossaryIndexViewModel }>): ReactNode => {
  const { labels, listCap, shown, selected, setSelected, headwordLang } = model;

  return (
    <div
      className="
        flex flex-col gap-3.5 border-b-[1.5px] border-ink px-[26px] py-6
        lg:border-r-[1.5px] lg:border-b-0
      ">
      <span className="cap">{listCap}</span>
      <ul
        aria-label={labels.termsGroup}
        className="m-0 flex list-none flex-col border-t-[2.5px] border-ink p-0">
        {shown.map(({ term, index }) => {
          const on = index === selected;

          return (
            <li key={term.slug}>
              <button
                aria-pressed={on}
                className={cn(
                  ROW,
                  on
                    ? `
                      bg-paper-raised
                      shadow-[inset_3px_0_0_var(--color-cinnabar)]
                    `
                    : 'bg-transparent',
                )}
                type="button"
                onClick={() => setSelected(index)}>
                <span
                  aria-hidden="true"
                  className="pm w-[22px] text-[0.8125rem] text-ink-micro">
                  {term.letter}
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[1.3125rem] font-medium" lang={headwordLang}>
                    {term.term}
                  </span>
                  {term.reading ? (
                    <span className="text-[0.95rem] text-ink-soft">{term.reading}</span>
                  ) : null}
                </span>
                <span aria-hidden="true" className="tc text-2xl font-bold">
                  {term.zh}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <span className="text-[0.95rem] leading-normal text-ink-soft">{labels.greyed}</span>
      <span className="mt-auto flex flex-col gap-2 border-t border-rule pt-3.5">
        <span className="cap">{labels.moreToRead}</span>
        <Link className="text-[1.0625rem] underline underline-offset-4" href={labels.basicsHref}>
          {labels.basicsLink}
        </Link>
        <Link className="text-[1.0625rem] underline underline-offset-4" href={labels.faqHref}>
          {labels.faqLink}
        </Link>
      </span>
    </div>
  );
};
