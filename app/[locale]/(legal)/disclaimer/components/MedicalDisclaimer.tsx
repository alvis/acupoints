import Link from 'next/link';

import { PolicyContainer } from '@/features/editorial/containers/PolicyContainer';
import { translator } from '@/features/editorial/copy';
import { localizedRoutes } from '@/utilities/routes';

import type { FC } from 'react';

import type { PolicyClause } from '@/features/editorial/components/PolicySheet';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** Props for {@link MedicalDisclaimer}. */
export type MedicalDisclaimerProps = { locale: Locale };

/** Page title and description for the disclaimer route's metadata. */
export const DISCLAIMER_META = {
  title: { en: 'Medical disclaimer', zh: '醫療免責聲明' },
  description: {
    en: 'Acupoints.com publishes educational reference content only. It is not medical advice and is not a substitute for care by a licensed practitioner.',
    zh: 'Acupoints.com 只發佈教育性的參考內容。這不是醫療建議，也不能代替持牌醫護人員的診治。',
  },
} satisfies Record<string, Bilingual>;

/** Board WbLegal's plain-English summary of the disclaimer below. */
const SUMMARY: Bilingual = {
  en: 'Reading about a traditional practice. It is not medical advice, and it does not diagnose or treat anything.',
  zh: '你讀到的是一門傳統技藝的介紹。這不是醫療建議，也不診斷或治療任何病症。',
};

const COPY = {
  educationalTitle: { en: 'Educational only', zh: '僅供教育' },
  educationalBody: {
    en: 'Acupoints.com publishes educational reference content about Traditional Chinese Medicine acupoints. Nothing on this site is medical advice, and nothing here is intended to diagnose, treat, cure, or prevent any condition.',
    zh: 'Acupoints.com 發佈的是有關中醫穴位的教育性參考內容。本站任何內容都不是醫療建議，也無意用於診斷、治療、治癒或預防任何病症。',
  },
  consultTitle: { en: 'Consult a practitioner', zh: '請諮詢醫護人員' },
  consultBody: {
    en: 'If you have a health concern — acute or ongoing — please consult a licensed healthcare practitioner. If you are pregnant, have a chronic condition, or take prescription medication, talk to your clinician before acting on anything you read here.',
    zh: '如有任何健康上的疑慮——無論是急性還是長期的——請諮詢持牌的醫護人員。若你正懷孕、患有慢性病或正服用處方藥，請先與你的臨床醫師商量，再按本站讀到的任何內容行事。',
  },
  contraTitle: { en: 'Contraindications', zh: '禁忌' },
  contraBefore: {
    en: 'We flag contraindications (for example, pregnancy for',
    zh: '我們會直接在每個穴位的頁面上標明禁忌（例如孕期時的',
  },
  contraAnd: { en: 'and', zh: '與' },
  contraAfter: {
    en: ') directly on each point’s page. Please read those notes carefully.',
    zh: '）。請仔細閱讀這些注意事項。',
  },
  warrantyTitle: { en: 'No warranty', zh: '不作保證' },
  warrantyBody: {
    en: 'While we work hard to keep content accurate and up to date, we provide it as-is without warranty of any kind.',
    zh: '我們盡力保持內容準確、及時更新，但內容按現狀提供，不附帶任何形式的保證。',
  },
} satisfies Record<string, Bilingual>;

/**
 * Disclaimer page body: the shared policy frame with the disclaimer text.
 * @param props edition used to translate the medical disclaimer
 * @param props.locale active language
 */
export const MedicalDisclaimer: FC<MedicalDisclaimerProps> = ({ locale }) => {
  const t = translator(locale);
  const r = localizedRoutes(locale);
  const gap = locale === 'en' ? ' ' : '';
  const clauses: readonly PolicyClause[] = [
    { title: t(COPY.educationalTitle), body: t(COPY.educationalBody) },
    { title: t(COPY.consultTitle), body: t(COPY.consultBody) },
    {
      title: t(COPY.contraTitle),
      body: (
        <>
          {t(COPY.contraBefore)}
          {gap}
          <Link href={r.point('LI4')}>LI4</Link> {t(COPY.contraAnd)}{' '}
          <Link href={r.point('SP6')}>SP6</Link>
          {t(COPY.contraAfter)}
        </>
      ),
    },
    { title: t(COPY.warrantyTitle), body: t(COPY.warrantyBody) },
  ];

  return (
    <PolicyContainer
      clauses={clauses}
      current="disclaimer"
      locale={locale}
      summary={t(SUMMARY)}
      updated="2026-04-15"
      version="1.0"
    />
  );
};
