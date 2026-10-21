/** Server-only git access for the build-time changelog. */
import gitlog from 'gitlog';

import { CHANGELOG_ENTRY_LIMIT } from './changelog';

import type { ChangelogCommit } from './changelog';

const GIT_DATE_LENGTH = 'YYYY-MM-DD'.length;

/**
 * Reads recent conventional commits from git, newest first. Returns an empty
 * list when git is unavailable (tarball builds have no .git) so the static
 * export never fails on changelog generation.
 * @returns the recent commit records in git order.
 */
export async function readChangelogCommits(): Promise<ChangelogCommit[]> {
  try {
    const commits = await gitlog({
      repo: process.cwd(),
      number: CHANGELOG_ENTRY_LIMIT,
      fields: ['abbrevHash', 'authorDate', 'subject'],
      nameStatus: false,
    });

    return commits.map(({ abbrevHash, authorDate, subject }) => ({
      hash: abbrevHash,
      date: authorDate.slice(0, GIT_DATE_LENGTH),
      subject,
    }));
  } catch {
    return [];
  }
}
