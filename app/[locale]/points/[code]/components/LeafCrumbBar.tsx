import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { HanDirectionToggle } from './HanDirectionToggle';

import type { ReactNode } from 'react';

import type { LeafSpreadViewModel } from './LeafSpreadView';

/**
 * render breadcrumb row with the writing-direction toggle
 * @param props breadcrumb and direction controls
 * @param props.model localized routes, breadcrumb labels, and channel position
 * @returns the breadcrumb row with the writing-direction toggle
 */
export const LeafCrumbBar = ({ model }: Readonly<{ model: LeafSpreadViewModel }>): ReactNode => {
  const { t, r, hanLang, locale, volume, volumeHan, channelName, leafHan, point } = model;

  return (
    <div
      className="
        mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3
        max-md:hidden
      ">
      <nav aria-label={t.breadcrumb}>
        <ol
          className="
            m-0 flex list-none flex-wrap items-center gap-x-3.5 gap-y-1 p-0
            text-base
          ">
          <li className="flex items-center gap-3.5">
            <Link className="wb-link" href={r.points}>
              <span className="tc font-bold" lang={hanLang}>
                {hanFor(t.index.han, locale)}
              </span>
              {locale === 'en' ? ` ${t.index.label}` : null}
            </Link>
            <FishTail width={18} />
          </li>
          {volume ? (
            <li className="flex items-center gap-3.5">
              <Link className="wb-link" href={r.meridian(volume.slug)}>
                <span className="tc font-bold" lang={hanLang}>
                  {volumeHan}
                </span>{' '}
                {channelName}
              </Link>
              <FishTail width={18} />
            </li>
          ) : null}
          <li aria-current="page">
            <span className="tc font-bold" lang={hanLang}>
              {leafHan}
            </span>{' '}
            {point.name}
          </li>
        </ol>
      </nav>
      <HanDirectionToggle
        across={t.direction.across}
        cap={t.direction.cap}
        group={t.direction.group}
        vertical={t.direction.vertical}
      />
    </div>
  );
};
