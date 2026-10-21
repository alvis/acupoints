/**
 * Async registry over the markdown prose triplets (content/pages/**).
 *
 * Stage 2 of the migration flips importer pages from the authored TS
 * registries to this module; until then both sources coexist and the parity
 * audit proves they agree. The registry is promise-based so PRO04 can thread
 * awaits through page entry points without reshaping call sites again.
 */

import { loadProsePages } from '@/utilities/content/loader';

import type { EditorialHubModule, EditorialPointModule } from '@/content/editorial/schema';

export interface ProseRegistry {
  /** Point modules keyed by spine code; mirrors allEditorialModules(). */
  points: readonly EditorialPointModule[];
  /** Hub modules across meridian/condition/region/static tiers. */
  hubs: readonly EditorialHubModule[];
  /** Journal-tier modules; mirrors content/journal journalPosts. */
  journal: ReadonlyArray<EditorialHubModule<'journal'>>;
  pointByCode(code: string): EditorialPointModule | undefined;
  hub(kind: string, slug: string): EditorialHubModule | undefined;
}

let cached: Promise<ProseRegistry> | undefined;

/**
 * assemble the indexed prose registry from local documents.
 * @returns the prose registry with point, hub, and journal lookup indexes.
 */
function build(): ProseRegistry {
  const loaded = loadProsePages();
  const byCode = new Map(loaded.points.map((m) => [m.code.toUpperCase(), m]));
  const hubByKey = new Map(
    [...loaded.hubs, ...loaded.journal].map((m) => [`${m.kind}/${m.slug}`, m]),
  );

  return {
    points: loaded.points,
    hubs: loaded.hubs,
    journal: loaded.journal,
    pointByCode: (code) => byCode.get(code.toUpperCase()),
    hub: (kind, slug) => hubByKey.get(`${kind}/${slug}`),
  };
}

/**
 * Loads and memoizes the whole prose registry. Subsequent calls in one
 * server process reuse the same parsed instance.
 * @returns the memoized parsed prose registry.
 */
export async function loadProseRegistry(): Promise<ProseRegistry> {
  cached ??= Promise.resolve().then(build);

  return cached;
}
