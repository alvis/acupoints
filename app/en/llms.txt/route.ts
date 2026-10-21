import { buildLlmsTxt } from '@/utilities/discovery/llms-txt';

// Static export only supports GET handlers pinned to force-static; this emits
// out/en/llms.txt at build time.
export const dynamic = 'force-static';

/**
 * serve the edition’s plain-text guide for language-model crawlers
 * @returns the crawler guide as a UTF-8 plain-text response
 */
const get = async (): Promise<Response> => {
  const text = await buildLlmsTxt('en');

  return new Response(text, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};

export { get as GET };
