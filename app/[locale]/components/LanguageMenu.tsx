'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/utilities/cn';
import { getDictionary, LOCALE_NAMES } from '@/utilities/i18n/dictionaries';
import { stripLocale } from '@/utilities/routes';

import { LanguageIcon } from './LanguageIcon';
import { LanguageOptions } from './LanguageOptions';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link LanguageMenu}. */
export type LanguageMenuProps = {
  /** The edition being read. */
  current: Locale;
  className?: string;
};

/**
 * Masthead language button (文A + the current language in its own script)
 * opening a menu of the three editions. Targets keep the deep path, so
 * switching from /zh-hant/points/li4/ lands on /en/points/li4/.
 * @param props current edition and optional trigger styling
 * @param props.current edition currently being read
 * @param props.className additional wrapper classes
 * @returns the edition selector and its deep-path language links
 */
export const LanguageMenu: FC<LanguageMenuProps> = ({ current, className }) => {
  const chrome = getDictionary(current).chrome;
  const pathname = usePathname() as string | null;
  const bare = stripLocale(pathname ?? '/');
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointer = (event: PointerEvent): void => {
      if (!(event.target instanceof Node) || !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={cn('relative', className)} ref={rootRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${chrome.language}: ${LOCALE_NAMES[current].long}`}
        className={cn(
          `
            flex h-10 cursor-pointer items-center gap-2 border-0 px-3 text-base
            shadow-rest
          `,
          open
            ? 'bg-ink text-paper'
            : `
              bg-transparent text-ink
              hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
            `,
        )}
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}>
        <LanguageIcon />
        <span className={cn('whitespace-nowrap', current !== 'en' && 'tc')}>
          {LOCALE_NAMES[current].long}
        </span>
        <svg aria-hidden="true" height="6" viewBox="0 0 10 6" width="10">
          <path d="M1 1 L5 5 L9 1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      {open ? <LanguageOptions {...{ current, bare, menuId, setOpen }} /> : null}
    </div>
  );
};
