'use client';

import { createContext, useMemo, useState } from 'react';

import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link HanDirectionScope}. */
export type HanDirectionScopeProps = PropsWithChildren<{
  className?: string;
}>;

/** Reading direction shared by a leaf's Han headings and its direction switch. */
export type HanDirectionState = {
  across: boolean;
  setAcross: (next: boolean) => void;
};

/** Context read by `HanDirectionToggle`; defaults to vertical. */
export const HanDirectionContext = createContext<HanDirectionState>({
  across: false,
  setAcross: (): undefined => undefined,
});

/**
 * Wraps a leaf so its Han headings can read top-to-bottom (直排) or across
 * (橫排). Descendants style themselves with the `group-data-[han=across]/han:`
 * variant, so server-rendered markup reflows without re-rendering.
 * @param props nested leaf content and layout classes
 * @param props.children leaf content that shares the writing-direction setting
 * @param props.className additional classes on the writing-direction scope
 * @returns the children within the persisted writing-direction scope
 */
export const HanDirectionScope: FC<HanDirectionScopeProps> = ({ children, className }) => {
  const [across, setAcross] = useState(false);
  const value = useMemo(() => ({ across, setAcross }), [across]);

  return (
    <HanDirectionContext.Provider value={value}>
      <div className={cn('group/han', className)} data-han={across ? 'across' : 'vertical'}>
        {children}
      </div>
    </HanDirectionContext.Provider>
  );
};
