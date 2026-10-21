/**
 * Fills `{key}` placeholders in a chrome template; unknown keys stay as written.
 * @param template text containing replacement slots
 * @param values values for named slots
 * @returns the template with known slots replaced
 */
export function fill(template: string, values: Readonly<Record<string, string | number>>): string {
  return template.replace(/\{(\w+)\}/gu, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

/**
 * Lowercase, toneless, space-free form used to match a leaf against a search.
 * @param value search phrase
 * @returns the lowercase phrase without tones or spacing
 */
export function normaliseSearch(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/gu, '').toLowerCase();
}
