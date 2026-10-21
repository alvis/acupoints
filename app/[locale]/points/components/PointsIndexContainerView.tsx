import { CarvedBody } from '@/components/primitives/CarvedBody';
import { JsonLd } from '@/components/primitives/JsonLd';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { PointsIndex } from './PointsIndex';

import type { ReactNode } from 'react';

import type { usePointsIndexContainerModel } from './PointsIndexContainer';

/** state and localized content for the PointsIndexContainer layout */
export type PointsIndexContainerViewModel = ReturnType<typeof usePointsIndexContainerModel>;

/**
 * render index title, browsing island, and structured data
 * @param model localized index entries, browsing groups, and page schema
 * @returns the index title, browsing island, and structured data
 */
export const PointsIndexContainerView = (
  model: Readonly<PointsIndexContainerViewModel>,
): ReactNode => {
  const { az, conditions, hanLang, leaves, plates, regions, en, t, total, volumes, locale, graph } =
    model;

  return (
    <>
      <div
        className="
          mx-auto max-w-[1440px] px-4 pb-[72px]
          sm:px-8
          lg:px-20
        ">
        <PointsIndex
          az={az}
          conditions={conditions}
          figureBack={<CarvedBody back />}
          figureFront={<CarvedBody />}
          hanLang={hanLang}
          leaves={leaves}
          plates={plates}
          regions={regions}
          showHan={en}
          text={t}
          total={total}
          volumes={volumes}>
          <div
            className="
              flex flex-col gap-5
              sm:flex-row sm:items-end sm:gap-[34px]
            ">
            <span
              aria-hidden="true"
              className="
                tc text-[4.5rem] leading-[0.9] font-black
                sm:text-[7.5rem]
              "
              lang={hanLang}>
              {hanFor('目錄', locale)}
            </span>
            <div
              className="
                flex flex-col gap-2.5
                sm:pb-2
              ">
              <span className="cap">{t.kicker}</span>
              <h1
                className="
                  m-0 text-[2.25rem] leading-none font-medium
                  sm:text-[3.25rem]
                ">
                {t.title}
              </h1>
              <p className="m-0 text-[1.19rem] text-ink-soft">{t.intro}</p>
              <p className="m-0 text-[0.95rem] text-ink-soft">
                <a className="wb-link" href="/feed.xml">
                  {t.rss}
                </a>
              </p>
            </div>
          </div>
        </PointsIndex>
      </div>
      <JsonLd entities={graph} />
    </>
  );
};
