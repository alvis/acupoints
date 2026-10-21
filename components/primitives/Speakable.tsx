import { cn } from '@/utilities/cn';

import { SpeakableJsonLd } from './SpeakableJsonLd';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link Speakable}. */
export type SpeakableProps = PropsWithChildren<{
  className?: string;
  as?: 'p' | 'div';
  /**
   * When `true`, the sibling `SpeakableSpecification` JSON-LD is NOT emitted.
   * Use this on pages that already publish a richer JSON-LD graph containing
   * `speakable` (for example `/points/[code]`, whose MedicalWebPage entity
   * already declares the selector). Defaults to `false` so every other route
   * that renders this component automatically satisfies the GEO §10
   * requirement without having to remember to add the JSON-LD themselves.
   */
  suppressJsonLd?: boolean;
}>;

/**
 * Marks the canonical one-liner with the `.speakable` class AND emits a
 * machine-readable `SpeakableSpecification` JSON-LD alongside it, so the CSS
 * class + the structured-data selector stay in lockstep across every route
 * that uses this component (spec §10 / audit Finding D).
 *
 * Rendering the JSON-LD as a sibling keeps `<Speakable>` callable inline in
 * prose — the `<script>` tag is invisible in the flow, and duplicate emissions
 * on the same page are harmless (crawlers deduplicate identical selectors).
 * @param props the canonical summary and structured data.
 * @param props.children the canonical one-line summary.
 * @param props.className additional wrapper classes.
 * @param props.as the HTML element used for the text wrapper.
 * @param props.suppressJsonLd whether structured data is already emitted elsewhere.
 * @returns the marked summary and optional speakable structured data.
 */
export const Speakable: FC<SpeakableProps> = ({
  children,
  className,
  as: Tag = 'p',
  suppressJsonLd = false,
}) => {
  return (
    <>
      <Tag
        className={cn(`
          speakable font-display text-lead/normal text-ink-soft italic
        `, className)}>
        {children}
      </Tag>
      {suppressJsonLd ? null : <SpeakableJsonLd />}
    </>
  );
};
