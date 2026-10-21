'use client';

import { useMemo, useState } from 'react';

import { channelSelectionContext as ChannelSelectionContext } from '../hooks/useChannelSelection';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link ChannelSelection}. */
export type ChannelSelectionProps = PropsWithChildren<{
  /** Slug picked on first render. */
  initial: string;
}>;

/**
 * Holds the picked volume for the chart and the pairing diagram below it.
 * @param props the initial channel and selection-aware children
 * @param props.initial the channel slug selected on first render
 * @param props.children the channel chart and pairing content sharing selection state
 * @returns the children wrapped in shared channel selection state
 */
export const ChannelSelection: FC<ChannelSelectionProps> = ({ initial, children }) => {
  const [selected, select] = useState(initial);
  const value = useMemo(() => ({ selected, select }), [selected]);

  return <ChannelSelectionContext value={value}>{children}</ChannelSelectionContext>;
};
