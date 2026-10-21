import { buildSitemapEntries } from '@/utilities/discovery/sitemap';

import type { MetadataRoute } from 'next';

// Static export requires static generation to be pinned explicitly, even on
// metadata routes; this emits out/sitemap.xml at build time.
export const dynamic = 'force-static';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  return buildSitemapEntries();
};

export default sitemap;
