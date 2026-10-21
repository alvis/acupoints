import Link from 'next/link';

import { sealGlyphs } from '@/features/points/volumes';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { LeafHeading } from './LeafHeading';
import { LeafNotes } from './LeafNotes';
import { LeafQuote } from './LeafQuote';
import { LeafSeal } from './LeafSeal';
import { VERTICAL, ACROSS } from './LeafSpread';

import type { ReactNode } from 'react';

import type { LeafSpreadViewModel } from './LeafSpreadView';

const LEAF_FOOTER_CLASSES = 'mt-auto flex flex-wrap items-end justify-between gap-4 pt-2';

/**
 * render annotated instructions, quote or summary, next-leaf link, and seal
 * @param props right-leaf content
 * @param props.model instructions, quote or summary, next leaf, and seal identity
 * @returns the annotated instructions, quote or summary, next-leaf link, and seal
 */
export const LeafTextPanel = ({ model }: Readonly<{ model: LeafSpreadViewModel }>): ReactNode => {
  const { t, r, hanLang, locale, point, han, lines, quote, summary, next } = model;

  return (
    <div
      className="
        flex min-w-0 flex-col gap-4 px-4 pt-4 pb-5
        sm:px-7
        lg:pt-6
      ">
      <LeafHeading model={model} />

      <LeafNotes
        continueLabel={t.continueReading}
        glyph={hanFor('注', locale)}
        lines={lines}
        panelLabel={t.panel}
      />

      {quote ? (
        <LeafQuote model={model} />
      ) : summary ? (
        <div
          className="
            flex items-stretch gap-4 pt-1
            group-data-[han=across]/han:flex-col
            group-data-[han=across]/han:gap-2.5
          ">
          <span
            aria-hidden="true"
            className={`
              tc flex-none self-start px-1.5 py-2.5 text-[1.19rem] font-bold
              tracking-[0.14em] shadow-[inset_0_0_0_1px_var(--color-ink)]
              ${VERTICAL}
              ${ACROSS}
              group-data-[han=across]/han:px-3
            `}
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

      <div className={LEAF_FOOTER_CLASSES}>
        {next ? (
          <Link className="wb-link flex flex-col gap-1" href={r.point(next.code)}>
            <span className="text-sm text-ink-soft italic">{t.nextLeaf}</span>
            <span className="text-xl font-bold">
              <span className="tc" lang={hanLang}>
                {hanFor(next.hanzi, locale)}
              </span>{' '}
              · {next.code} →
            </span>
          </Link>
        ) : (
          <span />
        )}
        <LeafSeal code={point.code} glyphs={sealGlyphs(han)} size="lg" text={t.seal} />
      </div>
    </div>
  );
};
