import Link from 'next/link';

import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

interface SectionProps {
  locale: Locale;
}
/**
 * printed credits details at the close of the book.
 * @param props edition used for credits and publishing details
 * @param props.locale edition used for labels and links
 */
export const FooterCredits: FC<Readonly<SectionProps>> = ({ locale }) => {
  const chrome = getDictionary(locale).chrome;
  const f = chrome.footer;
  const r = localizedRoutes(locale);
  const zh = locale !== 'en';

  return (
    <div
      className="
        flex flex-wrap items-center gap-x-[22px] gap-y-3 border-t border-rule
        px-4 py-3 text-[0.86rem] text-ink-micro
        sm:px-8
        lg:pr-[22px] lg:pl-[72px]
      ">
      <Link
        className="
          flex items-center gap-2.5 text-ink no-underline
          hover:text-ink
        "
        href={r.home}>
        <Seal size={28} />
        <span className={cn('text-[1.05rem] font-medium', zh && 'tc')}>{chrome.brand}</span>
      </Link>
      <span className={cn(zh && 'tc')}>© 2026 · {f.rights}</span>
      <span
        className="
          hidden flex-1
          md:block
        "
      />
      <Link className={cn('wb-link', zh && 'tc')} href={r.disclaimer}>
        {f.links.disclaimer}
      </Link>
      <Link className={cn('wb-link', zh && 'tc')} href={r.privacy}>
        {f.links.privacy}
      </Link>
      <Link className={cn('wb-link', zh && 'tc')} href={r.affiliate}>
        {f.links.affiliate}
      </Link>
      <span className="pm text-[0.72rem]">
        <a className="wb-link" href="/llms.txt">
          llms.txt
        </a>{' '}
        ·{' '}
        <a className="wb-link" href="/feed.xml">
          RSS
        </a>
      </span>
      <a
        className="
          inline-flex items-center gap-2 px-3.5 py-2 text-[0.92rem] text-ink
          no-underline shadow-rest
          hover:text-ink hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
        "
        href="#top">
        <span className={cn(zh && 'tc')}>{f.backToTop}</span> <span aria-hidden="true">↑</span>
      </a>
    </div>
  );
};
