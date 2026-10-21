import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ConditionArticle } from './ConditionArticle';

describe('ConditionArticle evidence note', () => {
  it('quotes the prose on the evidence in the page locale', async () => {
    const en = render(await ConditionArticle({ locale: 'en', slug: 'tension-headache' }));
    expect(en.container.textContent).toContain('reviews suggest needling can cut how often');
    en.unmount();

    const zh = render(await ConditionArticle({ locale: 'zh-hant', slug: 'tension-headache' }));
    expect(zh.container.textContent).toContain('綜述提示，扎針可減少頭痛發作的次數');
  });

  it('cites both the Chinese-medicine basis and the clinical research', async () => {
    const en = render(await ConditionArticle({ locale: 'en', slug: 'tension-headache' }));
    expect(en.getByRole('heading', { name: 'Chinese medicine basis' })).toBeTruthy();
    expect(en.getByRole('heading', { name: 'Clinical research' })).toBeTruthy();
    en.unmount();

    const zh = render(await ConditionArticle({ locale: 'zh-hant', slug: 'tension-headache' }));
    expect(zh.getByRole('heading', { name: '中醫依據' })).toBeTruthy();
    expect(zh.getByRole('heading', { name: '臨床研究' })).toBeTruthy();
  });
});
