import { getDictionary } from '@/utilities/i18n/dictionaries';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** One of the masthead's five sections. */
export type SectionKey = 'points' | 'channels' | 'regions' | 'conditions' | 'learn';

/** A section and the route it opens. */
export type SectionLink = { key: SectionKey; href: string };

/** Props for {@link SectionLabel}. */
export type SectionLabelProps = {
  locale: Locale;
  section: SectionKey;
};

/** Han word set before each English section name, as on the printed index. */
const SECTION_HAN: Record<SectionKey, string> = {
  points: '目錄',
  channels: '經絡',
  regions: '部位',
  conditions: '症候',
  learn: '學',
};

/**
 * A section's name as the masthead and menu print it. English pages drop the
 * Han word until the masthead row has the board's room for it (about 1360px);
 * the label carries the name either way.
 * @param props edition and book section to name
 * @param props.locale edition used for labels and links
 * @param props.section book section whose label is printed
 * @returns the section’s Han label and localized name for the masthead or menu
 */
export const SectionLabel: FC<SectionLabelProps> = ({ locale, section }) => {
  const name = getDictionary(locale).chrome.sections[section];
  if (locale !== 'en') {
    return <span className="tc">{name}</span>;
  }

  return (
    <>
      <span
        aria-hidden="true"
        className="
          tc mr-1.5 font-bold
          lg:max-[1359px]:hidden
        ">
        {SECTION_HAN[section]}
      </span>
      {name}
    </>
  );
};
