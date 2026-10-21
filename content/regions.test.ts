import { describe, expect, it } from 'vitest';

import { points } from './points';
import { layoutPointsForRegion, orderedRegionSlugs, regionBySlug, regions } from './regions';

describe('regions content', () => {
  it('exposes exactly 10 region descriptors', () => {
    expect(regions).toHaveLength(10);
    expect(orderedRegionSlugs).toHaveLength(10);
  });

  it('exposes layouts for the 7 regions shipped in Phase 3b', () => {
    const withLayout = regions.filter((r) => r.layout).map((r) => r.slug);
    expect(withLayout).toEqual(['head', 'neck', 'shoulder', 'back', 'hand', 'leg', 'foot']);
  });

  it('defers layouts for chest, arm, and ear to a later phase', () => {
    for (const slug of ['chest', 'arm', 'ear'] as const) {
      expect(regionBySlug(slug)?.layout).toBeUndefined();
    }
  });
});

describe('layoutPointsForRegion', () => {
  it('returns undefined when a region has no layout', () => {
    expect(layoutPointsForRegion('chest', points)).toBeUndefined();
  });

  it('resolves the hand layout with LI4 present', () => {
    const resolved = layoutPointsForRegion('hand', points);
    expect(resolved).toBeDefined();
    const li4 = resolved?.points.find((p) => p.code === 'LI4');
    expect(li4).toMatchObject({ code: 'LI4', x: 50, y: 60, active: true });
  });

  it('surfaces the hand base template on the resolved hand layout', () => {
    const resolved = layoutPointsForRegion('hand', points);
    expect(resolved?.baseTemplate).toBe('hand');
  });

  it('leaves baseTemplate undefined for regions without a matching template', () => {
    const resolved = layoutPointsForRegion('neck', points);
    expect(resolved?.baseTemplate).toBeUndefined();
  });

  it('marks only the first resolved point as active per region', () => {
    const resolved = layoutPointsForRegion('hand', points);
    const actives = resolved?.points.filter((p) => p.active) ?? [];
    expect(actives).toHaveLength(1);
    expect(actives[0]?.code).toBe('LI4');
  });

  it('drops layout entries whose code is missing from the point set', () => {
    const resolved = layoutPointsForRegion('hand', [points[0]]);
    expect(resolved?.points.map((p) => p.code)).toEqual(['LI4']);
  });
});
