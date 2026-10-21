'use client';

import { createContext, useContext } from 'react';

/** The volume picked on the channels chart, shared by the chart and the pairing diagram. */
export interface ChannelSelectionState {
  /** Slug of the picked channel. */
  selected: string;
  select: (slug: string) => void;
}

/** Context carrying the picked volume; provided by `ChannelSelection`. */
export const channelSelectionContext = createContext<ChannelSelectionState | null>(null);

/**
  Reads the picked volume; must sit inside `ChannelSelection`.
 * @returns the selected channel slug and selection callback
 */
export function useChannelSelection(): ChannelSelectionState {
  const state = useContext(channelSelectionContext);
  if (!state) {
    throw new Error('useChannelSelection must be used inside <ChannelSelection>.');
  }

  return state;
}
