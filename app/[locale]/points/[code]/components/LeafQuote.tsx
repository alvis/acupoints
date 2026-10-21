import { VERTICAL, ACROSS } from './LeafSpread';

import type { ReactNode } from 'react';

import type { LeafSpreadViewModel } from './LeafSpreadView';

/**
 * render classical passage and its source, or nothing when no quote exists
 * @param props classical quote settings
 * @param props.model classical passage, citation, and page language
 * @returns the classical passage and its source, or nothing when no quote exists
 */
export const LeafQuote = ({ model }: Readonly<{ model: LeafSpreadViewModel }>): ReactNode => {
  const { hanLang, locale, quote } = model;
  if (!quote) {
    return null;
  }

  return (
    <figure
      className="
        m-0 flex items-stretch gap-4 pt-1
        group-data-[han=across]/han:flex-col group-data-[han=across]/han:gap-2.5
      ">
      <blockquote
        className={`
          tc m-0 flex-none self-start px-1.5 py-2.5 text-[1.19rem] font-bold
          tracking-[0.14em] shadow-[inset_0_0_0_1px_var(--color-ink)]
          ${VERTICAL}
          ${ACROSS}
          group-data-[han=across]/han:px-3
        `}
        lang={hanLang}>
        {quote.han}
      </blockquote>
      <figcaption
        className="
          flex min-w-0 flex-col justify-center gap-1.5 text-base leading-[1.45]
        ">
        {locale === 'en' ? <span className="italic">“{quote.en}”</span> : null}
        <span className="text-sm text-ink-soft">
          <cite className="tc not-italic" lang={hanLang}>
            {quote.source.han}
          </cite>
          {locale === 'en' ? ` ${quote.source.en}` : null}
        </span>
      </figcaption>
    </figure>
  );
};
