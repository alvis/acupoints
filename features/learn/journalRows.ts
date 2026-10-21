/**
 * Row data for the journal list the Learn hub and the journal index share:
 * the Han tag, the reading time or "on the block" status, and a pregnancy
 * note when a guide names a point the catalogue flags.
 */

import { formatDate } from '@/utilities/i18n/date';
import { armForLocale, summaryForLocale } from '@/utilities/i18n/locale-text';
import { localizedRoutes } from '@/utilities/routes';

import { journalTag, learnTitle, pointsNamedIn, publishedOn, readingMinutes } from './content';
import { fill } from './fill';

import type { EditorialHubModule } from '@/content/editorial/schema';
import type { Locale } from '@/utilities/routes';

import type { JournalRowProps } from './components/JournalRow';
import type { LearnCopy } from './copy';

const ROW_DATE: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };

/** page context a journal row is rendered for */
export interface JournalRowContext {
  /** page language and writing system */
  locale: Locale;
  /** localized interface strings */
  copy: LearnCopy;
  /** whether publication is still scheduled */
  forthcoming: boolean;
}

/**
 * Row data for one journal guide.
 * @param post authored journal entry
 * @param context locale, interface strings, and publication state for the row
 * @returns the localized journal list entry
 */
export function journalRow(
  post: EditorialHubModule<'journal'>,
  context: JournalRowContext,
): JournalRowProps & { slug: string } {
  const { locale, copy, forthcoming } = context;
  const r = localizedRoutes(locale);
  const arm = armForLocale(post, locale);
  const dateLabel = formatDate(publishedOn(post), locale, ROW_DATE);
  const caution = pointsNamedIn(arm, locale).find((p) => p.avoidInPregnancy);
  const summary = summaryForLocale(post, locale);

  return {
    slug: post.slug,
    title: learnTitle(`journal/${post.slug}`, post.title, locale),
    dek: forthcoming ? `${summary} ${fill(copy.outOn, { date: dateLabel })}` : summary,
    href: forthcoming ? undefined : r.journalPost(post.slug),
    dateIso: publishedOn(post).toISOString(),
    dateLabel,
    tag: journalTag(post.slug, locale),
    status: forthcoming
      ? copy.onTheBlock
      : `${fill(copy.minutesCap, { min: readingMinutes(arm, locale) })} ${copy.readWord}`,
    note: caution ? [`${caution.code}: ${copy.avoidLine1}`, copy.avoidLine2] : undefined,
  };
}
