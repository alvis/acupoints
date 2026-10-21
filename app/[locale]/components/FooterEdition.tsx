import { Stamp } from '@/components/primitives/Stamp';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';

import { StampFoot } from './FooterFrame';
import { LanguageIcon } from './LanguageIcon';
import { LanguageLinks } from './LanguageLinks';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

interface SectionProps {
  locale: Locale;
}
/**
 * printed edition details at the close of the book.
 * @param props edition used for the closing language choices
 * @param props.locale edition used for labels and links
 */
export const FooterEdition: FC<Readonly<SectionProps>> = ({ locale }) => {
  const chrome = getDictionary(locale).chrome;
  const f = chrome.footer;

  const zh = locale !== 'en';

  return (
    <section
      aria-labelledby="ft-end"
      className="
        flex gap-[18px] border-b border-rule py-[22px]
        lg:w-[292px] lg:flex-none lg:border-r lg:border-b-0 lg:pr-[22px]
      ">
      <span
        aria-hidden="true"
        className="
          tc vt hidden flex-none text-[2.1rem] leading-none font-black
          tracking-[0.08em]
          sm:block
        ">
        {f.han.scrollEnd}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 className={cn('m-0 text-[1.35rem] leading-tight font-medium', zh && `
          tc
        `)} id="ft-end">
          {f.endOfBook}
        </h2>
        <span className={cn(`text-[0.88rem] text-ink-micro`, zh && `tc`)}>{f.volumes}</span>
        <div aria-labelledby="ft-lang" className="mt-3.5 flex flex-col gap-1.5" role="group">
          <span
            className="
              mb-0.5 flex items-center gap-2 text-[0.92rem] font-semibold
            "
            id="ft-lang">
            <LanguageIcon size={24} />
            {zh ? (
              <span className="tc">{chrome.language}</span>
            ) : (
              <>
                Language{' '}
                <span aria-hidden="true" className="tc font-bold">
                  {f.han.language}
                </span>
              </>
            )}
          </span>
          <LanguageLinks current={locale} />
        </div>
        <StampFoot
          caption={f.stamps.languages}
          stamp={
            <Stamp
              round
              bottom={f.seals.languages.bottom}
              label={f.seals.languages.label}
              rotate={-4}
              top={f.seals.languages.top}
            />
          }
          zh={zh}
        />
      </div>
    </section>
  );
};
