import { HandBackPlate } from '@/components/composites/HandBackPlate';
import { PointFigure } from '@/components/composites/PointFigure';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { VERTICAL } from './LeafSpread';

import type { ReactNode } from 'react';

import type { LeafSpreadViewModel } from './LeafSpreadView';

/**
 * render point illustration with its channel label and optional hand inset
 * @param props point illustration settings
 * @param props.model point identity, channel caption, and optional hand inset
 * @returns the point illustration with its channel label and optional hand inset
 */
export const LeafPointPlate = ({ model }: Readonly<{ model: LeafSpreadViewModel }>): ReactNode => {
  const { t, hanLang, locale, volume, point, channelHan, handInset, plateLabel, han } = model;

  return (
    <div
      className="
        relative flex flex-col items-center gap-4 border-b-[1.5px] border-ink
        px-4 pt-5 pb-4
        sm:px-8
        lg:border-r-[1.5px] lg:border-b-0 lg:pt-12 lg:pb-6
      ">
      <span
        aria-hidden="true"
        className={`
          tc absolute top-2.5 right-2.5 bg-paper px-[3px] py-2 text-[0.875rem]
          font-bold tracking-[0.12em] shadow-[inset_0_0_0_1px_var(--color-ink)]
          lg:top-[18px] lg:right-[18px] lg:px-[5px] lg:py-3 lg:text-[1.3rem]
          lg:shadow-rest
          ${VERTICAL}
        `}
        lang={hanLang}>
        {channelHan}
        {volume ? hanFor('圖', locale) : ''}
      </span>
      <div
        className={`
          w-full max-w-[200px]
          sm:max-w-[300px]
          lg:max-w-[360px]
          ${handInset ? `lg:self-start` : ''}
        `}>
        <PointFigure
          channel={volume?.slug}
          code={point.code}
          label={plateLabel}
          names={[{ code: point.code, text: han }]}
        />
      </div>
      {handInset ? (
        <figure
          className="
            m-0 flex w-full max-w-[220px] flex-col items-center gap-2 bg-paper
            px-3 pt-2.5 pb-3 shadow-rest
            lg:absolute lg:right-6 lg:bottom-6
          ">
          <HandBackPlate className="max-w-[190px]" code={point.code} label={handInset} />
          <figcaption className="text-[0.875rem]">
            {locale === 'en' ? (
              <>
                <span className="tc font-bold" lang={hanLang}>
                  {t.inset.han}
                </span>
                {` · ${t.inset.label}`}
              </>
            ) : (
              <span className="tc">{t.inset.label}</span>
            )}
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
};
