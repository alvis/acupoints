import { buildLocaleFeed } from '@/utilities/discovery/feed';

// Static export only supports GET handlers pinned to force-static; this emits
// out/zh-cn/feed.xml at build time.
export const dynamic = 'force-static';

/**
 * serve the edition’s static Atom feed
 * @returns the Atom document with its feed response headers
 */
const get = async (): Promise<Response> => {
  return buildLocaleFeed('zh-cn');
};

export { get as GET };
