import { PolicyContainer } from '@/features/editorial/containers/PolicyContainer';
import { translator } from '@/features/editorial/copy';

import type { FC } from 'react';

import type { PolicyClause } from '@/features/editorial/components/PolicySheet';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** Props for {@link AffiliateDisclosure}. */
export type AffiliateDisclosureProps = { locale: Locale };

/** Page title and description for the disclosure route's metadata. */
export const AFFILIATE_META = {
  title: { en: 'Affiliate disclosure', zh: '聯盟揭露' },
  description: {
    en: 'How Acupoints.com handles any affiliate or sponsored links — currently, we do not run any.',
    zh: 'Acupoints.com 如何處理聯盟推廣或贊助連結——目前本站一個也沒有。',
  },
} satisfies Record<string, Bilingual>;

/** Board WbLegal's plain-English summary of the disclosure below. */
const SUMMARY: Bilingual = {
  en: 'There are no affiliate links, sponsored placements or paid recommendations on this site.',
  zh: '本站沒有聯盟推廣連結、贊助版位或付費推薦。',
};

/** The disclosure's own sentences, set under the board's clause titles. */
const CLAUSES: ReadonlyArray<{ title: Bilingual; body: Bilingual }> = [
  {
    title: { en: 'None today', zh: '目前沒有' },
    body: {
      en: 'Acupoints.com does not currently run affiliate links, sponsored placements, or paid product recommendations.',
      zh: 'Acupoints.com 目前沒有使用聯盟推廣連結、贊助版位或付費的產品推薦。',
    },
  },
  {
    title: { en: 'If that changes', zh: '若有改變' },
    body: {
      en: 'If that changes, we will update this page and mark sponsored links clearly inline.',
      zh: '若情況有變，我們會更新本頁，並在內文中清楚標示贊助連結。',
    },
  },
  {
    title: { en: 'Editorial independence', zh: '編輯獨立' },
    body: {
      en: 'Our editorial choices are not influenced by commercial partnerships. Anything we recommend has been read by an editor first.',
      zh: '我們的編輯決定不受商業合作影響。凡我們推薦的東西，都先經編輯讀過。',
    },
  },
];

/**
 * Affiliate-disclosure page body: the shared policy frame with its text.
 * @param props edition used to translate the affiliate policy
 * @param props.locale active language
 */
export const AffiliateDisclosure: FC<AffiliateDisclosureProps> = ({ locale }) => {
  const t = translator(locale);
  const clauses: readonly PolicyClause[] = CLAUSES.map((clause) => ({
    title: t(clause.title),
    body: t(clause.body),
  }));

  return (
    <PolicyContainer
      clauses={clauses}
      current="affiliate"
      locale={locale}
      summary={t(SUMMARY)}
      updated="2026-04-15"
      version="1.0"
    />
  );
};
