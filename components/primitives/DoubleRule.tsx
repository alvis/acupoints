import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC } from 'react';

/** Props for {@link DoubleRule}. */
export type DoubleRuleProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

/**
 * Heavy-over-hairline rule that closes the masthead and opens sections.
 * @param props the section divider.
 * @param props.className additional wrapper classes.
 */
export const DoubleRule: FC<DoubleRuleProps> = ({ className, ...divProps }) => {
  return <div aria-hidden="true" {...divProps} className={cn('rule2', className)} />;
};
