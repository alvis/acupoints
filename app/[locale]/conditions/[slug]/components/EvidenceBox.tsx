import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { EvidenceBoxCopy } from '@/features/conditions/copy';
import type { EvidenceSourceView, EvidenceView } from '@/features/conditions/evidence';

/** Props for {@link EvidenceBox}. */
export type EvidenceBoxProps = {
  evidence: EvidenceView;
  copy: EvidenceBoxCopy;
  /** Box glyph (證) in the page's script. */
  mark: string;
  className?: string;
};

type SourceListProps = {
  id: string;
  title: string;
  sources: readonly EvidenceSourceView[];
  copy: EvidenceBoxCopy;
};

const SourceList: FC<SourceListProps> = ({ id, title, sources, copy }) => (
  <div className="flex flex-col gap-4">
    <h3 className="cap m-0" id={id}>
      {title}
    </h3>
    <ol aria-labelledby={id} className="m-0 flex list-none flex-col gap-5 p-0">
      {sources.map((source) => (
        <li className="flex flex-col gap-1.5" key={source.href}>
          <p className="m-0 text-sm text-ink-soft">
            {copy.kinds[source.kind]} · {source.by} · {source.year}
            {source.ref ? <span className="pm"> · {source.ref}</span> : null}
          </p>
          <p className="m-0 text-[1.0625rem] leading-[1.45] font-bold">
            {source.title}
            {source.original ? (
              <span className="ml-2 font-normal" lang="zh-Hant">
                {source.original}
              </span>
            ) : null}
          </p>
          <p className="m-0 text-[1.0625rem] leading-[1.55]">{source.finding}</p>
          {source.points.length > 0 ? (
            <p className="m-0 flex flex-wrap items-baseline gap-x-2 text-sm">
              <span>{copy.pointsLabel}</span>
              {source.points.map((point) => (
                <Link className="wb-link pm underline" href={point.href} key={point.code}>
                  {point.code}
                </Link>
              ))}
            </p>
          ) : null}
          <a
            className="wb-link self-start text-sm underline"
            href={source.href}
            rel="noopener noreferrer"
            target="_blank">
            {copy.open} ↗
          </a>
        </li>
      ))}
    </ol>
  </div>
);

/**
 * The cited evidence box (證) of a condition page: what the sources found,
 * then the Chinese-medicine authorities that name the points beside the
 * clinical research that weighed them, each linked to its source.
 * @param props evidence view, box copy and glyph
 * @param props.evidence the condition's evidence in the page locale
 * @param props.copy box headings and source-kind labels
 * @param props.mark box glyph in the page script
 * @param props.className additional classes for the outer element
 * @returns the cited evidence section
 */
export const EvidenceBox: FC<EvidenceBoxProps> = ({ evidence, copy, mark, className }) => (
  <section aria-labelledby="evidence-box" className={cn(`
    r1 flex flex-col gap-7 p-6
  `, className)}>
    <div className="flex flex-col gap-2.5">
      <h2 className="cap m-0" id="evidence-box">
        <span aria-hidden="true" className="tc">
          {mark}
        </span>{' '}
        · {copy.title}
      </h2>
      <p className="m-0 text-[1.0625rem] leading-[1.55]">{evidence.summary}</p>
    </div>
    <div
      className="
        grid gap-8
        lg:grid-cols-2
      ">
      <SourceList
        copy={copy}
        id="evidence-chinese"
        sources={evidence.chinese}
        title={copy.chineseTitle}
      />
      <SourceList
        copy={copy}
        id="evidence-research"
        sources={evidence.research}
        title={copy.researchTitle}
      />
    </div>
  </section>
);
