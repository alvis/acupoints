import { loadProseRegistry } from '@/content/pages';
import { isForthcoming, journalTag, learnTitle, publishedOn } from '@/features/learn/content';
import { localizedRoutes } from '@/utilities/routes';

import { JournalPostBody } from './JournalPostBody';

import type { FC } from 'react';

import type { JournalPostProps, Neighbour } from './JournalPostDetails';

export type { JournalPostProps } from './JournalPostDetails';

/**
 * A journal guide, as the Journal board sets it: the title with its Han tag
 * and a figure (the hand-measure switcher for the cun guide, the first named
 * point's plate otherwise), the parts as numbered rows with a side column,
 * the stop box, questions, sources, related leaves and the neighbouring guides.
 * @param props locale and entry identity for the page
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @returns the journal guide with figures, numbered parts, and references
 */
export const JournalPost: FC<JournalPostProps> = async ({ locale, slug }) => {
  const r = localizedRoutes(locale);
  const registry = await loadProseRegistry();
  const post = registry.journal.find((p) => p.slug === slug);
  if (!post) {
    return null;
  }

  const now = new Date();
  const timeline = registry.journal
    .filter((p) => !isForthcoming(p, now))
    .sort((a, b) => publishedOn(a).getTime() - publishedOn(b).getTime());
  const at = timeline.findIndex((p) => p.slug === slug);
  const neighbour = (offset: number): Neighbour | undefined => {
    const other = at < 0 ? undefined : timeline[at + offset];
    if (!other) {
      return undefined;
    }

    return {
      title: learnTitle(`journal/${other.slug}`, other.title, locale),
      tag: journalTag(other.slug, locale),
      href: r.journalPost(other.slug),
    };
  };
  const older = neighbour(-1);
  const newer = neighbour(1);

  return <JournalPostBody {...{ locale, slug, post, older, newer }} />;
};
