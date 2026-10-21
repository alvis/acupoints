import { ABOUT_COPY } from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';

import { AboutCard } from './AboutCard';
import { AboutWhat } from './AboutWhat';
import { MakingSteps } from './MakingSteps';

import type { FC } from 'react';

import type { HanText, Translate } from '@/features/editorial/copy';

import type { MakingStep } from './MakingSteps';

type AboutPurposeProps = {
  t: Translate;
  han: HanText;
  zh: boolean;
  making: readonly MakingStep[];
};

/**
 * the book’s purpose, audience, and three layers of editorial work
 * @param props copy translator, script converter, typography choice, and production steps
 * @param props.t localized copy lookup
 * @param props.han Han script conversion
 * @param props.zh whether to use Chinese typography
 * @param props.making editorial workflow steps
 */
export const AboutPurpose: FC<Readonly<AboutPurposeProps>> = ({ t, han, zh, making }) => (
  <AboutWhat title={t(ABOUT_COPY.whatTitle)}>
    <AboutCard cap={t(ABOUT_COPY.whatCap)} han={han('是')} title={t(ABOUT_COPY.whatHead)} zh={zh}>
      <p className={cn('m-0 text-[1.06rem] leading-[1.55]', zh && 'tc')}>
        {t(ABOUT_COPY.whatBody)}
      </p>
    </AboutCard>
    <AboutCard cap={t(ABOUT_COPY.whoCap)} han={han('為誰')} title={t(ABOUT_COPY.whoHead)} zh={zh}>
      <p className={cn('m-0 text-[1.06rem] leading-[1.55]', zh && 'tc')}>{t(ABOUT_COPY.whoBody)}</p>
    </AboutCard>
    <AboutCard cap={t(ABOUT_COPY.howCap)} han={han('刻')} title={t(ABOUT_COPY.howHead)} zh={zh}>
      <MakingSteps steps={making} zh={zh} />
    </AboutCard>
  </AboutWhat>
);
