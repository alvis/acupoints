import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Speakable } from './Speakable';

type StructuredData = Record<'@context' | '@type', string> & {
  speakable: Record<'@type', string> & { cssSelector: string[] };
};

describe('Speakable', () => {
  it('renders the paragraph with the `.speakable` class', () => {
    const { container } = render(<Speakable>Canonical one-liner.</Speakable>);
    const p = container.querySelector('p.speakable');
    expect(p).not.toBeNull();
    expect(p?.textContent).toBe('Canonical one-liner.');
  });

  it('emits the SpeakableSpecification JSON-LD by default', () => {
    const { container } = render(<Speakable>One-liner.</Speakable>);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent) as StructuredData;
    expect(data['@type']).toBe('WebPage');
    expect(data.speakable['@type']).toBe('SpeakableSpecification');
    expect(data.speakable.cssSelector).toEqual(['.speakable']);
  });

  it('suppresses the JSON-LD when `suppressJsonLd` is set', () => {
    const { container } = render(<Speakable suppressJsonLd>One-liner.</Speakable>);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeNull();
  });

  it('renders a div when `as="div"`', () => {
    const { container } = render(<Speakable as="div">Block speakable.</Speakable>);
    const div = container.querySelector('div.speakable');
    expect(div).not.toBeNull();
  });
});
