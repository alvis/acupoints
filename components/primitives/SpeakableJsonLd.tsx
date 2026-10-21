/**
 * JSON-LD companion for `<Speakable>` — emits the `SpeakableSpecification`
 * selector that satisfies Google's speakable-markup requirement (GEO §10).
 *
 * Rendered as a standalone `WebPage` entity so it is valid whether or not the
 * page emits a larger `@graph` of its own. The selector is kept in a single
 * place so adding a second speakable region site-wide is a one-line change.
 */

import type { FC } from 'react';

/** The CSS selector shared by `<Speakable>` and this JSON-LD payload. */
export const SPEAKABLE_SELECTOR = '.speakable';

const PAYLOAD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'speakable': {
    '@type': 'SpeakableSpecification',
    'cssSelector': [SPEAKABLE_SELECTOR],
  },
} as const;

const PAYLOAD_HTML = { __html: JSON.stringify(PAYLOAD) };

/**
 * Emits a `<script type="application/ld+json">` describing the page's
 * `.speakable` region. Server-renderable (no hooks, no client state) so it
 * stays inside the static HTML.
 */
export const SpeakableJsonLd: FC = () => {
  return <script dangerouslySetInnerHTML={PAYLOAD_HTML} type="application/ld+json" />;
};
