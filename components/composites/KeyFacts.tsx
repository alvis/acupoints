import { meridianBySlug } from '@/content/meridians';
import { contentLabels } from '@/utilities/i18n/contentLabels';

import { FactTable } from './FactTable';

import type { FC } from 'react';

import type { Point } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

import type { FactRow } from './FactTable';

/** Props for {@link KeyFacts}. */
export type KeyFactsProps = {
  point: Point;
  /** Page locale for the fact labels; EN when omitted. */
  locale?: Locale;
};

/**
 * Registry facts for an authored point, as a ruled table of dotted leader rows.
 * @param props the registry fact table.
 * @param props.point catalogue entry to describe.
 * @param props.locale language used for text and routes.
 */
export const KeyFacts: FC<KeyFactsProps> = ({ point, locale = 'en' }) => {
  const meridian = meridianBySlug(point.meridian);
  const f = contentLabels(locale).facts;

  const rows: FactRow[] = [
    { label: f.code, value: <span className="pm text-[0.85rem]">{point.code}</span> },
    { label: f.name, value: point.name },
    { label: f.pinyin, value: <em>{point.pinyin}</em> },
    {
      label: f.hanzi,
      value: (
        <span className="tc font-bold" lang="zh-Hant">
          {point.hanzi}
        </span>
      ),
    },
    { label: f.meridian, value: meridian ? meridian.name : point.meridian },
    { label: f.element, value: point.element ?? '—' },
    { label: f.category, value: point.category.length ? point.category.join(', ') : '—' },
    { label: f.who, value: point.whoCoordinates, long: true },
    { label: f.difficulty, value: <span className="pm">{`${point.difficultyToLocate} / 5`}</span> },
    {
      label: f.pregnancy,
      value: point.pregnancySafe ? f.yes : <span className="red">{f.noPregnancy}</span>,
      long: !point.pregnancySafe,
    },
  ];

  return <FactTable locale={locale} rows={rows} />;
};
