import { Stamp } from '@/components/primitives/Stamp';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';

import { StampFoot } from './FooterFrame';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

interface SectionProps {
  locale: Locale;
}
/**
 * printed colophon details at the close of the book.
 * @param props edition used for the closing editorial record
 * @param props.locale edition used for labels and links
 */
export const FooterColophon: FC<Readonly<SectionProps>> = ({ locale }) => {
  const chrome = getDictionary(locale).chrome;
  const f = chrome.footer;

  const zh = locale !== 'en';

  return (
    <section
      aria-labelledby="ft-colophon"
      className="
        flex gap-3.5 py-[22px]
        lg:w-[270px] lg:flex-none lg:border-r lg:border-rule lg:px-[22px]
      ">
      <span
        aria-hidden="true"
        className="
          tc vt flex-none text-[1.15rem] font-black tracking-[0.2em]
          text-ink-micro
        ">
        {f.han.colophon}
      </span>
      <div
        className="
          flex min-w-0 flex-1 flex-col gap-2 text-[0.92rem] leading-normal
        ">
        <h2 className={cn('m-0 mb-0.5 text-[1.08rem] font-semibold', zh && `tc`)} id="ft-colophon">
          {f.colophon}
        </h2>
        <span className={cn(zh && 'tc')}>{f.colophonText}</span>
        <span className={cn('text-ink-micro', zh && `tc`)}>{f.notAdvice}</span>
        <StampFoot
          caption={f.stamps.printed}
          stamp={
            <Stamp
              solid
              bottom={f.seals.printed.bottom}
              label={f.seals.printed.label}
              rotate={5}
              top={f.seals.printed.top}
            />
          }
          zh={zh}
        />
      </div>
    </section>
  );
};
