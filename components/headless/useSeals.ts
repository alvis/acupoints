'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { localDayKey, sealStreak } from '@/utilities/seals/sealDays';
import {
  clearSeals,
  readSealRecord,
  readServerSealRecord,
  subscribeSeals,
  toggleSeal,
} from '@/utilities/seals/sealStore';

/** Snapshot plus the actions a component needs. */
export interface SealsApi {
  /** Sealed point codes, uppercase, in the order they were sealed. */
  codes: readonly string[];
  /** Local `YYYY-MM-DD` day each code was sealed; seals older than dating are absent. */
  days: Readonly<Record<string, string>>;
  /** This browser's local calendar day, `YYYY-MM-DD`; empty during SSR. */
  today: string;
  /** Consecutive local days with at least one seal, ending today or yesterday. */
  streak: number;
  /** Whether storage has been read on this client (false during SSR). */
  ready: boolean;
  has(code: string): boolean;
  toggle(code: string): void;
  clear(): void;
}

const readReady = (): boolean => true;
const readServerReady = (): boolean => false;
// A string snapshot compares by value, so it only re-renders when the day turns
// over and something else (a seal, another tab) asks the store again.
const readToday = (): string => localDayKey(new Date());
const readServerToday = (): string => '';

/**
 * Subscribe to this browser's seals (印譜); re-renders when any tab changes them.
 * @returns the sealed codes, reading dates, readiness state, and stamp controls.
 */
export function useSeals(): SealsApi {
  const { codes, days } = useSyncExternalStore(
    subscribeSeals,
    readSealRecord,
    readServerSealRecord,
  );
  const ready = useSyncExternalStore(subscribeSeals, readReady, readServerReady);
  const today = useSyncExternalStore(subscribeSeals, readToday, readServerToday);
  const has = useCallback((code: string) => codes.includes(code.toUpperCase()), [codes]);
  const streak = useMemo(() => (today ? sealStreak(Object.values(days), today) : 0), [days, today]);
  const toggle = useCallback((code: string) => toggleSeal(code), []);

  return useMemo(
    () => ({ codes, days, today, streak, ready, has, toggle, clear: clearSeals }),
    [codes, days, today, streak, ready, has, toggle],
  );
}
