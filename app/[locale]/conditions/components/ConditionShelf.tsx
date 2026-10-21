'use client';

import { useMemo, useState } from 'react';

import { fill } from '@/features/conditions/format';
import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

/** One shelf of the index: a body area and its condition cards. */
export type ShelfGroup = {
  key: string;
  /** Han word before the heading; omitted where the title is already Han. */
  han?: string;
  title: string;
  /** Number of conditions on the shelf. */
  size: number;
  /** "2 sets" caption. */
  sizeLabel: string;
  /** Columns the shelf spans in the three-column grid. */
  span: 1 | 2;
  /** Server-rendered cards. */
  cards: ReactNode;
};

/** Props for {@link ConditionShelf}. */
export type ConditionShelfProps = {
  groups: readonly ShelfGroup[];
  /** Accessible name of the shelf section. */
  label: string;
  /** "Show" label before the chips. */
  show: string;
  /** "All" chip text. */
  all: string;
  /** Count line with every shelf shown: `{n}`. */
  countAll: string;
  /** Count line with one shelf shown: `{n}` of `{total}`. */
  countSome: string;
};

const ALL = 'all';

const SHELF_SPAN: Record<1 | 2, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
};

const CARD_GRID: Record<1 | 2, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
};

/** Columns of the wide-screen board the shelves fill, band by band. */
const BOARD_COLUMNS = 3;

/**
 * Rows a shelf spans on the wide-screen board: its heading plus the card rows
 * of the tallest shelf in its band, so the bands' cards share row tracks.
 */
const SHELF_ROWS: Record<number, string> = {
  2: 'lg:row-span-2',
  3: 'lg:row-span-3',
  4: 'lg:row-span-4',
  5: 'lg:row-span-5',
  6: 'lg:row-span-6',
};

type ChipProps = {
  on: boolean;
  han?: string;
  label: string;
  n: number;
  onPick: () => void;
};

const Chip: FC<ChipProps> = ({ on, han, label, n, onPick }) => (
  <button
    aria-pressed={on}
    className={cn(
      `
        flex h-[42px] cursor-pointer items-baseline gap-2 self-center border-0
        px-4 pt-2.5 text-[1.0625rem] transition-colors
        motion-reduce:transition-none
      `,
      on
        ? `bg-ink text-paper shadow-[inset_0_-3px_0_var(--color-cinnabar)]`
        : `
          bg-transparent text-ink shadow-rest
          hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
        `,
    )}
    type="button"
    onClick={onPick}>
    {han ? (
      <span aria-hidden="true" className="tc font-bold">
        {han}
      </span>
    ) : null}
    <span className={cn(!han && 'tc font-bold')}>{label}</span>
    <span className="pm text-xs">{n}</span>
  </button>
);

/**
 * The index shelves with their filter chips. Every shelf renders on the
 * server; the chips only hide shelves, so the page reads in full without
 * script. The pressed chip is marked by `aria-pressed` and by its inked fill,
 * and the count line is announced politely.
 * @param props condition shelves and localized filter labels
 * @param props.groups shelves of condition cards grouped by body area
 * @param props.label accessible label for the navigation or progress indicator
 * @param props.show label introducing the shelf filters
 * @param props.all label for the filter that shows every shelf
 * @param props.countAll count template when all conditions are visible
 * @param props.countSome count template when a shelf filter is selected
 * @returns the filterable shelves and matching condition count
 */
export const ConditionShelf: FC<ConditionShelfProps> = ({
  groups,
  label,
  show,
  all,
  countAll,
  countSome,
}) => {
  const [selected, setSelected] = useState(ALL);
  const total = useMemo(() => groups.reduce((sum, group) => sum + group.size, 0), [groups]);
  const shown =
    selected === ALL ? total : (groups.find((group) => group.key === selected)?.size ?? total);
  const count =
    shown === total ? fill(countAll, { n: total }) : fill(countSome, { n: shown, total });
  const rows = bandRows(groups.filter((group) => selected === ALL || selected === group.key));

  return (
    <section aria-label={label}>
      <div className="mb-[26px] flex flex-wrap items-center gap-3">
        <span className="cap mr-1.5" id="shelf-filter-label">
          {show}
        </span>
        <div aria-labelledby="shelf-filter-label" className="
          flex flex-wrap gap-2.5
        " role="group">
          <Chip
            han="全"
            label={all}
            n={total}
            on={selected === ALL}
            onPick={() => setSelected(ALL)}
          />
          {groups.map((group) => (
            <Chip
              han={group.han}
              key={group.key}
              label={group.title}
              n={group.size}
              on={selected === group.key}
              onPick={() => setSelected(group.key)}
            />
          ))}
        </div>
        <span className="flex-1" />
        <span aria-live="polite" className="text-base text-ink-soft">
          {count}
        </span>
      </div>
      {/* on wide screens every shelf subgrids the board, so a card lines up with its neighbours across shelves */}
      <div
        className="
          grid grid-cols-1 gap-x-8 gap-y-11
          lg:-mt-5 lg:grid-cols-3 lg:gap-y-6
        ">
        {groups.map((group) => (
          <section
            aria-labelledby={`shelf-${group.key}`}
            className={cn(
              `
                min-w-0
                lg:grid lg:grid-cols-subgrid lg:grid-rows-subgrid
              `,
              SHELF_SPAN[group.span],
              SHELF_ROWS[(rows.get(group.key) ?? 1) + 1],
            )}
            hidden={selected !== ALL && selected !== group.key}
            key={group.key}>
            <div
              className="
                mb-4 flex items-baseline gap-3.5 border-b-[2.5px] border-ink
                px-0.5 pb-3
                lg:col-span-full lg:mt-5 lg:-mb-2
              ">
              {group.han ? (
                <span aria-hidden="true" className="
                  tc text-[1.625rem] font-black
                ">
                  {group.han}
                </span>
              ) : null}
              <h2
                className={cn('m-0 text-2xl font-medium', !group.han && `
                  tc font-black
                `)}
                id={`shelf-${group.key}`}>
                {group.title}
              </h2>
              <span className="flex-1" />
              <span className="cap">{group.sizeLabel}</span>
            </div>
            <div
              className={cn(
                `
                  grid gap-6
                  lg:contents
                `,
                CARD_GRID[group.span],
              )}>
              {group.cards}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

/**
 * card rows each shown shelf spans on the wide-screen board, padded to the
 * tallest shelf in its band so the cards of neighbouring shelves align
 * @param groups shelves in board order, hidden ones left out
 * @returns card rows by shelf key
 */
function bandRows(groups: readonly ShelfGroup[]): Map<string, number> {
  const bands: ShelfGroup[][] = [];
  let used = BOARD_COLUMNS;
  for (const group of groups) {
    if (used + group.span > BOARD_COLUMNS) {
      bands.push([]);
      used = 0;
    }
    bands.at(-1)?.push(group);
    used += group.span;
  }

  return new Map(
    bands.flatMap((band) => {
      const tallest = Math.max(...band.map((group) => Math.ceil(group.size / group.span)));

      return band.map((group) => [group.key, tallest] as const);
    }),
  );
}
