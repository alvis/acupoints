'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'acupoints:basics-read:v1';
/** Same-tab broadcast, since `storage` only fires in other tabs. */
const CHANGE_EVENT = 'acupoints:basics-read';

/** This tab's copy, so the seal still works for the visit when storage is blocked. */
let memory: string[] = [];

/** Read state for one basics article, shared by every island on the page. */
export type BasicsRead = {
  /** Whether the reader has sealed this article as read. */
  read: boolean;
  /** Seal or unseal the article. */
  toggle: () => void;
};

/**
 * Per-reader "marked as read" state for a basics article, kept in this
 * browser's storage. Storage can be missing or blocked (private windows,
 * previews), so every access is guarded: the seal then lasts for the visit only,
 * and the server render is always unread.
 * @param slug entry URL segment
 * @returns the article read state and a function that toggles it
 */
export function useBasicsRead(slug: string): BasicsRead {
  const read = useSyncExternalStore(
    subscribe,
    () => readSlugs().includes(slug),
    () => false,
  );
  const toggle = useCallback(() => {
    const slugs = readSlugs();
    writeSlugs(slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug]);
  }, [slug]);

  return { read, toggle };
}

/**
 * listen for read-state changes in this tab and other tabs
 * @param onChange notify subscribers after a change
 * @returns a function that removes both change listeners
 */
function subscribe(onChange: () => void): () => void {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * read the saved article seals with the tab cache as fallback
 * @returns article slugs marked read in storage, or the tab cache when storage is blocked
 */
function readSlugs(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');

    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return memory;
  }
}

/**
 * save the article seals and notify this tab
 * @param slugs article slugs marked as read
 */
function writeSlugs(slugs: string[]): void {
  memory = slugs;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage is unavailable; `memory` carries the seal for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
