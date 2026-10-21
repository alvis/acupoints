import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { HelpBox } from './HelpBox';

import type { FC } from 'react';

import type { SafetyCopy } from '../copy';

/** Props for {@link SafetyCards}. */
export type SafetyCardsProps = {
  copy: SafetyCopy;
  /** Stop rule text for the 停 card. */
  stopText: string;
  /** Pregnancy text for the 孕 card, already naming the points to leave out. */
  pregnancyText: string;
  urgentTitle: string;
  urgentText: string;
  /** Where "get help now" leads: a condition's red-flag section or the index. */
  urgentHref: string;
  /** Link text of the urgent card; defaults to the shared "get help now". */
  urgentLink?: string;
  /** Prefix for the card heading ids, unique on the page. */
  idPrefix: string;
  className?: string;
};

/**
 * The three always-visible safety cards of a routine: stop if it hurts, the
 * pregnancy points, and the signs that cannot wait (cinnabar frame). The
 * parent supplies the section heading; cards sit one level below it.
 * @param props localized stop, pregnancy, and urgent-care advice
 * @param props.copy localized headings, controls, and safety messages
 * @param props.stopText advice on when to stop pressing
 * @param props.pregnancyText advice about points avoided in pregnancy
 * @param props.urgentTitle heading for the urgent-care warning
 * @param props.urgentText warning signs requiring medical attention
 * @param props.urgentHref URL of the full urgent-care guidance
 * @param props.urgentLink text of the urgent-care guidance link
 * @param props.idPrefix prefix shared by the safety-card heading anchors
 * @param props.className additional classes for the outer element
 */
export const SafetyCards: FC<SafetyCardsProps> = ({
  copy,
  stopText,
  pregnancyText,
  urgentTitle,
  urgentText,
  urgentHref,
  urgentLink,
  idPrefix,
  className,
}) => (
  <div
    className={cn(
      `
        grid gap-7
        md:grid-cols-3
      `,
      className,
    )}>
    <HelpBox glyph="停" id={`${idPrefix}-stop`} level={3} title={copy.stopTitle}>
      <p className="m-0">{stopText}</p>
    </HelpBox>
    <HelpBox glyph="孕" id={`${idPrefix}-pregnancy`} level={3} title={copy.pregnancyTitle}>
      <p className="m-0">{pregnancyText}</p>
    </HelpBox>
    <HelpBox urgent id={`${idPrefix}-urgent`} level={3} title={urgentTitle}>
      <p className="m-0">{urgentText}</p>
      <Link className="
        red self-start text-base underline underline-offset-[3px]
      " href={urgentHref}>
        {urgentLink ?? copy.urgentLink}
      </Link>
    </HelpBox>
  </div>
);
