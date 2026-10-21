import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One chip: a channel or a condition page. */
export type RegionLink = {
  href: string;
  /** Han word before the label on English pages. */
  zh?: string;
  label: string;
};

/** One labelled group of chips. */
export type RegionLinkGroup = {
  /** Han word before the caps label on English pages (經, 症). */
  zh?: string;
  title: string;
  links: readonly RegionLink[];
  /** Ink-filled chips (conditions) rather than ruled ones (channels). */
  solid: boolean;
  /** Trailing "Also brought here" line after the chips. */
  also?: { label: string; text: string };
};

/** Props for {@link RegionLinks}. */
export type RegionLinksProps = {
  groups: readonly RegionLinkGroup[];
  hanLang: string;
  className?: string;
};

/**
 * "Channels through here" and "Related conditions" as rows of chips.
 * @param props channel and condition chip groups and Han language tag
 * @param props.groups ordered link sections
 * @param props.hanLang language tag for Han text
 * @param props.className additional presentation classes
 */
export const RegionLinks: FC<RegionLinksProps> = ({ groups, hanLang, className }) => (
  <div className={cn('flex flex-col gap-4', className)}>
    {groups.map((group) =>
      group.links.length > 0 || group.also ? (
        <div className="flex flex-col gap-2.5" key={group.title}>
          <span className="cap">
            {group.zh ? (
              <>
                <span className="tc" lang={hanLang}>
                  {group.zh}
                </span>{' '}
                ·{' '}
              </>
            ) : null}
            {group.title}
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  className={cn('btn text-base', group.solid ? 'btn-primary' : `
                    btn-secondary
                  `)}
                  href={link.href}>
                  {link.zh ? (
                    <span className="tc font-bold" lang={hanLang}>
                      {link.zh}
                    </span>
                  ) : null}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {group.also ? (
            <p className="m-0 text-base text-ink-soft">
              {group.also.label} <i>{group.also.text}</i>
            </p>
          ) : null}
        </div>
      ) : null,
    )}
  </div>
);
