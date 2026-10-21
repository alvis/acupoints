import { LearnHubBody } from './LearnHubBody';

import type { FC } from 'react';

import type { LearnHubProps } from './LearnHubDetails';

export type { LearnHubProps } from './LearnHubDetails';

/**
 * render the localized learning hub
 * @param props page language
 * @param props.locale page language and writing system
 * @returns the basics route and reference shelves
 */
export const LearnHub: FC<LearnHubProps> = ({ locale }) => <LearnHubBody locale={locale} />;
