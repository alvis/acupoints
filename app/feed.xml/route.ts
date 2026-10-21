import { buildLocaleFeed } from '@/utilities/discovery/feed';
import { DEFAULT_LOCALE } from '@/utilities/routes';

// Legacy root feed, kept so pre-locale subscribers at /feed.xml keep working:
// it serves the same English document as /en/feed.xml. Static export only
// supports GET handlers pinned to force-static; this emits out/feed.xml at
// build time.
export const dynamic = 'force-static';

/**
 * serve the edition’s static Atom feed
 * @returns the Atom document with its feed response headers
 */
const get = async (): Promise<Response> => {
  return buildLocaleFeed(DEFAULT_LOCALE);
};

export { get as GET };
