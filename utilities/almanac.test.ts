import { describe, expect, it } from 'vitest';

import { getAlmanacEntry, getSolarTermForDate } from './almanac';

describe('almanac', () => {
  it('returns Grain Rain (谷雨) for 2026-04-20', () => {
    const term = getSolarTermForDate(new Date('2026-04-20T12:00:00Z'));
    expect(term.latin).toBe('Grain Rain');
    expect(term.cjk).toBe('谷雨');
  });

  it('returns Qingming (清明) for 2026-04-05', () => {
    const term = getSolarTermForDate(new Date('2026-04-05T12:00:00Z'));
    expect(term.cjk).toBe('清明');
  });

  it('returns a full almanac entry with point + ritual', () => {
    const entry = getAlmanacEntry(new Date('2026-04-21T12:00:00Z'));
    expect(entry.solarTerm.cjk).toBe('谷雨');
    expect(entry.pointCode).toBeTruthy();
    expect(entry.ritual.length).toBeGreaterThan(0);
  });
});
