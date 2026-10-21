import { CitePopover } from '@/components/composites/CitePopover';
import { cn } from '@/utilities/cn';
import { formatDate } from '@/utilities/i18n/date';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link ReviewFooter}. */
export type ReviewFooterProps = {
  reviewed: Date;
  locale: Locale;
  /** "Last reviewed {date}". */
  template: string;
  /** Title and path the citation popover quotes. */
  citeTitle: string;
  pagePath: string;
  /** The citation button's label, in the page's language. */
  citeLabel: string;
  className?: string;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

/**
 * "Last reviewed <date>" with the citation popover beside it.
 * @param props review date and citation action
 * @param props.reviewed date of the latest editorial review
 * @param props.locale page language and writing system
 * @param props.template localized review sentence containing a {date} slot
 * @param props.citeTitle citation dialog heading
 * @param props.pagePath canonical page path
 * @param props.citeLabel citation action text
 * @param props.className additional presentation classes
 * @returns the review date and citation action
 */
export const ReviewFooter: FC<ReviewFooterProps> = ({
  reviewed,
  locale,
  template,
  citeTitle,
  pagePath,
  citeLabel,
  className,
}) => {
  const [before, after = ''] = template.split('{date}');

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-4', className)}>
      <p className="m-0 text-[0.95rem] text-ink-soft">
        {before}
        <time className="text-ink" dateTime={reviewed.toISOString()}>
          {formatDate(reviewed, locale, DATE_FORMAT)}
        </time>
        {after}
      </p>
      <CitePopover label={citeLabel} path={pagePath} reviewed={reviewed} title={citeTitle} />
    </div>
  );
};
