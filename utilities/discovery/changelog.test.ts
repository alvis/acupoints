import { describe, expect, it } from 'vitest';

import { CHANGELOG_ENTRY_LIMIT, collectChangelogEntries } from './changelog';

import type { ChangelogCommit } from './changelog';

const FIXTURE_COMMITS: ChangelogCommit[] = [
  {
    hash: 'aaa1111',
    date: '2026-08-20',
    subject: 'feat(regions): render base template SVG behind explorable map',
  },
  { hash: 'bbb2222', date: '2026-08-19', subject: 'fix(a11y): resolve heading order' },
  {
    hash: 'ccc3333',
    date: '2026-08-18',
    subject: 'perf(bundle): remove framer-motion in favor of CSS keyframes',
  },
  { hash: 'ddd4444', date: '2026-08-17', subject: 'a11y: raise contrast on micro labels' },
  { hash: 'eee5555', date: '2026-08-16', subject: 'chore(deps): bump zod' },
  { hash: 'fff6666', date: '2026-08-15', subject: 'docs: expand about page' },
  { hash: 'ggg7777', date: '2026-08-14', subject: 'merge branch into main' },
  {
    hash: 'hhh8888',
    date: '2026-08-13',
    subject: 'fix(footer)!: swap next/link for plain anchors on asset links',
  },
];

describe('collectChangelogEntries', () => {
  it('keeps only feat, fix, perf, and a11y commits', () => {
    const types = collectChangelogEntries(FIXTURE_COMMITS).map((entry) => entry.type);
    expect(types).toEqual(['feat', 'fix', 'perf', 'a11y', 'fix']);
  });

  it('parses type, scope, and subject from conventional subjects', () => {
    const entries = collectChangelogEntries(FIXTURE_COMMITS);
    expect(entries[0]).toMatchObject({
      hash: 'aaa1111',
      date: '2026-08-20',
      type: 'feat',
      scope: 'regions',
      subject: 'render base template SVG behind explorable map',
    });
  });

  it('leaves scope undefined for unscoped conventional subjects', () => {
    const entries = collectChangelogEntries(FIXTURE_COMMITS);
    const unscoped = entries.find((entry) => entry.hash === 'ddd4444');
    expect(unscoped).toMatchObject({ type: 'a11y', subject: 'raise contrast on micro labels' });
    expect(unscoped?.scope).toBeUndefined();
  });

  it('preserves newest-first input order', () => {
    const hashes = collectChangelogEntries(FIXTURE_COMMITS).map((entry) => entry.hash);
    expect(hashes).toEqual(['aaa1111', 'bbb2222', 'ccc3333', 'ddd4444', 'hhh8888']);
  });

  it('keeps breaking-change subjects and flags them', () => {
    const breaking = collectChangelogEntries(FIXTURE_COMMITS).find(
      (entry) => entry.hash === 'hhh8888',
    );
    expect(breaking).toMatchObject({
      type: 'fix',
      scope: 'footer',
      subject: 'swap next/link for plain anchors on asset links',
    });
    expect(breaking?.breaking).toBe(true);
  });

  it('caps output at the requested limit', () => {
    const entries = collectChangelogEntries(FIXTURE_COMMITS, { limit: 2 });
    expect(entries).toHaveLength(2);
    expect(entries[0]?.hash).toBe('aaa1111');
  });

  it('defaults the limit to the published changelog cap', () => {
    const padded: ChangelogCommit[] = Array.from({ length: CHANGELOG_ENTRY_LIMIT + 5 }, (_, i) => ({
      hash: `h${i}`,
      date: '2026-08-01',
      subject: `feat(test): entry ${i}`,
    }));
    expect(collectChangelogEntries(padded)).toHaveLength(CHANGELOG_ENTRY_LIMIT);
  });

  it('returns nothing when history is empty, as in git-less builds', () => {
    expect(collectChangelogEntries([])).toEqual([]);
  });

  it('drops subjects that do not follow conventional-commit syntax', () => {
    const hashes = collectChangelogEntries(FIXTURE_COMMITS).map((entry) => entry.hash);
    expect(hashes).not.toContain('ggg7777');
  });
});
