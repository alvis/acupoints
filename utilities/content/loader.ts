/**
 * Server-only loader for the markdown prose triplets under content/pages/**.
 *
 * SERVER ONLY: reads authored files through fs-jetpack at build/render time
 * and is never safe to import from client components. Its filesystem dependency
 * keeps this module outside browser bundles.
 *
 * One prose module is a triplet: `<name>.en.md`, `<name>.zh-hant.md`, and one
 * shared `<name>.meta.json`. Both markdown files carry the FAQ list and
 * self-care limits in frontmatter plus the summary and anchored sections in
 * the body (first paragraph = summary; `## Heading {#stable-id}` opens each
 * section; plain paragraphs only). This module parses them back into today's
 * module shapes and validates every reconstructed value through the zod
 * factories in content/editorial/schema.ts, so the editorial policy floors
 * and screens apply unchanged. Cross-module checks: duplicate keys, spine
 * membership against content/points.ts, and caution parity against the
 * catalogue.
 */
import path from 'pathe';

import { catalogue } from '@/content/catalog';
import { editorialPointModuleSchema, makeHubModuleSchema } from '@/content/editorial/schema';
import { points } from '@/content/points';

import { armFrom, fail, parseLocaleFile, parseWith, revivedDate } from './localeFiles';
import { readProseFile } from './proseFiles';
import { PAGES_ROOT, EN_SUFFIX, ZH_HANT_SUFFIX, walk, kindForDir } from './triplets';

import type { HubKind } from '@/content/editorial/policy';
import type { EditorialHubModule, EditorialPointModule } from '@/content/editorial/schema';

import type { Triplet } from './triplets';

// --- meta -------------------------------------------------------------------

interface RawMeta {
  kind: unknown;
  key: unknown;
  authorship?: Record<string, unknown>;
  sources: unknown;
  lastReviewed: unknown;
  publishedAt?: unknown;
  updatedAt?: unknown;
  echoedDatasetCautions?: unknown;
  ogImage?: unknown;
}

/**
 * Reads and validates every prose triplet under content/pages; throws on the
 * first structural or policy fault. Pure filesystem input, synchronous by
 * construction; the async registry wraps this for future IO strategies.
 * @returns the validated point, hub, and journal documents in source order.
 */
export function loadProsePages(): {
  points: EditorialPointModule[];
  hubs: EditorialHubModule[];
  journal: Array<EditorialHubModule<'journal'>>;
} {
  const triplets = new Map<string, Triplet>();
  walk(PAGES_ROOT, triplets);

  const pointsOut: EditorialPointModule[] = [];
  const hubsOut: EditorialHubModule[] = [];
  const journalOut: Array<EditorialHubModule<'journal'>> = [];

  for (const [stem, triplet] of [...triplets.entries()].sort()) {
    appendTriplet(stem, triplet, { pointsOut, hubsOut, journalOut });
  }

  // --- cross-module checks ---------------------------------------------------

  const registryCodes = new Set(points.map((p) => p.code));
  const seenCodes = new Set<string>();
  for (const proseModule of pointsOut) {
    if (!registryCodes.has(proseModule.code)) {
      fail(proseModule.code, 'unknown point code; the registry spine owns identity.');
    }
    if (seenCodes.has(proseModule.code)) {
      fail(proseModule.code, 'duplicate point triplet.');
    }
    seenCodes.add(proseModule.code);
  }
  const cautionsByCode = new Map(catalogue.map((c) => [c.code, c.cautions]));
  for (const proseModule of pointsOut) {
    const expected = cautionsByCode.get(proseModule.code) ?? [];
    if (JSON.stringify(proseModule.echoedDatasetCautions) !== JSON.stringify(expected)) {
      fail(
        proseModule.code,
        'caution parity failure; echoedDatasetCautions must deep-equal the catalogue.',
      );
    }
  }
  const seenHubs = new Set<string>();
  for (const proseModule of [...hubsOut, ...journalOut]) {
    const key = `${proseModule.kind}/${proseModule.slug}`;
    if (seenHubs.has(key)) {
      fail(key, 'duplicate hub triplet.');
    }
    seenHubs.add(key);
  }

  return { points: pointsOut, hubs: hubsOut, journal: journalOut };
}

interface ProseCollections {
  pointsOut: EditorialPointModule[];
  hubsOut: EditorialHubModule[];
  journalOut: Array<EditorialHubModule<'journal'>>;
}

interface ValidatedMeta extends RawMeta {
  key: string;
  kind: string;
  authorship: Record<string, unknown>;
  sources: unknown[];
}
interface TripletMetadata {
  kind: HubKind | 'point';
  meta: ValidatedMeta;
}
interface LocaleDocuments {
  en: ReturnType<typeof parseLocaleFile>;
  zh: ReturnType<typeof parseLocaleFile>;
}
/**
 * read and validate one triplet's metadata before loading its prose.
 * @param stem content-relative document path.
 * @param triplet paths of the authored language and metadata files.
 * @returns validated metadata and its directory family.
 */
