import type { Locale } from '@/utilities/routes';
/** Props for the page renderer. */
export type LearnHubProps = {
  locale: Locale;
};

export type Stop = {
  slug: string;
  zh: string;
  title: string;
  line: string;
  minutes: number;
  sections: number;
  href: string;
};

export type Routine = {
  slug: string;
  tag?: string;
  title: string;
  href: string;
  codes: string;
};

/** Guides the routines aside walks through until the timed sets land. */
export const ROUTINE_SLUGS = [
  'tension-headache-toolkit',
  'wind-down-for-sleep',
  'cycle-comfort-routine',
  'motion-sickness-on-the-road',
];
