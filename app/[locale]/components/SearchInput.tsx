import type { FC } from 'react';

import type { useSearchCommand } from './useSearchCommand';

type SearchInputProps = Pick<
  ReturnType<typeof useSearchCommand>,
  | 'copy'
  | 'listId'
  | 'optionId'
  | 'active'
  | 'flat'
  | 'inputRef'
  | 'query'
  | 'setQuery'
  | 'setActiveIndex'
  | 'onInputKeyDown'
> & { onOpenChange: (open: boolean) => void };
/**
 * combobox and close control at the top of the index panel.
 * @param props combobox labels, query, results, input reference, and navigation actions
 * @param props.copy localized index labels
 * @param props.listId identifier of the results listbox
 * @param props.optionId builds a stable identifier for each option
 * @param props.active currently selected result
 * @param props.flat results in keyboard navigation order
 * @param props.inputRef reference to the search input
 * @param props.query current search text
 * @param props.setQuery updates the search text
 * @param props.setActiveIndex updates the selected result index
 * @param props.onInputKeyDown handles input navigation and selection
 * @param props.onOpenChange updates search visibility
 */
export const SearchInput: FC<Readonly<SearchInputProps>> = ({
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
}) => (
  <div
    className="
      flex items-center gap-3.5 border-b-[2.5px] border-ink p-4
      sm:px-[22px] sm:py-[18px]
    ">
    <SearchGlyph />
    <input
      aria-activedescendant={active ? optionId(active) : undefined}
      aria-autocomplete="list"
      aria-controls={listId}
      aria-expanded={flat.length > 0}
      aria-label={copy.inputLabel}
      autoComplete="off"
      className="
        min-w-0 flex-1 border-0 bg-transparent p-0 font-serif text-[1.4rem]
        text-ink outline-none
        placeholder:text-ink-micro
        sm:text-[28px]
      "
      enterKeyHint="go"
      placeholder={copy.placeholder}
      ref={inputRef}
      role="combobox"
      spellCheck={false}
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setActiveIndex(0);
      }}
      onKeyDown={onInputKeyDown}
    />
    <button
      className="
        pm px-[7px] py-[3px] text-[11px] text-ink-soft
        shadow-[inset_0_0_0_1px_var(--color-ink-soft)]
        hover:shadow-[inset_0_0_0_2px_var(--color-ink)]
      "
      type="button"
      onClick={() => onOpenChange(false)}>
      <span aria-hidden="true">esc</span>
      <span className="sr-only">{copy.close}</span>
    </button>
  </div>
);

/** The board's magnifier, drawn in ink. */
const SearchGlyph: FC = () => (
  <svg aria-hidden="true" className="shrink-0" height="22" viewBox="0 0 16 16" width="22">
    <circle cx="6.5" cy="6.5" fill="none" r="5" stroke="var(--color-ink)" strokeWidth="1.6" />
    <path d="M10.4 10.4 L15 15" stroke="var(--color-ink)" strokeWidth="1.6" />
  </svg>
);
