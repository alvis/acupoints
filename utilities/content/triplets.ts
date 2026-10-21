import jetpack from 'fs-jetpack';
import path from 'pathe';

import { fail } from './localeFiles';

import type { HubKind } from '@/content/editorial/policy';

export const PAGES_ROOT = path.resolve(process.cwd(), 'content/pages');

/** The two authored locale suffixes; `.zh-cn.md` is derived, never on disk. */
export const EN_SUFFIX = 'en';

export const ZH_HANT_SUFFIX = 'zh-hant';

// --- triplet discovery ------------------------------------------------------

export interface Triplet {
  /** Path relative to content/pages, without suffix or extension. */
  stem: string;
  en: string;
  zhHant: string;
  meta: string;
}

/**
 * collect locale triplets from the content directory tree.
 * @param dir directory to visit.
 * @param triplets collected locale documents.
 */
export function walk(dir: string, triplets: Map<string, Triplet>): void {
  const entries = jetpack.list(dir);
  if (!entries) {
    fail(dir, 'prose directory missing.');
  }
  for (const name of entries) {
    const full = path.join(dir, name);
    if (jetpack.inspect(full)?.type === 'dir') {
      walk(full, triplets);
      continue;
    }
    const rel = path.relative(PAGES_ROOT, full);
    const location = locateTripletFile(name, rel);
    if (!location) {
      continue;
    }
    const { stem, slot } = location;
    let triplet = triplets.get(stem);
    if (!triplet) {
      triplet = { stem, en: '', zhHant: '', meta: '' };
      triplets.set(stem, triplet);
    }
    triplet[slot] = full;
  }
}

/**
 * identify the prose category from its directory.
 * @param stem content-relative document path.
 * @returns the content family that owns the top-level directory.
 */
export function kindForDir(stem: string): HubKind | 'point' {
  switch (stem.split(path.sep)[0]) {
    case 'points':
      return 'point';
    case 'meridians':
      return 'meridian';
    case 'conditions':
      return 'condition';
    case 'regions':
      return 'region';
    case 'journal':
      return 'journal';
    case 'basics':
    case 'glossary':
    case 'statics':
      return 'static';
    default:
      return fail(stem, 'unknown prose family directory.');
  }
}
interface TripletLocation {
  stem: string;
  slot: 'en' | 'zhHant' | 'meta';
}
/**
 * determine which authored language or metadata slot a file occupies.
 * @param name filename to classify.
 * @param rel path relative to the content root.
 * @returns the matching triplet slot, when applicable.
 */
function locateTripletFile(name: string, rel: string): TripletLocation | undefined {
  if (name.endsWith('.zh-cn.md')) {
    fail(rel, '.zh-cn.md is derived, never authored on disk.');
  }
  const localeMatch = /\.([a-z-]+)\.md$/u.exec(name);
  const isMeta = name.endsWith('.meta.json');
  let stem: string;
  let slot: 'en' | 'zhHant' | 'meta';
  if (localeMatch) {
    stem = rel.slice(0, -localeMatch[0].length);
    if (localeMatch[1] === EN_SUFFIX) {
      slot = 'en';
    } else if (localeMatch[1] === ZH_HANT_SUFFIX) {
      slot = 'zhHant';
    } else {
      fail(rel, `unknown locale suffix "${localeMatch[1]}".`);
    }
  } else if (isMeta) {
    stem = rel.slice(0, -'.meta.json'.length);
    slot = 'meta';
  } else {
    // Prose-like strays stay hard errors; co-located non-prose assets
    // (the registry module itself) pass through untouched.
    if (name.endsWith('.md') || name.endsWith('.json')) {
      fail(rel, 'unrecognized prose file under content/pages.');
    }

    return undefined;
  }

  return { stem, slot };
}
