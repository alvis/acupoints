'use client';

import { useId, useMemo, useRef, useState } from 'react';

import { COPY, NO_PAGEFIND } from './searchCommandData';
import { buildLocalIndex, groupHits } from './searchCommandIndex';
import { usePagefindResults } from './usePagefindResults';
import { useSearchLifecycle } from './useSearchLifecycle';
import { useSearchSelection } from './useSearchSelection';

import type { RefObject, Dispatch, SetStateAction, KeyboardEvent } from 'react';

import type { SearchCommandProps } from './SearchCommand';
import type { Copy, IndexEntry, Hit, PagefindState } from './searchCommandData';
import type { HitGroup } from './searchCommandIndex';

export interface SearchCommandState {
  copy: Copy;
  listId: string;
  titleId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  localIndex: IndexEntry[];
  flat: Hit[];
  active: Hit | undefined;
  optionId: (hit: Hit) => string;
  groups: HitGroup[];
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * query, focus restoration, and keyboard selection for the modal index.
 * @param props overlay visibility, visibility action, and search edition
 * @param props.open whether the search overlay is visible
 * @param props.onOpenChange updates search visibility
 * @param props.locale edition used for labels and links
 * @returns live query state and the input navigation actions
 */
export function useSearchCommand({
  open,
  onOpenChange,
  locale,
}: SearchCommandProps): SearchCommandState {
  const copy = COPY[locale];
  const listId = useId();
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  // Full-text hits remember the query they answer, so a slower earlier search never shows under a newer query.
  const [pagefind, setPagefind] = useState<PagefindState>(NO_PAGEFIND);
  const [activeIndex, setActiveIndex] = useState(0);

  useSearchLifecycle({
    open,
    onOpenChange,
    inputRef,
    panelRef,
    setQuery,
    setPagefind,
    setActiveIndex,
  });

  const localIndex = useMemo(() => buildLocalIndex(locale, copy), [locale, copy]);

  usePagefindResults(query, locale, setPagefind);

  const groups = useMemo(
    () => groupHits(localIndex, pagefind.query === query ? pagefind.hits : [], query),
    [localIndex, pagefind, query],
  );
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);
  const active = flat.at(Math.min(activeIndex, flat.length - 1));
  const optionId = (hit: Hit): string => `${listId}-${hit.id}`;

  const onInputKeyDown = useSearchSelection({ active, flat, listId, setActiveIndex, onOpenChange });

  return {
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
  };
}
