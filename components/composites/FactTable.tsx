import { cn } from '@/utilities/cn';
import { contentLabels, hanLang } from '@/utilities/i18n/contentLabels';

import type { FC, ReactNode } from 'react';

import type { Locale } from '@/utilities/routes';

/** One labelled fact; `long` values sit under their label instead of after a leader. */
export type FactRow = {
  label: string;
  value: ReactNode;
  long?: boolean;
};

/** Props for {@link FactTable}. */
export type FactTableProps = {
  rows: FactRow[];
  /** Page locale for the heading; EN when omitted. */
  locale?: Locale;
  className?: string;
};

/**
 * The "Key facts" box shared by point pages: a double-ruled frame, a Han
 * heading, and each fact as label · dotted leader · value.
 * @param props the labeled fact rows.
 * @param props.rows facts to display.
 * @param props.locale language used for text and routes.
 * @param props.className additional wrapper classes.
 */
export const FactTable: FC<FactTableProps> = ({ rows, locale = 'en', className }) => {
  const heading = contentLabels(locale).keyFacts;

  return (
    <div className={cn('r2 bg-paper p-6', className)}>
      <h3
        className="
          m-0 flex items-baseline gap-3 font-display text-[1.3rem] leading-tight
          font-medium text-ink
        ">
        {locale === 'en' ? (
          <span aria-hidden="true" className="tc text-[1.5rem] font-black" lang={hanLang(locale)}>
            {heading.zh}
          </span>
        ) : null}
        <span>{heading.text}</span>
      </h3>
      <dl
        className="
          m-0 mt-4 flex flex-col border-t-[1.5px] border-ink text-[0.95rem]
        ">
        {rows.map((row) =>
          row.long ? (
            <div className="flex flex-col gap-1 border-b border-rule py-2.5" key={row.label}>
              <dt className="cap">{row.label}</dt>
              <dd className="m-0 leading-snug text-ink">{row.value}</dd>
            </div>
          ) : (
            <div className="flex items-baseline border-b border-rule py-2.5" key={row.label}>
              <dt className="flex min-w-0 flex-1 items-baseline text-ink-soft">
                <span className="shrink-0">{row.label}</span>
                <span aria-hidden="true" className="lead" />
              </dt>
              <dd className="m-0 min-w-0 text-right text-ink">{row.value}</dd>
            </div>
          ),
        )}
      </dl>
    </div>
  );
};
