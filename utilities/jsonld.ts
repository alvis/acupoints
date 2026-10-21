import type { Thing } from 'schema-dts';

/**
 * Bundles an array of schema.org entities into a single `@graph` JSON-LD payload.
 * Entities should cross-reference each other by `@id`.
 * @param entities structured-data entities.
 * @returns the serialized schema.org graph with HTML-sensitive characters escaped.
 */
export function jsonLdGraph(entities: readonly Thing[]): string {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': entities,
  };

  return JSON.stringify(graph);
}
