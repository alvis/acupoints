/**
 * SSR-safe wrapper for Pagefind's client-side search.
 * Dynamically imports the build-generated bundle at runtime.
 */

export type PagefindResult = {
  id: string;
  url: string;
  meta: { title?: string; image?: string; [k: string]: unknown };
  excerpt: string;
};

type PagefindModule = {
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        url: string;
        meta: PagefindResult['meta'];
        excerpt: string;
      }>;
    }>;
  }>;
};

let cached: PagefindModule | null = null;

/**
 * Loads Pagefind lazily. Returns null if unavailable (dev, empty index, SSR).
 * @returns the cached search module, or null when its bundle is unavailable.
 */
export async function loadPagefind(): Promise<PagefindModule | null> {
  if (typeof window === 'undefined') {
    return null;
  }
  if (cached) {
    return cached;
  }

  try {
    // Emitted by the build's pagefind step; absent until a static export runs.
    const url = '/pagefind/pagefind.js';
    const mod = (await import(/* webpackIgnore: true */ url)) as unknown as PagefindModule;
    cached = mod;

    return mod;
  } catch {
    return null;
  }
}

/** Results kept after locale filtering. */
const RESULT_LIMIT = 12;

/**
 * Raw hits inspected before filtering. Every page is indexed once per locale,
 * so a locale keeps roughly a third of the hits; this window leaves headroom
 * to still fill RESULT_LIMIT without resolving the whole result set.
 */
const SCAN_WINDOW = 48;

/**
 * Runs a search and returns a flat list of result objects. Passing a locale
 * keeps only that locale's page tree, so a query never offers the reader the
 * same page three times in languages they did not ask for.
 * @param query the full-text search terms.
 * @param locale language used for text and routes.
 * @returns up to twelve resolved search hits in the requested locale.
 */
export async function search(query: string, locale?: string): Promise<PagefindResult[]> {
  const pf = await loadPagefind();
  if (!pf || !query.trim()) {
    return [];
  }

  const raw = await pf.search(query);
  const enriched = await Promise.all(
    raw.results.slice(0, locale ? SCAN_WINDOW : RESULT_LIMIT).map(async (r) => {
      const d = await r.data();

      return {
        id: r.id,
        url: d.url,
        meta: d.meta,
        excerpt: d.excerpt,
      };
    }),
  );
  if (!locale) {
    return enriched;
  }

  return enriched.filter((hit) => inLocaleTree(hit.url, locale)).slice(0, RESULT_LIMIT);
}

/**
 * Whether an indexed URL belongs to a locale's page tree.
 * @param url absolute destination.
 * @param locale language used for text and routes.
 * @returns whether the URL belongs to the requested language subtree.
 */
function inLocaleTree(url: string, locale: string): boolean {
  const path = url.startsWith('http') ? new URL(url).pathname : url;

  return path.startsWith(`/${locale}/`);
}
