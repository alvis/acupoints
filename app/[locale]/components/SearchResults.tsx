import { KIND_HAN } from './searchCommandData';
import { ResultRow } from './SearchResultRow';

import type { FC } from 'react';

import type { useSearchCommand } from './useSearchCommand';

type SearchResultsProps = Pick<
  ReturnType<typeof useSearchCommand>,
  'copy' | 'listId' | 'groups' | 'optionId' | 'active' | 'setActiveIndex' | 'flat'
> & { onOpenChange: (open: boolean) => void };
/**
 * grouped listbox options retain keyboard selection and pointer picking.
 * @param props grouped results, option identifiers, selection state, and visibility action
 * @param props.copy localized index labels
 * @param props.listId identifier of the results listbox
 * @param props.groups results grouped by content kind
 * @param props.optionId builds a stable identifier for each option
 * @param props.active currently selected result
 * @param props.setActiveIndex updates the selected result index
 * @param props.flat results in keyboard navigation order
 * @param props.onOpenChange updates search visibility
 */
export const SearchResults: FC<Readonly<SearchResultsProps>> = ({
  copy,
  listId,
  groups,
  optionId,
  active,
  setActiveIndex,
  flat,
  onOpenChange,
}) => (
  <div
    aria-label={copy.dialog}
    className="flex max-h-[min(486px,55vh)] flex-col overflow-y-auto"
    id={listId}
    role="listbox">
    {groups.map((group) => (
      <div aria-labelledby={`${listId}-g-${group.kind}`} key={group.kind} role="group">
        <p
          className="
            cap m-0 border-b border-rule bg-paper px-4 pt-3 pb-1.5
            sm:px-[22px]
          "
          id={`${listId}-g-${group.kind}`}
          role="presentation">
          <span aria-hidden="true" className="tc font-bold" lang="zh-Hant">
            {KIND_HAN[group.kind]}
          </span>{' '}
          · {copy.groups[group.kind]}
        </p>
        {group.hits.map((hit) => (
          <ResultRow
            hit={hit}
            id={optionId(hit)}
            key={hit.id}
            selected={hit === active}
            onHover={() => setActiveIndex(flat.indexOf(hit))}
            onPick={() => onOpenChange(false)}
          />
        ))}
      </div>
    ))}
  </div>
);
