import Link from 'next/link';

import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import type { FC } from 'react';

import type { SiteHeaderProps } from './SiteHeader';

/**
 * seal and wordmark linking back to the current edition's front page.
 * @param props edition whose front page the wordmark opens
 * @param props.locale edition used for labels and links
 */
export const HeaderBrand: FC<SiteHeaderProps> = ({ locale }) => {
  const chrome = getDictionary(locale).chrome;
  const r = localizedRoutes(locale);
  const zh = locale !== 'en';

  return (
    <Link
      aria-label={chrome.homeLabel}
      className="
        mr-2 flex items-center gap-3 text-ink no-underline
        hover:text-ink
        xl:mr-6
      "
      href={r.home}>
      <Seal size={40} />
      <span className={cn(`
        text-[1.4rem] leading-none font-medium whitespace-nowrap
      `, zh && `tc`)}>
        {chrome.brand}
      </span>
    </Link>
  );
};
