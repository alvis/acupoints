import { CitePopover } from '@/components/composites/CitePopover';
import { FaqBlock } from '@/components/composites/FaqBlock';
import { LastReviewed } from '@/components/composites/LastReviewed';
import { SafetyCallout } from '@/components/composites/SafetyCallout';
import { Sources } from '@/components/composites/Sources';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { LeafCommentary } from './LeafCommentary';

import type { ReactNode } from 'react';

import type { PointLeafContainerViewModel } from './PointLeafContainerView';

/**
 * render commentary, safety notices, questions, sources, and review details
 * @param props reference material below the carved spread
 * @param props.model commentary, safety notices, FAQs, citations, and review date
 * @returns the commentary, safety notices, questions, sources, and review details
 */
export const LeafReferenceNotes = ({
  model,
}: Readonly<{ model: PointLeafContainerViewModel }>): ReactNode => {
  const {
    t,
    hanLang,
    dict,
    locale,
    quote,
    summary,
    sections,
    contents,
    recordedCautions,
    cautionsTitle,
    cautionsLang,
    arm,
    infoNote,
    faqs,
    citations,
    reviewed,
    pagePath,
    point,
  } = model;

  return (
    <div
      data-pagefind-body
      className="
        mx-auto mt-14 flex max-w-[1440px] flex-col gap-12 px-4
        sm:px-8
        lg:mt-16 lg:px-20
      ">
      {sections.length > 0 ? (
        <LeafCommentary contents={contents} contentsLabel={t.contents} sections={sections} />
      ) : null}

      <div
        className="
          flex flex-col gap-10
          lg:ml-74
        ">
        {quote ? (
          <div className="flex items-stretch gap-4">
            <span
              aria-hidden="true"
              className="
                tc vt flex-none self-start px-1.5 py-2.5 text-[1.19rem]
                font-bold tracking-[0.14em]
                shadow-[inset_0_0_0_1px_var(--color-ink)]
              "
              lang={hanLang}>
              {hanFor(t.summary.han, locale)}
            </span>
            <div
              className="
                flex min-w-0 flex-col justify-center gap-1.5 text-base
                leading-[1.45]
              ">
              {locale === 'en' ? <span className="cap">{t.summary.label}</span> : null}
              {summary}
            </div>
          </div>
        ) : null}
        {recordedCautions.length > 0 ? (
          <SafetyCallout className="my-0" title={cautionsTitle} variant="caution">
            <ul>
              {recordedCautions.map((item) => (
                <li key={item} lang={cautionsLang}>
                  {item}
                </li>
              ))}
            </ul>
          </SafetyCallout>
        ) : null}
        {arm ? (
          <SafetyCallout
            className="my-0"
            mark="限"
            title={dict.disclaimers.selfCareTitle}
            variant="caution">
            {arm.selfCareLimits} {dict.disclaimers.selfCareNotice}
          </SafetyCallout>
        ) : null}
        {infoNote ? (
          <SafetyCallout className="my-0" title={t.infoTitle} variant="info">
            {t.infoBody}
          </SafetyCallout>
        ) : null}

        {faqs.length > 0 ? (
          <FaqBlock className="mt-0" heading={dict.faqHeading} items={faqs} locale={locale} />
        ) : null}

        <Sources className="mt-0" items={citations} locale={locale} />

        <div
          className="
            flex flex-wrap items-center justify-between gap-4 border-t-[2.5px]
            border-ink pt-4
          ">
          <LastReviewed date={reviewed} locale={locale} />
          <CitePopover
            path={pagePath}
            reviewed={reviewed}
            title={`${point.code} (${point.name})`}
          />
        </div>
      </div>
    </div>
  );
};
