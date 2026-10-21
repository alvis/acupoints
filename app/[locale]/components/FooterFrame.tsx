import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

import type { FooterLink } from './SiteFooter';

type LinkColumnProps = {
  id: string;
  han: string;
  title: string;
  links: readonly FooterLink[];
  zh: boolean;
  stamp: ReactNode;
  caption: ReactNode;
};

export const LinkColumn: FC<LinkColumnProps> = ({ id, han, title, links, zh, stamp, caption }) => {
  return (
    <nav
      aria-labelledby={id}
      className="
        flex min-w-0 flex-1 basis-0 gap-3.5 border-b border-rule py-[22px]
        lg:border-r lg:border-b-0 lg:px-[22px]
      ">
      <span
        aria-hidden="true"
        className="
          tc vt flex-none text-[1.15rem] font-black tracking-[0.2em]
          text-ink-micro
        ">
        {han}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className={cn('m-0 mb-2 text-[1.08rem] font-semibold', zh && 'tc')} id={id}>
          {title}
        </h2>
        <ul className="m-0 list-none p-0 text-[1.02rem] leading-[1.45]">
          {links.map((link) => (
            <li key={link.href}>
              <Link className={cn('wb-link block py-1', zh && 'tc')} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <StampFoot caption={caption} stamp={stamp} zh={zh} />
      </div>
    </nav>
  );
};

type StampFootProps = {
  stamp: ReactNode;
  caption: ReactNode;
  zh: boolean;
};

export const StampFoot: FC<StampFootProps> = ({ stamp, caption, zh }) => {
  return (
    <div className="mt-auto flex items-center gap-3.5 pt-3.5">
      {stamp}
      <span
        className={cn(
          'text-[0.86rem] leading-snug text-ink-micro',
          zh &&
            `tc`,
        )}>
        {caption}
      </span>
    </div>
  );
};

type MountStripProps = {
  edge: 'top' | 'bottom';
};

/** Hairline where the silk mount meets the paper, on the paper side of each strip. */
const MOUNT_EDGE: Record<MountStripProps['edge'], string> = {
  top: 'shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]',
  bottom: 'shadow-[inset_0_1px_0_rgba(0,0,0,0.35)]',
};

export const MountStrip: FC<MountStripProps> = ({ edge }) => {
  return <div aria-hidden="true" className={cn('h-[22px] bg-mount', MOUNT_EDGE[edge])} />;
};

/**
 * Wooden roller: vertical on the trailing edge at desktop, horizontal below on small screens.
 * @returns the decorative wooden roller in desktop and mobile orientations
 */
export const Roller: FC = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          relative hidden w-10 flex-none
          lg:block
        ">
        <span
          className="
            absolute top-0 -left-2.5 h-[22px] w-[60px] rounded-md bg-[#d9d0be]
            shadow-[inset_0_-3px_0_rgba(0,0,0,0.18)]
          "
        />
        <span
          className="
            absolute inset-y-[18px] left-0 w-10
            bg-[linear-gradient(to_right,#3b2414,#7a5233_42%,#4a2d18)]
          "
        />
        <span
          className="
            absolute bottom-0 -left-2.5 h-[22px] w-[60px] rounded-md
            bg-[#d9d0be] shadow-[inset_0_3px_0_rgba(0,0,0,0.18)]
          "
        />
      </div>
      <div
        aria-hidden="true"
        className="
          relative mx-2 h-7
          lg:hidden
        ">
        <span
          className="
            absolute inset-x-[14px] top-0 h-7
            bg-[linear-gradient(to_bottom,#3b2414,#7a5233_42%,#4a2d18)]
          "
        />
        <span
          className="
            absolute top-[-4px] left-0 h-9 w-[22px] rounded-md bg-[#d9d0be]
          "
        />
        <span
          className="
            absolute top-[-4px] right-0 h-9 w-[22px] rounded-md bg-[#d9d0be]
          "
        />
      </div>
    </>
  );
};
