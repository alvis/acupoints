import Link from 'next/link';

import { SealToggle } from '@/components/composites/SealToggle';
import { pointsText } from '@/features/points/labels';
import { cn } from '@/utilities/cn';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { homeText } from './homeCopy';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { FeaturedLeaf } from './featuredLeaf';
import type { TodayLeafProps } from './TodayLeaf';

interface LeafRow {
  key: string;
  label: string;
  text: string;
}
export const TodayLeafDetails: FC<TodayLeafProps> = ({ locale, leaf, almanac, leafHref }) => {
  const t = homeText(locale);
  const en = locale === 'en';
  const hanzi = hanFor(leaf.hanzi, locale);
  const glyphs: [string, string] = [hanzi.charAt(0), hanzi.charAt(1) || hanzi.charAt(0)];
  const electedToday = almanac.pointCode === leaf.code;
  const rows = leafRows(locale, leaf, electedToday ? almanac.ritual : undefined);

  return (
    <div
      className="
        col-start-2 flex min-w-0 flex-col gap-1.5 px-3.5 pt-1.5 pb-3
        md:gap-3.5 md:p-0
      ">
      <p
        className={cn(
          `
            m-0 line-clamp-3 text-[0.95rem] leading-[1.4] text-ink-soft
            md:hidden
          `,
          !en && 'tc',
        )}>
        {leaf.card?.where ?? (en ? leaf.location : (leaf.localSummary ?? leaf.location))}
      </p>

      {en && !leaf.card && leaf.tags.length > 0 ? (
        <ul
          className="
            pm m-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[0.7rem]
            tracking-[0.12em] uppercase
            max-md:hidden
          ">
          {leaf.tags.map((tag) => (
            <li className={tag.tone === 'warn' ? 'red' : `text-ink-micro`} key={tag.label}>
              {tag.label}
            </li>
          ))}
        </ul>
      ) : null}

      <dl
        className={cn(
          `
            ruled m-0 flex flex-col text-lg
            max-md:hidden
          `,
          !en && `tc`,
        )}>
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="inline font-bold">{row.label}</dt>{' '}
            <dd className="m-0 inline">{row.text}</dd>
          </div>
        ))}
      </dl>

      {en && electedToday ? (
        <p
          className="
            red m-0 text-[0.95rem] italic
            max-md:hidden
          ">
          {almanac.blurb}
        </p>
      ) : null}

      <span className="min-h-2 flex-1" />
      <div className="md:hidden">
        <Link className={cn('btn btn-primary no-underline', !en && 'tc')} href={leafHref}>
          {t.readShort}
        </Link>
      </div>
      <div
        className="
          flex flex-wrap items-end justify-between gap-3
          max-md:hidden
        ">
        <Link className={cn('btn btn-primary no-underline', !en && 'tc')} href={leafHref}>
          {t.readLeaf}
        </Link>
        <SealToggle
          code={leaf.code}
          glyphs={glyphs}
          locale={locale}
          name={en ? leaf.name : hanzi}
        />
      </div>
    </div>
  );
};

/**
 * The ruled lines under the name. A leaf card prints its own Where / For /
 * Press lines in the page language, then its caution or, without one, Safe. Without one, English carries
 * the registry's location, summary, today's press ritual and caution; the
 * Chinese leaves carry only what the bilingual registry authors (summary,
 * pregnancy flag).
 * @param locale edition used for labels and links
 * @param leaf elected point with its names, location, and leaf card
 * @param ritual today's press ritual, when this point is the day's election
 * @returns localized location, purpose, pressing, and caution rows available for the point
 */
function leafRows(locale: Locale, leaf: FeaturedLeaf, ritual?: string): LeafRow[] {
  const t = homeText(locale);
  const rows: LeafRow[] = [];
  if (leaf.card) {
    const forLabel = locale === 'en' ? t.rowBrief : pointsText(locale).leaf.lines.for;
    rows.push({ key: 'where', label: t.rowWhere, text: leaf.card.where });
    rows.push({ key: 'for', label: forLabel, text: leaf.card.for });
    rows.push({ key: 'press', label: t.rowPress, text: leaf.card.press });
    // every card's caution was checked against the cited sources; a card
    // without one is safe to press, as the home board prints it
    rows.push(
      leaf.card.caution
        ? { key: 'caution', label: t.rowCaution, text: leaf.card.caution }
        : { key: 'safe', label: t.rowSafe, text: t.safeText },
    );

    return rows;
  }
  if (locale === 'en') {
    rows.push({ key: 'where', label: t.rowWhere, text: leaf.location });
    rows.push({ key: 'brief', label: t.rowBrief, text: leaf.summary });
    if (ritual) {
      rows.push({ key: 'press', label: t.rowPress, text: ritual });
    }
    if (leaf.caution || leaf.pregnancyCaution) {
      rows.push({ key: 'caution', label: t.rowCaution, text: leaf.caution ?? t.pregnancyCaution });
    }

    return rows;
  }
  if (leaf.localSummary) {
    rows.push({ key: 'brief', label: t.rowBrief, text: leaf.localSummary });
  }
  if (leaf.pregnancyCaution) {
    rows.push({ key: 'caution', label: t.rowCaution, text: t.pregnancyCaution });
  }

  return rows;
}
