import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

import type { HanMarks } from '@/features/conditions/copy';

/** The traditional-rationale excerpt for the 注 box. */
export type WhyNote = {
  /** Anchor of the full prose section. */
  id: string;
  heading: string;
  /** Opening sentences of the section. */
  lead: string;
};

/** One related link: another condition or a linked point. */
export type RelatedLink = {
  href: string;
  /** Han word in bold (condition name or point hanzi). */
  han: string;
  /** Latin label after the Han word; omitted on Chinese pages. */
  label?: string;
  /** Point code in mono, for point links. */
  code?: string;
};

/** Props for {@link ConditionNotes}. */
export type ConditionNotesProps = {
  whyTitle: string;
  why?: WhyNote;
  evidenceTitle: string;
  /** The prose's own sentences on the modern evidence, for the 證 box. */
  evidence?: string;
  relatedTitle: string;
  related: readonly RelatedLink[];
  /** Box glyphs (注, 證, 類) in the page's script. */
  marks: HanMarks;
  className?: string;
};

type NoteBoxProps = PropsWithChildren<{ han: string; title: string }>;

const NoteBox: FC<NoteBoxProps> = ({ han, title, children }) => (
  <div className="r1 flex flex-col gap-2.5 p-6">
    <h2 className="cap m-0">
      <span aria-hidden="true" className="tc">
        {han}
      </span>{' '}
      · {title}
    </h2>
    {children}
  </div>
);

/**
 * The ruled boxes under a condition's set: why tradition chose these points
 * (注), what the evidence says (證, in the prose's own words) and the
 * related conditions and points (類).
 * @param props rationale excerpt, evidence passage, related links, and box headings
 * @param props.whyTitle heading of the traditional-rationale box
 * @param props.why rationale excerpt and link to its full prose section
 * @param props.evidenceTitle heading of the modern-evidence box
 * @param props.evidence the prose's own sentences weighing modern evidence
 * @param props.relatedTitle heading of the related conditions and points box
 * @param props.related links to other conditions and points outside the set
 * @param props.marks heading glyphs in the page script
 * @param props.className additional classes for the outer element
 * @returns the rationale, evidence, and related-link boxes
 */
export const ConditionNotes: FC<ConditionNotesProps> = ({
  whyTitle,
  why,
  evidenceTitle,
  evidence,
  relatedTitle,
  related,
  marks,
  className,
}) => (
  <section className={cn('grid gap-7', evidence ? 'lg:grid-cols-3' : `
    lg:grid-cols-2
  `, className)}>
    {why ? (
      <NoteBox han={marks.why} title={whyTitle}>
        <p className="m-0 text-[1.0625rem] leading-[1.55]">{why.lead}</p>
        <a className="wb-link self-start text-base underline" href={`#${why.id}`}>
          {why.heading} ↓
        </a>
      </NoteBox>
    ) : null}
    {evidence ? (
      <NoteBox han={marks.evidence} title={evidenceTitle}>
        <p className="m-0 text-[1.0625rem] leading-[1.55]">{evidence}</p>
      </NoteBox>
    ) : null}
    <NoteBox han={marks.related} title={relatedTitle}>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {related.map((link) => (
          <li key={link.href}>
            <Link
              className="
                r1 inline-flex items-baseline gap-2 px-3.5 py-2.5
                text-[1.0625rem] text-ink no-underline
                hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
              "
              href={link.href}>
              <span aria-hidden={link.label ? true : undefined} className="
                tc font-bold
              ">
                {link.han}
              </span>
              {link.label ?? null}
              {link.code ? <span className="pm text-xs">{link.code}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </NoteBox>
  </section>
);
