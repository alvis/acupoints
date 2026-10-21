/**
 * Escapes text for safe inclusion in XML element content and attribute values.
 * Ampersand is replaced first so entity introducers themselves are escaped.
 * @param value the text to include in XML.
 * @returns the text with XML-sensitive characters replaced by entities.
 */
export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
