import type { FC } from 'react';

import type { GlossaryLeafProps } from './GlossaryLeaf';

export const GlossaryQuestion: FC<Readonly<Pick<GlossaryLeafProps, 'faq' | 'labels'>>> = ({
  faq,
  labels,
}) =>
  faq ? (
    <div
      className="
        flex flex-col gap-1.5 bg-paper-raised px-[18px] py-4
        shadow-[inset_3px_0_0_var(--color-cinnabar)]
      ">
      <span className="cap">
        <span aria-hidden="true" className="tc">
          {labels.askedHan}
        </span>{' '}
        · {labels.asked}
      </span>
      <span className="text-[1.125rem] leading-[1.35] font-semibold">{faq.q}</span>
      <span className="text-base/normal">{faq.a}</span>
    </div>
  ) : null;
