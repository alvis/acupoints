import { ABOUT_COPY, COMMON_COPY, fill, hanText, translator } from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';
import { LOCALES, localeToHtmlLang, localizedRoutes } from '@/utilities/routes';

import { EDITION_FACE, TAIWAN_KI4 } from './AboutContainerDetails';

import type { TrustCrumb } from '@/features/editorial/components/TrustCrumbs';
import type { Locale } from '@/utilities/routes';

import type { CheckStep } from './AboutChecks';
import type { AboutContactLabels } from './AboutContact';
import type { GlanceRow } from './AboutGlance';
import type { LanguageEdition } from './AboutLanguages';
import type { TimelineWork } from './AboutTimeline';
import type { MakingStep } from './MakingSteps';

interface AboutPresentation {
  r: ReturnType<typeof localizedRoutes>;
  t: ReturnType<typeof translator>;
  han: ReturnType<typeof hanText>;
  zh: boolean;
  crumbs: readonly TrustCrumb[];
  glanceRows: readonly GlanceRow[];
  making: readonly MakingStep[];
  before: readonly TimelineWork[];
  after: readonly TimelineWork[];
  checks: readonly CheckStep[];
  editions: readonly LanguageEdition[];
  contactLabels: AboutContactLabels;
  citedSeal: readonly [string, string];
  glanceSeal: readonly [string, string];
  checkSeal: readonly [string, string];
  noteClass: string;
}

/**
 * assemble localized labels and row data for the about spread
 * @param locale active language
 * @returns translators, panel labels, book facts, review steps, and language tiles
 */
export function aboutPresentation(locale: Locale): AboutPresentation {
  const r = localizedRoutes(locale);
  const t = translator(locale);
  const han = hanText(locale);
  const zh = locale !== 'en';

  const crumbs: readonly TrustCrumb[] = [
    { href: r.home, zh: '首', label: t(COMMON_COPY.home) },
    { zh: '說明', label: t(ABOUT_COPY.crumb) },
  ];
  const glanceRows: readonly GlanceRow[] = [
    { label: t(ABOUT_COPY.glanceLeaves), value: t(ABOUT_COPY.glanceLeavesValue) },
    { label: t(ABOUT_COPY.glanceChannels), value: t(ABOUT_COPY.glanceChannelsValue) },
    { label: t(ABOUT_COPY.glanceLanguages), value: 'EN · 繁 · 简' },
    { label: t(ABOUT_COPY.glancePrice), value: t(ABOUT_COPY.glancePriceValue) },
  ];
  const making: readonly MakingStep[] = [
    { title: t(ABOUT_COPY.how1Title), body: t(ABOUT_COPY.how1Body) },
    { title: t(ABOUT_COPY.how2Title), body: t(ABOUT_COPY.how2Body) },
    { title: t(ABOUT_COPY.how3Title), body: t(ABOUT_COPY.how3Body) },
  ];
  const { before, after } = aboutTimelineWorks(t, han);
  const checks: readonly CheckStep[] = [
    { han: han('對'), title: t(ABOUT_COPY.check1Title), body: t(ABOUT_COPY.check1Body) },
    { han: han('審'), title: t(ABOUT_COPY.check2Title), body: t(ABOUT_COPY.check2Body) },
    { han: han('署'), title: t(ABOUT_COPY.check3Title), body: t(ABOUT_COPY.check3Body) },
  ];
  const notes: Record<Locale, string> = {
    'en': t(ABOUT_COPY.langEnNote),
    'zh-hant': fill(t(ABOUT_COPY.langHantNote), { glyph: TAIWAN_KI4 }),
    'zh-cn': t(ABOUT_COPY.langHansNote),
  };
  const editions: readonly LanguageEdition[] = LOCALES.map((edition) => ({
    ...EDITION_FACE[edition],
    lang: localeToHtmlLang(edition),
    href: localizedRoutes(edition).about,
    note: notes[edition],
    current: edition === locale,
  }));
  const contactLabels: AboutContactLabels = {
    cap: t(ABOUT_COPY.contactCap),
    title: t(ABOUT_COPY.contactTitle),
    body: t(ABOUT_COPY.contactBody),
    changed: t(ABOUT_COPY.changedLink),
    shelfCap: t(ABOUT_COPY.shelfCap),
    faq: t(ABOUT_COPY.shelfFaq),
    policies: t(ABOUT_COPY.shelfPolicies),
    privacy: t(ABOUT_COPY.privacyQuestions),
    notAdviceLead: t(ABOUT_COPY.notAdviceLead),
    notAdviceBody: t(ABOUT_COPY.notAdviceBody),
    correctionsMark: han('正誤'),
    recordMark: han('刊記'),
  };
  const citedSeal: readonly [string, string] = [han('所'), han('據')];
  const glanceSeal: readonly [string, string] = [han('本'), han('書')];
  const checkSeal: readonly [string, string] = [han('考'), han('訂')];
  const noteClass = cn(
    `m-0 max-w-[560px] text-[1.06rem] leading-normal text-ink-soft`,
    zh && `tc`,
  );

  return {
    r,
    t,
    han,
    zh,
    crumbs,
    glanceRows,
    making,
    before,
    after,
    checks,
    editions,
    contactLabels,
    citedSeal,
    glanceSeal,
    checkSeal,
    noteClass,
  };
}

/**
 * assemble historical and cited works without altering their order
 * @param t localized copy lookup
 * @param han Han script conversion
 * @returns the works on each side of the timeline gap
 */
function aboutTimelineWorks(
  t: ReturnType<typeof translator>,
  han: ReturnType<typeof hanText>,
): Pick<AboutPresentation, 'before' | 'after'> {
  const before: readonly TimelineWork[] = [
    {
      kind: 'classic',
      title: han('黃帝內經'),
      by: t(ABOUT_COPY.neijingBy),
      date: t(ABOUT_COPY.neijingDate),
      note: t(ABOUT_COPY.neijingNote),
    },
    {
      kind: 'classic',
      title: han('針灸甲乙經'),
      by: t(ABOUT_COPY.jiayiBy),
      date: t(ABOUT_COPY.jiayiDate),
      note: t(ABOUT_COPY.jiayiNote),
    },
    {
      kind: 'classic',
      title: han('銅人腧穴針灸圖經'),
      by: t(ABOUT_COPY.tongrenBy),
      date: '1026',
      note: t(ABOUT_COPY.tongrenNote),
    },
    {
      kind: 'classic',
      title: han('針灸大成'),
      by: t(ABOUT_COPY.dachengBy),
      date: '1601',
      note: t(ABOUT_COPY.dachengNote),
    },
  ];
  const after: readonly TimelineWork[] = [
    {
      kind: 'cited',
      title: 'A Manual of Acupuncture',
      by: 'Deadman, Al-Khafaji & Baker, 2nd ed.',
      date: '2007',
      note: t(ABOUT_COPY.deadmanNote),
    },
    {
      kind: 'cited',
      title: 'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
      by: 'World Health Organization',
      date: '2008',
      note: t(ABOUT_COPY.whoNote),
    },
    {
      kind: 'cited',
      title: 'aijiu-mpvue',
      by: 'MIT License',
      date: t(ABOUT_COPY.today),
      note: t(ABOUT_COPY.datasetsNote),
    },
  ];

  return { before, after };
}
