import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { GlossaryIndexView } from './components/GlossaryIndexView';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type PageProps = { params: Promise<{ locale: string }> };

/**
 * build localized page metadata.
 * @param props localized route parameters
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'Glossary',
    description:
      'Short, source-linked definitions for TCM terms used across Acupoints — qi, de qi, zang-fu, and more.',
    path: withLocale(loc, '/glossary/'),
  });
}

const GlossaryPage = async ({ params }: Readonly<PageProps>): Promise<ReactNode> => {
  const { locale } = await params;

  return <GlossaryIndexView locale={resolveLocale(locale)} />;
};

export default GlossaryPage;
