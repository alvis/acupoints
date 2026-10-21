import type { FC } from 'react';

import type { SealBookProps } from './SealBook';

type SealBookStatsProps = Pick<SealBookProps, 'text' | 'more' | 'total'> & {
  sealed: readonly string[];
  streak: number;
  complete: readonly unknown[];
  volumes: readonly unknown[];
};
const STAT = 'm-0 whitespace-nowrap text-[2.25rem] font-medium sm:text-[2.75rem]';
const STAT_UNIT = 'text-lg text-[color:var(--color-ink-soft)] sm:text-xl';

/**
 * live leaf, streak, and completed-volume counts beside the hero.
 * @param props sealed leaf codes, completed volumes, streak, and localized labels
 * @param props.text localized seal-book labels
 * @param props.more localized streak and sharing labels
 * @param props.total number of leaves in the registry
 * @param props.sealed codes of leaves sealed in this browser
 * @param props.streak current consecutive reading days
 * @param props.complete volumes whose leaves are all sealed
 * @param props.volumes ordered channel volumes
 */
export const SealBookStats: FC<Readonly<SealBookStatsProps>> = ({
  text,
  more,
  total,
  sealed,
  streak,
  complete,
  volumes,
}) => (
  <dl
    className="
      m-0 grid shrink-0 grid-flow-col grid-rows-[auto_auto] justify-start
      gap-x-6
      sm:gap-x-9
      lg:mb-2
    ">
    <dt className="cap">{text.statLeaves}</dt>
    <dd className={STAT}>
      {sealed.length}
      <span className={STAT_UNIT}> / {total}</span>
    </dd>
    <dt className="cap">{more.statStreak}</dt>
    <dd className={STAT}>
      {streak}
      <span className={STAT_UNIT}>{streak === 1 ? more.streakDay : more.streakDays}</span>
    </dd>
    <dt className="cap">{text.statVolumes}</dt>
    <dd className={STAT}>
      {complete.length}
      <span className={STAT_UNIT}> / {volumes.length}</span>
    </dd>
  </dl>
);
