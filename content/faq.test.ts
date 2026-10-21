import { describe, expect, it } from 'vitest';

import { faqItemSchema, faqs } from './faq';

describe('faq content', () => {
  it('ships at least 8 curated items', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(8);
  });

  it('validates every item against the schema', () => {
    for (const item of faqs) {
      expect(() => faqItemSchema.parse(item)).not.toThrow();
    }
  });

  it('answers the "can acupressure replace medical treatment" question with a clear no', () => {
    const replace = faqs.find((f) => /replace medical treatment/i.test(f.question));
    expect(replace).toBeDefined();
    expect(replace?.answer.toLowerCase()).toMatch(/^no\b/);
  });

  it('does not claim acupressure works as a replacement for medical care', () => {
    const worksQ = faqs.find((f) => /does acupressure work/i.test(f.question));
    expect(worksQ).toBeDefined();
    expect(worksQ?.answer.toLowerCase()).toMatch(/complementary|not a replacement/);
  });
});
