import { NumberDisc } from '@/components/primitives/NumberDisc';
import { SectionHead } from '@/components/primitives/SectionHead';

import { PairingGrid } from './PairingGrid';

import type { FC } from 'react';

import type { PairingGridProps } from './PairingGrid';

/** One numbered note above the diagram. */
export type PairingNote = {
  title: string;
  body: string;
};

/** Props for {@link PairingSection}. */
export type PairingSectionProps = {
  /** Chinese title for the interior–exterior pairing */
  zh: string;
  title: string;
  /** "The one you picked is ringed in red." */
  aside: string;
  notes: readonly PairingNote[];
  grid: PairingGridProps;
};

/**
 * "How the channels pair": three numbered notes over the pairing diagram.
 * @param props the pairing heading, notes, and diagram
 * @param props.zh the Han title
 * @param props.title the section heading
 * @param props.aside the annotation beside the pairing heading
 * @param props.notes the three explanations of channel pairing
 * @param props.grid the pairing diagram labels and channel entries
 * @returns the pairing heading, three explanatory notes, and diagram
 */
export const PairingSection: FC<PairingSectionProps> = ({ zh, title, aside, notes, grid }) => (
  <section aria-labelledby="pairing" className="mt-16">
    <SectionHead
      aside={<span className="red text-base italic">{aside}</span>}
      className="mb-[26px]"
      id="pairing"
      title={title}
      zh={zh}
    />
    <ol
      className="
        m-0 mb-[26px] grid list-none gap-8 border-b border-rule p-0 pb-[26px]
        md:grid-cols-3
      ">
      {notes.map((note, k) => (
        <li className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-3.5" key={note.title}>
          <NumberDisc n={k + 1} size={36} />
          <span className="flex flex-col gap-1">
            <span className="text-xl font-semibold">{note.title}</span>
            <span className="text-body/normal text-ink-soft">{note.body}</span>
          </span>
        </li>
      ))}
    </ol>
    <PairingGrid {...grid} />
  </section>
);
