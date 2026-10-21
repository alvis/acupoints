'use client';

import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';

import { GlossaryDictionarySpread } from './GlossaryDictionarySpread';
import { LETTERS, RAIL } from './GlossaryIndex';

import type { ReactNode } from 'react';

import type { useGlossaryIndexModel } from './GlossaryIndex';

/** nonempty dictionary selection shared by the rail, list, and leaf. */
export type GlossaryIndexViewModel = NonNullable<ReturnType<typeof useGlossaryIndexModel>>;

/**
 * filter the dictionary spread with the alphabet rail.
 * @param model current term, alphabet filter, and selection actions
 * @returns the alphabet rail, term list, and selected dictionary leaf
 */
export const GlossaryIndexPanels = (model: Readonly<GlossaryIndexViewModel>): ReactNode => {
  const { labels, letter, setLetter, countIn, pickLetter, position, current } = model;

  return (
    <>
      <nav
        aria-label={labels.lettersGroup}
        className="
          mt-11 grid grid-cols-7 items-stretch border-t-[2.5px] border-b
          border-ink
          sm:flex
        ">
        <button
          aria-pressed={letter === null}
          className={cn(
            RAIL,
            `flex-none basis-16 cursor-pointer border-r border-rule`,
            letter === null ? 'bg-ink text-paper' : 'bg-transparent text-ink',
          )}
          type="button"
          onClick={() => setLetter(null)}>
          {labels.allLetters}
        </button>
        {LETTERS.map((ch) => {
          const count = countIn(ch);
          const on = letter === ch;
          const label =
            count === 0
              ? fill(labels.letterEmpty, { ch })
              : fill(count === 1 ? labels.letterLabelOne : labels.letterLabel, { ch, n: count });

          return (
            <button
              aria-disabled={count === 0}
              aria-label={label}
              aria-pressed={on}
              className={cn(
                RAIL,
                count === 0
                  ? `cursor-default bg-transparent font-normal text-ink-micro`
                  : 'cursor-pointer font-semibold',
                count > 0 &&
                  !on &&
                  `
                    bg-transparent text-ink
                    shadow-[inset_0_-3px_0_var(--color-cinnabar)]
                  `,
                on && `bg-ink text-paper`,
              )}
              key={ch}
              type="button"
              onClick={() => pickLetter(ch)}>
              {ch}
            </button>
          );
        })}
      </nav>

      <p aria-live="polite" className="sr-only">
        {`${position}: ${current.term}`}
      </p>

      <GlossaryDictionarySpread model={model} />
    </>
  );
};
