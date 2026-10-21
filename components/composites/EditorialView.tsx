import { CitePopover } from '@/components/composites/CitePopover';
import { FaqBlock } from '@/components/composites/FaqBlock';
import { KeyFacts } from '@/components/composites/KeyFacts';
import { LastReviewed } from '@/components/composites/LastReviewed';
import { PronunciationAudio } from '@/components/composites/PronunciationAudio';
import { SafetyCallout } from '@/components/composites/SafetyCallout';
import { Sources } from '@/components/composites/Sources';
import { NumberDisc } from '@/components/primitives/NumberDisc';
import { Speakable } from '@/components/primitives/Speakable';
import { isCataloguePoint } from '@/content/catalog';
import { cn } from '@/utilities/cn';
import { contentLabels, hanLang } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';

import { CatalogueFactSidebar } from './CatalogueFactSidebar';

import type { FC, PropsWithChildren } from 'react';

import type { EditorialArm, EditorialPointModule } from '@/content/editorial/schema';
import type { CataloguePoint, Point } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

/**
 * Structural slice every editorial module exposes to this renderer. Both the
 * point module and the hub modules satisfy it; `echoedDatasetCautions` and
 * `title` are present only where the source module carries them.
 */
type EditorialViewModule = Pick<EditorialPointModule, 'en' | 'zh' | 'sources' | 'lastReviewed'> & {
  echoedDatasetCautions?: readonly string[];
  title?: string;
};

/** Props for {@link EditorialView}. */
export type EditorialViewProps = PropsWithChildren<{
  module: EditorialViewModule;
  /** Page locale — selects the single prose arm this view renders. */
  locale: Locale;
  pagePath: string;
  /** Registry point behind the page — switches on point-page flavor (grid + fact sidebar). */
  point?: Point | CataloguePoint;
  meridianName?: string;
  /** Extra classes for the prose column. */
  className?: string;
}>;

/**
 * Registry-fed trailing sections (e.g. related links) ride `children` and
 * stay inside the prose flow.
 *
 * ONE renderer for authored editorial-layer prose, showing exactly one
 * language arm per page: EN pages render `module.en`; zh-hant renders the
 * authored traditional-Chinese arm (`module.zh`); zh-cn derives its
 * simplified arm from that same traditional source at render time. The
 * registry spine owns identity; this component owns prose ONLY: locale-arm
 * summary, sections, self-care limits, FAQs, echoed dataset cautions, the
 * universal disclaimer, sources, and review metadata. Pages keep their
 * registry-fed blocks (identity header, plate, related links) around it.
 *
 * Woodblock layout, bite-size: the summary is a lede, each section a short
 * ruled block under a mono caps label and a numbered cinnabar disc, cautions
 * and self-care limits sit in cinnabar "get help now" frames, the FAQ is a
 * ruled Q&A, sources a numbered list, and the review date a mono caps line.
 *
 * With a registry `point`, the prose renders in a two-column grid whose
 * sidebar keeps today's registry-fed facts: KeyFacts for legacy editorial
 * records, the catalogue fact table for compiled points. Hub pages get the
 * bare prose flow.
 *
 * The page JSON-LD graph owns `.speakable`, so the lead summary suppresses
 * the sibling SpeakableSpecification emission.
 * @param props the localized editorial article.
 * @param props.module editorial document to render.
 * @param props.locale language used for text and routes.
 * @param props.point catalogue entry to describe.
 * @param props.meridianName localized channel name.
 * @param props.pagePath current route for citations.
 * @param props.className additional wrapper classes.
 * @param props.children registry-fed sections appended inside the article prose.
 * @returns the localized article with cautions, sources, and optional point facts.
 */
export const EditorialView: FC<EditorialViewProps> = ({
  module,
  locale,
  point,
  meridianName,
  pagePath,
  className,
  children,
}) => {
  const body = (
    // data-pagefind-body scopes the index to article prose rather than page
    // chrome. A page without it is absent from the index entirely, so the
    // policy pages that carry no editorial module set it themselves.
    <div data-pagefind-body className={cn('max-w-240 text-ink', className)}>
      <EditorialProse
        locale={locale}
        meridianName={meridianName}
        module={module}
        pagePath={pagePath}
        point={point}>
        {children}
      </EditorialProse>
    </div>
  );

  if (!point) {
    return body;
  }

  return (
    <div
      className="
        mt-10 grid gap-12
        lg:grid-cols-[minmax(0,1fr)_340px]
      ">
      <article className="min-w-0">{body}</article>
      <div className="lg:sticky lg:top-24 lg:self-start">
        {isCataloguePoint(point) ? (
          <CatalogueFactSidebar locale={locale} meridianName={meridianName} point={point} />
        ) : (
          <KeyFacts locale={locale} point={point} />
        )}
      </div>
    </div>
  );
};

type EditorialProseProps = Omit<EditorialViewProps, 'className'>;

