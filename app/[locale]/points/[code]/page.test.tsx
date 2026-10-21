import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { isCataloguePoint } from '@/content/catalog';
import { leafCardByCode } from '@/content/leaves';
import { loadProseRegistry } from '@/content/pages';
import { pointByCode } from '@/content/points';

import { PointLeafContainer } from './components/PointLeafContainer';

// SC-4 audit set: the four point pages named in the llm-search-uplift brief.
// Expectations branch on whether an editorial module already owns the page's
// prose (registry spine keeps identity either way).
const auditedCodes = ['LI4', 'ST36', 'LV3', 'HT7'] as const;

const collapse = (value: string): string => value.replace(/\s+/gu, ' ').trim();

const countOccurrences = (haystack: string, needle: string): number =>
  haystack.split(needle).length - 1;

// User-visible text only: JSON-LD scripts repeat facts as structured data,
// which is metadata rather than a duplicated statement on the page.
const visibleText = (container: HTMLElement): string => {
  const clone = container.cloneNode(true);
  if (!(clone instanceof HTMLElement)) {
    return '';
  }
  for (const script of clone.querySelectorAll('script')) {
    script.remove();
  }

  return collapse((clone as Node).textContent ?? '');
};

const renderedText = async (code: string): Promise<string> => {
  const element = await PointLeafContainer({ locale: 'en', code });
  const { container } = render(element);

  return visibleText(container);
};

type JsonLdEntity = Record<'@type', string> &
  Partial<Record<'@id', string>> & { mainEntity?: unknown[] };

describe('Point page fact de-duplication', () => {
  it.each(auditedCodes)('should state the hero summary exactly once on %s', async (code) => {
    const point = pointByCode(code);
    if (!point) {
      throw new Error(`missing fixture point ${code}`);
    }
    // Once an editorial module registers, its summary is the hero and the
    // spine's fixture one-liner retires to metadata (description/JSON-LD).
    const ed = (await loadProseRegistry()).pointByCode(code);
    const hero = ed ? ed.en.summary : point.canonicalOneLiner;
    const text = await renderedText(code);

    expect(countOccurrences(text, collapse(hero))).toBe(1);
    if (ed) {
      expect(countOccurrences(text, collapse(point.canonicalOneLiner))).toBe(0);
    }
  });

  it.each(auditedCodes)('should state each location step exactly once on %s', async (code) => {
    const point = pointByCode(code);
    if (!point || isCataloguePoint(point)) {
      throw new Error(`editorial fixture missing: ${code}`);
    }
    const text = await renderedText(code);

    // Fixture how-to-find steps render only in the legacy branch; an
    // editorial module replaces them wholesale with its own location prose.
    const expected = (await loadProseRegistry()).pointByCode(code) ? 0 : 1;
    for (const step of point.howToFind) {
      expect(countOccurrences(text, collapse(step))).toBe(expected);
    }
  });

  it.each(auditedCodes)(
    'should render exactly one safety note and one FAQ block on %s',
    async (code) => {
      const element = await PointLeafContainer({ locale: 'en', code });
      const { container } = render(element);

      const ed = (await loadProseRegistry()).pointByCode(code);
      if (!ed) {
        expect(container.querySelectorAll('[role="note"]')).toHaveLength(1);
        expect(container.querySelectorAll('#faq-heading')).toHaveLength(1);

        return;
      }
      // Single arm per locale: the echoed-caution callout (when present) plus
      // one self-care-limits callout, and one FAQ block. A leaf card adds its
      // margin note above the block (caution or Four Gates pairing).
      const card = leafCardByCode(code);
      const margin = card && (card.caution || code === 'LI4' || code === 'LV3') ? 1 : 0;
      expect(container.querySelectorAll('[role="note"]')).toHaveLength(
        (ed.echoedDatasetCautions.length > 0 ? 2 : 1) + margin,
      );
      expect(container.querySelectorAll('#faq-heading')).toHaveLength(1);
    },
  );

  it('should bind the FAQPage JSON-LD to the surviving FAQ block on LI4', async () => {
    const point = pointByCode('LI4');
    if (!point || isCataloguePoint(point)) {
      throw new Error('editorial fixture missing: LI4');
    }
    // The entity must mirror whichever FAQ block survives on the page.
    const faqs = (await loadProseRegistry()).pointByCode('LI4')?.en.faqs ?? point.faqs;
    const element = await PointLeafContainer({ locale: 'en', code: 'li4' });
    const { container } = render(element);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toBeTruthy();
    const { '@graph': graph } = JSON.parse(script?.textContent ?? '') as Record<
      '@graph',
      JsonLdEntity[]
    >;

    const faqPage = graph.find((entity) => entity['@type'] === 'FAQPage');
    expect(faqPage?.['@id']).toMatch(/#faq$/u);
    const questions = (faqPage?.mainEntity ?? []) as Array<{ name: string }>;
    expect(questions.map((q) => q.name)).toEqual(faqs.map((f) => f.q));
  });
});
