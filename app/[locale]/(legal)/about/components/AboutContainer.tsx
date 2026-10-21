import { EditorialView } from '@/components/composites/EditorialView';
import { SectionHead } from '@/components/primitives/SectionHead';
import { Speakable } from '@/components/primitives/Speakable';
import { loadProseRegistry } from '@/content/pages';
import { HanLead } from '@/features/editorial/components/HanLead';
import { TrustCrumbs } from '@/features/editorial/components/TrustCrumbs';
import { TrustHero } from '@/features/editorial/components/TrustHero';
import { TrustPage } from '@/features/editorial/components/TrustPage';
import { ABOUT_COPY, COMMON_COPY } from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';

import { AboutChecks } from './AboutChecks';
import { AboutContact } from './AboutContact';
import { AboutGlance } from './AboutGlance';
import { AboutLanguages } from './AboutLanguages';
import { aboutPresentation } from './aboutPresentation';
import { AboutPurpose } from './AboutPurpose';
import { AboutSources } from './AboutSources';

import type { FC } from 'react';

import type { AboutContainerProps } from './AboutContainerDetails';

export type { AboutContainerProps } from './AboutContainerDetails';

/**
 * 說明 (board WbAbout): what the book is, its sources as a woodblock
 * timeline, how a leaf is checked, its three languages and the corrections
 * inbox, then the authored about module in full (sections, sources, last
 * reviewed). Board copy is condensed from that module; the four classics
 * on the timeline are history only, given with their long-established dates,
 * and are never cited by a leaf.
 * @param props edition used to assemble the about spread
 * @param props.locale active language
 */
export const AboutContainer: FC<AboutContainerProps> = async ({ locale }) => {
  const editorialModule = (await loadProseRegistry()).hub('static', 'about');
  const {
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
  } = aboutPresentation(locale);

  return (
    <TrustPage>
      <TrustCrumbs aria-label={t(COMMON_COPY.breadcrumb)} items={crumbs} zh={zh} />
      <TrustHero
        aside={
          <AboutGlance
            rows={glanceRows}
            rule={t(ABOUT_COPY.glanceRule)}
            seal={glanceSeal}
            title={t(ABOUT_COPY.glanceTitle)}
            zh={zh}
          />
        }
        cap={t(ABOUT_COPY.cap)}
        capZh={han('說明')}
        lead={
          <Speakable
            as="p"
            className={cn(
              `
                m-0 max-w-[600px] text-[1.15rem] leading-normal text-ink-soft
                not-italic
                sm:text-[1.25rem]
              `,
              zh && 'tc',
            )}>
            {t(ABOUT_COPY.lead)}
          </Speakable>
        }
        title={t(ABOUT_COPY.title)}
        vertical={han('說明')}
        zh={zh}
      />

      <AboutPurpose {...{ t, han, zh, making }} />

      <AboutSources {...{ t, han, zh, before, after, citedSeal, noteClass }} />

      <AboutChecks
        cap={t(ABOUT_COPY.checkCap)}
        note={t(ABOUT_COPY.checkNote)}
        seal={checkSeal}
        sealLabel={t(ABOUT_COPY.checkSeal)}
        steps={checks}
        title={t(ABOUT_COPY.checkTitle)}
        zh={zh}
      />

      <section aria-labelledby="about-langs" className="mt-[72px]">
        <SectionHead
          aside={<p className={noteClass}>{t(ABOUT_COPY.langsNote)}</p>}
          className="mb-7 border-b border-ink pb-3.5"
          id="about-langs"
          kicker={
            <HanLead han={han('三語')} zh={zh}>
              {t(ABOUT_COPY.langsCap)}
            </HanLead>
          }
          title={<span className={cn(zh && 'tc')}>{t(ABOUT_COPY.langsTitle)}</span>}
          zh={han('三語')}
        />
        <AboutLanguages currentLabel={t(ABOUT_COPY.current)} editions={editions} zh={zh} />
      </section>

      <AboutContact
        changelogHref={r.changelog}
        faqHref={r.faq}
        labels={contactLabels}
        policiesHref={r.privacy}
        zh={zh}
      />

      {editorialModule ? (
        <section aria-labelledby="about-full" className="mt-[72px]">
          <SectionHead
            className="mb-2 border-b border-ink pb-3.5"
            id="about-full"
            kicker={
              <HanLead han={han('全文')} zh={zh}>
                {t(ABOUT_COPY.fullCap)}
              </HanLead>
            }
            title={<span className={cn(zh && 'tc')}>{t(ABOUT_COPY.fullTitle)}</span>}
            zh={han('全文')}
          />
          <EditorialView locale={locale} module={editorialModule} pagePath={r.about} />
        </section>
      ) : null}
    </TrustPage>
  );
};
