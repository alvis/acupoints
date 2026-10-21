import { jsonLdGraph } from '@/utilities/jsonld';

import type { ComponentPropsWithoutRef, FC } from 'react';
import type { Thing } from 'schema-dts';

/** Props for {@link JsonLd}. */
export type JsonLdProps = {
  entities: readonly Thing[];
};

/**
 * Emits one <script type="application/ld+json"> carrying the page's `@graph`.
 * @param props the page structured-data script.
 * @param props.entities structured-data entities.
 */
export const JsonLd: FC<JsonLdProps> = ({ entities }) => {
  return <script dangerouslySetInnerHTML={graphMarkup(entities)} type="application/ld+json" />;
};

/**
 * serialize graph entities for a script element.
 * @param entities structured-data entities.
 * @returns the serialized graph wrapped for a script's inner HTML.
 */
function graphMarkup(
  entities: readonly Thing[],
): NonNullable<ComponentPropsWithoutRef<'script'>['dangerouslySetInnerHTML']> {
  return { __html: jsonLdGraph(entities) };
}
