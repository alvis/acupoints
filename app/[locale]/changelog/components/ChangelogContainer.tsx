import { Speakable } from '@/components/primitives/Speakable';
import { TrustCrumbs } from '@/features/editorial/components/TrustCrumbs';
import { TrustHero } from '@/features/editorial/components/TrustHero';
import { TrustPage } from '@/features/editorial/components/TrustPage';
import { CHANGELOG_COPY, COMMON_COPY, fill, hanText, translator } from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';
import { collectChangelogEntries } from '@/utilities/discovery/changelog';
import { readChangelogCommits } from '@/utilities/discovery/changelog-git';
import { localizedRoutes } from '@/utilities/routes';

import { ChangelogLedger } from './ChangelogLedger';
import { ChangelogLegend } from './ChangelogLegend';
import { hanCount, hanDate } from './hanDate';
import { SUBJECT_ZH } from './subjectsZh';

import type { FC } from 'react';

import type { TrustCrumb } from '@/features/editorial/components/TrustCrumbs';
import type { Bilingual, HanText } from '@/features/editorial/copy';
import type { ChangelogEntry, ChangelogType } from '@/utilities/discovery/changelog';
import type { Locale } from '@/utilities/routes';

import type { LedgerColumns, LedgerMark } from './ChangelogLedger';
import type { LegendArea, LegendMark } from './ChangelogLegend';

/** Props for {@link ChangelogContainer}. */
export type ChangelogContainerProps = { locale: Locale };

/** Seal, legend meaning and screen-reader word for each kind of mark. */
const KIND: Record<
  ChangelogType,
  { seal: readonly [string, string]; meaning: Bilingual; word: Bilingual }
> = {
  feat: { seal: ['新', '刻'], meaning: CHANGELOG_COPY.feat, word: CHANGELOG_COPY.featWord },
  fix: { seal: ['補', '正'], meaning: CHANGELOG_COPY.fix, word: CHANGELOG_COPY.fixWord },
  perf: { seal: ['速', '刻'], meaning: CHANGELOG_COPY.perf, word: CHANGELOG_COPY.perfWord },
  a11y: { seal: ['便', '讀'], meaning: CHANGELOG_COPY.a11y, word: CHANGELOG_COPY.a11yWord },
};

/** Legend order of the kinds. */
const KIND_ORDER: readonly ChangelogType[] = ['feat', 'fix', 'perf', 'a11y'];

/** One-character area glyphs for commit scopes; anything else is 雜 (miscellany). */
const SCOPE_GLYPH: Record<string, string> = {
  i18n: '語',
  search: '檢',
  discovery: '索',
  seo: '名',
  content: '文',
  routes: '路',
  editorial: '編',
};

/** The board's British long date, "26 August 2026". */
const LONG_DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * 刊記 (board WbChangelog): the git-derived changelog as edition marks, one
 * carved ledger per printing date, with a legend of the seals and a tally by
 * area. Chinese pages read each subject's authored rendering from
 * SUBJECT_ZH; a subject without one prints in English, marked as such.
 * @param props locale for the page
 * @param props.locale page language and writing system
 * @returns the edition ledgers, seal legend, and area counts
 */
