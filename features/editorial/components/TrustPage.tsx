import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC } from 'react';

/** Props for {@link TrustPage}: any `<div>` attribute. */
export type TrustPageProps = ComponentPropsWithoutRef<'div'>;

/**
 * Page gutter shared by the editorial trust pages: the boards' 1440px measure
 * with 80px margins at desktop, narrowing to a 16px gutter on phones.
 * @param props the trust-page gutter.
 * @param props.className additional presentation classes
 */
export const TrustPage: FC<TrustPageProps> = ({ className, ...rest }) => (
  <div
    className={cn(
      `
        mx-auto w-full max-w-[1440px] px-4 pb-8
        sm:px-8
        lg:px-20
      `,
      className,
    )}
    {...rest}
  />
);
