/**
 * Fills `{name}` holes in a copy template. Dependency-free so both the
 * server pages and the client islands of the conditions area can share it.
 * @param template text containing replacement slots
 * @param values values for named slots
 * @returns the template with known slots replaced
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/gu, (hole, key: string) =>
    key in values ? String(values[key]) : hole,
  );
}

/** One run of a source line: plain text, or a URL to link. */
export type LinkPart = { text: string } | { href: string; label: string };

/**
 * Splits a source line into plain text and its https URLs, each URL with a
 * readable label: percent-encoded paths are decoded so Chinese file names
 * read as characters, falling back to the raw URL when it does not decode.
 * @param text source line that may cite one or more URLs
 * @returns the line's runs in order
 */
export function linkParts(text: string): LinkPart[] {
  return text
    .split(/(https:\/\/\S+)/u)
    .filter((run) => run.length > 0)
    .map((run) => (run.startsWith('https://') ? { href: run, label: readableUrl(run) } : { text: run }));
}

/**
 * decodes a URL for display
 * @param href percent-encoded URL
 * @returns the decoded URL, or the URL itself when it is not valid encoding
 */
function readableUrl(href: string): string {
  try {
    return decodeURI(href);
  } catch {
    return href;
  }
}
