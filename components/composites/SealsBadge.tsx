'use client';

import Link from 'next/link';

import { useSeals } from '@/components/headless/useSeals';
import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { TOTAL_LEAVES } from '@/utilities/seals/sealStore';

import type { ComponentPropsWithoutRef, FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link SealsBadge}. */
export type SealsBadgeProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'children'> & {
  locale: Locale;
  /** Whether My seals is the current page. */
  current?: boolean;
};

/**
 * Masthead link to My seals (印譜) with the live count from this browser.
 * @param props the seal-book navigation link.
 * @param props.locale language used for text and routes.
 * @param props.current whether this link is the current page.
 * @param props.className additional wrapper classes.
 */
export const SealsBadge: FC<SealsBadgeProps> = ({
  locale,
  current = false,
  className,
  ...linkProps
}) => {
  const { codes, ready } = useSeals();
  const chrome = getDictionary(locale).chrome;
  const n = ready ? codes.length : 0;

  return (
    <Link
      {...linkProps}
      aria-current={current ? 'page' : undefined}
      aria-label={chrome.sealsCount
        .replace('{n}', String(n))
        .replace('{total}', String(TOTAL_LEAVES))}
      className={cn(
        `
          flex h-10 items-center gap-2 pr-3 pl-2 text-base text-ink no-underline
          hover:text-ink
        `,
        current
          ? `
            shadow-[inset_0_0_0_1.5px_var(--color-ink),inset_0_-3px_0_var(--color-cinnabar)]
          `
          : `
            shadow-rest
            hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
          `,
        className,
      )}>
      <Seal bottom="譜" size={24} top="印" />
      <span className="pm text-[0.8rem]">{n}</span>
    </Link>
  );
};
