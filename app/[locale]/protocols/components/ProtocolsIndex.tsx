import { loadProseRegistry } from '@/content/pages';
import { conditionSets } from '@/features/conditions/data';

import { protocolsIndexModel } from './protocolsIndexModel';
import { ProtocolsIndexView } from './ProtocolsIndexView';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link ProtocolsIndex}. */
export type ProtocolsIndexProps = {
  locale: Locale;
};

/**
 * The routines index: the 方箋 cartouche hero with the facts table, the
 * legend for reading a slip, each condition's written routine laid out as a
 * prescription slip (points in order, time, finding, where, how often) that
 * leads into its timed practice, and the safety cards that apply before any
 * routine.
 * @param props locale for resolving routine slips and safety advice
 * @param props.locale page language and writing system
 * @returns the routine slips index with its facts and safety advice
 */
export const ProtocolsIndex: FC<ProtocolsIndexProps> = async ({ locale }) => {
  const sets = conditionSets(locale, await loadProseRegistry()).filter(
    (set) => set.points.length > 0,
  );

  return <ProtocolsIndexView index={protocolsIndexModel(locale, sets)} locale={locale} />;
};
