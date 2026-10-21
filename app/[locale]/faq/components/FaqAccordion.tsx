'use client';

import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/utilities/cn';

import { useFaqFragment } from './useFaqFragment';

import type { FC } from 'react';

import type { InlineSegment } from './inlineLinks';

/** One question as the accordion renders it. */
export type FaqEntry = {
  /** Stable anchor id, `faq-q-<n>`. */
  id: string;
  /** Han ordinal label, 問一 … 問十. */
  ordinal: string;
  question: string;
  answer: readonly InlineSegment[];
  followThrough?: readonly InlineSegment[];
  /** Key of the rail group the question is filed under. */
  group: string;
  /** Han glyph of that group (詞, 按, 慎), boxed beside the question. */
  groupHan: string;
  /** The page that carries the answer further. */
  more: { href: string; label: string };
};

/** One button of the group rail, with its resolved heading and count. */
export type FaqGroupLabel = {
  /** Group key; `all` shows every question. */
  key: string;
  /** Han glyph of the group (全, 詞, 按, 慎). */
  han: string;
  label: string;
  /** List heading while the group is chosen. */
  title: string;
  /** Count line while the group is chosen. */
  count: string;
};

/** Resolved interface strings for the accordion. */
export type FaqAccordionLabels = {
  railCap: string;
  railNote: string;
  /** Rail groups in order, `all` first. */
  groups: readonly FaqGroupLabel[];
};

/** Props for {@link FaqAccordion}. */
export type FaqAccordionProps = {
  entries: readonly FaqEntry[];
  labels: FaqAccordionLabels;
  /** True on Chinese pages (interface strings in the Han face). */
  zh: boolean;
};

const ALL = 'all';

/**
 * One-open-at-a-time accordion over the FAQ (board WbFaq), filtered by a rail
 * of question groups. Every answer is in the server HTML (folded or filtered
 * ones are `hidden`), so search indexing and no-JS reading lose only the
 * folding. A `#faq-q-<n>` fragment opens that question on arrival.
 * @param props published questions, group labels, and language styling
 * @param props.entries questions and their published answers
 * @param props.labels localized interface labels
 * @param props.zh whether to use the Han face for Chinese interface strings
 * @returns the question-group rail and single-open answer list
 */
export const FaqAccordion: FC<FaqAccordionProps> = ({ entries, labels, zh }) => {
  const [open, setOpen] = useState<string | null>(entries[0]?.id ?? null);
  const [group, setGroup] = useState(ALL);
  const current = labels.groups.find((g) => g.key === group) ?? labels.groups.at(0);

  useFaqFragment({ entries, setGroup, setOpen });

  const pick = (key: string): void => {
    setGroup(key);
    setOpen(entries.find((entry) => key === ALL || entry.group === key)?.id ?? null);
  };

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <span className={cn('cap', zh && 'tc')} id="faq-rail">
          {labels.railCap}
        </span>
        <div
          aria-labelledby="faq-rail"
          className="
            r1 grid grid-cols-2 p-[1.5px]
            sm:grid-cols-4
            lg:flex lg:flex-col
          "
          role="group">
          {labels.groups.map((g) => {
            const on = g.key === current?.key;
            const n =
              g.key === ALL ? entries.length : entries.filter((e) => e.group === g.key).length;

            return (
              <button
                aria-pressed={on}
                className={cn(
                  `
                    grid grid-cols-[30px_minmax(0,1fr)_auto] items-center
                    gap-2.5 px-3.5 py-3 text-left text-[1.06rem]
                    lg:grid-cols-[34px_minmax(0,1fr)_auto] lg:text-[1.13rem]
                  `,
                  on
                    ? `
                      bg-ink text-paper
                      shadow-[inset_4px_0_0_var(--color-cinnabar)]
                    `
                    : `
                      bg-transparent text-ink
                      shadow-[inset_0_-1px_0_var(--color-rule)]
                      hover:bg-paper-raised
                    `,
                )}
                key={g.key}
                type="button"
                onClick={() => pick(g.key)}>
                <span aria-hidden="true" className="
                  tc text-[1.25rem] font-black
                ">
                  {g.han}
                </span>
                <span className={cn(zh && 'tc')}>{g.label}</span>
                <span className="pm text-[0.75rem]">{n}</span>
              </button>
            );
          })}
        </div>
        <span
          className={cn(
            `pt-1.5 text-[0.88rem] leading-[1.45] text-ink-soft`,
            zh &&
              `tc`,
          )}>
          {labels.railNote}
        </span>
      </div>

      <div className="min-w-0">
        <div
          className="
            flex items-baseline gap-3.5 border-b-[2.5px] border-ink pb-3
          ">
          <h2
            aria-live="polite"
            className={cn(
              `
                m-0 text-[1.6rem] font-medium
                sm:text-[1.9rem]
              `,
              zh && `tc`,
            )}>
            {current?.title}
          </h2>
          <span className="flex-1" />
          <span className={cn(`text-[0.94rem] text-ink-soft`, zh && `tc`)}>{current?.count}</span>
        </div>
        <div className="border-b border-ink">
          {entries.map((entry) => (
            <FaqItem
              entry={entry}
              expanded={open === entry.id}
              key={entry.id}
              shown={group === ALL || entry.group === group}
              zh={zh}
              onToggle={() => setOpen((id) => (id === entry.id ? null : entry.id))}
            />
          ))}
        </div>
      </div>
    </>
  );
};

