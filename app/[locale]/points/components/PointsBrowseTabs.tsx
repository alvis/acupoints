'use client';

import { cn } from '@/utilities/cn';

import { TABS } from './PointsIndex';

import type { ReactNode } from 'react';

import type { PointsIndexViewModel } from './PointsIndexView';

/**
 * render keyboard-accessible browsing tabs
 * @param props browsing tab controls
 * @param props.model active tab, focus refs, keyboard handler, and localized labels
 * @returns the keyboard-accessible browsing tabs
 */
export const PointsBrowseTabs = ({
  model,
}: Readonly<{ model: PointsIndexViewModel }>): ReactNode => {
  const { text, tab, baseId, tabRefs, setTab, onTabKey, hanLang } = model;

  return (
    <div
      aria-label={text.tabsLabel}
      className="
        mt-6 flex overflow-x-auto border-b-[2.5px] border-ink
        lg:mt-[34px]
      "
      role="tablist">
      {TABS.map((key) => {
        const selected = tab === key;

        return (
          <button
            aria-controls={`${baseId}-panel-${key}`}
            aria-selected={selected}
            className={cn(
              `
                shrink-0 cursor-pointer border-0 px-4 py-3 text-base
                whitespace-nowrap
                sm:px-[22px] sm:text-[1.06rem]
              `,
              selected
                ? `bg-ink text-paper`
                : `
                  bg-transparent text-ink
                  hover:bg-paper-raised
                `,
            )}
            id={`${baseId}-tab-${key}`}
            key={key}
            ref={(node) => {
              tabRefs.current[key] = node;
            }}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
            onClick={() => setTab(key)}
            onKeyDown={onTabKey}>
            <span className="tc font-bold" lang={hanLang}>
              {text.tabs[key].han}
            </span>{' '}
            {text.tabs[key].label}
          </button>
        );
      })}
    </div>
  );
};
