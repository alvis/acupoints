import { POLICY_VERSION } from '@/content/editorial/policy';
import { PolicyContainer } from '@/features/editorial/containers/PolicyContainer';
import { translator } from '@/features/editorial/copy';

import type { FC } from 'react';

import type { PolicyClause } from '@/features/editorial/components/PolicySheet';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** Props for {@link EditorialPolicy}. */
export type EditorialPolicyProps = { locale: Locale };

/** Page title and description for the editorial-policy route's metadata. */
export const EDITORIAL_META = {
  title: { en: 'Editorial policy', zh: '編輯凡例' },
  description: {
    en: 'The rules every Acupoints leaf is written under: traditional use only, four named sources, and a machine screen before anything is printed.',
    zh: '每一葉 Acupoints 撰寫時依循的規則：只講傳統用法、只據四種具名來源，刊印前先經程式篩查。',
  },
} satisfies Record<string, Bilingual>;

/** The day the current authoring contract (content/editorial/policy.ts) landed. */
const UPDATED = '2026-08-24';

/** Board WbLegal's plain-language summary of the policy below. */
const SUMMARY: Bilingual = {
  en: 'Every leaf describes traditional use, cites only four named sources, and is screened by machine before it is printed.',
  zh: '每一葉只講傳統用法，只引用四種具名來源，刊印前都經程式篩查。',
};

/**
 * The authoring contract in reader's words. Each clause restates a rule the
 * build enforces in content/editorial/policy.ts and schema.ts; nothing here
 * goes beyond what those files check.
 */
const CLAUSES: ReadonlyArray<{ title: Bilingual; body: Bilingual }> = [
  {
    title: { en: 'Traditional use, not treatment', zh: '傳統用法，不是療法' },
    body: {
      en: 'Every leaf describes how a point is used in the classical tradition. It does not tell you to treat a condition, and it never stands in for a clinician.',
      zh: '每一葉描述的是穴位在古典傳統中的用法。它不會教你治療某個病症，也從不代替臨床醫師。',
    },
  },
  {
    title: { en: 'What a leaf never says', zh: '一葉從不寫的話' },
    body: {
      en: 'No needling instructions, no moxa timings, no doses, no promises of results and no claims drawn from research. A machine screen checks every leaf for these before the site is built, and a leaf that fails is not printed.',
      zh: '不寫施針指示，不寫艾灸時長，不寫劑量，不承諾效果，也不援引研究作聲稱。建站之前，程式會逐葉篩查這些說法；不合格的葉不會刊印。',
    },
  },
  {
    title: { en: 'Three sources, named exactly', zh: '只據三源，一字不差' },
    body: {
      en: 'A leaf may cite only the WHO Standard Acupuncture Point Locations in the Western Pacific Region, A Manual of Acupuncture, and the open aijiu-mpvue (MIT License) dataset. Each source line names its source word for word, so titles and licences cannot drift.',
      zh: '一葉只可引用世界衛生組織的 WHO Standard Acupuncture Point Locations in the Western Pacific Region、A Manual of Acupuncture，以及開放資料集 aijiu-mpvue（MIT License）。每條來源都逐字寫明出處，書名與授權條款因此不會走樣。',
    },
  },
  {
    title: { en: 'Cautions carried in full', zh: '注意事項完整轉述' },
    body: {
      en: 'Where the source data records a caution for a point, the leaf carries all of it in the site’s own words, never softening or dropping any part.',
      zh: '凡來源資料為某穴記有注意事項，該葉都以本站文字完整轉述，不淡化、不刪減。',
    },
  },
  {
    title: { en: 'Two languages, one shape', zh: '兩語同構' },
    body: {
      en: 'The English and Chinese text of a leaf carry the same sections and the same questions, and each meets its own length floor, so neither is a summary of the other.',
      zh: '一葉的英文與中文內文段落相同、問答相同，並各自達到字數下限，所以兩者都不是對方的摘要。',
    },
  },
  {
    title: { en: 'Every leaf is versioned', zh: '每葉記版' },
    body: {
      en: 'Each leaf records who wrote it, its review status and the policy version it was written under. When this policy changes, the version moves and the change is entered in the printing record.',
      zh: '每一葉都記下撰寫者、審閱狀態，以及撰寫時依循的凡例版本。凡例一有改動，版本隨之更新，改動亦記入刊記。',
    },
  },
];

/**
 * Editorial-policy page body: the shared policy frame with the authoring rules.
 * @param props edition used to translate the authoring rules
 * @param props.locale active language
 */
export const EditorialPolicy: FC<EditorialPolicyProps> = ({ locale }) => {
  const t = translator(locale);
  const clauses: readonly PolicyClause[] = CLAUSES.map((clause) => ({
    title: t(clause.title),
    body: t(clause.body),
  }));

  return (
    <PolicyContainer
      clauses={clauses}
      current="editorial"
      locale={locale}
      summary={t(SUMMARY)}
      updated={UPDATED}
      version={POLICY_VERSION}
    />
  );
};
