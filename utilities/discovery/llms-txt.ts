import { basicOneLinerBySlug, basicSlugs, basicTitleBySlug } from '@/content/basics';
import { conditions } from '@/content/conditions';
import { glossary } from '@/content/glossary';
import { meridians } from '@/content/meridians';
import { loadProseRegistry } from '@/content/pages';
import { points } from '@/content/points';
import { regions } from '@/content/regions';
import { LOCALE_NAMES } from '@/utilities/i18n/dictionaries';
import { summaryForLocale } from '@/utilities/i18n/locale-text';
import { DEFAULT_LOCALE, LOCALES, localizedRoutes, SITE } from '@/utilities/routes';

import type { EditorialHubModule } from '@/content/editorial/schema';
import type { ProseRegistry } from '@/content/pages';
import type { BilingualModule } from '@/utilities/i18n/locale-text';
import type { Locale } from '@/utilities/routes';

/** Journal-tier prose module served by the markdown registry. */
type JournalPost = EditorialHubModule<'journal'>;

/** The `routes` skeleton resolved for the locale whose index is being built. */
type LocaleRoutes = ReturnType<typeof localizedRoutes>;

/** Everything a catalogue row needs to render itself for one locale. */
interface IndexContext {
  routes: LocaleRoutes;
  locale: Locale;
  registry: ProseRegistry;
}

/**
 * A row's description: the locale's authored summary, falling back to the
 * English catalogue one-liner. Every catalogue row has a prose module today and
 * a test pins that, so the fallback only keeps a mis-keyed row in the index
 * rather than dropping it.
 * @param ctx the locale, route table, and prose registry.
 * @param oneLiner the fallback English catalogue description.
 * @param module editorial document to render.
 * @returns the authored localized summary or fallback English one-liner.
 */
function describe(ctx: IndexContext, oneLiner: string, module?: BilingualModule): string {
  if (ctx.locale === 'en' || !module) {
    return oneLiner;
  }

  return summaryForLocale(module, ctx.locale);
}

const INTRO_LINE =
  'Acupoints documents all 361 classical acupressure points in plain English: every point page carries the WHO-standard location, dataset-recorded indications and cautions, and sources; editorial pages add how-to-find steps, FAQs, and deeper guidance. The site is educational and is not medical advice.';

/**
 * Builds one locale's llms.txt index (llmstxt.org convention): an H1 identity
 * line, a blockquote summary, then one H2 section per content family with each
 * page linked exactly once, plus a Locales section pointing at the sibling
 * indexes so a crawler landing on any one of them finds the other two.
 *
 * Every URL is locale-prefixed, so an index never sends a reader of one
 * language tree into another.
 *
 * Every catalogue row is described in the index's own language: each family has
 * an authored Chinese arm for every row, so a Chinese index quotes that authored
 * lead verbatim and zh-cn derives simplified from it. No index text is
 * translated or newly written here, which is also why row labels and the
 * identity block stay English — a module carries one authored title across both
 * arms, and the identity block describes the project itself.
 * @param locale language used for text and routes.
 * @returns the Markdown index of the locale's reference and journal pages.
 */
export async function buildLlmsTxt(locale: Locale = DEFAULT_LOCALE): Promise<string> {
  const registry = await loadProseRegistry();
  const ctx: IndexContext = { routes: localizedRoutes(locale), locale, registry };
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    INTRO_LINE,
    ...section(
      'Points',
      points.map((point) => pointToLink(point, ctx)),
    ),
    ...section(
      'Meridians',
      meridians.map((meridian) => meridianToLink(meridian, ctx)),
    ),
    ...section(
      'Conditions',
      conditions.map((condition) => conditionToLink(condition, ctx)),
    ),
    ...section(
      'Body regions',
      regions.map((region) => regionToLink(region, ctx)),
    ),
    ...section('Basics', basicLinks(ctx)),
    ...section(
      'Glossary',
      glossary.map((entry) => glossaryToLink(entry, ctx)),
    ),
    ...section(
      'Journal',
      registry.journal.map((post) => postToLink(post, ctx)),
    ),
    ...section('Site', siteLinks(locale, ctx.routes)),
    ...section('Locales', localeLinks()),
  ];

  return [...lines, ''].join('\n');
}

/**
 * emit a Markdown heading only when links are available.
 * @param title display heading.
 * @param links formatted destinations.
 * @returns the heading and link lines, or no lines for an empty section.
 */
function section(title: string, links: readonly string[]): string[] {
  if (links.length === 0) {
    return [];
  }

  return ['', `## ${title}`, '', ...links];
}

/**
 * describe introductory lessons available in the selected locale.
 * @param ctx the locale, route table, and prose registry.
 * @returns the introductory lesson links with localized descriptions.
 */
function basicLinks(ctx: IndexContext): string[] {
  return basicSlugs.flatMap((slug) => {
    const title = basicTitleBySlug(slug);
    const oneLiner = basicOneLinerBySlug(slug);
    if (!title || !oneLiner) {
      return [];
    }
    const proseModule = ctx.registry.hub('static', `basics-${slug}`);

    return [
      describedLink(title, pageUrl(ctx.routes.basic(slug)), describe(ctx, oneLiner, proseModule)),
    ];
  });
}

/**
 * list the main navigation destinations for a locale.
 * @param locale language used for text and routes.
 * @param r localized route table.
 * @returns the locale's main navigation links in Markdown.
 */
