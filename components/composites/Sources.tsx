import { cn } from '@/utilities/cn';
import { contentLabels, hanLang } from '@/utilities/i18n/contentLabels';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link Sources}. */
export type SourcesProps = {
  items: string[];
  /** Page locale for the heading; EN when omitted. */
  locale?: Locale;
  className?: string;
};

/**
 * Visible source list as a numbered, ruled list with mono numerals; mirrored
 * into citation[] via the page's `@graph`.
 * @param props the numbered source list.
 * @param props.items ordered entries to display.
 * @param props.locale language used for text and routes.
 * @param props.className additional wrapper classes.
 */
export const Sources: FC<SourcesProps> = ({ items, locale = 'en', className }) => {
  const heading = contentLabels(locale).sources;

  return (
    <section aria-labelledby="sources-heading" className={cn('mt-12', className)}>
      <h2
        className="
          m-0 flex items-baseline gap-3 font-display text-[1.35rem]
          leading-tight font-medium text-ink
        "
        id="sources-heading">
        {locale === 'en' ? (
          <span aria-hidden="true" className="tc font-black" lang={hanLang(locale)}>
            {heading.zh}
          </span>
        ) : null}
        <span>{heading.text}</span>
      </h2>
      <ol
        className="
          m-0 mt-3 list-none border-t-[1.5px] border-ink p-0 text-[0.95rem]
          leading-normal text-ink-soft
        ">
        {items.map((src, i) => (
          <li className="flex gap-4 border-b border-rule py-2.5" key={src}>
            <span
              className="pm w-6 shrink-0 pt-0.5 text-[0.75rem] text-ink-micro">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1">{src}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};
