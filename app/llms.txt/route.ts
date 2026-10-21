import { buildLlmsTxt } from '@/utilities/discovery/llms-txt';
import { DEFAULT_LOCALE } from '@/utilities/routes';

// Root index kept at the conventional llmstxt.org location, so a crawler that
// only knows /llms.txt still finds one: it serves the same English document as
// /en/llms.txt and links the other locales' indexes. Static export only
// supports GET handlers pinned to force-static; this emits out/llms.txt at
// build time.
export const dynamic = 'force-static';

/**
 * serve the edition’s plain-text guide for language-model crawlers
 * @returns the crawler guide as a UTF-8 plain-text response
 */
const get = async (): Promise<Response> => {
  const text = await buildLlmsTxt(DEFAULT_LOCALE);

  return new Response(text, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};

export { get as GET };
