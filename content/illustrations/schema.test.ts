import { describe, expect, it } from 'vitest';

import { IllustrationOverlaySchema } from './schema';

describe('IllustrationOverlaySchema', () => {
  it('accepts a well-formed LI4 overlay', () => {
    const valid = {
      pointCode: 'LI4',
      baseTemplate: 'hand',
      marker: { x: 58, y: 55 },
      label: { x: 88, y: 30, text: 'LI4' },
      nearby: [
        { pointCode: 'LI3', x: 35, y: 85 },
        { pointCode: 'LI5', x: 70, y: 35 },
      ],
      coordinates: 'lat 38mm · med 12mm · supine',
    };
    expect(IllustrationOverlaySchema.parse(valid)).toEqual(valid);
  });

  it('rejects an overlay without baseTemplate', () => {
    const invalid = { pointCode: 'LI4', marker: { x: 1, y: 2 } };
    expect(() => IllustrationOverlaySchema.parse(invalid as unknown)).toThrow();
  });

  it('rejects an unknown baseTemplate', () => {
    const invalid = {
      pointCode: 'LI4',
      baseTemplate: 'alien',
      marker: { x: 1, y: 2 },
      label: { x: 3, y: 4, text: 'LI4' },
    };
    expect(() => IllustrationOverlaySchema.parse(invalid as unknown)).toThrow();
  });
});
