'use client';

import { useEffect, useState } from 'react';

import { SearchCommand } from '../../components/SearchCommand';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link SearchOpener}. */
export type SearchOpenerProps = {
  locale: Locale;
  /** Resolved label of the button that reopens the window. */
  label: string;
  /** True on Chinese pages, for the Han face on the label. */
  zh: boolean;
};

/**
 * The /search page's island: opens the shared ⌘K search window once the page
 * has loaded, and keeps a button to reopen it after the reader closes it.
 * Closing stays on this page; picking a result navigates as it does anywhere.
 * @param props search locale, reopen label, and language styling
 * @param props.locale edition used for labels and links
 * @param props.label accessible control label
 * @param props.zh whether the edition uses Chinese labels
 * @returns the shared search window and its reopen button
 */
export const SearchOpener: FC<SearchOpenerProps> = ({ locale, label, zh }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <button
        aria-haspopup="dialog"
        className={zh ? 'btn btn-primary tc' : 'btn btn-primary'}
        type="button"
        onClick={() => setOpen(true)}>
        {label} <span className="pm text-[0.85em]">⌘K</span>
      </button>
      <SearchCommand locale={locale} open={open} onOpenChange={setOpen} />
    </>
  );
};
