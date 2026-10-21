import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ChapterContainer } from './components/ChapterContainer';

describe('MeridianPage opener', () => {
  it('applies the `lead-dropcap` class to the opener one-liner for editorial consistency', async () => {
    const element = await ChapterContainer({ locale: 'en', slug: 'large-intestine' });
    const { container } = render(element);
    const dropCap = container.querySelector('.lead-dropcap');
    expect(dropCap).toBeInTheDocument();
  });
});
