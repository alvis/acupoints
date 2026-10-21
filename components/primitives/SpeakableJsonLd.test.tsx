import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SPEAKABLE_SELECTOR, SpeakableJsonLd } from './SpeakableJsonLd';

type StructuredData = Record<'@context' | '@type', string> & {
  speakable: Record<'@type', string> & { cssSelector: string[] };
};

describe('SpeakableJsonLd', () => {
  it('exports the shared `.speakable` selector', () => {
    expect(SPEAKABLE_SELECTOR).toBe('.speakable');
  });

  it('emits a SpeakableSpecification JSON-LD payload', () => {
    const { container } = render(<SpeakableJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent) as StructuredData;
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('WebPage');
    expect(data.speakable['@type']).toBe('SpeakableSpecification');
    expect(data.speakable.cssSelector).toEqual([SPEAKABLE_SELECTOR]);
  });
});
