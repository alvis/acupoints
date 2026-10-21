import { describe, expect, it } from 'vitest';

import { glossary, glossaryBySlug } from './glossary';

describe('glossary content', () => {
  it('contains the three seed entries migrated from app/glossary/[term]/page.tsx', () => {
    expect(glossary.map((g) => g.slug)).toEqual(['de-qi', 'yuan-source', 'cun']);
  });

  it('preserves the de-qi oneLiner verbatim', () => {
    expect(glossaryBySlug('de-qi')?.oneLiner).toBe(
      'De qi (得氣) is the dull, heavy, or radiating sensation that signals a classical acupoint has been correctly located.',
    );
  });

  it('preserves the yuan-source oneLiner verbatim', () => {
    expect(glossaryBySlug('yuan-source')?.oneLiner).toBe(
      'A yuan-source point is a classical “origin” point on each primary meridian, used to reach the organ it governs.',
    );
  });

  it('preserves the cun oneLiner verbatim', () => {
    expect(glossaryBySlug('cun')?.oneLiner).toBe(
      'Cun (寸) is a body-proportional unit of measurement used to locate acupoints, roughly the width of the patient’s own thumb at the knuckle.',
    );
  });

  it('adds an opener to de-qi as a proof-of-pattern', () => {
    expect(glossaryBySlug('de-qi')?.opener).toBeDefined();
  });
});
