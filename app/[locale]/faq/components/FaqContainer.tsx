import { Speakable } from '@/components/primitives/Speakable';
import { FAQ_GROUPS, faqs } from '@/content/faq';
import { TrustCrumbs } from '@/features/editorial/components/TrustCrumbs';
import { TrustHero } from '@/features/editorial/components/TrustHero';
import { TrustPage } from '@/features/editorial/components/TrustPage';
import {
  COMMON_COPY,
  englishCount,
  FAQ_COPY,
  fill,
  hanText,
  translator,
} from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';
import { localizedRoutes, withLocale } from '@/utilities/routes';

import { FaqAccordion } from './FaqAccordion';
import { FaqAside } from './FaqAside';
import { parseInlineLinks } from './inlineLinks';

import type { FC } from 'react';

import type { FaqGroup } from '@/content/faq';
import type { TrustCrumb } from '@/features/editorial/components/TrustCrumbs';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

import type { FaqAccordionLabels, FaqEntry, FaqGroupLabel } from './FaqAccordion';
import type { FaqAsideLabels } from './FaqAside';

/** Props for {@link FaqContainer}. */
export type FaqContainerProps = { locale: Locale };

/** Han glyph, rail label and list heading of each group, as on the board rail. */
const GROUP_COPY: Record<FaqGroup, { han: string; label: Bilingual; title: Bilingual }> = {
  words: { han: '詞', label: FAQ_COPY.groupWords, title: FAQ_COPY.groupTitleWords },
  pressing: { han: '按', label: FAQ_COPY.groupPressing, title: FAQ_COPY.groupTitlePressing },
  safety: { han: '慎', label: FAQ_COPY.groupSafety, title: FAQ_COPY.groupTitleSafety },
};

/**
 * 問答 (board WbFaq): the sitewide FAQ as a one-open-at-a-time accordion
 * between a rail of question groups and a "still unsure" margin. English
 * pages read each entry's English text, Chinese pages its authored
 * Traditional text (Simplified derived on zh-cn).
 * @param props reading locale for questions and navigation
 * @param props.locale language used for links and copy
 * @returns the localized FAQ spread with its accordion and margin notes
 */
export const FaqContainer: FC<FaqContainerProps> = ({ locale }) => {
  const r = localizedRoutes(locale);
  const t = translator(locale);
  const han = hanText(locale);
  const zh = locale !== 'en';
  const spell = (n: number): string => (zh ? hanNumeral(n) : englishCount(n));
  const countLine = (n: number): string =>
    n === 1 ? t(FAQ_COPY.countOne) : fill(t(FAQ_COPY.count), { n: spell(n) });

  const entries: readonly FaqEntry[] = faqs.map((item, index) => {
    // English entries may cite a character, "Qi (氣)"; zh-cn sets it Simplified.
    const text = zh ? item.zh : item;

    return {
      id: `faq-q-${index + 1}`,
      ordinal: han(`問${hanNumeral(index + 1)}`),
      question: han(text.question),
      answer: parseInlineLinks(han(text.answer), locale),
      followThrough: text.followThrough
        ? parseInlineLinks(han(text.followThrough), locale)
        : undefined,
      group: item.group,
      groupHan: han(GROUP_COPY[item.group].han),
      more: { href: `${withLocale(locale, item.more.href)}/`, label: t(item.more.label) },
    };
  });
  const groups: readonly FaqGroupLabel[] = [
    {
      key: 'all',
      han: han('全'),
      label: t(FAQ_COPY.groupAll),
      title: fill(t(FAQ_COPY.listTitle), { n: spell(faqs.length) }),
      count: countLine(faqs.length),
    },
    ...FAQ_GROUPS.map((key) => ({
      key,
      han: han(GROUP_COPY[key].han),
      label: t(GROUP_COPY[key].label),
      title: t(GROUP_COPY[key].title),
      count: countLine(faqs.filter((item) => item.group === key).length),
    })),
  ];
  const crumbs: readonly TrustCrumb[] = [
    { href: r.home, zh: '首', label: t(COMMON_COPY.home) },
    { zh: '問答', label: t(FAQ_COPY.crumb) },
  ];
  const accordionLabels: FaqAccordionLabels = {
    railCap: t(FAQ_COPY.railCap),
    railNote: t(FAQ_COPY.railNote),
    groups,
  };
  const asideLabels: FaqAsideLabels = {
    unsureCap: t(FAQ_COPY.unsureCap),
    unsureTitle: t(FAQ_COPY.unsureTitle),
    unsureBody: t(FAQ_COPY.unsureBody),
    emergencyLead: t(FAQ_COPY.emergencyLead),
    emergencyRest: t(FAQ_COPY.emergencyRest),
    moreCap: t(FAQ_COPY.moreCap),
    moreBody: t(FAQ_COPY.moreBody),
    aboutLink: t(FAQ_COPY.aboutLink),
    glossaryLink: t(FAQ_COPY.glossaryLink),
    askSeal: [han('問'), han('醫')],
    unsureMark: han('醫'),
    moreMark: han('補'),
  };
  const lead = (
    <Speakable
      as="p"
      className={cn(
        `
          m-0 max-w-[640px] text-[1.15rem] leading-normal text-ink-soft
          not-italic
          sm:text-[1.25rem]
        `,
        zh && 'tc',
      )}>
      {t(FAQ_COPY.lead)}
    </Speakable>
  );

  return (
    <TrustPage>
      <TrustCrumbs aria-label={t(COMMON_COPY.breadcrumb)} items={crumbs} zh={zh} />
      <div data-pagefind-body>
        <TrustHero
          cap={t(FAQ_COPY.cap)}
          capZh={han('問答')}
          lead={lead}
          title={t(FAQ_COPY.title)}
          vertical={han('問答')}
          zh={zh}
        />
        <section
          className="
            mt-[52px] grid items-start gap-10
            lg:grid-cols-[230px_minmax(0,1fr)_350px] lg:gap-11
          ">
          <FaqAccordion entries={entries} labels={accordionLabels} zh={zh} />
          <FaqAside aboutHref={r.about} glossaryHref={r.glossary} labels={asideLabels} zh={zh} />
        </section>
      </div>
    </TrustPage>
  );
};