const EditorialProse: FC<EditorialProseProps> = ({
  module,
  locale,
  point,
  meridianName,
  pagePath,
  children,
}) => {
  const dict = getDictionary(locale);
  const labels = contentLabels(locale);
  const arm = armForLocale(module, locale);
  const citeTitle = point ? `${point.code} (${point.name})` : (module.title ?? pagePath);
  const locationText = point
    ? isCataloguePoint(point)
      ? point.location
      : point.whoCoordinates
    : undefined;
  const actions = point && isCataloguePoint(point) ? point.actions : [];
  const cautions = module.echoedDatasetCautions ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <BlockLabel locale={locale} text={labels.inShort.text} zh={labels.inShort.zh} />
        <Speakable
          suppressJsonLd
          as="p"
          className="
            m-0 max-w-[62ch] text-[1.3rem] leading-normal text-ink not-italic
            md:text-[1.45rem]
          ">
          {arm.summary}
        </Speakable>
        {point ? <PronunciationAudio pinyin={point.pinyin} /> : null}
      </div>

      {/* Registry-fed facts the editorial layer may never replace */}
      {locationText ? (
        <ProseBlock
          id="registry-where"
          label={labels.where.text}
          locale={locale}
          mark={labels.where.zh}>
          <p className="m-0">{locationText}</p>
          {meridianName ? <p className="m-0">{labels.meridianOf(meridianName)}</p> : null}
        </ProseBlock>
      ) : null}
      {actions.length > 0 ? (
        <ProseBlock
          id="registry-used-for"
          label={labels.usedFor.text}
          locale={locale}
          mark={labels.usedFor.zh}>
          <ul
            className="
              m-0 list-disc pl-5
              marker:text-seal
            ">
            {actions.map((action) => (
              <li
                className="
                  mt-1
                  first:mt-0
                "
                key={action}>
                {action}
              </li>
            ))}
          </ul>
        </ProseBlock>
      ) : null}

      <LocaleArmSections arm={arm} locale={locale} />

      {/* Safety: echoed dataset cautions verbatim + the universal disclaimer, always */}
      <div className="flex flex-col gap-6">
        {cautions.length > 0 ? (
          <SafetyCallout className="my-0" title={dict.disclaimers.cautionsTitle} variant="caution">
            <ul>
              {cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
          </SafetyCallout>
        ) : null}
        <SafetyCallout
          className="my-0"
          mark="限"
          title={dict.disclaimers.selfCareTitle}
          variant="caution">
          {arm.selfCareLimits} {dict.disclaimers.selfCareNotice}
        </SafetyCallout>
      </div>

      <FaqBlock className="mt-0" heading={dict.faqHeading} items={arm.faqs} locale={locale} />

      {children ? <div className="prose-editorial">{children}</div> : null}

      <Sources className="mt-0" items={module.sources} locale={locale} />

      <div
        className="
          flex flex-wrap items-center justify-between gap-4 border-t-[2.5px]
          border-ink pt-4
        ">
        <LastReviewed date={module.lastReviewed} locale={locale} />
        <CitePopover
          label={labels.cite.text}
          path={pagePath}
          reviewed={module.lastReviewed}
          title={citeTitle}
        />
      </div>
    </div>
  );
};

/** Authored sections as numbered ruled blocks under stable heading anchors. */
type LocaleArmSectionsProps = { arm: EditorialArm; locale: Locale };

const LocaleArmSections: FC<LocaleArmSectionsProps> = ({ arm, locale }) => {
  const labels = contentLabels(locale);

  return (
    <>
      {arm.sections.map((section, i) => (
        <section
          aria-labelledby={section.id}
          className="
            grid gap-x-8 gap-y-3 border-t-[1.5px] border-ink pt-5
            md:grid-cols-[10rem_minmax(0,1fr)]
          "
          key={section.id}>
          <div
            className="
              flex items-center gap-3
              md:flex-col md:items-start
            ">
            <NumberDisc n={i + 1} size={36} />
            <span className="cap">{labels.part(i + 1)}</span>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <h2
              className="
                m-0 font-display text-2xl/tight font-medium text-ink
                md:text-[1.75rem]
              "
              id={section.id}>
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              // Full-string key: prefix slices can collide across paragraphs.
              <p
                className="
                  m-0 max-w-[68ch] text-[1.0625rem] leading-[1.65] text-ink-soft
                "
                key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

/** A registry-fed ruled block headed by a square Han mark and a mono caps label. */
type ProseBlockProps = PropsWithChildren<{
  mark: string;
  label: string;
  locale: Locale;
  id: string;
}>;

const ProseBlock: FC<ProseBlockProps> = ({ mark, label, locale, id, children }) => {
  return (
    <section
      aria-labelledby={id}
      className="
        grid gap-x-8 gap-y-3 border-t-[1.5px] border-ink pt-5
        md:grid-cols-[10rem_minmax(0,1fr)]
      ">
      <div
        className="
          flex items-center gap-3
          md:flex-col md:items-start
        ">
        <span
          aria-hidden="true"
          className="
            tc grid h-9 min-w-9 place-items-center px-1 text-[1rem] font-bold
            shadow-rest
          "
          lang={hanLang(locale)}>
          {mark}
        </span>
      </div>
      <div
        className="
          flex min-w-0 flex-col gap-2 text-[1.0625rem] leading-[1.65]
          text-ink-soft
        ">
        <h2
          className="
            m-0 font-display text-2xl/tight font-medium text-ink
            md:text-[1.75rem]
          "
          id={id}>
          {label}
        </h2>
        {children}
      </div>
    </section>
  );
};

/** Mono caps label, led by its Han word on EN pages. */
type BlockLabelProps = { zh: string; text: string; locale: Locale };

const BlockLabel: FC<BlockLabelProps> = ({ zh, text, locale }) => {
  return (
    <span className="cap">
      {locale === 'en' ? (
        <>
          <span aria-hidden="true" className="tc font-bold" lang={hanLang(locale)}>
            {zh}
          </span>{' '}
          ·{' '}
        </>
      ) : null}
      {text}
    </span>
  );
};
