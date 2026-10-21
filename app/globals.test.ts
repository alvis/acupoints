import { describe, expect, it } from 'vitest';

import css from './globals.css?raw';

// --font-han is declared twice (token, then the zh-Hant rebinding), so the
// token assertions below must read the @theme block rather than the first match
const theme = /@theme\s*\{(?<body>[^}]*)\}/u.exec(css)?.groups?.body ?? '';

function declaration(property: string): string {
  const match = new RegExp(`${property}\\s*:\\s*([^;]+);`, 'u').exec(theme);
  if (!match?.[1]) {
    throw new Error(`missing ${property} declaration in app/globals.css`);
  }

  // family names compare without their quotes, which formatting may swap
  return match[1].replaceAll(/["']/gu, '');
}

const FONT_STACKS: ReadonlyArray<{
  property: string;
  family: string;
  fallback: string;
}> = [
  { property: '--font-display', family: 'EB Garamond Variable', fallback: 'Iowan Old Style' },
  { property: '--font-sans', family: 'EB Garamond Variable', fallback: 'Iowan Old Style' },
  { property: '--font-mono', family: 'IBM Plex Mono', fallback: 'SF Mono' },
  { property: '--font-han-sc', family: 'Noto Serif SC Variable', fallback: 'Songti SC' },
  { property: '--font-han-tc', family: 'Noto Serif TC Variable', fallback: 'Songti TC' },
];

// a generic family always matches, so a Han list behind one is unreachable
const SPLICED = ['--font-display', '--font-sans'] as const;

describe('font custom-property stacks', () => {
  it.each(FONT_STACKS)(
    '$property leads with the self-hosted Fontsource family and keeps its system fallback',
    ({ property, family, fallback }) => {
      const stack = declaration(property);
      expect(stack.includes(family)).toBe(true);
      expect(stack.includes(fallback)).toBe(true);
      expect(stack.indexOf(family)).toBeLessThan(stack.indexOf(fallback));
    },
  );

  it.each(SPLICED)('%s reaches the Han families before its generic', (property) => {
    const stack = declaration(property);
    const generic = /,\s*(sans-serif|serif|monospace)\s*$/u.exec(stack);
    expect(generic).not.toBeNull();
    expect(stack.indexOf('var(--font-han)')).toBeGreaterThan(-1);
    expect(stack.indexOf('var(--font-han)')).toBeLessThan(generic?.index ?? -1);
  });

  it('binds the Han branch to Simplified by default and Traditional on zh-Hant', () => {
    expect(declaration('--font-han')).toBe('var(--font-han-sc)');
    expect(css).toMatch(/html\[lang='zh-Hant'\]\s*\{\s*--font-han:\s*var\(--font-han-tc\);/u);
  });
});
