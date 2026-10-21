import { VERTICAL, ACROSS } from './LeafSpread';

import type { ReactNode } from 'react';

import type { LeafSpreadViewModel } from './LeafSpreadView';

/**
 * render Han and translated point name, pronunciation, code, and registry facts
 * @param props point title settings
 * @param props.model point names, pronunciation, code, and formatted facts
 * @returns the Han and translated point name, pronunciation, code, and registry facts
 */
export const LeafHeading = ({ model }: Readonly<{ model: LeafSpreadViewModel }>): ReactNode => {
  const { hanLang, locale, point, han, facts } = model;

  return (
    <div
      className="
        flex items-stretch gap-3
        group-data-[han=across]/han:flex-col group-data-[han=across]/han:gap-2.5
        sm:gap-4
      ">
      <span
        aria-hidden="true"
        className={`
          tc self-start border-l-[1.5px] border-ink pl-2 text-[2rem]
          leading-none font-black tracking-[0.08em]
          sm:pl-2.5 sm:text-[2.875rem]
          ${VERTICAL}
          ${ACROSS}
          group-data-[han=across]/han:border-b-[1.5px]
          group-data-[han=across]/han:border-l-0
          group-data-[han=across]/han:pb-2.5 group-data-[han=across]/han:pl-0
        `}
        lang={hanLang}>
        {han}
      </span>
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        <h1
          className="
            m-0 text-[2rem] leading-none font-medium
            sm:text-[2.75rem]
          "
          id="leaf-title">
          <span className="sr-only" lang={hanLang}>
            {han}{' '}
          </span>
          {point.name}
        </h1>
        <p
          className="
            m-0 text-[0.95rem] text-ink-soft italic
            sm:text-[1.19rem]
          ">
          {locale === 'en' && point.gloss ? `“${point.gloss}”` : point.pinyin} · {point.code}
        </p>
        <p className="pm m-0 text-[0.6875rem] leading-snug text-ink-micro">{facts}</p>
      </div>
    </div>
  );
};
