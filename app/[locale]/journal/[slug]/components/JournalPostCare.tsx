import { StopBox } from '@/features/learn/components/StopBox';
import { sentences } from '@/features/learn/content';
import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';

import { TryIt } from './TryIt';
import { WorkedExample } from './WorkedExample';

import type { FC } from 'react';

import type { JournalPostView } from './JournalPostBody';

/**
 * render the worked instructions and self-care limits
 * @param props worked example and self-care limits
 * @param props.guide measurement figures and instructions
 * @param props.st36 Zusanli catalogue entry
 * @param props.r localized destination routes
 * @param props.copy localized interface text
 * @param props.han converter for Han text in the page script
 * @param props.dict localized page and self-care labels
 * @param props.arm localized article prose
 * @returns the worked example and self-care limits
 */
export const JournalPostCare: FC<
  Readonly<Pick<JournalPostView, 'guide' | 'st36' | 'r' | 'copy' | 'han' | 'dict' | 'arm'>>
> = ({ guide, st36, r, copy, han, dict, arm }) => (
  <section className="mt-[72px] flex flex-col gap-[34px]">
    {guide ? (
      <WorkedExample
        example={guide.example}
        leafHref={st36 ? r.point(st36.code) : undefined}
        leafLabel={fill(copy.openLeaf, { code: 'ST36' })}
      />
    ) : null}
    <div className={cn('grid items-stretch gap-7', guide && `md:grid-cols-2`)}>
      {guide ? <TryIt tryIt={guide.tryIt} /> : null}
      <StopBox
        className={guide ? undefined : 'max-w-[760px]'}
        lines={sentences(arm.selfCareLimits)}
        mark={han('止')}
        notice={dict.disclaimers.selfCareNotice}
        title={copy.stopBox}
      />
    </div>
  </section>
);
