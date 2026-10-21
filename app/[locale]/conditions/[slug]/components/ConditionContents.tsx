import { LeaderRow } from '@/components/primitives/LeaderRow';
import { HAN_NUMERALS } from '@/utilities/hanNumeral';

import type { ReactNode } from 'react';

import type { EditorialArm } from '@/content/editorial/schema';

/** localized prose sections for the contents links */
interface ConditionContentsProps {
  arm: EditorialArm;
}

/**
 * renders linked table of contents with Han section numbers
 * @param props localized prose sections for the contents links
 * @returns the linked table of contents with Han section numbers
 */
export const ConditionContents = (props: Readonly<ConditionContentsProps>): ReactNode => {
  const { arm } = props;

  return (
    <nav aria-labelledby="read-in-full" className="
      lg:sticky lg:top-24 lg:self-start
    ">
      <ol className="
        m-0 flex list-none flex-col border-t-[2.5px] border-ink p-0
      ">
        {arm.sections.map((section, i) => (
          <li className="border-b border-rule py-2.5" key={section.id}>
            <a className="wb-link text-[0.98rem] leading-snug" href={`#${section.id}`}>
              <LeaderRow
                left={section.heading}
                right={
                  <span aria-hidden="true" className="tc font-bold">
                    {HAN_NUMERALS[i] ?? i + 1}
                  </span>
                }
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
