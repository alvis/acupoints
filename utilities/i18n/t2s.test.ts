import { describe, expect, it } from 'vitest';

import { toSimplified } from './t2s';

describe('toSimplified', () => {
  it('lands Taiwan textbook point names on their PRC nomenclature', () => {
    // Pins the opencc tw→cn dictionary behavior the /zh-cn tree relies on:
    // 鍾 must resolve to 钟 (PRC standard) and never to 锺.
    expect(toSimplified('懸鍾（GB39）')).toBe('悬钟（GB39）');
    expect(toSimplified('大鍾（KI4）')).toBe('大钟（KI4）');
  });

  it('converts traditional prose and leaves latin anchors untouched', () => {
    expect(toSimplified('經絡與穴道，自我護理。')).toBe('经络与穴道，自我护理。');
    expect(toSimplified('#name-and-location')).toBe('#name-and-location');
  });
});
