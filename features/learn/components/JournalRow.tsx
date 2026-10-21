import Link from 'next/link';

import { MarginNote } from '@/components/primitives/MarginNote';

import { JournalVignette } from './JournalVignette';

import type { FC } from 'react';

/** Props for {@link JournalRow}. */
export type JournalRowProps = {
  slug: string;
  title: string;
  /** Short deck under the title (the guide's summary). */
  dek: string;
  /** Link to the guide; omitted while the guide is still on the block. */
  href?: string;
  dateIso: string;
  dateLabel: string;
  /** Han topic tag; decorative. */
  tag?: string;
  /** "8 min read", or the forthcoming status. */
  status: string;
  /** Two-line red margin note, e.g. a pregnancy caution. */
  note?: [string, string];
};

/**
 * One journal guide in a ruled list, with its vignette, as the Learn board sets it.
 * @param props guide vignette, summary, publication facts, and optional caution
 * @param props.slug registry key to look up
 * @param props.title display heading
 * @param props.dek introductory summary
 * @param props.href destination of the point leaf
 * @param props.dateIso machine-readable publication date
 * @param props.dateLabel spelled-out printing date for English pages
 * @param props.tag journal category label
 * @param props.status reading-time or publication status
 * @param props.note caution or explanation beneath the figure
 * @returns the guide vignette, summary, publication facts, and optional caution
 */
export const JournalRow: FC<JournalRowProps> = ({
  slug,
  title,
  dek,
  href,
  dateIso,
  dateLabel,
  tag,
  status,
  note,
}) => (
  <li
    className="
      flex items-start gap-[18px] border-b border-rule py-[18px]
      last:border-b-0
    ">
    <JournalVignette fallback={tag} slug={slug} />
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="flex items-baseline gap-2.5 text-sm text-ink-soft">
        <time className="pm text-xs" dateTime={dateIso}>
          {dateLabel}
        </time>
        {tag ? (
          <span aria-hidden="true" className="tc font-bold text-ink" lang="zh-Hant">
            {tag}
          </span>
        ) : null}
        <span aria-hidden="true" className="lead" />
        <span className={href ? 'pm text-xs text-ink' : `pm red text-xs`}>{status}</span>
      </span>
      {href ? (
        <Link
          className="
            text-[1.25rem] leading-[1.22] font-medium underline decoration-1
            underline-offset-4
            hover:decoration-(--color-cinnabar)
          "
          href={href}>
          {title}
        </Link>
      ) : (
        <span className="text-[1.25rem] leading-[1.22] font-medium">{title}</span>
      )}
      <span className="text-base leading-[1.35] text-ink-soft">
        <span className="line-clamp-3">{dek}</span>
        {note ? <MarginNote className="mx-0 mt-1" lines={note} /> : null}
      </span>
    </div>
  </li>
);
