import { useEffect } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import type { FaqEntry } from './FaqAccordion';

/**
 * synchronize the open question with an incoming URL fragment.
 * @param props fragment-linked questions and accordion setters
 * @param props.entries questions and their published answers
 * @param props.setGroup setter that reveals the question’s group
 * @param props.setOpen setter that opens the question identified by the fragment
 */
export const useFaqFragment = ({
  entries,
  setGroup,
  setOpen,
}: {
  entries: readonly FaqEntry[];
  setGroup: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<string | null>>;
}): void => {
  useEffect(() => {
    const fromHash = (): void => {
      const id = window.location.hash.slice(1);
      if (entries.some((entry) => entry.id === id)) {
        setGroup('all');
        setOpen(id);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);

    return () => window.removeEventListener('hashchange', fromHash);
  }, [entries]);
};
