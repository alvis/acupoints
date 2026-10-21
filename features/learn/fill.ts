/**
 * Template filling for Learn chrome strings. Dependency-free so client
 * islands can format their labels without pulling in the locale tables.
 */

/**
 * Fills `{name}` slots in a copy template; unknown slots stay as written.
 * @param template text containing replacement slots
 * @param values values for named slots
 * @returns the template with known slots replaced
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/gu, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}
