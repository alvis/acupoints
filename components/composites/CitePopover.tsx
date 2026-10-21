'use client';

import { useEffect, useId, useState } from 'react';

import { SITE } from '@/utilities/routes';

import type { FC } from 'react';

/** Props for {@link CitePopover}. */
export type CitePopoverProps = {
  title: string;
  path: string;
  reviewed: Date;
  /** Button label, which is also its accessible name. */
  label?: string;
};

/**
 * "Cite this page" control: a ruled outline button that opens a paper panel
 * in a double ink frame with APA, MLA and BibTeX forms. Escape closes it.
 * @param props the page citation control.
 * @param props.title display heading.
 * @param props.path site-relative destination.
 * @param props.reviewed last review date.
 * @param props.label accessible or displayed reading.
 * @returns the citation button and its APA, MLA, and BibTeX panel.
 */
export const CitePopover: FC<CitePopoverProps> = ({
  title,
  path,
  reviewed,
  label = 'Cite this page',
}) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const year = reviewed.getFullYear();
  const url = `${SITE.url}${path}`;
  const dateHuman = reviewed.toISOString().split('T')[0];

  const apa = `Acupoints Editorial Team. (${year}). ${title}. ${SITE.name}. ${url}`;
  const mla = `"Acupoints Editorial Team." "${title}." ${SITE.name}, ${dateHuman}, ${url}.`;
  const bib = `@misc{acupoints-${path.replace(/[^a-z0-9]/gi, '')},
  author = {{Acupoints Editorial Team}},
  title = {${title}},
  year = {${year}},
  url = {${url}}
}`;

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // full-width wrapper below sm so an open popover anchors to the content
  // column instead of a wrapped button and never clips past the viewport edge
  return (
    <div
      className="
        relative inline-block w-full
        sm:w-auto
      ">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="btn btn-secondary px-3.5 py-2 text-[0.95rem]"
        type="button"
        onClick={() => setOpen((v) => !v)}>
        <span aria-hidden="true" className="tc font-black">
          引
        </span>
        {label}
      </button>

      {open ? (
        <div
          aria-label="Citation formats"
          className="
            r2 absolute right-0 z-20 mt-2 w-full bg-paper p-5 text-sm
            sm:w-[min(92vw,28rem)]
          "
          id={panelId}
          role="dialog">
          {[
            { label: 'APA', value: apa },
            { label: 'MLA', value: mla },
            { label: 'BibTeX', value: bib },
          ].map((entry) => (
            <div
              className="
                mb-3
                last:mb-0
              "
              key={entry.label}>
              <p className="cap m-0">{entry.label}</p>
              <pre
                className="
                  pm m-0 mt-1 bg-paper-raised p-2.5 text-[0.75rem]
                  leading-[1.55] wrap-break-word whitespace-pre-wrap text-ink
                  shadow-[inset_3px_0_0_var(--color-ink)]
                ">
                {entry.value}
              </pre>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
