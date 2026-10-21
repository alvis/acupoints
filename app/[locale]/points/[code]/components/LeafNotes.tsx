'use client';

import { useId, useState } from 'react';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** A red two-line margin note that opens one authored section in the commentary panel. */
export interface LeafNote {
  /** The two short lines set in the margin. */
  lines: readonly [string, string];
  /** Heading shown in the panel (the section's authored heading). */
  title: string;
  /** Opening paragraph of the section. */
  body: string;
  /** Anchor of the full section further down the leaf. */
  href: string;
}

/** One line of the leaf's main text: "Where.", "For.", "Press.". */
export interface LeafLine {
  key: string;
  label: string;
  text: string;
  /** BCP-47 tag when the text is in another language than the page (dataset English). */
  lang?: string;
  note?: LeafNote;
}

/** Props for {@link LeafNotes}. */
export type LeafNotesProps = {
  lines: readonly LeafLine[];
  /** Han glyph heading the panel (注). */
  glyph: string;
  /** Accessible name of the panel region. */
  panelLabel: string;
  continueLabel: string;
};

/**
 * The leaf's main text on ruled lines with red two-line margin notes. A note
 * opens its section's opening paragraph in the commentary panel (注) below;
 * the first note starts open, as on the printed board.
 * @param props instruction lines and commentary panel labels
 * @param props.lines ordered location and pressure instructions
 * @param props.glyph Han character printed beside the instruction panel
 * @param props.panelLabel accessible name of the instruction panel
 * @param props.continueLabel label for opening the full commentary passage
 * @returns the instruction lines with expandable margin commentary
 */
export const LeafNotes: FC<LeafNotesProps> = ({ lines, glyph, panelLabel, continueLabel }) => {
  const [open, setOpen] = useState(() => lines.find((line) => line.note)?.key);
  const panelId = useId();
  const active = lines.find((line) => line.key === open)?.note;

  return (
    <>
      <div
        className="
          ruled flex flex-col text-[1.05rem]
          sm:text-[1.19rem]
        ">
        {lines.map((line) => (
          <p className="m-0" key={line.key}>
            <b>{line.label}.</b> <span lang={line.lang}>{line.text}</span>
            {line.note ? (
              <>
                {' '}
                <button
                  aria-controls={panelId}
                  aria-expanded={open === line.key}
                  className={cn(
                    'n2 cursor-pointer border-0 bg-transparent p-0 align-middle',
                    open === line.key &&
                      `
                        bg-paper-raised
                        shadow-[0_0_0_3px_var(--color-paper-raised)]
                      `,
                  )}
                  type="button"
                  onClick={() => setOpen(line.key)}>
                  <span>{line.note.lines[0]}</span>
                  <span>{line.note.lines[1]}</span>
                </button>
              </>
            ) : null}
          </p>
        ))}
      </div>

      {active ? (
        <section
          aria-label={panelLabel}
          aria-live="polite"
          className="
            flex flex-col gap-1.5 bg-paper-raised px-4 pt-3.5 pb-4
            shadow-[inset_3px_0_0_var(--color-cinnabar)]
          "
          id={panelId}>
          <p className="m-0 flex items-baseline gap-2.5">
            <span aria-hidden="true" className="tc red text-lg font-black">
              {glyph}
            </span>
            <span className="text-lg font-semibold">{active.title}</span>
          </p>
          <p className="m-0 text-[1.06rem] leading-normal">{active.body}</p>
          <a className="wb-link red self-start text-[0.95rem]" href={active.href}>
            {continueLabel} ↓
          </a>
        </section>
      ) : null}
    </>
  );
};
