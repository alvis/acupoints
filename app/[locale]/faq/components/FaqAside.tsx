import { Seal } from '@/components/primitives/Seal';
import { ShelfLink } from '@/features/editorial/components/ShelfLink';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** Resolved strings for {@link FaqAside}. */
export type FaqAsideLabels = {
  unsureCap: string;
  unsureTitle: string;
  unsureBody: string;
  emergencyLead: string;
  emergencyRest: string;
  moreCap: string;
  moreBody: string;
  aboutLink: string;
  glossaryLink: string;
  /** The "ask a practitioner" seal (問醫), in the page's script. */
  askSeal: readonly [string, string];
  /** Han glyph leading the practitioner caps line (醫). */
  unsureMark: string;
  /** Han glyph leading the "not answered here?" caps line (補). */
  moreMark: string;
};

/** Props for {@link FaqAside}. */
export type FaqAsideProps = {
  labels: FaqAsideLabels;
  aboutHref: string;
  glossaryHref: string;
  zh: boolean;
};

/** `.cap` sets its own muted color, so the red caption overrides it inline. */
const SEAL_INK = { color: 'var(--color-seal)' } as const;

/**
 * The FAQ margin: the "ask a practitioner" box and the "not answered here?" box.
 * @param props practitioner guidance, further-reading links, and language styling
 * @param props.labels localized interface labels
 * @param props.aboutHref localized about-page destination
 * @param props.glossaryHref localized glossary destination
 * @param props.zh whether to use the Han face for Chinese interface strings
 * @returns the practitioner caution and further-reading margin boxes
 */
export const FaqAside: FC<FaqAsideProps> = ({ labels, aboutHref, glossaryHref, zh }) => (
  <aside aria-labelledby="faq-unsure" className="flex flex-col gap-6">
    <div className="r2-red flex flex-col gap-3 px-6 py-[22px]">
      <span className="flex items-center gap-3.5">
        <Seal bottom={labels.askSeal[1]} size={44} top={labels.askSeal[0]} />
        <span className={cn('cap', zh && 'tc')} style={SEAL_INK}>
          <span aria-hidden="true" className="tc">
            {labels.unsureMark}
          </span>{' '}
          · {labels.unsureCap}
        </span>
      </span>
      <h2
        className={cn('m-0 text-[1.63rem] leading-[1.2] font-semibold', zh && `
          tc
        `)}
        id="faq-unsure">
        {labels.unsureTitle}
      </h2>
      <p className={cn('m-0 text-[1.06rem] leading-[1.55]', zh && 'tc')}>{labels.unsureBody}</p>
      <p
        className={cn(
          `m-0 border-t border-seal/40 pt-2.5 text-base/normal`,
          zh &&
            `tc`,
        )}>
        <span aria-hidden="true" className="tc red mr-1.5 font-black">
          急
        </span>
        <strong className="font-semibold">{labels.emergencyLead}</strong>
        {labels.emergencyRest}
      </p>
    </div>

    <div className="r1 flex flex-col gap-2.5 px-6 py-5">
      <span className={cn('cap', zh && 'tc')}>
        <span aria-hidden="true" className="tc">
          {labels.moreMark}
        </span>{' '}
        · {labels.moreCap}
      </span>
      <p className={cn('m-0 text-[1.06rem] leading-normal', zh && 'tc')}>{labels.moreBody}</p>
      <a
        className="text-[1.06rem] underline underline-offset-4"
        href="mailto:editorial@acupoints.com">
        editorial@acupoints.com
      </a>
      <ShelfLink
        className="pt-1.5 text-[1.06rem]"
        han="說明"
        href={aboutHref}
        label={labels.aboutLink}
        zh={zh}
      />
      <ShelfLink
        className="text-[1.06rem]"
        han="詞"
        href={glossaryHref}
        label={labels.glossaryLink}
        zh={zh}
      />
    </div>
  </aside>
);
