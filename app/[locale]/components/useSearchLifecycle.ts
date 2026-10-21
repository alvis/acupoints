import { useEffect } from 'react';

import { NO_PAGEFIND } from './searchCommandData';

import type { Dispatch, SetStateAction } from 'react';

import type { SearchCommandProps } from './SearchCommand';
import type { PagefindState } from './searchCommandData';
import type { SearchCommandState } from './useSearchCommand';

const INPUT_FOCUS_DELAY_MS = 20;
const FOCUSABLE = 'input, button:not([tabindex="-1"]), [href]:not([tabindex="-1"])';

type LifecycleProps = Pick<SearchCommandProps, 'open' | 'onOpenChange'> &
  Pick<SearchCommandState, 'inputRef' | 'panelRef' | 'setQuery' | 'setActiveIndex'> & {
    setPagefind: Dispatch<SetStateAction<PagefindState>>;
  };
/**
 * restores opener focus and traps modal keyboard navigation.
 * @param props visibility, element references, and state reset actions
 */
export function useSearchLifecycle(props: LifecycleProps): void {
  const { open, onOpenChange, inputRef, panelRef, setQuery, setPagefind, setActiveIndex } = props;
  // Focus the input on open; restore focus to the opener on close.
  useEffect(() => {
    if (!open) {
      setQuery('');
      setPagefind(NO_PAGEFIND);
      setActiveIndex(0);

      return;
    }
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const id = window.setTimeout(() => inputRef.current?.focus(), INPUT_FOCUS_DELAY_MS);

    return () => {
      window.clearTimeout(id);
      if (opener?.isConnected) {
        opener.focus();
      }
    };
  }, [open]);

  // Escape closes; Tab is trapped in the panel even when focus has fallen to
  // <body> (e.g. after a click on a non-focusable part of the window).
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent): void => {
      if (event.isComposing) {
        return;
      }
      if (event.key === 'Escape') {
        onOpenChange(false);
      } else if (event.key === 'Tab') {
        trapTab(event, panelRef.current);
      }
    };
    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);
}

/**
 * Wraps Tab and Shift+Tab around the panel's focusables, pulling stray focus back inside.
 * @param event Tab key event inside the search dialog
 * @param panel dialog panel whose focusable elements form the Tab loop
 */
function trapTab(event: KeyboardEvent, panel: HTMLElement | null): void {
  if (!panel) {
    return;
  }
  const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
  const first = focusables.at(0);
  const last = focusables.at(-1);
  if (!first || !last) {
    return;
  }
  const current = document.activeElement;
  const outside = !(current instanceof Node) || !panel.contains(current);
  if (outside || (event.shiftKey && current === first) || (!event.shiftKey && current === last)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  }
}