export const ChangelogContainer: FC<ChangelogContainerProps> = async ({ locale }) => {
  const r = localizedRoutes(locale);
  const t = translator(locale);
  const han = hanText(locale);
  const zh = locale !== 'en';
  // Generated at build time; the export freezes whatever git reports then.
  const entries = collectChangelogEntries(await readChangelogCommits());

  const crumbs: readonly TrustCrumb[] = [
    { href: r.home, zh: '首', label: t(COMMON_COPY.home) },
    { zh: '刊記', label: t(CHANGELOG_COPY.cap) },
  ];
  const marks = entries.map((entry, index) =>
    toMark(entry, entries.length - index, { t, han, zh }),
  );
  const legendMarks: readonly LegendMark[] = KIND_ORDER.map((type) => ({
    seal: sealFor(type, han),
    meaning: t(KIND[type].meaning),
    count: entries.filter((entry) => entry.type === type).length,
  })).filter((mark) => mark.count > 0);
  const areas = tallyAreas(entries, han);
  const columns: LedgerColumns = {
    edition: t(CHANGELOG_COPY.colEdition),
    date: t(CHANGELOG_COPY.colDate),
    area: t(CHANGELOG_COPY.colArea),
    change: t(CHANGELOG_COPY.colChange),
  };
  const printings = groupByDate(marks);
  const lead = (
    <Speakable
      as="p"
      className={cn(
        `
          m-0 max-w-[600px] text-[1.15rem] leading-normal text-ink-soft
          not-italic
          sm:text-[1.25rem]
        `,
        zh && 'tc',
      )}>
      {t(CHANGELOG_COPY.lead)}
    </Speakable>
  );

  return (
    <TrustPage>
      <TrustCrumbs aria-label={t(COMMON_COPY.breadcrumb)} items={crumbs} zh={zh} />
      <div data-pagefind-body>
        <TrustHero
          aside={
            entries.length > 0 ? (
              <ChangelogLegend
                areas={areas}
                byArea={t(CHANGELOG_COPY.byArea)}
                editionNote={t(CHANGELOG_COPY.legendEdition)}
                marks={legendMarks}
                title={t(CHANGELOG_COPY.legendTitle)}
                zh={zh}
              />
            ) : undefined
          }
          cap={t(CHANGELOG_COPY.cap)}
          capZh={han('刊記')}
          lead={lead}
          title={t(CHANGELOG_COPY.title)}
          vertical={han('刊記')}
          zh={zh}
        />
        {printings.length === 0 ? (
          <p className={cn('mt-10 text-ink-soft', zh && `tc`)}>{t(CHANGELOG_COPY.empty)}</p>
        ) : (
          printings.map((printing) => (
            <ChangelogLedger
              columns={columns}
              countLabel={fill(t(CHANGELOG_COPY.marks), {
                n: zh ? hanCount(printing.marks.length) : printing.marks.length,
              })}
              dateHan={hanDate(printing.date)}
              dateLabel={zh ? undefined : LONG_DATE.format(new Date(printing.date))}
              id={`printing-${printing.date}`}
              key={printing.date}
              listLabel={t(CHANGELOG_COPY.ledgerLabel)}
              marks={printing.marks}
              recordMark={han('記')}
              stripTitle={han('經穴圖 · 刊記')}
              zh={zh}
            />
          ))
        )}
        <p
          className={cn(
            `mx-1.5 mt-[22px] mb-0 max-w-[900px] text-base/normal text-ink-soft`,
            zh && 'tc',
          )}>
          {t(CHANGELOG_COPY.footnote)}{' '}
          <a className="underline underline-offset-4" href="mailto:editorial@acupoints.com">
            editorial@acupoints.com
          </a>
        </p>
      </div>
    </TrustPage>
  );
};

/** The page's resolvers, shared by every mark. */
interface MarkContext {
  t: (text: Bilingual) => string;
  han: HanText;
  zh: boolean;
}

/**
 * prepare a commit for its edition ledger row
 * @param entry parsed commit and its change metadata
 * @param edition ordinal counted from the oldest commit
 * @param props locale for the page
 * @param props.t resolver for bilingual ledger labels
 * @param props.han converter for Han text in the page script
 * @param props.zh whether the edition uses Chinese labels
 * @returns the localized ledger row for the commit
 */
function toMark(entry: ChangelogEntry, edition: number, { t, han, zh }: MarkContext): LedgerMark {
  const kind = KIND[entry.type];
  const rendered = zh ? SUBJECT_ZH[entry.subject] : undefined;

  return {
    id: entry.hash,
    edition,
    editionHan: `第${hanCount(edition)}版`,
    date: entry.date,
    seal: sealFor(entry.type, han),
    kindWord: t(kind.word),
    correction: entry.type === 'fix',
    scope: entry.scope,
    scopeGlyph: han(
      (entry.scope === '' ? undefined : entry.scope ? SCOPE_GLYPH[entry.scope] : undefined) ?? '雜',
    ),
    subject: rendered === undefined ? entry.subject : han(rendered),
    subjectLang: zh && rendered === undefined ? 'en' : undefined,
    breaking: entry.breaking ? t(CHANGELOG_COPY.breaking) : undefined,
  };
}

/**
 * A kind's two seal characters in the page's script.
 * @param type kind of change recorded
 * @param han converter for Han text in the page script
 * @returns the upper and lower seal characters in the page script
 */
function sealFor(type: ChangelogType, han: HanText): readonly [string, string] {
  const [top, bottom] = KIND[type].seal;

  return [han(top), han(bottom)];
}

/**
 * count changes per commit scope
 * @param entries records in display order
 * @param han converter for Han text in the page script
 * @returns area counts sorted by frequency, then scope name
 */
function tallyAreas(entries: readonly ChangelogEntry[], han: HanText): LegendArea[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    const scope = entry.scope ?? '—';
    counts.set(scope, (counts.get(scope) ?? 0) + 1);
  }

  return [...counts]
    .map(([scope, count]) => ({ scope, count, glyph: han(SCOPE_GLYPH[scope] ?? '雜') }))
    .sort((a, b) => b.count - a.count || a.scope.localeCompare(b.scope));
}

type Printing = { date: string; marks: LedgerMark[] };

/**
 * gather consecutive edition marks into dated printings
 * @param marks edition marks in chronological display order
 * @returns dated groups preserving the edition mark order
 */
function groupByDate(marks: readonly LedgerMark[]): Printing[] {
  const printings: Printing[] = [];
  for (const mark of marks) {
    const last = printings.at(-1);
    if (last?.date === mark.date) {
      last.marks.push(mark);
    } else {
      printings.push({ date: mark.date, marks: [mark] });
    }
  }

  return printings;
}
