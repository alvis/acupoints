import { contentLabels, hanLang } from '@/utilities/i18n/contentLabels';
import { formatDate } from '@/utilities/i18n/date';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link LastReviewed}. */
export type LastReviewedProps = {
  date: Date;
  locale: Locale;
};

const FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Review date as a mono caps line: 校 · Last reviewed 15 April 2026.
 * @param props the review-date caption.
 * @param props.date calendar instant to inspect.
 * @param props.locale language used for text and routes.
 */
export const LastReviewed: FC<LastReviewedProps> = ({ date, locale }) => {
  const formatted = formatDate(date, locale, FORMAT);
  const label = contentLabels(locale).lastReviewed;

  return (
    <p className="cap m-0">
      <span
        aria-hidden="true"
        className="tc mr-1.5 text-[0.85rem] font-bold"
        lang={hanLang(locale)}>
        {label.zh}
      </span>
      {label.text}{' '}
      <time className="font-medium text-ink" dateTime={date.toISOString()}>
        {formatted}
      </time>
    </p>
  );
};
