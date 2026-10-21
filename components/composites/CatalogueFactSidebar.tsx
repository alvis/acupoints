import { contentLabels } from '@/utilities/i18n/contentLabels';

import { FactTable } from './FactTable';

import type { FC } from 'react';

import type { CataloguePoint } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

import type { FactRow } from './FactTable';

/**
 * Registry-fed identity facts for a compiled catalogue point behind an
 * editorial page — mirrors the fallback view's table so the sidebar never
 * loses facts when an authored module takes over the prose.
 */
type CatalogueFactSidebarProps = {
  point: CataloguePoint;
  meridianName?: string;
  locale: Locale;
};

export const CatalogueFactSidebar: FC<CatalogueFactSidebarProps> = ({
  point,
  meridianName,
  locale,
}) => {
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
    { label: f.meridian, value: meridianName ?? point.meridian },
    { label: f.className, value: point.category.length ? point.category.join(', ') : '—' },
  ];

  return <FactTable locale={locale} rows={rows} />;
};
