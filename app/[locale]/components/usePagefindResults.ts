import { useEffect } from 'react';

import { search as pagefindSearch } from '@/utilities/pagefind';

import type { Dispatch, SetStateAction } from 'react';

import type { Locale } from '@/utilities/routes';

import type { PagefindState } from './searchCommandData';

/**
 * publishes full-text matches only while their query is still current.
 * @param query current untrimmed search text
 * @param locale edition whose index is searched
 * @param setPagefind stores the results with the query they answer
 */
export function usePagefindResults(
  query: string,
  locale: Locale,
  setPagefind: Dispatch<SetStateAction<PagefindState>>,
): void {
  useEffect(() => {
    let alive = true;
    if (!query.trim()) {
      return;
    }
    pagefindSearch(query, locale)
      .then((hits) => {
        if (alive) {
          setPagefind({ query, hits });
        }
      })
      .catch(() => {
        if (alive) {
          setPagefind({ query, hits: [] });
        }
      });

    return () => {
      alive = false;
    };
  }, [query, locale]);
}