function readMetadata(stem: string, triplet: Triplet): TripletMetadata {
  if (!triplet.en || !triplet.zhHant || !triplet.meta) {
    fail(stem, 'incomplete triplet (need .en.md, .zh-hant.md and .meta.json).');
  }
  const kind = kindForDir(stem);
  const meta = JSON.parse(readProseFile(triplet.meta)) as RawMeta;
  if (
    typeof meta.key !== 'string' ||
    typeof meta.kind !== 'string' ||
    !Array.isArray(meta.sources)
  ) {
    fail(stem, 'meta.json misses key, kind or sources.');
  }
  if (!meta.authorship || typeof meta.authorship !== 'object') {
    fail(stem, 'meta.json authorship missing.');
  }
  if (meta.kind !== kind) {
    fail(stem, `meta kind "${meta.kind}" disagrees with directory family "${kind}".`);
  }

  return { kind, meta: meta as ValidatedMeta };
}

/**
 * load both authored languages and check their shared title.
 * @param stem content-relative document path.
 * @param triplet paths of the authored language and metadata files.
 * @param kind content family selected by the directory.
 * @returns the two authored locale documents.
 */
function readDocuments(stem: string, triplet: Triplet, kind: HubKind | 'point'): LocaleDocuments {
  const en = parseLocaleFile(readProseFile(triplet.en), EN_SUFFIX, `${stem}.en`);
  const zh = parseLocaleFile(readProseFile(triplet.zhHant), ZH_HANT_SUFFIX, `${stem}.zh-hant`);
  if ((en.title === undefined) !== (kind === 'point')) {
    fail(stem, 'hub locales carry a title; point locales do not.');
  }
  if (en.title !== zh.title) {
    fail(stem, 'locale titles disagree; the module carries exactly one title.');
  }

  return { en, zh };
}

/**
 * restore dates and the metadata shared by every prose family.
 * @param meta validated source metadata.
 * @param stem content-relative document path.
 * @returns normalized dates and common metadata.
 */
function sharedMetadata(
  meta: ReturnType<typeof readMetadata>['meta'],
  stem: string,
): SharedMetadata {
  const lastReviewed = revivedDate(meta.lastReviewed, stem, 'lastReviewed');
  if (!lastReviewed) {
    fail(stem, 'lastReviewed missing.');
  }
  const authorship = {
    ...meta.authorship,
    generatedAt: revivedDate(meta.authorship.generatedAt, stem, 'authorship.generatedAt'),
  };
  const shared = {
    key: meta.key,
    authorship,
    sources: meta.sources,
    lastReviewed,
    // meta.json stores null when a page has no bespoke card image; null
    // normalizes to absent so the site-default OG image stays the normal path.
    ogImage: typeof meta.ogImage === 'string' ? meta.ogImage : undefined,
  };

  return shared;
}

/**
 * append one validated document to its family's registry.
 * @param stem content-relative document path.
 * @param triplet paths of the authored language and metadata files.
 * @param collections destination registries.
 * @param collections.pointsOut point documents in source order.
 * @param collections.hubsOut hub documents in source order.
 * @param collections.journalOut journal documents in source order.
 */
function appendTriplet(
  stem: string,
  triplet: Triplet,
  { pointsOut, hubsOut, journalOut }: ProseCollections,
): void {
  const { kind, meta } = readMetadata(stem, triplet);
  const { en, zh } = readDocuments(stem, triplet, kind);
  const shared = sharedMetadata(meta, stem);
  if (kind === 'point') {
    pointsOut.push(
      parseWith(
        editorialPointModuleSchema,
        {
          code: shared.key,
          echoedDatasetCautions: meta.echoedDatasetCautions ?? [],
          authorship: shared.authorship,
          sources: shared.sources,
          lastReviewed: shared.lastReviewed,
          ogImage: shared.ogImage,
          en: armFrom(en),
          zh: armFrom(zh),
        },
        stem,
      ),
    );

    return;
  }

  const value = {
    slug: path.basename(stem),
    kind: meta.kind,
    title: en.title,
    publishedAt: revivedDate(meta.publishedAt, stem, 'publishedAt'),
    updatedAt: revivedDate(meta.updatedAt, stem, 'updatedAt'),
    authorship: shared.authorship,
    sources: shared.sources,
    lastReviewed: shared.lastReviewed,
    ogImage: shared.ogImage,
    en: armFrom(en),
    zh: armFrom(zh),
  };
  if (kind === 'journal') {
    journalOut.push(parseWith(makeHubModuleSchema('journal'), value, stem));
  } else {
    hubsOut.push(parseWith(makeHubModuleSchema(kind), value, stem));
  }
}

/** restored metadata used by every reconstructed prose family. */
interface SharedMetadata {
  key: unknown;
  authorship: { generatedAt: Date | undefined };
  sources: unknown;
  lastReviewed: Date;
  ogImage: string | undefined;
}