type FaqItemProps = {
  entry: FaqEntry;
  /** False while another group is chosen. */
  shown: boolean;
  expanded: boolean;
  zh: boolean;
  onToggle: () => void;
};

const FaqItem: FC<FaqItemProps> = ({ entry, shown, expanded, zh, onToggle }) => {
  const panelId = `${entry.id}-answer`;

  return (
    <div className="border-t border-rule" hidden={!shown}>
      <h3 className="m-0 font-normal">
        <button
          aria-controls={panelId}
          aria-expanded={expanded}
          className={cn(
            `
              grid w-full scroll-mt-24 grid-cols-[52px_minmax(0,1fr)_28px]
              items-center gap-3 py-5 pr-2 pl-1 text-left text-[1.2rem]
              leading-[1.3] text-ink
              sm:grid-cols-[64px_minmax(0,1fr)_28px_30px] sm:gap-3.5
              sm:text-[1.44rem]
            `,
            expanded
              ? `bg-paper-raised shadow-[inset_4px_0_0_var(--color-cinnabar)]`
              : `
                bg-transparent
                hover:bg-paper-raised
              `,
          )}
          id={entry.id}
          type="button"
          onClick={onToggle}>
          <span
            className="
              tc red pl-2.5 text-[1rem] font-bold
              sm:pl-3.5 sm:text-[1.06rem]
            "
            lang="zh-Hant">
            {entry.ordinal}
          </span>
          <span className={cn(zh && 'tc')}>{entry.question}</span>
          <span
            aria-hidden="true"
            className="
              tc hidden size-7 place-items-center text-[0.88rem] font-bold
              shadow-rest
              sm:grid
            ">
            {entry.groupHan}
          </span>
          <span aria-hidden="true" className="pm text-center text-2xl">
            {expanded ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        aria-labelledby={entry.id}
        className={cn(
          `
            flex-col gap-3 bg-paper-raised pt-1 pr-5 pb-[26px] pl-[64px]
            sm:pr-10 sm:pl-[82px]
          `,
          expanded ? 'flex' : 'hidden',
        )}
        hidden={!expanded}
        id={panelId}
        role="region">
        <p
          className={cn(
            `
              m-0 text-[1.1rem] leading-[1.55]
              sm:text-[1.19rem]
            `,
            zh && `tc`,
          )}>
          <Segments segments={entry.answer} />
        </p>
        {entry.followThrough ? (
          <p
            className={cn(
              `
                m-0 text-[1.02rem] leading-[1.55] text-ink-soft
                sm:text-[1.06rem]
              `,
              zh && 'tc',
            )}>
            <Segments segments={entry.followThrough} />
          </p>
        ) : null}
        <Link
          className={cn(
            `
              self-start text-[1rem] font-medium
              sm:text-[1.06rem]
            `,
            zh && `tc`,
          )}
          href={entry.more.href}>
          {entry.more.label} →
        </Link>
      </div>
    </div>
  );
};

type SegmentsProps = { segments: readonly InlineSegment[] };

const Segments: FC<SegmentsProps> = ({ segments }) => (
  <>
    {segments.map((segment) =>
      segment.kind === 'link' ? (
        <Link href={segment.href} key={segment.at}>
          {segment.text}
        </Link>
      ) : (
        <span key={segment.at}>{segment.text}</span>
      ),
    )}
  </>
);
