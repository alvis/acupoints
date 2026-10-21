import Link from 'next/link';

import type { FC } from 'react';

import type { GlossaryLeafProps } from './GlossaryLeaf';

export const GlossaryExamples: FC<Readonly<Pick<GlossaryLeafProps, 'examples' | 'labels'>>> = ({
  examples,
  labels,
}) => (
  <ul className="m-0 flex list-none flex-col p-0">
    {examples.map((ex) => (
      <li key={ex.code}>
        <Link
          aria-label={ex.aria}
          className="
            flex flex-col gap-0.5 border-b border-dotted border-ink-micro
            py-[7px] no-underline
          "
          href={ex.href}>
          <span className="flex items-baseline gap-2.5">
            <span className="tc text-[1.2rem] font-bold">{ex.hanzi}</span>
            <span className="text-[1.05rem]">{ex.name}</span>
            <span className="pm text-xs text-ink-soft">{ex.code}</span>
            <span className="flex-1" />
            <span className="text-sm underline underline-offset-[3px]">{labels.leafArrow}</span>
          </span>
          <span className="text-[0.95rem] text-ink-soft">{ex.where}</span>
        </Link>
      </li>
    ))}
  </ul>
);
