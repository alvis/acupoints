import { cn } from '@/utilities/cn';

import { hanLang } from './homeCopy';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link CardCap}. */
export type CardCapProps = {
  locale: Locale;
  /** Han word leading the cap (按部 …). */
  zh: string;
  /** English gloss, shown on English pages. */
  en: string;
  className?: string;
};

/**
 * Mono caps label led by the Han word, as on every way-in card.
 * @param props edition, Han label, English gloss, and optional styling
 * @param props.locale edition used for labels and links
 * @param props.zh Han word leading the caps label
 * @param props.en English gloss shown on English pages
 * @param props.className additional wrapper classes
 */
export const CardCap: FC<CardCapProps> = ({ locale, zh, en, className }) => (
  <span className={cn('cap', className)}>
    <span className="tc" lang={hanLang(locale)}>
      {zh}
    </span>
    {locale === 'en' ? ` · ${en}` : null}
  </span>
);
