import Link from 'next/link';

import { conditionGlyphFor } from '@/features/conditions/copy';
import { cn } from '@/utilities/cn';

import { CardCap } from './CardCap';
import { fill, hanLang, homeHan, homeText } from './homeCopy';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { WayCondition } from './homeData';

/** Props for {@link ConditionCard}. */
export type ConditionCardProps = {
  locale: Locale;
  conditions: readonly WayCondition[];
  /** Conditions index. */
  conditionsHref: string;
  className?: string;
};

/**
 * 按症 — "Sets of points that pair": each condition with the number of
 * points the registry ties to it. On phones it becomes the board's
 * "Feeling…" row of chips, scrolling sideways.
 * @param props edition, condition links, point counts, and index destination
 * @param props.locale edition used for labels and links
 * @param props.conditions condition links and their point counts
 * @param props.conditionsHref destination of the conditions index
 * @param props.className additional wrapper classes
 */
export const ConditionCard: FC<ConditionCardProps> = ({
  locale,
  conditions,
  conditionsHref,
  className,
}) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const en = locale === 'en';

  return (
    <div
      className={cn(
        `
          flex flex-col gap-2
          md:gap-2.5 md:p-6 md:shadow-rest
          lg:px-7 lg:py-[26px]
        `,
        className,
      )}>
      <CardCap className="max-md:hidden" en={t.conditionCap} locale={locale} zh={han.byCondition} />
      <h3
        className={cn(
          `
            m-0 text-lg/tight font-semibold
            md:mb-1.5 md:text-[1.75rem] md:font-medium
          `,
          !en && 'tc',
        )}>
        <span className="md:hidden">{t.feeling}</span>
        <span className="max-md:hidden">{t.conditionTitle}</span>
      </h3>
      <ul
        className="
          m-0 -mr-4 flex list-none gap-2 overflow-x-auto p-0 pb-1
          sm:-mr-8
          md:mr-0 md:block md:overflow-visible md:pb-0
        ">
        {conditions.map((c) => {
          const zh = conditionGlyphFor(c.slug, locale);

          return (
            <li className="shrink-0" key={c.slug}>
              <Link
                className="
                  flex min-h-11 items-center px-3 py-2 text-[0.95rem]
                  whitespace-nowrap text-ink no-underline shadow-rest
                  hover:text-ink
                  md:items-baseline md:border-b md:border-rule md:px-0
                  md:whitespace-normal md:shadow-none
                "
                href={c.href}>
                {zh ? (
                  <span
                    className="
                      tc mr-1.5 shrink-0 font-bold
                      md:mr-0 md:w-16 md:text-xl
                    "
                    lang={lang}>
                    {zh}
                  </span>
                ) : null}
                {en || !zh ? (
                  <span
                    className="
                      min-w-0
                      md:text-lg
                    ">
                    {c.name}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="
                    lead
                    max-md:hidden
                  "
                />
                <span
                  className={cn(
                    `
                      pm shrink-0 text-xs
                      max-md:hidden
                    `,
                    !en && `tc`,
                  )}>
                  {pointsLabel(locale, c.pointCount)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        className={cn(
          `
            wb-link mt-auto pt-3 text-base text-ink underline
            max-md:hidden
          `,
          !en && 'tc',
        )}
        href={conditionsHref}>
        {fill(t.allConditions, { n: conditions.length })}
      </Link>
    </div>
  );
};

/**
 * "3 points →"; a bare arrow when the registry ties no point to the condition yet.
 * @param locale edition used for labels and links
 * @param count number of points linked to the condition
 * @returns the linked point count and arrow, or a bare arrow when there are no points
 */
function pointsLabel(locale: Locale, count: number): string {
  const t = homeText(locale);
  if (count === 0) {
    return '→';
  }

  return fill(count === 1 ? t.conditionPoint : t.conditionPoints, { n: count });
}
