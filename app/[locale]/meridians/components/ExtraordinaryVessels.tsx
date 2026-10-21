import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { ReactNode } from 'react';

import type { VesselMark } from './PairingGrid';

/** the vessel links, selected channel slug, and localized labels */
interface ExtraordinaryVesselsProps {
  vessels: readonly VesselMark[];
  selected: string;
  hanLang: string;
  pickedWord: string;
}

/**
 * shows the two unpaired midline vessels
 * @param props the vessel links, selected channel slug, and localized labels
 * @returns links to the governing and conception vessels
 */
export const ExtraordinaryVessels = (props: Readonly<ExtraordinaryVesselsProps>): ReactNode => {
  const { vessels, selected, hanLang, pickedWord } = props;

  return (
    <div
      className="
        flex gap-4
        lg:gap-5
      ">
      <span aria-hidden="true" className="
        w-[9px] shrink-0 border-x border-l-[2.5px] border-ink
      " />
      <div className="flex flex-col justify-around gap-6 py-4">
        {vessels.map((v) => (
          <Link
            className={cn(
              `flex flex-col gap-1 px-2 py-1 text-ink no-underline`,
              v.slug === selected && `shadow-[0_0_0_4px_var(--color-cinnabar)]`,
            )}
            href={v.href}
            key={v.slug}>
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className={cn('size-3.5 shadow-rest', v.dark && `
                bg-ink
              `)} />
              <span className="tc text-[1.375rem] font-black" lang={hanLang}>
                {v.zh}
              </span>
            </span>
            <span className="text-[0.95rem]">{v.label}</span>
            {v.slug === selected ? <span className="sr-only">, {pickedWord}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
};
