import { JsonLd } from '@/components/primitives/JsonLd';
import { faqs } from '@/content/faq';
import { hanText } from '@/features/editorial/copy';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { FaqContainer } from './components/FaqContainer';
import { stripTags } from './components/inlineLinks';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { FAQPage } from 'schema-dts';

import type { Locale } from '@/utilities/routes';

/**
 * build localized page metadata.
 * @param props localized route parameters
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/faq'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);
  const han = hanText(loc);

  return buildMetadata({
    title: loc === 'en' ? 'Frequently asked questions' : han('常見問題'),
    description:
      loc === 'en'
        ? 'Answers to the questions readers ask most often about acupressure, self-care, and how Acupoints publishes its reference material.'
        : han('讀者最常問的指壓、自我照護問題，以及 Acupoints 如何發佈參考資料的簡短回答。'),
    path: withLocale(loc, '/faq/'),
  });
}

const FaqPage = async ({ params }: Readonly<PageProps<'/[locale]/faq'>>): Promise<ReactNode> => {
  const locale = resolveLocale((await params).locale);

  return (
    <>
      <FaqContainer locale={locale} />
      <JsonLd entities={[faqPage(locale)]} />
    </>
  );
};

export default FaqPage;

/**
 * FAQPage structured data over the same entries the accordion shows, in the page's language.
 * @param locale language used for links and copy
 * @returns the localized FAQPage JSON-LD object
 */
function faqPage(locale: Locale): FAQPage {
  const han = hanText(locale);

  return {
    '@type': 'FAQPage',
    'mainEntity': faqs.map((item) => {
      const text = locale === 'en' ? item : item.zh;
      const answer = text.followThrough
        ? `${stripTags(text.answer)} ${stripTags(text.followThrough)}`
        : stripTags(text.answer);

      return {
        '@type': 'Question',
        'name': han(text.question),
        'acceptedAnswer': { '@type': 'Answer', 'text': han(answer) },
      };
    }),
  };
}
