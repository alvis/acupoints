import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { KIND_HAN } from './searchCommandData';

import type { FC } from 'react';

import type { Hit } from './searchCommandData';

type ResultRowProps = {
  hit: Hit;
  id: string;
  selected: boolean;
  onHover: () => void;
  onPick: () => void;
};

/**
 * One listbox option: Han type box, Han name, English, mono code, right-aligned hint.
 * @param props result, option identity, selection state, and pointer actions
 * @param props.hit search result represented by this option
 * @param props.id option identifier referenced by the combobox
 * @param props.selected whether this option is the keyboard selection
 * @param props.onHover action that selects this option on pointer movement
 * @param props.onPick action that closes the overlay when this result is opened
 */
export const ResultRow: FC<ResultRowProps> = ({ hit, id, selected, onHover, onPick }) => (
  // Options stay out of the Tab order; the combobox input drives them.
  <Link
    aria-selected={selected}
    className={cn(
      `
        flex min-h-[54px] items-center gap-3.5 border-b border-rule px-4 py-2
        text-ink no-underline
        sm:px-[22px]
      `,
      selected && `bg-paper-raised shadow-[inset_4px_0_0_var(--color-cinnabar)]`,
    )}
    href={hit.href}
    id={id}
    role="option"
    tabIndex={-1}
    onClick={onPick}
    onMouseMove={onHover}>
    <span
      aria-hidden="true"
      className="
        tc grid size-[30px] shrink-0 place-items-center text-[15px] font-bold
        shadow-rest
      "
      lang="zh-Hant">
      {KIND_HAN[hit.kind]}
    </span>
    {hit.zh ? (
      <span className="tc min-w-[74px] shrink-0 text-[21px] font-bold" lang="zh-Hant">
        {hit.zh}
      </span>
    ) : null}
    <span className="min-w-0 shrink truncate text-[19px]">{hit.title}</span>
    {hit.code ? <span className="pm shrink-0 text-[12px] text-ink-soft">{hit.code}</span> : null}
    {hit.excerpt ? (
      <span
        className="
          hidden min-w-0 flex-1 truncate text-right text-[15px] text-ink-soft
          sm:block
        "
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Pagefind excerpt includes <mark>
        dangerouslySetInnerHTML={hit.excerpt}
      />
    ) : (
      <span
        className="
          hidden min-w-0 flex-1 truncate text-right text-[15px] text-ink-soft
          sm:block
        ">
        {hit.hint}
      </span>
    )}
  </Link>
);
