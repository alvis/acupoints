import Link from 'next/link';

import { MarginNote } from '@/components/primitives/MarginNote';

import type { FC } from 'react';

import type { CunSide } from './cunGuide';

/** Props for {@link CunSidePanel}. */
export type CunSidePanelProps = {
  side: CunSide;
  /** The cun glossary entry, for the glossary side link. */
  glossaryHref: string;
};

/**
 * The right-hand column beside a part of the cun guide, as the Journal board
 * sets it: a glossary link, the same-body-inch term, a span table, or a note.
 * @param props glossary link, span table, or note for a guide part
 * @param props.side figure or annotation for this guide part
 * @param props.glossaryHref measurement glossary destination
 * @returns the glossary link, span table, or note for a guide part
 */
export const CunSidePanel: FC<CunSidePanelProps> = ({ side, glossaryHref }) => {
  if (side.kind === 'glossary') {
    return (
      <Link
        className="
          r1 inline-flex items-baseline gap-2.5 px-3.5 py-2.5 text-base
          no-underline
        "
        href={glossaryHref}>
        <span aria-hidden="true" className="tc text-xl font-black">
          {side.han}
        </span>
        {side.text}
      </Link>
    );
  }
  if (side.kind === 'term') {
    return (
      <span className="text-base leading-[1.45] text-ink-soft">
        <span className="tc mr-2 text-[1.375rem] font-black text-ink">{side.han}</span>
        {side.text}
      </span>
    );
  }
  if (side.kind === 'note') {
    return (
      <span className="text-base leading-[1.45] text-ink-soft">
        {side.text} {side.note ? <MarginNote lines={side.note} /> : null}
      </span>
    );
  }
  const { table } = side;

  return (
    <table className="w-full border-collapse border-t-2 border-ink text-base">
      <caption className="cap pb-1.5 text-left">{table.caption}</caption>
      <thead>
        <tr>
          <th className="py-1 text-left text-[0.8rem] font-medium text-ink-soft" scope="col">
            {table.spanHeader}
          </th>
          <th className="
            py-1 text-right text-[0.8rem] font-medium text-ink-soft
          " scope="col">
            {table.cunHeader}
          </th>
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.span}>
            <td className="border-b border-rule py-1.5">{row.span}</td>
            <td className="pm border-b border-rule py-1.5 text-right text-sm">{row.cun}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
