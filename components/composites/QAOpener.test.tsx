import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { QAOpener } from './QAOpener';

type StructuredData = Record<'@type', string> & {
  mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
};

describe('QAOpener', () => {
  it('renders question and answer with mono prefixes', () => {
    render(
      <QAOpener
        answer="Yes — modest but real evidence."
        question="Does acupressure help tension headaches?"
      />,
    );
    expect(screen.getByText(/Does acupressure help tension headaches/)).toBeInTheDocument();
    expect(screen.getByText(/Yes — modest but real evidence/)).toBeInTheDocument();
  });

  it('renders follow-through paragraph when provided', () => {
    render(<QAOpener answer="A" followThrough="Three studies confirm." question="Q" />);
    expect(screen.getByText('Three studies confirm.')).toBeInTheDocument();
  });

  it('emits FAQPage JSON-LD with the Q and A as mainEntity', () => {
    const { container } = render(<QAOpener answer="No." question="Is LI4 safe in pregnancy?" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const data = JSON.parse(script!.textContent) as StructuredData;
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity[0].name).toBe('Is LI4 safe in pregnancy?');
    expect(data.mainEntity[0].acceptedAnswer.text).toBe('No.');
  });

  it('suppresses inline JSON-LD when `suppressJsonLd` is set', () => {
    const { container } = render(<QAOpener suppressJsonLd answer="A." question="Q?" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeNull();
  });

  it('applies the `lead-dropcap` class to follow-through when `dropCap` is set', () => {
    render(
      <QAOpener
        dropCap
        answer="Yes — modest but real evidence."
        followThrough="Three studies confirm."
        question="Does acupressure help tension headaches?"
      />,
    );
    const followThrough = screen.getByText('Three studies confirm.');
    expect(followThrough).toHaveClass('lead-dropcap');
  });

  it('omits the `lead-dropcap` class on follow-through by default', () => {
    render(<QAOpener answer="A" followThrough="Three studies confirm." question="Q" />);
    const followThrough = screen.getByText('Three studies confirm.');
    expect(followThrough).not.toHaveClass('lead-dropcap');
  });
});
