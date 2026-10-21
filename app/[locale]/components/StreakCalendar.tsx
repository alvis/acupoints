'use client';

import { useMemo } from 'react';

import { useSeals } from '@/components/headless/useSeals';
import { cn } from '@/utilities/cn';
import { dayToDate, readingDays } from '@/utilities/seals/sealDays';
import { countWord } from '@/utilities/seals/sealWords';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Resolved strings for {@link StreakCalendar}; `{n}`-style tokens are filled live. */
export interface StreakCalendarText {
  /** Heading with no streak yet. */
  none: string;
  /** Heading for a one-day streak. */
  one: string;
  /** `{n}` = streak length in words. */
  many: string;
  lede: string;
  /** `{count}`, `{read}`, `{n}`. */
  label: string;
  /** Glyph stamped on a read day (讀). */
  stamp: string;
}

/** Props for {@link StreakCalendar}. */
export type StreakCalendarProps = {
  locale: Locale;
  text: StreakCalendarText;
  /** `lang` for the stamp glyph on English pages. */
  hanLang?: string;
};

/** Four weeks, as the board draws them. */
const DAYS_SHOWN = 28;
const DAYS_PER_WEEK = 7;

const DATE_LOCALE: Readonly<Record<Locale, string>> = {
  'en': 'en-GB',
  'zh-hant': 'zh-Hant',
  'zh-cn': 'zh-Hans',
};

/**
 * 按日 — the reading calendar: the last four weeks ending today, one square
 * per day, stamped 讀 when a leaf was sealed that day, under the length of
 * the current streak and over a row of weekday initials. Read from this
 * browser's dated seals; until storage is read every square is blank.
 * @param props edition, calendar copy, and language tag for daily stamps
 * @param props.locale edition used for labels and links
 * @param props.text localized calendar labels and streak templates
 * @param props.hanLang language tag for Han glyphs
 * @returns the reader’s current streak and four weeks of daily reading stamps
 */
export const StreakCalendar: FC<StreakCalendarProps> = ({ locale, text, hanLang }) => {
  const { days, today, streak, ready } = useSeals();
  const calendar = useMemo(
    () => (ready && today ? readingDays(Object.values(days), today, DAYS_SHOWN) : []),
    [days, today, ready],
  );
  const weekdays = useMemo(() => {
    const format = new Intl.DateTimeFormat(DATE_LOCALE[locale], { weekday: 'narrow' });

    return calendar.slice(-DAYS_PER_WEEK).map(({ day }) => format.format(dayToDate(day)));
  }, [calendar, locale]);
  const en = locale === 'en';
  const read = calendar.filter((d) => d.read).length;
  const heading =
    streak === 0
      ? text.none
      : streak === 1
        ? text.one
        : text.many.replace('{n}', countWord(streak, locale, true));
  const label = text.label
    .replace('{count}', String(DAYS_SHOWN))
    .replace('{read}', String(read))
    .replace('{n}', String(streak));

  return (
    <>
      <h3
        aria-live="polite"
        className={cn(
          'm-0 text-[1.75rem] leading-tight font-medium',
          !en &&
            `tc`,
        )}>
        {heading}
      </h3>
      <p className={cn('m-0 text-base/normal text-ink-soft', !en && 'tc')}>{text.lede}</p>
      <div
        aria-label={label}
        className="mt-2 grid w-full max-w-[286px] grid-cols-7 gap-2"
        role="img">
        {Array.from({ length: DAYS_SHOWN }, (_, i) => {
          const day = calendar.at(i);

          return day?.read ? (
            <span
              className="
                tc grid aspect-square place-items-center bg-(--color-cinnabar)
                text-[0.8rem] font-black text-paper
                shadow-[inset_0_0_0_3px_var(--color-cinnabar),inset_0_0_0_4px_var(--color-paper)]
              "
              key={day.day}
              lang={hanLang}>
              {text.stamp}
            </span>
          ) : (
            <span
              className="
                aspect-square opacity-70
                shadow-[inset_0_0_0_1px_var(--color-ink-micro)]
              "
              key={day?.day ?? i}
            />
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="
          pm grid w-full max-w-[286px] grid-cols-7 gap-2 text-center
          text-[0.625rem] text-ink-micro
        ">
        {Array.from({ length: DAYS_PER_WEEK }, (_, i) => (
          <span className="min-h-lh" key={calendar.at(i - DAYS_PER_WEEK)?.day ?? i}>
            {weekdays[i] ?? ''}
          </span>
        ))}
      </div>
    </>
  );
};