function siteLinks(locale: Locale, r: LocaleRoutes): string[] {
  return [
    plainLink('All points', pageUrl(r.points)),
    plainLink('All meridians', pageUrl(r.meridians)),
    plainLink('Conditions', pageUrl(r.conditions)),
    plainLink('Body regions', pageUrl(r.regions)),
    plainLink('TCM basics', pageUrl(r.basics)),
    plainLink('Glossary', pageUrl(r.glossary)),
    plainLink('FAQ', pageUrl(r.faq)),
    plainLink('About', pageUrl(r.about)),
    plainLink('Changelog', pageUrl(r.changelog)),
    plainLink('RSS feed', feedUrl(locale)),
    plainLink('Medical disclaimer', pageUrl(r.disclaimer)),
    plainLink('Privacy', pageUrl(r.privacy)),
    plainLink('Affiliate disclosure', pageUrl(r.affiliate)),
  ];
}

/**
 * Sibling indexes, labelled by each language's own name for itself.
 * @returns the sibling index links labeled in each language.
 */
function localeLinks(): string[] {
  return LOCALES.map((locale) =>
    plainLink(LOCALE_NAMES[locale].long, `${SITE.url}/${locale}/llms.txt`),
  );
}

interface PointSummary {
  code: string;
  name: string;
  canonicalOneLiner: string;
}

/**
 * format a point reference with its localized summary.
 * @param point catalogue entry to describe.
 * @param ctx the locale, route table, and prose registry.
 * @returns the point's Markdown link and localized description.
 */
function pointToLink(point: PointSummary, ctx: IndexContext): string {
  return describedLink(
    `${point.code} ${point.name}`,
    pageUrl(ctx.routes.point(point.code)),
    describe(ctx, point.canonicalOneLiner, ctx.registry.pointByCode(point.code)),
  );
}

interface MeridianSummary {
  name: string;
  slug: string;
  canonicalOneLiner: string;
}

/**
 * format a channel reference with its localized summary.
 * @param meridian the channel catalogue row.
 * @param ctx the locale, route table, and prose registry.
 * @returns the channel's Markdown link and localized description.
 */
function meridianToLink(meridian: MeridianSummary, ctx: IndexContext): string {
  return describedLink(
    meridian.name,
    pageUrl(ctx.routes.meridian(meridian.slug)),
    describe(ctx, meridian.canonicalOneLiner, ctx.registry.hub('meridian', meridian.slug)),
  );
}

interface ConditionSummary {
  name: string;
  slug: string;
  canonicalOneLiner: string;
}

/**
 * format a condition reference with its localized summary.
 * @param condition the condition catalogue row.
 * @param ctx the locale, route table, and prose registry.
 * @returns the condition's Markdown link and localized description.
 */
function conditionToLink(condition: ConditionSummary, ctx: IndexContext): string {
  return describedLink(
    condition.name,
    pageUrl(ctx.routes.condition(condition.slug)),
    describe(ctx, condition.canonicalOneLiner, ctx.registry.hub('condition', condition.slug)),
  );
}

interface RegionSummary {
  name: string;
  slug: string;
  summary: string;
}

/**
 * format a body-region reference with its localized summary.
 * @param region the body-region catalogue row.
 * @param ctx the locale, route table, and prose registry.
 * @returns the body region's Markdown link and localized description.
 */
function regionToLink(region: RegionSummary, ctx: IndexContext): string {
  return describedLink(
    region.name,
    pageUrl(ctx.routes.region(region.slug)),
    describe(ctx, region.summary, ctx.registry.hub('region', region.slug)),
  );
}

interface GlossaryEntrySummary {
  term: string;
  slug: string;
  oneLiner: string;
}

/**
 * format a glossary reference with its localized summary.
 * @param entry record to describe.
 * @param ctx the locale, route table, and prose registry.
 * @returns the glossary entry's Markdown link and localized description.
 */
function glossaryToLink(entry: GlossaryEntrySummary, ctx: IndexContext): string {
  return describedLink(
    entry.term,
    pageUrl(ctx.routes.glossaryTerm(entry.slug)),
    describe(ctx, entry.oneLiner, ctx.registry.hub('static', `glossary-${entry.slug}`)),
  );
}

/**
 * Journal posts have no catalogue one-liner to fall back to, so they resolve
 * their summary straight from the locale's authored arm.
 * @param post the authored journal essay.
 * @param ctx the locale, route table, and prose registry.
 * @returns the journal post's Markdown link and authored localized summary.
 */
function postToLink(post: JournalPost, ctx: IndexContext): string {
  return describedLink(
    post.title,
    pageUrl(ctx.routes.journalPost(post.slug)),
    summaryForLocale(post, ctx.locale),
  );
}

/**
 * format a Markdown reference followed by its summary.
 * @param label accessible or displayed reading.
 * @param url absolute destination.
 * @param description short destination summary.
 * @returns the Markdown list link followed by its description.
 */
function describedLink(label: string, url: string, description: string): string {
  return `- [${label}](${url}): ${description}`;
}

/**
 * format a Markdown reference without a summary.
 * @param label accessible or displayed reading.
 * @param url absolute destination.
 * @returns the Markdown list link with its label.
 */
function plainLink(label: string, url: string): string {
  return `- [${label}](${url})`;
}

/**
 * Absolute page URL matching the site's trailing-slash export layout.
 * @param path site-relative destination.
 * @returns the absolute page URL with a trailing slash.
 */
function pageUrl(path: string): string {
  return path.endsWith('/') ? `${SITE.url}${path}` : `${SITE.url}${path}/`;
}

/**
 * Feed files are export artifacts, not routes, so they carry no trailing slash.
 * @param locale language used for text and routes.
 * @returns the absolute locale feed URL without a trailing slash.
 */
function feedUrl(locale: Locale): string {
  return `${SITE.url}/${locale}/feed.xml`;
}
