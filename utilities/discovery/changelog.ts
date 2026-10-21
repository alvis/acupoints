/** Commit types surfaced on the public changelog; everything else stays internal. */
const CHANGELOG_TYPES = ['feat', 'fix', 'perf', 'a11y'] as const;

export type ChangelogType = (typeof CHANGELOG_TYPES)[number];

/** Maximum number of entries rendered on the changelog page and read from git. */
export const CHANGELOG_ENTRY_LIMIT = 30;

/** One raw git-log record, newest first, exactly as the git adapter emits it. */
export interface ChangelogCommit {
  hash: string;
  /** Short date (YYYY-MM-DD) of the commit. */
  date: string;
  subject: string;
}

export interface ChangelogEntry {
  hash: string;
  date: string;
  type: ChangelogType;
  scope?: string;
  subject: string;
  /** True when the subject carries the conventional breaking-change `!` marker. */
  breaking?: boolean;
}

const CONVENTIONAL_SUBJECT_PATTERN = /^([a-z][a-z0-9]*)(?:\(([^)]+)\))?(!)?: (.+)$/u;

interface ParsedSubject {
  type: string;
  scope?: string;
  subject: string;
  breaking?: boolean;
}

/**
 * Filters conventional commits down to user-facing changelog entries. Input
 * order (newest first, as `git log` emits it) is preserved; dates are not
 * re-sorted. Non-conventional subjects and internal commit types drop out.
 * @param commits the newest-first commit records to screen.
 * @param options the changelog entry limit.
 * @param options.limit the maximum number of public changelog entries.
 * @returns the newest eligible commits, up to the requested limit.
 */
export function collectChangelogEntries(
  commits: readonly ChangelogCommit[],
  options?: { limit?: number },
): ChangelogEntry[] {
  const limit = options?.limit ?? CHANGELOG_ENTRY_LIMIT;
  const entries: ChangelogEntry[] = [];
  for (const commit of commits) {
    if (entries.length >= limit) {
      break;
    }
    const parsed = parseSubject(commit.subject);
    if (!parsed || !isChangelogType(parsed.type)) {
      continue;
    }
    entries.push({
      hash: commit.hash,
      date: commit.date,
      type: parsed.type,
      scope: parsed.scope,
      subject: parsed.subject,
      breaking: parsed.breaking,
    });
  }

  return entries;
}

/**
 * read a conventional commit heading.
 * @param subject the commit subject to parse.
 * @returns the conventional commit fields, or undefined for an unmatched subject.
 */
function parseSubject(subject: string): ParsedSubject | undefined {
  const match = CONVENTIONAL_SUBJECT_PATTERN.exec(subject);
  if (!match) {
    return undefined;
  }
  const [, type, scope, bang, body] = match;

  return { type, scope: scope || undefined, subject: body, breaking: bang ? true : undefined };
}

/**
 * check whether a commit category belongs in the printing record.
 * @param value the conventional commit category.
 * @returns whether the commit category appears in the public printing record.
 */
function isChangelogType(value: string): value is ChangelogType {
  return (CHANGELOG_TYPES as readonly string[]).includes(value);
}
