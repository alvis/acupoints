import { withLocale } from '@/utilities/routes';

import type { Locale } from '@/utilities/routes';

/**
 * A run of plain text, or a link lifted out of trusted inline HTML. `at` is
 * the segment's offset in the source, a stable render key.
 */
export type InlineSegment =
  | { kind: 'text'; at: number; text: string }
  | { kind: 'link'; at: number; text: string; href: string };

const ANCHOR = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gu;

/**
 * Splits trusted inline HTML (the FAQ answers) into text and link segments so
 * they render as React nodes rather than raw markup. Site-relative hrefs gain
 * the reader's locale prefix; any other tag is stripped to its text.
 * @param html trusted inline markup
 * @param locale language used for links and copy
 * @returns plain-text and localized-link segments in source order
 */
export function parseInlineLinks(html: string, locale: Locale): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let cursor = 0;
  for (const match of html.matchAll(ANCHOR)) {
    const [whole, href, label] = match;
    pushText(segments, html.slice(cursor, match.index), cursor);
    segments.push({
      kind: 'link',
      at: match.index,
      text: stripTags(label),
      href: localizeHref(href, locale),
    });
    cursor = match.index + whole.length;
  }
  pushText(segments, html.slice(cursor), cursor);

  return segments;
}

/**
 * Plain-text reading of the same HTML, for JSON-LD and other text-only sinks.
 * @param html trusted inline markup
 * @returns the source text with every complete tag removed
 */
export function stripTags(html: string): string {
  let result = '';
  let cursor = 0;
  while (cursor < html.length) {
    const start = html.indexOf('<', cursor);
    if (start < 0) {
      return result + html.slice(cursor);
    }
    const end = html.indexOf('>', start);
    if (end < 0) {
      return result + html.slice(cursor);
    }
    result += html.slice(cursor, start);
    cursor = end + 1;
  }

  return result;
}

/**
 * append a nonempty plain-text segment after stripping markup.
 * @param segments output segments collected so far
 * @param raw unprocessed text segment
 * @param at offset in the source string
 */
function pushText(segments: InlineSegment[], raw: string, at: number): void {
  const text = stripTags(raw);
  if (text) {
    segments.push({ kind: 'text', at, text });
  }
}

/**
 * add the reading locale and trailing slash to internal links.
 * @param href destination to localize
 * @param locale language used for links and copy
 * @returns the locale-prefixed internal path with a trailing slash, or the unchanged external href
 */
function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return href;
  }
  const path = withLocale(locale, href);

  return path.endsWith('/') ? path : `${path}/`;
}
