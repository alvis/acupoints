import Link from 'next/link';

import { loadProseRegistry } from '@/content/pages';
import { isForthcoming, learnTitle, newestFirst } from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { journalRow } from '@/features/learn/journalRows';
import { localizedRoutes } from '@/utilities/routes';

import { JournalIndexBody } from './JournalIndexBody';

import type { FC } from 'react';

import type { FactRow } from '@/features/learn/components/FactList';

import type { JournalIndexProps } from './JournalIndexDetails';

export type { JournalIndexProps } from './JournalIndexDetails';

/**
 * The journal index in the Woodblock hub's language: a 日誌 cartouche and
 * facts, then the same two-column guide list the Learn hub sets, newest
 * first with forthcoming guides on the block at the end.
 * @param props locale for the page
 * @param props.locale page language and writing system
 * @returns the journal hero and guide list
 */
export const JournalIndex: FC<JournalIndexProps> = async ({ locale }) => {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const now = new Date();
  const posts = newestFirst((await loadProseRegistry()).journal);
  const published = posts.filter((p) => !isForthcoming(p, now));
  const forthcoming = posts.filter((p) => isForthcoming(p, now));
  const rows = [
    ...published.map((p) => journalRow(p, { locale, copy, forthcoming: false })),
    ...forthcoming.map((p) => journalRow(p, { locale, copy, forthcoming: true })),
  ];
  const newest = published.at(0);

  const crumbs = [
    { href: r.basics, label: copy.learn, zh: english ? copy.learnHan : undefined },
    { href: r.journal, label: copy.journal, zh: english ? copy.journalHan : undefined },
  ];
  const facts: FactRow[] = [
    {
      term: copy.statGuides,
      value:
        fill(copy.statGuidesValue, { n: published.length }) +
        (forthcoming.length > 0 ? fill(copy.statForthcoming, { m: forthcoming.length }) : ''),
    },
    ...(newest
      ? [
          {
            term: copy.statNewest,
            value: (
              <Link className="wb-link" href={r.journalPost(newest.slug)}>
                {learnTitle(`journal/${newest.slug}`, newest.title, locale)}
              </Link>
            ),
          },
        ]
      : []),
    { term: copy.statPace, value: copy.statPaceValue },
  ];

  return <JournalIndexBody {...{ locale, copy, r, rows, newest, crumbs, facts }} />;
};
