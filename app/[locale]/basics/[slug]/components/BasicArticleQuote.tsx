import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';

import { HillFigure } from './HillFigure';

import type { FC } from 'react';

import type { BasicArticleView } from './BasicArticleBody';

/**
 * render the article pull quote and its explanatory figure
 * @param props pull quote and its hill illustration when available
 * @param props.quote article pull quote
 * @param props.quoteSection source section containing the quotation
 * @param props.slug entry URL segment
 * @param props.han converter for Han text in the page script
 * @param props.english whether this edition is English
 * @param props.copy localized interface text
 * @param props.quoteIndex position of the quoted section
 * @param props.locale page language and writing system
 * @returns the pull quote and its hill illustration when available
 */
export const BasicArticleQuote: FC<
  Readonly<
    Pick<
      BasicArticleView,
      'quote' | 'quoteSection' | 'slug' | 'han' | 'english' | 'copy' | 'quoteIndex' | 'locale'
    >
  >
> = ({ quote, quoteSection, slug, han, english, copy, quoteIndex, locale }) =>
  quote && quoteSection ? (
    <section
      className={cn(
        `
          mt-11 grid items-center gap-8 border-y border-rule py-6
          lg:gap-[60px]
        `,
        slug === 'yin-and-yang' && 'lg:grid-cols-[560px_minmax(0,1fr)]',
      )}>
      {slug === 'yin-and-yang' ? (
        <figure className="m-0 flex flex-col gap-2">
          <HillFigure
            className="h-auto w-full"
            label={copy.hillLabel}
            yang={han('陽')}
            yin={han('陰')}
          />
          <figcaption className="text-[0.95rem] text-ink-soft">
            <span className="tc font-bold text-ink">{han('陽')}</span> {copy.hillYang} ·{' '}
            <span className="tc font-bold text-ink">{han('陰')}</span> {copy.hillYin}
            {english ? '. ' : '。'}
            {copy.hillTail}
          </figcaption>
        </figure>
      ) : null}
      <blockquote
        className="m-0 py-1 pl-7 shadow-[inset_4px_0_0_var(--color-cinnabar)]">
        <p
          className="
            m-0 text-[1.6rem] leading-tight italic
            md:text-[2.125rem]
          ">
          “{english ? quote.en : han(quote.zh)}”
        </p>
        <footer className="mt-3 text-[0.95rem] text-ink-soft">
          {fill(copy.fromPart, { n: countWord(quoteIndex + 1, locale) })}{' '}
          <a className="wb-link italic" href={`#${quoteSection.id}`}>
            {quoteSection.heading}
          </a>
        </footer>
      </blockquote>
    </section>
  ) : null;
