import { PolicyContainer } from '@/features/editorial/containers/PolicyContainer';
import { translator } from '@/features/editorial/copy';

import type { FC } from 'react';

import type { PolicyClause } from '@/features/editorial/components/PolicySheet';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** Props for {@link PrivacyPolicy}. */
export type PrivacyPolicyProps = { locale: Locale };

/** Page title and description for the privacy route's metadata. */
export const PRIVACY_META = {
  title: { en: 'Privacy', zh: '私隱' },
  description: {
    en: 'How Acupoints.com handles the small amount of analytics data it collects.',
    zh: 'Acupoints.com 如何處理它所收集的少量分析數據。',
  },
} satisfies Record<string, Bilingual>;

/** Board WbLegal's plain-English summary of the policy below. */
const SUMMARY: Bilingual = {
  en: 'Acupoints.com is a static reading site. We do not require accounts and do not sell data.',
  zh: 'Acupoints.com 是一個靜態的閱讀網站。我們不要求註冊帳戶，也不出售資料。',
};

/** The privacy policy's own text, version 1.0 of 15 April 2026. */
const CLAUSES: ReadonlyArray<{ title: Bilingual; body: Bilingual }> = [
  {
    title: { en: 'What we collect', zh: '我們收集甚麼' },
    body: {
      en: 'We use privacy-respecting, cookie-less analytics to count page views and referrers. We do not collect personal data, we do not fingerprint devices, and we do not share analytics with advertising networks.',
      zh: '我們使用尊重私隱、不設 Cookie 的分析工具，統計頁面瀏覽次數與來源網站。我們不收集個人資料，不對裝置作指紋識別，也不與廣告網絡分享分析數據。',
    },
  },
  {
    title: { en: 'Cookies', zh: 'Cookie' },
    body: {
      en: 'No tracking cookies. Your browser may store small preferences locally (for example, if you close a dialog), but this data never leaves your device.',
      zh: '本站不設追蹤用的 Cookie。你的瀏覽器可能會在本機儲存少量偏好設定（例如你關閉了某個對話框），但這些資料從不離開你的裝置。',
    },
  },
  {
    title: { en: 'Third parties', zh: '第三方' },
    body: {
      en: 'Fonts are self-hosted. Search runs in your browser via Pagefind. If we ever add embeds from third parties (for example, videos), we will describe them here.',
      zh: '字型由本站自行託管。搜尋透過 Pagefind 在你的瀏覽器內執行。若日後加入第三方的嵌入內容（例如影片），我們會在此說明。',
    },
  },
];

const CONTACT: { title: Bilingual; lead: Bilingual } = {
  title: { en: 'Contact', zh: '聯絡' },
  lead: { en: 'Privacy questions go to', zh: '有關私隱的問題，請寄至' },
};

/**
 * Privacy page body: the shared policy frame with the privacy text.
 * @param props edition used to translate the privacy policy
 * @param props.locale active language
 */
export const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ locale }) => {
  const t = translator(locale);
  const clauses: readonly PolicyClause[] = [
    ...CLAUSES.map((clause) => ({ title: t(clause.title), body: t(clause.body) })),
    {
      title: t(CONTACT.title),
      body: (
        <>
          {t(CONTACT.lead)}{' '}
          <a className="underline underline-offset-4" href="mailto:privacy@acupoints.com">
            privacy@acupoints.com
          </a>
          {locale === 'en' ? '.' : '。'}
        </>
      ),
    },
  ];

  return (
    <PolicyContainer
      clauses={clauses}
      current="privacy"
      locale={locale}
      summary={t(SUMMARY)}
      updated="2026-04-15"
      version="1.0"
    />
  );
};
