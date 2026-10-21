'use client';

import Link from 'next/link';

import { useSeals } from '@/components/headless/useSeals';
import { cn } from '@/utilities/cn';

import type { CSSProperties, FC } from 'react';

/** One point on the route strip. */
export type RouteStop = {
  code: string;
  name: string;
  href: string;
};

/** A run of consecutive points on one plate (hand, arm, head …). */
export type RouteSegment = {
  key: string;
  /** Han label, e.g. 手. */
  zh: string;
  /** Label in the page's language; omitted on Chinese pages. */
  label?: string;
  /** "LI1–LI5". */
  range: string;
  stops: readonly RouteStop[];
};

/** Props for {@link RouteStrip}. */
export type RouteStripProps = {
  segments: readonly RouteSegment[];
  /** Accessible name of the strip. */
  label: string;
  /** Link names with `{code}` and `{name}` slots. */
  sealedLabel: string;
  notSealedLabel: string;
  hanLang: string;
};

/**
 * The route (循行) as a ruled strip: each plate the channel crosses is a
 * segment sized by its point count, its points shown as cinnabar dots,
 * filled once sealed, each linking to the point's leaf.
 * @param props the route segments and seal-link labels
 * @param props.segments the consecutive body-part runs in channel order
 * @param props.label the accessible name of the route strip
 * @param props.sealedLabel the link-name template for a sealed point
 * @param props.notSealedLabel the link-name template for an unsealed point
 * @param props.hanLang the BCP-47 tag for Han text
 * @returns the body-part segments with linked seal dots and point ranges
 */
export const RouteStrip: FC<RouteStripProps> = ({
  segments,
  label,
  sealedLabel,
  notSealedLabel,
  hanLang,
}) => {
  const seals = useSeals();
  const { ready } = seals;

  return (
    <ol aria-label={label} className="m-0 flex list-none flex-wrap gap-y-6 p-0">
      {segments.map((segment) => (
        <li
          className="flex min-w-[120px] flex-col gap-2.5 pr-2"
          key={segment.key}
          style={segmentGrow(segment.stops.length)}>
          <span className="flex flex-wrap">
            {segment.stops.map((stop) => {
              const sealed = ready && seals.has(stop.code);

              return (
                <Link
                  aria-label={(sealed ? sealedLabel : notSealedLabel)
                    .replace('{code}', stop.code)
                    .replace('{name}', stop.name)}
                  className="grid size-6 place-items-center"
                  href={stop.href}
                  key={stop.code}>
                  <span
                    className={cn(
                      'size-3 rounded-full',
                      sealed
                        ? 'bg-(--color-cinnabar)'
                        : 'shadow-[inset_0_0_0_1.5px_var(--color-cinnabar)]',
                    )}
                  />
                </Link>
              );
            })}
          </span>
          <span
            aria-hidden="true"
            className="
              -mr-2 h-[5px] bg-ink shadow-[inset_8px_0_0_var(--color-paper)]
            "
          />
          <span className="text-[1.0625rem]">
            <span className="tc font-bold" lang={hanLang}>
              {segment.zh}
            </span>
            {segment.label ? ` ${segment.label}` : null}
          </span>
          <span className="pm text-[0.6875rem] text-ink-micro">{segment.range}</span>
        </li>
      ))}
    </ol>
  );
};

/**
 * sizes a route segment in proportion to its point count
 * @param count the number of points in this body-part segment
 * @returns the flex style for the segment
 */
function segmentGrow(count: number): CSSProperties {
  return { flex: `${count} 1 0` };
}
