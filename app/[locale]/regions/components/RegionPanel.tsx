import Link from 'next/link';

import { RegionLinks } from '@/features/regions/components/RegionLinks';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { RegionLinkGroup } from '@/features/regions/components/RegionLinks';

/** One point filed under the region, as the card lists it. */
export type PanelPoint = {
  code: string;
  hanzi: string;
  name: string;
  where: string;
  href: string;
  /** Accessible name of the leaf link. */
  label: string;
};

/** Props for {@link RegionPanel}. */
export type RegionPanelProps = {
  glyph: string;
  /** "部位 · Region 7 of 10". */
  cap: string;
  name: string;
  summary: string;
  /** "穴 · Key points here". */
  pointsTitle: string;
  points: readonly PanelPoint[];
  leafWord: string;
  /** Shown instead of the list when no point is filed here. */
  empty: string;
  /** Pregnancy caution drawn from the points filed here, if any. */
  caution?: string;
  /** Han caution glyph printed before the safety note. */
  cautionGlyph: string;
  links: readonly RegionLinkGroup[];
  href: string;
  openText: string;
  hanLang: string;
  english: boolean;
};

/**
 * The picked region's card: names, summary, key points, caution, channels and conditions.
 * @param props chosen body part, key points, cautions, and destinations
 * @param props.glyph Han glyph identifying the body region
 * @param props.cap region position caption
 * @param props.name reader-facing name
 * @param props.summary published overview of the region
 * @param props.pointsTitle heading introducing the region’s key points
 * @param props.points point names, locations, and leaf links
 * @param props.leafWord label printed beside each leaf link
 * @param props.empty message shown when no point is filed here
 * @param props.caution pregnancy caution drawn from points filed here, if any
 * @param props.cautionGlyph Han caution glyph printed before the safety note
 * @param props.links channel and condition chip groups
 * @param props.href localized destination of the region detail page
 * @param props.openText label for opening the region page
 * @param props.hanLang language tag for Han text
 * @param props.english whether to use English copy
 * @returns the chosen region card and its links
 */
export const RegionPanel: FC<RegionPanelProps> = ({
  glyph,
  cap,
  name,
  summary,
  pointsTitle,
  points,
  leafWord,
  empty,
  caution,
  cautionGlyph,
  links,
  href,
  openText,
  hanLang,
  english,
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-5">
      <span
        aria-hidden="true"
        className="
          tc grid size-[84px] shrink-0 place-items-center text-[3.25rem]
          font-black
          shadow-[inset_0_0_0_2px_var(--color-ink),inset_0_0_0_6px_var(--color-paper),inset_0_0_0_7px_var(--color-ink)]
        "
        lang={hanLang}>
        {glyph}
      </span>
      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="cap">{cap}</span>
        <h2
          className={cn(
            `
              m-0 text-[2rem] leading-none font-medium
              sm:text-[2.5rem]
            `,
            !english && 'tc',
          )}>
          {name}
        </h2>
      </span>
    </div>
    <p className={cn('m-0 text-lg/normal', !english && 'tc')}>{summary}</p>

    <div className="flex flex-col">
      <span className="cap border-b-[2.5px] border-ink pb-2">{pointsTitle}</span>
      {points.length > 0 ? (
        <ul className="m-0 list-none p-0">
          {points.map((point) => (
            <li className="border-b border-rule" key={point.code}>
              <Link
                aria-label={point.label}
                className="
                  flex flex-col gap-[3px] pt-2.5 pb-[11px] text-ink no-underline
                  hover:bg-paper-raised
                "
                href={point.href}>
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="tc text-2xl font-bold" lang={hanLang}>
                    {point.hanzi}
                  </span>
                  <span className="text-xl">{point.name}</span>
                  <span className="pm text-xs text-ink-micro">{point.code}</span>
                  <span className="flex-1" />
                  <span className="wb-link text-[0.95rem]">{leafWord} →</span>
                </span>
                <span
                  className={cn(
                    'text-base leading-[1.4] text-ink-soft',
                    !english &&
                      `tc`,
                  )}>
                  {point.where}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="
            m-0 border-b border-rule py-3.5 text-body/normal text-ink-soft
          ">
          {empty}
        </p>
      )}
    </div>

    {caution ? (
      <p
        className="
          m-0 flex items-baseline gap-2.5 bg-paper-raised px-3.5 py-2.5
          text-base leading-[1.45] shadow-[inset_3px_0_0_var(--color-cinnabar)]
        ">
        <span aria-hidden="true" className="tc red text-lg font-black" lang={hanLang}>
          {cautionGlyph}
        </span>
        {caution}
      </p>
    ) : null}

    <RegionLinks groups={links} hanLang={hanLang} />

    <Link className="btn btn-primary self-start px-3.5 py-2 text-[0.95rem]" href={href}>
      {openText} →
    </Link>
  </div>
);
