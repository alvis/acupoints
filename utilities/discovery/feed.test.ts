import { describe, expect, it } from 'vitest';

import { points } from '@/content/points';
import { SITE } from '@/utilities/routes';

import { buildRssFeed, pointToFeedItem } from './feed';

import type { FeedItem } from './feed';

const RFC_822_PATTERN = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/u;

function parseFeed(xml: string): XMLDocument {
  const document = new DOMParser().parseFromString(xml, 'text/xml');
  expect(document.getElementsByTagName('parsererror')).toHaveLength(0);

  return document;
}

describe('buildRssFeed', () => {
  it('renders the channel header with site identity and language', () => {
    const document = parseFeed(buildRssFeed([]));
    expect(document.querySelector('rss')?.getAttribute('version')).toBe('2.0');
    expect(document.querySelector('channel > title')?.textContent).toBe(SITE.name);
    expect(document.querySelector('channel > link')?.textContent).toBe(`${SITE.url}/en/`);
    expect(document.querySelector('channel > description')?.textContent).toBe(SITE.description);
    expect(document.querySelector('channel > language')?.textContent).toBe('en');
  });

  it('localizes the channel for a non-default locale', () => {
    const document = parseFeed(buildRssFeed([], 'zh-hant'));
    expect(document.querySelector('channel > language')?.textContent).toBe('zh-Hant');
    expect(document.querySelector('channel > link')?.textContent).toBe(`${SITE.url}/zh-hant/`);
    expect(document.getElementsByTagName('atom:link').item(0)?.getAttribute('href')).toBe(
      `${SITE.url}/zh-hant/feed.xml`,
    );
  });

  it('emits one item per point with unique permalinks as guids', () => {
    const items = [...points].map((point) => pointToFeedItem(point));
    const document = parseFeed(buildRssFeed(items));
    const guids = [...document.getElementsByTagName('guid')].map((node) => node.textContent);
    expect(guids).toHaveLength(points.length);
    expect(new Set(guids).size).toBe(guids.length);
  });

  it('formats every pubDate as an RFC-822 UTC timestamp', () => {
    const document = parseFeed(buildRssFeed([...points].map((point) => pointToFeedItem(point))));
    const dates = [...document.getElementsByTagName('pubDate')].map((node) => node.textContent);
    for (const date of dates) {
      expect(date).toMatch(RFC_822_PATTERN);
    }
  });

  it('derives the first item from the first registry point', () => {
    const document = parseFeed(buildRssFeed([pointToFeedItem(points[0])]));
    const first = document.getElementsByTagName('item').item(0);
    expect(first?.getElementsByTagName('title').item(0)?.textContent).toBe(
      `${points[0].code} ${points[0].name}`,
    );
    expect(first?.getElementsByTagName('link').item(0)?.textContent).toBe(
      `${SITE.url}/en/points/${points[0].code.toLowerCase()}/`,
    );
    expect(first?.getElementsByTagName('description').item(0)?.textContent).toBe(
      points[0].canonicalOneLiner,
    );
  });

  it('escapes XML-special characters in item fields', () => {
    const hostile: FeedItem = {
      title: 'A & B <tag>',
      link: 'https://acupoints.com/points/test/',
      description: '"quoted" text & <more>',
      pubDate: new Date('2026-04-15'),
    };
    const xml = buildRssFeed([hostile]);
    expect(xml).toContain('<title>A &amp; B &lt;tag&gt;</title>');
    expect(xml).toContain('&quot;quoted&quot; text &amp; &lt;more&gt;');
    parseFeed(xml);
  });
});
