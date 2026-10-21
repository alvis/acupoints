/**
 * My seals (印譜): the reader's own record of leaves they have finished, and
 * the local day each was sealed. Stored only in this browser (localStorage),
 * never sent anywhere, and shared across locales so switching language keeps
 * every seal.
 *
 * Two keys, so the original record never changes shape:
 * - `acupoints-seals` stays the ordered list of sealed codes it always was;
 * - `acupoints-seal-days` maps each code to the `YYYY-MM-DD` day it was sealed.
 * Seals made before dates were kept simply have no day: they still count as
 * sealed, just not towards the streak. A day whose code is no longer sealed
 * is ignored on read and dropped on the next write.
 *
 * A tiny external store: `useSeals()` (components/headless) subscribes to it,
 * and the `storage` event keeps tabs in sync.
 */

import { isDayKey, localDayKey } from './sealDays';

/** Sealed codes and the day each was sealed. */
export interface SealRecord {
  /** Sealed point codes, uppercase, in the order they were sealed. */
  codes: readonly string[];
  /** Local `YYYY-MM-DD` day each code was sealed; undated seals are absent. */
  days: Readonly<Record<string, string>>;
}

/** Total leaves in the book. */
export const TOTAL_LEAVES = 361;

export const SEALS_STORAGE_KEY = 'acupoints-seals';
export const SEAL_DAYS_STORAGE_KEY = 'acupoints-seal-days';

const EMPTY_CODES: readonly string[] = Object.freeze([]);
const EMPTY_DAYS: Readonly<Record<string, string>> = Object.freeze({});
const EMPTY: SealRecord = Object.freeze({ codes: EMPTY_CODES, days: EMPTY_DAYS });
const listeners = new Set<() => void>();
let cache: SealRecord | null = null;

/**
 * Subscribe to changes from this tab and others; returns the unsubscribe.
 * @param listener subscriber notified after a change.
 * @returns a function that removes the subscriber and storage listener.
 */
export function subscribeSeals(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent): void => {
    // `key` is null when another tab clears all of storage.
    if (
      event.key !== null &&
      event.key !== SEALS_STORAGE_KEY &&
      event.key !== SEAL_DAYS_STORAGE_KEY
    ) {
      return;
    }
    cache = null;
    listener();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Sealed codes with their days, read once and cached until the next change.
 * @returns the cached immutable codes and their recorded reading dates.
 */
export function readSealRecord(): SealRecord {
  if (cache) {
    return cache;
  }
  const codes = parseCodes(readRaw(SEALS_STORAGE_KEY));
  cache = Object.freeze({ codes, days: parseDays(readRaw(SEAL_DAYS_STORAGE_KEY), codes) });

  return cache;
}

/**
 * Server render has no storage: nothing is sealed yet.
 * @returns the empty seal record used during server rendering.
 */
export function readServerSealRecord(): SealRecord {
  return EMPTY;
}

/**
 * Seal the leaf on today's local date, or lift the seal when it is already there.
 * @param code catalogue point identifier.
 * @param now time of the stamp.
 */
export function toggleSeal(code: string, now: Date = new Date()): void {
  const key = code.toUpperCase();
  const { codes, days } = readSealRecord();
  if (codes.includes(key)) {
    write(
      codes.filter((c) => c !== key),
      Object.fromEntries(Object.entries(days).filter(([c]) => c !== key)),
    );
  } else {
    write([...codes, key], { ...days, [key]: localDayKey(now) });
  }
}

/** Lift every seal. */
export function clearSeals(): void {
  write([], {});
}

/**
 * read browser storage while tolerating unavailable persistence.
 * @param key the browser storage key.
 * @returns the stored string, or null when browser storage is unavailable.
 */
function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * decode stored JSON while tolerating invalid records.
 * @param raw the serialized JSON read from browser storage.
 * @returns the decoded JSON value, or null for absent or malformed JSON.
 */
function parseJson(raw: string | null): unknown {
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * restore an immutable list of stored point codes.
 * @param raw the serialized JSON read from browser storage.
 * @returns the immutable string codes retained from stored JSON.
 */
function parseCodes(raw: string | null): readonly string[] {
  const value = parseJson(raw);
  if (!Array.isArray(value)) {
    return EMPTY_CODES;
  }

  return Object.freeze(value.filter((v): v is string => typeof v === 'string'));
}

/**
 * Days for codes that are still sealed; anything malformed reads as undated.
 * @param raw the serialized JSON read from browser storage.
 * @param codes sealed point identifiers.
 * @returns the valid reading dates belonging to currently sealed codes.
 */
function parseDays(raw: string | null, codes: readonly string[]): Readonly<Record<string, string>> {
  const value = parseJson(raw);
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return EMPTY_DAYS;
  }
  const entries = Object.entries(value).filter(
    (entry): entry is [string, string] => codes.includes(entry[0]) && isDayKey(entry[1]),
  );

  return Object.freeze(Object.fromEntries(entries));
}

/**
 * publish and persist an immutable seal snapshot.
 * @param codes sealed point identifiers.
 * @param days calendar day recorded for each point.
 */
function write(codes: readonly string[], days: Readonly<Record<string, string>>): void {
  cache = Object.freeze({ codes: Object.freeze([...codes]), days: Object.freeze({ ...days }) });
  try {
    // Days first: a tab that reads between the two writes sees a day without
    // its code, which parseDays ignores, never a seal that lost its day.
    window.localStorage.setItem(SEAL_DAYS_STORAGE_KEY, JSON.stringify(cache.days));
    window.localStorage.setItem(SEALS_STORAGE_KEY, JSON.stringify(cache.codes));
  } catch {
    /* storage unavailable — the seal still shows for this visit */
  }
  for (const listener of listeners) {
    listener();
  }
}
