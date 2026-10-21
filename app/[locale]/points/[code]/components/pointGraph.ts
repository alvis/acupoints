/**
 * Loads one point's registry record, authored leaf card and editorial prose
 * and composes its printed leaf: the phone header, the carved block (card
 * lines and classical quote when a card exists, dataset lines otherwise),
 * the cards under it, the authored commentary, safety notes, FAQ, sources,
 * the colophon and the leaf turn — plus the page's JSON-LD graph, which
 * must quote exactly what renders.
 */

import { EDITORIAL_ID, ORG_ID, SITE_ID } from '@/utilities/editorial';
import { localeToHtmlLang, SITE } from '@/utilities/routes';

import type { Thing } from 'schema-dts';

import type { loadProseRegistry } from '@/content/pages';
import type { AnyPoint } from '@/content/schemas';
import type { Locale, localizedRoutes } from '@/utilities/routes';

/** publication details mirrored by the schema entities. */
interface GraphInputs {
  r: ReturnType<typeof localizedRoutes>;
  pagePath: string;
  point: AnyPoint;
  pageUrl: string;
  reviewed: Date;
  ed: ReturnType<Awaited<ReturnType<typeof loadProseRegistry>>['pointByCode']> | undefined;
  locale: Locale;
  citations: readonly string[];
  faqs: ReadonlyArray<{ q: string; a: string }>;
}

/**
 * quote the printed content in the page's structured data.
 * @param props published point identity, page addresses, review date, and cited content
 * @param props.r localized route builders for page links
 * @param props.pagePath localized path of this point leaf
 * @param props.point point registry entry
 * @param props.pageUrl canonical absolute address of this point leaf
 * @param props.reviewed date of the latest content review
 * @param props.ed published editorial module for this point, when available
 * @param props.locale language used for links and copy
 * @param props.citations source names cited by the published point content
 * @param props.faqs authored questions and answers printed on the page
 * @returns the breadcrumb, medical page, point entity, and optional FAQ schema entities
 */
export const pointGraph = ({
  r,
  pagePath,
  point,
  pageUrl,
  reviewed,
  ed,
  locale,
  citations,
  faqs,
}: GraphInputs): Thing[] => {
  const crumbs = [
    { href: r.home, label: 'Home' },
    { href: r.points, label: 'Points' },
    { href: pagePath, label: point.code },
  ];

  const graph: Thing[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      'itemListElement': crumbs.map((c, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': c.label,
        'item': c.href.startsWith('http') ? c.href : `${SITE.url}${c.href}`,
      })),
    },
    medicalPage({ pageUrl, point, reviewed, ed, locale, citations }),
    {
      '@type': 'MedicalEntity',
      '@id': `${pageUrl}#entity`,
      'name': `${point.code} ${point.name}`,
      'alternateName': [point.pinyin, point.hanzi, point.code],
      'code': {
        '@type': 'MedicalCode',
        'codeValue': point.code,
        'codingSystem': 'WHO Standard Acupuncture Point Locations (2008)',
      },
    },
    // One consolidated page-level FAQ entity: the editorial arm's FAQs
    // when a module exists, else the legacy record's. Catalogue pages
    // carry no authored FAQs, so no FAQPage entity ships for them.
    ...(faqs.length > 0
      ? [
          {
            '@type': 'FAQPage' as const,
            '@id': `${pageUrl}#faq`,
            'mainEntity': faqs.map((f) => ({
              '@type': 'Question' as const,
              'name': f.q,
              'acceptedAnswer': { '@type': 'Answer' as const, 'text': f.a },
            })),
          },
        ]
      : []),
  ];

  return graph;
};

/**
 * describe the published medical reference page in its selected language.
 * @param props point identity, publication language, review date, and citations
 * @param props.pageUrl canonical absolute address of this point leaf
 * @param props.point point registry entry
 * @param props.reviewed date of the latest content review
 * @param props.ed published editorial module for this point, when available
 * @param props.locale language used for links and copy
 * @param props.citations source names cited by the published point content
 * @returns the medical reference page entity with review and citation details
 */
const medicalPage = ({
  pageUrl,
  point,
  reviewed,
  ed,
  locale,
  citations,
}: {
  pageUrl: string;
  point: AnyPoint;
  reviewed: Date;
  ed: ReturnType<Awaited<ReturnType<typeof loadProseRegistry>>['pointByCode']>;
  locale: Locale;
  citations: readonly string[];
}): Thing => ({
  '@type': 'MedicalWebPage',
  '@id': `${pageUrl}#page`,
  'url': pageUrl,
  'name': `${point.code} ${point.name} (${point.pinyin})`,
  // English for every locale: canonicalOneLiner is catalogue spine
  // data with no Chinese counterpart field. The point's authored zh
  // arm is page prose, too long to serve as a one-line description.
  'description': point.canonicalOneLiner,
  'isPartOf': { '@id': SITE_ID },
  'about': { '@id': `${pageUrl}#entity` },
  'reviewedBy': { '@id': EDITORIAL_ID },
  'author': { '@id': EDITORIAL_ID },
  'publisher': { '@id': ORG_ID },
  'dateModified': reviewed.toISOString(),
  'lastReviewed': reviewed.toISOString().split('T')[0],
  ...(ed ? { inLanguage: localeToHtmlLang(locale) } : {}),
  'speakable': {
    '@type': 'SpeakableSpecification',
    'cssSelector': ['.speakable'],
  },
  'citation': citations.map((s) => ({
    '@type': 'CreativeWork',
    'name': s,
  })),
});
