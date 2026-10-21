import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import type { KeyboardEvent } from 'react';

import type { Hit } from './searchCommandData';
import type { SearchCommandState } from './useSearchCommand';

const COMPOSITION_KEY_CODE = 229;
type SelectionProps = Pick<SearchCommandState, 'active' | 'flat' | 'listId' | 'setActiveIndex'> & {
  onOpenChange: (open: boolean) => void;
};

/**
 * keeps the active row visible and handles arrows and Enter outside IME composition.
 * @param props current results, selection, and visibility action
 * @returns the input's keyboard navigation handler
 */
export function useSearchSelection(props: SelectionProps): SearchCommandState['onInputKeyDown'] {
  const { active, flat, listId, setActiveIndex, onOpenChange } = props;
  const router = useRouter();
  useEffect(() => {
    if (!active) {
      return;
    }
    document.getElementById(`${listId}-${active.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, listId]);

  const go = useCallback(
    (hit: Hit) => {
      onOpenChange(false);
      router.push(hit.href);
    },
    [onOpenChange, router],
  );

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    // Leave arrows and Enter to the IME while a Han candidate is being chosen
    // (keyCode 229 covers Safari, which ends composition before this keydown).
    if (event.nativeEvent.isComposing || event.keyCode === COMPOSITION_KEY_CODE) {
      return;
    }
    if (flat.length === 0) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((i) => (Math.min(i, flat.length - 1) + step + flat.length) % flat.length);
    } else if (event.key === 'Enter' && active) {
      event.preventDefault();
      go(active);
    }
  };

  return onInputKeyDown;
}
