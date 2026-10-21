'use client';

import { localizedRoutes } from '@/utilities/routes';

import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { SearchStatus } from './SearchStatus';
import { useSearchCommand } from './useSearchCommand';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link SearchCommand}. */
export type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Page locale — selects the routes and the window's microcopy. */
  locale: Locale;
};

/**
 * ⌘K search window in the Woodblock Chart: a paper panel inside an ink double
 * frame over a dark wash. Local hits (points, conditions, channels) are
 * grouped by type under Han labels — 穴 point, 症 condition, 經 channel — with
 * Pagefind full-text hits under 文. The input is a combobox driving the
 * listbox: ↑/↓ move the cinnabar-edged selection, ↵ opens it, Esc closes.
 * The window is a modal dialog that traps Tab and returns focus to whatever
 * opened it.
 * @param props overlay visibility, visibility action, and search edition
 * @param props.open whether the overlay is visible
 * @param props.onOpenChange action that updates overlay visibility
 * @param props.locale edition used for labels and links
 * @returns the modal book index with its combobox and grouped results
 */
export const SearchCommand: FC<SearchCommandProps> = ({ open, onOpenChange, locale }) => {
  const {
    copy,
    listId,
    titleId,
    inputRef,
    panelRef,
    query,
    setQuery,
    setActiveIndex,
    localIndex,
    flat,
    active,
    optionId,
    groups,
    onInputKeyDown,
  } = useSearchCommand({ open, onOpenChange, locale });

  if (!open) {
    return null;
  }

  const trimmed = query.trim();
  const total = trimmed ? flat.length : localIndex.length;

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="
        fixed inset-0 z-50 flex items-start justify-center px-4 pt-16
        md:pt-24
      "
      role="dialog">
      <button
        aria-label={copy.close}
        className="absolute inset-0 cursor-default bg-ink/60"
        tabIndex={-1}
        type="button"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full max-w-[780px] bg-paper p-2.5" ref={panelRef}>
        <h2 className="sr-only" id={titleId}>
          {copy.dialog}
        </h2>
        <div className="blk m-1.5 flex flex-col text-ink">
          <SearchInput
            {...{
              copy,
              listId,
              optionId,
              active,
              flat,
              inputRef,
              query,
              setQuery,
              setActiveIndex,
              onInputKeyDown,
              onOpenChange,
            }}
          />

          <SearchStatus {...{ copy, trimmed, total }} />

          <SearchResults
            {...{ copy, listId, groups, optionId, active, setActiveIndex, flat, onOpenChange }}
          />
          {trimmed && flat.length === 0 ? (
            <p
              className="
                m-0 px-4 py-10 text-[19px] text-ink-soft
                sm:px-[22px]
              ">
              {copy.empty}
            </p>
          ) : null}

          <div
            className="
              pm flex flex-wrap gap-x-5 gap-y-1 border-t-[2.5px] border-ink px-4
              py-3 text-[11px] text-ink-soft
              sm:px-[22px]
            ">
            <span>{copy.move}</span>
            <span>{copy.openLeaf}</span>
            <span>{copy.closeHint}</span>
            <span aria-hidden="true" className="flex-1" />
            <span>
              {copy.agents} GET {localizedRoutes(locale).searchIndex}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
