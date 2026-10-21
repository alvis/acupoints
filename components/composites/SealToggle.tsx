'use client';

import { useSeals } from '@/components/headless/useSeals';
import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';

import type { ComponentPropsWithoutRef, FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link SealToggle}. */
export type SealToggleProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'onClick' | 'type' | 'aria-pressed'
> & {
  /** Point code, e.g. "LI4". */
  code: string;
  /** Two characters pressed into the seal, usually the point's Han name. */
  glyphs: readonly [string, string];
  locale: Locale;
  /** Readable point name for the accessible label. */
  name: string;
};

/**
 * "Stamp this leaf" — marks the point as read in this browser. Shows the
 * pressed seal once stamped; pressing again lifts it.
 * @param props the point stamp control.
 * @param props.code catalogue point identifier.
 * @param props.glyphs two characters pressed into the seal, usually the point's Han name.
 * @param props.locale language used for text and routes.
 * @param props.name readable point name for the accessible label.
 * @param props.className additional wrapper classes.
 */
export const SealToggle: FC<SealToggleProps> = ({
  code,
  glyphs,
  locale,
  name,
  className,
  ...buttonProps
}) => {
  const seals = useSeals();
  const chrome = getDictionary(locale).chrome;
  const sealed = seals.ready && seals.has(code);

  return (
    <button
      {...buttonProps}
      aria-pressed={sealed}
      className={cn(
        `
          inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent
          px-3 py-2 text-base text-ink
        `,
        `
          shadow-rest
          hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
        `,
        className,
      )}
      type="button"
      onClick={() => seals.toggle(code)}>
      <span
        className={cn(
          'inline-flex transition-[opacity,transform] duration-200',
          sealed ? '-rotate-6 opacity-100' : 'opacity-35 grayscale',
        )}>
        <Seal bottom={glyphs[1]} size={34} top={glyphs[0]} />
      </span>
      <span className={locale === 'en' ? undefined : 'tc'}>
        {sealed ? chrome.sealedLeaf.replace('{name}', name) : chrome.stampLeaf}
      </span>
    </button>
  );
};
