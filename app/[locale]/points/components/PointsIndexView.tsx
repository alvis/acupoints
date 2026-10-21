'use client';

import { GroupList } from './GroupList';
import { PointsBrowseTabs } from './PointsBrowseTabs';
import { TABS, AzSection } from './PointsIndex';
import { PointsSearchRow } from './PointsSearchRow';
import { RegionFigure } from './RegionFigure';
import { VolumeRows } from './VolumeRows';

import type { ReactNode } from 'react';

import type { usePointsIndexModel } from './PointsIndex';

/** state and localized content for the PointsIndex layout */
export type PointsIndexViewModel = ReturnType<typeof usePointsIndexModel>;

/**
 * render searchable browsing panels and alphabetical leaf index
 * @param model query, tab focus, search matches, and grouped index entries
 * @returns the searchable browsing panels and alphabetical leaf index
 */
export const PointsIndexView = (model: Readonly<PointsIndexViewModel>): ReactNode => {
  const {
    text,
    tab,
    baseId,
    hanLang,
    leaves,
    matches,
    total,
    volumes,
    filterGroups,
    plates,
    conditions,
    showHan,
    figureBack,
    figureFront,
    regions,
    az,
  } = model;

  return (
    <>
      <PointsSearchRow model={model} />

      <PointsBrowseTabs model={model} />

      {TABS.map((key) => (
        <div
          aria-labelledby={`${baseId}-tab-${key}`}
          className="mt-9"
          hidden={tab !== key}
          id={`${baseId}-panel-${key}`}
          key={key}
          role="tabpanel">
          {tab === key && key !== 'az' ? (
            <div
              className="
                grid gap-10
                lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-[52px]
              ">
              {key === 'volume' ? (
                <VolumeRows
                  hanLang={hanLang}
                  leaves={leaves}
                  matches={matches}
                  text={text}
                  total={total}
                  volumes={volumes}
                />
              ) : (
                <GroupList
                  groups={filterGroups(key === 'region' ? plates : conditions)}
                  hanLang={hanLang}
                  heading={key === 'region' ? text.regionsHeading : text.conditionsHeading}
                  leaves={leaves}
                  openLabel={key === 'condition' ? text.conditionOpen : undefined}
                  sealedLabel={text.sealed}
                  showHan={showHan}
                />
              )}
              <div className="lg:self-start">
                <RegionFigure
                  back={figureBack}
                  front={figureFront}
                  hanLang={hanLang}
                  labels={regions}
                  showHan={showHan}
                  text={text}
                />
              </div>
            </div>
          ) : null}
          {tab === key && key === 'az' ? (
            <AzSection groups={filterGroups(az)} hanLang={hanLang} leaves={leaves} text={text} />
          ) : null}
        </div>
      ))}

      {tab === 'az' ? null : (
        <div className="mt-16">
          <AzSection groups={filterGroups(az)} hanLang={hanLang} leaves={leaves} text={text} />
        </div>
      )}
    </>
  );
};
